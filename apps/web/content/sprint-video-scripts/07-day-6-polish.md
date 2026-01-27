# Day 6: Finish, Don't Perfect

**Duration:** 7-8 minutes
**Purpose:** Robustness, security check, resist feature trap, prepare for ship day
**Key Insight:** Today is about stopping.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

Today is about stopping.

That might sound strange. You've been building for five days. You've got momentum. You see things you could add. Features that would be nice.

Stop.

You could spend weeks adding features. You'd never ship. The goal today is not to add - it's to finish.

Tomorrow you demo. Tomorrow you ship. Today, you make what exists solid.

---

## [00:45-01:15] RECONTEXTUALIZE

[TALKING HEAD]

Same ritual.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and the current state. What's working? What might need attention before I ship this tomorrow?
```

[Wait for response]

[TALKING HEAD]

Get Claude caught up. Then we start finishing.

---

## [01:15-02:00] THE FEATURE TRAP

[TALKING HEAD]

Before you do anything else, make a decision.

No new features today.

[Beat]

I know. You want to add that one thing. "It would only take a few minutes." "It would make it so much better."

No.

Whatever capabilities you have right now - that's what you're shipping.

If you think "but I really want to add X" - write it down in your ideas folder for version 2. Not today.

[Beat]

This is a discipline. Good enough shipped is better than perfect stuck.

Today is about making what exists solid. Not bigger.

---

## [02:00-03:30] ROBUSTNESS QUESTIONS

[TALKING HEAD]

You don't need to become a developer. You just need to ask the right questions.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
I'm preparing to ship this tool tomorrow. Help me think through what could go wrong:

1. What happens if someone leaves a field empty?
2. What happens if someone enters something unexpected?
3. What happens if there's no data yet? (empty states)
4. What happens if there's too much data?
5. Are there any obvious ways this could break?

Don't over-engineer. Just identify the most likely problems and let's fix them simply.
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Let Claude identify the issues. Then fix the important ones.

[Beat]

Here's the key: you're fixing what would break during normal use. Normal use means someone using your tool as intended.

[SCREEN SHARE: Show example]

Empty field handling - fix that. Someone entering 10,000 characters - probably fine to skip for v1. Someone trying to hack your tool - not your v1 concern.

The test: would this break during normal use by someone who's trying to use it correctly?

If yes, fix it. If it's a weird edge case, note it and move on.

---

## [03:30-04:30] SECURITY CHECK

[TALKING HEAD]

If your tool handles any kind of data, spend two minutes - literally two minutes - thinking about security.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
Does this tool handle any sensitive information? Are there any obvious security concerns I should address before sharing this?
```

[Wait for Claude's response]

[TALKING HEAD]

This is not a security audit. This is a quick sanity check.

Things to consider:
- If there's a form, is the data going somewhere reasonable?
- If there are API keys in the project, are they hidden? Not visible in the code?
- If someone else uses this, could they see data they shouldn't?

[Beat]

For a tool that's just for you, this might not matter much. For something you're sharing, it's worth a quick check.

[TALKING HEAD]

Now, I know some of you are feeling anxiety right now. "Security" sounds scary.

Relax. You're building a simple tool. Next.js handles the basics for you. You're not storing credit cards or medical records.

Do the two-minute check. Fix anything obvious. Don't let security fear stop you from shipping.

---

## [04:30-05:45] FINAL POLISH

[TALKING HEAD]

With the remaining time, do a final polish pass.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
Look at the current state of this tool. What small improvements would make it feel more complete? Not new features - just polish. Things like:
- Loading states
- Confirmation messages
- Better error messages
- Cleaner layout
- Anything that feels unfinished

Give me a short list, prioritized by impact.
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Pick 2-3 things from that list. The highest impact ones.

Fix them. Push them live.

[Beat]

That's it. No more after that.

[DEMO: Show committing and pushing]

```
Help me commit and push these final polish changes.
```

[TALKING HEAD]

Your last deployment before ship day is now live.

---

## [05:45-06:30] WHAT IF YOU BROKE SOMETHING

[TALKING HEAD]

One more practical thing. What if you broke something during polish?

Maybe you tried to fix an edge case and now the main feature doesn't work.

Don't panic.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
I made changes that broke the app. Can you help me figure out what went wrong?
```

[If Claude can fix it, great. If not:]

[DEMO: Type]
```
Can you help me revert to my last working commit?
```

[TALKING HEAD]

This is why we've been committing to GitHub. Your working code is saved. You can always go back.

If you're really stuck, ask in Discord. Someone has hit the same issue.

---

## [06:30-07:15] ACCEPT WHERE YOU ARE

[TALKING HEAD]

Here's the truth. You could keep working on this forever.

There will always be something to improve. Something to add. Something that could be better.

That's true for every tool, every app, every product ever made.

At some point, you ship.

Tomorrow is that day. So today, you finish.

[Beat]

I know some of you are perfectionists. Today is hard for you.

Hear me on this: shipping imperfect is a skill. It's not lowering your standards. It's recognizing that feedback from a shipped product is worth more than speculation about an unshipped one.

What would help you more: another week of polishing in isolation, or real people using it and telling you what matters?

Perfect is the enemy of shipped. And shipped is where learning happens.

[Beat]

What you have is enough. It works. It does the thing you set out to do. Someone can use it.

That's more than most people ever build.

---

## [07:15-07:45] PREPARE FOR TOMORROW

[TALKING HEAD]

Tomorrow you'll demo this to the cohort. You'll share what you built.

Take five minutes to think about:

[SCREEN SHARE: Show the list]

- What does this tool do? (one sentence)
- Who is it for?
- What problem does it solve?
- What are you proud of?
- What would you do differently next time?

[TALKING HEAD]

You don't need to write a script. But say these answers out loud once. It helps.

Tomorrow, you're showing a friend something you made. That's the vibe. Not a boardroom presentation. Just: "Hey, let me show you this thing I built."

---

## [07:45-08:00] DAY CLOSE

[TALKING HEAD]

Here's what you accomplished today:
- No new features (discipline)
- Robustness questions asked and obvious issues fixed
- Basic security check completed
- Final polish pass done
- Mentally prepared for tomorrow's demo

[Beat]

Tomorrow you ship.

Not because it's perfect.

Because it's done.

See you on Day 7.

[END]

---

## Production Notes

### Screen Recordings Needed
- Recontextualize prompt
- Robustness questions prompt and response
- Fixing a robustness issue
- Security check prompt and response
- Final polish prompt and response
- Committing final changes
- Git revert example (if something breaks)
- Demo prep question list

### Gaps Addressed from Curriculum
1. **What counts as "robust enough"** - Normal use test explained
2. **Security feels overwhelming** - Two-minute check framing, reassurance
3. **Perfectionism is real** - Dedicated emotional support section
4. **Git recovery if polish broke something** - Revert instructions
5. **Not ready and tomorrow is ship day** - Implied: ship what you have

### Key Phrases
- "Today is about stopping."
- "Good enough shipped is better than perfect stuck."
- "Would this break during normal use?"
- "Shipping imperfect is a skill."
- "Perfect is the enemy of shipped. And shipped is where learning happens."

### Demo Prompts
```
Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and the current state. What's working? What might need attention before I ship this tomorrow?
```

```
I'm preparing to ship this tool tomorrow. Help me think through what could go wrong:

1. What happens if someone leaves a field empty?
2. What happens if someone enters something unexpected?
3. What happens if there's no data yet? (empty states)
4. What happens if there's too much data?
5. Are there any obvious ways this could break?

Don't over-engineer. Just identify the most likely problems and let's fix them simply.
```

```
Does this tool handle any sensitive information? Are there any obvious security concerns I should address before sharing this?
```

```
Look at the current state of this tool. What small improvements would make it feel more complete? Not new features - just polish. Things like:
- Loading states
- Confirmation messages
- Better error messages
- Cleaner layout
- Anything that feels unfinished

Give me a short list, prioritized by impact.
```

```
I made changes that broke the app. Can you help me figure out what went wrong?
```

```
Can you help me revert to my last working commit?
```
