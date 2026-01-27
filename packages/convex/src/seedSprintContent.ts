// @ts-nocheck
import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed all Sprint content (admin mutation)
export const seedAll = mutation({
  args: {},
  handler: async (ctx) => {
    const results: { day: number; id: string }[] = [];

    // Day 0 content
    const day0 = await seedDay(ctx, {
      day: 0,
      title: "Get Ready to Build",
      subtitle:
        "Choose your interface, set up your tools, and define what you want to build. Everything that follows ties back to this.",
      trainingVideoUrl: "", // TODO: Add video URL
      trainingDurationMinutes: 12,
      isFreePreview: true,
      markdownContent: `
## Voice-to-Text: The Missing Piece

Building with AI is a conversation. Typing that conversation is slow.

Tools like **Wispr Flow** or **SuperWhisper** let you talk to your computer and have it transcribe in real-time. This is how I work. It's more natural, more effective, and significantly faster.

You don't need this to complete the Sprint, but it removes a huge amount of friction. If you're serious about building this way long-term, set it up now.

## Choosing Your Path: Cursor vs Terminal

| | **Cursor** | **Terminal (Claude Code)** |
|---|---|---|
| **Best for** | Easier learning curve | More flexibility long-term |
| **Why it works** | Files and AI in the same window | Adapts to how you actually work |
| **The tradeoff** | Simpler to start | More potential as you grow |

**Pick one. You can always switch later.**

## The Cost Reality

You can't have this capability without paying something. Here's what it actually costs:

**Cursor Path:**
- Cursor Pro: $20/month (baseline)
- Start with Pro, upgrade when you hit limits

**Terminal Path:**
- Anthropic API: Pay-as-you-go (good for learning)
- Claude Max: $200/month (unlimited, for heavy builders)

## What Makes a Good Sprint Project

**The right size:** A tool. Not a business. Not a platform. A single tool that does one thing well.

**Good examples:**
- Proposal generator
- Content structuring tool
- Simple website or landing page
- Presentation maker

**The test:** Can you explain what it does in one sentence? If not, it's too big.
      `.trim(),
      objectives: [
        "Understand the cost of AI-assisted building",
        "Choose your interface: Cursor or Terminal",
        "Set up voice-to-text (recommended)",
        "Install and configure your tools",
        "Define your project idea",
        "Join the Discord and meet your cohort",
      ],
      deliverables: [
        "Working Claude Code or Cursor installation",
        "Voice-to-text tool installed (recommended)",
        "Verified API connection",
        "Project idea defined",
        "Discord introduction posted",
      ],
      checklistItems: [
        {
          id: "watch-training",
          label: "Watch the training video",
          description: "Understand your options before choosing",
        },
        {
          id: "choose-path",
          label: "Choose your path",
          description: "Cursor or Terminal",
        },
        {
          id: "setup-billing",
          label: "Set up billing",
          description: "Cursor subscription or Anthropic API credits",
        },
        {
          id: "install-tools",
          label: "Install your tools",
          description: "Follow the setup guide for your chosen path",
        },
        {
          id: "setup-voice",
          label: "Set up voice-to-text (optional)",
          description: "Wispr Flow, SuperWhisper, or similar",
        },
        {
          id: "first-command",
          label: "Run your first command",
          description: "Verify everything works",
        },
        {
          id: "define-project",
          label: "Define your project",
          description: "Complete the project idea form",
        },
        {
          id: "join-discord",
          label: "Join the Discord",
          description: "Access your cohort channel",
        },
        {
          id: "post-intro",
          label: "Post your intro",
          description: "Your name + what you want to build",
        },
      ],
      formSchema: [
        {
          id: "project-idea",
          type: "textarea",
          label: "What do you want to build?",
          placeholder: "A tool that helps me...",
          required: true,
        },
        {
          id: "target-user",
          type: "select",
          label: "Who is it for?",
          options: ["Just me", "My team", "My clients", "Public"],
          required: true,
        },
        {
          id: "current-process",
          type: "textarea",
          label: "What do you do manually today that this would replace?",
          placeholder: "Currently I spend time doing...",
          required: true,
        },
        {
          id: "why-matters",
          type: "textarea",
          label: "Why does this matter to you?",
          placeholder: "I want this because...",
          required: false,
        },
      ],
      generatedFileTemplate: `# Project Idea: {{project-idea}}

## Target User
{{target-user}}

## Current Process
{{current-process}}

## Why This Matters
{{why-matters}}

---
*Generated from 7-Day Sprint - Day 0*
      `.trim(),
      bonusContent: `
### For the Impatient

Done with setup and itching to start? Here's something to do before Day 1:

**Talk to Claude about your project.**

Open your terminal or Cursor and have a conversation:
> "I want to build [your project idea]. Ask me questions to help clarify what this should do."

Don't build anything yet. Just talk. See what questions Claude asks. See what you hadn't thought about.

This is practice for Day 1, where we do this properly.
      `.trim(),
    });
    results.push({ day: 0, id: day0 });

    // Day 1 content
    const day1 = await seedDay(ctx, {
      day: 1,
      title: "Scope + First Build",
      subtitle:
        "Narrow your scope to an MVP, describe it clearly, and get your first working code from Claude.",
      trainingVideoUrl: "", // TODO: Add video URL
      trainingDurationMinutes: 20,
      isFreePreview: true,
      markdownContent: `
## The Scoping Trap

Most projects fail because they're too big. Your goal for Day 1 is to find the smallest possible version that's still useful.

Ask yourself:
- What's the ONE thing this tool must do?
- What can I remove and still have value?
- What's the simplest possible interface?

## The 2-3 Exchange Pattern

When working with Claude, expect to go back and forth 2-3 times to close the gap between what you got and what you wanted.

**Exchange 1:** Describe what you want
**Exchange 2:** Refine based on the output
**Exchange 3:** Final adjustments

This isn't a failure—it's the process.

## Your First Request Template

\`\`\`
I'm building [project description].

Today I want to create [specific feature].

Please create:
- [File 1]
- [File 2]

Use [tech stack/constraints].
\`\`\`

## Today's Exercise

1. Open Claude Code in your project
2. Send your first request
3. Run the code
4. Iterate 2-3 times

Remember: The goal is working code, not perfect code.
      `.trim(),
      objectives: [
        "Narrow your project to MVP scope",
        "Write your first clear request to Claude",
        "Get working code running",
        "Practice the 2-3 Exchange Pattern",
        "Update your CLAUDE.md with learnings",
      ],
      deliverables: [
        "MVP scope defined (1 sentence)",
        "First feature built and running",
        "CLAUDE.md updated",
        "Progress shared in Discord",
      ],
      checklistItems: [
        {
          id: "watch-training",
          label: "Watch the training video",
        },
        {
          id: "mvp-scope",
          label: "Define your MVP scope",
          description: "One sentence that captures the core",
        },
        {
          id: "first-feature",
          label: "Choose your first feature",
          description: "The smallest valuable piece",
        },
        {
          id: "first-request",
          label: "Write your first Claude request",
        },
        {
          id: "run-code",
          label: "Get code and run it",
          description: "Don't worry about perfection",
        },
        {
          id: "iterate",
          label: "Iterate 2-3 times",
          description: "Refine based on what you got",
        },
        {
          id: "working-code",
          label: "Verify you have working code",
        },
        {
          id: "update-claude-md",
          label: "Update CLAUDE.md",
          description: "Add what you learned",
        },
        {
          id: "post-progress",
          label: "Share progress in Discord",
        },
      ],
    });
    results.push({ day: 1, id: day1 });

    // Days 2-7 (paid content - summaries only for now)
    const paidDays = [
      {
        day: 2,
        title: "Foundation",
        subtitle: "Build the core data structures and basic functionality",
        duration: 30,
        objectives: [
          "Create data structures for your tool",
          "Build the basic input/output flow",
          "Get a minimal working version",
        ],
      },
      {
        day: 3,
        title: "Structure",
        subtitle: "Add navigation, layouts, and connect components",
        duration: 30,
        objectives: [
          "Create page structure and navigation",
          "Connect different parts of your tool",
          "Make it feel like an actual app",
        ],
      },
      {
        day: 4,
        title: "Core Features",
        subtitle: "Implement the main functionality that makes your tool valuable",
        duration: 40,
        objectives: [
          "Build the primary feature set",
          "Add the 'magic' that makes it useful",
          "Test with real data",
        ],
      },
      {
        day: 5,
        title: "Expand",
        subtitle: "Add secondary features, error handling, edge cases",
        duration: 30,
        objectives: [
          "Add nice-to-have features",
          "Handle edge cases gracefully",
          "Improve error messages",
        ],
      },
      {
        day: 6,
        title: "Polish",
        subtitle: "Improve UI/UX, add loading states, fix bugs",
        duration: 30,
        objectives: [
          "Make it look good",
          "Add loading and error states",
          "Fix any remaining bugs",
        ],
      },
      {
        day: 7,
        title: "Ship It",
        subtitle: "Deploy your tool and share with the world",
        duration: 20,
        objectives: [
          "Deploy to Vercel",
          "Get a custom domain (optional)",
          "Share your creation",
        ],
      },
    ];

    for (const dayData of paidDays) {
      const id = await seedDay(ctx, {
        day: dayData.day,
        title: dayData.title,
        subtitle: dayData.subtitle,
        trainingVideoUrl: "", // TODO: Add video URLs
        trainingDurationMinutes: dayData.duration,
        isFreePreview: false,
        markdownContent: `Content for Day ${dayData.day} coming soon.`,
        objectives: dayData.objectives,
        deliverables: [],
        checklistItems: [
          { id: "watch-training", label: "Watch the training video" },
          { id: "complete-exercises", label: "Complete the day's exercises" },
          { id: "post-progress", label: "Share progress in Discord" },
        ],
      });
      results.push({ day: dayData.day, id });
    }

    return results;
  },
});

// Helper function to upsert a day's content
async function seedDay(
  ctx: any,
  data: {
    day: number;
    title: string;
    subtitle: string;
    trainingVideoUrl: string;
    trainingDurationMinutes: number;
    isFreePreview: boolean;
    markdownContent: string;
    objectives: string[];
    deliverables: string[];
    checklistItems: { id: string; label: string; description?: string }[];
    formSchema?: any[];
    generatedFileTemplate?: string;
    bonusContent?: string;
  }
) {
  const existing = await ctx.db
    .query("sprintContent")
    .withIndex("by_day", (q: any) => q.eq("day", data.day))
    .first();

  if (existing) {
    await ctx.db.patch(existing._id, data);
    return existing._id;
  }

  return await ctx.db.insert("sprintContent", data);
}
