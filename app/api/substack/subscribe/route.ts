import { NextResponse } from "next/server";
import { getConvexClient } from "@/lib/convex";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { api } from "@/convex/_generated/api";
import SubstackWelcomeEmail from "@/emails/substack/welcome";
import { render } from "@react-email/components";

export async function POST(request: Request) {
  try {
    const { email, segment, role, painPoint, triedBefore } = await request.json();

    // Validate required fields
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!segment || !["internal-tool", "lead-gen", "offer-prototype"].includes(segment)) {
      return NextResponse.json(
        { error: "Valid segment is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Subscribe via Convex
    const convex = getConvexClient();
    const result = await convex.mutation(api.newsletter.subscribeSubstack, {
      email,
      segment,
      role: role || undefined,
      painPoint: painPoint || undefined,
      triedBefore: triedBefore === "yes" ? true : triedBefore === "no" ? false : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    // If already subscribed to substack sequence, no need to send welcome
    if (result.alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed to Simon's Agents",
      });
    }

    // Send welcome email immediately
    const emailHtml = await render(
      SubstackWelcomeEmail({ email, segment })
    );

    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Welcome to Simon's Agents - Your Build Stack Starter Kit",
      html: emailHtml,
      attachments: [
        {
          filename: "CLAUDE.md",
          content: Buffer.from(CLAUDE_MD_TEMPLATE).toString("base64"),
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Welcome! Check your email for the Build Stack Starter Kit.",
    });
  } catch (error) {
    console.error("Substack subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

// CLAUDE.md template to attach
const CLAUDE_MD_TEMPLATE = `# CLAUDE.md - Build Stack Context File

## Project Overview
<!-- What are you building? Who is it for? What problem does it solve? -->


## Tech Stack
<!-- What technologies are you using? Keep it simple. -->
- Framework:
- Styling:
- Database:
- Hosting:

## Project Structure
<!-- Key folders and what they contain -->


## Current State
<!-- What exists? What's working? What's broken? -->


## Goals
<!-- What are you trying to accomplish in this session? -->


## Constraints
<!-- What should Claude avoid? What patterns do you prefer? -->
-
-

## Style Guide
<!-- How should the code/output look and feel? -->


---

## How to Use This File

1. Fill out each section (15 minutes max)
2. Reference this file at the start of conversations with Claude
3. Update it as your project evolves
4. The more context you provide, the better Claude's output

## The Build Stack

1. **Context** - This file. What does Claude need to know?
2. **Direction** - What do you want? (Not how to code it)
3. **Iteration** - Refine through conversation
4. **Verification** - Does it work? Test the output, not the code.
`;
// Build trigger: 1768572754
