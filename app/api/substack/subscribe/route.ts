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

    const isAlreadySubscribed = result.alreadySubscribed;

    // Send email - full welcome for new subscribers, just the docs for existing
    const segmentExample = getSegmentExample(segment);
    const attachments = [
      {
        filename: "CLAUDE.md",
        content: Buffer.from(CLAUDE_MD_TEMPLATE),
      },
      {
        filename: segmentExample.filename,
        content: Buffer.from(segmentExample.content),
      },
    ];

    try {
      if (isAlreadySubscribed) {
        // Just resend the documents
        await resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: "Your Build Stack Starter Kit (Resent)",
          html: `<p>Here's the CLAUDE.md template and example you requested.</p><p>— Simon</p>`,
          attachments,
        });
      } else {
        // Full welcome email for new subscribers
        const emailHtml = await render(
          SubstackWelcomeEmail({ email, segment })
        );

        await resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject: "Welcome to Simon's Agents - Your Build Stack Starter Kit",
          html: emailHtml,
          attachments,
        });
      }
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return NextResponse.json({
      success: true,
      alreadySubscribed: isAlreadySubscribed,
      message: isAlreadySubscribed
        ? "You're already subscribed! We've resent the template to your inbox."
        : "Welcome! Check your email for the Build Stack Starter Kit.",
    });
  } catch (error) {
    console.error("Substack subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}

// CLAUDE.md blank template
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

// Segment-specific filled examples
const SEGMENT_EXAMPLES: Record<string, { filename: string; content: string }> = {
  "lead-gen": {
    filename: "EXAMPLE-roi-calculator.md",
    content: `# CLAUDE.md - ROI Calculator (Lead-Gen Tool)

## Project Overview
Building an ROI calculator for my consulting website. Prospects input their current metrics (time spent, hourly rate, error rate) and see how much they'd save by hiring me. Filters out tire-kickers and pre-sells the value before discovery calls.

## Tech Stack
- Framework: Next.js
- Styling: Tailwind CSS
- Database: None - results emailed to me via Resend
- Hosting: Vercel

## Project Structure
\`\`\`
/app
  /roi-calculator
    page.tsx       # The calculator
/components
  ROIForm.tsx      # Input fields
  ROIResults.tsx   # Shows savings + CTA to book call
\`\`\`

## Current State
- Have a basic consulting site with home, services, about pages
- No interactive tools yet
- This will be linked from the services page

## Goals
1. Input fields: hours/week on task, hourly rate, current error rate
2. Calculate: time saved, money saved, ROI percentage
3. Show results with "Book a Discovery Call" CTA
4. Email me the lead's inputs when they complete

## Constraints
- No login required
- Mobile-first
- Keep math simple and transparent (show the formula)
- Don't overpromise - use conservative estimates

## Style Guide
- Professional, builds trust
- Show the calculation breakdown (not a black box)
- Green for savings/positive numbers
- Clear CTA button at the end
`,
  },
  "internal-tool": {
    filename: "EXAMPLE-client-tracker.md",
    content: `# CLAUDE.md - Client Tracker (Internal Tool)

## Project Overview
Replacing my messy spreadsheet with a simple client tracker. I need to see all active clients, their project status, last contact date, and upcoming deliverables in one place. Just for me - no team access needed.

## Tech Stack
- Framework: Next.js
- Styling: Tailwind CSS
- Database: Convex
- Hosting: Vercel

## Project Structure
\`\`\`
/app
  /clients
    page.tsx           # Client list/dashboard
    /[id]
      page.tsx         # Single client view
    /new
      page.tsx         # Add new client
/components
  ClientCard.tsx       # Client summary card
  ClientForm.tsx       # Add/edit client
  StatusBadge.tsx      # Active/Paused/Complete badge
\`\`\`

## Current State
- Starting fresh
- Currently tracking 8 clients in Google Sheets
- Want to migrate to something I actually enjoy using

## Goals
1. Dashboard showing all clients with status badges
2. Click into a client to see: contact info, project notes, deliverables
3. Add notes and update status easily
4. See "last contacted" to know who needs follow-up
5. Simple - not a full CRM, just my command center

## Constraints
- Only I use this (simple password protection is fine)
- No billing/invoicing - I use Stripe for that
- Must be fast to add notes (no friction)
- Mobile-friendly for checking between meetings

## Style Guide
- Clean dashboard layout
- Status colors: green (active), yellow (paused), gray (complete)
- Minimal clicks to update anything
- Dark mode support (I work late)
`,
  },
  "offer-prototype": {
    filename: "EXAMPLE-cohort-validation.md",
    content: `# CLAUDE.md - Cohort Landing Page (Offer Validation)

## Project Overview
Testing demand for a 4-week cohort program before I build the curriculum. Want to see if 10 people will put down a $200 deposit for "Build Your First AI Tool" - a live cohort where I teach non-devs to ship something real.

## Tech Stack
- Framework: Next.js
- Styling: Tailwind CSS
- Database: Convex (to store signups)
- Hosting: Vercel
- Payments: Stripe (for deposits)

## Project Structure
\`\`\`
/app
  /cohort
    page.tsx           # Sales page
  /cohort/join
    page.tsx           # Checkout/deposit page
  /cohort/confirmed
    page.tsx           # Thank you page
/components
  CohortHero.tsx       # Headline + key promise
  Curriculum.tsx       # Week-by-week breakdown
  Instructor.tsx       # About me section
  FAQ.tsx              # Common questions
  DepositForm.tsx      # Stripe checkout
\`\`\`

## Current State
- Have my main site
- Have Stripe account ready
- No curriculum built yet (that's the point - validating first)

## Goals
1. Sales page that explains the cohort and outcome
2. $200 refundable deposit to hold a spot
3. Goal: 10 deposits = I run it, <10 = refund everyone
4. Collect: email, name, what they want to build
5. Thank you page sets expectations on next steps

## Constraints
- Be honest: "This cohort runs if we hit 10 people"
- Deposits must be refundable (builds trust)
- Don't fake scarcity - real deadline based on my calendar
- Mobile-optimized

## Style Guide
- Premium but approachable (not corporate)
- Show my face - this is a personal cohort
- Testimonials if I have them, social proof if not
- Clear: dates, price, what's included, refund policy
`,
  },
};

function getSegmentExample(segment: string) {
  return SEGMENT_EXAMPLES[segment] || SEGMENT_EXAMPLES["internal-tool"];
}
