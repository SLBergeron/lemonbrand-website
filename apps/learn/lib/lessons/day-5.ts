import { LessonData } from "./types";

export const day5: LessonData = {
  day: 5,
  title: "Add Real Value",
  subtitle:
    "Act on feedback, add meaningful capabilities, and start capturing your next ideas.",
  duration: 150,
  objectives: [
    "Use feedback from Day 4 to guide what you build next",
    "Add capabilities that make your tool genuinely useful",
    "Recognize that you now have a repeatable system",
    "Start capturing ideas for future projects",
    "Understand that this process works for everything",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "You have a system now.",
      hook: "Yesterday someone used your tool. They had opinions. Today, those opinions become features. By the end of this day, you'll realize: you can build anything.",
    },

    // Recontextualize ritual
    {
      id: "recontextualize",
      type: "concept",
      title: "Start of Session: Recontextualize",
      content: `Same ritual as yesterday. New session, blank whiteboard.

Help Claude catch up before you start building.`,
    },

    {
      id: "recontextualize-prompt",
      type: "exercise",
      title: "Recontextualize",
      instructions: [
        "Open Claude in your project folder",
        "Run the prompt below",
        "Wait for the response — make sure Claude understands before you continue",
      ],
      prompt: `Read through my project — CLAUDE.md, project-scope.md, and the code. Summarize what's been built and where I left off. What's working? What was I improving yesterday?`,
      expectedOutcome: "Claude understands your project and where you are.",
    },

    // Review feedback
    {
      id: "feedback-intro",
      type: "concept",
      title: "Your Feedback Is Your Roadmap",
      content: `Yesterday you shared your tool with someone. What did they say?

Pull up your notes from Day 4. If you didn't write them down, try to remember:
- What confused them?
- What did they ask for?
- What did they try to do that didn't work?
- What did they wish it could do?

Their feedback tells you exactly what to build next.`,
    },

    {
      id: "feedback-exercise",
      type: "exercise",
      title: "Review and Prioritize Feedback",
      instructions: [
        "Gather your notes from Day 4",
        "Tell Claude what feedback you received",
        "Let Claude help you prioritize",
      ],
      prompt: `Yesterday I shared my tool with someone. Here's the feedback I got:
[their feedback]

Which of these should I prioritize? What would add the most value?`,
      expectedOutcome: "Clarity on what to build next.",
    },

    // Capabilities, not features
    {
      id: "capabilities-concept",
      type: "concept",
      title: "Capabilities, Not Features",
      content: `We're not adding "features" to check boxes. We're adding **capabilities** that make this tool genuinely useful.

Features are things you list. Capabilities are things that matter. Things that solve real problems.

The difference: A feature says "has dark mode." A capability says "helps me track my clients without losing information."

Focus on what makes your tool actually useful.`,
    },

    // Planning reminder (callback to Day 4)
    {
      id: "planning-reminder",
      type: "callout",
      calloutType: "tip",
      title: "Remember: Plan before building",
      content: `Day 4 taught you the pattern. Don't skip it now.

Before you add anything: clarify inputs, outputs, and what happens when someone uses it. Five minutes of planning saves thirty minutes of iteration.`,
    },

    // Exercise: Add capability
    {
      id: "add-capability",
      type: "exercise",
      title: "Add Your First Capability",
      instructions: [
        "Pick the highest-priority item from your feedback",
        "Plan it with Claude before building",
        "Build it, test it, push it live",
      ],
      prompt: `I want to add [capability]. Before you build it, let's make sure we're aligned:
- What's the input?
- What's the output?
- What happens when someone uses it?

Ask me any clarifying questions.`,
      expectedOutcome: "A new capability added and working.",
    },

    {
      id: "aligned-note",
      type: "callout",
      calloutType: "info",
      content: `Once you're aligned, tell Claude: "Okay, build it."

Then test it. Push it live. See it on your Vercel URL.`,
    },

    // Second capability
    {
      id: "second-capability",
      type: "concept",
      title: "Add a Second Capability (If Time Allows)",
      content: `If you finish early and have energy, repeat the process for a second piece of feedback.

Same pattern:
1. Identify what to add
2. Plan with Claude (inputs, outputs, behavior)
3. Build and test
4. Push live

The goal isn't to add everything. It's to add the things that matter.`,
    },

    // The system visualization
    {
      id: "system-intro",
      type: "concept",
      title: "Step Back: You Have a System",
      content: `Look at what you've done this week:`,
    },

    {
      id: "system-visual",
      type: "code",
      language: "sprint-system",
      code: "",
      copyable: false,
    },

    // The paradigm shift - agents change everything
    {
      id: "paradigm-shift",
      type: "paradigm",
      title: "This Is Bigger Than Software",
      hook: "You didn't just learn to build an app. You learned a new way of using your computer.",
      icon: "/assets/3dicons-computer-dynamic-color.png",
      content: `Think about how you used to work: staring at a blank document, trying to figure out where to start. Switching between apps, copying data manually, formatting things by hand. Spending hours on tasks that feel like they should take minutes.

Now you have an agent. And that agent doesn't just build software.

**Everything you do professionally is better through an agent.** Not because AI is magic — because working with an agent forces structure. Your ideas become trackable. Your plans become executable. Your rough thoughts become real outputs.

80% of what you do on a computer can be done better this way.`,
      examples: [
        {
          label: "Planning your day",
          description:
            "Instead of a scattered to-do list, you have a structured system that adapts. Your priorities become clear. Your agent remembers context you'd forget.",
        },
        {
          label: "Building a presentation",
          description:
            "It's just a React page away. You describe what you want to communicate, and you get slides that actually look good — not another PowerPoint template.",
        },
        {
          label: "Analyzing your budget",
          description:
            "A CSV and a conversation. Ask questions about your spending. Get visualizations. Find patterns you'd never spot staring at spreadsheets.",
        },
        {
          label: "Writing a proposal",
          description:
            "You explain the project, the client, the constraints. The agent structures it, formats it, catches what you missed. You review and refine.",
        },
        {
          label: "Organizing a project",
          description:
            "Instead of scattered notes, you have structured documents that evolve. Your agent tracks decisions, surfaces dependencies, keeps everything connected.",
        },
      ],
      conclusion:
        "The Sprint taught you to communicate with agents. That skill applies to everything — not just building apps. This is how you'll work from now on.",
    },

    // Ideas section
    {
      id: "ideas-intro",
      type: "concept",
      title: "Start Capturing Ideas",
      content: `By now, you've probably thought: "I could build something for X too."

Good. That's the whole point.

You'll have more ideas. Ideas while building, ideas in the shower, ideas while doing something else entirely. Don't let them disappear.`,
    },

    {
      id: "ideas-exercise",
      type: "exercise",
      title: "Create an Ideas Folder",
      instructions: [
        "Ask Claude to create an ideas folder outside your Sprint project",
        "This is for ALL your future projects",
        "Start capturing ideas — even rough ones",
      ],
      prompt: `Create a folder called 'ideas' in my home directory. Inside it, create a file called 'project-ideas.md' where I can capture project ideas as they come to me.`,
      expectedOutcome: "A dedicated place to capture future project ideas.",
    },

    {
      id: "ideas-example",
      type: "code",
      title: "Example format (doesn't have to be fancy):",
      language: "markdown",
      code: `# Project Ideas

## Client follow-up tracker
- Remind me to follow up with clients
- Track last contact date
- Simple, just for me

## Recipe scaler
- Take a recipe, scale it for different serving sizes
- I always mess up the math

## Invoice generator
- Input: client, hours, rate
- Output: formatted invoice PDF
- Tired of doing this manually`,
      copyable: false,
    },

    {
      id: "ideas-note",
      type: "callout",
      calloutType: "tip",
      content: `Write down even bad ideas. They lead to good ones.

If you finish the Sprint with one working tool and zero new ideas, that's still a win. Ideas will come.`,
    },

    // Mobile capture
    {
      id: "mobile-ideas",
      type: "concept",
      title: "Ideas On-the-Go",
      content: `Ideas don't always come when you're at your computer.

**Claude Code Mobile** lets you interact with Claude from your phone. You can add ideas to your project-ideas.md while you're out:

> "Add to my project-ideas.md: [rough idea for a tool]"

Don't have Claude Code Mobile? Use whatever capture system works — notes app, voice memo, text yourself. The tool doesn't matter. The habit matters: **capture ideas when they come.**`,
    },

    {
      id: "mobile-repo-note",
      type: "callout",
      calloutType: "info",
      title: "Claude Code Mobile requires a repo",
      content: `To use Claude Code Mobile, your ideas folder needs to be in a Git repository. This is actually a good thing.

**Why version history matters for ideas:**
- You can see *when* you had each idea — timing is context
- You can track how ideas evolved over time
- Your agents can access this history too
- Six months from now, you'll remember the context you were in when the idea hit

An idea you had during a busy season means something different than one you had while relaxed. That timeline is useful information.`,
    },

    // Keep improving
    {
      id: "keep-going",
      type: "concept",
      title: "Keep Improving Your Current Project",
      content: `You still have time today. Keep going:

- More feedback-driven improvements
- Things you've been wanting to fix
- Capabilities that would make you actually use this tool

Push changes live as you go. See them on your Vercel URL.

By the end of today, this should feel like a tool you'd actually use — not just a demo.`,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice when answering the form below. Describe what capability you added and why.`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Expansion Report",
      description: "Your answers here personalize tomorrow's polish tips for your specific project.",
      fields: [
        {
          id: "capability-added",
          label: "What capability did you add today, and why did you choose it?",
          type: "textarea",
          placeholder: "I added... because the feedback showed...",
          required: true,
          voiceEnabled: true,
          minLengthHint: 20,
        },
        {
          id: "feedback-acted-on",
          label: "What feedback did you act on? What did you skip and why?",
          type: "textarea",
          placeholder: "I acted on... I skipped... because...",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "tool-description-now",
          label: "What does your tool do now that it didn't do yesterday?",
          type: "textarea",
          placeholder: "Now it can also...",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "project-idea",
          label: "What's one project idea you captured today? (Just the rough concept)",
          type: "textarea",
          placeholder: "I want to build something that...",
          voiceEnabled: true,
        },
        {
          id: "usefulness-rating",
          label: "How useful is this tool to you right now?",
          type: "select",
          options: [
            { value: "very-useful", label: "Very useful — I'd use this daily" },
            { value: "somewhat", label: "Somewhat — needs more work" },
            { value: "not-yet", label: "Not yet — but I can see the potential" },
          ],
          required: true,
        },
      ],
      submitLabel: "Save Progress",
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "For the Impatient: Scope Your Next Project",
      content: `If you're feeling ambitious and finished early, try this:

Pick one idea from your project-ideas.md. Create a new folder for it:

\`\`\`
my-next-project/
├── project-idea.md
\`\`\`

Have a quick scoping conversation:

> "I have an idea for a tool: [idea]. Ask me questions to help clarify what this should do. Don't build anything — just help me think through it."

That's it. **Don't build. Just scope.**

When the Sprint ends, you'll have a head start on your next project. The 8-week program takes you deeper — persistence, authentication, multi-user apps, mobile deployment. But you'll already have something ready to build.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "recontextualize", label: "Recontextualize (start of session ritual)" },
    { id: "review-feedback", label: "Review Day 4 feedback" },
    { id: "prioritize", label: "Prioritize with Claude" },
    { id: "plan-capability", label: "Plan before building" },
    { id: "add-capability-1", label: "Add first capability" },
    { id: "add-capability-2", label: "Add second capability (optional)" },
    { id: "push-live", label: "Push changes live" },
    { id: "create-ideas-folder", label: "Create ideas folder" },
    { id: "capture-ideas", label: "Capture 3+ project ideas" },
    { id: "complete-form", label: "Complete the form above" },
    { id: "post-discord", label: "Post in Discord: what you added + an idea you're excited about" },
  ],

  nextDayTeaser:
    "Tomorrow you finish. Not perfect — finished. The hardest lesson in building.",
};
