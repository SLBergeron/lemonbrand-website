import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getConvexClient } from "@/lib/convex-server";
import { api } from "@lemonbrand/convex";
import { Id } from "@lemonbrand/convex";
import {
  DAY_PROMPTS,
  hashContext,
  type DayContext,
} from "@/lib/sprint-dialogue-prompts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { day, userId } = body;

    if (day === undefined || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: day, userId" },
        { status: 400 }
      );
    }

    if (day < 0 || day > 7) {
      return NextResponse.json(
        { error: "Day must be between 0 and 7" },
        { status: 400 }
      );
    }

    const convex = getConvexClient();

    // Rate limit: 10 requests/hour per user
    const rateLimit = await convex.mutation(
      api.prdRateLimits.checkAndIncrement,
      { identifier: `dialogue-${userId}` }
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Try again later.",
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    // Gather context from Convex
    const typedUserId = userId as Id<"users">;

    const [enrollment, allFormResponses, previousDialogue] = await Promise.all([
      convex.query(api.sprintEnrollments.getEnrollmentByUser, {
        userId: typedUserId,
      }),
      convex.query(api.sprintFormResponses.getFormResponsesByUser, {
        userId: typedUserId,
      }),
      day > 0
        ? convex.query(api.sprintAiDialogue.getByUserDay, {
            userId: typedUserId,
            day: day - 1,
          })
        : null,
    ]);

    // Build form responses map (day -> responses)
    const formResponses: Record<number, Record<string, any>> = {};
    for (const fr of allFormResponses) {
      formResponses[fr.day] = fr.responses;
    }

    // Build day context
    const day0Responses = formResponses[0] || {};
    const context: DayContext = {
      projectIdea:
        day0Responses["whatToBuild"] || day0Responses["project-idea"] || enrollment?.projectIdea || "",
      role: day0Responses["role"] || "",
      techComfort: day0Responses["tech-comfort"] || day0Responses["techComfort"] || "",
      targetUser: day0Responses["whoIsItFor"] || day0Responses["target-user"] || "",
      currentProcess: day0Responses["currentProcess"] || day0Responses["current-process"] || "",
      whyMatters: day0Responses["why-matters"] || day0Responses["whyMatters"] || "",
      successLooksLike: day0Responses["success-looks-like"] || day0Responses["successLooksLike"] || "",
      formResponses,
      previousDialogue: previousDialogue?.content,
    };

    // Check if we have a cached dialogue with the same context
    const contextHash = hashContext(context);
    const cached = await convex.query(api.sprintAiDialogue.getByUserDay, {
      userId: typedUserId,
      day,
    });

    if (cached && cached.contextHash === contextHash) {
      return NextResponse.json({
        content: cached.content,
        cached: true,
        remaining: rateLimit.remaining,
      });
    }

    // Get day-specific prompts
    const dayPrompt = DAY_PROMPTS[day];
    if (!dayPrompt) {
      return NextResponse.json(
        { error: "No prompts configured for this day" },
        { status: 400 }
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

    const anthropic = new Anthropic({ apiKey });
    const userPrompt = dayPrompt.buildUserPrompt(context);

    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 800,
      system: dayPrompt.system,
      messages: [{ role: "user", content: userPrompt }],
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const content = textContent.text;

    // Cache the result
    await convex.mutation(api.sprintAiDialogue.save, {
      userId: typedUserId,
      day,
      content,
      contextHash,
      model: "claude-3-5-haiku-latest",
    });

    return NextResponse.json({
      content,
      cached: false,
      remaining: rateLimit.remaining,
    });
  } catch (error) {
    console.error("Dialogue generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate tips" },
      { status: 500 }
    );
  }
}
