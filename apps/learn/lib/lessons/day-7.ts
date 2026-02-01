import { LessonData } from "./types";

export const day7: LessonData = {
  day: 7,
  title: "You Built Something Real",
  subtitle: "Demo it. Share it. Celebrate.",
  duration: 60,
  objectives: [
    "Record a demo video of your tool",
    "Share your work with the cohort",
    "Reflect on what you learned",
    "Decide what's next",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "You did it.",
      hook: "Seven days ago, you had an idea. Now you have a working tool, live on the internet, that you built. That's not nothing. That's huge.",
    },

    // Celebration
    {
      id: "celebration",
      type: "affirmation",
      title: "Stop and Recognize This",
      hook: "Most people never build anything. You actually did it.",
      icon: "/assets/3dicons-trophy-dynamic-color.png",
      content: `They think about it. They plan to learn someday. They save tutorials they'll never watch.

You have a working tool. Live on the internet. That you built with your own hands and a very helpful AI collaborator.

Whatever happens next — whether you use this tool every day or never touch it again — you proved something to yourself this week.

**You can build things. Real things. Things that work.**`,
      points: [
        "You went from idea to deployed product in seven days.",
        "You learned a system that works for any project.",
        "You pushed through the hard parts instead of quitting.",
        "You're part of a community of builders now.",
      ],
      conclusion: "That's a skill that doesn't go away. Well done. Seriously.",
    },

    // Demo
    {
      id: "demo-intro",
      type: "concept",
      title: "Record Your Demo",
      content: `Record a short video (2-5 minutes) showing your tool. Use Loom (free) or any screen recorder.

**What to cover:**
1. What is this tool? (one sentence)
2. Show it working — walk through the main flow
3. What are you proud of?
4. What would you improve in v2?

Don't script it. Don't make it perfect. Just show what you built like you're showing a friend.

> "Hey, let me show you this thing I made this week..."

That's the vibe.`,
    },

    {
      id: "demo-tip",
      type: "callout",
      calloutType: "tip",
      content: `Nervous? That's normal. You're sharing something you made.

Pretend you're showing a friend, not presenting to an audience. The cohort went through the same struggle — they're cheering for you.`,
    },

    // Share
    {
      id: "share",
      type: "concept",
      title: "Share With the Cohort",
      content: `Post to Discord:
- Your demo video (Loom link or upload)
- Your live Vercel URL
- One thing you learned this week

Watch other people's demos. Leave comments. Celebrate each other.

This cohort did the same work you did. They understand what it took to get here.`,
    },

    // Reflect
    {
      id: "reflect",
      type: "concept",
      title: "Reflect",
      content: `Take a few minutes to think:

- **What did you learn** about building with AI? About yourself as a builder?
- **What surprised you?** What was easier or harder than expected?
- **What would you do differently** next time?`,
    },

    {
      id: "reflect-action",
      type: "callout",
      calloutType: "tip",
      title: "Write these down — and I mean really write them down",
      content: `Create a repo. Talk about it with Claude. Add your reflections to a markdown file that lives in version control.

This is exactly what Day 5 was about: **agents aren't just for building software.** Your reflections, your learnings, your plans — these are things that benefit from structure, from version history, from being accessible to your agent.

Six months from now, you'll be able to ask Claude: "What did I learn from my first Sprint?" and get real answers. Start building that context now.`,
    },

    // What's next
    {
      id: "whats-next",
      type: "concept",
      title: "What's Next?",
      content: `**Keep building** — Use your tool. Improve it. See how it holds up.

**Start something new** — You have an ideas folder. Pick one. You know the process now.

**Go deeper** — The 8-Week Program covers databases, authentication, mobile apps, and production patterns. If you want to build more sophisticated tools, that's the next step.

**Take a break** — You just did a Sprint. The skills don't disappear. The ideas will be there when you're ready.`,
    },

    // Stay connected
    {
      id: "community",
      type: "callout",
      calloutType: "info",
      title: "The Sprint ends. The community doesn't.",
      content: `Stay in Discord. Help newcomers. Share what you build next.

You're a builder now. That matters.`,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice for the form below. Speak from the heart about what you learned.`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Ship + Reflect",
      description: "Capture this moment.",
      fields: [
        {
          id: "demo-link",
          label: "Link to your demo video",
          type: "text",
          placeholder: "https://www.loom.com/share/...",
          required: true,
        },
        {
          id: "learned",
          label: "What's the most important thing you learned this week?",
          type: "textarea",
          placeholder: "I learned that...",
          required: true,
          voiceEnabled: true,
          minLengthHint: 20,
        },
        {
          id: "what-v2-looks-like",
          label: "If you kept building this, what would v2 look like?",
          type: "textarea",
          placeholder: "Version 2 would have...",
          voiceEnabled: true,
        },
        {
          id: "next",
          label: "What's next for you?",
          type: "select",
          options: [
            { value: "keep-improving", label: "Keep improving this tool" },
            { value: "build-new", label: "Build something new" },
            { value: "join-8week", label: "Join the 8-Week Program" },
            { value: "take-break", label: "Take a break" },
          ],
          required: true,
        },
        {
          id: "recommendation",
          label: "Would you recommend this to someone? What would you tell them?",
          type: "textarea",
          placeholder: "I would tell them...",
          voiceEnabled: true,
        },
      ],
      submitLabel: "Complete the Sprint",
    },

    // Sign off
    {
      id: "signoff",
      type: "concept",
      title: "Final Note",
      content: `You started with an idea.

You ended with a working tool, a deployed URL, a system for building, and a community of people who did it alongside you.

Not everyone finishes. You did.

**Now go build the next thing.**

— Simon`,
    },

    // Social follows
    {
      id: "social-follow",
      type: "social-follow",
      title: "Stay Connected",
      description: "Follow along as I build in public",
      links: [
        {
          platform: "youtube",
          url: "https://www.youtube.com/@slbergeron",
          handle: "@slbergeron",
        },
        {
          platform: "twitter",
          url: "https://x.com/SLBergeron",
          handle: "@SLBergeron",
        },
        {
          platform: "linkedin",
          url: "https://www.linkedin.com/in/slbergeron",
          handle: "Simon Bergeron",
        },
        {
          platform: "tiktok",
          url: "https://www.tiktok.com/@simonbergeron",
          handle: "@simonbergeron",
        },
        {
          platform: "discord",
          url: "https://discord.gg/e9RUCR8tfv",
          handle: "Lemonbrand",
        },
        {
          platform: "substack",
          url: "https://substack.com/@slbergeron",
          handle: "@slbergeron",
        },
      ],
    },

    // Referral program
    {
      id: "referral",
      type: "referral",
      title: "Know Someone Who Should Do This?",
      description:
        "Share the Sprint with a friend. When they sign up, you both win.",
      friendBenefit: "20% off the Sprint",
      referrerBenefit: "20% credit toward your next program",
      ctaLabel: "Get Your Referral Link",
    },
  ],

  checklist: [
    { id: "record-demo", label: "Record demo video (2-5 min)" },
    { id: "post-discord", label: "Post to Discord (video + URL + learning)" },
    { id: "watch-others", label: "Watch other demos, leave comments" },
    { id: "reflect", label: "Write your reflection" },
    { id: "decide-next", label: "Decide what's next" },
    { id: "complete-form", label: "Complete the form above" },
  ],
};
