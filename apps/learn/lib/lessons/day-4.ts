import { LessonData } from "./types";

export const day4: LessonData = {
  day: 4,
  title: "Make It Real",
  subtitle: "Take your rough first version and turn it into something you'd actually show someone.",
  duration: 150,
  objectives: [
    "Learn to recontextualize Claude at the start of each session",
    "Deploy to Vercel — get your project live on the internet",
    "Experience the auto-deploy workflow (push → live)",
    "Learn to iterate instead of starting over",
    "Share your URL and get real feedback",
  ],

  sections: [
    {
      id: "intro",
      type: "intro",
      subtitle: "Your project goes live today.",
      hook: "Yesterday you built something that works locally. Today, anyone with a link can see it. That changes everything.",
    },

    // Context and Compaction explanation
    {
      id: "context-intro",
      type: "concept",
      title: "How Claude Remembers (And Forgets)",
      content: `Before we start today, let's talk about something you'll notice: Claude doesn't remember yesterday.

Every conversation with Claude has a **context window** — think of it as a whiteboard. Everything you say, everything Claude says, every file it reads goes on that whiteboard.

The whiteboard has a limit. When it fills up, Claude **compacts** the conversation — it summarizes what happened so far to make room for more. Important details can get lost in that summary.`,
    },

    {
      id: "context-implications",
      type: "callout",
      calloutType: "info",
      title: "What this means for you",
      content: `- **New session = blank whiteboard.** Claude doesn't remember previous conversations.
- **Long sessions get summarized.** If you've been working for hours, Claude may forget early details.
- **Your files are the memory.** CLAUDE.md, project-scope.md — these persist. Claude can always re-read them.

This is why we **recontextualize** at the start of each session.`,
    },

    // Recontextualize ritual
    {
      id: "recontextualize",
      type: "concept",
      title: "The Start-of-Session Ritual",
      content: `It's a new day. New session. Claude's whiteboard is blank.

Before you do anything else, help Claude catch up. This takes 30 seconds and saves hours of confusion.`,
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
      prompt: `Read through my project — look at CLAUDE.md, project-scope.md, and the code files. Summarize what's been built so far and where I left off. What's working? What's not done yet?`,
      expectedOutcome: "Claude understands your project and where you are.",
    },

    {
      id: "ritual-note",
      type: "callout",
      calloutType: "tip",
      title: "Make this a habit",
      content: `Every new session, start here. It's your ritual. The 30 seconds you spend recontextualizing saves the frustration of Claude making changes that don't fit your project.

Now that Claude knows where you are, let's get your project live.`,
    },

    // Deploy to Vercel
    {
      id: "deploy-intro",
      type: "concept",
      title: "Deploy Early, Not Late",
      content: `Most people wait until something is "ready" to put it online. That's backwards.

Deploy now, while it's rough. You need a real URL to share for feedback. Seeing your project on the internet changes your perspective. The first version is never perfect — get over that now.`,
    },

    {
      id: "deploy-exercise",
      type: "exercise",
      title: "Deploy to Vercel",
      instructions: [
        "Ask Claude to help you deploy",
        "Follow the steps — create a Vercel account if needed",
        "Connect your GitHub repository",
        "Wait for the first deploy to complete",
      ],
      prompt: `Help me deploy this project to Vercel. I want to connect it to my GitHub repository so it deploys automatically when I push changes.`,
      expectedOutcome: "A live URL. Your project on the internet.",
    },

    {
      id: "vercel-free",
      type: "concept",
      title: "Vercel Is Free",
      content: `Vercel has a generous free tier. You won't need to pay unless you're getting serious traffic. For learning and personal projects, free is more than enough. Don't worry about cost here.`,
    },

    {
      id: "deploy-moment",
      type: "callout",
      calloutType: "tip",
      title: "Open it on your phone",
      content: `Once you have your URL, open it on your phone. See your project there. That's yours. You built that.`,
    },

    // The workflow visual
    {
      id: "workflow-concept",
      type: "concept",
      title: "The Push → Live Workflow",
      content: `Here's what just happened: you connected GitHub to Vercel. Now, every time you push code to GitHub, Vercel automatically deploys it.

Make a change → Push to GitHub → Wait 30 seconds → See it live.

This is how real software works. No manual uploading. No FTP. Just push and it's live.

Now that you can see it live, you'll notice things that need fixing. That's next.`,
    },

    // Common Problems section
    {
      id: "problems-intro",
      type: "concept",
      title: "Common Problems (And How to Fix Them)",
      content: `Now that it's live, you'll probably notice things that are wrong. That's good — you're seeing it fresh. Find your problem below and use the prompt provided.`,
    },

    {
      id: "problems-nav",
      type: "nav-links",
      title: "Jump to your problem:",
      links: [
        { label: "Mobile doesn't work", targetId: "problem-mobile" },
        { label: "Layout issues", targetId: "problem-layout" },
        { label: "It doesn't look good", targetId: "problem-aesthetics" },
        { label: "Need to add something new", targetId: "problem-planning" },
      ],
    },

    // Problem 1: Mobile
    {
      id: "problem-mobile",
      type: "concept",
      title: "Problem: Mobile Doesn't Work",
      content: `It looks fine on your computer but broken on your phone. Containers too wide. Text tiny. Buttons impossible to tap.

**The fix:** Be specific about what's wrong. Claude can't see your screen. Describe exactly what you see:`,
    },

    {
      id: "mobile-prompt",
      type: "code",
      title: "Prompt: Fix mobile issues",
      language: "text",
      code: `When I view this on mobile:
- The main container extends past the screen width
- The text in the header is too small to read
- The buttons are stacked but there's no spacing
- [Describe exactly what you see]

Fix these mobile issues while keeping desktop working.`,
      copyable: true,
    },

    // Problem 2: Layout
    {
      id: "problem-layout",
      type: "concept",
      title: "Problem: Layout Issues",
      content: `Things overlapping. Spacing inconsistent. It just looks... wrong.

**The fix:** Describe the visual problem specifically:`,
    },

    {
      id: "layout-prompt",
      type: "code",
      title: "Prompt: Fix layout",
      language: "text",
      code: `The layout has issues:
- [Element A] is overlapping with [Element B]
- The spacing between [these things] is inconsistent
- [This section] isn't centered when it should be

Fix the layout so it's clean and properly spaced.`,
      copyable: true,
    },

    // Problem 3: Aesthetics
    {
      id: "problem-aesthetics",
      type: "concept",
      title: "Problem: It Doesn't Look Good",
      content: `It works, but it looks generic. Like every other AI-generated site.

**The fix:** Use the **/frontend-aesthetics** skill. This is a specialized prompt that makes Claude better at visual design.

If you haven't installed it yet, visit [skills.sh/anthropics/skills/frontend-design](https://skills.sh/anthropics/skills/frontend-design) and follow the instructions to add it to your setup.

Once installed:`,
    },

    {
      id: "aesthetics-prompt",
      type: "code",
      title: "Prompt: Improve aesthetics",
      language: "text",
      code: `This works but looks generic and AI-generated.
Use /frontend-aesthetics to improve it:
- Better typography and font choices
- Atmospheric backgrounds or subtle gradients
- More intentional color choices
- Subtle motion or hover states

Don't change functionality — just make it look crafted.`,
      copyable: true,
    },

    // Problem 4: Planning
    {
      id: "problem-planning",
      type: "concept",
      title: "Problem: Need to Add Something New",
      content: `You want to add a feature but past attempts haven't matched what you imagined.

**The fix:** Don't just ask for "a feature." Stop. Plan first.`,
    },

    {
      id: "planning-prompt",
      type: "code",
      title: "Prompt: Plan before building",
      language: "text",
      code: `Before we build anything new, I want to plan.
I'm thinking about adding [rough idea].

Ask me questions to clarify exactly what this should do.
What are the inputs? Outputs? What happens when someone
uses it? Let's align before you write any code.`,
      copyable: true,
    },

    {
      id: "planning-note",
      type: "callout",
      calloutType: "tip",
      content: `Have the planning conversation. Let Claude ask questions. Answer them. Get clear. Then: "Okay, now let's build it."

This takes 5 extra minutes and saves 30 minutes of iteration.`,
    },

    // Iteration cycle
    {
      id: "iteration-intro",
      type: "concept",
      title: "The Iteration Cycle",
      content: `Pick one problem. Use the appropriate approach above. Then repeat. This is how real software gets built — not in one shot, but in cycles.`,
    },

    {
      id: "iteration-visual",
      type: "code",
      language: "iteration-cycle",
      code: "",
      copyable: false,
    },

    {
      id: "iteration-warning",
      type: "callout",
      calloutType: "warning",
      title: "Iterate, don't start over",
      content: `When something isn't working, the temptation is to scrap it and begin again. Don't.

The skill is iteration:
- "Here's what I have"
- "Here's what's not working"
- "Here's what I actually wanted"

Claude takes these three pieces and fixes it. Starting over throws away everything you've learned.`,
    },

    // Share it
    {
      id: "share-intro",
      type: "concept",
      title: "Share It",
      content: `Send your Vercel URL to one person. A friend, family member, colleague. Someone who isn't in this Sprint.

Ask them: "What do you think? What's confusing? What would you want it to do?"

Their feedback is gold. Write it down — tomorrow you'll use it to add the feature that makes people say "I need this."`,
    },

    {
      id: "share-note",
      type: "callout",
      calloutType: "info",
      title: "Sharing feels vulnerable",
      content: `Sharing something unfinished is uncomfortable. Do it anyway.

Feedback from real people is worth 10x your own assumptions. You're not asking "Is this perfect?" You're asking "What's confusing? What would make this better?"`,
    },

    // Voice reminder
    {
      id: "voice-callout",
      type: "callout",
      calloutType: "voice",
      content: `Use your voice when answering the form below. Describe what you fixed and what feedback you received.`,
    },

    // Form
    {
      id: "reflection-form",
      type: "form",
      title: "Capture Your Progress",
      description: "Your project is live. What happened today?",
      fields: [
        {
          id: "vercel-url",
          label: "Your live Vercel URL",
          type: "text",
          placeholder: "https://your-project.vercel.app",
          required: true,
        },
        {
          id: "biggest-fix",
          label: "What was the biggest problem you fixed today, and how did you describe it to Claude?",
          type: "textarea",
          placeholder: "The issue was... I described it by...",
          required: true,
          voiceEnabled: true,
        },
        {
          id: "feedback",
          label: "Who did you share it with, and what did they say?",
          type: "textarea",
          placeholder: "I shared it with... They said...",
          required: true,
          voiceEnabled: true,
          helpText: "Even harsh feedback is valuable. Write it down.",
        },
      ],
      submitLabel: "Save Progress",
    },

    // Bonus: 2-3 Exchange Pattern
    {
      id: "bonus",
      type: "bonus",
      title: "Master the 2-3 Exchange Pattern",
      content: `What you just did — that cycle of "here's what I have, here's what's wrong, here's what I wanted" — that's a pattern. It's called the **2-3 Exchange Pattern**.

Most problems get solved in 2-3 back-and-forth exchanges with Claude. Not one. Not ten. Two or three.

**Practice this deliberately:** Pick something on your site that's almost right but not quite. Then:

> I have [describe current state]. The problem is [specific issue]. What I actually wanted was [clear description of desired outcome]. Fix this.

Watch how Claude responds. If it's still not right, use the same structure again. Notice how quickly you converge on what you want.

**Go deeper:** Try this on three different problems today. Time yourself. You'll find that being specific about "what I have / what's wrong / what I wanted" cuts your iteration time in half.

This is the core skill of building with AI. The 8-week program builds on this foundation — you'll learn advanced patterns for more complex problems. For now, internalize this one. It's the foundation of everything.`,
      collapsed: true,
    },
  ],

  checklist: [
    { id: "recontextualize", label: "Start with recontextualization" },
    { id: "deploy-vercel", label: "Deploy to Vercel" },
    { id: "view-live", label: "View it live (browser + phone)" },
    { id: "identify-problems", label: "List what's working and what's not" },
    { id: "fix-issues", label: "Fix at least 3 issues using the prompts" },
    { id: "push-live", label: "Push and see changes go live" },
    { id: "share-url", label: "Share with someone outside the Sprint" },
    { id: "get-feedback", label: "Write down their feedback" },
    { id: "complete-form", label: "Complete the form above" },
    { id: "post-discord", label: "Post your live URL in Discord" },
  ],

  nextDayTeaser:
    "Tomorrow you add real value. The feature that makes people say 'I need this.'",
};
