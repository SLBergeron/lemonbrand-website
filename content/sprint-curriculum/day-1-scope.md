# Day 1: Scope

**Status:** Final

---

## Overview

**Title:** Scope Your Project

**Subtitle:** Take your idea and turn it into a buildable plan - with the model as your thinking partner.

**Duration:** 1-2 hours

---

## Learning Objectives

1. Set up your Sprint project folder (your workspace for the week)
2. Learn to reference files instead of pasting everything
3. Understand plan mode vs build mode
4. Use the model as a thinking partner for scoping
5. Scope your project to something achievable in 7 days
6. Get the model to critique your idea (not just agree with it)

---

## Key Concepts Introduced

**The model is your thinking partner for everything**
Not just building - scoping, planning, deciding. This is a new way of working where every step is a conversation.

**Plan mode vs Build mode**
Before you write code, you plan. The model has a "plan mode" where it thinks through the approach without making changes. This is where you do your best work - planning WITH the model, then building WITH the model. Two distinct phases.

**Reference files, don't paste**
Your project context lives in markdown files. Instead of pasting your whole idea into every message, you tell the model: "Read project-idea.md and then help me scope this." The model navigates to the file, reads it, and responds with full context.

**Requirements discovery > requirements gathering**
You don't know what you need until you talk it through. The model asks questions you wouldn't think to ask yourself.

---

## Context Management Skill: Referencing Files

**The old way (don't do this):**
> "I want to build a tool that helps me track my reading. I want to be able to add books, mark them as read, and see stats about my reading habits. It's just for me. I currently use a spreadsheet but it's annoying..."

**The new way:**
> "Read my project-idea.md file and help me scope this for a 7-day sprint. Ask me questions to clarify what I actually need."

The model reads the file, has full context, and you didn't have to paste anything.

**For Cursor:** The model can see files in your project. Just reference them by name.

**For Terminal:** Claude Code can read files directly. Use commands like:
> "Read project-idea.md and summarize what I'm trying to build"

---

## Lesson Content

### Set Up Your Sprint Folder

Before you start scoping, create your workspace:

```
my-sprint-project/
├── project-idea.md      # Your idea from Day 0
├── project-scope.md     # You'll create this today
├── CLAUDE.md            # You'll create this on Day 2
└── src/                 # Empty for now - code goes here later
```

**Important:** Move your `project-idea.md` from Day 0 into this folder.

Lost your file? [Download it here from your Day 0 submission](#day-0-download-link)

This folder is your workspace for the entire Sprint. Everything lives here. The model can reference any file in this folder.

---

### Plan Mode: Think Before You Build

When you ask Claude to help you scope, you're in **plan mode**. The model is thinking, not coding.

**In Cursor:** You can explicitly enter plan mode
**In Terminal:** Claude Code has a plan mode you can activate

The key insight: Planning WITH the model is different from building WITH the model. Today is all planning. You won't write a single line of code. That's intentional.

**Why this matters:**
- Planning catches mistakes before they become code
- You can explore 5 different approaches in 10 minutes
- The model can see problems you can't
- Changing a plan is free. Changing code costs time.

---

### The Exercise

**1. Set up your Sprint folder** (structure above)

**2. Move your project-idea.md into the folder**

Lost it? Download from your Day 0 submission in the course.

**3. Start a scoping conversation:**

> "Read project-idea.md. I want to scope this for a 7-day sprint where I'm learning to build with AI. Help me figure out what's realistic. Ask me questions."

**4. Let Claude interview you.** Answer honestly. Push back when something doesn't feel right.

**5. When you've got clarity, ask Claude to write project-scope.md:**

> "Based on our conversation, write a project-scope.md file that captures: what we're building, the core feature, what's out of scope, and open questions."

---

### Key Questions to Answer (Through Conversation)

- What's the ONE thing this tool must do? (Core feature)
- What would be nice but isn't essential? (Cut list)
- Who uses this? Just you, or others?
- Does this need to save data? Where?
- Does this need authentication? (Probably not for MVP)
- What's the simplest version that would actually be useful?

---

## Deliverables

1. Sprint folder created with structure
2. project-idea.md moved into folder
3. project-scope.md written by the model (based on your conversation)
4. Core feature identified (the ONE thing)
5. Cut list documented (what you're NOT building)
6. Open questions captured

---

## In-Course Form

After your scoping session, ask the model:

> "Summarize what we accomplished today. What's the project scope, what's the core feature, what did we cut, and what questions remain?"

**Paste the model's summary into the form.**

**Form fields:**

1. **Model's summary** (paste the response)

2. **One thing that surprised you from today's conversation**

   *Reminder: Use your voice to answer this. You set up voice-to-text on Day 0 - use it. We're building new habits here.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `create-folder` | Create your Sprint folder | Set up the folder structure for your project |
| `move-idea` | Move project-idea.md | Get your Day 0 file into the folder (download link provided if lost) |
| `start-scoping` | Start scoping conversation | Reference the file, don't paste |
| `identify-core` | Identify core feature | The ONE thing your tool must do |
| `create-cut-list` | Create cut list | Document what's out of scope |
| `write-scope-md` | Have model write project-scope.md | Capture the full scope in a file |
| `get-summary` | Get model summary | Ask for a summary of today's work |
| `complete-form` | Complete the form | Paste summary + your surprise |
| `post-discord` | Post in Discord | Your core feature in one sentence |

---

## Bonus: For the Impatient - Make the Model Disagree

Models tend to agree with humans. This is a problem when you need honest feedback.

**Use these phrases to force critical thinking:**

> "Play devil's advocate. What's wrong with this plan?"

> "Argue against this approach. What would someone who disagrees say?"

> "Use the Socratic method. Ask me questions that expose the weaknesses in my thinking."

> "What am I not seeing? What blind spots do I have?"

> "If this project fails, what's the most likely reason?"

> "Critique this like you're a skeptical investor. What would make you say no?"

> "Steelman the opposite position. Make the best case for NOT building this."

> "What assumptions am I making that might be wrong?"

**The goal:** Surface problems now, not on Day 5 when you're deep in code.

Write down anything that surprises you. If the model raises a concern you hadn't considered, that's gold. Add it to your open questions in project-scope.md.

---

## Pedagogical Notes

- Day 1 introduces the "everything through the model" philosophy in practice
- File referencing is a key skill that compounds - taught early
- Plan mode distinction prevents the "just start coding" impulse
- The Sprint folder becomes their persistent workspace for the week
- Form captures model output directly - they learn the model can summarize their work
- Voice reminder reinforces Day 0's voice-to-text setup
- Bonus section counters model agreeableness - critical for honest feedback
- No code written today is intentional - builds the "plan first" habit

---

## Video Script Notes: Gaps to Address

### Gap: Project might be too big (discovered during scoping)
Some students will realize during the scoping conversation that their idea is too ambitious.

**Address in video:**
- "If the scoping conversation reveals your idea has 5+ major components, that's a sign it's too big for a 7-day Sprint."
- "The model might say 'this is ambitious for one week' - listen to that."
- Show how to gracefully scope down: "What's the ONE thing this needs to do? Let's build that first."
- Frame it as smart, not as failure: "You're not giving up. You're being strategic."

### Gap: Does this project need data persistence?
This is the critical question that determines if a project is Sprint-appropriate.

**Address in video during scoping conversation:**
- Show asking Claude: "Does this project need to save data between sessions?"
- If YES: "For the Sprint, let's simplify. What if we make this a generator that outputs [X] rather than a tracker that saves [X]?"
- If NO: Great, proceed.
- Example: "Client follow-up tracker" → becomes "Follow-up email generator" for Sprint

### Gap: Cursor vs Terminal - how does plan mode work in each?
Written content mentions plan mode but doesn't show interface-specific instructions.

**Address in video:**
- Show plan mode in Cursor (how to access it, what it looks like)
- Show plan mode in Claude Code terminal
- Demonstrate the same scoping conversation in both interfaces

### Gap: How to know what to ask for (adapting prompts)
Students might not know how to adapt the provided prompts to their specific situation.

**Address in video:**
- Model the thinking process out loud: "I'm going to ask X because Y"
- Show variations: "If your project is a calculator, you'd ask it this way. If it's a generator, this way."
- Emphasize: "These prompts are starting points. Make them yours."

### Gap: Conversation getting long/muddy
Some students will have very long scoping conversations where things get confused.

**Address in video:**
- "If the conversation feels like it's going in circles, that's a sign to summarize and restart."
- Show: "Let's pause. Summarize what we've agreed on so far in bullet points."
- Mention: "This is why we create project-scope.md - it's the checkpoint that survives the conversation."
