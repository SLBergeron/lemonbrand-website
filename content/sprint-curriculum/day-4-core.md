# Day 4: Core

**Status:** Final

---

## Overview

**Title:** Make It Real

**Subtitle:** Take your rough first version and turn it into something you'd actually show someone.

**Duration:** 2-3 hours

---

## Learning Objectives

1. Learn to recontextualize the model at the start of each session
2. Deploy to Vercel - get your project live on the internet
3. Experience the auto-deploy workflow (push → live)
4. Learn to iterate instead of starting over
5. Diagnose and fix common problems (mobile, layout, aesthetics)
6. Plan before building new capabilities
7. Transform "it works" into "I want to share this"

---

## Key Concepts Introduced

**Recontextualize at the start of each session**
When you start a new session, the model doesn't remember yesterday. Before you start building, help it catch up: have it read your repo, understand what exists, and see where you left off. This takes 30 seconds and saves hours of confusion.

**Deploy early, not late**
Most people wait until something is "ready" to put it online. That's backwards. Deploy now, while it's rough. You need a link to share for feedback. Seeing it on a real URL changes your perspective. The first version is never perfect - get over that now.

**The push → live workflow**
Once you connect to Vercel, every time you save to GitHub, your site updates automatically. Make a change, push to GitHub, see it live. This is how real software works.

**Iterate, don't start over**
When something isn't working, the temptation is to scrap it and begin again. Don't. The skill is iteration:
1. "Here's what I have"
2. "Here's what's not working"
3. "Here's what I actually wanted"

The model takes these three pieces and fixes it.

**Plan before building**
Before you add something new, stop and plan. We're often not as clear as we think we are. If you just say "add this feature," you'll get something that doesn't match your vision. Take 5 minutes to describe exactly what you want first.

---

## Lesson Content

### Start of Session: Recontextualize

It's a new day. Maybe a new session. The model doesn't remember yesterday.

Before you do anything else:

> "Read through my project - look at CLAUDE.md, project-scope.md, and the code files. Summarize what's been built so far and where I left off. What's working? What's not done yet?"

**Wait for the response.** Make sure the model understands your project before you start asking for changes.

This is your ritual. Every new session, start here.

---

### Part 1: Deploy to Vercel

Let's get your project on the internet.

> "Help me deploy this project to Vercel. I want to connect it to my GitHub repository so it deploys automatically when I push changes."

Claude will walk you through:
- Creating a Vercel account (if needed)
- Connecting your GitHub repository
- Deploying for the first time

Within minutes, you'll have a URL. A real URL. Your project, live on the internet.

**Open that URL on your phone.** See it there. That's yours.

---

### Part 2: Common Problems (and How to Fix Them)

Now that it's live, you'll probably notice things that are wrong. Here are the most common issues and how to fix them:

---

#### Problem 1: Mobile doesn't work

It looks fine on your computer but broken on your phone. Containers are too wide. Text is tiny. Buttons are impossible to tap.

**How to fix it:**

Be specific about what's wrong. The model can't see your screen. Describe it:

> "When I view this on mobile:
> - The main container extends past the screen width, causing horizontal scroll
> - The text in the header is too small to read
> - The buttons are stacked but there's no spacing between them
> - [Describe exactly what you see]
>
> Fix these mobile issues while keeping the desktop layout working."

**The pattern for visual bugs:** Describe what you see → Describe what you expected → Ask for the fix.

---

#### Problem 2: Broken containers / layout issues

Things are overlapping. Spacing is inconsistent. It just looks... wrong.

**How to fix it:**

> "The layout has issues:
> - [Element A] is overlapping with [Element B]
> - The spacing between [these things] is inconsistent
> - [This section] isn't centered when it should be
> - [Describe the visual problem]
>
> Fix the layout so it's clean and properly spaced."

If you're struggling to describe it, take a screenshot and describe what's wrong with each part.

---

#### Problem 3: It doesn't look good

It works, but it looks... generic. Like every other AI-generated site. Boring.

**How to fix it:**

Remember Day 2? The frontend-aesthetics skill. Use it again:

> "This works but it looks generic and AI-generated. Apply the frontend-aesthetics approach:
> - Improve the typography (better fonts, proper hierarchy)
> - Add atmospheric backgrounds or subtle gradients
> - Make color choices more intentional
> - Add subtle motion or hover states
> - Make it feel crafted, not generated
>
> Don't change the functionality - just make it look good."

You can also try:

> "Show me three different visual directions for this - minimal, bold, and warm. Generate each as a variant so I can pick which feels right."

---

#### Problem 4: Missing capabilities / unclear on what to add

You want to add something new but you're not sure exactly what, or past attempts haven't matched what you imagined.

**How to fix it:**

Don't just ask for "a feature." Stop. Plan first.

> "Before we build anything new, I want to plan. I'm thinking about adding [rough idea].
>
> Ask me questions to clarify exactly what this should do. What are the inputs? What are the outputs? What happens when someone uses it? Let's make sure we're aligned before you write any code."

**Have the planning conversation.** Let the model ask you questions. Answer them. Get clear.

Then, once you both understand:

> "Okay, now let's build it. Here's exactly what we agreed on: [summary]. Go ahead and implement this."

This takes 5 extra minutes and saves 30 minutes of iteration.

---

### Part 3: The Iteration Cycle

Pick one problem from your list. Use the appropriate approach above.

**The cycle:**
1. Describe the problem clearly
2. Let Claude fix it
3. Test locally
4. If it's better, push to GitHub → see it live
5. If it's not right, describe what's still off and go again

**Repeat this 3-5 times today.** Each cycle, your tool gets better. Each cycle, you get more comfortable with the pattern.

---

### Part 4: Push and See It Live

Once you're happy with an improvement:

> "Help me commit and push these changes to GitHub."

Wait 30-60 seconds. Refresh your Vercel URL.

Your improvement is live. On the internet. Automatic.

**This is the workflow:**
1. Make changes locally
2. Push to GitHub
3. Vercel deploys automatically
4. See it live

---

### Part 5: Share It

Send your Vercel URL to one person. A friend, a family member, a colleague. Someone who isn't in this Sprint.

Ask them: "What do you think? What's confusing? What would you want it to do?"

Their feedback is gold. Write it down. You'll use it tomorrow.

---

## Deliverables

1. Session started with recontextualization
2. Project deployed to Vercel (live URL)
3. At least 3 improvements made through iteration
4. URL shared with at least one person outside the Sprint
5. Feedback received and noted

---

## In-Course Form

**Form fields:**

1. **Your live Vercel URL** (paste it)

2. **What was the biggest problem you fixed today, and how did you describe it to the model?**

   *Use your voice.*

3. **Who did you share it with, and what did they say?**

   *Use your voice. Even harsh feedback is valuable.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `recontextualize` | Start with recontextualization | Have the model read your repo and catch up |
| `deploy-vercel` | Deploy to Vercel | Get your project live on the internet |
| `view-live` | View it live | Open your URL in a browser and on your phone |
| `identify-problems` | Identify problems | List what's working and what's not |
| `fix-mobile` | Fix mobile issues (if needed) | Describe specifically what's wrong on mobile |
| `fix-aesthetics` | Improve aesthetics (if needed) | Use frontend-aesthetics approach from Day 2 |
| `plan-before-building` | Plan before new capabilities | Don't just ask for features - plan first |
| `iterate-multiple` | Make 3+ improvements | Use the iteration cycle multiple times |
| `push-live` | Push and see it live | Experience the auto-deploy workflow |
| `share-url` | Share with someone | Send the link to someone outside the Sprint |
| `get-feedback` | Get feedback | Note what they said |
| `complete-form` | Complete the form | Share URL + reflections |
| `post-discord` | Post in Discord | Share your live URL with the cohort |

---

## Bonus: For the Impatient - The Pattern Has a Name

What you just did - that cycle of "here's what I have, here's what's wrong, here's what I wanted" - that's a pattern. It's called the **2-3 Exchange Pattern**.

Most problems get solved in 2-3 back-and-forth exchanges with the model. Not one. Not ten. Two or three.

Exchange 1: Initial request → Initial output
Exchange 2: "This is what I got. Here's what's wrong. Here's what I wanted."
Exchange 3: Refined solution

You'll use this pattern for the rest of the Sprint. You'll use it for every project after this. It's the core skill of building with AI: **iterate, don't start over.**

When something breaks, when something's ugly, when something's not right - you now have a tool. The pattern. Use it.

---

## Pedagogical Notes

- Recontextualization ritual is critical - prevents confusion from context loss between sessions
- Common problems section gives them specific tools for specific issues
- Mobile debugging framework teaches them to describe visual problems precisely
- Callback to Day 2's frontend-aesthetics reinforces skills compound
- "Plan before building" section addresses the clarity problem directly
- The 2-3 Exchange Pattern is named in bonus, not main lesson - preserves the "aha" moment
- Sharing with someone outside the Sprint creates accountability and real feedback
- By end of Day 4, they have something live and shareable - the "I need to show my friends" transformation

---

## Video Script Notes: Gaps to Address

### Gap: Vercel deployment failures
The curriculum assumes deployment is smooth. Reality: build errors, environment variables, framework mismatches.

**Address in video:**
- Show the happy path first: Connect GitHub → Deploy → Live URL
- Common issues:
  - "Build failed" → Paste the build log to Claude, ask for help
  - "Environment variables" → Some projects need secrets/keys configured in Vercel dashboard
  - "Module not found during build" → Works locally but fails on Vercel (usually dependency issue)
- For ALL deployment errors: "Go to Vercel dashboard → Click on the failed deployment → Copy the build log → Paste to Claude"
- Show this flow: Deployment fails → Copy log → Claude identifies issue → Fix → Redeploy

### Gap: Handling overwhelming or crushing feedback
Day 4 says "share and get feedback." What if feedback is harsh or overwhelming?

**Address in video:**
- "Feedback can feel personal. It's not. It's information."
- Types of feedback and how to handle:
  - **Actionable feedback:** "The button is hard to find" → Great, you can fix that
  - **Scope creep:** "It should also do X and Y and Z" → Write it down for v2, don't add now
  - **Misunderstanding:** "I don't get what this does" → Maybe you need a better explanation, not a different tool
  - **Harsh but true:** "This doesn't solve my problem" → Painful but valuable. Why not? What would?
- "Not all feedback requires action. Your job is to listen, write it down, then decide what matters."

### Gap: Recontextualization - what if the model is still confused?
Sometimes even after reading files, the model is confused about the project state.

**Address in video:**
- "If Claude seems confused even after reading your files, try: 'Let me summarize where we are...' and give a 2-3 sentence update."
- "Sometimes the code has diverged from your docs. That's okay. Update your CLAUDE.md if needed."
- Show: Confused model → Manual summary → Model back on track

### Gap: When to start fresh vs. when to keep iterating
Some students will get into a long, tangled conversation and not know when to restart.

**Address in video:**
- Signs you should start fresh:
  - Model keeps making the same mistake repeatedly
  - Conversation is 50+ messages and you're going in circles
  - Model is "forgetting" things you told it earlier
- How to start fresh:
  - Save your current code (commit to GitHub)
  - Start a new conversation
  - Have model read CLAUDE.md and project files
  - Give a brief summary of where you are
- "Starting fresh isn't giving up. It's using the tools correctly."

### Gap: Mobile debugging is hard without seeing the screen
Students need to describe mobile issues without Claude seeing their screen.

**Address in video:**
- Show the technique: Open on phone → Note specific issues → Describe precisely
- Example descriptions:
  - BAD: "It looks bad on mobile"
  - GOOD: "On mobile, the header text is cut off, the main form extends past the screen causing horizontal scroll, and the submit button is too small to tap easily"
- "The more specific you are, the better Claude can fix it."
- Mention: You can also use Chrome DevTools mobile preview and describe what you see there

### Gap: The "share with someone" step feels vulnerable
Some students might be nervous about sharing unfinished work.

**Address in video:**
- Normalize: "Sharing something unfinished is uncomfortable. Do it anyway."
- Why it matters: "Feedback from real people is worth 10x your own assumptions"
- Who to share with: "Pick someone who will be honest but kind. A friend, family member, or colleague."
- Lower the stakes: "You're not asking 'Is this perfect?' You're asking 'What's confusing? What would you want it to do?'"
