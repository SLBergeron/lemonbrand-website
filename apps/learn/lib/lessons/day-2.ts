import { LessonData } from "./types";

export const day2: LessonData = {
  day: 2,
  title: "Build Your Foundation",
  subtitle: "Set up your project's memory and see your plan come to life.",
  duration: 90,
  objectives: [
    "Create CLAUDE.md — your project's persistent memory",
    "Stay in Plan Mode — no application code today",
    "Visualize your project with an interactive playground",
    "See your tool before you build it",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "Today you'll see your project for the first time.",
      hook: "The thinking you did on Day 0 and Day 1 — that's the hard part. The code? That's the cheap part.",
    },

    // Core concept: CLAUDE.md
    {
      id: "claude-md",
      type: "concept",
      title: "Your Project's Memory",
      content: `You've probably noticed Claude "forgets" things between sessions. CLAUDE.md fixes that.

It's a file Claude reads automatically when it enters your project folder. Once set up, every conversation starts with Claude already knowing what you're building.

No more explaining your project from scratch. No more lost context.`,
    },

    // Core concept: Visualize with code — introduces playgrounds
    {
      id: "visualize-concept",
      type: "concept",
      title: "Use Code to Think",
      content: `The scoping you did yesterday? That was the valuable work. The code that implements it? Disposable.

Here's the trick: when you're stuck thinking, ask Claude to make it **visual**. Claude can generate interactive HTML files called **playgrounds** — not static pages, but tools you can click through, adjust, and explore.

Today you'll use a playground to see your project's flow before writing a line of application code.`,
    },

    // HTML files are local
    {
      id: "html-local",
      type: "callout",
      calloutType: "tip",
      title: "HTML files just work",
      content: `Double-click an HTML file, it opens in your browser. No uploading, no deployment, no servers.

Playgrounds take this further — they're interactive. Explore different views, click through flows, adjust settings. Use them freely. They're disposable thinking tools.`,
    },

    // Mode reminder — replaces mode-toggle + plan-mode-callout
    {
      id: "mode-reminder",
      type: "callout",
      calloutType: "warning",
      title: "Still in Plan Mode",
      content: `You learned about Plan Mode and Build Mode yesterday. Today you're still in Plan Mode — creating CLAUDE.md and visualizations, not application code.

If Claude starts generating app code, pull it back: "We're not building yet. Today is about foundation files."`,
    },

    // Exercise: Create CLAUDE.md
    {
      id: "create-claude-md",
      type: "exercise",
      title: "Create CLAUDE.md",
      instructions: [
        "Open Claude in your project folder",
        "Run the prompt below",
        "Read what Claude produces — don't just accept it",
        "Push back on anything that's wrong or missing",
      ],
      prompt: `Read project-idea.md, project-scope.md, and scope-snapshot.md. Based on these files, create a CLAUDE.md for this project.

This is a 7-day sprint to build a simple web app using Next.js and React. The CLAUDE.md should give you all the context you need to help me build this. Include:

- Project overview (what we're building, who it's for)
- Core feature (the ONE thing from our scope)
- Tech stack: Next.js with React (keep it simple)
- Current state: Planning complete, no code yet
- What's next: Day 3 we start building

Keep it concise. This file is for you to read at the start of every session.`,
      expectedOutcome:
        "A CLAUDE.md file that accurately captures your project.",
    },

    // Tech stack context
    {
      id: "tech-note",
      type: "concept",
      title: "A Note on Tech Choices",
      content: `We're using **Next.js and React** for this Sprint. These are popular tools for building web apps — but don't worry about understanding them yet.

Why this stack? It's well-documented, Claude knows it deeply, and it deploys easily. For a first project, that's what matters.

**This isn't the only way to build.** Python, Vue, plain HTML — there are many paths. The 8-week program covers alternatives. For now, we're keeping it simple with one proven approach.

The goal is learning to build with AI, not mastering a specific technology. The skills transfer.`,
    },

    {
      id: "review-callout",
      type: "callout",
      calloutType: "tip",
      title: "Questions to ask yourself",
      content: `- Does this capture my project accurately?
- Is anything missing that Claude should know?
- Does the project description match what's in your head?

If something's off, tell Claude what to fix.`,
    },

    // Exercise: Test context
    {
      id: "test-context",
      type: "exercise",
      title: "Test Your Context",
      instructions: [
        "Close your current session completely",
        "Open a fresh session in your project folder",
        "Ask Claude what you're building",
      ],
      prompt: `What am I building?`,
      expectedOutcome:
        "Claude knows your project without you explaining it. That's the magic.",
    },

    {
      id: "context-fail",
      type: "callout",
      calloutType: "warning",
      content: `If Claude seems confused, your CLAUDE.md needs work. Go back and improve it until the context test passes.`,
    },

    // Skills concept — introduces Skills + playground
    {
      id: "skills-concept",
      type: "concept",
      title: "Skills: Specialized Abilities",
      content: `Claude can be extended with **skills** — specialized prompts that make it better at specific tasks. Think of them like tools in a toolbelt.

One skill is particularly useful right now: **playground**. It creates interactive HTML files that let you visualize a problem, interact with it, and even generate prompts to paste back into Claude.

You'll use it in a moment to see your project come to life.`,
    },

    // Install playground
    {
      id: "install-playground",
      type: "exercise",
      title: "Install the Playground Skill",
      instructions: [
        "Run the install command for your tool",
        "Confirm the skill is available",
      ],
      prompt: `**Claude Code (Terminal):**
/plugin marketplace update claude-plugins-official
/plugin install playground@claude-plugins-official

**Cursor:**
Go to skills.sh in your browser. Find the playground skill. Follow the install instructions for Cursor.`,
      expectedOutcome: "The playground skill is installed and ready to use.",
    },

    // Visual: The flow diagram
    {
      id: "flow-diagram",
      type: "code",
      title: "What you'll visualize",
      language: "mermaid",
      code: `flowchart LR
    Trigger --> Inputs --> Tool --> Outputs --> Next`,
      copyable: false,
    },

    // Exercise: Visualize — uses playground skill
    {
      id: "visualize",
      type: "exercise",
      title: "See Your Project",
      instructions: [
        "Ask Claude to create an interactive playground",
        "Double-click the file to open it in your browser",
        "Click through the flow — does it match your mental model?",
        "Refine until it clicks",
      ],
      prompt: `Use the playground skill to visualize my project. Show:

1. **The core purpose** — what this tool does in one sentence
2. **The trigger** — what happens right before someone uses it
3. **The inputs** — what information goes in
4. **The process** — what the tool does with that information
5. **The outputs** — what comes out
6. **The next step** — what happens after using the output

Make it interactive — let me click through each stage to see details. I want to explore the flow, not just read about it.`,
      expectedOutcome:
        "An interactive HTML playground you can explore in your browser that shows your project's flow.",
    },

    // Folder structure — updated with scope-snapshot.md
    {
      id: "folder-structure",
      type: "code",
      title: "Your folder after today:",
      language: "text",
      code: `my-project/
├── project-idea.md      # From Day 0
├── project-scope.md     # From Day 1
├── scope-snapshot.md    # From Day 1
├── CLAUDE.md            # NEW: Your project's memory
├── plan-visual.html     # NEW: Your plan as an interactive playground
└── src/                 # Still empty — real code starts Day 3`,
      copyable: false,
    },

    // Why this matters
    {
      id: "why-matters",
      type: "concept",
      title: "Why This Matters",
      content: `You just went from "I have an idea" to "I can see my project" without writing application code.

This is how you'll work from now on:
- Stuck on how something should work? Ask for a quick HTML visualization.
- Not sure about a flow? Build a throwaway page to see it.
- Debating between approaches? Have Claude mock up both.

**HTML is your thinking tool.** Use it freely.`,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice when answering the form below. You set up voice-to-text on Day 0 — use it.`,
    },

    // Form — redesigned with radios and conditionals
    {
      id: "reflection-form",
      type: "form",
      title: "Check Your Foundation",
      description:
        "Quick check before build day. Your answers shape tomorrow's advice.",
      fields: [
        {
          id: "context-test",
          label: "Did Claude pass the context test?",
          type: "radio",
          options: [
            { value: "nailed", label: "Nailed it" },
            { value: "close", label: "Close but needed fixes" },
            { value: "lost", label: "Didn't know my project" },
          ],
          required: true,
        },
        {
          id: "context-fix",
          label: "What did you have to fix in CLAUDE.md?",
          type: "textarea",
          placeholder: "I had to change...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "context-test",
            operator: "neq",
            value: "nailed",
          },
        },
        {
          id: "input-process-output",
          label:
            "Your tool's flow: what goes in, what happens, what comes out?",
          type: "textarea",
          placeholder: "Input: ... → Process: ... → Output: ...",
          required: true,
          voiceEnabled: true,
          minLengthHint: 30,
        },
        {
          id: "visualization-reaction",
          label: "What happened when you saw your project visualized?",
          type: "radio",
          options: [
            { value: "changed", label: "Changed my thinking" },
            { value: "confirmed", label: "Confirmed my plan" },
            { value: "complex", label: "Revealed it's too complex" },
          ],
          required: true,
        },
        {
          id: "what-shifted",
          label: "What shifted when you saw it?",
          type: "textarea",
          placeholder: "When I saw it visualized, I realized...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "visualization-reaction",
            operator: "neq",
            value: "confirmed",
          },
        },
        {
          id: "build-readiness",
          label: "Ready for build day?",
          type: "radio",
          options: [
            { value: "ready", label: "Let's go" },
            { value: "almost", label: "Almost there" },
            { value: "unsure", label: "Not sure yet" },
          ],
          required: true,
        },
        {
          id: "open-questions",
          label: "Anything unresolved going into build day?",
          type: "textarea",
          placeholder: "I'm still wondering about...",
          voiceEnabled: true,
          helpText: "Tomorrow's tips will specifically address these.",
        },
      ],
      submitLabel: "Ready for Build Day",
      generateFile: {
        filename: "foundation-check.md",
        template: `# Foundation Check — Day 2

## Context Test
**Result:** {{context-test}}
{{context-fix}}

## Tool Flow
{{input-process-output}}

## Visualization
**Reaction:** {{visualization-reaction}}
{{what-shifted}}

## Build Readiness
**Status:** {{build-readiness}}

## Open Questions
{{open-questions}}`,
      },
    },

    // Self-paced note
    {
      id: "ready-note",
      type: "callout",
      calloutType: "info",
      content: `Foundation set? You can move straight to Day 3 — no need to wait. The "days" are a suggested rhythm, not a requirement.`,
    },

    // Bonus: Deeper playground experiments
    {
      id: "bonus",
      type: "bonus",
      title: "More playground experiments",
      content: `Playgrounds aren't just for project flows. Try these:

> Use the playground skill to show the architecture of my project — what components exist and how they connect. Let me click on each component to see details.

> Use the playground skill to explore layout options for my tool's main screen. Show three different approaches I can compare.

> Use the /frontend-aesthetics skill to refine my plan-visual.html. Combat the generic AI look — improve typography, add atmospheric backgrounds, use intentional color choices.

**Tip:** Think of a unique way of interacting with the model and ask it to express that as a playground. The results might surprise you.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "create-claude-md", label: "Create CLAUDE.md" },
    { id: "read-review", label: "Read and review — stay in Plan Mode" },
    { id: "test-context", label: "Test in a fresh session" },
    { id: "install-skill", label: "Install the playground skill" },
    { id: "create-visual", label: "Create your project playground" },
    { id: "open-browser", label: "Open it in your browser" },
    { id: "review-visual", label: "Refine until it matches your mental model" },
    { id: "save-progress", label: "Complete the foundation check" },
  ],

  nextDayTeaser:
    "Tomorrow you write real code. Your project runs locally in your browser.",
};
