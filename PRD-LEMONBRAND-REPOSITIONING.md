# LemonBrand.io Repositioning: Strategic PRD

**Document Purpose:** Complete strategic analysis and repositioning plan for LemonBrand.io from service provider to thought leadership platform

**Date:** November 13, 2025
**Status:** Framework Complete, Design Implementation Pending
**Owner:** Simon Bergeron

---

## Executive Summary

LemonBrand.io was positioned as an AI automation service provider targeting home service contractors, competing directly with GetMyWebsite.io (same target audience, different price points). This created brand confusion and prevented both businesses from having clear positioning.

**The Core Problem:** Running a premium consulting business while wanting to build productized scale. These are fundamentally incompatible.

**The Solution:** Complete brand separation:
- **LemonBrand.io** = Personal thought leadership platform for agency owners/entrepreneurs (Person C)
- **GetMyWebsite.io** = Productized service business for trades (Person A)

This document captures the strategic conversation, harsh feedback, critical decisions, and technical framework built to support the new positioning.

---

## Table of Contents

1. [Initial Business State Analysis](#initial-business-state-analysis)
2. [The Strategic Conversation](#the-strategic-conversation)
3. [The Harsh Truth: Positioning Contradictions](#the-harsh-truth-positioning-contradictions)
4. [Brand Architecture Decision](#brand-architecture-decision)
5. [The Three Customer Avatars](#the-three-customer-avatars)
6. [Positioning Strategy](#positioning-strategy)
7. [Technical Implementation Summary](#technical-implementation-summary)
8. [Design Requirements](#design-requirements)
9. [Next Steps](#next-steps)

---

## Initial Business State Analysis

### Current Revenue & Business Model

**Monthly Revenue:** $5-10k/month
**Lead Source:** 100% referrals (no outbound, no inbound marketing)
**Business Model:** Consulting/service delivery (NOT productized)

**Revenue Breakdown:**
- ~50% from one demanding client (AI consulting, change management)
- Hourly rate declining due to scope creep
- Can't take breaks, can't scale, dependent on personal time

**Core Problem Identified:**
> "Half my revenue comes from a single client and that client is very demanding... my hourly rate is just falling and falling because AI is such a beast to handle within organizational change... I need to be selling this for at least 5 to 10x more money. And that's not the business I want to be in because it's limited by myself."

### What You Actually Want

**2-Year Vision:** Productized scale (NOT premium consulting)

**What You're Good At (Validated by Referrals):**
- Strategic thinking
- AI integration
- Design quality
- Speed/execution (48-hour delivery)

**Current Clients Value:**
- All four of the above (you checked everything)
- This is premium consulting positioning, not productized

**The Contradiction:** Making money from high-touch consulting while wanting to build low-touch productized businesses.

---

## The Strategic Conversation

### Question 1: Why Abandon What's Working?

**Your Answer:**
> "It's not working as well as it could. Half my revenue comes from a single client... that's not the business I want to be in because it's limited by myself. I can't take breaks, I can't do anything. I'd have to hire a team etc. That's not the approach I want to be."

**Translation:** You're in a consulting trap. Time-for-money doesn't scale, and you're building businesses (GetMyWebsite.io) to escape it.

### Question 2: The Math Problem

**Your Plan:** GetMyWebsite.io at $249 + $99/month upsell

**The Math:**
- To make $50-100k/month (10x current revenue)
- You need 100-200 productized customers per month (at base price)
- OR nail the $99/month upsell conversion (that's the real business)

**Your Response:**
> "I'm not worried about the 100 customers per month because it's really just a volume game and the number of businesses in the US and Canada that don't have a website or have crap websites are counting in the hundreds of thousands."

**Critical Insight:** The website is a loss leader. The $99/month lead management is where the money is. This is smart if you can automate it.

### Question 3: The Automation Trap

**Your Plan:**
- Supabase → webhooks → Twilio automation
- Template-based delivery
- "Almost nothing to do in terms of delivering the product"

**The Challenge:**
- Have you sold one complete package yet? No, launched a week ago.
- Can you really automate lead management without it becoming high-touch support? Your confidence: Yes.

**Your Response:**
> "The tools are already there. I don't believe I'm going towards a trap simply because I can automate that and I have a very clear vision of how I can automate that."

**Assessment:** This is either brilliant or naive. Only validation will tell. But the vision is clear.

### Question 4: Brand Architecture Problem

**The Core Confusion Identified:**

You said you want:
- **GetMyWebsite.io** = Productized for trades
- **LemonBrand** = Personal brand for thought leadership

But **LemonBrand.io homepage actually said:**
- "AI Automation Systems That Actually Generate Revenue"
- Target: "Home service contractors" (same as GetMyWebsite)
- Offer: "$1,500 + $499/month Express Core Package"
- CTA: "Book Your 72-Hour Deployment"

**The Brutal Truth:**
> "You're running two contractor service businesses - an expensive version ($1,500) and a cheap version ($249). That's not two brands. That's tiered pricing for the same customer."

**Your Response:** You immediately agreed this was the problem. Link them but keep separate.

### Question 5: LemonBrand Purpose

**Your Answer:**
> "I think Lemon Brand is going to always talk to person C [agency owners/entrepreneurs]. They are the people I mesh with the most, they are the people I help with the most, and they're people who are already willing to give me money."

**Separate Content Strategy:**
- GetMyWebsite.io will have its own content (can be automated - blog posts, videos, etc.)
- LemonBrand.io will be personal thought leadership (harder to automate, more authentic)

**The Clarity Moment:**
> "I think we need to separate the two and that's the issue right now."

---

## The Harsh Truth: Positioning Contradictions

### What You Told Me vs. What LemonBrand.io Actually Said

| What You Said | What Site Said | The Problem |
|---------------|----------------|-------------|
| "LemonBrand is my personal brand for agency owners" | "AI automation systems for home service contractors" | Targeting wrong audience |
| "I want thought leadership and teaching" | "Book Your 72-Hour Deployment" | Selling services, not teaching |
| "GetMyWebsite is the productized business" | GetMyWebsite = $249, LemonBrand = $1,500 for same customer | Not separate brands, just different prices |
| "I'm a serial entrepreneur building AI businesses" | "Express Core: 3 automations that book jobs" | Service provider, not entrepreneur |

### The Irony

**Current State:**
- **LemonBrand:** Premium contractor services ($1,500 + $499/mo)
- **GetMyWebsite:** Budget contractor services ($249 + $99/mo)
- **Both:** Selling to plumbers and electricians

**What It Should Be:**
- **LemonBrand:** Teaching agency owners how to build what you're building
- **GetMyWebsite:** Productized service for trades (separate, sellable business)
- **Target:** Two completely different audiences

---

## Brand Architecture Decision

### The Two-Brand Strategy

#### **LemonBrand.io**
**Identity:** Personal brand, thought leadership platform
**Audience:** Agency owners, entrepreneurs, AI builders (Person C)
**Monetization:**
- Templates/resources (lead magnets)
- Premium consulting ($5k+ projects, kept subtle)
- Potential courses/coaching
- Maybe SaaS products later

**Content Focus:**
- How you built GetMyWebsite.io
- Agent development process
- Business strategy decisions
- Revenue experiments & results
- Templates and frameworks

**Positioning:** "Building AI Agent Businesses in Public"

#### **GetMyWebsite.io**
**Identity:** Product brand, productized service business
**Audience:** Trades, local businesses, small business owners (Person A)
**Monetization:**
- $249 base websites
- $99/month lead management upsell
- Potential premium tier later ($1,500+ if demand exists)

**Content Focus:**
- Contractor success stories
- Lead gen tactics
- Local SEO
- ROI case studies

**Positioning:** "Get Your Business Online Fast"

### Why This Works

1. **Clear Separation:** No audience confusion
2. **Different Value Props:** Teaching vs. Doing
3. **Separate Brands Can Scale:** GetMyWebsite can be sold as a business
4. **LemonBrand Builds Authority:** Increases consulting rate and creates other opportunities
5. **Content Flywheel:** Building GetMyWebsite gives you content for LemonBrand

---

## The Three Customer Avatars

### Person A: Tony the Plumber (GetMyWebsite.io)
- 50 years old, runs 5-person plumbing company
- Wants more customers, doesn't care about AI philosophy
- Needs: "How to get found on Google and convert calls to jobs"
- Will pay for: Done-for-you website + lead management
- Won't watch: 10-minute video about AI agents and web infrastructure

### Person B: Sarah the Solopreneur (Not Your Focus)
- 32 years old, runs coaching business
- Curious about AI, wants to automate marketing
- Needs: "How to use AI to create content and manage clients"
- Will pay for: Courses, coaching, maybe templates
- Will watch: AI tutorials, automation breakdowns, tool reviews

### Person C: Mike the Agency Owner (LemonBrand.io)
- 40 years old, runs small marketing agency
- Wants to add AI services to offering
- Needs: "How to sell and deliver AI solutions to clients"
- Will pay for: Consulting, implementation help, white-label products
- Will watch: Business strategy, case studies, implementation deep-dives

**Your Choice:** Person C for LemonBrand, Person A for GetMyWebsite

---

## Positioning Strategy

### LemonBrand.io: New Positioning

**Headline:** "Building AI Agent Businesses in Public"

**Subheadline:** "I build modular AI systems that generate revenue, and teach you how to do the same"

**Value Proposition:**
- Serial entrepreneur sharing everything he learns
- Templates and resources for building AI businesses
- Behind-the-scenes of GetMyWebsite.io and other projects
- Practical, actionable content (not theory)

**Primary CTA:** Download Free Templates (email capture)

**Secondary CTA:** See What I'm Building (projects page)

**Tertiary CTA:** Work with Me (consulting, subtle)

### The Content Strategy

**What Makes Content Valuable:**
1. Practical, immediately applicable
2. Shows actual code/systems/architecture
3. Transparent about wins AND failures
4. Leads to template downloads
5. Positions you as expert who ships

**Content Topics That Work:**
- "How I Built a $249 Website Business in One Week"
- "The AI Agent Architecture I Use for Every Project"
- "Why I Stopped Consulting and Built Products Instead"
- "48-Hour Website Deployment: The Complete System"
- "Building GetMyWebsite.io: Week-by-Week Breakdown"

**What to Avoid:**
- AI infrastructure philosophy without application
- Features over outcomes
- Talking about what you'll build vs. what you've built

### The Template Strategy (Lead Magnets)

**Required Templates (Minimum 2-3 at launch):**

1. **48-Hour Website Launch System**
   - Your exact process for GetMyWebsite.io
   - Checklist, framework, tech decisions
   - PDF or Notion template

2. **React Component Library for Service Businesses**
   - Your reusable components
   - GitHub repo access
   - Documentation included

3. **Lead Gen Tech Stack Blueprint** (optional for later)
   - Supabase + Twilio + webhook architecture
   - Diagram and implementation guide

**Each Template:**
- Solves specific problem
- Immediately usable
- Demonstrates your expertise
- Requires email to download
- Feeds into newsletter sequence

### The Consulting Strategy (Subtle, Premium)

**Positioning:** "Limited Consulting Availability"

**Target:** NOT contractors. Agency owners and entrepreneurs only.

**Pricing:** $5k minimum, $15-30k for complex builds, $2.5k/mo retainers

**Approach:**
- Exclusive, not desperate
- Application/qualifier, not just "book a call"
- Separate page (/work-with-me), not homepage hero
- Clear warning: "This is NOT for contractors → go to GetMyWebsite"

---

## Technical Implementation Summary

### What Was Built (Initial Framework)

This is the technical foundation. You'll redesign pages to match your aesthetic, but the structure is solid.

#### **1. Homepage Transformation**

**Changed:**
- Hero: "Capture Every After-Hours Call" → "Building AI Agent Businesses in Public"
- CTAs: "Calculate ROI" / "Book 72-Hour Deployment" → "Download Free Templates" / "See What I'm Building"
- Removed: Pricing component, contractor case studies, testimonials
- Updated: Features section now shows "Current Projects" (GetMyWebsite, CodeBrain, Agent Modules)

**Files Modified:**
- `/components/hero.tsx` - New messaging and CTAs
- `/components/features.tsx` - Rewritten as project showcase
- `/app/page.tsx` - Removed Pricing, CaseStudy, Testimonials components
- `/app/page.tsx` - Updated structured data (Person schema, not ProfessionalService)

#### **2. New Pages Created**

**`/templates` Page** (`/app/templates/page.tsx`)
- Template library layout
- Newsletter signup section (ready for Kit.com)
- 5 template placeholders (2 marked available, 3 coming soon)
- Email gating infrastructure
- CTAs to projects and about

**`/projects` Page** (`/app/projects/page.tsx`)
- Build-in-public portfolio
- Three projects: GetMyWebsite.io, CodeBrain, Agent Modules
- Each includes: status, tech stack, highlights, lessons learned
- Newsletter CTA at bottom
- Links to external sites where applicable

**`/work-with-me` Page** (`/app/work-with-me/page.tsx`)
- Premium consulting positioning
- Warning callout: "NOT for contractors"
- Clear qualifications (agency owners, entrepreneurs)
- 4-phase process (Discovery → Strategy → Build → Support)
- Pricing ranges ($5k-$30k)
- CTA to book call (placeholder for Cal.com)

#### **3. Navigation Updated**

**Old Navigation:**
- ROI (calculator)
- Process (pricing)
- Websites (GetMyWebsite link)
- Bio
- FAQs

**New Navigation:**
- Templates
- Projects
- About
- Work with Me

**Files Modified:**
- `/components/navbar.tsx` - Updated nav items and CTAs

#### **4. Footer Updated**

**Changes:**
- Added "Projects" section (GetMyWebsite, CodeBrain, Agent Modules)
- Updated "Pages" to match new navigation
- Changed "Resources" from contractor-focused to thought leadership
- Clear brand separation (GetMyWebsite as one project among many)

**Files Modified:**
- `/components/footer.tsx` - New structure and links

#### **5. Removed/Deprecated Components**

These components still exist but are no longer used on homepage:
- `<Pricing />` - Express Core Package ($1,500 + $499/mo)
- `<CaseStudy />` - Contractor testimonials
- `<TestimonialsMasonryGrid />` - Service delivery social proof

**Action Item:** These can be deleted or archived. They're not needed for thought leadership positioning.

---

## Design Requirements

### Brand Identity

**LemonBrand.io Should Feel:**
- Authentic and transparent (build-in-public aesthetic)
- Professional but approachable (not corporate)
- Technical without being intimidating
- Energetic and forward-moving (not academic)
- Clean and modern (designer-quality)

**Visual Direction:**
- Behind-the-scenes, work-in-progress vibe
- Code snippets and system diagrams
- Progress screenshots and metrics
- Split-screen human/AI collaboration
- Proof over promises (screenshots, numbers, receipts)

### Design Principles

**1. Outcomes Over Features**
Never lead with technology. Always lead with results.

❌ "I'll build you a Make.com workflow with 47 modules"
✅ "I'll cut your response time from 2 days to 2 minutes"

❌ "Advanced AI integration using Claude API"
✅ "Save 15 hours a week on admin tasks"

**2. Show, Don't Just Tell**
Every claim needs proof:
- Revenue numbers → screenshots
- "Built in 48 hours" → timestamped git commits
- "Modular AI agents" → architecture diagram
- "10x productivity" → before/after metrics

**3. Fifth-Grade English**
- Clear and direct language
- No corporate fluff or jargon
- Active voice always
- Short paragraphs (2-3 sentences max)
- One idea per sentence

**4. Build-in-Public Aesthetic**
- Progress over perfection
- Honest about failures and learnings
- Version history visible ("Updated Nov 13, 2025")
- Iterate publicly

### Page-Specific Design Guidance

#### **Homepage**
**Purpose:** Immediate clarity on who you are and what you do

**Key Elements:**
- Hero: Your face/workspace, human connection
- Projects: Visual previews (screenshots, not just text)
- Social proof: Metrics, not testimonials
- Newsletter signup: Above the fold

**Avoid:**
- Generic stock photos
- Abstract "AI" imagery
- Too much text before first CTA
- Hiding the "Work with Me" link

#### **/templates**
**Purpose:** Lead magnet hub, email capture

**Key Elements:**
- Clear value prop for each template
- Preview/thumbnail of what they get
- Email form prominent (Kit.com)
- "Available now" vs "Coming soon" clarity

**Avoid:**
- Requiring email before showing what templates exist
- Too many placeholders (better to launch with 2 real templates)
- Generic "sign up for updates"

#### **/projects**
**Purpose:** Build-in-public portfolio, proof you ship

**Key Elements:**
- Status indicators (Live, In Development, Building)
- Tech stack visible
- Lessons learned (transparency)
- Links to actual products

**Avoid:**
- Too much future-focused language
- No proof of progress
- Just descriptions without artifacts

#### **/work-with-me**
**Purpose:** Premium consulting (exclusive, not desperate)

**Key Elements:**
- Warning: "Not for contractors"
- Clear qualifications
- Process transparency
- Pricing ranges (not exact prices)
- Application/qualifier feel

**Avoid:**
- Desperate "book now" energy
- Generic "we'd love to work with you"
- No pricing guidance
- Making it too easy to book

### Typography & Voice

**Voice Characteristics:**
- Confident but not arrogant
- Transparent about challenges
- Educational without being preachy
- Excited about building
- Practical over philosophical

**Writing Examples:**

❌ "Leveraging cutting-edge AI technologies to synergize cross-functional automation paradigms"
✅ "I build AI tools that actually make money"

❌ "Our comprehensive suite of solutions delivers transformative outcomes"
✅ "Here's what I built, here's what it does, here's what I learned"

❌ "Reach out to explore how we can collaborate on your next innovation initiative"
✅ "If you're building AI systems and want help, let's talk"

---

## Next Steps

### Immediate Actions (You)

**1. Kit.com Integration** (~30 minutes)
- Create email opt-in form in Kit.com
- Embed on `/templates` page (replace placeholder at line 52)
- Add to newsletter sections across site
- Set up 5-email welcome sequence:
  1. Template delivery + how to use
  2. "How I Built GetMyWebsite.io" case study
  3. "What I'm Building This Month"
  4. Value-driven content
  5. Soft consulting intro

**2. Create 1-2 Initial Templates** (~2-3 hours)
Options:
- Package React components from GetMyWebsite
- Create "48-Hour Website Launch Checklist" PDF
- Document your tech stack as blueprint
- Write "How I Built GetMyWebsite" guide

**3. Design Pass on All Pages**
You'll manually redesign each page. Use this PRD as the strategic guide:
- Keep the structure (it's sound)
- Apply your design aesthetic
- Ensure visual consistency
- Add your personality

**4. Content Seeding** (~2-3 hours)
Write 1-2 initial blog posts:
- "Why I'm Building AI Businesses in Public"
- "How I Built GetMyWebsite.io in One Week"

These establish voice and give people something to read.

### Phase 2 (After Launch)

**1. Regular Content Cadence**
- Blog: 1-2 posts/week (build-in-public updates)
- Newsletter: Weekly (what you're building, insights, resources)
- Social: Promote blog posts, behind-the-scenes
- Templates: Add 1 new template/month

**2. GetMyWebsite.io Content Strategy**
- Separate content pipeline (can be automated)
- Contractor case studies
- Local SEO tips
- Lead generation tactics

**3. Iterate Based on Response**
- Track which templates get most downloads
- Monitor which content drives consultations
- Double down on what works

### Optional Cleanup

**Pages to Update or Remove:**
- `/calculator` - ROI calculator isn't needed for thought leadership
- Update About section with serial entrepreneur story
- Rewrite FAQs for thought leadership audience (not service buyers)

---

## Success Metrics

### Week 1
- Site launched with new positioning
- At least 1 downloadable template available
- Email capture working (Kit.com integrated)

### Month 1
- Email list: 50+ subscribers
- Template downloads: 25+
- Blog posts published: 4-6
- Consulting inquiries: 2-3 (quality over quantity)

### Quarter 1
- Email list: 200+ subscribers
- Newsletter open rate: >40%
- Premium consulting: 1-2 clients at $5k+
- GetMyWebsite.io: 10+ customers (validation)

---

## Appendix: The Strategic Questions That Led Here

### Question: "What are you actually charging for GetMyWebsite.io?"
**Answer:** $249 base + $99/month upsell

**Implication:** The real business is the monthly upsell, not the website. Website is loss leader.

### Question: "Have you actually sold a template website to a tradesperson yet?"
**Answer:** No, launched a week ago

**Implication:** You're building based on vision, not validation. This is okay if you iterate fast.

### Question: "Aren't you trading one consulting trap for another?"
**Answer:** No, because I can automate lead management

**Implication:** This is the make-or-break assumption. If this fails, GetMyWebsite becomes high-touch.

### Question: "Why do you feel the need to link the brands?"
**Answer:** Lead flow and credit for building GetMyWebsite

**Implication:** Ego vs. strategy. Best move is separate brands, with LemonBrand showcasing GetMyWebsite as case study (not vice versa).

### Question: "When you say '10x more,' what do you mean?"
**Answer:** More revenue, eventually sellable businesses

**Implication:** You're building assets, not just income streams. This is the right approach.

---

## Final Notes

**This repositioning is about clarity, not just marketing.**

You were running two businesses that competed for the same customer while telling yourself they were different. Now you have:

1. **A productized business you can scale and sell** (GetMyWebsite.io)
2. **A personal brand that builds your authority and creates opportunities** (LemonBrand.io)

The harsh feedback was necessary. The contradictions were real. The solution is clean.

Now you execute.

Build the templates. Design the pages. Ship the content. Validate GetMyWebsite.io. Document everything for LemonBrand.io.

You have 12-14 hours of focused work to make this real. The framework is done. The strategy is clear. The rest is execution.

**Go build.**

---

**Document Version:** 1.0
**Last Updated:** November 13, 2025
**Next Review:** After design pass complete
