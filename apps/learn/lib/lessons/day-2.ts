import { LessonData } from "./types";

export const day2: LessonData = {
  day: 2,
  title: "Build Your Foundation",
  subtitle: "Set up your project's memory and see your plan come to life.",
  duration: 90,
  objectives: [
    "Create CLAUDE.md — your project's persistent memory",
    "Learn when to plan vs. when to build",
    "Visualize your project with HTML",
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

    // Core concept: Visualize with code
    {
      id: "visualize-concept",
      type: "concept",
      title: "Use Code to Think",
      content: `The scoping you did yesterday? That was the valuable work. The code that implements it? Disposable.

Here's the trick: when you're stuck thinking, ask Claude to **visualize** it. The keyword is **HTML**.

Claude can generate a simple webpage in seconds that helps you see what you're building. Today you'll learn this skill — you'll ask Claude to create an HTML file that shows your project's flow.

No coding required. Just ask, and look.`,
    },

    // HTML files are local
    {
      id: "html-local",
      type: "callout",
      calloutType: "tip",
      title: "HTML files just work",
      content: `HTML files open directly in your browser. Double-click the file, it opens. No uploading, no deployment, no servers.

This is what makes them so powerful for quick visualization. Spin one up, look at it, learn from it, move on. They're disposable thinking tools.`,
    },

    // Plan mode vs Build mode - interactive toggle
    {
      id: "plan-vs-build",
      type: "mode-toggle",
      title: "Two Modes of Working",
      planMode: {
        label: "When you're in Plan Mode",
        items: [
          "Creating context files like CLAUDE.md",
          "Scoping, designing, making decisions",
          "Read everything Claude produces",
          "Push back and refine until it's right",
          "Today: CLAUDE.md and plan-visual.html",
        ],
      },
      buildMode: {
        label: "When Accept Edits is on",
        items: [
          "Writing code, implementing features",
          "Fixing bugs, making changes",
          "Let Claude execute while you guide",
          "Auto-accept is often fine — code is cheap",
          "Starting Day 3: real code, real features",
        ],
      },
      hint: "Press Shift+Tab to cycle between modes in Claude Code",
    },

    {
      id: "plan-mode-callout",
      type: "callout",
      calloutType: "warning",
      content: `Today you're in **Plan Mode**. You're creating foundational files. If they're wrong, everything built on top will be wrong. Take the time to read.`,
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
      prompt: `Read project-idea.md and project-scope.md. Based on these files, create a CLAUDE.md for this project.

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

    // Exercise: Visualize
    {
      id: "visualize",
      type: "exercise",
      title: "See Your Project",
      instructions: [
        "Ask Claude to create an HTML visualization",
        "Double-click the file to open it in your browser",
        "Review it — does it match your mental model?",
        "Refine until it clicks",
      ],
      prompt: `Create an HTML file called plan-visual.html that visualizes my project. Show:

1. **The core purpose** — what this tool does in one sentence
2. **The trigger** — what happens right before someone uses it
3. **The inputs** — what information goes in
4. **The process** — what the tool does with that information
5. **The outputs** — what comes out
6. **The next step** — what happens after using the output

Make it visual and clear. Use boxes, arrows, colors. I want to SEE the flow, not just read about it. Modern styling, clean typography.`,
      expectedOutcome:
        "An HTML file you can open in your browser that shows your project's flow visually.",
    },

    // Folder structure
    {
      id: "folder-structure",
      type: "code",
      title: "Your folder after today:",
      language: "text",
      code: `my-project/
├── project-idea.md      # From Day 0
├── project-scope.md     # From Day 1
├── CLAUDE.md            # NEW: Your project's memory
├── plan-visual.html     # NEW: Your plan visualized
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

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Foundation Capture",
      description: "Your answers here personalize tomorrow's tips for your specific project.",
      fields: [
        {
          id: "input-process-output",
          label: "Describe your tool's flow: What goes in? What happens? What comes out?",
          type: "textarea",
          placeholder: "Input: ... → Process: ... → Output: ...",
          required: true,
          voiceEnabled: true,
          minLengthHint: 30,
        },
        {
          id: "claude-md-focus",
          label: "What did your CLAUDE.md end up focusing on?",
          type: "textarea",
          placeholder: "The main things I told Claude about my project were...",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "visualization",
          label: "Link to your plan-visual.html (or paste a screenshot URL)",
          type: "text",
          placeholder: "Drag and drop or paste a link",
        },
        {
          id: "insight",
          label: "What did you learn about your project by seeing it visualized?",
          type: "textarea",
          placeholder: "Seeing it helped me realize...",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "open-questions",
          label: "Any open questions going into build day?",
          type: "textarea",
          placeholder: "I'm still wondering about...",
          voiceEnabled: true,
          helpText: "Tomorrow's tips will specifically address these.",
        },
      ],
      submitLabel: "Save Progress",
    },

    // Bonus: Skills
    {
      id: "bonus",
      type: "bonus",
      title: "Make it beautiful with Skills",
      content: `Your visualization works, but it might look generic. There's a way to fix that.

**Claude has Skills** — specialized prompts that make it better at specific tasks. One skill is perfect for this: \`/frontend-aesthetics\`.

To use it, install skills from [skills.sh](https://skills.sh):

> Go to skills.sh in your browser. Find the frontend-aesthetics skill. Follow the install instructions for your setup (Cursor or Claude Code).

Once installed, try this prompt:

> Use the /frontend-aesthetics skill to refine my plan-visual.html. Combat the generic AI look. Improve typography, add atmospheric backgrounds, use intentional color choices. Make it feel crafted, not generated.

Or explore different directions:

> Create three visual variants of my project visualization using /frontend-aesthetics:
> 1. Minimal and clean
> 2. Bold and confident
> 3. Warm and approachable
>
> Generate separate HTML files for each.

Open all three. See which feels like YOUR project.

**Skills are optional but powerful.** As you build more, you'll discover skills for testing, documentation, code review, and more. For now, just know they exist.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "create-claude-md", label: "Create CLAUDE.md" },
    { id: "read-review", label: "Read and review — stay in Plan Mode" },
    { id: "test-context", label: "Test in a fresh session" },
    { id: "create-visual", label: "Generate plan-visual.html" },
    { id: "open-browser", label: "Open it in your browser" },
    { id: "review-visual", label: "Refine until it matches your mental model" },
    { id: "save-progress", label: "Complete the form above" },
  ],

  nextDayTeaser:
    "Tomorrow you write real code. Your project runs locally in your browser.",
};
