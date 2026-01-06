# PRODUCT REQUIREMENTS DOCUMENT: LemonBrand.io Website Update

**Version:** 1.0
**Date:** November 12, 2025
**Author:** Simon Bergeron
**Status:** Ready for Implementation
**Target Completion:** Tonight (Nov 12, 2025)

---

## OBJECTIVE

Update LemonBrand.io website to position it as a portfolio brand that showcases multiple products/services for contractors, with GetMyWebsite.io as a featured product alongside the existing Express Core Automation offering.

---

## STRATEGIC CONTEXT

**Current State:**
- LemonBrand.io is positioned exclusively as an automation services business
- All content, messaging, and CTAs focus on automation only
- No mention of other products or services

**Desired State:**
- LemonBrand.io becomes the parent brand/portfolio hub
- Express Core Automation remains primary offering (80% of page focus)
- GetMyWebsite.io introduced as secondary product offering (20% of page focus)
- Opens path for future product additions

**Business Rationale:**
- Leverage LemonBrand's existing domain authority to support GetMyWebsite.io launch
- Create backlink from established domain to new product
- Position Simon as multi-product builder, not just service provider
- Enable cross-promotion between offerings

---

## DESIGN CONSTRAINTS

### **CRITICAL REQUIREMENTS:**

1. **Use Existing Components Only**
   - NO new component creation without explicit approval
   - Leverage existing Card, Button, Badge, Section layouts from current site
   - Maintain current design system and styling patterns

2. **Asset Source:**
   - Use images from GetMyWebsite.io assets
   - Images have drop shadows already applied
   - Maintain visual consistency with existing LemonBrand aesthetic

3. **Brand Hierarchy:**
   - Express Core Automation remains PRIMARY offering (hero, most space)
   - GetMyWebsite.io is SECONDARY offering (supporting, less prominent)
   - Do not dilute automation messaging

---

## IMPLEMENTATION PRIORITY

### **TIER 1: TONIGHT (Must-Have)**
Changes that provide maximum impact with minimal effort. Complete these tonight.

1. Footer GetMyWebsite link
2. About section broadening
3. Navigation menu update

### **TIER 2: THIS WEEK (Should-Have)**
Changes that add value but can wait 24-48 hours.

4. Products section on homepage
5. Resources page enhancement

### **TIER 3: FUTURE (Nice-to-Have)**
Changes that are optional and can be deferred.

6. Dedicated /products page
7. SEO metadata updates

---

## DETAILED REQUIREMENTS

---

## **TIER 1 CHANGES - TONIGHT**

### **1. FOOTER UPDATE**

**File:** `/components/footer.tsx` (or wherever footer component lives)

**Current State:**
```
Footer has sections: Pages, Socials, Legal, Resources
```

**Required Change:**
Add GetMyWebsite.io link to footer navigation.

**Placement Options (choose one based on existing structure):**

**Option A - Add to "Pages" section:**
```
Pages:
- Home
- Resources
- GetMyWebsite.io → (external link)
```

**Option B - Create "Products" section:**
```
Products:
- Automation Services
- GetMyWebsite.io → (external link)
```

**Option C - Add to bottom of footer (inline):**
```
© 2025 Lemonbrand | Also: GetMyWebsite.io
```

**Link Specifications:**
- URL: `https://getmywebsite.io`
- Open in new tab: `target="_blank" rel="noopener noreferrer"`
- Link text: "GetMyWebsite.io" or "Get My Website"

**Acceptance Criteria:**
- [ ] Link to GetMyWebsite.io is visible in footer
- [ ] Link opens in new tab
- [ ] Link is styled consistently with other footer links
- [ ] No layout breaks on mobile

---

### **2. ABOUT SECTION UPDATE**

**File:** `/components/about.tsx` (or relevant About component)

**Current State:**
About section focuses exclusively on automation expertise and track record.

**Required Change:**
Broaden positioning to include product building, not just automation services.

**New About Content:**

```markdown
## About Simon Bergeron

I build revenue-generating systems for home service contractors.

**What I Build:**
- Automation systems that capture missed calls and follow up on quotes
- Websites for contractors who don't have one yet
- Tools that turn operational chaos into trackable revenue

**The Model:**
Direct builder with no agency overhead. You own what I build.

**Track Record:**
- 75+ workflows shipped
- $1.7M+ in revenue captured through automation
- Launched GetMyWebsite.io (November 2025)

**Philosophy:**
Build fast. Deliver results. Make it yours.
```

**Styling:**
- Use existing About section styling
- No new components needed
- Maintain current layout and typography

**Acceptance Criteria:**
- [ ] About section reflects product builder positioning (not just automation)
- [ ] GetMyWebsite.io is mentioned in track record
- [ ] "What I Build" includes websites and tools
- [ ] Maintains professional, direct tone
- [ ] No layout breaks or styling issues

---

### **3. NAVIGATION MENU UPDATE**

**File:** Navigation component (header/nav)

**Current Navigation:**
```
- ROI
- Process
- Bio
- FAQs
- Resources
- Book a call (CTA button)
```

**Required Change:**
Add link to GetMyWebsite.io in navigation.

**Recommended Approach:**

**Option A - Add as standalone nav item:**
```
- ROI
- Process
- Websites → (links to getmywebsite.io) [NEW]
- Bio
- FAQs
- Resources
- Book a call (CTA button)
```

**Option B - Replace "Process" with "Products":**
```
- ROI
- Products → (links to new Products section or getmywebsite.io)
- Bio
- FAQs
- Resources
- Book a call (CTA button)
```

**Link Specifications:**
- URL: `https://getmywebsite.io`
- Link text: "Websites" or "Get My Website"
- Style: Match existing nav link styling
- Opens in new tab (optional - can stay in same tab if preferred)

**Acceptance Criteria:**
- [ ] New navigation item is visible
- [ ] Links to GetMyWebsite.io correctly
- [ ] Responsive behavior maintained (mobile menu works)
- [ ] Styling consistent with other nav items
- [ ] Active/hover states work properly

---

## **TIER 2 CHANGES - THIS WEEK**

### **4. PRODUCTS SECTION ON HOMEPAGE**

**File:** `/app/page.tsx`

**Placement:** Insert new section between `<Features />` and `<Pricing />` components

**Purpose:** Give visitors clear choice between two offerings: Automation vs Website

**Content Structure:**

```
Section Heading: "Choose Your Path"
Subheading: "Whether you need automation or a website, I've got you covered."

Two Cards Side-by-Side (Desktop) / Stacked (Mobile):

┌─────────────────────────────────┐  ┌─────────────────────────────────┐
│ EXPRESS CORE AUTOMATION         │  │ GET MY WEBSITE                  │
│ [Badge: Most Popular]           │  │ [Badge: New Launch]             │
│                                 │  │                                 │
│ 72-hour deployment. 3           │  │ Professional website for        │
│ automations that capture        │  │ contractors with no website.    │
│ revenue.                        │  │ Live in 5 days.                 │
│                                 │  │                                 │
│ • Instant lead response 24/7    │  │ • Template built for your trade │
│ • Quote follow-up automation    │  │ • Mobile-optimized design       │
│ • Customer reactivation         │  │ • Contact forms & Google Maps   │
│                                 │  │                                 │
│ $1,500 setup + $499/mo          │  │ $197 one-time                   │
│                                 │  │                                 │
│ [Calculate ROI →]               │  │ [Learn More →]                  │
└─────────────────────────────────┘  └─────────────────────────────────┘
```

**Component Requirements:**
- **Use existing Card component** from your component library
- **Use existing Badge component** for "Most Popular" and "New Launch"
- **Use existing Button component** for CTAs
- **Use existing grid/layout patterns** from homepage

**Asset Requirements:**
- **GetMyWebsite.io image:** Use existing screenshot/preview from GetMyWebsite assets
- Image should have drop shadow (already applied to source asset)
- Place image above or within the GetMyWebsite card
- Maintain aspect ratio, optimize for web

**CTA Links:**
- Automation card → `/calculator` or `/#calculator` (existing ROI calculator)
- GetMyWebsite card → `https://getmywebsite.io` (external, new tab)

**Styling Notes:**
- Match existing section spacing/padding on homepage
- Use existing color scheme (orange primary, neutral backgrounds)
- Maintain responsive behavior (2 columns desktop, 1 column mobile)

**Acceptance Criteria:**
- [ ] New section appears between Features and Pricing
- [ ] Two cards are visible side-by-side on desktop
- [ ] Cards stack vertically on mobile
- [ ] Badges display correctly
- [ ] CTAs link to correct destinations
- [ ] GetMyWebsite image loads properly
- [ ] Maintains visual consistency with rest of homepage
- [ ] No layout breaks or overflow issues

---

### **5. RESOURCES PAGE ENHANCEMENT**

**File:** `/app/resources/page.tsx`

**Current State:**
Minimal resources page with newsletter signup form.

**Required Change:**
Add GetMyWebsite.io mention to resources page.

**Content Addition:**

Add new section to existing resources page:

```markdown
## Products & Tools

### For Contractors Without Websites
**[GetMyWebsite.io →](https://getmywebsite.io)**
Professional contractor website. Template-based, mobile-optimized, live in 5 days. $197 one-time.

### For Contractors With Websites
**[Express Core Automation →](/)**
Capture missed calls, follow up on quotes, reactivate past customers. 72-hour deployment. $1,500 + $499/mo.

---

(Existing newsletter and resources content continues below)
```

**Placement:** Near top of resources page, above newsletter signup

**Styling:**
- Use existing Resources page layout and styling
- Match existing section spacing
- Links should use existing link styling

**Acceptance Criteria:**
- [ ] New "Products & Tools" section is visible
- [ ] Links to GetMyWebsite.io and homepage work correctly
- [ ] Maintains existing resources page layout
- [ ] Responsive behavior maintained
- [ ] Typography and spacing consistent

---

## **TIER 3 CHANGES - FUTURE (OPTIONAL)**

### **6. DEDICATED /PRODUCTS PAGE**

**File:** `/app/products/page.tsx` (NEW FILE - requires approval)

**Status:** DEFERRED - Only create if explicitly requested

**Purpose:** Standalone page showcasing all products/services in one place

**Would Include:**
- Full product cards for Automation and GetMyWebsite
- Comparison table
- Future product placeholders
- Newsletter signup CTA

**Decision:** Skip for now, reassess in 1-2 weeks

---

### **7. SEO METADATA UPDATES**

**File:** `/app/page.tsx` (structured data section, lines 13-93)

**Required Change:**
Update structured data to include website design services in serviceType and knowsAbout arrays.

**Additions to serviceType:**
```typescript
serviceType: [
  "AI Automation for Home Services",
  "Website Design for Contractors", // ADD
  "HVAC Automation",
  "Plumbing Automation",
  "Contractor Website Templates", // ADD
  "Electrical Contractor Automation",
  // ... rest remains unchanged
],
```

**Additions to knowsAbout:**
```typescript
knowsAbout: [
  "AI automation for HVAC contractors",
  "Contractor website design", // ADD
  "No-website contractor solutions", // ADD
  "Home service website templates", // ADD
  "AI automation for plumbing companies",
  // ... rest remains unchanged
]
```

**Acceptance Criteria:**
- [ ] Structured data validates (use Google Rich Results Test)
- [ ] New service types are indexed
- [ ] No JSON-LD errors

---

## CONTENT SPECIFICATIONS

### **Copy Tone & Voice:**
- Direct, no-fluff language
- Focus on outcomes, not features
- Short sentences, simple words
- Active voice always
- Numbers and specifics preferred over vague claims

### **Brand Hierarchy:**
- Express Core Automation = PRIMARY offering (75% of focus)
- GetMyWebsite.io = SECONDARY offering (25% of focus)
- Future products = Placeholder only

### **Visual Hierarchy:**
- Automation content remains prominent
- GetMyWebsite content is supportive, not competing
- Clear separation between offerings

---

## ASSET REQUIREMENTS

### **GetMyWebsite.io Images:**

**Source:** GetMyWebsite.io assets folder (screenshots, mockups)

**Specifications:**
- Images already have drop shadows applied
- Use existing web-optimized versions
- Maintain aspect ratios
- File formats: PNG or WebP preferred
- Max file size: <500KB per image

**Usage Locations:**
- Products section card (homepage)
- Optional: Resources page thumbnail

**Alt Text:**
- "GetMyWebsite.io contractor website template preview"
- "Professional website for home service contractors"

---

## LINKS & URLs

### **External Links (GetMyWebsite.io):**
- Primary URL: `https://getmywebsite.io`
- Open in new tab: Yes (`target="_blank" rel="noopener noreferrer"`)
- Track in analytics: Optional (add UTM if desired)

### **Internal Links (LemonBrand):**
- Automation CTA: `/calculator` or `/#pricing`
- About: `/#about` or `/about`
- Resources: `/resources`

---

## RESPONSIVE DESIGN REQUIREMENTS

### **Desktop (≥1024px):**
- Products section: 2 columns side-by-side
- Navigation: Full horizontal menu
- Footer: Multi-column layout

### **Tablet (768px - 1023px):**
- Products section: 2 columns (slightly narrower)
- Navigation: May collapse to hamburger (existing behavior)
- Footer: 2-column or stacked

### **Mobile (<768px):**
- Products section: 1 column, stacked vertically
- Navigation: Hamburger menu (existing behavior)
- Footer: Single column, stacked

**Critical:** Test all changes on mobile before deployment.

---

## TESTING CHECKLIST

Before marking as complete, verify:

### **Functional Testing:**
- [ ] All links work correctly (internal and external)
- [ ] External links open in new tabs
- [ ] Navigation menu functions on all devices
- [ ] No console errors in browser dev tools
- [ ] Images load properly

### **Visual Testing:**
- [ ] No layout breaks on desktop (1920px, 1440px, 1024px)
- [ ] No layout breaks on tablet (768px, 834px)
- [ ] No layout breaks on mobile (375px, 414px)
- [ ] Typography is readable
- [ ] Spacing and padding consistent
- [ ] Colors match existing design system

### **Content Testing:**
- [ ] All copy is spelled correctly
- [ ] Links have correct text
- [ ] CTAs are clear and actionable
- [ ] Brand names capitalized correctly (GetMyWebsite.io, LemonBrand)

### **Performance Testing:**
- [ ] Page load time <3 seconds
- [ ] Images optimized
- [ ] No new performance regressions

---

## SUCCESS METRICS

### **Immediate (Tonight):**
- ✅ Tier 1 changes deployed and live
- ✅ No broken links or console errors
- ✅ Mobile responsive behavior maintained

### **This Week:**
- ✅ Tier 2 changes deployed
- ✅ GetMyWebsite.io receives first referral traffic from LemonBrand.io
- ✅ Products section visible and functional

### **This Month:**
- 📊 Track referral traffic from LemonBrand → GetMyWebsite
- 📊 Monitor bounce rate on new Products section
- 📊 Measure click-through rate on GetMyWebsite CTAs

---

## ROLLBACK PLAN

If issues arise:

1. **Minor Issues (styling, copy):** Fix forward immediately
2. **Major Issues (broken layout, errors):**
   - Revert to previous version via git
   - Fix in staging/local
   - Redeploy when stable

**Git Workflow:**
- Create branch: `feature/getmywebsite-integration`
- Commit changes incrementally
- Test thoroughly before merging to main
- Deploy to production

---

## NOTES FOR IMPLEMENTATION

### **To the LemonBrand Website Cloud Agent:**

1. **Use existing components only** - do not create new components without explicit approval
2. **Maintain existing design system** - colors, typography, spacing should match current site
3. **Test on mobile** before considering any change complete
4. **Ask before creating new files** - especially new page routes
5. **Assets are provided** - images from GetMyWebsite.io with drop shadows already applied
6. **Priority is Tier 1** - get footer, about, and nav done tonight

### **What Success Looks Like:**
- LemonBrand.io still looks and feels like an automation services business
- GetMyWebsite.io is introduced as a secondary offering without diluting primary message
- Clear path for contractors to choose between automation (complex, ongoing) vs website (simple, one-time)
- Professional, cohesive brand presentation

---

## APPROVAL & SIGN-OFF

**Prepared By:** Simon Bergeron
**Date:** November 12, 2025
**Status:** Approved for Implementation
**Next Steps:** Provide to LemonBrand website agent for execution

---

**END OF PRD**
