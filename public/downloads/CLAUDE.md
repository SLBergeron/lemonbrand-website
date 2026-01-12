# CLAUDE.md

<!--
FOR AI MODELS (Claude, Cursor, Antigravity, Copilot, etc.):

When a user shares this template with you, HELP THEM FILL IT OUT.
Don't just show the template — customize it for their project.

1. Ask what they're building (one sentence)
2. Ask who it's for (personal use, team, clients, public)
3. Ask their experience level (no-code, some coding, developer)
4. Based on their answers, suggest a tech stack
5. Walk through each section and help them fill it in with specifics

The goal: A completed CLAUDE.md tailored to THEIR project, not a blank template.
-->

<!--
WHY THIS FILE EXISTS:
Claude starts every conversation from zero. It doesn't know your project,
your preferences, or what you've already built. This file changes that.

Save it in your project root. Claude Code reads it automatically.
Fill in each section. Be specific. The more context you give, the better
your results.

Delete these comment blocks once you understand them.
-->

## Project Context

<!--
This is the most important section. One paragraph that tells Claude
exactly what you're building. Without this, you get generic suggestions.
With this, you get solutions that fit YOUR project.
-->

**Project:** [Your project name]
**One-liner:** [What is this? One sentence.]
**Goal:** [What does "done" look like?]
**Who's it for:** [You? Your team? Clients?]

<!-- EXAMPLE:
**Project:** MealPrep Tracker
**One-liner:** Web app to plan weekly meals and generate shopping lists.
**Goal:** Save 2 hours/week on meal planning. Auto-generate grocery lists grouped by store section.
**Who's it for:** Personal use, just me.
-->


## Tech Stack

<!--
Tell Claude what tools to use. Otherwise it guesses—and might pick
something you don't want or can't use.

The stack below is my recommendation for most projects. Adjust as needed.
-->

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** Convex (or: Supabase, Firebase, local JSON, SQLite)
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Auth:** (none for MVP / BetterAuth / Clerk)
- **Hosting:** Vercel

<!-- If you don't know what stack to use, keep these defaults. They work. -->


## Core Behaviors

<!--
This shapes HOW Claude works with you. Think of it as setting expectations
for a collaborator. Be explicit about what you want.
-->

### Response Style
- Terse responses. No fluff.
- Skip explanations unless I ask for them.
- When showing code, show the full file or clear snippets—not fragments.

### Working Style
- Edit existing files over creating new ones.
- Minimal viable solution first. No over-engineering.
- If something seems wrong, ask before "fixing" it.

### What I Expect
- Working code, not pseudocode.
- If you're unsure, say so. Don't guess.
- Test your suggestions mentally before proposing them.

<!-- Adjust these based on how you like to work. Some people want more
explanation. Some want Claude to just execute. Set your preference. -->


## Current State

<!--
Tell Claude what already exists. This prevents it from:
- Recreating things you already built
- Suggesting changes that conflict with working code
- Starting from scratch when you're halfway done
-->

**What's working:**
- [List features/pages that work]

**In progress:**
- [What you're currently building]

**Known issues:**
- [Bugs or limitations you're aware of]

<!-- EXAMPLE:
**What's working:**
- Recipe list page displays all saved recipes
- Can add new recipes manually
- Basic search by recipe name

**In progress:**
- Shopping list generation from selected recipes

**Known issues:**
- No way to scale recipe servings yet
- Mobile layout needs work
-->


## File Structure

<!--
Map your project so Claude knows where things live. You don't need every
file—just the important ones. Update this as your project grows.
-->

```
/
├── app/                    # Pages and routes (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── layout.tsx          # Root layout
│   └── [feature]/          # Feature-specific pages
├── components/             # Reusable UI components
│   └── ui/                 # shadcn/ui components
├── lib/                    # Utilities and helpers
├── convex/                 # Database schema and functions (if using Convex)
│   ├── schema.ts           # Data model
│   └── [table].ts          # Table-specific functions
└── public/                 # Static assets
```

**Key files:**
- `app/page.tsx` — Main entry point
- `convex/schema.ts` — Database structure
- `components/[MainComponent].tsx` — Primary UI component

<!-- Keep this updated. When you add major features, add their files here. -->


## Rules

<!--
Hard constraints. Things Claude must always do (or never do).
These are your guardrails.
-->

### Always
- Use TypeScript. No `any` types unless absolutely necessary.
- Handle errors gracefully. Don't let the app crash.
- Keep components small. If it's over 200 lines, split it.

### Never
- Don't delete code without asking first.
- Don't add dependencies without mentioning it.
- Don't create files outside the existing structure.
- No console.logs in committed code.

### Patterns to Follow
- Use server components by default (Next.js).
- Client components only when needed (interactivity, hooks).
- Colocate related files. Keep feature code together.

<!-- Add rules specific to your project. If you have strong opinions
about how code should look or work, put them here. -->


## Quick Reference

<!--
Commands and patterns you use often. Saves time when you need them.
-->

### Dev Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Check for errors
npx convex dev       # Start Convex (if using)
```

### Common Asks
- "Add a new page for [feature]"
- "Create a component that [does X]"
- "Fix the bug where [description]"
- "Refactor [file] to be cleaner"

<!-- Add shortcuts specific to your workflow. -->


---

## How to Use This File

1. **Fill in each section** — Be specific, not generic
2. **Update as you build** — Add decisions, update current state
3. **Reference when stuck** — Paste relevant sections into chat if needed

The more context you give, the less you repeat yourself.

Questions? Reply to the email that sent you this.

— Simon from Lemonbrand.io
