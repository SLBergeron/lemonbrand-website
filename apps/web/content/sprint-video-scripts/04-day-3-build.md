# Day 3: Build Your First Feature

**Duration:** 10 minutes
**Purpose:** Create real project, first working feature, introduce Git
**Key Insight:** This is the fun part. And the scary part. Things will break. That's the job.

---

## [00:00-01:00] COLD OPEN

[TALKING HEAD]

This is the fun part.

And the scary part.

Today, you're going to write real code. Or rather, Claude is going to write real code for you. You're going to see errors. Red text. Things that don't work.

That's the job. That's what building looks like.

[Beat]

By the end of today, you'll have a working project running on your computer. A real web app. It might be rough. It might be ugly. But it will work.

And something that works is infinitely better than something that doesn't exist.

Let's build.

---

## [01:00-01:45] YOU'RE NOT ALONE

[TALKING HEAD]

Before we dive in, I need you to hear this.

This is the hard part. Days 0-2 were about thinking and planning. That's comfortable. Day 3 is where things break.

If you get stuck, you're not failing. You're building.

[Beat]

Here's who can help you:

Post in the Discord. Your cohort is going through the same thing right now. They understand.

Email me directly. I read every message.

Ask Claude for help. The model can debug with you. When you see an error, paste it to Claude and ask what it means.

You're not alone in this. The community is here.

---

## [01:45-03:45] PROJECT CREATION

[TALKING HEAD]

Let's create your project.

[SCREEN SHARE: Show starting a conversation with Claude]

[DEMO: Type the prompt]
```
Read my CLAUDE.md and project-scope.md. I'm ready to start building. Create a Next.js web app for this project. Keep it simple - I just need a foundation I can build on. Set up the project structure and get it ready to run locally.
```

[Wait for Claude to start working]

[TALKING HEAD over screen share]

Watch what Claude does. It's going to:
- Create the project files
- Set up the configuration
- Install what's needed

[SCREEN SHARE: Show Claude running commands, creating files]

You're seeing commands like `npx create-next-app` and `npm install`. You don't need to memorize these. Just observe.

[Beat]

Now, here's where things might go wrong.

[SCREEN SHARE: Show an npm error appearing]

You might see something like this. An error during installation.

[TALKING HEAD]

Don't panic. This is normal.

[DEMO: Copy the error, paste to Claude]
```
I'm seeing this error during setup: [paste error]. Help me fix it.
```

[SCREEN SHARE: Show Claude explaining and fixing]

Claude is remarkably good at debugging. Just show it exactly what you see.

[TALKING HEAD]

Common issues:
- "node: command not found" - you need to install Node.js
- "EACCES permission denied" - permission issue, Claude can help
- "Module not found" - missing dependency, usually fixed with npm install

For all of these: copy the full error, paste to Claude, ask for help. That's the pattern.

---

## [03:45-05:00] SEE IT RUNNING

[SCREEN SHARE: Show terminal ready to run]

Once the project is created, Claude will tell you how to run it.

[DEMO: Run the command]
```
npm run dev
```

[SCREEN SHARE: Show terminal output - server starting]

Now open your browser.

[DEMO: Open browser, navigate to localhost:3000]

[SCREEN SHARE: Show the page - might be blank, might be a welcome screen]

There it is. Something is running.

[TALKING HEAD]

Whatever you see - a blank page, a welcome screen, maybe even an error - that's progress. Your code is running locally.

If you see an error in the browser, same pattern: copy it, paste to Claude, ask for help.

---

## [05:00-06:30] GITHUB SETUP

[TALKING HEAD]

Before we build your feature, let's make sure you don't lose anything.

We're going to save your work to GitHub. Think of GitHub as your save point system. Every time you make progress, you save. If you break something badly, you can go back.

[SCREEN SHARE: Show starting the conversation]

[DEMO: Type the prompt]
```
Help me save this project to GitHub. I don't have a repository yet - walk me through creating one and pushing my code to it.
```

[TALKING HEAD over screen share]

Claude will walk you through:
- Creating a GitHub account if you don't have one
- Creating a repository
- Connecting your local project to it
- Pushing your code

[SCREEN SHARE: Show Claude giving instructions, following them]

[Beat]

You might hit issues here. The most common:

[SCREEN SHARE: Show "authentication failed" error]

"Authentication failed" - you need to set up authentication. Claude can walk you through it. It's usually setting up an SSH key or a personal access token.

[TALKING HEAD]

Git can feel confusing at first. That's okay. You don't need to understand it deeply right now. Just follow Claude's instructions step by step.

From now on, at the end of each work session, you'll run:

[SCREEN SHARE: Show the command]
```
git add .
git commit -m "Description of what you did"
git push
```

Or just ask Claude: "Help me commit and push my changes."

---

## [06:30-08:30] BUILD YOUR FIRST FEATURE

[TALKING HEAD]

Now the real building begins.

You have a scope. You have a core feature. But what's the ONE thing you should build first?

[SCREEN SHARE: Show asking Claude]

[DEMO: Type]
```
Look at my project-scope.md. What's the critical first feature - the thing that without it, this tool wouldn't work at all? What should I build first?
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Let Claude think through this with you. It might ask clarifying questions. That's good.

Once you've identified the first feature, tell Claude to build it:

[DEMO: Type]
```
Okay, let's build that. Here's what I want it to do: [describe in plain language what the feature should do]. Build this feature.
```

[Wait for Claude to start building]

[SCREEN SHARE: Show Claude creating files, writing code]

[TALKING HEAD]

Claude is writing code. Watch what happens.

Your job during this: stay engaged. If Claude asks questions, answer them. If something doesn't match what you imagined, say so:

[DEMO: Type]
```
That's not quite what I meant. I wanted it to [clarify].
```

This is a conversation, not a handoff.

---

## [08:30-09:15] ERROR VS WRONG

[TALKING HEAD]

Here's something important. There are two kinds of problems you'll see today:

[SCREEN SHARE: Show error example - red text in terminal or browser]

This is an ERROR. Red text. Won't run. Something is broken.

For errors: copy the error, paste to Claude, ask what it means.

[SCREEN SHARE: Show "wrong" example - works but doesn't match intent]

This is WRONG. It runs. But it's not what you wanted.

[TALKING HEAD]

"Wrong" is harder to debug because there's no error message.

For "wrong" you need to describe specifically what you expected versus what you got.

[DEMO: Type]
```
The feature works, but it's not what I wanted.
- I expected: [what you wanted]
- I got: [what actually happened]
Can you fix this?
```

[TALKING HEAD]

Be specific. "It's wrong" doesn't help Claude. "The output should be formatted as a letter, not a bulleted list" does help.

---

## [09:15-09:45] SAVE YOUR PROGRESS

[TALKING HEAD]

Before you stop for the day:

[SCREEN SHARE: Show committing]

[DEMO: Type]
```
Help me commit and push my changes to GitHub with a message about what we built today.
```

[Wait for Claude to help]

[TALKING HEAD]

Your code is now saved. You can close everything, come back tomorrow, and pick up where you left off.

If your feature isn't fully working yet, that's okay. Save what you have. Tomorrow we deploy and iterate.

---

## [09:45-10:00] DAY CLOSE

[TALKING HEAD]

Here's what you accomplished today:
- A real Next.js project, running on your computer
- Code saved to GitHub
- Your first feature, built - even if it's rough

[Beat]

It works on your computer. But only you can see it. Only localhost.

Tomorrow, we put it on the internet. Anyone with a link will be able to see it.

That's when it gets real.

See you on Day 4.

[END]

---

## Production Notes

### Screen Recordings Needed
- Claude creating Next.js project (running commands, creating files)
- npm error appearing and being fixed
- `npm run dev` running, server starting
- Browser showing localhost:3000
- GitHub setup walkthrough
- Git authentication error
- Claude identifying first feature
- Claude building feature (writing code)
- Error example (red text)
- "Wrong" example (works but not right)
- Committing and pushing to GitHub

### Gaps Addressed from Curriculum
1. **"Works but wrong" vs actual errors** - Dedicated section explaining the difference
2. **Environment/npm issues during creation** - Showed common errors and fix pattern
3. **Git/GitHub complexity** - Kept simple: "follow Claude's instructions step by step"
4. **Project too big once building** - Mentioned in feature identification: pick the ONE thing
5. **"localhost works but can't show others"** - Addressed in close: "Tomorrow we deploy"
6. **Cursor vs Terminal project creation** - Not shown explicitly but process works same in both

### Key Phrases
- "Things will break. That's the job."
- "You're not failing. You're building."
- "Copy the error, paste to Claude, ask for help. That's the pattern."
- "This is a conversation, not a handoff."

### Demo Prompts
```
Read my CLAUDE.md and project-scope.md. I'm ready to start building. Create a Next.js web app for this project. Keep it simple - I just need a foundation I can build on. Set up the project structure and get it ready to run locally.
```

```
I'm seeing this error during setup: [paste error]. Help me fix it.
```

```
Help me save this project to GitHub. I don't have a repository yet - walk me through creating one and pushing my code to it.
```

```
Look at my project-scope.md. What's the critical first feature - the thing that without it, this tool wouldn't work at all? What should I build first?
```

```
Okay, let's build that. Here's what I want it to do: [describe in plain language]. Build this feature.
```

```
That's not quite what I meant. I wanted it to [clarify].
```

```
The feature works, but it's not what I wanted.
- I expected: [what you wanted]
- I got: [what actually happened]
Can you fix this?
```

```
Help me commit and push my changes to GitHub with a message about what we built today.
```
