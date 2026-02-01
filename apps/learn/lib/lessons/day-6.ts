import { LessonData } from "./types";

export const day6: LessonData = {
  day: 6,
  title: "Finish, Don't Perfect",
  subtitle: "Resist the urge to keep adding. Make it solid. Tomorrow we ship.",
  duration: 90,
  objectives: [
    "Recognize the feature trap and avoid it",
    "Ask the right questions to make your tool robust",
    "Understand basic security considerations",
    "Accept 'good enough' as the goal",
    "Prepare for tomorrow's ship day",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "Today is about stopping.",
      hook: "You could keep adding forever. There's always one more thing. Today, you resist that urge. Tomorrow, you ship.",
    },

    // The feature trap
    {
      id: "feature-trap",
      type: "concept",
      title: "The Feature Trap Is Real",
      content: `"Just one more thing."
"This would be cool."
"What if it also did X?"

Stop.

You could spend weeks adding features. You'd never ship. The goal today is not to add — it's to finish.`,
    },

    {
      id: "feature-commitment",
      type: "callout",
      calloutType: "warning",
      title: "Make a decision right now",
      content: `**No new features today.**

Whatever capabilities you have right now — that's what you're shipping.

If you think "but I really want to add X" — write it down in your ideas folder for version 2. Not today.`,
    },

    // Recontextualize
    {
      id: "recontextualize",
      type: "exercise",
      title: "Recontextualize (With Ship-Day Focus)",
      instructions: [
        "Open Claude in your project folder",
        "Run the prompt below",
        "Notice: we're asking what needs attention before shipping",
      ],
      prompt: `Read through my project — CLAUDE.md, project-scope.md, and the code. Summarize what's been built and the current state. What's working? What might need attention before I ship this tomorrow?`,
      expectedOutcome: "A clear picture of where you are and what needs finishing.",
    },

    // Good enough
    {
      id: "good-enough",
      type: "concept",
      title: "Good Enough Is the Goal",
      content: `Your first tool will not be perfect. That's fine. That's expected.

My 20th app is way better than my first one. If I rebuilt something I made 5 months ago, it would be 10x better. Not because I got lucky — because I got reps.

**You get better by building more things, not by perfecting one thing.**`,
    },

    {
      id: "build-for-self",
      type: "callout",
      calloutType: "tip",
      content: `Not everything needs to be a product. Not everything needs users. It's okay to build tools just for you. Disposable tools that you use a few times and move on from.

That's still valuable. That's still learning. Don't pressure yourself to make this something bigger than it needs to be.`,
    },

    // Robustness questions
    {
      id: "robustness-intro",
      type: "concept",
      title: "The Robustness Questions",
      content: `You don't need to become a developer. You just need to ask the right questions.

These five questions will catch most problems:`,
    },

    {
      id: "robustness-prompt",
      type: "exercise",
      title: "Ask What Could Go Wrong",
      instructions: [
        "Run this prompt",
        "Let Claude identify issues",
        "Fix the important ones",
        "Skip the edge cases that probably won't happen",
      ],
      prompt: `I'm preparing to ship this tool tomorrow. Help me think through what could go wrong:

1. What happens if someone leaves a field empty?
2. What happens if someone enters something unexpected?
3. What happens if there's no data yet? (empty states)
4. What happens if there's too much data?
5. Are there any obvious ways this could break?

Don't over-engineer. Just identify the most likely problems and let's fix them simply.`,
      expectedOutcome: "Obvious issues identified and fixed. Edge cases noted for v2.",
    },

    {
      id: "robustness-goal",
      type: "callout",
      calloutType: "info",
      content: `**The goal:** It shouldn't break during normal use. That's it.

Normal use = the happy path. Someone using it as intended. Fix that. Note the rest for v2.`,
    },

    // Security
    {
      id: "security-intro",
      type: "concept",
      title: "Basic Security Thinking",
      content: `If your tool handles any kind of data, spend 2 minutes thinking about security.

This is not a security audit. It's a quick sanity check.`,
    },

    {
      id: "security-prompt",
      type: "exercise",
      title: "Quick Security Check",
      instructions: [
        "Ask Claude to review for obvious issues",
        "Fix anything critical",
        "Don't go deep — just enough to be aware",
      ],
      prompt: `Does this tool handle any sensitive information? Are there any obvious security concerns I should address before sharing this?`,
      expectedOutcome: "Awareness of any security concerns. Critical issues fixed.",
    },

    {
      id: "security-checklist",
      type: "concept",
      title: "Common Things to Consider",
      content: `- If there's a form, is the data going somewhere safe?
- If there are API keys, are they hidden (not in the code)?
- If someone else uses this, could they see data they shouldn't?

For a tool that's just for you, this might not matter much. For something you're sharing, it's worth a quick check.`,
    },

    {
      id: "security-bold",
      type: "callout",
      calloutType: "warning",
      title: "Don't let security fear stop you from shipping",
      content: `This is a 2-minute check, not a security audit. If you're not accepting customer payments or storing sensitive data, you have no liability here.

**Do the basic check. Then ship.**`,
    },

    // Final polish
    {
      id: "polish-intro",
      type: "concept",
      title: "The Final Polish",
      content: `With the remaining time, do a final pass. Not new features — just polish.

Things that make it feel complete without making it bigger.`,
    },

    {
      id: "polish-prompt",
      type: "exercise",
      title: "Small Improvements, Big Impact",
      instructions: [
        "Ask Claude for a prioritized list",
        "Pick 2-3 things from the list",
        "Fix them",
        "Push them live",
      ],
      prompt: `Look at the current state of this tool. What small improvements would make it feel more complete? Not new features — just polish. Things like:
- Loading states
- Confirmation messages
- Better error messages
- Cleaner layout
- Anything that feels unfinished

Give me a short list, prioritized by impact.`,
      expectedOutcome: "2-3 polish items completed. Tool feels more finished.",
    },

    // Shipping is a skill - affirmation block
    {
      id: "shipping-affirmation",
      type: "affirmation",
      title: "Shipping Is a Skill",
      hook: "Perfect isn't flawless. Perfect is shipped.",
      icon: "/assets/3dicons-shield-dynamic-color.png",
      content: `Some of you feel like this isn't ready. Like you need more time. Like there's too much left to do.

Here's the truth: **Nothing is permanent.** Everything you've built is a git push away from being modified. A git push away from being fixed. A git push away from being better.

You're not carving stone. You're writing code. It changes. It evolves. That's the point.

The goal isn't to make something perfect. The goal is to make something useful. To give yourself the tools to build, to learn, to go faster, to be better. To give yourself the keys to grow.`,
      points: [
        "It works. It does what you set out to do. Someone can use it. That's more than most people ever build.",
        "Your 20th tool will be better than this one. You get good by shipping, not by polishing.",
        "Feedback from a shipped product is worth more than speculation about an unshipped one.",
        "The people who build great things ship, learn, and build the next one. They don't perfect their first attempt.",
      ],
      conclusion:
        "You built something real this week. That's amazing. You're amazing. Tomorrow, you share it with the world.",
    },

    // Prepare for demo
    {
      id: "demo-prep",
      type: "concept",
      title: "Prepare for Tomorrow",
      content: `Tomorrow you'll share what you built. Take 5 minutes to think about:

- **What does this tool do?** (one sentence)
- **Who is it for?**
- **What problem does it solve?**
- **What are you proud of?**
- **What would you do differently next time?**

You don't need to memorize a script. But say these answers out loud once. It helps.

Tomorrow you're showing a friend something you made. That's the vibe.`,
    },

    // Git recovery note
    {
      id: "recovery-note",
      type: "callout",
      calloutType: "warning",
      title: "If you break something today",
      content: `Polish can accidentally break things. If that happens:

1. Don't panic
2. Ask Claude: "I made changes that broke the app. Can you help me figure out what went wrong?"
3. If stuck: "Can you help me revert to my last working commit?"

This is why we've been committing to GitHub. Your working code is saved.`,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice when answering the form below. For the one-sentence description, practice saying it out loud — you'll use it tomorrow.`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Ship Prep",
      description:
        "Your answers shape tomorrow's demo tips.",
      fields: [
        {
          id: "ship-readiness",
          label: "How do you feel about shipping tomorrow?",
          type: "radio",
          options: [
            { value: "ready-excited", label: "Ready and excited" },
            { value: "ready-nervous", label: "Ready but nervous" },
            { value: "not-sure", label: "Not sure it's good enough" },
            { value: "behind", label: "Behind — still have work to do" },
          ],
          required: true,
        },
        {
          id: "one-sentence",
          label: "In one sentence, what does your tool do?",
          type: "textarea",
          placeholder: "My tool...",
          required: true,
          voiceEnabled: true,
          helpText: "Practice for tomorrow. Say it out loud.",
          minLengthHint: 15,
        },
        {
          id: "polish-focus",
          label: "What did you focus on today?",
          type: "radio",
          options: [
            { value: "bugs", label: "Bug fixes" },
            { value: "ui", label: "UI polish" },
            { value: "edge-cases", label: "Edge cases" },
            { value: "all", label: "All of the above" },
          ],
          required: true,
        },
        {
          id: "still-rough",
          label: "What's still bothering you?",
          type: "textarea",
          placeholder: "The thing I wish I had time to fix is...",
          voiceEnabled: true,
          conditionalOn: {
            fieldId: "ship-readiness",
            operator: "neq",
            value: "ready-excited",
          },
        },
      ],
      submitLabel: "Ready to Ship",
    },

    // Bonus
    {
      id: "bonus",
      type: "bonus",
      title: "Capture Your V2 Ideas",
      content: `If you've finished your polish and have energy left, do this:

Create a file called \`version-2-ideas.md\` in your project folder:

> "Based on everything we've built and the feedback we've gotten, what would version 2 of this tool look like? What features would we add? What would we do differently? Create a version-2-ideas.md file with a prioritized list."

This isn't for today. It's for later — if you decide to come back to this project.

Or, it's a reference for your next project. Patterns you'd repeat. Mistakes you'd avoid.

**Either way: capture it now while it's fresh.** The 8-week program teaches you how to take these V2 ideas and actually build them — with persistence, authentication, and multi-user support.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "recontextualize", label: "Recontextualize (ship-day focus)" },
    { id: "no-new-features", label: "Commit to no new features" },
    { id: "robustness-questions", label: "Ask robustness questions" },
    { id: "security-check", label: "Basic security check" },
    { id: "final-polish", label: "Final polish pass (2-3 items)" },
    { id: "push-final", label: "Push final changes" },
    { id: "prepare-demo", label: "Prepare for demo (one-sentence description)" },
    { id: "complete-form", label: "Complete the form above" },
    { id: "post-discord", label: "Post in Discord: 'Ready to ship'" },
  ],

  nextDayTeaser:
    "Tomorrow you ship. You share what you built. You call yourself a builder.",
};
