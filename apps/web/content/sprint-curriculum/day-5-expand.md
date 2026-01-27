# Day 5: Expand

**Status:** Final

---

## Overview

**Title:** Add Real Value

**Subtitle:** Act on feedback, add meaningful capabilities, and start capturing your next ideas.

**Duration:** 2-3 hours

---

## Learning Objectives

1. Use feedback from Day 4 to guide what you build next
2. Add capabilities that make your tool genuinely useful
3. Recognize that you now have a repeatable system
4. Start capturing ideas for other projects
5. Understand that this process works for everything, not just this one project

---

## Key Concepts Introduced

**Feedback drives what's next**
Yesterday you shared your tool with someone. They had opinions. Maybe they asked for something. Maybe they were confused by something. That feedback is your roadmap for today.

**Capabilities, not features**
We're not adding "features" to check boxes. We're adding capabilities that make this tool actually useful. Things that matter. Things that solve real problems.

**You have a system now**
Here's what you've done:
- Scoped a project with the model
- Created persistent context (CLAUDE.md)
- Built something real
- Deployed it
- Iterated based on feedback

This isn't just how you built this tool. This is how you'll build everything from now on.

**Ideas will come**
By now, you've probably thought: "I could build something for X too." Good. That's the whole point. Start capturing those ideas.

---

## Lesson Content

### Start of Session: Recontextualize

Same ritual as yesterday. It's a new session:

> "Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and where I left off. What's working? What was I improving yesterday?"

Wait for the response. Make sure the model is caught up before you start.

---

### Part 1: Review Yesterday's Feedback

Yesterday you shared your tool with someone. What did they say?

Pull up your notes. If you didn't write them down, try to remember:
- What confused them?
- What did they ask for?
- What did they try to do that didn't work?
- What did they wish it could do?

Tell Claude:

> "Yesterday I shared my tool with someone. Here's the feedback I got: [their feedback]. Which of these should I prioritize? What would add the most value?"

Let the model help you decide what's worth building.

---

### Part 2: Add Meaningful Capabilities

Pick 1-2 things from the feedback that would make your tool genuinely more useful.

**Remember Day 4:** Plan before building. Don't just say "add this." Be clear:

> "I want to add [capability]. Before you build it, let's make sure we're aligned:
> - What's the input?
> - What's the output?
> - What happens when someone uses it?
> Ask me any clarifying questions."

Once you're aligned, build it. Test it. Push it live.

**Repeat for the second capability if you have time.**

The goal isn't to add everything. It's to add the things that matter.

---

### Part 3: The System Works for Everything

Step back for a moment.

Look at what you've done this week:
- Day 0: Set up tools, captured your idea
- Day 1: Scoped it with the model
- Day 2: Created context, visualized the plan
- Day 3: Built the first version
- Day 4: Deployed, iterated, got feedback
- Day 5: Added real value based on feedback

**This is a system.** It works for any project. Not just this one.

Want to build a meal planner? Same process.
Want to build a client tracker? Same process.
Want to build something for your side business? Same process.

The Sprint taught you a way of working. The tool is just the proof.

---

### Part 4: Start Capturing Ideas

By now, you probably have other project ideas floating around. Things you thought of while building this. Things you've wanted for a while.

**Create an ideas folder:**

> "Create a folder called 'ideas' in my home directory. Inside it, create a file called 'project-ideas.md' where I can capture project ideas as they come to me."

Start writing them down. Even rough ones. Even half-baked ones.

Format doesn't matter. Just capture them:

```markdown
# Project Ideas

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
- Tired of doing this manually
```

You don't need to build these now. You just need to capture them.

---

### Part 5: Ideas On-the-Go

Quick note: Ideas don't always come when you're at your computer.

**Claude Code Mobile** lets you interact with Claude from your phone. I use it constantly to capture ideas while I'm out:

> "Add to my project-ideas.md: [rough idea for a tool]"

When you get back to your computer, the ideas are there waiting.

If you don't have Claude Code Mobile set up, that's fine. Use whatever capture system works for you - notes app, voice memo, text yourself. The point is: capture ideas when they come.

---

### Part 6: Keep Improving Your Current Project

You still have time today. Keep going:

- More feedback-driven improvements
- Things you've been wanting to fix
- Capabilities that would make you actually use this tool

Push changes live as you go. See them on your Vercel URL.

By the end of today, this should feel like a tool you'd actually use - not just a demo.

---

## Deliverables

1. Feedback from Day 4 reviewed and prioritized
2. At least 1-2 meaningful capabilities added
3. Ideas folder created with project-ideas.md
4. At least 3 ideas captured (even rough ones)
5. Changes pushed to Vercel

---

## In-Course Form

**Form fields:**

1. **What capability did you add today, and why did you choose it?**

   *Use your voice.*

2. **What's one project idea you captured today? (Just the rough concept)**

   *Use your voice.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `recontextualize` | Recontextualize | Start session by having model read your project |
| `review-feedback` | Review Day 4 feedback | What did people say when you shared it? |
| `prioritize` | Prioritize with model | Ask which feedback to act on first |
| `plan-capability` | Plan before building | Clarify inputs/outputs before coding |
| `add-capability-1` | Add first capability | Build and test something meaningful |
| `add-capability-2` | Add second capability (optional) | If time allows |
| `push-live` | Push changes live | See improvements on Vercel |
| `create-ideas-folder` | Create ideas folder | Set up a place to capture future projects |
| `capture-ideas` | Capture 3+ ideas | Write down project ideas, even rough ones |
| `complete-form` | Complete the form | Share what you added and an idea you captured |
| `post-discord` | Post in Discord | Share your progress and an idea you're excited about |

---

## Bonus: For the Impatient - Start Your Next Project (Just the Scope)

If you're feeling ambitious and finished early, try this:

Pick one idea from your project-ideas.md. Create a new folder for it:

```
my-next-project/
├── project-idea.md
```

Have a quick scoping conversation:

> "I have an idea for a tool: [idea]. Ask me questions to help clarify what this should do. Don't build anything - just help me think through it."

That's it. Don't build. Just scope.

When the Sprint is over, you'll have a head start on your next project.

---

## Pedagogical Notes

- Day 5 is about expanding the current project AND expanding their mindset
- Feedback-driven development teaches them to build what matters, not just what's possible
- "The system works for everything" is the key reframe - they're not learning to build one tool, they're learning a way of working
- Ideas folder creates infrastructure for continuous building beyond the Sprint
- Claude Code Mobile mention normalizes idea capture as ongoing habit
- Bonus scoping exercise plants the seed for continued building without overwhelming
- By end of Day 5, they should feel: "I could build anything with this process"

---

## Video Script Notes: Gaps to Address

### Gap: Feedback was "I need data persistence" - what now?
If their Day 4 feedback was "I want to save things" and they don't have persistence, this is a fork in the road.

**Address in video:**
- Option 1: Add localStorage (show how)
  - "Ask Claude: 'I want the data to persist when I refresh. Can you add localStorage to save and load automatically?'"
  - This works for single-user, same-browser use
- Option 2: Reframe the tool
  - "If persistence is complex for your use case, reframe: Instead of saving data in the tool, can it output/export something? Generate a document? Create something shareable?"
- Option 3: Accept the limitation for v1
  - "It's okay if v1 doesn't persist data. Note it for v2. Ship what you have."
- "Don't let this block you. Pick an option and move forward."

### Gap: The "system works for everything" claim - does it really?
Students might be skeptical that they can apply this to other projects.

**Address in video:**
- Acknowledge: "This process won't work for EVERY project. Enterprise software, complex apps with many users - those need more."
- But: "For tools, utilities, automations, internal apps, side projects - this process works."
- Show examples of what you could build with this same process:
  - "A calculator for [your industry]"
  - "A generator for [thing you make repeatedly]"
  - "A dashboard for [data you track]"
- "The complexity ceiling is higher than you think."

### Gap: How to prioritize feedback when there's a lot of it
Day 4 might have generated multiple pieces of feedback. How do you decide?

**Address in video:**
- Framework for prioritization:
  1. What blocks basic usage? (Fix first)
  2. What was confusing? (Fix second)
  3. What would make it genuinely more useful? (Add if time)
  4. What's nice-to-have? (Write down for v2)
- "Ask Claude to help: 'Here's all the feedback I got. Help me prioritize what to work on today.'"
- "You won't address everything. That's okay. Pick the highest impact items."

### Gap: Ideas folder location - where exactly?
"Create a folder called 'ideas' in my home directory" might be confusing.

**Address in video:**
- Show exactly where to create it:
  - Mac: `/Users/[yourname]/ideas/`
  - Windows: `C:\Users\[yourname]\ideas\`
- "This is OUTSIDE your Sprint project. It's for ALL your future projects."
- Alternative: "Or keep it in a notes app, Notion, wherever you capture ideas. The point is having a dedicated place."

### Gap: Claude Code Mobile isn't available to everyone
Some students might not have access or might be on platforms where it doesn't work.

**Address in video:**
- "If you don't have Claude Code Mobile, don't worry."
- Alternatives: Notes app, voice memos, text yourself, use ChatGPT or Claude.ai mobile
- "The tool doesn't matter. The habit matters: Capture ideas when they come."

### Gap: What if they don't have any new ideas?
Some students might not have experienced the "I could build other things" moment yet.

**Address in video:**
- That's okay: "Not everyone has ideas right away. They'll come."
- Prompt ideas: "Think about your work: What do you do repeatedly? What annoys you? What data do you wish was organized?"
- "Write down even bad ideas. They lead to good ones."
- "If you finish the Sprint with one working tool and zero new ideas, that's still a win."
