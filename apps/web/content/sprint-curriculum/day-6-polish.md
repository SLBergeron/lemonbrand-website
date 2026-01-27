# Day 6: Polish

**Status:** Final

---

## Overview

**Title:** Finish, Don't Perfect

**Subtitle:** Resist the urge to keep adding. Make it solid. Tomorrow we ship.

**Duration:** 1-2 hours

---

## Learning Objectives

1. Recognize the feature trap and avoid it
2. Ask the right questions to make your tool robust
3. Understand basic security considerations
4. Accept "good enough" as the goal
5. Prepare for tomorrow's ship day

---

## Key Concepts Introduced

**The feature trap is real**
It's easy to keep adding. "Just one more thing." "This would be cool." "What if it also did X?"

Stop.

You could spend weeks adding features. You'd never ship. The goal today is not to add - it's to finish.

**Good enough is the goal**
Your first tool will not be perfect. That's fine. That's expected.

My 20th app is way better than my first one. If I rebuilt something I made 5 months ago, it would be 10x better. Not because I got lucky - because I got reps.

You get better by building more things, not by perfecting one thing.

**Build for yourself first**
Not everything needs to be a product. Not everything needs users. It's okay to build tools just for you. Disposable tools that you use a few times and move on from. That's still valuable. That's still learning.

Don't pressure yourself to make this something bigger than it needs to be.

---

## Lesson Content

### Start of Session: Recontextualize

Same ritual:

> "Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and the current state. What's working? What might need attention before I ship this tomorrow?"

---

### Part 1: Stop Adding Features

Before you do anything else, make a decision: **No new features today.**

Whatever capabilities you have right now - that's what you're shipping.

If you think "but I really want to add X" - write it down in your ideas folder for version 2. Not today.

Today is about making what exists solid. Not bigger.

---

### Part 2: The Robustness Questions

You don't need to become a developer. You just need to ask the right questions.

**Ask Claude:**

> "I'm preparing to ship this tool tomorrow. Help me think through what could go wrong:
>
> 1. What happens if someone leaves a field empty?
> 2. What happens if someone enters something unexpected?
> 3. What happens if there's no data yet? (empty states)
> 4. What happens if there's too much data?
> 5. Are there any obvious ways this could break?
>
> Don't over-engineer. Just identify the most likely problems and let's fix them simply."

Let Claude identify the issues. Fix the important ones. Skip the edge cases that probably won't happen.

**The goal:** It shouldn't break during normal use. That's it.

---

### Part 3: Basic Security Thinking

If your tool handles any kind of data, spend 2 minutes thinking about security:

> "Does this tool handle any sensitive information? Are there any obvious security concerns I should address before sharing this?"

Common things to consider:
- If there's a form, is the data going somewhere safe?
- If there are API keys, are they hidden (not in the code)?
- If someone else uses this, could they see data they shouldn't?

For a tool that's just for you, this might not matter much. For something you're sharing, it's worth a quick check.

**Don't go deep.** Just ask the question. Fix anything obvious. Move on.

---

### Part 4: The Final Polish

With the remaining time, do a final pass:

> "Look at the current state of this tool. What small improvements would make it feel more complete? Not new features - just polish. Things like:
> - Loading states
> - Confirmation messages
> - Better error messages
> - Cleaner layout
> - Anything that feels unfinished
>
> Give me a short list, prioritized by impact."

Pick 2-3 things from the list. Fix them. Push them live.

---

### Part 5: Accept Where You Are

Here's the truth: You could keep working on this forever.

There will always be something to improve. Something to add. Something that could be better.

That's true for every tool, every app, every product ever made.

At some point, you ship.

Tomorrow is that day. So today, you finish.

**What you have is enough.** It works. It does the thing you set out to do. Someone can use it.

That's a win. That's more than most people ever build.

---

### Part 6: Prepare for Tomorrow

Tomorrow you'll demo this to the cohort. You'll share what you built.

Take 5 minutes to think about:
- What does this tool do? (one sentence)
- Who is it for?
- What problem does it solve?
- What are you proud of?
- What would you do differently next time?

You don't need to write a script. Just have these answers in your head.

---

## Deliverables

1. No new features added (discipline)
2. Robustness questions asked and obvious issues fixed
3. Basic security check completed
4. Final polish pass done
5. Mentally prepared for tomorrow's demo

---

## In-Course Form

**Form fields:**

1. **What's one thing you chose NOT to add today? (And why was that the right call?)**

   *Use your voice.*

2. **In one sentence, what does your tool do?**

   *Use your voice. Practice for tomorrow.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `recontextualize` | Recontextualize | Start session by having model read your project |
| `no-new-features` | Commit to no new features | Write down any "I want to add" ideas for later |
| `robustness-questions` | Ask robustness questions | What could go wrong? Fix the obvious stuff |
| `security-check` | Basic security check | Any sensitive data? Anything exposed? |
| `final-polish` | Final polish pass | 2-3 small improvements that make it feel complete |
| `push-final` | Push final changes | Last deployment before ship day |
| `prepare-demo` | Prepare for demo | Know your one-sentence description |
| `complete-form` | Complete the form | Share what you didn't add and your one-liner |
| `post-discord` | Post in Discord | Share that you're ready to ship |

---

## Bonus: For the Impatient - Version 2 List

If you've finished your polish and have energy left, do this:

Create a file called `version-2-ideas.md` in your project folder:

> "Based on everything we've built and the feedback we've gotten, what would version 2 of this tool look like? What features would we add? What would we do differently? Create a version-2-ideas.md file with a prioritized list."

This isn't for today. It's for later - if you decide to come back to this project.

Or, it's a reference for your next project. Patterns you'd repeat. Mistakes you'd avoid.

Either way: capture it now while it's fresh.

---

## A Note on Perfectionism

Some of you are going to feel like this isn't ready. Like you need more time. Like there's too much left to do.

I get it.

But here's what I've learned: The first version is never as good as you want it to be. And that's okay.

Your 20th tool will be better than this one. Your 50th will be better than your 20th. You get good by shipping, not by polishing.

The people who build great things aren't the ones who perfect their first attempt. They're the ones who shipped it, learned from it, and built the next one.

Tomorrow, you ship.

Not because it's perfect. Because it's done.

---

## Pedagogical Notes

- Day 6 is explicitly about STOPPING, not continuing
- "No new features" is stated as a commitment, not a suggestion
- Robustness is framed as questions to ask, not technical skills to learn
- Security is surface-level - just enough to be aware, not enough to overwhelm
- "Good enough" is positioned as the goal, not a compromise
- The perfectionism note addresses the emotional resistance directly
- Version 2 list in bonus captures energy without derailing today's focus
- By end of Day 6, they should feel: "It's ready. Not perfect, but ready."

---

## Video Script Notes: Gaps to Address

### Gap: What counts as "robust enough"?
Students might not know where to draw the line between "fixed enough" and "over-engineering."

**Address in video:**
- The test: "Would this break during normal use?"
- Normal use = the happy path. Someone using it as intended.
- Not normal use = edge cases, abuse, weird inputs
- "Fix what would break during normal use. Note the rest for v2."
- Example: Empty field handling = fix. Someone entering 10,000 characters = probably fine to skip for v1.

### Gap: Security feels overwhelming
Students might panic when security is mentioned.

**Address in video:**
- "This is not a security course. We're doing a 2-minute check, not a security audit."
- For tools just for you: "Security is less critical. You're the only user."
- For shared tools, quick checks:
  - "Is there an API key visible in the code?" (Bad - ask Claude to help hide it)
  - "Could someone see other people's data?" (Bad if yes - but probably not an issue for simple tools)
  - "Is there a form that takes input?" (Probably fine - Next.js handles basics)
- "When in doubt, ask Claude: 'Are there any obvious security issues with this code?'"
- "Don't let security fear stop you from shipping. Just do the basic check."

### Gap: Perfectionism is real and hard to overcome
Some students will genuinely struggle to accept "good enough."

**Address in video:**
- Acknowledge the feeling: "If you're a perfectionist, today is hard. I get it."
- Reframe: "Shipping imperfect is a skill. It's not lowering your standards - it's recognizing that feedback from a shipped product is worth more than speculation about an unshipped one."
- Concrete comparison: "What would help you more: Another week of polishing in isolation, or 10 people using it and giving feedback?"
- "Perfect is the enemy of shipped. And shipped is where learning happens."

### Gap: They might not know how to prepare for a demo
"Just have answers in your head" might not be enough guidance.

**Address in video:**
- Walk through the prep questions:
  1. "What does this tool do?" → Practice saying it in one sentence
  2. "Who is it for?" → You? Team? Anyone?
  3. "What problem does it solve?" → The pain point that led to building it
  4. "What are you proud of?" → Pick one thing
  5. "What would you do differently?" → Be honest about learnings
- "You don't need to memorize a script. But do say these answers out loud once. It helps."
- "Tomorrow you're showing a friend something you made. That's the vibe."

### Gap: Git recovery if they broke something today
Day 6 polish might accidentally break things.

**Address in video:**
- "If you break something today and can't figure out how to fix it:"
  1. Don't panic
  2. Ask Claude: "I made changes that broke the app. Can you help me figure out what went wrong?"
  3. If stuck: "Can you help me revert to my last working commit?"
- "This is why we've been committing to GitHub. Your working code is saved."
- Show: How to find the last working commit and revert if needed

### Gap: What if they're not ready and tomorrow is ship day?
Some students will reach Day 6 and feel behind.

**Address in video:**
- "If you're behind, that's okay. You're not alone."
- Options:
  1. "Ship what you have. Imperfect and shipped beats perfect and stuck."
  2. "Focus on the one thing that would make it demoable. Ignore the rest."
  3. "Reach out in Discord. Others might have hit the same issues."
- "The goal is shipping something. Even if it's half of what you planned. That's still a win."
