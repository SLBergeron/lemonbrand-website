# Day 4: Make It Real

**Duration:** 10 minutes
**Purpose:** Deploy to Vercel, iterate with feedback, learn the 2-3 Exchange Pattern
**Key Insight:** Anyone with a link can see it. That changes everything.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

Anyone with a link can see it.

That changes everything.

Yesterday, your project worked on your computer. Today, it goes on the internet. You'll have a real URL. You can send it to anyone.

When something goes from "running on localhost" to "live on the internet" - something shifts. Suddenly it's real. Suddenly you care more.

Today we deploy, iterate, and get real feedback.

---

## [00:45-01:45] RECONTEXTUALIZE RITUAL

[TALKING HEAD]

First things first. It's a new day. Maybe you closed your session yesterday. The model doesn't remember.

Before you do anything else, we're going to recontextualize Claude.

[SCREEN SHARE: Show starting a fresh session]

[DEMO: Type the prompt]
```
Read through my project - look at CLAUDE.md, project-scope.md, and the code files. Summarize what's been built so far and where I left off. What's working? What's not done yet?
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Wait for the response. Make sure Claude understands your project before you start asking for changes.

This is your ritual. Every new session, start here.

[Beat]

It takes 30 seconds. It saves hours of confusion.

---

## [01:45-03:45] DEPLOY TO VERCEL

[TALKING HEAD]

Let's get your project on the internet.

[SCREEN SHARE: Show starting the conversation]

[DEMO: Type]
```
Help me deploy this project to Vercel. I want to connect it to my GitHub repository so it deploys automatically when I push changes.
```

[Wait for Claude to give instructions]

[TALKING HEAD over screen share]

Claude will walk you through:
- Creating a Vercel account if needed
- Connecting your GitHub repository
- Deploying for the first time

[SCREEN SHARE: Show following instructions - Vercel dashboard, connecting repo]

[Beat]

Within minutes, you'll have a URL.

[SCREEN SHARE: Show Vercel giving you the deployed URL]

A real URL. Your project. Live on the internet.

[DEMO: Copy URL, open in browser]

[SCREEN SHARE: Show your project running on the Vercel URL]

[TALKING HEAD]

Open that URL on your phone. See it there.

That's yours. You built that.

[Beat]

Now, deployment doesn't always go smoothly. Let me show you what to do if it fails.

[SCREEN SHARE: Show a failed deployment in Vercel dashboard]

If you see "Build Failed" or similar:

[DEMO: Click on the failed deployment, show build log]

Go to your Vercel dashboard. Click on the failed deployment. You'll see a build log - the full output of what went wrong.

[DEMO: Copy the build log error section]

Copy the relevant error part. Paste it to Claude.

[DEMO: Type]
```
My Vercel deployment failed. Here's the build log error: [paste error]. What's wrong and how do I fix it?
```

[TALKING HEAD]

Common deployment issues:
- Missing environment variables - some projects need secrets configured in Vercel
- "Module not found" - works locally but fails on Vercel, usually a dependency issue
- Build errors - something in the code that breaks during production build

For all of these: copy the build log, paste to Claude, fix, redeploy.

---

## [03:45-05:30] COMMON PROBLEMS

[TALKING HEAD]

Now that it's live, you'll notice things that are wrong. Here are the most common issues and how to fix them.

### Problem 1: Mobile Doesn't Work

[SCREEN SHARE: Show a broken mobile view]

It looks fine on your computer but broken on your phone. Containers too wide. Text too small. Buttons impossible to tap.

The model can't see your screen. You need to describe specifically what's wrong.

[DEMO: Type]
```
When I view this on mobile:
- The main container extends past the screen width, causing horizontal scroll
- The text in the header is too small to read
- The buttons are stacked but there's no spacing between them

Fix these mobile issues while keeping the desktop layout working.
```

[TALKING HEAD]

The pattern for visual bugs: describe what you see, describe what you expected, ask for the fix.

Bad: "It looks bad on mobile"
Good: "On mobile, the form extends past the screen edge and the submit button is too small to tap"

The more specific you are, the better Claude can fix it.

[Beat]

Quick tip: you can also use Chrome DevTools to preview mobile. Right-click, Inspect, then click the mobile icon. This lets you see the mobile layout on your computer and describe it precisely.

### Problem 2: It Looks Generic

[TALKING HEAD]

It works, but it looks... like every other AI-generated site. Boring.

[DEMO: Type]
```
This works but it looks generic and AI-generated. Improve it:
- Better typography (proper fonts, hierarchy)
- More intentional color choices
- Subtle motion or hover states
- Make it feel crafted, not generated

Don't change the functionality - just make it look good.
```

[TALKING HEAD]

Remember Day 2 when we talked about code being cheap? Use it. Ask for three visual variants if you want. Pick the one that feels right.

---

## [05:30-07:00] THE 2-3 EXCHANGE PATTERN

[TALKING HEAD]

Here's something I want you to internalize.

Most problems get solved in 2-3 exchanges with Claude. Not one. Not ten. Two or three.

[SCREEN SHARE: Show visual of the pattern]

Exchange 1: Your initial request → Claude's initial output.

Something's not right. That's expected.

Exchange 2: "Here's what I got. Here's what's wrong. Here's what I wanted."

Claude refines.

Exchange 3: You might need one more round, or you're done.

[TALKING HEAD]

This is called the 2-3 Exchange Pattern. It's the core skill of building with AI.

[Beat]

The mistake people make: they think if the first output isn't perfect, they should start over.

No. Iterate, don't start over.

Starting over throws away everything Claude learned about what you want. The second and third exchanges are where the magic happens - Claude is adjusting based on your specific feedback.

[Beat]

Now, sometimes you DO need to start fresh. Here's when:
- Claude keeps making the same mistake repeatedly
- The conversation is 50+ messages and going in circles
- Claude seems to be "forgetting" things from earlier

If that happens: commit your code to GitHub, start a new conversation, recontextualize, and continue.

But most of the time? Iterate.

---

## [07:00-08:00] GET FEEDBACK

[TALKING HEAD]

You have a live URL. Now get feedback from someone who isn't in this Sprint.

Send your Vercel URL to one person. A friend, family member, colleague. Someone who won't just say "looks great!"

[Beat]

Ask them:
- "What's confusing?"
- "What would you want it to do that it doesn't?"
- "What did you try to do that didn't work?"

[Beat]

Their feedback is gold. Write it down.

[TALKING HEAD]

Now, a word about feedback.

Feedback can feel personal. It's not. It's information.

Some feedback is actionable: "The button is hard to find." Great, you can fix that.

Some feedback is scope creep: "It should also do X and Y and Z." Write it down for v2. Don't add it now.

Some feedback reveals a misunderstanding: "I don't get what this does." Maybe you need a better explanation, not a different tool.

Some feedback is harsh but true: "This doesn't solve my problem." Painful, but valuable. Why not? What would?

[Beat]

Not all feedback requires action. Your job is to listen, write it down, then decide what matters.

---

## [08:00-09:00] THE ITERATION CYCLE

[TALKING HEAD]

With the time remaining today, pick one problem from your list and fix it.

[SCREEN SHARE: Show the cycle]

The cycle:
1. Describe the problem clearly
2. Let Claude fix it
3. Test locally
4. If it's better, push to GitHub
5. Wait 30 seconds - see it live on Vercel
6. If it's not right, describe what's still off, go again

[TALKING HEAD]

Repeat this 3-5 times today. Each cycle, your tool gets better. Each cycle, you get more comfortable with the pattern.

[Beat]

This is how you'll work from now on. Not "build once, ship once." Build, ship, see, fix, ship again.

---

## [09:00-09:45] SHARE ANXIETY

[TALKING HEAD]

One more thing.

Some of you are nervous about sharing. About sending that URL to someone. About showing unfinished work.

That's normal. Sharing something you made is vulnerable.

Do it anyway.

[Beat]

Feedback from real people is worth 10x your own assumptions. You're not asking "Is this perfect?" You're asking "What's confusing? What would you want it to do?"

Lower the stakes. Pick someone who will be honest but kind. You're showing a friend something you made, not presenting to a board.

The discomfort of sharing is part of the skill. It gets easier.

---

## [09:45-10:00] DAY CLOSE

[TALKING HEAD]

Here's what you accomplished today:
- Recontextualized Claude at session start
- Deployed to Vercel - you have a live URL
- Fixed at least one problem through iteration
- Shared with someone and got real feedback

You have a URL. Something that exists on the internet because you built it.

Tomorrow, you'll take that feedback and add real value. Make it something genuinely useful.

See you on Day 5.

[END]

---

## Production Notes

### Screen Recordings Needed
- Recontextualize prompt and response
- Vercel deployment walkthrough (create account, connect GitHub, deploy)
- Successful deployment showing URL
- Opening URL on phone (or emulator)
- Failed deployment - build log, copying error
- Mobile layout issues example
- Generic AI look example
- Fixing mobile with specific description
- 2-3 Exchange Pattern visual
- Push → deploy → see live cycle

### Gaps Addressed from Curriculum
1. **Vercel deployment failures** - Dedicated section on build log → Claude → fix
2. **Handling harsh feedback** - Framework: actionable, scope creep, misunderstanding, harsh but true
3. **Recontextualization - what if model still confused** - Mentioned in ritual section
4. **When to start fresh vs iterate** - Clear criteria: same mistake, 50+ messages, forgetting
5. **Mobile debugging** - Specific description pattern, DevTools mention
6. **Share anxiety** - Dedicated section normalizing vulnerability

### Key Phrases
- "Anyone with a link can see it. That changes everything."
- "Iterate, don't start over."
- "Starting over throws away everything Claude learned about what you want."
- "Feedback from real people is worth 10x your own assumptions."

### Demo Prompts
```
Read through my project - look at CLAUDE.md, project-scope.md, and the code files. Summarize what's been built so far and where I left off. What's working? What's not done yet?
```

```
Help me deploy this project to Vercel. I want to connect it to my GitHub repository so it deploys automatically when I push changes.
```

```
My Vercel deployment failed. Here's the build log error: [paste error]. What's wrong and how do I fix it?
```

```
When I view this on mobile:
- The main container extends past the screen width, causing horizontal scroll
- The text in the header is too small to read
- The buttons are stacked but there's no spacing between them

Fix these mobile issues while keeping the desktop layout working.
```

```
This works but it looks generic and AI-generated. Improve it:
- Better typography (proper fonts, hierarchy)
- More intentional color choices
- Subtle motion or hover states
- Make it feel crafted, not generated

Don't change the functionality - just make it look good.
```
