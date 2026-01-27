# Day 2: Build Your Foundation

**Duration:** 8-10 minutes
**Purpose:** Create CLAUDE.md (persistent memory), visualize the plan
**Key Insight:** The thinking is hard. The code is cheap.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

The thinking is hard. The code is cheap.

That might feel backwards. Most people think coding is the hard part. That's why they're intimidated.

But here's the truth: you spent two days thinking, scoping, and planning. That's the hard work. The actual code? Claude can write that fast. Really fast.

Today, we're setting up something that makes everything easier: your project's memory. And we're going to see your plan come to life before we write any real code.

---

## [00:45-01:30] CONTEXT - What Today Is About

[TALKING HEAD]

Quick recap. Day 0, you set up your tools and defined your project. Day 1, you scoped it with Claude - you have a project-scope.md with your core feature and what's out of scope.

Today, we're creating CLAUDE.md - this is your project's persistent memory - and we're going to visualize your plan with HTML.

[Beat]

By the end of today, you'll close your Claude session, open a new one, and Claude will already know your project. No re-explaining. No pasting. It just knows.

And you'll have an HTML file showing what your tool is - the inputs, outputs, the flow - that you can open in your browser.

Still no application code today. That's Day 3. Today is about context and visualization.

---

## [01:30-03:30] CLAUDE.MD CREATION

[TALKING HEAD]

Let's start with CLAUDE.md.

You've probably noticed that Claude "forgets" things between sessions. You have a great conversation, close the chat, come back the next day... and you have to explain everything again.

CLAUDE.md fixes that.

It's a special file that Claude reads automatically when you work in a folder. Once you set it up, Claude starts every conversation already knowing your project.

[SCREEN SHARE: Show starting a conversation]

Let's create it.

[DEMO: Type the prompt]
```
Read project-scope.md. Based on this scope, help me create a CLAUDE.md file for this project. This file should give you (the model) all the context you need to help me build this over the next 5 days.
```

[Wait for Claude to generate the file]

[TALKING HEAD over screen share]

Now here's the important part. Don't just accept whatever Claude produces.

READ IT.

[SCREEN SHARE: Scroll through the generated CLAUDE.md]

This is a planning artifact. You need to be involved.

Ask yourself:
- Does this capture my project accurately?
- Is anything missing that I'd want a collaborator to know?
- Is anything wrong or misunderstood?

[Beat]

Let me show you what a good CLAUDE.md looks like versus a bad one.

[SCREEN SHARE: Side by side comparison]

BAD:
```
# My Project
Building a tool for my business.
```

That tells Claude nothing.

GOOD:
```
# Project: Proposal Generator

## What We're Building
A web tool that takes client name, project description, and pricing inputs,
and outputs a formatted proposal document ready to send.

## Who It's For
Just me - for my consulting business.

## Core Feature
Generate formatted proposals from simple inputs.

## Tech Stack
Next.js web app, no database needed.

## Current State
Day 2 - foundation. Scope complete, building context.

## Rules
- Keep it simple - no authentication
- Single page is fine for MVP
- Output should be copy-pasteable
```

[TALKING HEAD]

See the difference? The good version gives Claude real context. It knows what you're building, who it's for, what the tech stack is, what the current state is.

If your CLAUDE.md is too generic, make it more specific.

---

## [03:30-04:30] CONTEXT TESTING

[TALKING HEAD]

Now let's test if it's working.

[SCREEN SHARE: Show closing the session]

Close your Claude session. Completely. New terminal, new chat, fresh start.

[DEMO: In Terminal - close, reopen, navigate to project folder]

[DEMO: In Cursor - show starting fresh conversation in the project]

[TALKING HEAD over screen share]

Now ask a simple question:

[DEMO: Type]
```
What am I building?
```

[Wait for Claude's response]

[TALKING HEAD]

Claude should know. It read your CLAUDE.md automatically.

[Beat]

Try another test:

[DEMO: Type]
```
What's the core feature I'm focused on?
```

[TALKING HEAD]

If Claude knows, your context is working. If it's confused or gives a generic answer, your CLAUDE.md needs work.

This is the magic: persistent context. You never have to re-explain your project again.

---

## [04:30-07:00] PLAN VISUALIZATION

[TALKING HEAD]

Now the fun part. We're going to generate an HTML file that helps you SEE your project.

Not a tech spec. Not a timeline. A picture of what this tool IS.

[SCREEN SHARE: Show starting new prompt]

[DEMO: Type the prompt]
```
Based on my project scope, create an HTML file called plan-visual.html that visualizes my project. I want to see:
- What this tool does (the core purpose)
- Where it fits in my workflow (what happens before/after using it)
- The inputs (what goes into it)
- The outputs (what comes out of it)
- The process (what happens in between)

Make it visual and clear. Use modern styling, clean typography. Make it something that helps me think about my project.
```

[Wait for Claude to generate the file]

[DEMO: Open the HTML file in browser]

[TALKING HEAD]

There it is. Your project, visualized.

[SCREEN SHARE: Walk through what the visualization shows]

This helps you think about your project systemically. What goes in, what comes out, what happens in the middle.

[Beat]

Now, here's something important.

Your visualization might look different from mine. That's expected.

[SCREEN SHARE: Show 2-3 different visualization examples for different project types]

A proposal generator shows: inputs (client info, pricing) → process (formatting, template) → output (formatted proposal).

A calculator shows: inputs (numbers, parameters) → process (calculation) → output (results, maybe a chart).

A content organizer shows: inputs (raw ideas) → process (categorization) → output (organized structure).

[TALKING HEAD]

The structure depends on what you're building. The goal is to see your project, not to follow a specific format.

---

## [07:00-08:00] REVIEWING AND ITERATING

[TALKING HEAD]

Look at your visualization.

Does it match your mental model of the project? Is anything off?

If Claude produced something that doesn't make sense, say so.

[SCREEN SHARE: Show iteration prompt]

[DEMO: Type]
```
This isn't quite right. The process should actually be [X]. Also, you're missing [Y] as an input. Can you update the visualization?
```

[TALKING HEAD]

You might go 2-3 rounds before the visualization clicks. That's the process working.

[Beat]

This is what I mean when I say "code is cheap."

You just generated an HTML file to help you think. If it's wrong, you generate another one. If you want to see three different versions, ask for three different versions.

[DEMO: Type]
```
Create three different visual styles for this visualization:
1. Minimal and clean
2. Bold and confident
3. Warm and approachable

Generate separate HTML files for each.
```

[TALKING HEAD]

This is play. This is exploration. HTML files cost nothing to generate.

When you're stuck thinking, build something quick and disposable to help you see.

---

## [08:00-08:30] WHEN TO READ VS AUTO-ACCEPT

[TALKING HEAD]

One more important concept before we close.

Not everything Claude produces should be auto-accepted.

Today, during planning, you needed to READ what Claude generated. Review it. Push back. Adjust.

Tomorrow, when we're building, there will be moments where you can let Claude run - auto-accept changes, trust the execution.

The rule: during planning, read everything. During execution, you can trust more.

We're still in planning. So read carefully. Make sure your CLAUDE.md and your visualization match what's in your head.

---

## [08:30-09:30] DAY CLOSE

[TALKING HEAD]

Here's what you have now:
- CLAUDE.md - your project's persistent memory
- Verified that Claude knows your project in a fresh session
- plan-visual.html - your project visualized
- Reviewed and refined until it matches your mental model

Still no application code. That's Day 3.

[Beat]

You now have context, scope, and a visualization. You can see your project. You can close Claude and reopen it, and it already knows what you're building.

The loop is complete: idea → scope → context → visualization.

Tomorrow, we build. Real code. A real project. Running in your browser.

See you on Day 3.

[END]

---

## Production Notes

### Screen Recordings Needed
- Starting CLAUDE.md creation prompt
- Generated CLAUDE.md file scrollthrough
- Side-by-side: BAD vs GOOD CLAUDE.md example
- Closing and reopening session (both Terminal and Cursor)
- Context test: "What am I building?"
- Plan visualization prompt
- Opening plan-visual.html in browser
- 2-3 different visualization examples for different project types
- Iteration: refining the visualization
- Three style variants generation

### Gaps Addressed from Curriculum
1. **Visualization looks different per project type** - Showed multiple examples (generator, calculator, organizer)
2. **CLAUDE.md too generic** - Side-by-side BAD vs GOOD comparison
3. **Context test in Cursor vs Terminal** - Showed both interfaces
4. **What if visualization is confusing** - Iteration section with 2-3 rounds normal

### Key Phrases
- "The thinking is hard. The code is cheap."
- "Code is disposable. Ideas are valuable."
- "During planning, read everything. During execution, you can trust more."
- "When you're stuck thinking, build something quick and disposable to help you see."

### Demo Prompts
```
Read project-scope.md. Based on this scope, help me create a CLAUDE.md file for this project. This file should give you (the model) all the context you need to help me build this over the next 5 days.
```

```
What am I building?
```

```
What's the core feature I'm focused on?
```

```
Based on my project scope, create an HTML file called plan-visual.html that visualizes my project. I want to see:
- What this tool does (the core purpose)
- Where it fits in my workflow (what happens before/after using it)
- The inputs (what goes into it)
- The outputs (what comes out of it)
- The process (what happens in between)

Make it visual and clear. Use modern styling, clean typography. Make it something that helps me think about my project.
```

```
Create three different visual styles for this visualization:
1. Minimal and clean
2. Bold and confident
3. Warm and approachable

Generate separate HTML files for each.
```
