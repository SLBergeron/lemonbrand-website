# Day 0: Setup

**Status:** Final

---

## Overview

**Title:** Get Ready to Build

**Subtitle:** Choose your interface, set up your tools, and define what you want to build. Everything that follows ties back to this.

**Duration:** 30-45 minutes

---

## Learning Objectives

1. Understand the cost of AI-assisted building
2. Choose your interface: Cursor or Terminal
3. Set up voice-to-text (this changes everything)
4. Install and configure your tools
5. Define your project idea
6. Join the Discord and meet your cohort

---

## Key Concepts Introduced

**Your project is the guiding thread**
Not a tutorial project - YOUR project. Something you'll actually use. Every day ties back to this.

**Go ask your model**
From Day 0 forward, when you don't understand something, ask the model. This is the new way of working.

---

## Lesson Content

### Voice-to-Text: The Missing Piece

Building with AI is a conversation. Typing that conversation is slow.

Tools like **Wispr Flow** or **SuperWhisper** let you talk to your computer and have it transcribe in real-time. This is how I work. It's more natural, more effective, and significantly faster.

You don't need this to complete the Sprint, but it removes a huge amount of friction. If you're serious about building this way long-term, set it up now.

---

### Choosing Your Path: Cursor vs Terminal

| | **Cursor** | **Terminal (Claude Code)** |
|---|---|---|
| **Best for** | Easier learning curve | More flexibility long-term |
| **Why it works** | Files and AI in the same window. Visual, familiar if you've used VS Code. | Adapts to how you actually work - context switching between projects, emails, tasks. |
| **Context switching** | One project at a time feels natural | Open a new terminal, cd to a different repo, different project. Or let Claude navigate between folders. |
| **The tradeoff** | Simpler to start | More potential as you grow |

**Pick one. You can always switch later.**

Not sure which to choose? Ask Claude:
> "I'm new to AI-assisted building and trying to decide between Cursor and Claude Code terminal. I'm a [your background]. Which would you recommend for someone starting out?"

---

### The Cost Reality

You can't have this capability without paying something. Here's what it actually costs:

**Cursor Path:**
- Cursor Pro: $20/month (baseline)
- Cursor Pro+: Recommended if you're serious about building
- Start with Pro, upgrade when you hit limits

**Terminal Path:**
- Anthropic API: Pay-as-you-go (good for learning)
- Claude Max: $200/month (unlimited, for heavy builders)
- My setup: ~$200-300/month total (Claude Max + some Gemini/OpenAI credits)
- At that level, output is 50-60 small apps per month

**The mindset:** Start small. If you're hitting limits, that means you're building. Upgrade at that point.

---

### What Makes a Good Sprint Project

**The right size:**
A tool. Not a business. Not a platform. A single tool that does one thing well.

Something you already do in your job or life that could be faster, easier, or less annoying. Something achievable in 7 days, which means not too many moving parts.

**Good examples:**
- Proposal generator (you already write proposals manually)
- Content structuring tool (you already create content)
- Reading tracker (you already track what you read)
- Meal planner (you already plan meals)
- Simple website or landing page
- Presentation maker

**What to avoid:**
- "I want to build a business" — This Sprint teaches you to build a tool. A tool fits within a business, a department, a workflow. The business comes later.
- "I want to build an app with users, payments, and a database" — Too many moving parts. Pick ONE feature and nail it.
- "I want to build something like [successful product]" — Build something for YOUR specific need, not a clone.

**The test:** Can you explain what it does in one sentence? If not, it's too big.

---

## In-Course Form: Define Your Project

**Input fields to capture:**

1. **What do you want to build?**
   - Placeholder: "A tool that helps me..."
   - One sentence max

2. **Who is it for?**
   - Options: Just me / My team / My clients / Public

3. **What do you do manually today that this would replace?**
   - Placeholder: "Currently I spend time doing..."
   - This grounds it in reality

4. **Why does this matter to you?**
   - Placeholder: "I want this because..."

**Output:** Generated `project-idea.md` they can download and use starting Day 1.

---

## Deliverables

1. Working Claude Code or Cursor installation
2. Voice-to-text tool installed (recommended)
3. Verified API connection (ran a test command)
4. Project idea defined (via in-course form)
5. Discord introduction posted

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `watch-training` | Watch the training video | Understand your options before choosing |
| `choose-path` | Choose your path | Cursor or Terminal |
| `setup-billing` | Set up billing | Cursor subscription or Anthropic API credits |
| `install-tools` | Install your tools | Follow the setup guide for your chosen path |
| `setup-voice` | Set up voice-to-text | Wispr Flow, SuperWhisper, or similar (recommended) |
| `first-command` | Run your first command | Verify everything works |
| `define-project` | Define your project | Complete the form |
| `download-md` | Download your project-idea.md | You'll use this starting Day 1 |
| `join-discord` | Join the Discord | Access your cohort channel |
| `post-intro` | Post your intro | Your name + what you want to build |

---

## Bonus: For the Impatient

Done with setup and itching to start? Here's something to do before Day 1:

**Talk to Claude about your project.**

Open your terminal or Cursor and have a conversation:
> "I want to build [your project idea]. Ask me questions to help clarify what this should do."

Don't build anything yet. Just talk. See what questions Claude asks. See what you hadn't thought about.

This is practice for Day 1, where we do this properly.

---

## Pedagogical Notes

- Day 0 establishes the project-centered philosophy immediately
- Voice-to-text is positioned as optional but strongly recommended - reduces friction for conversational building
- Cost transparency builds trust and sets realistic expectations
- Project scope guidance prevents over-ambitious starts that lead to frustration
- The in-course form keeps them in the learning environment while capturing structured data
- Bonus section catches eager students who might otherwise jump ahead unprepared

---

## Video Script Notes: Gaps to Address

### Gap: What does "web app" actually mean?
Some students might think their idea doesn't qualify as a "web app." Clarify in the video:
- Web app = anything that runs in a browser
- Calculators, dashboards, generators, trackers, planners - all web apps
- If it opens in Chrome/Safari/Firefox, it's a web app

### Gap: Steer toward the right project types
The curriculum works best for certain project types. In the video, explicitly recommend:

**Great for Sprint (no data persistence needed):**
- Generators (proposal, invoice, content, email)
- Calculators (pricing, ROI, conversion)
- Visualizers (data → chart/display)
- Single-page tools

**Save for later (need persistence - better for 8-week):**
- Trackers (client follow-up, habit, reading)
- Planners (meal, weekly, project)
- Anything requiring user accounts
- Multi-page apps with navigation

**How to frame this:** "If your idea involves saving data that you add over time - like a tracker or planner - that's a great idea for your SECOND project or the 8-Week Program. For your first Sprint, pick something where you input data, it processes, and you get output. Generator-style tools. This lets you focus on the building process without database complexity."

### Gap: Cursor vs Terminal - need parallel demonstrations
The written content mentions both, but students need to SEE both. In all Day 0 video content:
- Show Cursor setup process
- Show Terminal/Claude Code setup process
- Make it clear they're equivalent paths, just different interfaces

### Gap: Environment/npm issues happen during setup
Students will hit issues: wrong Node version, npm errors, permission problems.

**Address in video:**
- "You might see errors during setup. That's normal."
- "When in doubt, copy the FULL error message and ask Claude to help."
- Show an example of pasting an error and Claude fixing it
- Normalize that setup is often the hardest part
