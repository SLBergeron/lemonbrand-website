---
difficulty: medium
category: operations
estimated_time: 25
---

# Feedback Processor

You collected feedback—customer interviews, survey responses, support tickets. Now you have a pile of qualitative data and no idea what to do with it. Reading through everything takes hours. Finding patterns is even harder.

No database for the processor itself. Feedback dump in, insights out.

The audience is product people, founders, anyone who collects user feedback but struggles to synthesize it. The problem is that raw feedback is overwhelming—you need themes, patterns, priorities.

Input: a collection of feedback (can be messy—transcripts, survey responses, emails, tickets). Output: synthesized insights—common themes, frequency, sentiment, specific quotes that illustrate each theme.

The model reads through everything and does the synthesis you'd do manually but faster. It groups similar feedback together, identifies what's being said most often, pulls representative quotes, and maybe rates sentiment.

One prompt that understands qualitative analysis. Feed it the raw feedback, have it output themes ranked by frequency with supporting quotes for each.

Demo: paste 10 pieces of customer feedback. Run it. Show the output: "Theme 1: Onboarding confusion (mentioned 6 times) - 'I didn't know where to start...' Theme 2: Pricing questions (4 times)..." "Now I know what to fix first."

Hook: feedback is useless if you don't act on it. This turns noise into signal.
