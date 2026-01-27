# Plan: Free Resources Signup Page for YouTube Build Guides

## Overview

Build a dedicated page (`/free-resources`) that showcases build guide projects from YouTube videos. Users must sign up for the newsletter to access the free resources (build guides). This page will:

1. Display build guides linked to YouTube videos
2. Require newsletter signup to access resources
3. Integrate with existing newsletter system
4. Show related YouTube videos for each build guide
5. Provide email-gated access to downloadable resources

---

## Page Structure

### Route
- **Path:** `/free-resources` or `/build-guides`
- **File:** `apps/web/app/(marketing)/free-resources/page.tsx`
- **Content Component:** `apps/web/app/(marketing)/free-resources/free-resources-content.tsx`

### Page Sections

1. **Hero Section**
   - Headline: "Free Build Guides from YouTube"
   - Subheadline: "Get the complete guides for every project I build on YouTube"
   - Newsletter signup form (prominent)
   - Visual: YouTube thumbnail or build guide preview

2. **How It Works**
   - Step 1: Watch the YouTube video
   - Step 2: Sign up for the newsletter
   - Step 3: Get instant access to the build guide
   - Step 4: Build along with the complete guide

3. **Build Guides Grid**
   - Cards showing:
     - YouTube video thumbnail
     - Build guide title
     - Category (Business Documents, Communications, Operations, etc.)
     - Difficulty level
     - Estimated time
     - Status: "Available" or "Coming Soon"
   - Clicking a card:
     - If not signed up: Show newsletter signup modal/form
     - If signed up: Show build guide content or download link

4. **Featured Build Guide** (Latest)
   - Large card with latest build guide
   - Embedded YouTube video or thumbnail
   - Direct CTA to sign up and access

5. **Newsletter CTA Section**
   - Reminder of what they get
   - Link to full newsletter archive
   - Social proof (subscriber count if available)

---

## Technical Implementation

### 1. API Routes

#### `/api/build-guides/route.ts`
- **GET:** Returns list of all build guides with metadata
- Reads from `build-guides/` directory
- Parses frontmatter from markdown files
- Returns structured data:
  ```typescript
  {
    slug: string;
    title: string;
    category: string;
    difficulty: string;
    estimatedTime: number;
    youtubeVideoId?: string; // If linked to specific video
    available: boolean;
    excerpt: string;
  }
  ```

#### `/api/build-guides/[slug]/route.ts`
- **GET:** Returns full build guide content
- **POST:** Validates email subscription before returning content
- Checks if user email is in newsletter database
- Returns markdown content if authorized, error if not

#### `/api/build-guides/verify-access/route.ts`
- **POST:** Checks if email has newsletter access
- Returns boolean: `{ hasAccess: boolean }`
- Used for client-side access control

### 2. Components

#### `BuildGuideCard.tsx`
- Displays single build guide card
- Shows thumbnail, title, category, difficulty
- Handles click to show content or signup
- Props:
  ```typescript
  {
    guide: BuildGuide;
    userEmail?: string;
    onAccessRequest: () => void;
  }
  ```

#### `BuildGuideModal.tsx`
- Modal that shows build guide content
- Newsletter signup form if not subscribed
- Full markdown content if subscribed
- Download button for PDF/markdown export

#### `BuildGuideGrid.tsx`
- Grid layout for all build guides
- Filters by category
- Search functionality
- Loading states

#### `NewsletterGate.tsx`
- Wrapper component that gates content
- Shows signup form if not subscribed
- Shows content if subscribed
- Props:
  ```typescript
  {
    children: ReactNode;
    source?: string;
    onSuccess?: () => void;
  }
  ```

### 3. Data Structure

#### Build Guide Metadata (from frontmatter)
```yaml
---
difficulty: medium
category: business-documents
estimated_time: 25
youtube_video_id: "abc123xyz"  # Optional
available: true
---
```

#### Build Guide TypeScript Interface
```typescript
interface BuildGuide {
  slug: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  youtubeVideoId?: string;
  available: boolean;
  excerpt: string;
  content?: string; // Full markdown content
  publishedAt?: string;
}
```

### 4. Integration Points

#### Newsletter System
- Use existing `/api/newsletter/subscribe` endpoint
- Add new source tag: `"build-guides"` or `"free-resources"`
- Store subscription status in Convex
- Check subscription before showing content

#### YouTube Integration
- Use existing `/api/youtube-videos` endpoint
- Match build guides to videos by:
  - Video ID in frontmatter
  - Title matching
  - Manual mapping object

#### Build Guides Directory
- Read from `build-guides/*.md` files
- Parse frontmatter using `gray-matter` or similar
- Cache parsed results (revalidate every hour)

---

## File Structure

```
apps/web/
├── app/
│   └── (marketing)/
│       └── free-resources/
│           ├── page.tsx
│           ├── free-resources-content.tsx
│           └── opengraph-image.tsx
├── api/
│   └── build-guides/
│       ├── route.ts
│       ├── [slug]/
│       │   └── route.ts
│       └── verify-access/
│           └── route.ts
├── components/
│   ├── BuildGuideCard.tsx
│   ├── BuildGuideGrid.tsx
│   ├── BuildGuideModal.tsx
│   └── NewsletterGate.tsx
└── lib/
    └── build-guides.ts  # Utility functions for parsing guides
```

---

## Design Considerations

### Visual Style
- Match existing page designs (videos, substack pages)
- Use same color scheme and typography
- Consistent card styling with other pages
- Mobile-responsive grid layout

### User Experience
- Clear value proposition upfront
- Easy signup process (inline form)
- Instant access after signup (no email confirmation delay for content)
- Clear indication of what's available vs coming soon
- Smooth transitions between states

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader friendly
- Focus management in modals

---

## Implementation Steps

### Phase 1: Foundation (Core Infrastructure)
1. ✅ Create page route and basic layout
2. ✅ Create API route to read build guides directory
3. ✅ Parse markdown frontmatter
4. ✅ Create TypeScript interfaces
5. ✅ Set up utility functions for build guide parsing

### Phase 2: Display Components
6. ✅ Create `BuildGuideCard` component
7. ✅ Create `BuildGuideGrid` component
8. ✅ Create hero section with newsletter signup
9. ✅ Style cards to match existing design system
10. ✅ Add category filtering

### Phase 3: Access Control
11. ✅ Create `NewsletterGate` component
12. ✅ Integrate with newsletter subscription API
13. ✅ Create access verification endpoint
14. ✅ Add client-side access checking
15. ✅ Handle subscription flow

### Phase 4: Content Display
16. ✅ Create `BuildGuideModal` component
17. ✅ Add markdown rendering (use existing react-markdown)
18. ✅ Create API route to serve build guide content
19. ✅ Add download functionality
20. ✅ Link YouTube videos to guides

### Phase 5: Polish & Integration
21. ✅ Add search functionality
22. ✅ Add featured/latest build guide section
23. ✅ Integrate YouTube video thumbnails
24. ✅ Add loading states and error handling
25. ✅ Add SEO metadata
26. ✅ Add analytics tracking
27. ✅ Test email gating flow
28. ✅ Mobile optimization

### Phase 6: Navigation & Discovery
29. ✅ Add link in main navigation (optional)
30. ✅ Add link in footer
31. ✅ Add link from videos page
32. ✅ Add link from homepage (if appropriate)
33. ✅ Cross-link between related guides

---

## Dependencies Needed

### New Packages (if needed)
- `gray-matter` - Parse markdown frontmatter
- `remark` / `rehype` - Markdown processing (may already exist via react-markdown)

### Existing Packages (already in use)
- `react-markdown` - Render markdown content
- `next` - Routing and API routes
- `convex` - Newsletter subscription storage
- `resend` - Email sending (already used for newsletter)

---

## Content Strategy

### Build Guide Categories
- Business Documents (proposals, invoices, contracts)
- Communications (emails, posts, sequences)
- Operations (meetings, reports, checklists)
- Marketing & Content (posts, case studies, copy)
- Thinking & Decisions (calculators, analyzers, prioritizers)

### YouTube Video Linking
- Add `youtube_video_id` to frontmatter of relevant guides
- Create mapping for guides without explicit video IDs
- Show "Watch the Build" button on guide cards

### Coming Soon Guides
- Mark guides as `available: false` in frontmatter
- Show "Coming Soon" badge
- Allow signup to be notified when available

---

## Success Metrics

### Key Metrics to Track
- Newsletter signups from this page
- Build guide access rate (after signup)
- Time spent on page
- Guide download/access frequency
- Conversion rate: visitor → signup → access

### Analytics Events
- `build_guide_view` - When guide card is viewed
- `build_guide_signup_click` - When signup is triggered from guide
- `build_guide_access` - When guide content is accessed
- `build_guide_download` - When guide is downloaded

---

## Future Enhancements (Post-MVP)

1. **Email Sequences**
   - Auto-send build guide via email after signup
   - Weekly digest of new guides

2. **Community Features**
   - Comments on guides
   - User-submitted builds
   - Build showcase gallery

3. **Advanced Filtering**
   - Filter by difficulty
   - Filter by time estimate
   - Filter by tech stack
   - Search by keywords

4. **Progress Tracking**
   - Mark guides as "completed"
   - Save favorite guides
   - Build history

5. **Video Integration**
   - Embedded YouTube player
   - Timestamp links to specific parts
   - Video + guide side-by-side view

---

## Questions to Resolve

1. **Access Model**
   - Should users get instant access after signup, or wait for email confirmation?
   - **Recommendation:** Instant access (better UX), email confirmation can be separate

2. **Content Format**
   - Should guides be downloadable as PDF?
   - Should guides be viewable only online?
   - **Recommendation:** Both - view online + download as markdown/PDF

3. **Video Linking**
   - How to match guides to videos if no explicit ID?
   - **Recommendation:** Manual mapping object + title matching as fallback

4. **Navigation Placement**
   - Add to main nav or keep in footer/resources?
   - **Recommendation:** Add to main nav as "Build Guides" or "Resources"

5. **Coming Soon Handling**
   - Should users be able to sign up for specific guides?
   - **Recommendation:** General newsletter signup, notify all when new guide available

---

## Next Steps

1. Review and approve this plan
2. Decide on access model (instant vs email confirmation)
3. Choose page path (`/free-resources` vs `/build-guides`)
4. Start Phase 1 implementation
5. Test with one build guide first, then expand

---

## Related Files to Reference

- `apps/web/app/(marketing)/videos/videos-content.tsx` - Similar page structure
- `apps/web/app/(marketing)/substack/substack-content.tsx` - Newsletter signup pattern
- `apps/web/components/NewsletterForm.tsx` - Existing newsletter form
- `apps/web/app/api/newsletter/subscribe/route.ts` - Newsletter API
- `build-guides/*.md` - Source content files
- `apps/web/app/api/youtube-videos/route.ts` - YouTube integration
