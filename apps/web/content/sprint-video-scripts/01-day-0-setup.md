# Day 0: Get Ready to Build

**Duration:** 5-7 minutes
**Purpose:** Setup tools, define project, establish mindset
**Key Insight:** You're not learning to code. You're learning to communicate with something that codes.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

You're not learning to code.

I need you to understand that right now, before we go any further.

You're learning to communicate with something that codes.

[Beat]

By the end of today, you'll have your tools set up, your project defined, and you'll be ready to start scoping tomorrow.

But more importantly, you'll understand how this whole thing works. Because it's probably not what you think.

Let's get into it.

---

## [00:45-02:15] PATH CHOICE - Cursor vs Terminal

[TALKING HEAD]

First decision: which interface do you want to use?

You have two options. Cursor, or Claude Code in the terminal.

[SCREEN SHARE: Split screen showing Cursor on left, Terminal on right]

[DEMO: Show Cursor interface]

This is Cursor. It's a code editor with AI built in. If you've ever used VS Code, this will feel familiar. Files on the left, code in the middle, AI chat on the side.

The advantage: it's visual. You can see your files. You can see what's happening. For a lot of people, that's more comfortable.

[DEMO: Show Terminal with Claude Code]

This is Claude Code in the terminal. It's a command-line interface. You type, Claude responds, it makes changes to your files.

The advantage: more flexibility. You can work across multiple projects easily. You can let Claude navigate your whole computer.

[TALKING HEAD]

Both work. Both teach you the same skills. Pick whichever feels less intimidating.

Not sure? Here's my recommendation:

If you've never touched code in your life, start with Cursor. It's more visual.

If you're comfortable with the command line, or you want the flexibility of working across projects, try Terminal.

You can always switch later. This isn't a permanent choice.

[Beat]

One more thing: both cost about $20 a month. Cursor Pro is $20. Claude Pro, which you need for Claude Code, is also $20. We're not talking about huge investments here.

---

## [02:15-03:00] VOICE INPUT

[TALKING HEAD]

Now, this is optional but I strongly recommend it.

Voice-to-text.

[SCREEN SHARE: Show Wispr Flow or SuperWhisper interface]

Building with AI is a conversation. You're going to be talking to Claude a lot. Typing all of that is slow.

Tools like Wispr Flow or SuperWhisper let you talk to your computer and have it transcribe in real-time.

[DEMO: Quick demo of speaking and seeing text appear]

I use this constantly. I'm using it right now to record parts of this video. It's more natural, it's faster, and it lets you focus on what you're trying to say instead of how fast you can type.

You don't need this to complete the Sprint. But if you're serious about building this way long-term, set it up now. It removes a huge amount of friction.

---

## [03:00-04:00] COST REALITY

[TALKING HEAD]

Let's talk money, because I want to be upfront about this.

You can't have this capability without paying something. Here's what it actually costs:

[SCREEN SHARE: Simple breakdown graphic]

Your interface - Cursor Pro or Claude Pro - that's about $20 a month.

On top of that, you'll use API credits for the actual AI work. For most Sprint projects, that's $5 to $20 total for the whole week.

[TALKING HEAD]

That's it. $25-40 for the week, roughly.

For context, I built VerifiedNode - a real SaaS with 58,000 contractor records - and it cost about $600 in API credits over two months. Your Sprint project is much smaller.

The mindset here: start small. If you're hitting usage limits, that means you're building. Upgrade at that point.

---

## [04:00-05:30] PROJECT SIZING

[TALKING HEAD]

Now the important part. What are you going to build?

The right project for the Sprint is a tool. Not a business. Not a platform. A single tool that does one thing well.

[Beat]

Something you already do in your job or life that could be faster, easier, or less annoying.

[SCREEN SHARE: Show examples list]

Good examples:
- A proposal generator - you already write proposals manually, this makes it faster
- A pricing calculator - you already do this math, the tool does it for you
- A content structuring tool - you already create content, this helps organize it

[TALKING HEAD]

Here's the key insight for project selection:

For your first Sprint, pick something that's a generator, not a tracker.

[Beat]

What do I mean by that?

[SCREEN SHARE: Show comparison]

A generator takes input, processes it, and gives you output. Input client info, get a proposal. Input numbers, get a calculation. Input ideas, get structured content.

A tracker saves data over time. Reading tracker. Habit tracker. Client follow-up tracker.

[TALKING HEAD]

Trackers need databases. They need to save your data somewhere. That adds complexity.

Generators don't need to save anything. They just... generate.

For your first project, pick a generator. You can build a tracker for your second project, or in the 8-Week program where we cover databases.

[Beat]

The test: can you explain what your tool does in one sentence? If not, it's probably too big.

---

## [05:30-06:15] COMMON SETUP ISSUES

[TALKING HEAD]

One more thing before you go set things up.

You might hit errors during installation. That's normal. Every developer hits setup issues. You're not failing - you're experiencing reality.

[SCREEN SHARE: Show example npm error]

If you see something like this - some error about npm, or node, or permissions - don't panic.

Copy the FULL error message. Paste it to Claude. Ask for help.

[SCREEN SHARE: Show pasting error to Claude and getting fix]

Claude is remarkably good at debugging setup issues. Just show it exactly what you see.

Setup is often the hardest part. Once you're past it, building is actually more straightforward.

---

## [06:15-06:45] DAY CLOSE

[TALKING HEAD]

Here's what you're going to do now:

One: Choose your path. Cursor or Terminal. Pick one.

Two: Set up billing. Get the $20/month subscription active.

Three: Install your tools. Follow the setup guide for your path.

Four: If you want, set up voice-to-text. Optional but recommended.

Five: Fill out the project form. Define what you want to build.

Six: Join the Discord and post your intro.

[Beat]

Tomorrow, you scope. Today, you decide.

You're picking your tools and your project. Everything that follows builds on this foundation.

Take your time. Get it right. I'll see you on Day 1.

[END]

---

## Production Notes

### Screen Recordings Needed
- Split screen: Cursor interface vs Terminal with Claude Code
- Cursor interface walkthrough (files, editor, chat)
- Terminal with Claude Code walkthrough
- Wispr Flow or SuperWhisper demo (speaking → text appearing)
- Cost breakdown graphic
- Project examples list (generators vs trackers)
- npm error example
- Pasting error to Claude and getting response

### Gaps Addressed from Curriculum
1. **What "web app" means** - Covered in project sizing: "anything that runs in a browser"
2. **Steer toward generators** - Explicitly covered with generator vs tracker comparison
3. **Parallel setup for both interfaces** - Showed both Cursor and Terminal side by side
4. **npm/environment errors** - Dedicated section on common setup issues

### Key Phrases
- "You're not learning to code. You're learning to communicate with something that codes."
- "Pick a generator, not a tracker"
- "Can you explain what your tool does in one sentence? If not, it's probably too big."
- "Setup is often the hardest part"

### Demo Prompts to Show
- When pasting npm error: Just show copying error text and pasting to Claude chat
