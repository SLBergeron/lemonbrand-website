# Day 2: Foundation

**Status:** Final

---

## Overview

**Title:** Build Your Foundation

**Subtitle:** Set up your project's memory and see your plan come to life.

**Duration:** 1-2 hours

---

## Learning Objectives

1. Create CLAUDE.md - your project's persistent memory
2. See the difference context makes (same request, wildly different results)
3. Understand "ideas are hard, code is cheap"
4. Learn when to read carefully vs. when to auto-accept
5. Visualize your project as a working HTML file
6. Experience the full loop: scope → plan → context → see it

---

## Key Concepts Introduced

**CLAUDE.md is your project's memory**
You've probably noticed Claude "forgets" things between sessions. CLAUDE.md fixes that. It's a file the model reads automatically. Once set up, Claude starts every conversation already knowing your project.

**Ideas are hard, code is cheap**
The thinking you did on Day 0 and Day 1 - that's the hard part. The code? That's the cheap part. When you're stuck thinking, ask the agent to build something. Visualize it. Code is disposable. Ideas are valuable.

**Build to think**
Don't just plan in your head. Build quick visualizations to see your ideas. An HTML file takes seconds to generate and helps you think clearly.

**Read when planning, auto-accept when executing**
Not everything the model produces should be auto-accepted. When you're in planning mode - like today - you need to READ what it generates. Review it. Push back. Adjust. Auto-accept has its place, but this isn't it. Planning requires your involvement.

---

## Context Management Skill: CLAUDE.md

Your project folder after today:

```
my-sprint-project/
├── project-idea.md      # Your original idea
├── project-scope.md     # Your scoped plan from Day 1
├── CLAUDE.md            # NEW: Your project's memory
├── plan-visual.html     # NEW: Your plan visualized
└── src/                 # Still empty - real code starts Day 3
```

**What goes in CLAUDE.md:**
- What you're building (from your scope)
- Who it's for
- The core feature (the ONE thing)
- Your preferences (how you like to work)
- Current state (what exists, what's next)
- Rules (what to always/never do)

---

## Lesson Content

### Part 1: Create CLAUDE.md

Start a conversation:

> "Read project-scope.md. Based on this scope, help me create a CLAUDE.md file for this project. This file should give you (the model) all the context you need to help me build this over the next 5 days."

**Important:** Don't just accept whatever Claude produces. READ IT.

- Does it capture your project accurately?
- Is anything missing that you'd want a collaborator to know?
- Is anything wrong or misunderstood?

This is a planning artifact. You need to be involved.

---

### Part 2: See the Difference

Now test it. Close your session. Open a new one. Ask:

> "What am I building?"

Claude should know. It read your CLAUDE.md. This is the magic - persistent context.

Try another test:

> "What's the core feature I'm focused on?"

If Claude knows, your context is working. If it's confused, your CLAUDE.md needs work.

---

### Part 3: Visualize Your Plan

Now the fun part. You're going to generate an HTML file that helps you SEE your project.

**The goal:** Understand your tool visually. Not a tech spec. Not a timeline. A picture of what this thing IS.

Ask:

> "Based on my project scope, create an HTML file that visualizes my project. I want to see:
> - What this tool does (the core purpose)
> - Where it fits in my workflow (what happens before/after using it)
> - The inputs (what goes into it)
> - The outputs (what comes out of it)
> - The process (what happens in between)
>
> Make it visual and clear. Use modern styling, clean typography. Make it something that helps me think about my project."

**Open the HTML file in your browser.** See your plan.

**Again: READ what it produced.** Does this match your mental model? Is anything off? If so, tell Claude what to adjust.

---

### Why This Matters

You just went from "I have an idea" to "I can see my project" without writing application code.

This is how you'll work from now on:
- Stuck on how something should work? Ask for a quick visualization.
- Not sure about a user flow? Build a throwaway HTML to see it.
- Debating between approaches? Have the agent mock up both.

Code is cheap. Use it to think.

---

## Deliverables

1. CLAUDE.md created for your project
2. Verified context works (new session knows your project)
3. plan-visual.html generated and opened in browser
4. Reviewed and refined until it matches your mental model

---

## In-Course Form

**Form fields:**

1. **Upload your plan-visual.html OR a screenshot of it**

2. **What did you learn about your project by seeing it visualized?**

   *Use your voice. Speak your answer.*

---

## Checklist Items

| ID | Label | Description |
|----|-------|-------------|
| `create-claude-md` | Create CLAUDE.md | Have the model draft your project's context file |
| `read-and-review` | Read and review | Don't auto-accept - read what was generated and adjust |
| `test-context` | Test in new session | Close and reopen - does Claude know your project? |
| `visualize-plan` | Generate plan-visual.html | Ask for an HTML visualization with inputs/outputs/process |
| `open-html` | Open in browser | See your plan rendered |
| `review-visual` | Review the visualization | Does it match your mental model? Refine if needed |
| `complete-form` | Complete the form | Upload HTML or screenshot + voice reflection |
| `post-discord` | Post in Discord | Share your visualization with the cohort |

---

## Bonus: For the Impatient - Make It Beautiful (and Learn Skills)

Claude Code has **skills** - specialized prompts that produce better results for specific tasks.

One useful skill is `frontend-aesthetics` from skills.sh. It helps you avoid generic, AI-slop design and create something distinctive.

**Try this:**

> "Refine this HTML using the frontend-aesthetics approach. Combat the generic AI look. Improve typography, add atmospheric backgrounds, use intentional color choices. Make it feel crafted, not generated."

**Even better - generate variants:**

> "Create three different visual styles for my project visualization:
> 1. Minimal and clean
> 2. Bold and confident
> 3. Warm and approachable
>
> Generate separate HTML files for each. Use the frontend-aesthetics principles for all three."

Open all three in your browser. See which one resonates. See which one feels like YOUR project.

This is play. This is cheap. This is how you explore.

**To learn more about skills:**
- Visit skills.sh to browse available skills
- Skills are prompts that make the model better at specific tasks
- You can create your own skills as you develop your workflow

---

## Pedagogical Notes

- Day 2 delivers the first "working" output - HTML they can see in browser
- The "don't auto-accept" lesson is critical - establishes active involvement in planning
- Visualization focus on inputs/outputs/process helps them understand their tool systemically
- Testing context in new session proves CLAUDE.md works (visceral proof)
- Bonus introduces skills.sh ecosystem without overwhelming - plants a seed
- Three variants exercise teaches exploration through cheap code generation
- Still no "real" application code - but they have something working, which satisfies the build itch
- The loop is now complete: idea → scope → context → visualization

---

## Video Script Notes: Gaps to Address

### Gap: Visualization doesn't work the same for all project types
"Inputs → Process → Outputs" is clear for generators. Less clear for dashboards, trackers, or planners.

**Address in video:**
- Show multiple examples of what the Day 2 visualization looks like for different project types:
  - **Proposal Generator:** Inputs (client name, project, pricing) → Process (template + formatting) → Output (formatted proposal)
  - **ROI Calculator:** Inputs (costs, revenue) → Process (calculation) → Output (ROI percentage + breakdown)
  - **Content Idea Organizer:** Inputs (raw ideas) → Process (categorization) → Output (organized list by topic)
- Set expectations: "Your visualization might look different. That's fine. The goal is to SEE your project, not to follow a specific format."

### Gap: CLAUDE.md might not capture everything they need
Students might create a CLAUDE.md that's too generic or missing key information.

**Address in video:**
- Show a good vs. bad CLAUDE.md example
- Key things to include: What we're building, who it's for, tech decisions, current state
- Common mistake: Being too vague. "Building a tool" vs. "Building a proposal generator that takes client name, project description, and pricing, and outputs a formatted proposal document."

### Gap: "Test in new session" - what does this actually mean?
For Cursor users, "close session and reopen" might be confusing.

**Address in video:**
- **Terminal:** Show closing the terminal, opening a new one, navigating back to project, starting Claude Code fresh
- **Cursor:** Show how to start a fresh conversation/session while keeping the project open
- The point is: Does the model know your project WITHOUT you explaining it? That's the test.

### Gap: What if the visualization is confusing or wrong?
The model might produce something that doesn't make sense.

**Address in video:**
- "If what Claude produces doesn't match your mental model, SAY SO."
- Show the iteration: "This isn't quite right. The process should actually be [X]. Also, you're missing [Y] as an input."
- Normalize: "You might go 2-3 rounds before the visualization clicks. That's the process working."

### Gap: Cursor vs Terminal - how do you reference files in each?
Written content says "reference files by name" but doesn't show how.

**Address in video:**
- **Terminal:** "Read project-scope.md" - Claude Code reads it directly
- **Cursor:** Show how the model sees files in your workspace, how to point it to specific files
- Demonstrate the same CLAUDE.md creation in both interfaces
