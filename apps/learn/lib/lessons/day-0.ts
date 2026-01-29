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

Something you already do manually that could be faster. Something achievable in 7 days.`,
    },

    {
      id: "good-examples",
      type: "project-ideas",
      title: "Good first projects",
      ideas: [
        { icon: "3dicons-file-dynamic-color.png", label: "Proposal generator" },
        { icon: "3dicons-calculator-dynamic-color.png", label: "Quote calculator" },
        { icon: "3dicons-explorer-dynamic-color.png", label: "Landing page" },
        { icon: "3dicons-copy-dynamic-color.png", label: "Email templates" },
        { icon: "3dicons-roll-brush-dynamic-color.png", label: "Content formatter" },
        { icon: "3dicons-chart-dynamic-color.png", label: "Data dashboard" },
      ],
      footnote: "The test: Can you explain it in one sentence? If not, it's too big.",
    },

    {
      id: "avoid-these",
      type: "callout",
      calloutType: "warning",
      title: "Skip these for now",
      content: `- Anything with user accounts
- Anything that saves data between sessions
- Anything with payments
- Anything "like [successful product]"

Build simple first. Add complexity later.`,
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

    // Project form
    {
      id: "project-form",
      type: "form",
      title: "Define Your Project",
      description: "Answer these questions to generate your project brief.",
      fields: [
        {
          id: "whatToBuild",
          label: "What do you want to build?",
          type: "textarea",
          placeholder:
            "Example: A proposal generator that takes client name, project description, and pricing, then outputs a formatted proposal I can send",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "whoIsItFor",
          label: "Who is it for?",
          type: "radio",
          options: [
            { value: "me", label: "Just me" },
            { value: "team", label: "My team" },
            { value: "clients", label: "My clients" },
          ],
          required: true,
        },
        {
          id: "currentProcess",
          label: "What do you do manually today that this would replace?",
          type: "textarea",
          placeholder:
            "Example: Every week I spend 2 hours copying client info into a Google Doc template, adjusting the pricing section, and reformatting it to look professional",
          required: true,
          voiceEnabled: true,
        },
      ],
      generateFile: {
        filename: "project-idea.md",
        template: `# Project Idea

## What I'm Building
{{whatToBuild}}

## Who It's For
{{whoIsItFor}}

## Current Process
{{currentProcess}}
`,
        aiGeneration: {
          enabled: true,
          endpoint: "/api/generate-prd",
          loadingText: "Generating your project brief...",
        },
      },
      submitLabel: "Generate project-idea.md",
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Start the conversation",
      content: `Done with setup? Warm up by talking to Claude about your project.

Open Claude and paste this:

> I want to build [your project idea]. Ask me questions to help clarify what it should do.

Don't build anything yet. Just talk. See what questions come up. Let Claude help you think through the edges of your idea.

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
