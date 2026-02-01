import { LessonData } from "./types";

export const day3: LessonData = {
  day: 3,
  title: "Build Your First Feature",
  subtitle: "Stop planning. Start building. Watch your project come to life.",
  duration: 150,
  objectives: [
    "Create a real project (not just markdown files)",
    "See your app running locally in the browser",
    "Save your work with Git and GitHub",
    "Identify and build your critical first feature",
    "Learn that errors are information, not failure",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "This is the fun part.",
      hook: "You've done the thinking. Now you get to watch Claude build while you guide. Things will appear. Things will break. You'll fix them. By the end of today, you'll have something real.",
    },

    // The joy of building
    {
      id: "building-joy",
      type: "concept",
      title: "Creating is Messy (And That's Good)",
      content: `Today you'll see a lot of code appear. Files you didn't create. Terms you don't recognize. That's the process.

You're not expected to understand every line. You're expected to **try things, see what happens, and shape what emerges**.

This is creative work. You'll generate, prune, refine. Watch something rough become something real. That's the joy of building.`,
    },

    // Community support - kept but reframed
    {
      id: "not-alone",
      type: "callout",
      calloutType: "tip",
      title: "You're not alone in this",
      content: `When you hit a wall — and you will — you have options:
- Post in the Discord. Your cohort is building alongside you.
- Email me directly. I read every message.
- Ask Claude for help. It can debug with you.

Getting stuck isn't failure. It's part of every build.`,
    },

    // Why web apps
    {
      id: "why-web",
      type: "concept",
      title: "Why We're Building Web Apps",
      content: `For this Sprint, everyone builds a web app. Modern web apps work beautifully on both desktop and mobile — same code, both devices.

Mobile app development has layers of complexity (Xcode, certificates, app stores) that would derail your first build. The 8-week program goes deeper into native apps. For now: web app, browser, ship it.`,
    },

    // Visual: Browser + Mobile
    {
      id: "responsive-visual",
      type: "code",
      language: "responsive-devices",
      code: "",
      copyable: false,
    },

    // Jargon handling with actual prompt
    {
      id: "jargon",
      type: "concept",
      title: "When You Don't Understand Something",
      content: `Node.js. npm. Dependencies. Build commands. You'll see these terms. You don't need to memorize them.

When something confuses you, ask Claude to explain it. Here's a prompt that works:`,
    },

    {
      id: "jargon-prompt",
      type: "code",
      title: "Prompt: Explain jargon simply",
      language: "text",
      code: `Explain [term] to me like I'm 5. What does it do?
Why do I need it? One paragraph max.`,
      copyable: true,
    },

    {
      id: "jargon-note",
      type: "callout",
      calloutType: "info",
      content: `You don't need to understand everything to build. Understanding comes from doing.`,
    },

    // Terminal navigation reminder
    {
      id: "terminal-nav",
      type: "code",
      title: "Navigate to your project folder",
      language: "bash",
      code: `cd my-project`,
      description: "Using Cursor? Just reopen your project folder and switch to Agent mode.",
      copyable: false,
    },

    // Exercise: Create project
    {
      id: "create-project",
      type: "exercise",
      title: "Create Your Project",
      instructions: [
        "Start Claude in your project folder",
        "Run the prompt below",
        "Watch Claude work — it will create files, set up configuration, install what's needed",
      ],
      prompt: `Read my CLAUDE.md and project-scope.md. I'm ready to start building.

Create a Next.js web app for this project. Keep it simple — I just need a foundation I can build on. Set up the project structure and get it ready to run locally.`,
      expectedOutcome: "A project created with all the files Claude needs to start building.",
    },

    // Exercise: Run locally
    {
      id: "run-locally",
      type: "exercise",
      title: "See It Running",
      instructions: [
        "Claude will tell you how to run the app (usually npm run dev)",
        "Open your browser to http://localhost:3000",
        "You should see something — maybe a blank page, maybe a welcome screen, maybe an error",
      ],
      expectedOutcome: "Something visible in your browser. That's progress.",
    },

    // Error visualization
    {
      id: "error-example",
      type: "concept",
      title: "What Errors Look Like",
      content: `At some point today, you'll see something like this:`,
    },

    {
      id: "error-visual",
      type: "code",
      language: "bash",
      code: `Error: Cannot find module 'react'
npm ERR! code ELIFECYCLE
npm ERR! errno 1`,
      copyable: false,
      variant: "error",
    },

    {
      id: "error-normalize",
      type: "callout",
      calloutType: "tip",
      title: "This looks scary. It's not.",
      content: `Every piece of software ever built has produced errors like this. It looks worse than it is.

**What to do:** Copy the error. Paste it to Claude. Say "I'm seeing this error. Help me fix it."

That's it. Claude reads the error, understands the problem, and tells you what to do.`,
    },

    // GitHub section with visualization
    {
      id: "github-intro",
      type: "concept",
      title: "Save Your Work with GitHub",
      content: `Before you go further, let's make sure you don't lose anything. GitHub is your save point system.`,
    },

    {
      id: "github-visual",
      type: "code",
      title: "How GitHub protects your work",
      language: "github-flow",
      code: "",
      copyable: false,
    },

    {
      id: "github-why",
      type: "callout",
      calloutType: "info",
      content: `Every time you make progress, save it. If you break something badly, you can always go back.`,
    },

    // Exercise: GitHub
    {
      id: "setup-github",
      type: "exercise",
      title: "Set Up GitHub",
      instructions: [
        "Ask Claude to help you set up GitHub",
        "Follow the steps it provides",
        "You'll end up with a repository URL — that's your project's home",
      ],
      prompt: `Help me save this project to GitHub. I don't have a repository yet — walk me through creating one and pushing my code to it.`,
      expectedOutcome: "Your code saved to a GitHub repository.",
    },

    {
      id: "github-habit",
      type: "callout",
      calloutType: "tip",
      title: "Build the habit",
      content: `From now on, at the end of each work session: "Help me commit and push my changes to GitHub."`,
    },

    // Exercise: Identify feature
    {
      id: "identify-feature",
      type: "exercise",
      title: "Identify Your Critical Feature",
      instructions: [
        "You have a scope. You have a core feature. But what's the ONE thing to build first?",
        "Ask Claude to help you identify it",
        "Let Claude think through this with you — it might ask clarifying questions",
      ],
      prompt: `Look at my project-scope.md. What's the critical first feature — the thing that without it, this tool wouldn't work at all? What should I build first?`,
      expectedOutcome: "Clarity on what to build first.",
    },

    // Exercise: Build feature
    {
      id: "build-feature",
      type: "exercise",
      title: "Build the Feature",
      instructions: [
        "Once you've identified it, tell Claude what you want in plain language",
        "Watch Claude create files, write functions, connect things together",
        "Stay engaged — answer questions, clarify when things don't match what you imagined",
      ],
      prompt: `Okay, let's build that. Here's what I want it to do: [describe in plain language]. Build this feature.`,
      expectedOutcome: "Code written for your first feature.",
    },

    {
      id: "modes-reminder",
      type: "concept",
      title: "Switch Between Modes",
      content: `Remember from Day 2: **Plan Mode** for thinking, **Accept Edits** for building.

You'll go back and forth today. That's the rhythm. When you're figuring something out, slow down and review what Claude produces. When you're ready to execute, let Claude work while you watch.

**Shift+Tab** cycles between modes. Use it freely.`,
    },

    {
      id: "conversation-note",
      type: "callout",
      calloutType: "tip",
      content: `This is a conversation, not a handoff. If something doesn't match what you imagined:

"That's not quite what I meant. I wanted it to [clarify]."`,
    },

    // Exercise: See feature
    {
      id: "see-feature",
      type: "exercise",
      title: "See Your Feature",
      instructions: [
        "Once Claude says it's ready, refresh your browser",
        "Does it work? Even roughly?",
        "If yes: take a screenshot and save to GitHub",
        "If no: copy the error or describe what you see, and tell Claude",
      ],
      prompt: `It's not working. Here's what I see: [describe or paste error].`,
      expectedOutcome: "Something working. Not perfect. Working.",
    },

    {
      id: "goal-today",
      type: "callout",
      calloutType: "warning",
      title: "The goal today",
      content: `Something working. Even if it's rough. Even if it's ugly. Even if it's only half of what you wanted.

Tomorrow we make it real. Today we make it exist.`,
    },

    // Exercise: Save progress
    {
      id: "save-github",
      type: "exercise",
      title: "Save Your Progress",
      instructions: [
        "Before you stop, save your work to GitHub",
        "Include a message about what you built",
      ],
      prompt: `Help me commit and push my changes to GitHub with a message about what we built today.`,
      expectedOutcome: "Your code saved. You can close everything and pick up tomorrow.",
    },

    // Folder structure
    {
      id: "folder-structure",
      type: "code",
      title: "Your folder after today:",
      language: "text",
      code: `my-project/
├── project-idea.md
├── project-scope.md
├── CLAUDE.md
├── plan-visual.html
├── src/                    # NEW: Your actual code lives here
│   └── app/
│       └── page.tsx        # Your main page
├── package.json            # NEW: Project configuration
└── ... (other config files Claude creates)`,
      copyable: false,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice when answering the form below. Describe what you built and what you learned.`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Build Day Report",
      description:
        "Quick check-in. Your answers shape tomorrow's deploy tips.",
      fields: [
        {
          id: "build-momentum",
          label: "How did build day go?",
          type: "radio",
          options: [
            { value: "smooth", label: "Smooth sailing" },
            { value: "bumpy", label: "Bumpy but made it" },
            { value: "wall", label: "Hit a wall" },
          ],
          required: true,
        },
        {
          id: "feature-built",
          label: "What did you build? Describe what it does.",
          type: "textarea",
          placeholder: "It takes X and produces Y...",
          required: true,
          voiceEnabled: true,
          minLengthHint: 20,
        },
        {
          id: "errors-hit",
          label: "What tripped you up, and how did you get past it?",
          type: "textarea",
          placeholder: "I ran into... and fixed it by...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "build-momentum",
            operator: "neq",
            value: "smooth",
          },
        },
        {
          id: "whats-rough",
          label: "What still needs work?",
          type: "textarea",
          placeholder: "The main things that need attention are...",
          required: true,
          voiceEnabled: true,
          helpText: "Tomorrow's tips will help you prioritize these.",
        },
        {
          id: "claude-experience",
          label: "How did working with Claude feel?",
          type: "radio",
          options: [
            { value: "natural", label: "Natural and productive" },
            { value: "useful-frustrating", label: "Useful but frustrating" },
            { value: "struggled", label: "Struggled a lot" },
            { value: "stuck", label: "Got completely stuck" },
          ],
          required: true,
        },
      ],
      submitLabel: "Log the Build",
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Keep building",
      content: `If you finished early and your first feature works, try this:

> What's the next most important thing to build? What would make this tool actually useful?

Don't go too far — you want energy left for Day 4. But if you're in flow, keep going.

**Also:** Look at what Claude built. Open the files. Read the code. You don't need to understand every line, but start noticing patterns.

> Open page.tsx. What do you see? What looks familiar? What's confusing?

This isn't homework. It's curiosity. The more you look, the more you'll recognize next time.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "create-project", label: "Create the project" },
    { id: "run-locally", label: "Run it locally (localhost:3000)" },
    { id: "setup-github", label: "Set up GitHub and push code" },
    { id: "identify-feature", label: "Identify your critical first feature" },
    { id: "build-feature", label: "Build the feature (even if rough)" },
    { id: "save-progress", label: "Save to GitHub" },
    { id: "complete-form", label: "Complete the form above" },
    { id: "post-discord", label: "Post in Discord: what you built" },
  ],

  nextDayTeaser:
    "Tomorrow you make it real. Deploy your app so anyone can see it.",
};
