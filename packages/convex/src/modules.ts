// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all modules with user's unlock/progress state
export const getAllWithProgress = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const modules = await ctx.db
      .query("modules")
      .withIndex("by_order")
      .collect();

    if (!args.userId) {
      return modules.map((m) => ({
        ...m,
        isUnlocked: !m.isLocked,
        progress: null,
        status: m.isLocked ? "locked" : "available",
      }));
    }

    const unlocks = await ctx.db
      .query("moduleUnlocks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const unlockedModuleIds = new Set(unlocks.map((u) => u.moduleId.toString()));
    const progressByModule = new Map(
      progress.map((p) => [p.moduleId.toString(), p])
    );

    return modules.map((m) => {
      const isUnlocked = !m.isLocked || unlockedModuleIds.has(m._id.toString());
      const moduleProgress = progressByModule.get(m._id.toString());

      let status: "locked" | "available" | "in_progress" | "completed" = "locked";
      if (isUnlocked) {
        if (moduleProgress?.status === "completed") {
          status = "completed";
        } else if (moduleProgress?.status === "in_progress") {
          status = "in_progress";
        } else {
          status = "available";
        }
      }

      return {
        ...m,
        isUnlocked,
        progress: moduleProgress ?? null,
        status,
      };
    });
  },
});

// Get single module with lessons
export const getBySlug = query({
  args: {
    slug: v.string(),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const module = await ctx.db
      .query("modules")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!module) return null;

    const lessons = await ctx.db
      .query("lessons")
      .withIndex("by_module", (q) => q.eq("moduleId", module._id))
      .collect();

    lessons.sort((a, b) => a.order - b.order);

    const quizQuestions = await ctx.db
      .query("quizQuestions")
      .withIndex("by_module", (q) => q.eq("moduleId", module._id))
      .collect();

    let progress = null;
    let isUnlocked = !module.isLocked;

    if (args.userId) {
      progress = await ctx.db
        .query("userProgress")
        .withIndex("by_user_module", (q) =>
          q.eq("userId", args.userId).eq("moduleId", module._id)
        )
        .first();

      const unlock = await ctx.db
        .query("moduleUnlocks")
        .withIndex("by_user_module", (q) =>
          q.eq("userId", args.userId).eq("moduleId", module._id)
        )
        .first();

      isUnlocked = !module.isLocked || !!unlock;
    }

    return {
      ...module,
      lessons,
      quizQuestions: quizQuestions.sort((a, b) => a.questionNumber - b.questionNumber),
      progress,
      isUnlocked,
    };
  },
});

// Seed initial modules and lessons
export const seedModules = mutation({
  handler: async (ctx) => {
    const existingModules = await ctx.db.query("modules").collect();
    
    // Helper to find or insert module
    const upsertModule = async (data: any) => {
      const existing = existingModules.find(m => m.slug === data.slug);
      if (existing) {
        // Update existing module to ensure order/prereqs are correct
        await ctx.db.patch(existing._id, {
            ...data,
            // Don't overwrite ID or slug if somehow different (slug should be same)
        });
        return existing._id;
      }
      return await ctx.db.insert("modules", data);
    };

    // Full Curriculum Data
    const curriculum = [
      {
        slug: "ai-foundations",
        title: "AI Foundations",
        subtitle: "Your AI Toolkit",
        description: "Understanding what's actually available - ChatGPT, Claude, Gemini, and how to choose the right tool for each task.",
        category: "fundamentals",
        order: 1,
        estimatedMinutes: 13,
        imageUrl: "/images/sarah/module-1.jpg",
        prerequisiteModuleSlugs: [],
        isLocked: false,
        xpReward: 50,
        lessons: [
          {
            slug: "the-big-three",
            number: "1.1",
            title: "The Big Three - When to Use What",
            estimatedMinutes: 3,
            order: 1,
            contentType: "text",
            xpReward: 10,
            content: `### The Big Three: When to Use What

You don't need to master every AI tool. Pick one and go deep.

---

**ChatGPT** — *The Swiss Army Knife*

Best when you need web access or real-time information.

\`\`\`
"Find the latest stats on email open rates in B2B SaaS"
"Help me brainstorm 10 webinar topics for Q1"
\`\`\`

---

**Claude** — *The Thoughtful Analyst*

Best for long documents and nuanced writing. Handles 50+ page PDFs well.

\`\`\`
"Read this contract and summarize the key risks in plain English"
"Rewrite this email to be more diplomatic without losing the point"
\`\`\`

---

**Gemini** — *The Google Ecosystem Partner*

Best if you live in Google Workspace. Works directly with your Docs, Sheets, Slides.

\`\`\`
"Turn this Google Doc into a slide deck"
"Analyze the chart in this screenshot"
\`\`\`

---

**The real advice:** Don't chase tools. Pick one, learn it deeply, then expand. Tool mastery beats tool-hopping.`
          },
          {
            slug: "data-safety",
            number: "1.2",
            title: "Data Safety - What Goes Where",
            estimatedMinutes: 2,
            order: 2,
            contentType: "text",
            xpReward: 10,
            content: `### Data Safety: What Goes Where

Before you paste anything into an AI, ask: "Would I be comfortable if this became public?"

**NEVER paste these into consumer AI tools:**
- Customer names, emails, phone numbers (PII)
- Financial data, revenue numbers, pricing strategies
- Contracts, legal documents, NDAs
- Passwords, API keys, credentials

**Safe Practices:**
1. **Anonymize first:** Replace "John Smith from Acme Corp" with "Customer A from Company X".
2. **Summarize context:** Instead of pasting the whole contract, describe the clause you need help with.
3. **Use Enterprise Tiers:** If your company has them, they typically offer "no training on data" guarantees.

**Quick Win:** Create a one-page "AI Data Safety Checklist" for your team. List what's safe and what's not.`
          },
          {
            slug: "custom-assistant",
            number: "1.3",
            title: "Your First Custom Assistant",
            estimatedMinutes: 3,
            order: 3,
            contentType: "text",
            xpReward: 15,
            content: `### Your First Custom Assistant

Stop starting from scratch every time. Build assistants that know your context.

**ChatGPT Custom GPTs** vs **Claude Projects**

*Custom GPTs (ChatGPT)*
- Best for repeatable tasks others will use.
- Can upload brand guidelines and templates.
- Example: "The Brand Voice Editor" that rewrites text to match your style.

*Projects (Claude)*
- Best for document-heavy work and research.
- Upload a knowledge base (PDFs, Docs) that stays available across conversations.
- Example: "Q4 Strategy Project" with all your planning docs uploaded.

**Quick Win:** Create a "Marketing Brief Writer" assistant. Upload your brand guidelines and a template. Instruct it to always ask clarifying questions before writing.`
          },
          {
            slug: "human-in-the-loop",
            number: "1.4",
            title: "Human-in-the-Loop - The Essential Mindset",
            estimatedMinutes: 2,
            order: 4,
            contentType: "text",
            xpReward: 10,
            content: `### Human-in-the-Loop

Your job is changing from "doing" to "orchestrating".

**The Trust Spectrum:**

1. **Full Autonomy:** AI does everything, you review occasionally. (e.g., Data logging)
2. **Draft + Review:** AI does first pass, you edit/approve. (e.g., Blog posts, emails)
3. **Guidance + Creation:** You generate options, you choose/refine. (e.g., Headlines, images)
4. **Human-Led:** AI assists only. (e.g., Strategy, crisis comms)

**The Feedback Loop:**
When you correct an AI, you aren't just fixing a typo—you're training your teammate.
- "Don't use that word."
- "Make it shorter."
- "Focus on benefit, not feature."

**Quick Win:** For your next task, consciously decide where it falls on the Trust Spectrum.`
          },
          {
            slug: "prompting-rctf",
            number: "1.5",
            title: "Prompting That Works (RCTF Framework)",
            estimatedMinutes: 3,
            order: 5,
            contentType: "text",
            xpReward: 15,
            content: `### The RCTF Framework

Bad prompts → bad results. Here's how to fix it.

**R = Role** → "You are a senior marketing strategist..."

**C = Context** → "We're launching to a cold audience. Budget is limited."

**T = Task** → "Write 5 email subject lines"

**F = Format** → "Bulleted list with rationale for each"

---

**❌ Bad Prompt:**

> "Write me some email subject lines for our launch"

**✅ Good Prompt (using RCTF):**

\`\`\`
Role: You are an email marketing expert who specializes in B2B SaaS launches.

Context: We're launching a new project management feature. Our audience is current users who haven't engaged in 30+ days. Open rates have been around 22%.

Task: Write 5 email subject lines to re-engage these dormant users.

Format: Present as a numbered list. For each, include:
- The subject line
- Why it might work (1 sentence)
- Predicted open rate vs. our baseline

Examples of subject lines that worked for us before:
- "You're missing out on 3 hours/week" (28% open rate)
- "Quick question about your workflow" (31% open rate)
\`\`\`

---

**📋 Copy-Paste Template:**

\`\`\`
Role: You are a [specific expertise].

Context: [Describe the situation, audience, constraints]

Task: [Exactly what you need, with quantity if applicable]

Format: [How you want the output structured]

Examples (optional):
[Paste 2-3 examples of good outputs]
\`\`\``
          }
        ]
      },
      {
        slug: "communication-workflow",
        title: "Communication & Workflow",
        subtitle: "AI as Your Superpower",
        description: "Master AI for email, meetings, content creation, and stakeholder communication.",
        category: "communication",
        order: 2,
        estimatedMinutes: 10,
        imageUrl: "/images/sarah/module-2.jpg",
        prerequisiteModuleSlugs: ["ai-foundations"],
        isLocked: true,
        unlockCondition: { type: "module_complete", targetSlug: "ai-foundations" },
        xpReward: 50,
        lessons: [
          {
            slug: "email-writing",
            number: "2.1",
            title: "Email That Writes Itself",
            estimatedMinutes: 2,
            order: 1,
            contentType: "text",
            xpReward: 10,
            content: `### Email That Writes Itself

**The "3 Versions" Technique**

Instead of agonizing over tone, ask for three options and pick the best one.

---

**Example: Handling a Delayed Project**

*Your situation:* "Client is upset about a 2-week delay on their website launch."

**Version 1 — Formal:**
> "Dear Ms. Chen, I want to personally address the timeline adjustment for your website launch. We've identified scope changes that require additional development time..."

**Version 2 — Empathetic:**
> "Hi Sarah, I completely understand your frustration—launch dates matter. Here's what happened and exactly how we're making it right..."

**Version 3 — Direct:**
> "Sarah—Website delayed 2 weeks. Cause: scope additions. New date: March 15. We'll add rush QA at no cost. Call me if you want to discuss."

---

**📋 Copy-Paste Prompt:**

\`\`\`
Write 3 versions of a reply to this situation:
[Paste the email or describe the situation]

Version 1: Formal and diplomatic
Version 2: Friendly and empathetic
Version 3: Brief and direct

Keep each under 100 words.
\`\`\`

---

**Drafting in Your Voice**

Feed the AI examples of your previous emails, then ask it to match your style.

**📋 Copy-Paste Prompt:**

\`\`\`
Here are 3 emails I've written:

EMAIL 1:
[Paste your email]

EMAIL 2:
[Paste your email]

EMAIL 3:
[Paste your email]

Analyze my writing style (tone, sentence length, how I open/close emails, formality level).

Then write a reply to this email matching my style:
[Paste the email you need to reply to]
\`\`\``
          },
          {
            slug: "meeting-prep",
            number: "2.2",
            title: "Meeting Prep & Follow-up",
            estimatedMinutes: 2,
            order: 2,
            contentType: "text",
            xpReward: 10,
            content: `### Meeting Prep & Follow-up

**Before the Meeting**

Use AI to prep smart questions based on the attendee's background.

**📋 Copy-Paste Prompt:**

\`\`\`
I'm meeting with [Name], [Title] at [Company].

Here's their LinkedIn summary:
[Paste LinkedIn about section]

Here's our meeting agenda:
[Paste agenda]

Give me:
1. 3 smart questions that show I've done my homework
2. 2 potential pain points they might have based on their role
3. 1 thing to avoid saying/assuming
\`\`\`

---

**During the Meeting**

Use transcription tools (Zoom AI, Otter.ai, Fireflies.ai, or even Voice Memos) to capture the conversation. Don't worry about taking notes—stay present.

---

**After the Meeting**

**📋 Copy-Paste Prompt:**

\`\`\`
Here's a transcript from my meeting:

[Paste transcript]

Extract and format:

KEY DECISIONS:
- [List decisions made]

ACTION ITEMS:
- [Task] → [Owner] → [Due date]
- [Task] → [Owner] → [Due date]

OPEN QUESTIONS:
- [Questions that need follow-up]

SUMMARY:
[2-3 sentence summary for attendees]
\`\`\`

---

**Example Output:**

> **Key Decisions:** Moving forward with Phase 1 only; budget approved at $15K.
>
> **Action Items:**
> - Send SOW → Sarah → Friday
> - Review legal terms → John (Client) → Next week
>
> **Open Questions:** Timeline for Phase 2? Who handles hosting?`
          },
          {
            slug: "stakeholder-translation",
            number: "2.3",
            title: "Stakeholder Translation",
            estimatedMinutes: 3,
            order: 3,
            contentType: "text",
            xpReward: 15,
            content: `### Stakeholder Translation

Your job is translating between audiences.

**Technical -> Executive:**
> "Rewrite this technical incident report as a one-page executive summary. Focus on business impact, risk, and timeline. Remove jargon."

**Vendor Proposal -> Comparison:**
> "I have 3 PDF proposals. Create a comparison table with columns for Price, Timeline, Key Features, and Risks."`
          },
          {
            slug: "content-scale",
            number: "2.4",
            title: "Content Creation at Scale",
            estimatedMinutes: 3,
            order: 4,
            contentType: "text",
            xpReward: 20,
            content: `### The 1 → 10 Rule

One piece of core content should generate 10+ downstream assets. Stop creating from scratch.

**One Blog Post Becomes:**

- 5 LinkedIn posts (different hooks)
- 3 Twitter/X threads
- 2 newsletter blurbs
- 1 video script outline

---

**📋 Copy-Paste Prompt:**

\`\`\`
Here's my blog post:

[Paste your blog post]

Generate 5 LinkedIn posts based on this content. Each should:
- Be under 200 words
- Have a strong opening hook
- End with a question or call-to-action

Use these hook styles:
1. Contrarian: Challenge a common belief
2. Data-led: Lead with a surprising stat
3. Story-led: Start with a personal anecdote
4. How-to: Promise actionable steps
5. Question: Open with a provocative question
\`\`\`

---

**Example Transformation**

*Your blog says:*
> "We tested 12 AI writing tools over 3 months. The winner wasn't the most expensive—it was the one our team actually used consistently."

*Becomes these hooks:*

**Contrarian:**
> "The best AI tool isn't the 'best' one. It's the one your team won't abandon after week 2."

**Data-led:**
> "We tested 12 AI tools. Only 3 were still being used after 90 days. Here's what separated them..."

**Story-led:**
> "Last quarter I bought our team the 'top-rated' AI tool. By month 2, it was collecting dust. Here's what we learned..."`
          }
        ]
      },
      {
        slug: "visual-creative",
        title: "Visual & Creative",
        subtitle: "AI-Powered Visual Marketing",
        description: "Image generation, Figma integrations, and maintaining brand consistency with AI.",
        category: "creative",
        order: 3,
        estimatedMinutes: 12,
        imageUrl: "/images/sarah/module-3.jpg",
        prerequisiteModuleSlugs: ["communication-workflow"],
        isLocked: true,
        unlockCondition: { type: "module_complete", targetSlug: "communication-workflow" },
        xpReward: 50,
        lessons: [
            {
                slug: "image-generation-basics",
                number: "3.1",
                title: "Image Generation Basics",
                estimatedMinutes: 3,
                order: 1,
                contentType: "text",
                xpReward: 15,
                content: `### Image Generation Basics

**Nano Banana Pro ([Gemini](https://gemini.google.com))**
- **Best for:** Graphics with text (it spells correctly!), localized ads, simple infographics.
- **Why:** Integrated with Google, free.

**[Midjourney](https://midjourney.com)**
- **Best for:** High-art, hero images, creative concepts.
- **Why:** Best aesthetic quality, but requires Discord.

**Prompt Structure:**
> "[Subject], [Style], [Lighting], [Composition], [Mood]"
> *Example:* "A modern marketing team meeting, minimalist photography style, soft natural light, wide angle, energetic mood."`
            },
            {
                slug: "brand-consistency",
                number: "3.2",
                title: "Brand Consistency with AI",
                estimatedMinutes: 3,
                order: 2,
                contentType: "text",
                xpReward: 15,
                content: `### Brand Consistency with AI

**The Challenge:** AI loves to hallucinate new styles.
**The Fix:** Create a "Visual Brief" for AI.

1. **Define your palette:** Use specific hex codes AND descriptive color names (e.g., "Neon Orange #FF9900").
2. **Describe style:** "Minimalist, flat design" or "Cinematic, moody lighting".
3. **Reference Images:** Most tools allow you to upload a reference image to match the vibe.

**Quick Win:** Write a paragraph describing your brand's visual style specifically for an AI. Test it.`
            },
            {
                slug: "figma-ai",
                number: "3.3",
                title: "Figma + AI Workflow",
                estimatedMinutes: 3,
                order: 3,
                contentType: "text",
                xpReward: 15,
                content: `### Figma + AI Workflow

**Plugins to try in [Figma](https://figma.com):**
- **[Magician](https://magician.design):** Generates icons and copy inside Figma.
- **[Relume](https://relume.io):** Generates sitemaps and wireframes.

**Workflow:**
1. Use AI to generate 5 layout variations of a hero section.
2. Use AI to fill placeholder text with realistic copy (not Lorem Ipsum).
3. Use AI to generate custom icons instead of hunting libraries.`
            },
            {
                slug: "video-voice",
                number: "3.4",
                title: "Video, Voice & Motion",
                estimatedMinutes: 3,
                order: 4,
                contentType: "text",
                xpReward: 20,
                content: `### Video, Voice & Motion

**Voice: [ElevenLabs](https://elevenlabs.io)**
- Clone your own voice or use high-quality stock voices.
- **Use case:** Narrating product videos without a studio session.
- **Pricing:** Free tier available, $11/month for serious use.

**Video: [Runway](https://runwayml.com) / [Pika](https://pika.art)**
- Good for: 5-second background loops, social clips, visualizing concepts.
- **Not ready for:** Full narrative storytelling with consistent characters (yet).

**Quick Win:** Create a 5-second animated background for a slide deck using Runway.`
            }
        ]
      },
      {
        slug: "data-systems",
        title: "Data & Systems",
        subtitle: "The Invisible Infrastructure",
        description: "Why centralized databases matter, CRM + AI, and understanding MCP for marketing directors.",
        category: "data",
        order: 4,
        estimatedMinutes: 10,
        imageUrl: "/images/sarah/module-4.jpg",
        prerequisiteModuleSlugs: ["communication-workflow"],
        isLocked: true,
        unlockCondition: { type: "module_complete", targetSlug: "communication-workflow" },
        xpReward: 50,
        lessons: [
            {
                slug: "crm-ai",
                number: "4.1",
                title: "CRM + AI: The Power Combo",
                estimatedMinutes: 3,
                order: 1,
                contentType: "text",
                xpReward: 15,
                content: `### CRM + AI

**HubSpot / Salesforce AI features to enable:**
1. **Lead Scoring:** Let AI find patterns in who converts.
2. **Call Intelligence:** Automatically transcribe and summarize sales calls.
3. **Data Enrichment:** Auto-fill company size, industry, and revenue.

**Warning:** AI needs data. If your CRM is empty or messy, the AI is useless.`
            },
            {
                slug: "databases-demystified",
                number: "4.2",
                title: "Databases Demystified",
                estimatedMinutes: 2,
                order: 2,
                contentType: "text",
                xpReward: 10,
                content: `### Databases vs. Spreadsheets

**Spreadsheets (Excel/Sheets):**
- Best for: Analysis, one-time calculations, small lists.
- Bad for: Long-term data storage, relationships.

**Databases ([Airtable](https://airtable.com)/[Notion](https://notion.so)/SQL):**
- Best for: Things that have relationships (e.g., Content Calendar linked to Authors linked to Campaigns).
- Enable automation: "When status changes to 'Done', email the designer."

**Quick Win:** Move one messy "tracker" spreadsheet into [Airtable](https://airtable.com).`
            },
            {
                slug: "research-intel",
                number: "4.3",
                title: "AI-Powered Research",
                estimatedMinutes: 3,
                order: 3,
                contentType: "text",
                xpReward: 15,
                content: `### AI-Powered Research & Intel

**Competitor Monitoring:**
> "Monitor these 3 competitor URLs for changes to pricing or messaging." (Using [Perplexity](https://perplexity.ai) or ChatGPT Browse)

**Report Summarization:**
> "Here is the 50-page State of Marketing report. Summarize the 3 key trends relevant to B2B SaaS."

**[Perplexity Pro](https://perplexity.ai):** The "Google Killer" for research. It cites sources, which is critical for trust.`
            },
             {
                slug: "analytics-reporting",
                number: "4.4",
                title: "Analytics & Reporting",
                estimatedMinutes: 2,
                order: 4,
                contentType: "text",
                xpReward: 10,
                content: `### Analytics & Reporting

**Natural Language Queries:**
Tools like GA4 and Tableau now let you ask:
> "Which channel had the highest conversion rate last month?"

**Pattern Recognition:**
Export a CSV of campaign data. Upload to Claude/ChatGPT.
> "Analyze this data. What anomalies do you see? What correlates with high performance?"`
            }
        ]
      },
      {
        slug: "marketing-operations",
        title: "Marketing Operations",
        subtitle: "Your AI-Enhanced Machine",
        description: "Landing pages, SEO, automation flows, and measuring what matters.",
        category: "operations",
        order: 5,
        estimatedMinutes: 12,
        imageUrl: "/images/sarah/module-5.jpg",
        prerequisiteModuleSlugs: ["visual-creative", "data-systems"],
        isLocked: true,
        unlockCondition: { type: "module_complete", targetSlug: "data-systems" },
        xpReward: 50,
        lessons: [
            {
                slug: "landing-pages",
                number: "5.1",
                title: "Landing Pages in Hours",
                estimatedMinutes: 3,
                order: 1,
                contentType: "text",
                xpReward: 15,
                content: `### Landing Pages in Hours

**Headline Generation:**
> "Write 10 headlines for a landing page selling X to Y. Use these angles: Fear of missing out, aspiration, data-backed."

**Structure:**
> "Outline a landing page structure for a high-ticket webinar. Include social proof sections and objection handling."

**A/B Testing:**
> "Suggest 5 A/B tests for this page copy to improve conversion."`
            },
            {
                slug: "seo-ai",
                number: "5.2",
                title: "SEO in the AI Era",
                estimatedMinutes: 3,
                order: 2,
                contentType: "text",
                xpReward: 15,
                content: `### SEO in the AI Era

**Keyword Clustering:**
> "Here is a list of 100 keywords. Group them into topic clusters and suggest a 'pillar page' title for each cluster."

**Optimization:**
> "Review this draft blog post against SEO best practices. Suggest improvements for the title tag, meta description, and H2 headers."

**Note:** Don't let AI write the whole post unsupervised. It tends to be generic. Use it for structure and optimization.`
            },
            {
                slug: "marketing-automation",
                number: "5.3",
                title: "Marketing Automation Flows",
                estimatedMinutes: 3,
                order: 3,
                contentType: "text",
                xpReward: 20,
                content: `### Marketing Automation Flows

**Dynamic Content:**
> "Write 3 versions of this email paragraph: one for a CEO, one for a Marketing Manager, and one for a Developer."

**Logic Planning:**
> "Design a nurture sequence for a lead who downloaded our pricing guide. Map out the delays and triggers."

**Quick Win:** Review your "Welcome" sequence. Use AI to personalize the first email based on job title.`
            },
            {
                slug: "campaign-analytics",
                number: "5.4",
                title: "Campaign Analytics & Attribution",
                estimatedMinutes: 3,
                order: 4,
                contentType: "text",
                xpReward: 15,
                content: `### Campaign Analytics

**Attribution Modeling:**
Use AI to explain attribution to stakeholders:
> "Explain 'Linear' vs 'Time-Decay' attribution in simple terms for a board meeting."

**Predictive Modeling:**
> "Based on this historical data, if we increase spend by 20%, what is the projected impact on leads?"`
            }
        ]
      },
      {
        slug: "ai-agents",
        title: "AI Agents & Delegation",
        subtitle: "From Executor to Orchestrator",
        description: "The biggest shift since chatbots. Learn what agents are and how to delegate multi-step tasks.",
        category: "strategic",
        order: 6,
        estimatedMinutes: 12,
        imageUrl: "/images/sarah/module-6.jpg",
        prerequisiteModuleSlugs: ["marketing-operations"],
        isLocked: true,
        unlockCondition: { type: "module_complete", targetSlug: "marketing-operations" },
        xpReward: 75,
        lessons: [
            {
                slug: "what-are-agents",
                number: "6.1",
                title: "What Are AI Agents?",
                estimatedMinutes: 2,
                order: 1,
                contentType: "text",
                xpReward: 15,
                content: `### What Are AI Agents?

**The Three Levels:**
1. **Chatbot:** Answers questions. (Reactive)
2. **AI Assistant:** Generates content. (Task-based)
3. **AI Agent:** Plans and executes tasks toward a goal. (Goal-based)

**Why it matters:**
Your role is shifting from "doing" to "orchestrating". One person with agents can do the work of a team.

**Quick Win:** Identify one multi-step task you do repeatedly. Write down each step. This is a potential agent candidate.`
            },
            {
                slug: "delegation-matrix",
                number: "6.2",
                title: "What You Can Delegate Today",
                estimatedMinutes: 3,
                order: 2,
                contentType: "text",
                xpReward: 15,
                content: `### What You Can Delegate Today

**Ready (High Confidence):**
- Research & Monitoring
- Content Drafting
- Data Operations (CRM updates)

**Needs Supervision:**
- Campaign Optimization
- Content Personalization

**Keep Human-Led:**
- Brand Strategy
- Crisis Comms
- High-value Relationships

**The 90% Rule:**
Delegate only when the task is predictable >90% of the time.`
            },
            {
                slug: "human-loop-practice",
                number: "6.3",
                title: "Human-in-the-Loop in Practice",
                estimatedMinutes: 2,
                order: 3,
                contentType: "text",
                xpReward: 15,
                content: `### Human-in-the-Loop in Practice

**The Feedback Loop:**
1. Agent does task.
2. You review.
3. You provide feedback.
4. Agent learns.

**Setting Guardrails:**
- "Never exceed $500/day ad spend."
- "Flag any mention of [Competitor]."
- "Don't publish without approval."`
            },
            {
                slug: "getting-started-agents",
                number: "6.4",
                title: "Getting Started with Agent Workflows",
                estimatedMinutes: 3,
                order: 4,
                contentType: "text",
                xpReward: 15,
                content: `### Getting Started with Agents

**Level 1: Single-Purpose Agents**
Use [ChatGPT Custom GPTs](https://chat.openai.com).
- *Example:* "Competitor Monitor" that summarizes news weekly.

**Level 2: Connected Agents**
[Zapier](https://zapier.com) + AI.
- *Example:* "New Lead -> Research LinkedIn -> Draft Email Draft in HubSpot."

**Level 3: Custom Automation**
[Claude Code](https://claude.ai/code) / [Relevance AI](https://relevanceai.com).
- For advanced users building custom tools.

**Quick Win:** Create one Custom GPT that handles a specific, repeatable task.`
            },
            {
                slug: "hype-vs-reality",
                number: "6.5",
                title: "Hype vs Reality Check",
                estimatedMinutes: 2,
                order: 5,
                contentType: "text",
                xpReward: 5,
                content: `### Hype vs Reality

**Real:**
- Productivity gains of 3-5% annually.
- Specific tasks 10x faster.

**Hype:**
- "Full strategic autonomy" (Not happening soon).
- "Immediate 10x productivity" (Takes setup time).

**The Winning Mindset:**
Don't think "How can agents replace my team?"
Think "What repetitive tasks can I delegate so my team does higher-value work?"`
            }
        ]
      },
      {
        slug: "advanced-strategic",
        title: "Advanced & Strategic",
        subtitle: "Leading an AI-First Organization",
        description: "Building AI-ready teams, vendor evaluation, and creating your AI strategy roadmap.",
        category: "strategic",
        order: 7,
        estimatedMinutes: 12,
        imageUrl: "/images/sarah/module-7.jpg",
        prerequisiteModuleSlugs: ["ai-agents"],
        isLocked: true,
        unlockCondition: { type: "percentage_complete", threshold: 80 },
        xpReward: 100,
        lessons: [
            {
                slug: "ai-ready-team",
                number: "7.1",
                title: "Building an AI-Ready Team",
                estimatedMinutes: 3,
                order: 1,
                contentType: "text",
                xpReward: 15,
                content: `### Building an AI-Ready Team

**Assess Maturity:**
- **Awareness:** Do they know what's possible?
- **Access:** Do they have the licenses?
- **Adoption:** Are they using it?

**Champions:**
Identify 1-2 people who love this stuff. Empower them to experiment and teach the others.

**Quick Win:** Host a "Prompt Lunch" where everyone shares one prompt that saved them time.`
            },
            {
                slug: "vendor-evaluation",
                number: "7.2",
                title: "Vendor & Tool Evaluation",
                estimatedMinutes: 3,
                order: 2,
                contentType: "text",
                xpReward: 15,
                content: `### Vendor Evaluation

**Red Flags:**
- "10x productivity overnight"
- No clear pricing
- "Proprietary AI" (usually just a wrapper around GPT-4)

**Questions to Ask:**
- "How do you handle data privacy?"
- "Can we opt out of training?"
- "What happens if we leave?"`
            },
            {
                slug: "90-day-roadmap",
                number: "7.3",
                title: "Your 90-Day AI Roadmap",
                estimatedMinutes: 3,
                order: 3,
                contentType: "text",
                xpReward: 15,
                content: `### Your 90-Day Roadmap

**Days 1-30: Foundation**
- Personal mastery of one tool.
- Data safety guidelines.
- Audit current usage.

**Days 31-60: Integration**
- Identify top 3 use cases.
- Run pilots.
- Train the team.

**Days 61-90: Scale**
- Formalize best practices.
- Roll out successful pilots to all.
- Measure impact.`
            },
            {
                slug: "staying-current",
                number: "7.4",
                title: "Staying Current",
                estimatedMinutes: 3,
                order: 4,
                contentType: "text",
                xpReward: 15,
                content: `### Staying Current

**Don't drink from the firehose.**

**Tier 1 (Daily - 3 mins):**
- [The Neuron](https://www.theneuron.ai) or [Superhuman AI](https://www.superhuman.ai) newsletter.

**Tier 2 (Weekly - 15 mins):**
- [Marketing AI Institute](https://www.marketingaiinstitute.com) or [Every.to](https://every.to).

**Tier 3 (Monthly - 1 hour):**
- A deep-dive podcast like [Dwarkesh Patel](https://www.dwarkesh.com) or [The AI in Business Podcast](https://podcast.emerj.com).

**Rule:** Spend 90% of your time DOING, only 10% reading news.`
            }
        ]
      }
    ];

    let lessonsAdded = 0;

    for (const moduleData of curriculum) {
      const { lessons, ...moduleInfo } = moduleData;
      
      const moduleId = await upsertModule(moduleInfo);
      
      if (lessons && lessons.length > 0) {
        // Clear existing lessons for this module to avoid duplicates on re-seed
        const existingLessons = await ctx.db
            .query("lessons")
            .withIndex("by_module", q => q.eq("moduleId", moduleId))
            .collect();
        
        for (const l of existingLessons) {
            await ctx.db.delete(l._id);
        }

        for (const lesson of lessons) {
          await ctx.db.insert("lessons", {
            ...lesson,
            moduleId,
          });
          lessonsAdded++;
        }
      }
    }

    return { 
        message: "Curriculum seeded successfully", 
        modules: curriculum.length, 
        lessons: lessonsAdded 
    };
  },
});