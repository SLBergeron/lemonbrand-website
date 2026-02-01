import { LessonData } from "./types";

export const day1: LessonData = {
  day: 1,
  title: "Scope Your Project",
  subtitle: "Turn your idea into a buildable plan.",
  duration: 60,
  objectives: [
    "Set up your project folder",
    "Learn to reference files instead of pasting",
    "Use Claude to scope your project",
    "Get honest feedback, not agreement",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "No code today. That's intentional.",
      hook: "You don't know what you need until you talk it through. The model asks questions you wouldn't ask yourself.",
    },

    // Core concept
    {
      id: "thinking-partner",
      type: "concept",
      title: "Claude as Thinking Partner",
      content: `Not just for building. For scoping, planning, deciding.

Today you won't write a single line of code. You'll have a conversation that shapes what you build for the rest of the week.

Planning catches mistakes before they become code. Changing a plan is free. Changing code costs time.`,
    },

    // File referencing
    {
      id: "file-reference",
      type: "concept",
      title: "Reference Files, Don't Paste",
      content: `Your context lives in markdown files. Instead of pasting everything into every message, tell Claude to read the file.

This sounds small. It adds up fast.

As your project grows, you'll have multiple context files. Claude manages them. You don't have to.`,
    },

    // Folder setup
    {
      id: "folder-setup",
      type: "exercise",
      title: "Set Up Your Folder",
      instructions: [
        "Create a new folder for your project",
        "Move project-idea.md into it",
        "Create an empty src/ folder",
      ],
      expectedOutcome: "Your workspace is ready.",
    },

    {
      id: "folder-structure",
      type: "code",
      title: "Your folder should look like:",
      language: "text",
      code: `my-project/
├── project-idea.md    # From Day 0
├── project-scope.md   # You'll create this today
└── src/               # Empty for now`,
      copyable: false,
    },

    // Plan mode vs Build mode - interactive toggle
    {
      id: "plan-vs-build",
      type: "mode-toggle",
      title: "Two Modes of Working",
      planMode: {
        label: "Plan Mode — where you are today",
        items: [
          "Type /plan to enter planning mode",
          "Claude thinks out loud instead of writing code",
          "Ask questions, explore trade-offs, scope decisions",
          "Read everything Claude produces — push back if it's off",
          "Today: scope your project without writing a line of code",
        ],
      },
      buildMode: {
        label: "Build Mode — starting Day 3",
        items: [
          "Claude writes and edits code directly",
          "Accept Edits lets changes happen automatically",
          "You guide direction, Claude handles implementation",
          "Great once your scope is locked — risky before that",
          "Not today. Today is about getting the plan right.",
        ],
      },
      hint: "Press Shift+Tab to cycle between modes in Claude Code",
    },

    // Pushback warning - before scoping exercise so users know to watch for this
    {
      id: "pushback",
      type: "callout",
      calloutType: "warning",
      title: "Claude agrees too easily",
      content: `Models default to agreement. During scoping, this means Claude will say "great idea!" to everything — even features that will blow up your timeline.

Push back. Try:
- "What's wrong with this plan?"
- "If this fails, what's probably why?"
- "Is this actually buildable in a week?"

You want problems surfaced now, not on Day 5.`,
    },

    // Main exercise
    {
      id: "scoping-exercise",
      type: "exercise",
      title: "The Scoping Conversation",
      instructions: [
        "Open Claude in your project folder",
        "Enter plan mode (type /plan in terminal)",
        "Start with the prompt below",
        "Answer Claude's questions honestly",
        "Push back when something doesn't feel right",
      ],
      prompt: `Read project-idea.md. I want to scope this for a 7-day sprint where I'm learning to build with AI.

Help me figure out what's realistic. Ask me questions to clarify what I actually need. Don't write any code or start building — just help me think through the scope.`,
      expectedOutcome:
        "A conversation that surfaces what you actually need to build.",
    },

    {
      id: "key-questions",
      type: "callout",
      calloutType: "tip",
      title: "Questions to answer",
      content: `- What's the ONE thing this must do?
- What would be nice but isn't essential?
- Does it need to save data?
- Does it need user accounts?
- What's the simplest version that's still useful?`,
    },

    // Write scope
    {
      id: "write-scope",
      type: "exercise",
      title: "Capture the Scope",
      instructions: [
        "When you have clarity, ask Claude to write the scope file",
      ],
      prompt: `Based on our conversation, write a project-scope.md that captures:
- What we're building (one paragraph)
- The core feature (the ONE thing)
- What's out of scope
- Open questions`,
      expectedOutcome: "A project-scope.md file you can reference tomorrow.",
    },

    {
      id: "scope-warning",
      type: "callout",
      calloutType: "warning",
      title: "Signs it's too big",
      content: `- 5+ major features you "need"
- Multiple user types
- Data that syncs between devices
- The phrase "and then it would also..."

Ask Claude: "This feels too big. What's the smallest version that would still be useful?"`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Lock In Your Scope",
      description:
        "Quick check on where you landed. Your answers shape tomorrow's tips.",
      fields: [
        {
          id: "scope-feeling",
          label: "How does your scope feel right now?",
          type: "radio",
          options: [
            { value: "locked", label: "Laser focused" },
            { value: "mostly", label: "Mostly clear" },
            { value: "fuzzy", label: "Still fuzzy" },
          ],
          required: true,
        },
        {
          id: "coreFeature",
          label: "Your ONE core feature — one sentence.",
          type: "textarea",
          placeholder: "User provides X → tool does Y → user gets Z",
          required: true,
          minLengthHint: 20,
          helpText:
            "If you can't say it in one sentence, the scope might not be tight enough yet.",
        },
        {
          id: "cut-amount",
          label: "How much did you cut during scoping?",
          type: "radio",
          options: [
            { value: "nothing", label: "Nothing — already lean" },
            { value: "some", label: "A few nice-to-haves" },
            { value: "lots", label: "Killed my darlings" },
            { value: "not-enough", label: "Still too much in there" },
          ],
          required: true,
        },
        {
          id: "what-stayed-out",
          label: "What got moved to v2?",
          type: "textarea",
          placeholder: "We decided not to include... because...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "cut-amount",
            operator: "neq",
            value: "nothing",
          },
        },
        {
          id: "scope-confidence",
          label: "Confidence check — ready to build on this scope?",
          type: "radio",
          options: [
            { value: "ready", label: "Ready to build" },
            { value: "mostly", label: "Close enough" },
            { value: "questions", label: "Still have questions" },
          ],
          required: true,
        },
        {
          id: "open-questions",
          label: "What's still unresolved?",
          type: "textarea",
          placeholder: "I'm not sure about... and need to figure out...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "scope-confidence",
            operator: "eq",
            value: "questions",
          },
        },
      ],
      generateFile: {
        filename: "scope-snapshot.md",
        template: `# Scope Snapshot — Day 1

## How It Feels
**Scope clarity:** {{scope-feeling}}
**Confidence:** {{scope-confidence}}
**How much got cut:** {{cut-amount}}

## Core Feature
{{coreFeature}}

## What's Out of Scope
{{what-stayed-out}}

## Open Questions
{{open-questions}}
`,
      },
      submitLabel: "Lock It In",
    },

    // Self-paced note
    {
      id: "ready-note",
      type: "callout",
      calloutType: "info",
      content: `Done scoping? You can move straight to Day 2 — no need to wait. The "days" are a suggested rhythm, not a requirement.`,
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Go deeper on pushback",
      content: `Already got Claude to poke holes? Push harder with these:

> Steelman the opposite. Make the best case for NOT building this.

> What assumptions am I making that might be wrong?

> If someone smart looked at this plan, what would they criticize?

Write down anything that surprises you. Add it to open questions in project-scope.md.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "create-folder", label: "Create your project folder" },
    { id: "move-idea", label: "Move project-idea.md into it" },
    { id: "plan-mode", label: "Enter plan mode" },
    { id: "scoping-convo", label: "Have the scoping conversation" },
    { id: "identify-core", label: "Identify your core feature" },
    { id: "write-scope", label: "Have Claude write project-scope.md" },
    { id: "save-progress", label: "Complete the form above" },
  ],

  nextDayTeaser:
    "Create your CLAUDE.md file—persistent memory that makes Claude understand your project.",
};
