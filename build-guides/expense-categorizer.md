---
difficulty: hard
category: operations
estimated_time: 30
---

# Expense Categorizer

Tax time. You've got a CSV of transactions from your bank. Some are business, some are personal, and you need to categorize them before your accountant yells at you.

No database needed—CSV in, categorized CSV out. If you wanted a full expense tracker, you'd persist to Convex, but this is the 30-minute version.

The audience is freelancers and small business owners who dread the categorization task. It's not complicated, it's just tedious, and tedious things get procrastinated.

Input: a CSV of transactions (date, description, amount). Output: the same CSV with an added category column—office supplies, software, travel, meals, professional services, etc.—based on the description.

The model reads each transaction description and makes a judgment call. "SPOTIFY" is software. "UBER" is probably travel. "STAPLES" is office supplies. It won't be perfect, but it gets you 80% there and you just review the edge cases.

One prompt that understands common business expense categories. Feed it the transactions in batches, have it return the category for each. Simple pattern matching enhanced by the model's understanding of what businesses buy.

Demo: upload a bank CSV, run it, show the categorized output. "An hour of manual work, done in 30 seconds. I just review and fix the weird ones."

Hook: nobody starts a business to do bookkeeping. This makes the boring stuff fast so you can get back to actual work.
