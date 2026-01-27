---
difficulty: easy
category: operations
estimated_time: 20
---

# Daily Standup Generator

You're a solo founder or small team. You want the accountability of a standup but there's no one to stand up to. So you either skip it or it becomes a chore.

Could use a database to track over time and spot patterns. SQLite for local, Convex if you want to build a real accountability tool. Start simple.

The audience is solo founders, remote workers, anyone who needs structure but works alone. The problem is that without external accountability, it's easy to drift through days without clear priorities.

Input: what you did yesterday, what you're doing today, any blockers. Output: a formatted standup entry, optionally with reflection on patterns if you have history.

The basic version is just formatting and maybe a prompt to be more specific. The interesting version tracks your standups over time and surfaces insights: "You've mentioned this blocker three days in a row" or "You completed 80% of what you planned this week."

Start with one prompt that takes your rough input and formats it cleanly. Maybe asks follow-up questions: "You mentioned finishing the proposal—what's the next action?"

Demo: type your rough standup. Run it. Show the formatted output with a follow-up insight. "This keeps me honest with myself even when no one's watching."

Hook: structure creates progress. This is your daily accountability partner.
