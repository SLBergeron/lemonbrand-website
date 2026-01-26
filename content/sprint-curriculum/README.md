# Sprint Curriculum

## Structure

Each day has its own markdown file with the complete lesson plan:

```
sprint-curriculum/
├── README.md              # This file
├── day-0-setup.md         # ✅ Complete
├── day-1-scope.md         # Pending
├── day-2-foundation.md    # Pending
├── day-3-structure.md     # Pending
├── day-4-core.md          # Pending
├── day-5-expand.md        # Pending
├── day-6-polish.md        # Pending
└── day-7-ship.md          # Pending
```

---

## Progress

- [x] Day 0: Setup
- [x] Day 1: Scope
- [x] Day 2: Foundation
- [x] Day 3: Structure
- [x] Day 4: Core
- [x] Day 5: Expand
- [x] Day 6: Polish
- [x] Day 7: Ship

---

## Day Overview

| Day | Title | Focus | Duration |
|-----|-------|-------|----------|
| 0 | Setup | Install tools, define project idea | 30-45 min |
| 1 | Scope | Requirements discovery WITH the model | 1-2 hrs |
| 2 | Foundation | CLAUDE.md + build strategy | 1-2 hrs |
| 3 | Structure | First working feature (Build Stack) | 2-3 hrs |
| 4 | Core | Fix and expand (2-3 Exchange Pattern) | 2-3 hrs |
| 5 | Expand | Add features | 2-3 hrs |
| 6 | Polish | Ship-ready, edge cases | 1-2 hrs |
| 7 | Ship | Demo + reflection | 1 hr |

---

## Key Frameworks

### The Build Stack (Day 3)
```
CONTEXT: What exists, what you're trying to do, constraints
TASK: The specific thing you want built
CONSTRAINTS: How you want it done, what to avoid
```

### The 2-3 Exchange Pattern (Day 4)
```
Exchange 1: Initial request → Initial output
Exchange 2: "Here's what I got. Here's what's wrong. Here's what I wanted."
Exchange 3: Refined solution
```

---

## Lesson Template

Each day file includes:

1. **Overview** - Title, subtitle, duration
2. **Learning Objectives** - What they understand after
3. **Key Concepts** - Frameworks/mental models introduced
4. **Lesson Content** - The teaching material
5. **In-Course Form** (if applicable) - Input fields for the UI
6. **Deliverables** - What to complete
7. **Checklist Items** - Trackable steps with IDs
8. **Bonus: For the Impatient** - Optional extra for eager students
9. **Pedagogical Notes** - Why this day works the way it does

---

## Implementation Notes

All 8 days are now finalized. Next steps:

1. **Create Convex seed function** (`seedAllSprintContent`) to populate `sprintContent` table
2. **Build form components** for in-course inputs (each day has specific fields)
3. **Generate downloadable markdown** from form responses (Day 0, Day 1, Day 2)
4. **Wire up checklist tracking** to `sprintDayProgress` table
5. **Create video placeholders** - each day needs a training video
6. **Build download functionality** for project-idea.md retrieval (Day 1 references Day 0)

## Curriculum Complete

**The Arc:**
- Days 0-2: Plan (Setup → Scope → Foundation)
- Day 3: Build (First working version)
- Day 4: Ship (Deploy + iterate)
- Days 5-6: Improve (Expand → Polish)
- Day 7: Celebrate (Demo + reflect + what's next)

**Key Frameworks Introduced:**
- Day 1: Reference files, don't paste
- Day 2: CLAUDE.md as persistent memory
- Day 3: Build Stack (woven in, not named)
- Day 4: 2-3 Exchange Pattern (named in bonus)
- Day 4: Recontextualization ritual
- Day 5: Ideas folder + system thinking
- Day 6: Robustness questions

**Recurring Patterns:**
- Voice reminders (use voice-to-text for form inputs)
- Recontextualization at session start (Day 4+)
- Bonus sections for eager students
- Discord posting as social accountability

---

## Video Script Notes

Each day's document now includes a **"Video Script Notes: Gaps to Address"** section at the bottom. These are issues the written curriculum doesn't fully cover that should be addressed in the accompanying videos.

**Summary of gaps identified:**

| Gap | Relevant Days | What to Address |
|-----|---------------|-----------------|
| Web app definition | 0 | Clarify what counts as a web app |
| Project type guidance | 0, 1 | Steer toward generators/calculators, away from trackers |
| Cursor vs Terminal demos | 0-3 | Show both interfaces doing the same thing |
| Environment/npm errors | 0, 3 | Common errors and how to fix them |
| Data persistence | 1, 3, 5 | When it's needed, localStorage solution |
| Project too big | 1, 3 | Signs and how to scope down gracefully |
| Plan mode in each interface | 1, 2 | Show how it works in Cursor vs Terminal |
| Adapting prompts | 1, 2 | Model thinking process, show variations |
| Long/muddy conversations | 1, 4 | When to restart, how to do it |
| Visualization variety | 2 | Show different project types |
| "Works but wrong" vs errors | 3 | How to describe what you expected |
| Git basics and recovery | 3, 6 | Happy path + "I broke everything" |
| Vercel deployment failures | 4 | Common issues, copy build log |
| Handling harsh feedback | 4 | Framework for processing feedback |
| Share anxiety | 4, 7 | Normalizing vulnerability |
| Mobile debugging | 4 | How to describe visual issues precisely |
| Feedback prioritization | 5 | Framework for what to act on |
| Claude Code Mobile alternatives | 5 | Other ways to capture ideas |
| Robustness threshold | 6 | What counts as "fixed enough" |
| Security basics | 6 | 2-minute check, not audit |
| Perfectionism | 6 | Emotional support for shipping imperfect |
| Loom how-to | 7 | Quick walkthrough |
| Demo anxiety | 7 | Tips for nervous presenters |
| Organizational adoption | 7 | Reality of IT/buy-in |
| Didn't finish | 7 | Options for incomplete projects |
| 8-Week pitch authenticity | 7 | Frame honestly, no pressure |

These gaps are addressable in 10-15 minute videos without changing the written curriculum.
