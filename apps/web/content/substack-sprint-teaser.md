# Why Vibe Coding Breaks (And What I Figured Out To Make It Work For Me)

I keep seeing it.

Someone tries Cursor or Claude or Replit, types "build me a landing page" and something actually appears. It works. They're hooked.

Then they try to build something real and it falls apart.

Not immediately. It works for a bit. You get most of the way there. Then you hit something the model doesn't get. You rephrase. Try a different prompt. The model gives you code that breaks something else. You explain what went wrong and it apologizes and breaks a third thing.

You start over. Maybe if you say it different from the start, it'll work this time.

I've done this. A lot.

---

## The proposal generator

I was tired of writing proposals. Same structure every time. Same sections. Copy the last one, change the names, change the numbers. Boring. Takes forever. I kept thinking there has to be a better way.

So I asked Claude to build me a proposal generator.

Boom - form, fields, button. Output that looked like a proposal. I was flying.

Then I needed PDF.

You can't just make a PDF. You build a React thing, style it, add a print button, print-to-PDF. I didn't know that. Had to figure it out.

Then colors looked wrong when printed. Fine on screen, washed out on paper. Print stylesheets. Didn't know those existed.

Then I needed different sections for different clients. Some need timelines, some don't. Some need pricing breakdowns, some need flat rates. Had to learn JSON, figure out where variables go so things could swap in and out.

I didn't know any of this when I started. I just didn't want to write proposals anymore.

Every layer revealed another thing I didn't know. PDF rendering. Print CSS. Data structures. Twenty small problems I couldn't have seen coming.

It works now. I use it all the time. But it took coming back over and over. Build, hit wall, learn something, rebuild. Not a straight line. A spiral.

---

## What nobody told me

When I started building with AI - actually shipping things, not demos - there was no playbook. Prompt courses existed. Beginner tutorials. Nothing about building something real over days and weeks.

That's where it breaks down. Not the first conversation. The fifth. When you're deep into a problem you didn't know existed.

The problem isn't prompting. It's how you work.

Most people treat AI like a magic box. Throw in a request, hope for output. Doesn't work, try different words. Still doesn't work, start over.

Starting over almost never fixes it. Better context does. Better back and forth. Systems that let you keep going instead of restart.

---

## What I do now

**The model is for thinking, not just code.**

Before I build, I talk. Not "build me this." More like:

> i want to make something that generates proposals for me. ask me questions about what these look like and what i need

The model asks stuff I hadn't thought about. Do you need PDF? Different proposal types? Edit after you make one?

Some questions I can answer. Some show me I don't actually know what I want yet. Better to find out now than on day three.

**Context goes in files.**

The model forgets. Between sessions, sometimes in the middle of one.

I keep a file called CLAUDE.md. It tells the model what the project is, what we decided, how things work. Instead of explaining everything again:

> read claude.md and lets keep going

For the proposal generator, this file grew. Started simple. Ended up with notes on print stuff, how the data works, what breaks easy. Context built up instead of getting lost.

**Talk before you build.**

The instinct is to jump in.

But I didn't know I needed print stylesheets. Didn't know I needed JSON. An hour of talking saves three hours of fixing.

Now I ask stuff like:

> what problems am i gonna hit with this

> what do i not know that i dont know

---

## Two things to try

### Put your context in a file

Instead of pasting your whole idea into every message, put it in a markdown file.

Instead of: *[pasting a wall of text]*

Try:

> read project-idea.md and help me figure out next steps

Model reads the file, has context, you didn't repeat yourself. Sounds small. Adds up fast.

### Make the model push back

Models agree with you. Problem when you need real feedback.

Before you build, try:

> pls poke holes in this. whats wrong with it

> if this fails whats probably why

> what am i not seeing

Doesn't catch everything. Catches a lot.

---

## Going deeper

I've been turning this into a 7-day sprint. First two days are free. No email, no signup. Just the lessons.

**Day 0:** Setup - tools, costs, what you want to build.

**Day 1:** Figuring out what you're actually making before you touch code.

If you want them: [lemonbrand.io/sprint](https://lemonbrand.io/sprint)

Days 0 and 1 are where the shift happens. If those click, you'll figure out the rest.

---

The model is for thinking, not just code. Context goes in files, not your head. You'll hit problems you can't predict - build systems that let you keep going instead of starting over.

That's what I've learned. Still figuring out the rest.

— Simon

*I'm a designer who taught himself to code. 13 years in startups. Now I run Lemonbrand building tools for small businesses. I've shipped 50-60 small apps this way. Not because I'm fast - because I finally have a system that works.*
