# St-Albert 10 Routes - Content for Web Page

**THIS IS THE FINAL CONTENT TO USE FOR THE PASSWORD-PROTECTED PAGE**

Use this content to populate the priorities page at `/app/st-albert-q4-2025/page.tsx`

---

## EXECUTIVE SUMMARY DATA

```typescript
const executiveSummary = {
  totalPriorities: 10,
  focusPeriod: "Q4 2025 - Q1 2026",
  totalInitiatives: "10 tactical improvements",
  investment: "$37K-64K over 5 months",
  expectedROI: "$133K-181K annual value",
  returnMultiple: "3.6x-4.9x return",
  philosophy: "Give direction → Simon executes → Team maintains"
};
```

---

## THE 10 PRIORITIES

### FIRST WAVE: November - December 2025

#### ROUTE 1: Christmas Basket Campaign Tracking & Optimization

```typescript
{
  number: 1,
  wave: "First Wave",
  category: "Revenue Growth",
  title: "Christmas Basket Campaign Tracking & Optimization",
  problem: "Last year's Paniers de Noël generated $4,000 but started too late and had no tracking.",
  description: "Launch campaign 3-4 weeks earlier than last year with full conversion tracking and checkout optimization. Target: $8-10K in sales (2x last year).",
  solution: [
    "Launch campaign 3-4 weeks earlier than last year",
    "Implement conversion tracking (which baskets sell, where traffic comes from)",
    "Optimize checkout process to reduce cart abandonment",
    "Daily sales dashboard to monitor performance",
    "Target: $8-10K in sales (2x last year)"
  ],
  outcome: "2x last year's revenue through earlier launch and conversion optimization",
  internalTeam: "Simon implements tracking & campaign setup → Marketing launches early promotion → Sales monitors daily dashboard",
  roi: "$4-6K additional revenue this Christmas, repeatable annually",
  timeline: "2 weeks setup, runs through season",
  exitStrategy: "Dashboard stays live for future campaigns, marketing replicates annually",
  urgent: false
}
```

#### ROUTE 2: Excel Automation - The Big Three Spreadsheets 🔥

```typescript
{
  number: 2,
  wave: "First Wave",
  category: "Operational Efficiency",
  title: "Excel Automation - The Big Three Spreadsheets",
  problem: "Karin is going on medical leave for a month starting soon. The 3 most critical weekly spreadsheets require manual data entry that takes 5-10 hours/week.",
  description: "Automate the 3 most painful/critical weekly spreadsheets so anyone can run them during Karin's medical leave. Build simple 'Update' buttons that pull data automatically.",
  solution: [
    "Identify the 3 most painful/critical weekly spreadsheets",
    "Build automation to pull data from source files automatically",
    "Create simple 'Update Production Data' / 'Refresh Sales' buttons",
    "Document everything so anyone can run it during Karin's leave",
    "95% reduction in manual entry and errors"
  ],
  outcome: "5-10 hours/week saved, error-free data updates, continuity during Karin's medical leave",
  internalTeam: "Simon builds automation → Admin team runs 'Update' button weekly → Karin reviews when she returns",
  roi: "$12K-18K/year in time savings (10 hrs/week × $25/hr average)",
  timeline: "3-4 weeks (MUST start immediately)",
  exitStrategy: "Fully documented, one-page troubleshooting guide, simple enough for any admin",
  urgent: true,
  urgentReason: "Karin's surgery is scheduled soon. Without automation, critical weekly reports will be delayed or done incorrectly."
}
```

#### ROUTE 3: Google My Business & Local SEO

```typescript
{
  number: 3,
  wave: "First Wave",
  category: "Marketing & Visibility",
  title: "Google My Business & Local SEO",
  problem: "Invisible in local search. No Google reviews. Missing wholesale inquiries and restaurant walk-ins from 'cheese near me' searches.",
  description: "Show up when people search for local cheese. Build review presence and automated review collection system.",
  solution: [
    "Claim and optimize Google My Business for all locations",
    "Automated review request system (post-purchase emails)",
    "Local SEO optimization (NAP consistency, local citations)",
    "Monthly photo posts (products, behind-the-scenes)",
    "Track: search impressions, direction requests, website clicks"
  ],
  outcome: "Appear in local searches, 20-50 Google reviews in 4 months, increased visibility",
  internalTeam: "Simon sets up systems → Restaurant manager requests reviews → Marketing posts monthly photos",
  roi: "10-15% increase in restaurant traffic, 3-5 wholesale inquiries/month from search",
  timeline: "2 weeks setup, 30 min/month ongoing",
  exitStrategy: "Automated review requests, simple monthly photo posting task for marketing",
  urgent: false
}
```

#### ROUTE 4: HR Application Response Automation

```typescript
{
  number: 4,
  wave: "First Wave",
  category: "HR & Workforce",
  title: "HR Application Response Automation",
  problem: "Open positions sit unfilled for months. Applications go unanswered for days/weeks. Good candidates lose interest and accept other offers.",
  description: "Automate acknowledgment emails and create simple applicant tracking to fill positions 50% faster with professional candidate experience.",
  solution: [
    "Automated acknowledgment emails within 1 hour of application",
    "Simple applicant tracking spreadsheet (or low-cost ATS)",
    "Email templates for each stage: received → screening → interview → decision",
    "Weekly digest to hiring managers: '5 new applications this week - action needed'",
    "Track: time-to-first-response, time-to-hire, drop-off rates"
  ],
  outcome: "Fill open positions 50% faster, professional candidate experience, stop losing good applicants to delays",
  internalTeam: "Simon builds automation → HR sends emails from templates → Hiring managers get weekly digest",
  roi: "$15K-30K/year in reduced time-to-hire costs and better candidate quality",
  timeline: "3 weeks to build and test",
  exitStrategy: "Templates and automation run automatically, HR just follows the process",
  urgent: false,
  secondaryBenefit: "Professional candidate experience improves employer brand and word-of-mouth referrals"
}
```

#### ROUTE 5: Customer Loyalty Program Foundation

```typescript
{
  number: 5,
  wave: "First Wave",
  category: "Customer Retention",
  title: "Customer Loyalty Program Foundation",
  problem: "No customer retention strategy. One-time buyers. No customer database to market to.",
  description: "Start building repeat customers with a simple points-and-rewards system beginning with restaurant customers.",
  solution: [
    "Start with restaurant customers (capture emails at checkout)",
    "Simple points-based system (can start with spreadsheet + email automation)",
    "Monthly email with special offers, new products, seasonal items",
    "Track: repeat purchase rate, average order value, redemption rate",
    "Target: 300+ customer emails in 4 months"
  ],
  outcome: "15-20% increase in repeat restaurant visits, build 300+ customer email list",
  internalTeam: "Simon sets up system → Restaurant captures emails → Marketing assistant sends monthly offers",
  roi: "$15K-25K additional annual revenue from repeat customers (conservative 15% lift)",
  timeline: "4 weeks to build, minimal ongoing maintenance",
  exitStrategy: "Marketing assistant manages monthly emails from templates, simple playbook to follow",
  urgent: false
}
```

---

### SECOND WAVE: January - March 2026

#### ROUTE 6: Restaurant POS Proof of Concept

```typescript
{
  number: 6,
  wave: "Second Wave",
  category: "Technology",
  title: "Restaurant POS Proof of Concept",
  problem: "Restaurant still uses paper orders. Manual process, errors, no real-time data. Full POS replacement is complex due to Business Central integration and thousands of SKUs.",
  description: "Modern tablet POS for restaurant front-of-house ONLY as proof of concept before committing to full system integration.",
  solution: [
    "Modern tablet POS for restaurant front-of-house ONLY",
    "Does NOT integrate with Business Central initially (manual reconciliation daily)",
    "Proves the concept: tablets work, staff can adapt, data is valuable",
    "Evaluate integration requirements for Phase 2 (post-March)",
    "Test with ONE register before expanding"
  ],
  outcome: "Zero order errors, real-time sales visibility, proof that modern POS works before committing to full rollout",
  internalTeam: "Simon implements POC → Restaurant manager operates daily → Vendor provides support",
  roi: "5 hours/week saved in order corrections, plus customer data capture for loyalty program",
  timeline: "4 weeks (vendor selection, setup, training)",
  exitStrategy: "Restaurant manager fully trained, vendor handles support, integration roadmap documented for Phase 2",
  urgent: false,
  note: "POC Approach: Business Central + custom solutions + SKU complexity means full integration is 6-12 months. POC proves value before making that investment."
}
```

#### ROUTE 7: File Organization & Cloud Backup System

```typescript
{
  number: 7,
  wave: "Second Wave",
  category: "Risk Management",
  title: "File Organization & Cloud Backup System",
  problem: "Excel files everywhere. OneDrive half-implemented. Local files, network files, chaos. 'Which version is current?' is a daily question. ONE computer crash could lose months of work.",
  description: "Organize the Excel chaos and ensure 100% file recovery protection with automated cloud backup.",
  solution: [
    "ONE clear folder structure (by department, then by date)",
    "Automated nightly backup to OneDrive Business",
    "'Current' folder always has latest, 'Archive' folder has history",
    "Version control and audit trail",
    "Document the structure (one-page map everyone follows)"
  ],
  outcome: "100% file recovery if computer dies, 5 hours/week saved hunting for files, audit trail for compliance",
  internalTeam: "Simon organizes structure → Admin team follows folder map → Automatic nightly backups",
  roi: "Risk mitigation worth $50K+ if critical data lost, plus 5 hrs/week time savings",
  timeline: "2 weeks to organize and implement",
  exitStrategy: "Runs automatically, one-page folder structure guide, admin maintains going forward",
  urgent: false,
  criticalNote: "You're one hard drive failure away from losing production schedules, pricing data, customer lists, financial records. This is insurance."
}
```

#### ROUTE 8: Automated Daily Dashboard Email

```typescript
{
  number: 8,
  wave: "Second Wave",
  category: "Data & Reporting",
  title: "Automated Daily Dashboard Email",
  problem: "No one knows daily numbers until Friday. Decisions made on week-old data. Leaders spend 15 minutes every morning hunting for yesterday's numbers.",
  description: "Get yesterday's key numbers in your inbox at 6:00 AM every day without manual work. No dashboard to log into - just an email with sales, production, inventory alerts, and action items.",
  solution: [
    "Automated email every morning at 6:00 AM with:",
    "• Yesterday's sales (total, restaurant, wholesale)",
    "• Production output vs target",
    "• Inventory alerts (low stock warnings)",
    "• Top-selling products",
    "• Action items for the day"
  ],
  exampleOutput: `📊 St-Albert Daily Snapshot - [Date]

YESTERDAY'S PERFORMANCE:
• Total Sales: $12,450 (↑ 8% vs last Tuesday)
• Restaurant Revenue: $3,200 (47 transactions)
• Wholesale Orders: 5 orders, $9,250 total
• Production Output: 2,400 kg (target: 2,500 kg - 96%)

INVENTORY ALERTS:
⚠️ Cheddar aging stock low - restock by Friday
✅ All other inventory levels normal

TOP SELLERS:
1. Squeaky cheese curds - 145 units
2. Aged cheddar wheel - 23 units
3. Brie wheel - 18 units

🎯 ACTION NEEDED:
• Production: Schedule extra cheddar batch this week
• Marketing: Brie is trending - feature in next email`,
  outcome: "Same-day problem catching, 15 min/day saved per leader, eliminate Friday data scramble",
  internalTeam: "Simon builds automation → Runs automatically daily → Leadership receives email (no action required)",
  roi: "$6K-10K/year in leadership time savings (15 min/day × 3 people × $40/hr)",
  timeline: "3 weeks to build and test",
  exitStrategy: "Fully automated script with documentation, IT contact can troubleshoot if needed",
  urgent: false,
  note: "No Dashboard to Log Into: Just an email. No passwords, no clicking around, just open email and know your numbers."
}
```

#### ROUTE 9: Performance Review System

```typescript
{
  number: 9,
  wave: "Second Wave",
  category: "HR & Workforce",
  title: "Performance Review System",
  problem: "Performance reviews are inconsistent, done on paper or Word docs, no tracking of employee development over time. HR has no centralized view of team performance.",
  description: "Implement simple digital performance review template with standardized criteria and automated reminders.",
  solution: [
    "Simple digital performance review template (Excel or Google Forms)",
    "Standardized evaluation criteria across departments",
    "Automated reminder emails to managers when reviews are due",
    "Historical tracking: compare this year vs last year for each employee",
    "Dashboard for HR: which reviews are overdue, trends across teams"
  ],
  outcome: "Consistent review process, historical employee performance tracking, reduce HR admin time by 50%",
  internalTeam: "Simon builds template and automation → Managers complete reviews digitally → HR monitors completion dashboard",
  roi: "$5K-8K/year in HR time savings, plus better employee development and retention",
  timeline: "3 weeks to build system and train managers",
  exitStrategy: "Template is standardized, reminders are automated, HR just monitors and follows up",
  urgent: false,
  secondaryBenefit: "Better documentation for promotions, raises, and (if necessary) terminations. Reduces legal risk."
}
```

#### ROUTE 10: Website Content Calendar + Research Self-Sufficiency Training

```typescript
{
  number: 10,
  wave: "Second Wave",
  category: "Marketing & Training",
  title: "Website Content Calendar + Research Self-Sufficiency Training",
  problem: "Website stalled 19 months because no one knows what content to create or how to prioritize. Team doesn't know how to research competitors, keywords, or trends independently.",
  description: "6-month SEO-focused content calendar PLUS training the team to research and make content decisions independently going forward.",
  solution: [
    "Part A: 6-Month Content Calendar",
    "• SEO-focused content plan (product spotlights, recipes, seasonal content)",
    "• Simple template for each content type",
    "• Monthly analytics review: what's working, what to double down on",
    "• Target: 30% increase in website traffic in 6 months",
    "",
    "Part B: Research Training (3 Sessions)",
    "1. Competitor Research: How to analyze competitor websites, find what's working",
    "2. Keyword Research: How to use free tools (Google Trends, Ubersuggest)",
    "3. Analytics Interpretation: How to read Google Analytics and make decisions"
  ],
  outcome: "Website unstalled with clear execution plan, team can research and make content decisions independently going forward",
  internalTeam: "Simon creates calendar + trains marketing team → Marketing executes monthly content → Team can continue research post-March",
  roi: "30% web traffic increase = 10-15 additional inquiries/month = $20K-40K annual revenue opportunity",
  timeline: "2 weeks for calendar + 3 training sessions (1 hour each)",
  exitStrategy: "Calendar is complete, team trained to research and plan future content independently",
  urgent: false,
  whyTrainingMatters: "Instead of waiting for Simon's guidance, the team can research competitors, find trending topics, and make content decisions on their own. This is how you remain independent post-March."
}
```

---

## EXECUTION PHILOSOPHY

```typescript
const executionPhilosophy = {
  approach: "Direction → Execution",
  howItWorks: [
    "You give direction: 'We need to automate HR responses' or 'Fix the daily dashboard'",
    "Simon executes: Research, build, test, document",
    "You review the result: 'Yes, that works' or 'Adjust this part'",
    "Team maintains: Follow the documented process going forward"
  ],
  whatThisAvoids: [
    "Constant check-ins and micro-updates",
    "Committee decisions on implementation details",
    "Slowing down progress with process management",
    "Simon becoming a bottleneck waiting for approvals"
  ],
  whatYouGet: [
    "Measurable results delivered on timeline",
    "Documented systems you can maintain",
    "Freedom to focus on your actual jobs (not managing Simon)",
    "Clean handoff in March with no dependencies"
  ]
};
```

---

## ROI SUMMARY TABLE

| Category | Investment | Annual ROI | Return Multiple |
|----------|-----------|-----------|-----------------|
| Time Savings (Excel, Dashboard, HR) | $15K-25K | $33K-46K/year | 2.2x-3.1x |
| Revenue Growth (Christmas, Loyalty, Website) | $10K-20K | $40K-70K/year | 4x-7x |
| Risk Mitigation (File Backup) | $4K-7K | $50K+ (if disaster avoided) | 7x-12x+ |
| Operational Efficiency (POS POC, Reviews) | $8K-12K | $10K-15K/year | 1.25x-1.9x |
| **TOTAL** | **$37K-64K** | **$133K-181K/year** | **3.6x-4.9x** |

**Conservative 3-Year Value:** $399K-$543K from a $37K-64K investment.

---

## NEXT STEPS CONTENT

```typescript
const nextSteps = [
  {
    number: 1,
    title: "Review All 10 Routes",
    description: "Take time to review each priority in detail before our meeting. Flag any concerns or adjustments needed."
  },
  {
    number: 2,
    title: "Prioritize First Wave",
    description: "Which routes 1-5 are most urgent? Route 2 (Excel Automation) needs immediate attention due to Karin's medical leave."
  },
  {
    number: 3,
    title: "Approve Execution Approach",
    description: "Confirm 'direction → execution → maintenance' model works for you. Give direction, Simon executes, team maintains."
  },
  {
    number: 4,
    title: "Meeting Discussion",
    description: "We'll discuss priorities, timeline, and get started on First Wave immediately."
  }
];
```

---

**USE THIS CONTENT TO POPULATE THE PASSWORD-PROTECTED WEB PAGE**
