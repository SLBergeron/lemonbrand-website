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
          id: "complete-form",
          label: "Complete the daily check-in",
          description: "Tell us about yourself and your project",
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
          id: "role",
          type: "textarea",
          label: "What do you do for work? (or what did you do?)",
          placeholder: "e.g., I'm a product manager at a marketing agency",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "tech-comfort",
          type: "select",
          label: "How comfortable are you with technology?",
          options: [
            "I use apps daily but never built one",
            "I've customized spreadsheets, automations, or no-code tools",
            "I've written some code before",
            "I write code professionally",
          ],
          required: true,
        },
        {
          id: "has-idea",
          type: "select",
          label: "Do you have a project idea?",
          options: [
            "Yes, I know what I want to build",
            "I have a rough idea",
            "No idea yet — help me find one",
          ],
          required: true,
        },
        {
          id: "project-idea",
          type: "textarea",
          label: "What do you want to build?",
          placeholder: "A tool that helps me...",
          required: true,
          minLengthHint: 30,
          conditionalOn: {
            fieldId: "has-idea",
            operator: "neq",
            value: "No idea yet — help me find one",
          },
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
          minLengthHint: 30,
        },
        {
          id: "why-matters",
          type: "textarea",
          label: "Why does this matter to you?",
          placeholder: "I want this because...",
          required: false,
        },
        {
          id: "success-looks-like",
          type: "textarea",
          label: "What does success look like at the end of the week?",
          placeholder: "I'd be happy if...",
          required: false,
        },
      ],
      generatedFileTemplate: `# Project Idea: {{project-idea}}

## About Me
**Role:** {{role}}
**Tech Comfort:** {{tech-comfort}}

## Target User
{{target-user}}

## Current Process
{{current-process}}

## Why This Matters
{{why-matters}}

## Success Criteria
{{success-looks-like}}

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
          id: "complete-form",
          label: "Complete the daily check-in",
          description: "Capture your scope and learnings",
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
      formSchema: [
        {
          id: "core-feature",
          type: "textarea",
          label: "What's your ONE core feature? Describe it in one sentence.",
          placeholder: "User provides X → tool does Y → user gets Z",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "model-summary",
          type: "textarea",
          label: "Paste your model's scoping summary here",
          placeholder: "After your scoping conversation with Claude, paste the summary here...",
          required: true,
          minLengthHint: 50,
        },
        {
          id: "what-got-cut",
          type: "textarea",
          label: "What ideas did you cut during scoping? What got moved to \"v2\"?",
          placeholder: "I decided to cut...",
          required: true,
        },
        {
          id: "scope-confidence",
          type: "select",
          label: "How confident are you in this scope?",
          options: [
            "Very confident",
            "Mostly confident",
            "Still have questions",
          ],
          required: true,
        },
        {
          id: "surprise",
          type: "textarea",
          label: "What surprised you during the scoping conversation?",
          placeholder: "I didn't expect...",
          required: false,
        },
      ],
      generatedFileTemplate: `# Project Scope Summary

## Core Feature
{{core-feature}}

## Model Scoping Summary
{{model-summary}}

## Cut List (v2)
{{what-got-cut}}

## Scope Confidence: {{scope-confidence}}

## Surprises
{{surprise}}

---
*Generated from 7-Day Sprint - Day 1*
      `.trim(),
    });
    results.push({ day: 1, id: day1 });

    // Day 2: Foundation
    const day2 = await seedDay(ctx, {
      day: 2,
      title: "Foundation",
      subtitle:
        "Build the core data structures and basic functionality. Create your CLAUDE.md and visualize your plan.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 30,
      isFreePreview: false,
      markdownContent: `Content for Day 2 coming soon.`,
      objectives: [
        "Create data structures for your tool",
        "Build the basic input/output flow",
        "Create your CLAUDE.md project memory file",
        "Visualize your project plan",
      ],
      deliverables: [
        "CLAUDE.md created and committed",
        "Plan visualization (plan-visual.html)",
        "Basic input/output flow working",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "create-claude-md", label: "Create your CLAUDE.md file", description: "Your project's memory for Claude" },
        { id: "visualize-plan", label: "Create your plan visualization", description: "HTML file that maps your project" },
        { id: "build-flow", label: "Build basic input/output flow" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Capture your foundation decisions" },
        { id: "complete-exercises", label: "Complete the day's exercises" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "input-process-output",
          type: "textarea",
          label: "Describe your tool's flow: What goes in? What happens? What comes out?",
          placeholder: "Input: ... → Process: ... → Output: ...",
          required: true,
          minLengthHint: 30,
        },
        {
          id: "claude-md-focus",
          type: "textarea",
          label: "What did your CLAUDE.md end up focusing on?",
          placeholder: "My CLAUDE.md covers...",
          required: true,
        },
        {
          id: "plan-visual-url",
          type: "text",
          label: "Link to your plan-visual.html (or paste a screenshot URL)",
          placeholder: "https://...",
          required: false,
        },
        {
          id: "visualization-learning",
          type: "textarea",
          label: "What did you learn about your project by seeing it visualized?",
          placeholder: "Seeing it mapped out, I realized...",
          required: true,
        },
        {
          id: "open-questions",
          type: "textarea",
          label: "Any open questions going into build day?",
          placeholder: "I'm still unsure about...",
          required: false,
        },
      ],
    });
    results.push({ day: 2, id: day2 });

    // Day 3: Build Day
    const day3 = await seedDay(ctx, {
      day: 3,
      title: "Build Day",
      subtitle:
        "Your first real build session. Get your core feature working.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 30,
      isFreePreview: false,
      markdownContent: `Content for Day 3 coming soon.`,
      objectives: [
        "Build your first real feature",
        "Practice the communication cycle with Claude",
        "Get something running you can see and interact with",
      ],
      deliverables: [
        "Core feature built and running locally",
        "At least one working user flow",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "build-core", label: "Build your core feature", description: "The ONE thing your tool must do" },
        { id: "fix-errors", label: "Fix errors as they come", description: "Practice debugging with Claude" },
        { id: "test-flow", label: "Test a complete user flow" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Report on your build session" },
        { id: "complete-exercises", label: "Complete the day's exercises" },
        { id: "screenshot", label: "Take a screenshot of what's running" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "feature-built",
          type: "textarea",
          label: "What feature did you build first? Describe what it does.",
          placeholder: "I built...",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "errors-hit",
          type: "textarea",
          label: "What errors did you hit? How did you fix them?",
          placeholder: "I ran into... and fixed it by...",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "whats-running",
          type: "textarea",
          label: "Describe what's running on your computer right now. What does it look like?",
          placeholder: "Right now I have...",
          required: true,
        },
        {
          id: "whats-rough",
          type: "textarea",
          label: "What's still rough or incomplete?",
          placeholder: "Still needs work on...",
          required: true,
        },
        {
          id: "claude-experience",
          type: "select",
          label: "How did working with Claude feel today?",
          options: [
            "Natural and productive",
            "Useful but frustrating at times",
            "Struggled a lot",
            "Got completely stuck",
          ],
          required: true,
        },
      ],
    });
    results.push({ day: 3, id: day3 });

    // Day 4: Deploy + Feedback
    const day4 = await seedDay(ctx, {
      day: 4,
      title: "Deploy + Feedback",
      subtitle:
        "Get your tool live on the internet. Share it and collect feedback.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 40,
      isFreePreview: false,
      markdownContent: `Content for Day 4 coming soon.`,
      objectives: [
        "Deploy to Vercel",
        "Share with at least one person",
        "Collect and prioritize feedback",
      ],
      deliverables: [
        "Live Vercel URL",
        "Feedback from at least one person",
        "Prioritized improvement list",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "deploy", label: "Deploy to Vercel", description: "Get a live URL" },
        { id: "verify-live", label: "Verify it works live", description: "Test the deployed version" },
        { id: "fix-deploy-issues", label: "Fix any deployment issues" },
        { id: "share", label: "Share with someone", description: "Get real feedback" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Record feedback and fixes" },
        { id: "complete-exercises", label: "Complete the day's exercises" },
        { id: "prioritize", label: "Prioritize improvement ideas" },
        { id: "fix-biggest", label: "Fix the biggest issue" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "vercel-url",
          type: "text",
          label: "Your live Vercel URL",
          placeholder: "https://your-project.vercel.app",
          required: true,
        },
        {
          id: "deploy-issues",
          type: "textarea",
          label: "What broke during deployment? How did you fix it?",
          placeholder: "Deployment issues I hit...",
          required: false,
        },
        {
          id: "biggest-fix",
          type: "textarea",
          label: "What was the biggest problem you fixed today, and how did you describe it to Claude?",
          placeholder: "The biggest issue was...",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "feedback-received",
          type: "textarea",
          label: "Who did you share it with, and what did they say?",
          placeholder: "I shared it with... and they said...",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "improvement-ideas",
          type: "textarea",
          label: "Based on feedback, what 2-3 things would make this better?",
          placeholder: "1. ...\n2. ...\n3. ...",
          required: true,
        },
      ],
    });
    results.push({ day: 4, id: day4 });

    // Day 5: Expand
    const day5 = await seedDay(ctx, {
      day: 5,
      title: "Expand",
      subtitle:
        "Add capabilities based on feedback. Make your tool more useful.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 30,
      isFreePreview: false,
      markdownContent: `Content for Day 5 coming soon.`,
      objectives: [
        "Add one capability based on feedback",
        "Decide what to skip and why",
        "Make your tool genuinely useful",
      ],
      deliverables: [
        "At least one new capability added",
        "Updated deployed version",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "choose-capability", label: "Choose which capability to add", description: "Based on feedback priorities" },
        { id: "build-capability", label: "Build the new capability" },
        { id: "test-capability", label: "Test the new capability" },
        { id: "deploy-update", label: "Deploy the updated version" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Report on what you expanded" },
        { id: "complete-exercises", label: "Complete the day's exercises" },
        { id: "capture-ideas", label: "Capture future project ideas" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "capability-added",
          type: "textarea",
          label: "What capability did you add today, and why did you choose it?",
          placeholder: "I added... because...",
          required: true,
          minLengthHint: 20,
        },
        {
          id: "feedback-acted-on",
          type: "textarea",
          label: "What feedback did you act on? What did you skip and why?",
          placeholder: "I acted on... and skipped... because...",
          required: true,
        },
        {
          id: "tool-description-now",
          type: "textarea",
          label: "What does your tool do now that it didn't do yesterday?",
          placeholder: "Now it can also...",
          required: true,
        },
        {
          id: "project-idea-captured",
          type: "textarea",
          label: "What's one project idea you captured today?",
          placeholder: "Another tool I could build...",
          required: false,
        },
        {
          id: "usefulness-rating",
          type: "select",
          label: "How useful is this tool to you right now?",
          options: [
            "Very useful — I'd use this daily",
            "Somewhat — needs more work",
            "Not yet — but I can see the potential",
          ],
          required: true,
        },
      ],
    });
    results.push({ day: 5, id: day5 });

    // Day 6: Polish
    const day6 = await seedDay(ctx, {
      day: 6,
      title: "Polish",
      subtitle:
        "No new features. Fix bugs, improve UX, and prepare your demo.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 30,
      isFreePreview: false,
      markdownContent: `Content for Day 6 coming soon.`,
      objectives: [
        "Fix remaining bugs",
        "Improve UI/UX polish",
        "Run robustness and security checks",
        "Prepare your one-liner and demo",
      ],
      deliverables: [
        "Polished, deployed tool",
        "One-sentence description ready",
        "Demo plan prepared",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "fix-bugs", label: "Fix remaining bugs" },
        { id: "improve-ux", label: "Improve UI/UX", description: "Loading states, error messages, layout" },
        { id: "robustness-check", label: "Ask Claude robustness questions" },
        { id: "security-check", label: "Run security review", description: "Ask Claude to check for vulnerabilities" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Capture your polish decisions" },
        { id: "write-one-liner", label: "Write your one-sentence description" },
        { id: "plan-demo", label: "Plan your demo for tomorrow" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "not-added",
          type: "textarea",
          label: "What did you choose NOT to add today? Why was that the right call?",
          placeholder: "I resisted adding... because...",
          required: true,
        },
        {
          id: "robustness-findings",
          type: "textarea",
          label: "What did Claude find when you asked robustness questions?",
          placeholder: "Claude identified...",
          required: true,
        },
        {
          id: "security-findings",
          type: "textarea",
          label: "What did your security check reveal?",
          placeholder: "The security review found...",
          required: false,
        },
        {
          id: "one-liner",
          type: "textarea",
          label: "In one sentence, what does your tool do?",
          placeholder: "My tool...",
          required: true,
          minLengthHint: 15,
        },
        {
          id: "ship-readiness",
          type: "select",
          label: "How do you feel about shipping tomorrow?",
          options: [
            "Ready and excited",
            "Ready but nervous",
            "Not sure it's good enough",
            "Behind — still have work to do",
          ],
          required: true,
        },
      ],
    });
    results.push({ day: 6, id: day6 });

    // Day 7: Ship
    const day7 = await seedDay(ctx, {
      day: 7,
      title: "Ship It",
      subtitle:
        "Record your demo, reflect on the week, and decide what's next.",
      trainingVideoUrl: "",
      trainingDurationMinutes: 20,
      isFreePreview: false,
      markdownContent: `Content for Day 7 coming soon.`,
      objectives: [
        "Record your demo video",
        "Reflect on the week",
        "Decide your next step",
      ],
      deliverables: [
        "Demo video recorded and shared",
        "Sprint reflection completed",
      ],
      checklistItems: [
        { id: "watch-training", label: "Watch the training video" },
        { id: "record-demo", label: "Record your demo video", description: "Use Loom or screen recording" },
        { id: "share-demo", label: "Share your demo" },
        { id: "complete-form", label: "Complete the daily check-in", description: "Your final Sprint reflection" },
        { id: "complete-exercises", label: "Complete the day's exercises" },
        { id: "post-progress", label: "Share progress in Discord" },
      ],
      formSchema: [
        {
          id: "demo-link",
          type: "text",
          label: "Link to your demo video (Loom or upload)",
          placeholder: "https://www.loom.com/share/...",
          required: true,
        },
        {
          id: "biggest-learning",
          type: "textarea",
          label: "What's the most important thing you learned this week?",
          placeholder: "The biggest thing I learned...",
          required: true,
          minLengthHint: 30,
        },
        {
          id: "what-v2-looks-like",
          type: "textarea",
          label: "If you kept building this, what would v2 look like?",
          placeholder: "For v2, I would...",
          required: false,
        },
        {
          id: "whats-next",
          type: "select",
          label: "What's next for you?",
          options: [
            "Keep improving this tool",
            "Build something new",
            "Join the 8-Week Program",
            "Take a break",
          ],
          required: true,
        },
        {
          id: "recommendation",
          type: "textarea",
          label: "Would you recommend this to someone? What would you tell them?",
          placeholder: "I'd tell them...",
          required: false,
        },
      ],
    });
    results.push({ day: 7, id: day7 });

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
