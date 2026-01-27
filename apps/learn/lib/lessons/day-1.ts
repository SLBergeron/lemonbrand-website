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

Help me figure out what's realistic. Ask me questions to clarify what I actually need.`,
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

    // Get pushback
    {
      id: "pushback",
      type: "concept",
      title: "Make Claude Disagree",
      content: `Models agree with humans. This is a problem when you need honest feedback.

Try these:
- "What's wrong with this plan?"
- "If this fails, what's probably why?"
- "What am I not seeing?"

The goal: surface problems now, not on Day 5.`,
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
      title: "Capture Your Progress",
      description: "What did you figure out today?",
      fields: [
        {
          id: "coreFeature",
          label: "Your core feature in one sentence",
          type: "text",
          placeholder: "The tool does X for Y so they can Z",
          required: true,
        },
        {
          id: "surprise",
          label: "One thing that surprised you",
          type: "textarea",
          placeholder: "I didn't expect...",
          required: true,
          voiceEnabled: true,
        },
      ],
      submitLabel: "Save Progress",
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Make Claude disagree",
      content: `Want Claude to really push back? Try these prompts:

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
