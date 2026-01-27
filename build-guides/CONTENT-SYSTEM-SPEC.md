# Build Guide Content System Spec

A complete automation system for recording, processing, and distributing daily build guide content. Single button to deploy, single button to record, single button to launch.

**Time budget:** 4 hours/day, 20 hours/week
**Publishing cadence:** 7 days/week
**Goal:** Build distribution, generate goodwill, create owned assets

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Weekly Schedule](#weekly-schedule)
3. [Recording System](#recording-system)
4. [Processing Pipeline](#processing-pipeline)
5. [Distribution Pipeline](#distribution-pipeline)
6. [Tracking & Metrics](#tracking--metrics)
7. [Comment Response System](#comment-response-system)
8. [Open Source Strategy](#open-source-strategy)
9. [Tools & Services](#tools--services)
10. [n8n Workflow Architecture](#n8n-workflow-architecture)
11. [Data Model](#data-model)
12. [Expected Metrics & ROI](#expected-metrics--roi)
13. [Implementation Phases](#implementation-phases)
14. [Apps to Build](#apps-to-build)

---

## System Overview

### The Core Loop

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RECORDING SESSION                                  │
│                                                                             │
│  [Launch App] → [Randomizer selects build guide] → [Countdown timer]        │
│       → [Screen Studio records] → [Files to watched folder]                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PROCESSING (Automated)                             │
│                                                                             │
│  [Transcription] → [AI Content Generation] → [Video Processing]             │
│       → [Shorts Extraction] → [Content Package Ready]                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DISTRIBUTION (Automated)                           │
│                                                                             │
│  [Blog Post → Website + Substack] → [YouTube Main + Shorts]                 │
│       → [TikTok] → [Twitter + LinkedIn] → [Git Push]                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TRACKING & ENGAGEMENT                              │
│                                                                             │
│  [Metrics Dashboard] → [Comment Notifications] → [Weekly Newsletter]        │
│       → [Performance Analysis] → [Iterate]                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Single Button Philosophy

| Button | Action | When |
|--------|--------|------|
| **Launch & Record** | Opens app, starts Screen Studio recording, shows randomizer | Start of session (recording captures the intro) |
| **Start Build** | Button below timer - begins countdown, signals "let's go" | After seeing the challenge (this is part of the video) |
| **Stop** | Ends recording, triggers screenshot prompt, then automation pipeline | End of session |

**Key insight:** The randomizer selection IS the intro. Viewers see you discover the challenge in real-time. Recording starts before the random selection, not after.

---

## Weekly Schedule

### Time Budget: 20 hours/week

#### Recording Days (Monday - Thursday)

| Time Block | Duration | Activity |
|------------|----------|----------|
| Morning (2h) | 2 hours | Batch record 2-3 sessions |
| Afternoon (1h) | 1 hour | Review/approve processed content |
| Evening (30min) | 30 min | Respond to comments, check metrics |
| **Daily Total** | **3.5h** | |

#### Admin Days (Friday - Sunday)

| Day | Duration | Activity |
|-----|----------|----------|
| Friday (2h) | 2 hours | Review week's performance, respond to comments, plan next week's focus |
| Saturday (1h) | 1 hour | Newsletter prep (AI-assisted), community engagement |
| Sunday (1h) | 1 hour | Light engagement, comment responses, rest |

#### Weekly Breakdown

| Activity | Hours/Week |
|----------|------------|
| Recording sessions | 8h (2h × 4 days) |
| Review/approval | 4h (1h × 4 days) |
| Comment responses | 3.5h (30min × 7 days) |
| Metrics/planning | 2h (Friday) |
| Newsletter/community | 2h (Sat + Sun) |
| Buffer | 0.5h |
| **Total** | **20h** |

### Batch Recording Strategy

**Why batch:** Recording 2-3 sessions back-to-back is more efficient than single sessions. You're already "on" - camera ready, energy up, setup done.

**Batch structure:**
- Session 1: ~35 min recording
- 5 min break (water, notes)
- Session 2: ~35 min recording
- 5 min break
- Session 3 (optional): ~35 min recording

**Output per batch:** 2-3 videos → 8-15 shorts → 2-3 blog posts → 2-3 social threads

**Weekly batches:** 4 batch sessions → 8-12 videos in queue

**Publishing buffer:** Always maintain 3-7 days of content in queue. This allows for sick days, travel, or inspiration strikes.

---

## Recording System

### Pre-Recording Setup (One-Time)

1. **Screen Studio Configuration**
   - Resolution: 1920x1080 (YouTube standard)
   - Camera overlay: Bottom right, circular, ~20% of frame
   - Zoom effects: Subtle on key moments
   - Audio: External mic preferred, internal acceptable
   - Export preset: H.264, high quality

2. **Environment**
   - Consistent background (or blur)
   - Good lighting (ring light or window)
   - Quiet space
   - Water nearby

3. **Browser Setup**
   - Claude.ai tab ready
   - VS Code / Cursor open
   - Relevant docs if needed
   - Notifications off

### The Recording App (To Build)

A simple macOS/Electron app that orchestrates the recording session.

#### Features

1. **Build Guide Randomizer**
   - Pulls from the 28 build guides (expandable)
   - Weighted selection (can prioritize untouched or high-interest guides)
   - Displays: Guide name, one-liner, full prompt
   - "Re-roll" button if needed
   - Tracks which guides have been recorded

2. **Countdown Timer**
   - Visible on screen during recording (adds tension, accountability)
   - Default: 30 minutes
   - Configurable: 20, 30, 45, 60 min
   - Visual/audio alert at 5 min, 1 min remaining
   - Shows elapsed time after target

3. **Session Metadata Capture**
   - Session ID (auto-generated)
   - Build guide name
   - Category
   - Start timestamp
   - Custom notes (optional)

4. **Recording Triggers**
   - "Launch & Record" button → opens app AND triggers Screen Studio immediately
   - "Start Build" button (below timer) → begins countdown, signals start of build
   - "Screenshot" button → captures current screen (for finished product)
   - "Stop Recording" button → stops Screen Studio, saves to watched folder
   - Keyboard shortcuts for hands-free operation:
     - `Cmd+Shift+R` → Launch & Record
     - `Cmd+Shift+S` → Start Build
     - `Cmd+Shift+P` → Screenshot
     - `Cmd+Shift+X` → Stop Recording

5. **Screenshot Capture**
   - Button and keyboard shortcut available during recording
   - Captures full screen or app window (configurable)
   - Saves to session folder as `screenshot.png`, `screenshot-02.png`, etc.
   - Visual/audio feedback confirms capture
   - Used for thumbnail, blog hero, social images

6. **Post-Recording**
   - Confirms files saved (video + screenshots)
   - Shows "Processing started" notification
   - Option to start next session immediately (batch mode)

#### App Data Storage

```
~/lemonbrand-content/
├── sessions/
│   └── 2026-01-24-proposal-generator/
│       ├── metadata.json
│       ├── raw-video.mov
│       ├── screenshot.png           # Finished product screenshot
│       ├── screenshot-02.png        # Additional screenshots (optional)
│       ├── transcript.json
│       ├── content-package.json
│       └── exports/
│           ├── main-video.mp4
│           ├── thumbnail.png        # Generated from screenshot
│           ├── short-01.mp4
│           ├── short-02.mp4
│           ├── short-03.mp4
│           ├── short-04.mp4
│           └── short-05.mp4
├── queue/
│   ├── youtube/
│   ├── youtube-shorts/
│   ├── tiktok/
│   └── blog/
└── published/
    └── 2026-01-24-proposal-generator/
        └── urls.json               # All published URLs for this session
```

### Recording Flow

```
1. Click "Launch & Record"
   - App opens
   - Screen Studio STARTS RECORDING immediately
   - This captures the intro
       │
       ▼
2. Randomizer animates and selects build guide (ON CAMERA)
   - Shows: "proposal-generator"
   - Shows: "Meeting notes → professional proposal"
   - Shows: Full prompt from markdown file
   - Your reaction is the hook
       │
       ▼
3. Click "Accept" or "Re-roll" (on camera)
   - Re-roll also captured (adds authenticity)
       │
       ▼
4. Timer displays below the challenge
   - "Start Build" button prominently visible below timer
       │
       ▼
5. Click "Start Build" (on camera)
   - Countdown begins (3... 2... 1...)
   - Timer starts counting up
   - This is the transition from intro to build
       │
       ▼
6. Build the thing, talk through it
   - 30 min target
   - Timer visible throughout
   - Timer alerts at 5 min, 1 min remaining
       │
       ▼
7. Finish the build, show it working
       │
       ▼
8. Click "Screenshot" button (or keyboard shortcut)
   - Captures the finished product
   - Used for: thumbnail, blog hero image, social posts
   - Can take multiple screenshots
       │
       ▼
9. Click "Stop" when done
   - Recording ends
   - Files save to watched folder
   - Automation pipeline triggers
       │
       ▼
10. "Start Next Session?" prompt (batch mode)
    - Yes → back to step 1
    - No → done for now
```

### The Video Structure (What Viewers See)

```
┌─────────────────────────────────────────────────────────────────┐
│ INTRO (0:00 - 0:30)                                             │
│                                                                 │
│ - App launches, randomizer spins                                │
│ - Challenge revealed: "Build a proposal generator"              │
│ - Your reaction: "Alright, let's do this"                       │
│ - Click "Start Build" - timer begins                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ THE BUILD (0:30 - 28:00)                                        │
│                                                                 │
│ - Timer visible (adds tension)                                  │
│ - Talk through what you're doing                                │
│ - Show the AI conversation                                      │
│ - Debug in real-time                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ THE PAYOFF (28:00 - 30:00)                                      │
│                                                                 │
│ - "Let's test it"                                               │
│ - Show it working                                               │
│ - Screenshot the finished product                               │
│ - Recap: "30 minutes, fully functional proposal generator"      │
│ - CTA: "Subscribe, link to blog post in description"            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Processing Pipeline

### Stage 1: Transcription (Immediate)

**Trigger:** New video file detected in watched folder

**Service:** Deepgram or AssemblyAI (fast, accurate, timestamped)

**Process:**
1. Extract audio from video (FFmpeg)
2. Send to transcription API
3. Receive transcript with word-level timestamps
4. Store in session folder

**Output:**
```json
{
  "text": "Full transcript text...",
  "words": [
    { "word": "Today", "start": 0.0, "end": 0.3 },
    { "word": "we're", "start": 0.3, "end": 0.5 },
    ...
  ],
  "duration": 1847.5
}
```

**Time:** ~2-3 minutes for 30 min video

### Stage 2: AI Content Generation

**Trigger:** Transcript ready

**Service:** Claude API (Sonnet for speed, Opus for quality)

**Single prompt, structured output:**

```
Given this transcript of a build guide video:
- Build guide: {name}
- Category: {category}
- Duration: {duration}

Generate all content derivatives:

1. BLOG_POST (markdown)
   - Title (SEO-optimized, includes "Build a [X] in 30 Minutes")
   - Meta description (155 chars)
   - Introduction (hook, what we're building, who it's for)
   - The Build (step-by-step with code blocks)
   - Key Takeaways (3-5 bullets)
   - Call to action (newsletter signup)

2. YOUTUBE_MAIN
   - Title (60 chars max, curiosity + clarity)
   - Description (with {BLOG_URL} placeholder)
   - Tags (10-15 relevant tags)

3. SHORTS (4-5 clips)
   For each short:
   - Hook (first 3 seconds text overlay)
   - Start timestamp
   - End timestamp
   - Suggested title
   - Why this moment works

4. SOCIAL_TWITTER
   - Thread (5-7 tweets)
   - Includes {YOUTUBE_URL} placeholder

5. SOCIAL_LINKEDIN
   - Single post (engaging, professional)
   - Includes {YOUTUBE_URL} placeholder

6. NEWSLETTER_BLURB
   - 2-3 sentence summary for weekly recap
```

**Output:** JSON content package stored in session folder

**Time:** ~30-60 seconds

### Stage 3: Video Processing (Descript)

**Trigger:** Content package ready

**Tool:** Descript (confirmed choice for V1 and likely beyond)

**Why Descript:**
- Transcript-based editing (edit video by editing text)
- Built-in captions with styling
- Templates for consistent intro/outro
- Easy short extraction
- Filler word removal
- Good enough quality without being a video editing rabbit hole

**Descript Workflow:**
1. Import raw video to Descript project
2. Transcript auto-generates (or import from Deepgram for speed)
3. Apply template:
   - Intro card (Lemonbrand branded)
   - Captions style (font, position, colors)
   - Outro card (subscribe CTA)
4. Light cleanup:
   - Remove obvious mistakes
   - Trim dead air
   - Cut filler words (optional, can leave for authenticity)
5. Export main video (1080p, H.264)
6. Create shorts:
   - Use AI-suggested timestamps from content package
   - Add hook text overlays
   - Export each short (9:16 aspect ratio for Shorts/TikTok)

**Descript Preset to Create:**
- Template name: "Lemonbrand Build Guide"
- Captions: White text, black outline, bottom center
- Intro: 3-second branded card
- Outro: 5-second subscribe CTA with links

**Output:**
- `main-video.mp4` (full video with intro/outro/captions)
- `short-01.mp4` through `short-05.mp4`

**Time estimate:** 15-30 min per video (mostly automated, light review)

### Stage 4: Asset Generation

**Screenshot (captured during recording):**
- Taken via app's screenshot button at end of build
- Shows the finished, working product
- Used for:
  - YouTube thumbnail (with text overlay added)
  - Blog hero image
  - Social post images
  - Open Graph preview image
- Stored in session folder as `screenshot.png` (and `screenshot-02.png`, etc. if multiple)

**Thumbnail:**
- Base: Screenshot of finished product
- Overlay: Title text, timer showing completion time
- Template in Figma/Canva
- Consistent style across all videos
- Export to session folder as `thumbnail.png`

**Blog images:**
- Primary: Screenshot from recording
- Secondary: Additional screenshots if needed during editing

---

## Distribution Pipeline

### Sequence (Order Matters)

```
1. Blog post → Lemonbrand website
   - Get published URL
       │
       ▼
2. Blog post → Substack
   - Cross-post for email subscribers
       │
       ▼
3. Update YouTube description with blog URL
       │
       ▼
4. YouTube main video upload
   - Title, description, tags, thumbnail
   - Schedule or publish immediately
       │
       ▼
5. YouTube Shorts upload (4-5)
   - Spread across the day or next few days
       │
       ▼
6. TikTok upload (same shorts)
   - Platform-specific captions
       │
       ▼
7. Twitter thread
   - With YouTube link
       │
       ▼
8. LinkedIn post
   - With YouTube link
       │
       ▼
9. Git push (source code from the build)
   - To lemonbrand-builds repo
   - README with link to video
       │
       ▼
10. Update tracking database
    - All URLs stored
    - Status: published
```

### Platform-Specific Details

#### Lemonbrand Website (Blog)

**Method:**
- Option A: Convex mutation (if blog is Convex-backed)
- Option B: Git commit to trigger Vercel rebuild
- Option C: API endpoint that accepts markdown

**Content:**
- Markdown blog post
- Meta: title, description, category, date, video embed
- Slug: `/blog/{date}-{build-guide-name}`

**SEO:**
- Each post targets long-tail keywords
- Internal links to related posts
- Schema markup for HowTo content

#### Substack

**Method:**
- Substack doesn't have a public API for posting
- Options:
  1. Email-to-post (draft via email)
  2. Manual copy-paste (quick if formatted)
  3. Unofficial API (risky, may break)

**Recommendation:** Accept manual Substack posting for now. It's 2 minutes: copy markdown, paste, publish. Automate the reminder notification.

#### YouTube (Main Video)

**Method:** YouTube Data API v3

**Fields:**
- Title (from AI generation)
- Description (with blog URL inserted)
- Tags
- Category: Education or Science & Technology
- Thumbnail (upload separately)
- Privacy: Public or Scheduled
- Playlist: "Build Guides" (auto-add)

**Scheduling:**
- Publish at consistent time (e.g., 9 AM EST)
- Or queue and publish daily

#### YouTube Shorts

**Method:** Same YouTube API, with `#Shorts` in title/description

**Strategy:**
- Don't publish all 4-5 shorts at once
- Spread across 2-3 days
- Each short links to main video in description

#### TikTok

**Method:** TikTok API for Business (or manual upload)

**Note:** TikTok API requires business account and approval. For V1, consider:
- Manual upload (30 seconds per short)
- Later: Automate with approved API access

#### Twitter

**Method:** Twitter API v2

**Content:**
- Thread from AI generation
- First tweet hooks, last tweet links to YouTube
- Images: thumbnail or key screenshots

#### LinkedIn

**Method:** LinkedIn API (or manual)

**Note:** LinkedIn API is restrictive. Options:
- Manual posting (quick, reliable)
- Third-party tools (Buffer, Hootsuite)
- LinkedIn API with approved app

**Recommendation for V1:** Manual Twitter and LinkedIn posting. Automate the content generation and notification to post.

#### Git (Source Code)

**Method:** GitHub API or git CLI in n8n

**Structure:**
```
lemonbrand-builds/
├── proposal-generator/
│   ├── README.md (links to video, blog)
│   ├── index.ts
│   └── package.json
├── invoice-generator/
│   └── ...
└── README.md (index of all builds)
```

**Goodwill factor:** Open source builds = proof of value, community trust, backlinks

---

## Tracking & Metrics

### Daily Metrics Dashboard

**Data sources:**
- YouTube Analytics API
- TikTok Analytics (manual or API)
- Google Analytics (blog)
- Substack dashboard
- Twitter Analytics
- LinkedIn Analytics

**Metrics to track:**

| Platform | Metrics |
|----------|---------|
| YouTube Main | Views, watch time, CTR, subscribers gained |
| YouTube Shorts | Views, likes, comments, shares |
| TikTok | Views, likes, comments, shares, follows |
| Blog | Pageviews, time on page, scroll depth |
| Newsletter | Open rate, click rate, unsubscribes |
| Twitter | Impressions, engagements, followers |
| LinkedIn | Impressions, engagements, followers |

**Daily review (15 min):**
- Check each platform's previous day performance
- Note any outliers (viral short, high-performing blog)
- Log in tracking database

### Metrics Database (Convex)

```typescript
// Schema
metrics: defineTable({
  sessionId: v.string(),
  date: v.string(),
  platform: v.string(), // youtube, tiktok, blog, etc.
  contentType: v.string(), // main, short, blog, thread
  contentId: v.string(), // YouTube video ID, blog slug, etc.
  views: v.optional(v.number()),
  likes: v.optional(v.number()),
  comments: v.optional(v.number()),
  shares: v.optional(v.number()),
  watchTime: v.optional(v.number()),
  ctr: v.optional(v.number()),
  subscribersGained: v.optional(v.number()),
}).index("by_session", ["sessionId"])
  .index("by_date", ["date"])
  .index("by_platform", ["platform"]),
```

### Weekly Analysis

**Questions to answer:**
- Which build guides performed best?
- Which shorts went semi-viral?
- What topics drive newsletter signups?
- What's the conversion path: Short → Main → Blog → Newsletter?

**Output:** Weekly summary stored, informs future content priorities

---

## Comment Response System

### Why Respond

- Algorithm boost (engagement signals)
- Community building
- Content ideas from questions
- Goodwill generation

### Process

1. **Aggregation**
   - n8n workflow checks YouTube, TikTok, blog comments
   - New comments pushed to a single queue (Slack channel, Notion, or custom dashboard)

2. **Triage**
   - Questions: Answer directly
   - Praise: Thank briefly
   - Criticism: Acknowledge, improve
   - Spam: Ignore/delete

3. **Response Time**
   - Goal: Respond within 24 hours
   - Daily 30-min block for responses

4. **AI Assistance**
   - AI drafts responses based on comment + video context
   - You review and send
   - Saves time while maintaining authenticity

### Comment Tracking

```typescript
comments: defineTable({
  sessionId: v.string(),
  platform: v.string(),
  commentId: v.string(),
  author: v.string(),
  text: v.string(),
  timestamp: v.number(),
  responded: v.boolean(),
  responseText: v.optional(v.string()),
  sentiment: v.optional(v.string()), // positive, question, criticism
}),
```

---

## Open Source Strategy

### What to Open Source

1. **Build guide source code**
   - Every tool built in videos → public GitHub repo
   - README links to video tutorial
   - MIT license

2. **The recording app itself**
   - The randomizer/timer app
   - Others can use it for their content
   - Goodwill + backlinks

3. **n8n workflows**
   - Export and share workflow templates
   - Community can adapt for their needs

### Repository Structure

```
github.com/lemonbrand/

├── build-guides/           # All 28+ tools, each in subfolder
│   ├── proposal-generator/
│   ├── invoice-generator/
│   └── ...
│
├── content-system/         # The automation system
│   ├── recording-app/      # Electron app
│   ├── n8n-workflows/      # Exported workflows
│   └── templates/          # Video templates, prompts
│
└── lemonbrand-website/     # Main website (if public)
```

### Goodwill Mechanics

- **Stars** = social proof
- **Forks** = distribution
- **Issues** = engagement, content ideas
- **Contributors** = community
- **README links** = backlinks to YouTube, newsletter

### Launch Strategy

1. Build in private during V1
2. Once system is stable, open source with announcement
3. "I built a system to publish daily content. Here's everything."
4. Post on Hacker News, Reddit, Twitter
5. Video explaining the system → meta content

---

## Tools & Services

### Required

| Tool | Purpose | Cost |
|------|---------|------|
| **Screen Studio** | Recording | $89 one-time |
| **Descript** | Video editing, captions, shorts | $12/mo |
| **Deepgram** | Fast transcription (parallel to Descript) | ~$0.0043/min (~$4/mo at volume) |
| **Claude API** | Content generation | ~$20-50/mo |
| **n8n** | Automation orchestration | Self-hosted free, Cloud $20/mo |
| **YouTube API** | Upload, analytics | Free |
| **Vercel** | Website hosting | Free tier |
| **Convex** | Database | Free tier → ~$25/mo |
| **Resend** | Newsletter | Free tier → $20/mo |
| **GitHub** | Code hosting | Free |
| **Figma** | Thumbnail templates | Free |

### Optional (Future)

| Tool | Purpose | Cost |
|------|---------|------|
| **Opus Clip** | Automated shorts (if Descript shorts workflow is too slow) | $15/mo |
| **Buffer** | Social scheduling (if manual posting becomes burden) | $15/mo |

### Estimated Monthly Cost

| Tier | Tools | Cost |
|------|-------|------|
| **V1 (Current plan)** | Screen Studio + Descript + Deepgram + Claude + n8n (self-hosted) | ~$45/mo |
| **With n8n Cloud** | Above + n8n Cloud | ~$65/mo |
| **Full automation** | + Opus Clip + Buffer | ~$95/mo |

---

## n8n Workflow Architecture

### Master Workflow: Content Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TRIGGER: File Watcher                                                        │
│ Watch: ~/lemonbrand-content/sessions/*/raw-video.mov                        │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Extract Audio                                                          │
│ FFmpeg: extract audio → .wav                                                │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Transcription                                                          │
│ HTTP Request → Deepgram API                                                 │
│ Store result: transcript.json                                               │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Load Session Metadata                                                  │
│ Read: metadata.json (build guide name, category)                            │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: AI Content Generation                                                  │
│ HTTP Request → Claude API                                                   │
│ Input: transcript + metadata                                                │
│ Output: content-package.json                                                │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Publish Blog Post                                                      │
│ HTTP Request → Lemonbrand API / Git commit                                  │
│ Capture: published URL                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Update Content Package                                                 │
│ Insert blog URL into YouTube description                                    │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Notification                                                           │
│ Slack/Email: "Content ready for review"                                     │
│ Link to approval dashboard                                                  │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ WAIT: Manual Approval (or auto-approve after delay)                         │
│ Webhook trigger from approval dashboard                                     │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: YouTube Upload                                                         │
│ YouTube API: upload main video                                              │
│ Capture: video URL                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ├──────────────────────────────────────────┐
        ▼                                          ▼
┌─────────────────────────┐              ┌─────────────────────────┐
│ NODE: Schedule Shorts   │              │ NODE: Social Posts      │
│ Queue shorts for upload │              │ Generate with video URL │
│ Spread across 2-3 days  │              │ Store for manual post   │
└─────────────────────────┘              └─────────────────────────┘
        │                                          │
        ▼                                          ▼
┌─────────────────────────┐              ┌─────────────────────────┐
│ NODE: TikTok Queue      │              │ NODE: Notification      │
│ Same shorts, different  │              │ "Post to Twitter/LI"    │
│ platform metadata       │              │ Content ready to copy   │
└─────────────────────────┘              └─────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Git Push                                                               │
│ Commit source code to lemonbrand-builds repo                                │
│ README with video + blog links                                              │
└─────────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ NODE: Update Tracking                                                        │
│ Convex mutation: session status = published, all URLs stored                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Supporting Workflows

#### Workflow: Daily Metrics Collection

```
TRIGGER: Cron (daily at 8 AM)
    │
    ├── NODE: YouTube Analytics API → fetch yesterday's stats
    ├── NODE: Google Analytics API → fetch blog stats
    ├── NODE: (Manual input for TikTok, Twitter, LinkedIn)
    │
    ▼
NODE: Store in Convex metrics table
    │
    ▼
NODE: Slack notification with daily summary
```

#### Workflow: Comment Aggregation

```
TRIGGER: Cron (every 4 hours)
    │
    ├── NODE: YouTube API → fetch new comments
    ├── NODE: Blog comments API → fetch new comments
    │
    ▼
NODE: AI triage (sentiment, category)
    │
    ▼
NODE: Store in Convex comments table
    │
    ▼
NODE: Slack notification if high-priority comments
```

#### Workflow: Weekly Newsletter

```
TRIGGER: Cron (Friday 10 AM)
    │
    ▼
NODE: Query Convex → all sessions from this week
    │
    ▼
NODE: AI generate newsletter content
    │
    ▼
NODE: Resend API → send to subscribers
    │
    ▼
NODE: Update Convex → newsletter sent
```

---

## Data Model

### Convex Schema

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Build guide library
  buildGuides: defineTable({
    slug: v.string(),
    name: v.string(),
    oneLiner: v.string(),
    category: v.string(),
    prompt: v.string(),
    timesRecorded: v.number(),
    lastRecorded: v.optional(v.number()),
    priority: v.number(), // for weighted randomization
  }).index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  // Recording sessions
  sessions: defineTable({
    sessionId: v.string(),
    buildGuideSlug: v.string(),
    recordedAt: v.number(),
    duration: v.number(),
    status: v.string(), // recording, processing, ready, approved, published, failed

    // File paths
    rawVideoPath: v.optional(v.string()),
    transcriptPath: v.optional(v.string()),
    contentPackagePath: v.optional(v.string()),

    // Published URLs
    blogUrl: v.optional(v.string()),
    youtubeUrl: v.optional(v.string()),
    substackUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),

    // Shorts
    shorts: v.optional(v.array(v.object({
      id: v.string(),
      youtubeUrl: v.optional(v.string()),
      tiktokUrl: v.optional(v.string()),
      publishedAt: v.optional(v.number()),
    }))),

    // Metadata
    notes: v.optional(v.string()),
    error: v.optional(v.string()),
  }).index("by_sessionId", ["sessionId"])
    .index("by_status", ["status"])
    .index("by_buildGuide", ["buildGuideSlug"]),

  // Daily metrics
  metrics: defineTable({
    sessionId: v.string(),
    date: v.string(),
    platform: v.string(),
    contentType: v.string(),
    contentId: v.string(),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
    comments: v.optional(v.number()),
    shares: v.optional(v.number()),
    watchTime: v.optional(v.number()),
    ctr: v.optional(v.number()),
    subscribersGained: v.optional(v.number()),
  }).index("by_session", ["sessionId"])
    .index("by_date", ["date"])
    .index("by_platform", ["platform"]),

  // Comments for response tracking
  comments: defineTable({
    sessionId: v.string(),
    platform: v.string(),
    commentId: v.string(),
    author: v.string(),
    text: v.string(),
    timestamp: v.number(),
    sentiment: v.optional(v.string()),
    responded: v.boolean(),
    responseText: v.optional(v.string()),
    respondedAt: v.optional(v.number()),
  }).index("by_session", ["sessionId"])
    .index("by_responded", ["responded"])
    .index("by_platform", ["platform"]),

  // Newsletter tracking
  newsletters: defineTable({
    weekOf: v.string(),
    sentAt: v.number(),
    sessionIds: v.array(v.string()),
    recipientCount: v.number(),
    openRate: v.optional(v.number()),
    clickRate: v.optional(v.number()),
  }).index("by_week", ["weekOf"]),
});
```

---

## Expected Metrics & ROI

### Output Projections

| Timeline | Videos | Shorts | Blog Posts | Newsletter Subs |
|----------|--------|--------|------------|-----------------|
| Month 1 | 30 | 120-150 | 30 | 200-400 |
| Month 3 | 90 | 360-450 | 90 | 600-1,200 |
| Month 6 | 180 | 720-900 | 180 | 1,500-3,000 |
| Month 12 | 365 | 1,460-1,825 | 365 | 4,000-8,000 |

### Reach Projections (Conservative)

| Timeline | YouTube Views/mo | Blog Traffic/mo | Newsletter Opens |
|----------|------------------|-----------------|------------------|
| Month 1-3 | 2,000-5,000 | 500-1,500 | 40% of list |
| Month 4-6 | 10,000-25,000 | 3,000-8,000 | 35% of list |
| Month 7-12 | 50,000-100,000 | 10,000-25,000 | 30% of list |

### Revenue Projections

**Conversion funnel (conservative):**
```
Newsletter subscribers
    ↓ 3% convert to Sprint ($297)
Sprint enrollments
    ↓ 25% convert to 8-Week ($997)
8-Week enrollments
    ↓ 40% join Builders Club ($97/mo)
```

| Timeline | Newsletter | Sprint Revenue | 8-Week Revenue | Club MRR |
|----------|------------|----------------|----------------|----------|
| Month 6 | 2,000 | $1,782 (6 × $297) | $997 (1 × $997) | $97 |
| Month 12 | 6,000 | $5,346 (18 × $297) | $2,991 (3 × $997) | $388 |
| Month 18 | 12,000 | $10,692 (36 × $297) | $5,982 (6 × $997) | $873 |

**Monthly revenue at Month 12:** ~$8,700 + growing MRR

**Monthly revenue at Month 18:** ~$17,500 + growing MRR

### ROI Calculation

**Investment:**
- Time: 20 hours/week × 52 weeks = 1,040 hours/year
- Money: ~$60/mo × 12 = $720/year

**Return at Month 12:**
- Revenue: ~$8,700/mo
- Content library: 365 videos, 365 blog posts (evergreen assets)
- Newsletter: 6,000 subscribers (owned distribution)
- YouTube: 10,000+ subscribers (discovery engine)

**Effective hourly rate:** $8,700 ÷ 80 hours/mo = $108/hour
(Increases as content compounds and time investment can decrease)

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Record and publish manually, validate the content works

- [ ] Set up Screen Studio with optimal settings
- [ ] Record first 5 build guides manually
- [ ] Manual transcription (Descript or similar)
- [ ] Manual content writing (blog, descriptions)
- [ ] Manual publishing to all platforms
- [ ] Set up YouTube channel, TikTok, optimize profiles
- [ ] Create blog section on Lemonbrand website

**Output:** 5 videos live, workflow understood, pain points identified

### Phase 2: Recording App (Week 3-4)

**Goal:** Build the recording orchestration app

- [ ] Design app UI (simple, focused)
- [ ] Build randomizer (reads from build guide markdown files)
- [ ] Build countdown timer with alerts
- [ ] Integrate Screen Studio triggers (AppleScript/Shortcuts)
- [ ] Session metadata capture
- [ ] Watched folder structure
- [ ] Batch mode support

**Output:** One-click recording sessions, consistent file organization

### Phase 3: Processing Automation (Week 5-6)

**Goal:** Automate transcription and content generation

- [ ] Set up n8n (self-hosted or cloud)
- [ ] File watcher workflow
- [ ] Deepgram integration for transcription
- [ ] Claude API integration for content generation
- [ ] Content package storage
- [ ] Notification system (Slack or email)

**Output:** Drop video in folder → content package generated automatically

### Phase 4: Distribution Automation (Week 7-8)

**Goal:** Automate publishing pipeline

- [ ] Blog publishing API/workflow
- [ ] YouTube upload automation
- [ ] Shorts scheduling system
- [ ] Git push automation
- [ ] Convex tracking integration
- [ ] Manual posting notifications for Twitter/LinkedIn/TikTok

**Output:** Approve → everything publishes automatically

### Phase 5: Metrics & Engagement (Week 9-10)

**Goal:** Close the feedback loop

- [ ] Daily metrics collection workflow
- [ ] Metrics dashboard (Convex + simple UI)
- [ ] Comment aggregation workflow
- [ ] AI-assisted comment response drafts
- [ ] Weekly newsletter automation

**Output:** Daily insights, manageable engagement, automated newsletter

### Phase 6: Optimization (Week 11+)

**Goal:** Refine based on data

- [ ] Analyze which content performs
- [ ] Adjust AI prompts for better output
- [ ] A/B test thumbnails, titles
- [ ] Optimize posting times
- [ ] Add TikTok API if approved
- [ ] Consider Opus Clip for automated shorts

**Output:** Continuously improving system

---

## Apps to Build

### 1. Recording Orchestrator App

**Type:** Electron or native macOS app

**Features:**
- Build guide randomizer with weighted selection
- Countdown timer (visible, overlay capable)
- Screen Studio integration
- Session metadata capture
- Batch mode
- Status dashboard

**Tech:** Electron + React, or SwiftUI for native macOS

**Priority:** High (Phase 2)

### 2. Approval Dashboard

**Type:** Web app (can be part of Lemonbrand dashboard)

**Features:**
- List of sessions pending approval
- Preview: blog post, YouTube title/description, shorts
- Edit capability before publishing
- One-click approve
- Batch approve

**Tech:** Next.js + Convex (same stack as Lemonbrand)

**Priority:** Medium (Phase 4)

### 3. Metrics Dashboard

**Type:** Web app

**Features:**
- Daily/weekly/monthly views across platforms
- Per-video performance
- Conversion tracking (view → subscribe → enroll)
- Trend visualization
- Best performing content

**Tech:** Next.js + Convex + Chart library

**Priority:** Medium (Phase 5)

### 4. Comment Response Queue

**Type:** Web app or Slack integration

**Features:**
- All comments in one place
- AI-suggested responses
- One-click respond
- Mark as handled
- Priority sorting

**Tech:** Slack app or Next.js

**Priority:** Low (Phase 5)

---

## Appendix: AI Prompts

### Content Generation Master Prompt

```markdown
You are a content generation assistant for Lemonbrand, an AI automation agency.

## Context
- Creator: Simon Bergeron
- Brand voice: Direct, practical, no jargon, builder mentality
- Audience: Small business owners, freelancers, consultants who want to build their own tools
- Goal: Teach people to build AI-powered tools in 30 minutes

## Input
- Build guide name: {{build_guide_name}}
- Category: {{category}}
- Transcript: {{transcript}}
- Duration: {{duration}} minutes

## Output Format
Return a JSON object with the following structure:

{
  "blog": {
    "title": "string (SEO-optimized, includes build time)",
    "metaDescription": "string (max 155 chars)",
    "content": "string (full markdown blog post)"
  },
  "youtube": {
    "title": "string (max 60 chars, curiosity + clarity)",
    "description": "string (include {{BLOG_URL}} placeholder)",
    "tags": ["array", "of", "relevant", "tags"]
  },
  "shorts": [
    {
      "hookText": "string (text overlay for first 3 seconds)",
      "startTime": "number (seconds)",
      "endTime": "number (seconds)",
      "title": "string (short title)",
      "rationale": "string (why this moment works)"
    }
  ],
  "twitter": {
    "thread": ["array", "of", "tweets", "include {{YOUTUBE_URL}}"]
  },
  "linkedin": {
    "post": "string (include {{YOUTUBE_URL}})"
  },
  "newsletter": {
    "blurb": "string (2-3 sentences for weekly recap)"
  }
}

## Blog Post Structure
1. Hook (what pain point does this solve?)
2. What we're building (1-2 sentences)
3. The build (step-by-step with code blocks from transcript)
4. Key takeaways (3-5 bullets)
5. Call to action (newsletter signup)

## Shorts Selection Criteria
- Moments with clear "aha" realizations
- Satisfying completions (it works!)
- Relatable frustrations + solutions
- Quotable insights
- Visual demonstrations

## Tone Guidelines
- First person ("I'm going to show you...")
- Practical, not theoretical
- Acknowledge complexity, then simplify
- End with action, not philosophy
```

---

## Appendix: File Structure

```
~/lemonbrand-content/
│
├── config/
│   ├── settings.json          # App settings
│   └── prompts/               # AI prompt templates
│       └── content-gen.md
│
├── build-guides/              # Symlink or copy from repo
│   ├── proposal-generator.md
│   └── ...
│
├── sessions/
│   └── 2026-01-24-proposal-generator/
│       ├── metadata.json      # Session metadata
│       ├── raw-video.mov      # Original recording
│       ├── audio.wav          # Extracted audio
│       ├── transcript.json    # Deepgram output
│       ├── content-package.json # AI-generated content
│       └── exports/
│           ├── main-video.mp4
│           ├── thumbnail.png
│           ├── short-01.mp4
│           ├── short-02.mp4
│           ├── short-03.mp4
│           ├── short-04.mp4
│           └── short-05.mp4
│
├── queue/
│   ├── youtube/               # Videos awaiting upload
│   ├── youtube-shorts/        # Shorts awaiting upload
│   ├── tiktok/               # TikTok queue
│   └── blog/                 # Blog posts awaiting publish
│
├── published/
│   └── 2026-01-24-proposal-generator/
│       └── urls.json         # All published URLs
│
└── logs/
    ├── n8n/                  # Workflow logs
    └── errors/               # Error logs
```

---

## Changelog

- **2026-01-24:** Initial spec created
- **2026-01-24:** Added: Recording captures randomizer as intro (recording starts before selection), "Start Build" button below timer, Descript as confirmed video editing tool, screenshot capture workflow for finished product, video structure diagram showing intro/build/payoff
- [Future updates here]
