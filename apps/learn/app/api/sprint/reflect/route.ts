import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { Id } from "@lemonbrand/convex";

const SYSTEM_PROMPT = `You're a friendly build coach. In 1-2 casual sentences, reflect back what the user wants to build and affirm it's achievable in a 7-day sprint. Be specific to their idea. No exclamation marks. No generic praise. No questions. Just mirror what they said and ground it.`;

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
    const { whatToBuild, whoIsItFor, userId } = body;

    if (!whatToBuild || !whoIsItFor) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Rate limit via Convex (reuse prdRateLimits)
    const convex = getConvexClient();
    const clientIP = getClientIP(request);

    // Check if paid user for higher rate limits
    let isPaid = false;
    if (userId) {
      try {
        const enrollment = await convex.query(
          api.sprintEnrollments.getEnrollmentByUser,
          { userId: userId as Id<"users"> }
        );
        isPaid = enrollment?.status === "active" || enrollment?.status === "completed";
      } catch {
        // Ignore - use default rate limit
      }
    }

    const rateLimit = await convex.mutation(
      api.prdRateLimits.checkAndIncrement,
      {
        identifier: userId ? `reflect-${userId}` : `reflect-${clientIP}`,
        limit: isPaid ? 50 : undefined,
      }
    );

    if (!rateLimit.allowed) {
      return NextResponse.json({ fallback: true });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not configured");
      return NextResponse.json({ fallback: true });
    }

    const whoLabel =
      whoIsItFor === "me"
        ? "themselves"
        : whoIsItFor === "team"
          ? "their team"
          : whoIsItFor === "clients"
            ? "their clients"
            : "the public";

    const userPrompt = `The user wants to build: "${whatToBuild}" — it's for ${whoLabel}.`;

    const anthropic = new Anthropic({ apiKey });
    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 100,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json({ fallback: true });
    }

    return NextResponse.json({
      reflection: textContent.text,
      remaining: rateLimit.remaining,
    });
  } catch (error) {
    console.error("Reflect API error:", error);
    return NextResponse.json({ fallback: true });
  }
}
