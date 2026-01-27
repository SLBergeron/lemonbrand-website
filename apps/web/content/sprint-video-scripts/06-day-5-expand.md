# Day 5: Add Real Value

**Duration:** 8-10 minutes
**Purpose:** Act on feedback, add capabilities, recognize the system
**Key Insight:** You have a system now.

---

## [00:00-00:45] COLD OPEN

[TALKING HEAD]

You have a system now.

I want you to pause and recognize what you've done this week.

Day 0: Set up tools, captured your idea.
Day 1: Scoped it with the model.
Day 2: Created context, visualized the plan.
Day 3: Built the first version.
Day 4: Deployed, iterated, got feedback.

Today, Day 5, you add real value based on that feedback.

This isn't just how you built this tool. This is how you'll build everything from now on.

---

## [00:45-01:30] RECONTEXTUALIZE

[TALKING HEAD]

Same ritual as yesterday. New session, recontextualize.

[SCREEN SHARE: Show typing the prompt]

[DEMO: Type]
```
Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and where I left off. What's working? What was I improving yesterday?
```

[Wait for response]

[TALKING HEAD]

Wait for Claude to catch up before you start today's work.

---

## [01:30-03:00] FEEDBACK REVIEW

[TALKING HEAD]

Yesterday you shared your tool with someone. What did they say?

Pull up your notes. If you didn't write them down, try to remember:
- What confused them?
- What did they ask for?
- What did they try to do that didn't work?
- What did they wish it could do?

[Beat]

Now, here's the thing about feedback: you got more than you can act on. That's good. It means people engaged with your tool.

But you can't do everything. So we need to prioritize.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
Yesterday I shared my tool with someone. Here's the feedback I got:
- [feedback item 1]
- [feedback item 2]
- [feedback item 3]
- [feedback item 4]

Help me prioritize. Which of these should I work on? What would add the most value?
```

[Wait for Claude's response]

[TALKING HEAD over screen share]

Let Claude help you decide. It can see the full picture of your project and help you figure out what's highest impact.

[Beat]

Here's a framework for prioritization:

[SCREEN SHARE: Show framework]

1. What blocks basic usage? Fix first.
2. What was confusing? Fix second.
3. What would make it genuinely more useful? Add if time.
4. What's nice-to-have? Write down for v2.

[TALKING HEAD]

You won't address everything. That's okay. Pick the highest impact items.

---

## [03:00-05:00] ADD MEANINGFUL CAPABILITIES

[TALKING HEAD]

Pick 1-2 things from the feedback that would make your tool genuinely more useful.

Remember Day 4: plan before building. Don't just say "add this."

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
I want to add [capability from feedback]. Before you build it, let's make sure we're aligned:
- What's the input?
- What's the output?
- What happens when someone uses it?

Ask me any clarifying questions.
```

[Wait for Claude's response, answer a question or two]

[TALKING HEAD over screen share]

Have this conversation. Let Claude ask you questions. Get clear.

Then, once you're aligned:

[DEMO: Type]
```
Okay, we're aligned. Let's build it.
```

[Wait for Claude to build]

[TALKING HEAD]

Test it. Push it live. See it on your Vercel URL.

If you have time, repeat for a second capability.

[Beat]

The goal isn't to add everything. It's to add the things that matter.

---

## [05:00-06:00] HANDLING PERSISTENCE FEEDBACK

[TALKING HEAD]

Now, there's one type of feedback that deserves special attention.

If someone said "I want to save things" or "the data disappeared when I refreshed" - that's a persistence question.

Here's the reality: adding real persistence - a database that syncs across devices - is complex. That's 8-Week territory.

But there's a quick fix for the Sprint.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
I want the data to persist when I refresh the page. Can you add localStorage so it saves and loads automatically?
```

[Wait for Claude to add localStorage]

[TALKING HEAD]

LocalStorage saves data in the user's browser. It persists across refreshes. It works for one person, on one device.

That's enough for many Sprint projects. If you need multi-user or sync across devices, note it for v2 or the 8-Week.

---

## [06:00-07:30] THE SYSTEM WORKS FOR EVERYTHING

[TALKING HEAD]

Step back for a moment.

Look at what you've done this week:

[SCREEN SHARE: Show the arc]

- Day 0: Set up tools, captured idea
- Day 1: Scoped it with the model
- Day 2: Created context, visualized the plan
- Day 3: Built the first version
- Day 4: Deployed, iterated, got feedback
- Day 5: Added real value based on feedback

This is a system. It works for any project. Not just this one.

[TALKING HEAD]

Want to build a meal planner? Same process.
Want to build a client tracker? Same process.
Want to build something for your side business? Same process.

[Beat]

Now, I'm not going to pretend this works for everything. Enterprise software with many users and complex permissions - that needs more.

But for tools, utilities, automations, internal apps, side projects - this process works. The complexity ceiling is higher than you think.

[Beat]

The Sprint taught you a way of working. The tool is just the proof.

---

## [07:30-08:45] CAPTURING IDEAS

[TALKING HEAD]

By now, you've probably had other project ideas. Things you thought of while building this. Things you've wanted for a while.

Let's capture them.

[SCREEN SHARE: Show typing]

[DEMO: Type]
```
Create a folder called "ideas" in my home directory. Inside it, create a file called project-ideas.md where I can capture project ideas as they come to me.
```

[Wait for Claude to create it]

[TALKING HEAD over screen share]

Start writing them down. Even rough ones. Even half-baked ones.

[SCREEN SHARE: Show example content]

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
```

[TALKING HEAD]

Format doesn't matter. Just capture them.

You don't need to build these now. You just need to save them before you forget.

[Beat]

One more thing. Ideas don't always come when you're at your computer.

If you have Claude Code Mobile, you can capture ideas from your phone. Just tell Claude to add to your project-ideas.md.

If you don't have that set up, use whatever works: notes app, voice memo, text yourself. The point is to capture ideas when they come, not just when you're at your desk.

---

## [08:45-09:15] WHAT IF NO NEW IDEAS?

[TALKING HEAD]

Now, some of you might be thinking: "I don't have any new ideas."

That's okay. Not everyone has the "I could build other things" moment right away. It'll come.

If you want to prompt yourself:

Think about your work. What do you do repeatedly? What annoys you? What data do you wish was organized differently?

Think about your life. What tools do you wish existed? What would make something easier?

Write down even bad ideas. They lead to good ones.

[Beat]

If you finish the Sprint with one working tool and zero new ideas, that's still a win. The ideas will come when they come.

---

## [09:15-09:45] DAY CLOSE

[TALKING HEAD]

Here's what you accomplished today:
- Reviewed and prioritized feedback
- Added 1-2 meaningful capabilities
- Created an ideas folder
- Captured at least a few project ideas

Your tool is now more valuable than it was this morning. It does things people actually asked for.

Tomorrow is about finishing, not perfecting. We're going to resist the urge to add more, and make what you have solid.

Day 6: Finish, don't perfect.

See you tomorrow.

[END]

---

## Production Notes

### Screen Recordings Needed
- Recontextualize prompt and response
- Feedback prioritization prompt
- Planning new capability with Claude (Q&A)
- Building the capability
- LocalStorage persistence fix
- System arc visual (Days 0-5)
- Creating ideas folder
- Example project-ideas.md content
- Claude Code Mobile mention (or alternative capture methods)

### Gaps Addressed from Curriculum
1. **Feedback was "I need data persistence"** - Dedicated section on localStorage solution
2. **"System works for everything" skepticism** - Acknowledged limits, gave realistic scope
3. **How to prioritize with lots of feedback** - Framework: blocks usage → confusing → useful → nice-to-have
4. **Claude Code Mobile alternatives** - Notes app, voice memo, text yourself
5. **What if no new ideas** - Prompts to generate them, normalization

### Key Phrases
- "You have a system now."
- "This isn't just how you built this tool. This is how you'll build everything from now on."
- "The goal isn't to add everything. It's to add the things that matter."
- "The Sprint taught you a way of working. The tool is just the proof."

### Demo Prompts
```
Read through my project - CLAUDE.md, project-scope.md, and the code. Summarize what's been built and where I left off. What's working? What was I improving yesterday?
```

```
Yesterday I shared my tool with someone. Here's the feedback I got:
- [feedback item 1]
- [feedback item 2]
- [feedback item 3]
- [feedback item 4]

Help me prioritize. Which of these should I work on? What would add the most value?
```

```
I want to add [capability from feedback]. Before you build it, let's make sure we're aligned:
- What's the input?
- What's the output?
- What happens when someone uses it?

Ask me any clarifying questions.
```

```
I want the data to persist when I refresh the page. Can you add localStorage so it saves and loads automatically?
```

```
Create a folder called "ideas" in my home directory. Inside it, create a file called project-ideas.md where I can capture project ideas as they come to me.
```
