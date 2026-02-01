import { LessonData } from "./types";

export const day0: LessonData = {
  day: 0,
  title: "Get Ready to Build",
  subtitle: "Pick your tool, set it up, decide what you're building.",
  duration: 30,
  videoUrl: "https://www.youtube.com/embed/TsG6cMgFfxc",
  objectives: [
    "Choose Cursor or Terminal",
    "Set up your tools",
    "Define your project",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "This is Day 0. Everything builds from here.",
      hook: "You're not learning to code. You're learning to communicate with something that codes.",
    },

    // Path choice
    {
      id: "path-choice",
      type: "concept",
      title: "Cursor or Terminal",
      content: `Two ways to build with Claude.

**[Cursor ↗](https://cursor.com)** — Visual interface. Files and AI in the same window. Easier if you've never touched code. $20/month.

**[Terminal (Claude Code) ↗](https://claude.com/product/claude-code)** — Text interface. More flexible. Adapts to how you actually work. $20/month for Claude Pro.

Pick one. You can switch later.`,
    },

    {
      id: "path-help",
      type: "callout",
      calloutType: "tip",
      content: `Not sure? Start with Cursor. It's more forgiving for beginners.`,
    },

    {
      id: "path-details",
      type: "details",
      trigger: "Still undecided? More details here",
      blocks: [
        {
          type: "video",
          src: "/assets/Cursor-example.mp4",
          label: "Cursor in action",
        },
        {
          type: "text",
          content: `**Cursor** is an IDE with AI built in. You write code, you see your files, you talk to Claude—all in one window. It has an "agent mode" that can make changes across multiple files. Everything lives in one place.`,
        },
        {
          type: "video",
          src: "/assets/Terminal-example.mp4",
          label: "Claude Code in the terminal",
        },
        {
          type: "text",
          content: `**Claude Code** is a terminal tool. It reads and writes files, but you're looking at a command line. You still need a separate IDE to see your code. I use [Antigravity ↗](https://antigravity.google/) because it gives me easy access to Gemini when I want it. VS Code works too. Your call.`,
        },
        {
          type: "text",
          content: `The tradeoff: Claude Code's $20/month gets you the terminal, the web app, and the mobile app. Same subscription, multiple interfaces. Cursor's $20/month is just the IDE.

**If you want a personal assistant** that follows you across devices, Claude Code might be your path.

**If you just want to build tools**, Cursor is excellent. All-in-one. Less to think about.

Both work. Pick one and start.`,
        },
        {
          type: "aside",
          title: "A note on cost",
          content: `Claude Code's $20 tier doesn't give you many tokens. Cursor rotates between multiple models, so it's more forgiving on rate limits. Either way, if you're building enough, you'll hit those limits. That's a calculus I'll let you do.

I'm on Claude's $200/month max plan. It's paid for itself many times over through time saved and new contracts landed. The math works for me. But start at $20 and see how it feels.`,
        },
      ],
    },

    // Voice
    {
      id: "voice",
      type: "concept",
      title: "Voice Input",
      content: `Building with AI is a conversation. Typing that conversation is slow.

**[Wispr Flow ↗](https://wisprflow.ai/r?SIMON685)** (1 month free with this link) lets you talk to your computer and have it transcribe in real-time. Optional, but it removes a lot of friction.`,
    },

    // Project sizing
    {
      id: "project-size",
      type: "concept",
      title: "What to Build",
      content: `A tool. Not a platform. Not a business. One thing that does one thing well.

It could be something for work — automating a process that eats your time. Or something personal — tracking a habit, organizing recipes, logging workouts. If you can describe what it does in one sentence, it's the right size.`,
    },

    {
      id: "good-examples",
      type: "project-ideas",
      title: "Good first projects",
      ideas: [
        { icon: "3dicons-file-dynamic-color.png", label: "Proposal generator" },
        { icon: "3dicons-calculator-dynamic-color.png", label: "Quote calculator" },
        { icon: "3dicons-computer-dynamic-color.png", label: "Landing page" },
        { icon: "3dicons-copy-dynamic-color.png", label: "Email templates" },
        { icon: "3dicons-roll-brush-dynamic-color.png", label: "Content formatter" },
        { icon: "3dicons-chart-dynamic-color.png", label: "Data dashboard" },
        { icon: "3dicons-gym-dynamic-color.png", label: "Workout tracker" },
        { icon: "3dicons-cup-dynamic-color.png", label: "Recipe keeper" },
        { icon: "3dicons-calender-dynamic-color.png", label: "Habit tracker" },
      ],
      footnote: "The test: Can you describe it in one sentence? Then it's the right size.",
    },

    {
      id: "avoid-these",
      type: "callout",
      calloutType: "warning",
      title: "Skip these for now",
      content: `- Anything with user accounts or login
- Anything with payments
- Anything that syncs across devices
- Anything "like [successful product]"

Saving data locally is fine — trackers, planners, and logs all work great. Just skip cloud databases and multi-device sync for now.`,
    },

    // Setup exercise
    {
      id: "setup-exercise",
      type: "exercise",
      title: "Set Up Your Tools",
      instructions: [
        "Pick Cursor or Terminal",
        "Download and install it",
        "Set up billing ($20/month)",
        "Optionally: set up voice input",
        "Run a test to verify it works",
      ],
      prompt: `Hello. Verify that you can read and write files in this directory.`,
      expectedOutcome:
        "Claude responds confirming it can access your file system.",
    },

    // Voice icon callout
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `This icon is a reminder to use your voice. Talking is faster than typing.`,
    },

    // Project discovery — guided multi-step experience
    {
      id: "project-discovery",
      type: "project-discovery",
      generateFile: {
        filename: "project-idea.md",
        template: `# Project Idea

## About Me
**Role:** {{role}}
**Tech comfort:** {{tech-comfort}}

## What I'm Building
{{whatToBuild}}

## Who It's For
{{whoIsItFor}}

## Current Process
{{currentProcess}}

## Why It Matters
{{why-matters}}

## Success Looks Like
{{success-looks-like}}
`,
        aiGeneration: {
          enabled: true,
          endpoint: "/api/generate-prd",
          loadingText: "Generating your project brief...",
        },
      },
    },

    // Ready to move on note
    {
      id: "ready-note",
      type: "callout",
      calloutType: "info",
      content: `This is a self-paced course. The "days" are a suggested rhythm for someone balancing this with a job or other commitments. If you're feeling good and want to keep going, head straight to Day 1. There's no wrong pace.`,
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Start the conversation",
      content: `Want a head start before Day 1? Open Claude and have a scoping conversation about your project.

Paste this to get started:

> I want to build {{projectIdea}}. I'm not ready to build yet — I just want to talk through the idea. Ask me questions to help clarify what it should do, who it's for, and where the edges are. Do not write any code or create any files. Just help me think.

**Important:** Claude will want to jump ahead and start building. That's what it does. You have to hold the line — keep saying "don't build yet, just help me scope this." The goal is a clear picture of what you're making, not a single line of code.

Good questions to explore together:
- What's the simplest version that's still useful?
- What inputs does it need? What does the output look like?
- What can I cut to keep this achievable in a week?

This is practice for Day 1, where we scope your project properly.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "choose-path", label: "Choose Cursor or Terminal" },
    { id: "install", label: "Install your tool" },
    { id: "setup-billing", label: "Set up billing" },
    { id: "test", label: "Run a test command" },
    { id: "define-project", label: "Complete the project form" },
    { id: "download", label: "Download project-idea.md" },
  ],

  nextDayTeaser: "Scope your project with Claude as your thinking partner.",
};
