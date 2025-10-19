"use client";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ColourfulText } from "@/components/ui/colourful-text";

export function BlogContentCentered() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-8 py-20">
      <div className="grid lg:grid-cols-[350px_1fr] gap-12 items-start">
        {/* Left Sidebar - Sticky */}
        <div className="lg:sticky lg:top-20">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            className="h-48 w-full rounded-2xl object-cover lg:h-64"
            height={400}
            width={350}
          />
          <div className="mt-6">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              <ColourfulText text={blog.title} />
            </h2>
            <div className="flex items-center">
              <Image
                src={blog.authorImage}
                alt={blog.author}
                className="h-8 w-8 rounded-full"
                height={32}
                width={32}
              />
              <div className="ml-3">
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {blog.author}
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  {format(new Date(blog.date), "LLLL d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Scrollable */}
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-neutral-700 dark:prose-p:text-neutral-300">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const day2Content = `
## Day Overview

Today was all about execution. Completed Maker School Day 2 tasks, posted multiple content pieces across platforms, and pushed the website to 60% completion.

**Primary Objective:** Complete Maker School Day 2 tasks (niche selection, case studies, Upwork profile)
**Energy Level:** High
**Status:** ✅ Complete

---

## Maker School Progress

### Task 1: Niche Selection ✅

**Selected 3 Positioning Statements:**
1. Marketing agencies → operations systems
2. Financial consultants → business development
3. Marketing agencies → content production

**Strategic Decision:** Doubling down on marketing agencies (2 angles) + financial consultants. Sets up CodeBrain pivot long-term since agencies will be early adopters of AI partnership tools.

### Task 2: Build Case Studies ✅

**Case Study 1: $1.7M Revenue Enablement**
- Built automated proposal system for financial consultant
- Typeform → auto-proposal → follow-ups
- Result: 3-5 days → 10 minutes, 34% close rate increase, $0.92M enabled in 12 months

**Case Study 2: 3.1M Views in 6 Months**
- AI content system for client (short-form, daily posting)
- AI voiceovers, editing, publishing, community management
- Result: 0 → 17K followers, 3.1M views in 6 months

**Case Study 3: 94 Integrations - Business Central ERP**
- Connected 8 disconnected systems for manufacturing company
- Business Central, Salesforce, financial, HR, inventory, procurement
- Result: 40+ hours/week saved, 40% faster order processing

### Task 3: Upwork Profile ✅

**Profile Complete:**
- Title: "Automation & AI Agent Builder | ChatGPT, Claude, API, Make.com"
- Rate: $78.29/hr (specific decimal for standout effect)
- Opening: "Hi, I'm Simon 👋 I build revenue-generating AI systems. $1.7M enabled through automation."
- 15 skills added (AI Automation, Make.com, n8n, ChatGPT, API Integration, etc.)
- All 3 case studies detailed below the fold
- Communication positioning: "No jargon, no BS - just clear communication and systems that drive revenue."

---

## Content Created

### Video Content Posted

**Video 1: "Be The Deal Guy" (Day 2 Main Video)**
- Format: Screen recording hook → talking with cuts
- Hook: Working in automation tool with text "This is what I build" → "But here's what I actually sell..."
- Key Message: People buy outcomes, not process. Don't sell Make.com workflows, sell "cut response time from 2 days to 2 minutes"
- Platforms: TikTok, YouTube Shorts, LinkedIn
- Status: ✅ Posted to all platforms

**Video 2: Sora 2 Model Ad Hoc**
- Format: Quick reaction/commentary
- Topic: New Sora 2 AI video model release
- Platform: TikTok
- Status: ✅ Posted

**LinkedIn Post:**
"People Buy Outcomes, Not Process" - Written post expanding on Video 1 insights
- Status: ✅ Posted

### Content Distribution Summary (Day 2)
- ✅ 2 TikTok videos posted
- ✅ 1 YouTube Short posted
- ✅ 1 LinkedIn video posted
- ✅ 1 LinkedIn text post

---

## Website Progress

### Completed Sections ✅
- **Hero:** Copy finalized
- **Tools/Integrations:** Section complete
- **Bio:** Personal story and positioning
- **Process:** Service delivery framework

### In Progress 🔄
- Case Studies section
- Testimonials/social proof
- Resources page rebuild
- FAQ section
- Final polish and deployment

**Time Investment:** ~3 hours
**Status:** Approximately 60% complete

---

## Key Insight Applied

**"Be the deal guy, not just the tech guy"**
- Applied to Upwork profile copy (revenue-first positioning)
- Applied to content strategy (outcome-focused messaging)
- Applied to case study structure (results over technical details)

---

## Tomorrow's Priority

**Day 3 Focus:**
- Complete Maker School Day 3 tasks (application templates, community joins)
- Finish website deployment
- Create Upwork portfolio entries with visuals
- Record Upwork intro video

---

*Documenting the transformation, Day 2 complete.*
`;

type Blog = {
  title: string;
  summary?: string;
  date: string;
  author: string;
  authorImage: string;
  thumbnail: string;
  content: string;
};
const blog: Blog = {
  title: "Month 1, Day 2 - Maker School Execution & Website Progress",
  summary:
    "Completed Maker School Day 2 tasks, posted multiple content pieces across platforms, and pushed the website to 60% completion.",
  date: "2025-09-30",
  author: "Simon Bergeron",
  authorImage: "/assets/avatar.webp",
  thumbnail: "/assets/avatar.webp",
  content: day2Content,
};
