import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";

const SYSTEM_PROMPT = `You are helping someone find their first software project to build in a 7-Day Sprint.

## What works for a 7-Day Sprint
GOOD projects (suggest these):
- Generators (proposals, quotes, reports, emails, content)
- Calculators (pricing, ROI, conversion, estimation)
- Formatters/transformers (restructure data, convert formats)
- Dashboards (visualize data from CSV/JSON input)
- Trackers/planners WITH localStorage or JSON file persistence (habit trackers, workout logs, reading lists, meal planners)
- Simple tools with clear INPUT → PROCESS → OUTPUT flow

BAD projects (avoid suggesting):
- Anything requiring user accounts or authentication
- Anything with payments
- Apps needing cloud databases (PostgreSQL, Convex, Supabase, Firebase)
- Apps that sync data across devices
- Multi-page apps with complex navigation

## Persistence is OK
Projects CAN have persistence. localStorage for browser apps, JSON files for local tools, SQLite for structured data. Trackers, planners, and apps that remember things are GREAT Sprint projects when using local persistence.

## Key rules
- Match suggestions to their industry/role specifically
- Each suggestion must pass the "one sentence" test
- Focus on tools that solve THEIR specific pain points
- Complexity should be Sprint-friendly (buildable in ~3 focused hours on Day 3)

Return EXACTLY a JSON object with this structure:
{
  "ideas": [
    {
      "name": "Short Tool Name",
      "oneLiner": "A tool that takes X and produces Y",
      "whyItFits": "Why this matches their specific situation",
      "complexity": "Sprint-friendly",
      "suggestedTargetUser": "Just me" or "My team" or "My clients" or "Public",
      "suggestedCurrentProcess": "Description of what they currently do manually"
    }
  ]
}

Return 3-5 ideas. Return ONLY valid JSON, no markdown code fences.`;

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP;
  const userAgent = request.headers.get("user-agent") || "unknown";
  let hash = 0;
  for (let i = 0; i < userAgent.length; i++) {
    const char = userAgent.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `ua-${Math.abs(hash).toString(36)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, techComfort, annoyance, magicWand, dataDealtWith } = body;

    if (!role || !techComfort) {
      return NextResponse.json(
        { error: "Missing required fields: role, techComfort" },
        { status: 400 }
      );
    }

    const convex = getConvexClient();

    // Rate limit: 3 requests/hour per IP
    const clientIP = getClientIP(request);
    const rateLimit = await convex.mutation(
      api.prdRateLimits.checkAndIncrement,
      { identifier: `ideafinder-${clientIP}` }
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again later.", resetAt: rateLimit.resetAt },
        { status: 429 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not configured");
      return NextResponse.json(
        { error: "AI service not configured" },
        { status: 500 }
      );
    }

    const userPrompt = `Here's what I know about this person:

**Role/background:** ${role}
**Tech comfort:** ${techComfort}

Their answers to discovery questions:
- **Repetitive annoyance:** ${annoyance || "Not answered"}
- **Magic wand tool:** ${magicWand || "Not answered"}
- **Data they deal with:** ${dataDealtWith || "Not answered"}

Suggest 3-5 Sprint-friendly project ideas tailored to their specific situation.`;

    const anthropic = new Anthropic({ apiKey });

    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse JSON response
    let ideas;
    try {
      const parsed = JSON.parse(textContent.text);
      ideas = parsed.ideas;
    } catch {
      // Try to extract JSON from the response if it has extra text
      const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        ideas = parsed.ideas;
      } else {
        console.error("Failed to parse idea-finder response:", textContent.text);
        return NextResponse.json(
          { error: "Failed to parse AI response" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error("Idea finder error:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
