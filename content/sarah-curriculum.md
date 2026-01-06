# Sarah's AI Learning Journey - Curriculum

**Version**: 2.0
**Last Updated**: December 12, 2025
**Total Duration**: ~7 hours across 7 modules
**Target Learner**: Marketing Director transitioning from task executor to AI orchestrator

---

## What's Changed in Version 2.0

This curriculum has been restructured around a core insight: **your job is changing from "doing marketing tasks" to "orchestrating AI systems that do marketing tasks."**

Key additions:
- **New Module 6: AI Agents & Delegation** - The biggest shift since chatbots
- **Human-in-the-loop principles** - When to trust AI vs when to verify
- **Expanded tool coverage** - Nano Banana Pro, ElevenLabs, Claude Code
- **Better learning resources** - Every.to, Dwarkesh Patel, Marketing AI Institute
- **Practical checklists** - Agent delegation, guardrails, decision matrices

---

## The AI Landscape (December 2025)

### Frontier Models - The Big Three

| Model | Strengths | Best For | Data Policy |
|-------|-----------|----------|-------------|
| [**ChatGPT 5.2**](https://chat.openai.com) | Real-time web access, image generation (DALL-E), voice mode, extensive plugins | Quick research, visual content, voice interactions, broad general tasks | Data may be used for training unless you opt out in settings |
| [**Claude Opus 4.5**](https://claude.ai) | Exceptional at long documents, nuanced writing, complex reasoning, coding | Document analysis, quality writing, detailed explanations, sensitive content | Conversations not used for training |
| [**Gemini 3.0 Pro**](https://gemini.google.com) + Nano Banana Pro | Deep Google Workspace integration, **perfect text rendering in images**, works with images/text/voice together | Google ecosystem users, marketing visuals with text, international campaigns | Integrated with Google's enterprise data handling |

### Why Nano Banana Pro Matters for Marketing

Nano Banana Pro is Google's AI image generator built into Gemini. Its superpower: **it renders text correctly**. Other AI image tools produce garbled text. Nano Banana Pro creates:
- Social graphics with legible headlines
- Localized ads in multiple languages
- Infographics with proper labels
- Marketing visuals you can actually use

It's free (included with Gemini) and should be your first AI image tool to master.

### Open Source Options (For Sensitive Data)

When data cannot leave your organization:

| Model | Use Case | Notes |
|-------|----------|-------|
| **Qwen 2.5** | Local deployment, multilingual needs | Strong at multiple languages |
| **Kimi-K2** | Long document processing | Excellent context handling |
| **Llama 3.3** | General purpose, self-hosted | Most flexible deployment |

---

## Module 1: AI Foundations
*"Your AI Toolkit"*

**Duration**: 60 minutes
**Prerequisite**: None (unlocked by default)
**XP Reward**: 50

### Lesson 1.1: The Big Three - When to Use What
**Duration**: 10 minutes

You don't need to master every AI tool. You need to know which one to reach for.

**ChatGPT 5.2** - Your research assistant with real-time access
- Has live web access - can look up current information
- Creates images with DALL-E integration
- Voice mode for hands-free interaction
- Thousands of plugins and custom GPTs
- Best when: You need current info, images, or broad general help

**Claude Opus 4.5** - Your thoughtful analyst
- Excels at reading and understanding long documents
- Produces high-quality, nuanced writing
- Strong reasoning through complex problems
- Best when: You're working with lengthy docs, need quality writing, or want careful analysis

**Gemini 3.0 Pro** - Your Google ecosystem partner
- Native integration with Gmail, Docs, Sheets, Slides
- Analyzes images and documents together
- Large context window for big projects
- Best when: You're already in Google Workspace

**Quick Win**: Create free accounts on all three. Pick one task today and try it on each. Notice the differences.

---

### Lesson 1.2: Data Safety - What Goes Where
**Duration**: 10 minutes

Before you paste anything into an AI, ask: "Would I be comfortable if this became public?"

**Never paste these into consumer AI tools:**
- Customer names, emails, phone numbers (PII)
- Financial data, revenue numbers, pricing strategies
- Contracts, legal documents, NDAs
- Passwords, API keys, credentials
- Unreleased product information
- Employee performance data

**Safe practices:**
1. **Anonymize first**: Replace "John Smith from Acme Corp" with "Customer A from Company X"
2. **Summarize sensitive context**: Instead of pasting the whole contract, describe what you need
3. **Use enterprise tiers**: They have stronger data handling agreements
4. **Check your company policy**: IT may have approved specific tools

**Enterprise vs Consumer tiers:**
- Consumer: Your data may train future models (unless you opt out)
- Enterprise/Team: Typically no training on your data, SOC 2 compliance, admin controls

**Quick Win**: Create a one-page "AI Data Safety Checklist" for your team. List what's safe, what's not, and how to anonymize.

---

### Lesson 1.3: Your First Custom Assistant
**Duration**: 15 minutes

Stop starting from scratch every time. Build assistants that know your context.

**ChatGPT: Custom GPTs vs Projects**

*Custom GPTs* - Standalone assistants you can share
- Upload reference documents (brand guidelines, templates)
- Set custom instructions
- Can be shared with team or made public
- Best for: Repeatable tasks others will use

*Projects* - Persistent workspaces for ongoing work
- Everything you add stays in context
- Good for complex, evolving projects
- Best for: Your own ongoing work

**Claude: Projects**
- Upload documents to create a knowledge base
- Set project-specific instructions
- Documents stay available across conversations
- Best for: Document-heavy work, research projects

**When to use each:**
- Need to share with others → ChatGPT Custom GPT
- Working alone on ongoing project → Claude Project or ChatGPT Project
- Quick one-off task → Just use the chat directly

**Quick Win**: Create a "Marketing Brief Writer" assistant. Upload your brand guidelines, tone of voice doc, and a few example briefs. Instruct it to always ask clarifying questions before writing.

---

### Lesson 1.4: Human-in-the-Loop - The Essential Mindset
**Duration**: 10 minutes

Your job is changing. You're becoming an AI orchestrator, not just an executor.

**What "human-in-the-loop" means:**

AI does the heavy lifting. You provide judgment, creativity, and final approval. This isn't AI replacing you—it's AI amplifying you.

**The trust spectrum:**

| Trust Level | AI Does | You Do | Examples |
|-------------|---------|--------|----------|
| **Full autonomy** | Everything | Review occasionally | Social monitoring, data logging, scheduling |
| **Draft + review** | First pass | Edit and approve | Email drafts, blog outlines, reports |
| **Guidance + creation** | Generate options | Choose and refine | Headlines, images, campaign ideas |
| **Human-led** | Assist only | Drive the work | Strategy, crisis comms, key relationships |

**When AI can work alone:**
- Repetitive tasks with predictable outcomes
- Low-stakes decisions that are easy to reverse
- Data operations (logging, sorting, enriching)
- Monitoring and alerting

**When you must stay involved:**
- Brand voice and positioning
- Legal and compliance decisions
- High-value client relationships
- Crisis communications
- Creative strategy and big ideas
- Anything public-facing or high-stakes

**The feedback loop:**

Your edits make AI better. When you correct an AI draft:
1. The AI learns your preferences (in custom assistants)
2. You get faster at spotting what needs fixing
3. Future drafts require less editing

This isn't extra work—it's training your digital teammate.

**Quick Win**: For your next AI task, consciously choose where it falls on the trust spectrum. Full autonomy? Draft + review? Human-led with AI assist?

---

### Lesson 1.5: Prompting That Works
**Duration**: 15 minutes

Bad prompts get bad results. Good prompts get results you can actually use.

**The RCTF Framework:**

**R - Role**: Who should the AI be?
> "You are a senior marketing strategist with 15 years of B2B experience..."

**C - Context**: What's the situation?
> "We're launching a new product to mid-market SaaS companies. Our main competitor just raised prices 20%..."

**T - Task**: What exactly do you need?
> "Write 5 email subject lines for our launch announcement..."

**F - Format**: How should the output look?
> "Present as a numbered list with A/B test rationale for each."

**Power moves:**

*Show examples of what you want* - The more examples, the better the output:
> "Here are two subject lines that worked well for us before: [example 1], [example 2]. Write 5 more in this style."

*Iterate - don't accept the first draft* -
> "Make it more casual"
> "Shorter - under 40 characters"
> "Add more urgency"

*Ask for alternatives*:
> "Give me 3 different approaches to this"

**Quick Win**: Take your last AI prompt that gave mediocre results. Rewrite it using RCTF. Compare the outputs.

---

### Module 1 Quiz

5 scenario-based questions testing:
- Which AI tool for which task
- Data safety judgment calls
- Custom assistant decisions
- Prompt improvement

---

## Module 2: Communication & Workflow
*"AI as Your Superpower"*

**Duration**: 55 minutes
**Prerequisite**: Module 1 (AI Foundations)
**XP Reward**: 50

### Lesson 2.1: Email That Writes Itself
**Duration**: 10 minutes

The goal isn't to remove yourself from email. It's to spend your time on thinking, not typing.

**Drafting in your voice:**
1. Give AI 3-5 examples of emails you've written
2. Ask it to identify your patterns and tone
3. Have it draft new emails matching your style
4. Edit only what needs changing (aim for 20% or less)

**Summarizing long threads:**
> "Summarize this email thread. What's the main issue? What decisions have been made? What's still unresolved?"

**The "3 versions" technique:**
> "Write 3 versions of this reply:
> 1. Formal and diplomatic
> 2. Friendly but professional
> 3. Brief and direct (under 50 words)"

Pick the best one, adjust, send.

**Quick Win**: Your next 5 emails - draft them with AI, then only edit. Track how much time you save.

---

### Lesson 2.2: Meeting Prep & Follow-up
**Duration**: 10 minutes

Meetings should have three AI touchpoints: before, during, and after.

**Before the meeting:**
- Research attendees: "Tell me about [person] and their company's recent news"
- Prep talking points: "Based on this agenda, what questions should I be ready to answer?"
- Draft your opening: "Help me write a 30-second intro for this meeting"

**During the meeting:**
AI note-taking options:
- Otter.ai, Fireflies.ai - Dedicated meeting transcription
- Zoom/Teams/Meet native AI - Built-in summaries
- Phone recording + transcription - For in-person meetings

**After the meeting:**
> "From this transcript, extract:
> 1. Key decisions made
> 2. Action items with owners
> 3. Open questions to follow up on
> 4. A 3-sentence summary I can share with people who weren't there"

**Quick Win**: Use AI for your next meeting summary. Send it to attendees within 1 hour of the meeting ending.

---

### Lesson 2.3: Stakeholder Translation
**Duration**: 15 minutes

Your job often involves translating between audiences. AI makes this effortless.

**Technical → Executive:**
> "Rewrite this technical report as a one-page executive summary. Focus on business impact, not technical details. Assume the reader has 2 minutes and cares about revenue, risk, and timeline."

**Marketing metrics → Board presentation:**
> "Turn these campaign metrics into 3 slides for a board meeting:
> - Slide 1: Key wins (what worked)
> - Slide 2: Key learnings (what we'd do differently)
> - Slide 3: Recommendations (what's next)
> Keep each slide to 3 bullet points max."

**Vendor proposal → Comparison table:**
> "I have proposals from 3 vendors. Create a comparison table with these columns: Price, Timeline, Key Features, Risks, Recommendation. Then write a 2-paragraph summary of which to choose and why."

**Quick Win**: Take your next technical document or report. Use AI to translate it for leadership. Compare the time it takes vs. doing it manually.

---

### Lesson 2.4: Content Creation at Scale
**Duration**: 20 minutes

The content treadmill is exhausting. AI lets you work smarter, not harder.

**The Blog Workflow:**
1. **Outline**: "Create an outline for a blog post about [topic] targeting [audience]"
2. **Draft**: "Write section 2 of this outline. Make it conversational and include a specific example"
3. **Edit**: "Make this more concise. Remove jargon. Add a stronger hook"
4. **Polish**: You review, add your perspective, ensure accuracy

**Social Media Batching** (Week of content in 1 hour):
> "I have this blog post. Create:
> - 5 LinkedIn posts (different angles, not just excerpts)
> - 5 Twitter/X threads (3-5 tweets each)
> - 3 short-form video script hooks
> - 2 email newsletter snippets
> Make each platform-native, not copy-paste"

**The 1 → 10 Rule:**
One long-form piece should generate at least 10 short-form pieces:
- Blog post → LinkedIn posts, tweets, email snippets
- Webinar → Video clips, quote graphics, blog recap
- Podcast → Audiograms, transcripts, thread summaries

**Quick Win**: Take your last blog post or long-form content. Use AI to generate 5 LinkedIn posts from it in different styles. Schedule them for the next week.

---

### Module 2 Quiz

Questions covering:
- Email tone matching scenarios
- Meeting workflow ordering
- Content repurposing strategies

---

## Module 3: Visual & Creative
*"AI-Powered Visual Marketing"*

**Duration**: 65 minutes
**Prerequisite**: Module 2 (Communication & Workflow)
**XP Reward**: 50

### Lesson 3.1: Image Generation Basics
**Duration**: 15 minutes

AI-generated images are getting good. Here's how to use them effectively.

**Nano Banana Pro (via Gemini)** - Start here:
- Strengths: **Perfect text rendering**, free, integrated with Google
- Use for: Social graphics with headlines, infographics, localized ads
- Why it matters: Other AI tools produce garbled text. This one doesn't.
- Tip: Upload up to 14 reference images (logo, colors, style) for brand consistency

**ChatGPT + DALL-E:**
- Strengths: Fast iteration, conversational refinement, good enough for most uses
- Use for: Concept exploration, presentation visuals, quick mockups
- Tip: "Edit this image to..." actually works now

**Midjourney:**
- Strengths: Highest artistic quality, strong style control
- Use for: Hero images, brand visuals, anything client-facing
- Requires: Discord account, subscription ($10+/month)

**Prompt structure that works:**
> "[Subject], [style], [lighting], [composition], [mood]"

Example:
> "A marketing team collaborating around a modern conference table, minimalist corporate photography style, soft natural lighting from large windows, shot from slightly above, energetic and productive mood"

**What AI images are good for:**
- Concept mockups and ideation
- Social media visuals
- Presentation graphics
- Blog featured images
- Internal communications

**What AI images are NOT good for (yet):**
- Consistent brand characters across multiple images
- Specific product photography
- Legally sensitive uses (check rights)

**Note**: Text in images used to be a major limitation. Nano Banana Pro has largely solved this - use it when you need readable text in your graphics.

**Quick Win**: Generate 3 hero image concepts for your next campaign or presentation. Pick the best direction and refine it with follow-up prompts.

---

### Lesson 3.2: Brand Consistency with AI
**Duration**: 15 minutes

The challenge: AI creates beautiful images that look nothing like your brand.

**Creating AI-friendly brand guidelines:**

Document these specifically for AI prompts:
- Color palette (with hex codes AND descriptive names)
- Visual style (e.g., "minimalist corporate", "warm and approachable", "bold and modern")
- Photography style (e.g., "candid, natural lighting, diverse subjects")
- What to avoid (e.g., "no stock photo clichés, no dark/moody imagery")

**Reference image technique:**
> "Create an image in the style of this reference [upload image]. Match the color palette, lighting style, and overall mood."

**Style locking prompts:**
> "Using our brand style - minimalist, warm orange (#F97316) accents, natural lighting, diverse professionals - create..."

**Building a visual prompt library:**
Save prompts that worked:
- Hero image style: "[your tested prompt]"
- Social graphic style: "[your tested prompt]"
- Blog image style: "[your tested prompt]"

**Quick Win**: Document your visual brand in AI-ready format. Create a one-page "AI Visual Brief" with style descriptors, color references, and example prompts.

---

### Lesson 3.3: Figma + AI Workflow
**Duration**: 15 minutes

Figma is where designs happen. AI plugins make it faster.

**Coming soon: Figma Weavy**
Figma acquired Weavy (an AI creative platform) in October 2025. Once integrated, it will bring AI image and video generation directly into Figma. For now, it's a standalone tool at weavy.ai - worth watching but not essential yet.

**Useful AI plugins for Figma (available now):**

*Magician* - Generate icons, images, copy directly in Figma
*Diagram (Genius)* - Turn rough sketches into polished designs
*Content Reel* - AI-generated realistic placeholder content

**Use cases:**

*Generating variations:*
- Design one hero section
- Use AI to generate 5 alternative layouts
- Cherry-pick the best elements from each

*Copy generation:*
- Select a text box
- AI generates contextually appropriate copy
- Iterate on tone and length

*Icon creation:*
- Describe what you need
- AI generates custom icons matching your style
- No more hunting through icon libraries

**Limitations to know:**
- AI won't replace designers (yet)
- Generated designs often need human refinement
- Best for speed and exploration, not final output

**Quick Win**: Install one Figma AI plugin (Magician is a good start). Use it on your next design task. Note what works and what doesn't.

---

### Lesson 3.4: Video, Voice & Motion Graphics
**Duration**: 20 minutes

Video requires two things: visuals and voice. AI now handles both.

---

**PART 1: AI Voice with ElevenLabs**

ElevenLabs is the leading voice AI platform. It turns text into natural-sounding speech that doesn't sound robotic.

**Why this matters for marketing:**
- Video is king. But voice recording is a bottleneck.
- ElevenLabs eliminates that bottleneck for $11/month.
- Research shows 23% conversion improvement with optimized voice delivery.

**Key features:**
- 5,000+ voices in 70+ languages
- Emotion control: Use markers like [excited], [concerned], [confident]
- Voice cloning: Create a digital version of your brand voice
- Multilingual: Same voice, different languages (no re-recording)

**Use cases for marketing:**
- Video narration for product explainers and tutorials
- Podcast intros and outros
- Social media content (TikTok, Reels, Shorts)
- A/B testing different voice styles
- Multilingual content without hiring voice actors

**Pricing (December 2025):**
| Plan | Characters/Month | Best For |
|------|------------------|----------|
| Free | 10,000 (~12 min audio) | Testing and exploration |
| Creator | 100,000 ($11/month) | Regular content creators |
| Independent | 500,000 | High-volume production |

**Pro tip**: Budget 3x more characters than you think. You pay for failed generations and revisions too.

**Quick Win**: Try the free tier. Generate a 30-second narration for a product video or podcast intro. Compare it to your current process.

---

**PART 2: AI Video Generation**

AI video is evolving fast. Here's what's actually usable today.

**Current tools:**
- **Runway Gen-3**: Best for realistic motion, good at specific styles
- **Pika**: Strong at stylized content, good iteration speed
- **Sora** (OpenAI): Most capable, limited availability
- **HeyGen/Synthesia**: AI avatars for talking-head videos

**Realistic expectations:**

What AI video CAN do well:
- B-roll footage (nature, cityscapes, abstract motion)
- Social media clips (5-15 seconds)
- Concept visualization
- Motion backgrounds

What AI video CANNOT do well (yet):
- Consistent characters across scenes
- Complex narratives
- Brand-specific product footage
- Anything requiring precise control

**Best use cases for marketing:**
- Social media visual content
- Presentation backgrounds
- Email animated elements
- Concept pitches (before investing in real production)

**Quick Win**: Create one 5-second social clip with Runway or Pika. Add ElevenLabs narration. You've just made a complete video asset without recording anything.

---

### Module 3 Quiz

Questions covering:
- Prompt improvement exercises
- Brand consistency scenarios
- Tool selection for different visual outputs

---

## Module 4: Data & Systems
*"The Invisible Infrastructure"*

**Duration**: 50 minutes
**Prerequisite**: Module 2 (Communication & Workflow)
**XP Reward**: 50

### Lesson 4.1: CRM + AI - The Power Combo
**Duration**: 15 minutes

Your CRM probably has AI features you're not using. Time to change that.

**AI features in modern CRMs:**

*HubSpot AI:*
- Email writing assistance
- Call transcription and summaries
- Predictive lead scoring
- Content recommendations

*Salesforce Einstein:*
- Opportunity insights and predictions
- Automated activity capture
- Next best action recommendations
- Email and conversation intelligence

*Common AI capabilities across CRMs:*
- **Lead scoring**: AI ranks leads by likelihood to convert
- **Email insights**: Suggested send times, open prediction
- **Activity logging**: Auto-captures emails, calls, meetings
- **Forecasting**: Predicts deal outcomes and revenue

**Quick implementation wins:**
1. Enable AI lead scoring if available
2. Turn on email send-time optimization
3. Set up automated activity capture
4. Review AI-generated insights weekly

**What to watch for:**
- AI predictions need data - they improve over time
- Don't blindly trust scores - use them as one input
- Review AI recommendations, don't auto-apply them

**Quick Win**: Log into your CRM today. Find one AI feature you haven't enabled. Turn it on.

---

### Lesson 4.2: Databases Demystified
**Duration**: 10 minutes

Stop putting everything in spreadsheets. Know when you need what.

**Spreadsheets** (Excel, Google Sheets)
- Best for: Quick analysis, small datasets, one-time calculations
- Limits: Gets messy over 1000 rows, collaboration is clunky, no relationships
- AI features: Google Sheets AI can analyze and visualize, Excel Copilot can write formulas

**Databases** (Airtable, Notion, Coda)
- Best for: Structured data, collaboration, automation triggers, linked records
- When to switch: Multiple people editing, data relationships needed, automation wanted
- AI features: Airtable AI can generate summaries, Notion AI can query your data

**CRMs** (HubSpot, Salesforce, etc.)
- Best for: Customer/prospect data specifically
- Always use for: Contact management, deal tracking, customer communication
- Don't use for: Non-customer data (use a database instead)

**Decision flow:**
1. Is it customer/prospect data? → CRM
2. Does it need relationships between records? → Database
3. Is it temporary analysis? → Spreadsheet

**Quick Win**: Identify one messy spreadsheet that should be a database. Move it to Airtable or Notion this week.

---

### Lesson 4.3: AI-Powered Research & Competitive Intel
**Duration**: 15 minutes

Keeping up with competitors and industry trends is endless work. AI makes it manageable.

**Automated competitor monitoring:**

Set up AI-assisted tracking:
> "Summarize any news about [competitor] from the past week, focusing on: product launches, pricing changes, leadership changes, and major partnerships."

Tools that help:
- Perplexity Pro: Real-time web search with summaries
- ChatGPT with browsing: Can research current information
- Feedly + AI: RSS feeds with AI summaries

**Industry trend analysis:**
> "Based on recent news and reports, what are the top 3 emerging trends in [your industry] that marketing leaders should be aware of? Include specific examples and potential implications."

**Report and whitepaper summarization:**
When a 50-page industry report drops:
> "Summarize this report in 1 page. Highlight:
> - Key statistics and their implications
> - Trends relevant to B2B marketing
> - Actionable recommendations
> - Anything that contradicts conventional wisdom"

**Building a competitive intel routine:**
- Weekly: AI-summarized competitor news
- Monthly: Industry trend synthesis
- Quarterly: Deep-dive competitive analysis

**Quick Win**: Set up a weekly AI-assisted competitor monitoring workflow. Start with your top 2 competitors.

---

### Lesson 4.4: Analytics & Reporting with AI
**Duration**: 10 minutes

Stop staring at dashboards hoping insights will appear. Ask AI to find them.

**Natural language queries:**
Modern analytics tools (Looker, Tableau, even Google Analytics) increasingly support asking questions in plain English:
> "Show me our top performing campaigns last quarter by revenue generated"
> "Which landing pages have the highest bounce rate?"
> "Compare this month's email performance to the same period last year"

**AI-generated insights:**
Many tools now surface insights automatically:
- Anomaly detection: "Email open rates dropped 15% this week"
- Trend identification: "Mobile traffic share has increased 3 consecutive months"
- Correlation suggestions: "Pages with video have 40% longer session duration"

**Making AI work with your data:**
Even without fancy tools, you can:
1. Export data to CSV
2. Upload to Claude or ChatGPT
3. Ask: "Analyze this marketing data. What patterns do you see? What's working? What should we investigate?"

**Dashboard creation assistance:**
> "I need to create a monthly marketing dashboard for leadership. What metrics should I include? How should I organize them? What visualizations work best for each?"

**Quick Win**: Take your latest campaign data. Upload it to an AI and ask it to find patterns and insights. Compare what it finds to your own analysis.

---

### Module 4 Quiz

Questions covering:
- CRM + AI integration scenarios
- Database vs spreadsheet decisions
- Research workflow optimization

---

## Module 5: Marketing Operations
*"Your AI-Enhanced Machine"*

**Duration**: 65 minutes
**Prerequisite**: Module 3 (Visual & Creative) AND Module 4 (Data & Systems)
**XP Reward**: 50

### Lesson 5.1: Landing Pages in Hours, Not Weeks
**Duration**: 15 minutes

A landing page that takes 2 weeks to ship is a landing page that's 2 weeks late.

**AI copywriting workflow:**

*Headlines:*
> "Generate 10 headlines for a landing page selling [product] to [audience].
> Requirements: Under 10 words, benefit-focused, no clichés.
> Include variations: question-based, statement, how-to, number-based"

*Body copy:*
> "Write landing page body copy for [product].
> Structure: Problem → Agitation → Solution → Proof → CTA
> Tone: Confident but not pushy
> Length: 300 words max"

*CTAs:*
> "Generate 5 CTA button variations for [action].
> Mix of: Action-focused, benefit-focused, urgency-based"

**A/B test hypothesis generation:**
> "Looking at this landing page copy, suggest 5 A/B tests we should run. For each, explain the hypothesis and expected impact."

**Layout and design suggestions:**
> "For a landing page targeting [audience] selling [product], recommend:
> - Above-the-fold elements
> - Social proof placement
> - Form length and fields
> - Mobile-specific considerations"

**Quick Win**: For your next landing page, generate 10 headline variations with AI. Test the top 2 against each other.

---

### Lesson 5.2: SEO in the AI Era
**Duration**: 15 minutes

SEO isn't dead, but it's changing. Here's how AI fits in.

**AI-assisted keyword research:**
> "I'm creating content about [topic] for [audience].
> Suggest:
> - 5 primary keywords (high intent, reasonable volume)
> - 10 long-tail variations
> - 5 questions people ask about this topic
> - Related topics for internal linking"

**Content optimization:**
> "Review this blog post for SEO. Suggest improvements for:
> - Title tag and meta description
> - Header structure (H1, H2, H3)
> - Keyword placement (without stuffing)
> - Internal linking opportunities
> - Content gaps vs. competing articles"

**Search intent analysis:**
> "For the keyword [keyword], what's the search intent? What does someone searching this actually want to find? What content format would best serve them?"

**The balance: AI-written vs human-edited**
- AI can draft: SEO-optimized structure, keyword integration, meta descriptions
- Humans must add: Unique insights, original examples, genuine expertise
- Google rewards: Helpful content that demonstrates experience

**Quick Win**: Take an existing page that's underperforming in search. Run it through AI optimization suggestions. Implement the top 3 recommendations.

---

### Lesson 5.3: Marketing Automation Flows
**Duration**: 20 minutes

Automation handles the repetitive. AI makes it intelligent.

**AI-triggered sequences:**

Move beyond basic triggers:
- Old: "If opens email, send follow-up in 3 days"
- New: "If engagement score increases by 20% this week, move to high-intent sequence"

Behavioral triggers AI can power:
- Predicted lead scoring changes
- Content consumption patterns
- Website behavior anomalies
- Optimal send time per contact

**Personalization at scale:**

*Dynamic content blocks:*
> "Create 3 versions of this email paragraph:
> 1. For prospects in exploration phase
> 2. For prospects comparing vendors
> 3. For prospects ready to buy
> Keep the core message consistent but adjust urgency and detail level."

*Subject line personalization:*
> "Generate 5 subject line formulas that can be personalized with [first name], [company], [industry], or [recent action]"

**Predictive send times:**
Most automation platforms now offer AI-optimized send times. Enable them.

**When to stay human:**
- High-value accounts: Personal touch matters more than efficiency
- Crisis/sensitive situations: Automation can't read the room
- Complex negotiations: Nuance gets lost in automation

**Quick Win**: Review your top-performing automation flow. Add one AI-powered element: dynamic content, predicted send time, or smart segmentation.

---

### Lesson 5.4: Campaign Analytics & Attribution
**Duration**: 15 minutes

Understanding what worked is as important as making things work.

**AI pattern recognition:**
Upload your campaign data and ask:
> "Analyze this campaign performance data. Identify:
> - Which channels/tactics outperformed expectations
> - Which underperformed and possible reasons
> - Correlations between variables I might have missed
> - Recommendations for next campaign"

**Predictive performance modeling:**
> "Based on historical campaign data, if we increase [channel] spend by 20%, what performance should we expect? What factors could invalidate this prediction?"

**Natural language reporting:**
Create reports that leadership actually reads:
> "Turn this campaign data into an executive summary:
> - Lead with the business impact (revenue, pipeline)
> - Include one key learning
> - End with one clear recommendation
> - Keep it under 200 words"

**Attribution model selection:**
> "Explain the difference between first-touch, last-touch, linear, and data-driven attribution in plain English. Which would you recommend for a B2B company with a 90-day sales cycle and why?"

**Quick Win**: After your next campaign ends, feed all the data to an AI. Ask it to explain performance in plain English, as if presenting to your CEO.

---

### Module 5 Quiz

Questions covering:
- Landing page optimization decisions
- Automation trigger scenarios
- Attribution model selection

---

## Module 6: AI Agents & Delegation
*"From Executor to Orchestrator"*

**Duration**: 50 minutes
**Prerequisite**: Module 5 (Marketing Operations)
**XP Reward**: 75

This module covers the biggest shift in AI since chatbots: the rise of agents. Understanding what agents are—and what you can delegate to them—is essential for any marketing director in 2025.

### Lesson 6.1: What Are AI Agents?
**Duration**: 10 minutes

Agents are different from chatbots and AI assistants. Understanding the difference changes how you work.

**The three levels:**

| Type | What It Does | Your Role | Example |
|------|--------------|-----------|---------|
| **Chatbot** | Answers questions from a script | Ask simple questions | "What are your business hours?" |
| **AI Assistant** | Generates content on demand | Direct each task | "Write me an email about X" |
| **AI Agent** | Plans and executes multi-step tasks toward a goal | Set the goal, review results | "Improve our email open rates" |

**The key difference:**
- Chatbots respond to questions
- AI assistants generate what you ask for
- AI agents **act** toward goals without constant direction

**What agents can do:**

An AI agent given "improve our email open rates" might:
1. Analyze your recent email performance data
2. Research best practices for your industry
3. Identify patterns in high-performing subject lines
4. Generate 10 new subject line variations
5. Set up A/B tests
6. Monitor results
7. Report back with recommendations

All without you directing each step.

**Why this matters for you:**

Your role is shifting from "doing marketing tasks" to "orchestrating AI systems that do marketing tasks." This isn't about replacement—it's about leverage. One person with agents can do what previously required a team.

**Quick Win**: Identify one multi-step task you do repeatedly. Write down each step. This is a potential agent candidate.

---

### Lesson 6.2: What You Can Delegate Today
**Duration**: 15 minutes

Not everything can be delegated to agents. Here's what's realistic right now.

**Ready to delegate (high confidence):**

| Task Type | Examples | Why It Works |
|-----------|----------|--------------|
| **Research** | Competitive monitoring, trend scanning, customer review analysis | Well-defined, low-stakes, data-gathering |
| **Content drafts** | Blog outlines, social posts, email variations | Clear parameters, easy to review |
| **Data operations** | CRM updates, list segmentation, lead enrichment | Repetitive, rule-based, predictable |
| **Monitoring** | Social listening, performance alerts, competitor tracking | 24/7 attention humans can't match |
| **Reporting** | Dashboard creation, metric summaries, trend detection | Pattern recognition at scale |

**Delegate with supervision (medium confidence):**

| Task Type | Examples | Why It Needs Oversight |
|-----------|----------|------------------------|
| **Campaign optimization** | Budget reallocation, bid adjustments | Set guardrails, review decisions |
| **Content personalization** | Audience-specific variations | Must align with brand guidelines |
| **Lead qualification** | Initial scoring and routing | Review edge cases |
| **A/B testing** | Test setup, result monitoring | Validate conclusions |

**Keep human-led (not ready for full delegation):**

| Task Type | Why |
|-----------|-----|
| Brand strategy and positioning | Requires judgment, creativity, context |
| Crisis communications | Stakes too high, nuance required |
| High-value client relationships | Human connection matters |
| Legal and compliance decisions | Accountability required |
| Creative concepts for major campaigns | Breakthrough ideas need human spark |

**The 90% rule:**

Agents work best when:
- Task predictability exceeds 90%
- Decision logic is simple and clear
- Outcomes are easy to verify
- Mistakes are easy to reverse

**Quick Win**: Pick one task from the "ready to delegate" list. This week, try using AI to complete it end-to-end. Note what worked and what needed fixing.

---

### Lesson 6.3: Human-in-the-Loop in Practice
**Duration**: 10 minutes

The goal isn't full automation. The goal is the right balance of AI speed and human judgment.

**The feedback loop that makes agents better:**

```
1. Agent does task
2. You review output
3. You provide feedback (approve, edit, or reject)
4. Agent learns your preferences
5. Next output is better
6. Repeat
```

This isn't extra work—it's training. Every edit you make improves future outputs.

**Practical checkpoints:**

**Before launch:**
- Approve the approach/strategy
- Review targeting and segments
- Check brand alignment

**During execution:**
- Spot-check a sample of outputs
- Monitor for anomalies
- Be available for edge cases

**After completion:**
- Review results vs expectations
- Identify what to adjust
- Update guidelines for next time

**Setting guardrails:**

Good guardrails are specific and measurable:
- "Never exceed $500/day ad spend without approval"
- "Flag any response mentioning competitors"
- "Escalate if sentiment score drops below 70"
- "Don't publish anything without human review"

Bad guardrails are vague:
- "Use good judgment" (what does that mean?)
- "Be careful" (with what?)
- "Don't do anything risky" (define risky)

**Quick Win**: For your next AI-assisted task, define 3 specific guardrails before starting. Write them down.

---

### Lesson 6.4: Getting Started with Agent Workflows
**Duration**: 15 minutes

You don't need to build complex systems. Start simple.

**Level 1: Single-purpose agents (start here)**

Use ChatGPT Custom GPTs or Claude Projects as basic agents:

*Competitive Intel Agent:*
- Instructions: "Monitor these 3 competitors. Weekly, summarize any pricing changes, new product launches, or major announcements."
- Input: Links to competitor websites and news feeds
- Output: Weekly briefing document

*Content Repurposing Agent:*
- Instructions: "Take any blog post I give you. Create 5 LinkedIn posts, 5 tweets, and 2 email snippets. Match our brand voice."
- Input: Brand guidelines + blog post
- Output: Ready-to-schedule content

*Campaign Analyzer Agent:*
- Instructions: "When I upload campaign data, analyze it and answer: What worked? What didn't? What should we do next?"
- Input: Campaign metrics CSV
- Output: Plain-English analysis

**Level 2: Connected agents (intermediate)**

Link agents to your tools using Zapier or built-in integrations:
- HubSpot AI agents for CRM automation
- Salesforce Einstein agents for sales intelligence
- Google Marketing Advisor for ad optimization

**Level 3: Custom automation (advanced)**

For those ready to go deeper:
- **Claude Code**: Build custom automations by describing what you want in plain English
- **Zapier AI Agents**: Connect thousands of apps with AI decision-making
- **Relevance AI**: No-code platform for building marketing agents

**The honest truth about Claude Code:**

Claude Code is Anthropic's command-line tool that can build automations from plain English descriptions. You don't need to know how to code—you describe what you want, and it builds it.

Real example from Anthropic's marketing team: They built a workflow that processes hundreds of ads, identifies underperformers, and generates new variations. What took hours now takes minutes.

But: There's a learning curve. Start with Levels 1 and 2 first. Come back to Claude Code when you've identified specific automation needs and are ready to invest time learning.

**Quick Win**: Create one Custom GPT or Claude Project that handles a specific, repeatable task. Use it for a week and refine the instructions based on what works.

---

### Lesson 6.5: Hype vs Reality Check
**Duration**: 5 minutes

Agent headlines promise revolution. Reality is more nuanced.

**What's real:**
- 79% of executives are implementing agents (real adoption is happening)
- Productivity gains of 3-5% annually are realistic
- Specific tasks can be 10x faster with good agent setup
- The shift from executor to orchestrator is real

**What's hype:**
- "Full strategic autonomy" - Agents can't develop comprehensive strategies alone
- "Creative breakthrough" - AI generates variations, not innovative concepts
- "End-to-end campaign management" - Always needs human oversight
- "Immediate 10x productivity" - Takes time to set up and refine

**The "agentwashing" problem:**

Many tools marketed as "AI agents" are just basic automation with an AI label. Ask vendors:
- What does this agent actually do autonomously?
- What human oversight is required?
- What happens when the agent encounters something unexpected?

**40% of agentic AI projects will fail by 2027.** Most failures come from:
- Unrealistic expectations
- Poor guardrails
- Trying to automate too much too fast
- Not investing in human oversight

**The winning mindset:**

Don't think "How can agents replace my team?"
Think "What repetitive tasks can I delegate so my team does higher-value work?"

**Quick Win**: The next time you see an "AI agent" tool, ask: "What specific tasks does this handle, and what still requires my attention?"

---

### Module 6 Quiz

Questions covering:
- Agent vs chatbot vs assistant distinctions
- Delegation decision scenarios
- Guardrail design
- Hype detection

---

## Module 7: Advanced & Strategic
*"Leading an AI-First Organization"*

**Duration**: 60 minutes
**Prerequisite**: Module 6 (AI Agents & Delegation) + 80% course completion
**XP Reward**: 100 (bonus)

### Lesson 7.1: Building an AI-Ready Team
**Duration**: 15 minutes

Your AI journey isn't just personal. It's organizational.

**Assessing current AI maturity:**

Rate your team (1-5) on:
- Awareness: Do they know what AI can do?
- Access: Do they have tools available?
- Ability: Can they use AI effectively?
- Adoption: Are they actually using it regularly?

**Training prioritization - who learns what first:**

*Start here (everyone):*
- Basic prompting skills
- Data safety and compliance
- One tool mastery (choose based on role)

*Then expand (by role):*
- Content creators: Image generation, writing assistance
- Analysts: Data analysis, reporting automation
- Campaign managers: Automation, optimization

*Advanced (champions):*
- Custom assistants and workflows
- Tool evaluation and testing
- Training others

**Creating internal champions:**
- Identify early adopters (they're already experimenting)
- Give them time and permission to explore
- Have them document what works
- Let them train others (peer learning beats top-down)

**Overcoming resistance:**
Common objections and responses:
- "It'll take my job" → "It'll take your boring tasks"
- "I don't have time to learn" → "15 minutes a day, 2 weeks to competence"
- "The output isn't good enough" → "It's a draft assistant, not a replacement"

**Quick Win**: Identify your top 3 AI champions in your team. Schedule 30 minutes with each to learn what they're already doing.

---

### Lesson 7.2: Vendor & Tool Evaluation
**Duration**: 15 minutes

Everyone wants to sell you AI. Here's how to buy smart.

**Questions to ask AI vendors:**

*About the technology:*
- What model(s) power this? How often do you update?
- Can we use our own data to customize? Who sees that data?
- What happens to our data? Is it used for training?

*About implementation:*
- What's required from our side? IT resources? Data prep?
- How long to see value? (Beware of "6-12 months")
- What does success look like? How do you measure it?

*About the company:*
- How long have you been in market?
- What happens if you get acquired or shut down?
- Who are your most similar customers? Can we talk to them?

**Red flags and hype detection:**
- "Our AI is unlike anything else" → Probably not true
- "10x productivity immediately" → Probably not for everyone
- No clear pricing → Expensive and/or predatory
- Can't explain how it works → They don't know either
- No customer references → You're the guinea pig

**Build vs buy decision framework:**
Build when: Core to your competitive advantage, you have engineering resources, existing tools don't fit
Buy when: Commodity capability, need it fast, vendor has domain expertise

**Pilot program structure:**
1. Define success metrics BEFORE starting
2. Small team, limited scope, 30-60 days
3. Weekly check-ins on what's working/not
4. Go/no-go decision based on data, not feelings

**Quick Win**: Create an AI vendor evaluation scorecard with 10 criteria. Use it for your next tool evaluation.

---

### Lesson 7.3: Your 90-Day AI Roadmap
**Duration**: 15 minutes

Strategy without a timeline is just a wish. Here's how to make it real.

**Days 1-30: Foundation**

Week 1-2:
- Personal tool mastery (pick one, get good)
- Data safety training for team
- Audit current AI usage (what's already happening?)

Week 3-4:
- Identify top 3 use cases by impact and ease
- Start pilot with first use case
- Document early wins and learnings

**Days 31-60: Integration**

Week 5-6:
- Expand to second and third use cases
- Create first custom assistants/workflows
- Begin team training program

Week 7-8:
- Integrate AI into existing processes (not as add-on)
- Set up measurement systems
- Gather feedback from team

**Days 61-90: Optimization**

Week 9-10:
- Review metrics from pilots
- Kill what's not working, double down on what is
- Expand successful use cases to broader team

Week 11-12:
- Formalize AI guidelines and best practices
- Plan next quarter's initiatives
- Share results with leadership

**Measurement approach:**
Track:
- Time saved (hours per week per person)
- Output increased (content pieces, campaigns, etc.)
- Quality improvement (engagement, conversion, etc.)
- Adoption rate (% of team using AI regularly)

**Quick Win**: Draft your first 30-day plan right now. List the 3 specific things you'll accomplish.

---

### Lesson 7.4: Staying Current
**Duration**: 15 minutes

AI moves fast. Here's how to keep up without burning out.

---

**TIER 1: Daily Updates (3 minutes/day)**

These newsletters are short, actionable, and filter out the noise:

| Newsletter | What It Is | Why Subscribe |
|------------|------------|---------------|
| **Superhuman AI** | Daily digest by Zain Kahn (1.5M+ subscribers) | 3-minute read, practical focus, filters hype |
| **The Neuron** | Daily AI updates (550K+ subscribers) | Business efficiency focus, quick actionable tips |

Pick one. Read it with your morning coffee. That's enough for daily awareness.

---

**TIER 2: Weekly Deep Dives (15-20 min/week)**

These go deeper on strategy and implementation:

| Newsletter | What It Is | Best For |
|------------|------------|----------|
| **Marketing AI Institute** | Paul Roetzer's marketing-specific AI newsletter | Marketing directors specifically - this is your gold standard |
| **Every.to (Chain of Thought)** | Dan Shipper on practical AI implementation | Understanding how to build AI into workflows |
| **The Batch** | Andrew Ng's weekly AI newsletter | Authoritative, balanced perspective from an AI pioneer |
| **Ethan Mollick (One Useful Thing)** | Wharton professor testing AI in real work | Research-backed insights on AI productivity |

Subscribe to 2-3. Set aside 15 minutes on Sunday evening or Monday morning.

---

**TIER 3: Strategic Understanding (Monthly)**

Podcasts for deeper thinking about where AI is heading:

| Podcast | What It Is | When To Listen |
|---------|------------|----------------|
| **Dwarkesh Patel** | Long-form interviews with AI leaders (Zuckerberg, Sutskever, Nadella) | When you want to understand AI's 5-10 year trajectory |
| **The AI in Business Podcast** | Emerj's podcast on AI ROI for executives | When evaluating AI investments and strategy |
| **Practical AI** | Accessible explanations of AI concepts | When you need to understand how things work |

Listen during commute or exercise. One episode per week is plenty.

---

**What to avoid:**

- Most LinkedIn "AI influencers" - Often outdated, recycled, or wrong
- Hype-driven tech news - Clickbait over substance
- Anyone promising "secrets" or "hacks" - There are no secrets
- Daily AI tools lists - Tool overload doesn't help

---

**Your learning routine:**

| Frequency | Activity | Time |
|-----------|----------|------|
| Daily | Scan one newsletter | 3 min |
| Weekly | Read one deep-dive newsletter | 15 min |
| Weekly | Try one new thing in a tool you use | 10 min |
| Monthly | Listen to one podcast episode | 60 min |
| Quarterly | Review your AI toolstack | 30 min |

**Total: ~2 hours per month** to stay genuinely current.

---

**When to adopt new tools vs wait:**

**Adopt early when:**
- Free or cheap to try
- Low risk, easy to reverse
- Clear productivity gain
- You can learn before competitors do

**Wait when:**
- Expensive or complex implementation
- The technology is changing weekly
- Your competitors can be guinea pigs for you
- No clear use case for your work

---

**Quick Win**: Right now, subscribe to Marketing AI Institute and one daily newsletter (Superhuman AI or The Neuron). Unsubscribe from anything that's mostly hype.

---

### Module 7 Quiz

Questions covering:
- Team readiness assessment
- Vendor evaluation scenarios
- Roadmap prioritization

---

## Appendix: Quick Reference

### Data Safety Checklist
- [ ] No customer PII
- [ ] No financial data
- [ ] No contracts or legal docs
- [ ] No passwords or credentials
- [ ] No unreleased product info
- [ ] Anonymized where possible
- [ ] Using approved tool tier

### RCTF Prompt Template
```
Role: You are [role with expertise]

Context: [Situation, background, constraints]

Task: [Specific request]

Format: [How output should be structured]
```

### Tool Quick Reference

| Need | Tool | Notes |
|------|------|-------|
| Real-time research | ChatGPT 5.2 | Web access, plugins |
| Long document analysis | Claude Opus 4.5 | Best for reports, contracts |
| Google Workspace integration | Gemini 3.0 Pro | Works with Docs, Sheets, Gmail |
| **Images with text** | **Nano Banana Pro** | Free, perfect text rendering |
| Highest quality images | Midjourney | $10+/month, Discord required |
| Quick image concepts | DALL-E (via ChatGPT) | Fast iteration |
| **Voice AI** | **ElevenLabs** | $11/month for serious use |
| Video clips | Runway, Pika | 5-15 second clips |
| Talking-head videos | HeyGen, Synthesia | AI avatars |
| Sensitive data | Local models (Qwen, Llama) | Self-hosted |
| **Automation** | **Claude Code** | Advanced - for power users |

### Agent Delegation Checklist

**Before delegating a task to an AI agent, check:**

- [ ] Task is repetitive (done weekly or more often)
- [ ] Outcomes are predictable (>90% of the time)
- [ ] Mistakes are easy to catch and reverse
- [ ] Decision logic can be clearly defined
- [ ] Success can be measured objectively

**Set guardrails before starting:**

- [ ] Defined what the agent CAN do
- [ ] Defined what the agent CANNOT do
- [ ] Set approval thresholds (e.g., budget limits)
- [ ] Established escalation triggers
- [ ] Planned review checkpoints

**Don't delegate (keep human-led):**

- [ ] Brand strategy and positioning
- [ ] Crisis communications
- [ ] High-value client relationships
- [ ] Legal/compliance decisions
- [ ] Novel creative concepts

### Human-in-the-Loop Decision Matrix

| Task Characteristic | Recommended Approach |
|---------------------|---------------------|
| Repetitive + low stakes | Full automation, spot-check weekly |
| Variable + low stakes | AI drafts, human quick review |
| Repetitive + high stakes | AI executes with guardrails, human monitors |
| Variable + high stakes | Human-led, AI assists |

### Learning Resources Quick List

**Daily (3 min):** Superhuman AI or The Neuron

**Weekly (15 min):** Marketing AI Institute, Every.to, The Batch

**Monthly (1 hr):** Dwarkesh Patel, AI in Business Podcast

### 90-Day Milestones
- Day 30: Personal mastery, team trained on basics, first pilot running
- Day 60: 3 use cases active, custom workflows created, measurement in place
- Day 90: AI integrated into processes, guidelines documented, next quarter planned
