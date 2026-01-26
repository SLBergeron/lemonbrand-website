# Day 3: Structure

**Status:** Final

---

## Overview

**Title:** Build Your First Feature

**Subtitle:** Stop planning. Start building. It won't be perfect - that's the point.

**Duration:** 2-3 hours

---

## Learning Objectives

1. Create a real project (not just markdown files)
2. See your app running locally in the browser
3. Save your work with Git and GitHub
4. Identify and build your critical first feature
5. Experience the reality: things break, and that's normal

---

## Key Concepts Introduced

**Planning is over. Building starts now.**
You've spent two days thinking, scoping, and setting up context. That was necessary. Now it's time to build. The model becomes your building partner, not just your thinking partner.

**You don't need to understand the jargon**
Node.js. npm. Dependencies. Build commands. You don't need to know what these mean. You tell the model what you want, the model handles the translation. Speak human, let it speak tech.

**Web app for the Sprint**
For this Sprint, everyone builds a web app. Not because web is better than mobile - but because mobile development has layers of complexity (Xcode, certificates, app stores) that would derail your first build. The 8-week program goes deeper into mobile and native apps. For now: web app, browser, ship it.

**It won't work perfectly the first time**
Today you'll see errors. Red text. Things that don't work. This is normal. This is expected. Today's job is to get something working - even if rough. Tomorrow's job is to fix what's broken.

---

## Context Management Skill: Project Structure

Your folder after today:

```
my-sprint-project/
├── project-idea.md
├── project-scope.md
├── CLAUDE.md
├── plan-visual.html
├── src/                    # NEW: Your actual code lives here
│   └── app/
│       └── page.tsx        # Your main page
├── package.json            # NEW: Project configuration
└── ... (other config files the model creates)
```

Don't worry about understanding every file. The model creates what's needed. You focus on what it does, not how it's structured.

---

## Lesson Content

### You're Not Alone

Before we dive in: this is the hard part.

Days 0-2 were about thinking and planning. That's comfortable. Day 3 is where you actually build - and building means things break, errors appear, and you'll feel stuck.

**That's normal. That's expected. You're not failing.**

If you get stuck:
- Post in the Discord. Your cohort is going through the same thing.
- Email me directly. I read every message.
- Ask the model for help. It can debug with you.

You're not alone in this. The community is here.

---

### Part 1: Create Your Project

Start a conversation with Claude. Give it context:

> "Read my CLAUDE.md and project-scope.md. I'm ready to start building. Create a Next.js web app for this project. Keep it simple - I just need a foundation I can build on. Set up the project structure and get it ready to run locally."

**Let Claude work.** It will:
- Create the project files
- Set up the configuration
- Install what's needed

**Watch what it does.** You're learning by seeing. When it runs commands, note what they are. You don't need to memorize them - just observe.

---

### Part 2: See It Running

Once the project is created, Claude will tell you how to run it. Usually something like:

```
npm run dev
```

Open your browser to `http://localhost:3000`. You should see... something. Maybe a blank page. Maybe a welcome screen. Maybe an error.

Whatever you see, that's progress. Your code is running locally.

**If you see an error:** Don't panic. Copy the error and tell Claude:
> "I'm seeing this error: [paste error]. Help me fix it."

---

### Part 3: Save Your Work with GitHub

Before you go further, let's make sure you don't lose anything.

> "Help me save this project to GitHub. I don't have a repository yet - walk me through creating one and pushing my code to it."

Claude will:
- Help you create a GitHub account if needed
- Create a repository
- Save your code to it

**Why this matters:** GitHub is your save point. If you break something badly, you can go back. Every time you make progress, save it.

From now on, at the end of each work session:
> "Help me commit and push my changes to GitHub."

---

### Part 4: Identify Your Critical Feature

You have a scope. You have a core feature. But what's the ONE thing you should build first?

Ask Claude:

> "Look at my project-scope.md. What's the critical first feature - the thing that without it, this tool wouldn't work at all? What should I build first?"

Let Claude think through this with you. It might ask clarifying questions. That's good. This conversation surfaces what actually matters.

Once you've identified it, tell Claude:

> "Okay, let's build that. Here's what I want it to do: [describe in plain language]. Build this feature."

---

### Part 5: Build the Feature

Claude will start writing code. Watch what happens:

- It creates files
- It writes functions
- It connects things together

**Your job:** Stay engaged. If Claude asks questions, answer them. If something doesn't match what you imagined, say so:

> "That's not quite what I meant. I wanted it to [clarify]."

This is a conversation, not a handoff.

---

### Part 6: See Your Feature

Once Claude says it's ready, refresh your browser.

Do you see your feature? Does it work?

**If yes:** Amazing. You just built something real. Take a screenshot. Save your work to GitHub.

**If no:** That's okay. Copy what you see (or the error) and tell Claude:
> "It's not working. Here's what I see: [describe or paste error]."

Keep going until something works. Even if it's rough. Even if it's ugly. Even if it's only half of what you wanted.

**The goal today:** Something working. Not perfect. Working.

---

### Part 7: Save Your Progress

Before you stop:

> "Help me commit and push my changes to GitHub with a message about what we built today."

Your code is now saved. You can close everything, come back tomorrow, and pick up where you left off.

---

## Deliverables

1. Next.js project created and running locally
2. Code saved to GitHub repository
3. Critical first feature identified
4. First feature built (even if rough)
5. Progress committed to GitHub

---

## In-Course Form

**Form fields:**

1. **Link to your GitHub repository** (paste the URL)

2. **What does your first feature do?** (one sentence)

   *Use your voice.*

3. **What broke today, and how did you fix it?** (or: what's still broken?)

   *Use your voice. This is important - we learn from what breaks.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `create-project` | Create the project | Have Claude set up a Next.js app |
| `run-locally` | Run it locally | See something in your browser at localhost:3000 |
| `setup-github` | Set up GitHub | Create a repository and push your code |
| `identify-feature` | Identify critical feature | Ask Claude what to build first |
| `build-feature` | Build the feature | Get the first feature working (even if rough) |
| `save-progress` | Save to GitHub | Commit and push your changes |
| `complete-form` | Complete the form | Share your repo link and reflections |
| `post-discord` | Post in Discord | Share what you built + what broke |

---

## Bonus: For the Impatient - Keep Building

If you finished early and your first feature works, try this:

> "What's the next most important thing to build? What would make this tool actually useful?"

Don't go too far - you want energy left for Day 4. But if you're in flow, keep going. Build while the momentum is there.

**Also:** Look at what Claude built. Open the files. Read the code. You don't need to understand every line, but start noticing patterns. What's in `page.tsx`? What do the files do?

This isn't homework. It's curiosity. The more you look, the more you'll recognize next time.

---

## Pedagogical Notes

- Day 3 is the pivot from planning to building
- "You're not alone" section is critical - this is where people drop off
- Community reminder (Discord, email) provides psychological safety
- GitHub introduced as "save your work" not "version control" - less jargon
- Build Stack principles are woven in (context via CLAUDE.md, clear task, constraints like "keep it simple") without naming the framework
- "Things break" is normalized upfront to prevent shame when errors appear
- Deliverable includes "what broke" to normalize the struggle
- First feature identified through conversation, not prescribed - maintains project-centered approach
- Bonus encourages curiosity about code without making it required

---

## Video Script Notes: Gaps to Address

### Gap: "It works but it's not what I imagined"
The curriculum addresses errors (paste error, Claude fixes). But what about when it technically works but doesn't match their vision?

**Address in video:**
- Show the difference between "error" (red text, won't run) and "wrong" (runs but not what you wanted)
- For "wrong": Describe specifically what you expected vs. what you got
- Example: "The form works, but I wanted the output to be formatted as a letter, not a bulleted list. Can you change the output format to look like a professional letter with greeting, body paragraphs, and sign-off?"
- Show using screenshots: "Take a screenshot, describe what's wrong with each part"

### Gap: Environment/npm issues during project creation
"npm install" or "npm run dev" might fail. Node version issues. Permission errors.

**Address in video:**
- Show common errors:
  - "node: command not found" → Need to install Node.js
  - "EACCES permission denied" → Permission issue
  - "Module not found" → Missing dependency
- For ALL errors: "Copy the full error message. Paste it to Claude. Ask for help."
- Show example: Error appears → paste to Claude → Claude explains and fixes

### Gap: Git/GitHub complexity
Day 3 introduces GitHub but students might hit issues.

**Address in video:**
- Show the happy path: Create account → Create repo → Push code
- Common issues:
  - "Authentication failed" → Need to set up SSH key or use personal access token
  - Already has uncommitted changes → Need to commit first
- Keep it simple: "If Git feels confusing, that's normal. Just follow Claude's instructions step by step."

### Gap: Project discovered to be too big once building starts
They scoped it, but now that they're building, it's clearly too ambitious.

**Address in video:**
- Signs it's too big: "We've been working for 2 hours and we're not close to a working first feature"
- How to recover: "What's the absolute minimum version of this? The smallest thing that would be useful?"
- Frame positively: "You're not failing. You're learning that scope management is hard. Even professionals get this wrong."
- Show scoping down mid-build: "Let's forget about [these parts]. What if we just build [core thing]?"

### Gap: Data persistence issue surfaces
If their project needs to save data, they'll discover it doesn't persist on refresh.

**Address in video:**
- "If you refresh the page and your data is gone, that's expected for a simple web app."
- Quick fix for Sprint: "Ask Claude to add localStorage so data persists in your browser."
- Show: "The data I enter disappears when I refresh. Can you add localStorage so it saves and loads automatically?"
- Note: "For multi-user or more complex saving, you'd need a database. That's 8-week territory."

### Gap: localhost works but nothing to show others yet
They might feel stuck because it only works on their computer.

**Address in video:**
- "Today is about getting it working locally. Tomorrow we deploy it so anyone can see it."
- Reassure: "If it works on localhost, you're in great shape. The hard part is done."

### Gap: Cursor vs Terminal - project creation looks different
The experience of "Claude creates your project" is different in each interface.

**Address in video:**
- **Terminal:** Claude runs commands, you see output in terminal, files appear in your folder
- **Cursor:** Claude creates files in the file tree, you can watch them appear
- Show both doing the same thing: Creating a Next.js project
