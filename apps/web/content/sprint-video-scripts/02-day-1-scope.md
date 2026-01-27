# Day 1: Scope Your Project

**Duration:** 8-10 minutes
**Purpose:** Turn idea into buildable plan with AI as thinking partner
**Key Insight:** Planning catches mistakes before they become code. Changing a plan is free. Changing code costs time.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

Planning catches mistakes before they become code.

That might sound obvious. But here's what most people do: they get excited, they start building, and three hours in they realize they designed it wrong.

Then they start over.

Today, you're going to plan WITH the model. Not by yourself - with Claude. And by the end of today, you'll have a scope document that sets you up for the entire week.

No code today. That's intentional.

---

## [00:45-01:45] CONTEXT - The Planning Day

[TALKING HEAD]

Yesterday you set up your tools and defined your project idea. You should have a project-idea.md file, either generated from the form or written yourself.

Today, we're going to scope that idea. Turn it from "I want to build X" into "Here's exactly what X does, here's what it doesn't do, and here's what I'm building first."

The reason we do this WITH the model is simple: you don't know what you don't know.

Claude will ask you questions you wouldn't think to ask yourself. It'll surface problems now instead of Day 5 when you're deep in code.

[Beat]

This is a new way of working. The model isn't just a code generator. It's a thinking partner for everything - scoping, planning, deciding.

---

## [01:45-02:30] FOLDER SETUP

[SCREEN SHARE: Show creating folder structure]

First, let's set up your workspace.

[DEMO: Create folder in Finder/Explorer]

Create a folder for your Sprint project. Call it something like "my-sprint-project" or whatever makes sense for what you're building.

[DEMO: Show folder structure]

Inside that folder, you want:
- Your project-idea.md from Day 0
- An empty file called project-scope.md - we'll fill this today
- An empty file called CLAUDE.md - that's for Day 2
- An empty folder called src - that's where code goes later

[TALKING HEAD]

This folder is your workspace for the entire Sprint. Everything lives here. The model can reference any file in this folder.

If you can't find your project-idea.md from yesterday, don't worry - there's a download link in the course. Grab it and put it in this folder.

---

## [02:30-04:00] PLAN MODE

[TALKING HEAD]

Now here's an important concept: plan mode vs build mode.

When you ask Claude to help you scope, you're in plan mode. The model is thinking, not coding. It's exploring ideas, asking questions, surfacing problems.

This is different from build mode, where Claude is actually writing code and making changes.

[SCREEN SHARE: Show Cursor interface]

In Cursor, you can explicitly enter plan mode. There's a toggle or you can tell it: "Let's plan this, don't write any code yet."

[DEMO: Show toggling plan mode in Cursor]

[SCREEN SHARE: Show Terminal with Claude Code]

In Claude Code terminal, you can activate plan mode by starting a message with "plan:" or by telling it to think through the approach before building.

[DEMO: Show activating plan mode in terminal]

[TALKING HEAD]

The key insight: planning WITH the model is different from building WITH the model. Today is all planning. You won't write a single line of code.

Why?

Because changing a plan is free. Changing code costs time.

You can explore five different approaches in ten minutes of conversation. Once you've written code, changing direction means throwing work away.

---

## [04:00-05:00] FILE REFERENCING

[TALKING HEAD]

Before we start the scoping conversation, I need to teach you something that's going to save you a lot of time.

Reference files. Don't paste.

[SCREEN SHARE: Show BAD example - pasting whole project idea into chat]

The old way: copy your whole project idea, paste it into the chat, then ask your question.

That works... once. But what happens when your project gets bigger? What happens when you have 10 files? You can't paste everything every time.

[SCREEN SHARE: Show GOOD example - referencing file by name]

The new way: tell Claude to read the file.

[DEMO: In terminal]
```
Read my project-idea.md file and help me scope this for a 7-day sprint.
```

[DEMO: In Cursor]
Show how to reference a file in the chat - the model can see files in your workspace.

[TALKING HEAD]

The model reads the file, has full context, and you didn't have to paste anything. This scales. When you have 20 files, you just tell Claude which ones to read.

This is a context management skill. You'll use it constantly.

---

## [05:00-07:00] LIVE SCOPING CONVERSATION

[SCREEN SHARE: Show terminal or Cursor with empty chat]

Let's do a real scoping conversation.

[DEMO: Type the initial prompt]
```
Read project-idea.md. I want to scope this for a 7-day sprint where I'm learning to build with AI. Help me figure out what's realistic. Ask me questions.
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Notice what Claude does. It's not just saying "yes, that sounds good." It's asking questions. Probing. Trying to understand what you actually need.

[Continue the conversation - answer 2-3 of Claude's questions]

[TALKING HEAD]

This conversation might go 10, 15, 20 messages. That's fine. Let Claude interview you. Answer honestly. Push back when something doesn't feel right.

[Beat]

Now here's something that often happens during scoping.

[SCREEN SHARE: Show Claude saying "this might be ambitious for 7 days"]

Claude might say something like: "This is ambitious for a 7-day sprint." Or: "This has a lot of moving parts."

Listen to that. The model is seeing something you might not see.

[TALKING HEAD]

If Claude says your project is too big, don't fight it. Ask: "What's the ONE thing this tool must do? What's the smallest version that would still be useful?"

That's how you scope down gracefully. You're not giving up - you're being strategic.

---

## [07:00-08:00] DATA PERSISTENCE CHECK

[TALKING HEAD]

There's one question that's critical to ask during scoping.

[SCREEN SHARE: Show typing the question]

"Does this project need to save data between sessions?"

[TALKING HEAD]

This is the fork in the road.

If the answer is no - if it's a generator or calculator that just takes input and produces output - great. That's perfect for the Sprint.

If the answer is yes - if you need to save things and come back to them later - you've got a choice:

[Beat]

Option one: simplify for the Sprint. Can you make this a generator instead of a tracker?

[SCREEN SHARE: Show example]

"Client follow-up tracker" becomes "Follow-up email generator."
"Reading tracker" becomes "Reading notes formatter."

[TALKING HEAD]

Option two: accept that your project needs data persistence and know that we'll add localStorage on Day 3. It'll work for you, in one browser, but it won't sync across devices.

Option three: save this idea for the 8-Week program where we cover real databases.

The point is to surface this now, not on Day 4 when you're trying to deploy.

---

## [08:00-08:45] GENERATE PROJECT-SCOPE.MD

[SCREEN SHARE: Show the conversation continuing]

Once you've got clarity - once you and Claude agree on what you're building - ask Claude to write the scope document.

[DEMO: Type the prompt]
```
Based on our conversation, write a project-scope.md file that captures:
- What we're building
- The core feature (the ONE thing)
- What's out of scope
- Open questions we still have
```

[Wait for Claude to generate the file]

[TALKING HEAD over screen share]

Read what it generates. Does it capture your project accurately? Is anything missing? Anything wrong?

If so, tell Claude. "Actually, the core feature should be X, not Y." Or: "You're missing Z from the out-of-scope list."

This document is your contract with yourself for the week. Make sure it's right.

---

## [08:45-09:30] MAKING CLAUDE DISAGREE

[TALKING HEAD]

One more thing before you go.

Claude tends to agree with humans. It's trained to be helpful, which sometimes means it doesn't push back when it should.

This is a problem when you need honest feedback.

[SCREEN SHARE: Show prompts to force critical thinking]

Here are some phrases that force Claude to think critically:

"Play devil's advocate. What's wrong with this plan?"

"What am I not seeing? What blind spots do I have?"

"If this project fails, what's the most likely reason?"

"Steelman the opposite position. Make the best case for NOT building this."

[TALKING HEAD]

Use these. If Claude raises a concern you hadn't considered, that's gold. Add it to your open questions.

The goal is to surface problems now, not on Day 5.

---

## [09:30-10:00] DAY CLOSE

[TALKING HEAD]

You didn't write any code today. That's intentional.

You did something harder: you thought clearly about what you're building. You let the model challenge your assumptions. You created a scope document that will guide the entire week.

Here's what you have now:
- A Sprint folder with your project files
- A project-scope.md with your core feature, your cut list, and your open questions
- Clarity on whether your project needs data persistence

Tomorrow, you build your foundation. You'll create CLAUDE.md - your project's memory - and you'll visualize your plan.

If your conversation got long or muddy today, that's fine. You have the scope document. That's what survives.

See you on Day 2.

[END]

---

## Production Notes

### Screen Recordings Needed
- Creating Sprint folder structure
- Toggling plan mode in Cursor
- Activating plan mode in Claude Code terminal
- BAD example: pasting whole file into chat
- GOOD example: referencing file by name
- Live scoping conversation (10+ messages)
- Claude raising "ambitious" warning
- Generating project-scope.md
- Devil's advocate prompts

### Gaps Addressed from Curriculum
1. **Project discovered too big** - Covered with "listen to Claude" section and graceful scope-down
2. **Data persistence surfaces** - Dedicated section on the persistence question and options
3. **Plan mode in Cursor vs Terminal** - Showed both interfaces explicitly
4. **Adapting prompts** - Modeled thinking process during live demo
5. **Conversation getting muddy** - Addressed in day close: "scope document is what survives"

### Key Phrases
- "Planning catches mistakes before they become code"
- "Reference files, don't paste"
- "You're not giving up - you're being strategic"
- "The model is your thinking partner for everything"

### Demo Prompts
```
Read project-idea.md. I want to scope this for a 7-day sprint where I'm learning to build with AI. Help me figure out what's realistic. Ask me questions.
```

```
Does this project need to save data between sessions?
```

```
Based on our conversation, write a project-scope.md file that captures:
- What we're building
- The core feature (the ONE thing)
- What's out of scope
- Open questions we still have
```

```
Play devil's advocate. What's wrong with this plan?
```
