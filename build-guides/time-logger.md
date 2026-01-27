---
difficulty: hard
category: operations
estimated_time: 30
---

# Time Logger

You need to track time—for billing, for understanding where your hours go, for proving to yourself you actually worked. But time tracking tools are either overkill or annoying to use.

This one might actually benefit from a database if you want persistence across sessions. SQLite for local, Convex if you want it synced. But you could also start stateless and just append to a file.

The audience is freelancers and consultants who bill hourly or just want visibility into their time. The problem is friction—if logging time is annoying, you don't do it, and then you either underbill or have no idea where your week went.

Input: CLI commands—start, stop, add a note, list today, report for the week. Output: clean logs with timestamps, durations, notes, and summaries.

The logic is straightforward: track start/stop times, calculate durations, store entries with client/project tags, generate reports. The value is simplicity—no app to open, just type in your terminal.

A few prompts for different commands: start (log timestamp), stop (calculate duration, save entry), report (aggregate and format). Keep it simple.

Demo: `time start "VN outbound engine"` ... work for a bit ... `time stop "finished email templates"` ... `time report week`. Show the clean output. "I know exactly where my time went, and I can invoice accurately."

Hook: you can't improve what you don't measure. This makes time tracking as simple as typing a command.
