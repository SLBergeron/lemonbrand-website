import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { Id } from "@lemonbrand/convex";

const SYSTEM_PROMPT = `You are helping a beginner create a project brief for their first AI-built tool during a 7-Day Sprint.

## The Sprint Structure
- Day 0: Setup + define project (TODAY)
- Day 1: Scope with AI as thinking partner
- Day 2: Create CLAUDE.md (project memory) + visualize
- Day 3: Build first feature (Next.js web app)
- Day 4: Deploy to Vercel + iterate based on feedback
- Day 5: Add capabilities
- Day 6: Polish (no new features)
- Day 7: Demo + ship

## What Works for a 7-Day Sprint
GOOD projects:
- Proposal/quote generators
- Calculators (pricing, ROI, conversion)
- Content formatters/structuring tools
- Landing pages
- Email template generators
- Data visualizers (input data → chart/display)
- Trackers, planners, and apps that remember things (with local persistence)
- Simple dashboards
- Habit trackers, workout logs, project trackers (all great with localStorage)

BAD projects (better for 8-week program):
- Anything requiring user accounts or authentication
- Anything with payments
- Apps that need cloud databases (PostgreSQL, Convex, Supabase, Firebase)
- Apps that need to sync data across devices
- Apps requiring environment variable setup or deployment configuration for databases

## Key Principle
The ideal Sprint project has a clear flow: INPUT → PROCESS → OUTPUT

## Persistence is encouraged
Projects CAN and SHOULD have persistence when it makes them more useful:
- localStorage (browser) - simplest, works for small data, persists across sessions
- JSON file - good for local tools
- SQLite - good for more structured local data

These are all Sprint-friendly. Trackers, planners, and apps that remember things are GREAT projects.

AVOID cloud databases entirely (PostgreSQL, Convex, Supabase, Firebase). They add complexity (setup, authentication, environment variables, deployment config) that derails beginners.

## Your Role
Create a brief that:
1. Reframes their idea as a generator-style tool if needed
2. Identifies the ONE core feature
3. Sets explicit boundaries (what NOT to build)
4. Gives their AI coding assistant everything needed to help build this

The user has never built software before. Be encouraging but realistic about scope.`;

const USER_PROMPT_TEMPLATE = `Create a project brief based on these inputs from a first-time builder:

**What they want to build:** {{whatToBuild}}
**Who it's for:** {{whoIsItFor}}
**What they do manually today:** {{currentProcess}}

Generate a markdown document with these sections:

# Project Brief: [Descriptive Tool Name]

## The One-Liner
[Complete this sentence: "A tool that takes [INPUT] and produces [OUTPUT]"]

## Who It's For
{{whoIsItFor}} — [add relevant context about their situation]

## The Problem
[Describe the manual process they're replacing. Be specific about the pain: time wasted, friction, annoyance]

## The Core Feature (MVP)
[The ONE thing this tool must do. Frame it as: "User provides X → Tool does Y → User gets Z"

Keep this tiny. A beginner should be able to build this in ~3 focused hours on Day 3.]

## What This Is NOT (Out of Scope for v1)
- No user accounts or login
- No cloud databases (PostgreSQL, Convex, Supabase, Firebase)
- No payments or subscriptions
- No email sending or external API integrations
- No syncing data across devices
- [Add 2-3 specific features they might be tempted to add based on their idea]

## Data Storage Approach
[Choose the simplest option that makes the tool useful:]
- **No persistence needed** → Data resets on refresh (fine for generators/calculators)
- **Small amounts of data** → localStorage (persists in browser, great for trackers and planners)
- **More structured data** → SQLite or JSON file (local only)

Local persistence is encouraged — it makes projects more useful and satisfying. Cloud databases are an 8-week topic.

## Technical Context
- Single-page Next.js web app
- Runs in the browser (or locally on their machine)
- [Specify storage approach based on their needs]
- Will be deployed to Vercel for free (if web app) or runs locally

## Success Criteria
v1 is "done" when:
- [ ] [Specific, testable outcome 1]
- [ ] [Specific, testable outcome 2]
- [ ] [Specific, testable outcome 3]
- [ ] It's deployed and shareable via URL

## Questions for Day 1 Scoping
On Day 1, you'll have a conversation with your AI coding assistant to refine this scope. Good questions to explore:

1. [Question about clarifying the input format/options]
2. [Question about what the output should look like]
3. [Question that might reveal hidden complexity - help them think it through]

---

**Note:** This brief is designed to be pasted into Claude Code or Cursor as your project context. On Day 1, you'll refine this with your AI assistant. On Day 2, you'll turn it into a CLAUDE.md file that becomes your project's memory.`;

function getClientIP(request: NextRequest): string {
  // Check various headers for the real IP (handles proxies/load balancers)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback - use a hash of user agent + some request properties
  const userAgent = request.headers.get("user-agent") || "unknown";
  return `ua-${hashCode(userAgent)}`;
}

function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { whatToBuild, whoIsItFor, currentProcess, userId } = body;

    // Validate required fields
    if (!whatToBuild || !whoIsItFor || !currentProcess) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check rate limit via Convex
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

    const rateLimit = await convex.mutation(api.prdRateLimits.checkAndIncrement, {
      identifier: userId ? `prd-${userId}` : clientIP,
      limit: isPaid ? 50 : undefined,
    });

    if (!rateLimit.allowed) {
      // Return fallback flag - client should use template
      return NextResponse.json({
        fallback: true,
        resetAt: rateLimit.resetAt,
      });
    }

    // Check for API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not configured");
      return NextResponse.json({ fallback: true });
    }

    // Build the user prompt
    const userPrompt = USER_PROMPT_TEMPLATE
      .replace("{{whatToBuild}}", whatToBuild)
      .replace("{{whoIsItFor}}", formatWhoIsItFor(whoIsItFor))
      .replace("{{currentProcess}}", currentProcess);

    // Call Claude Haiku
    const anthropic = new Anthropic({ apiKey });

    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    // Extract text content
    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      console.error("No text content in Claude response");
      return NextResponse.json({ fallback: true });
    }

    return NextResponse.json({
      content: textContent.text,
      remaining: rateLimit.remaining,
    });
  } catch (error) {
    console.error("PRD generation error:", error);
    return NextResponse.json({ fallback: true });
  }
}

function formatWhoIsItFor(value: string): string {
  const mapping: Record<string, string> = {
    me: "Just myself (personal use)",
    team: "My team (internal tool)",
    clients: "My clients (client-facing tool)",
  };
  return mapping[value] || value;
}
