# Design Critique & Recommendations

## Overview
The current Lemonbrand website relies heavily on long-form copy ("The Story") which is persuasive but visually monotonous. The "Builder's Workshop" aesthetic is clean but lacks the "Maximalist" impact on desktop that separates high-tier tech brands.

**Goal:** Increase engagement through motion, interaction, and better visual hierarchy without changing the persuasive copy.

## Global Recommendations
1.  **Typography & Contrast:**
    *   **Desktop:** Increase heading sizes significantly (`text-5xl` to `text-7xl` for hero). Use `text-balance` more aggressively.
    *   **Mobile:** Maintain the current readable size but increase line-height for better scanning.
2.  **Animation Strategy:**
    *   **Scroll Reveal:** Elements should not just "fade in" but slide, scale, or unblur as they enter the viewport.
    *   **Micro-interactions:** Buttons should have magnetic or scale effects. Cards should have hover states (glow, lift, border reveal).
    *   **Text Effects:** Since "Communication" is the core theme, use typing/generating effects for key AI-related copy.
3.  **Navigation:**
    *   Ensure the "Get Free Template" CTA is always visible and distinct.

---

## Page-Specific Recommendations

### 1. Home Page (`/`)
*   **Hero Section ("The Story"):**
    *   *Critique:* It's a wall of text. It feels like a blog post, not a landing page.
    *   *Fix:* Use `TextGenerateEffect` for the "I typed..." lines to simulate the AI coding experience. Break the text into a split view on desktop: Story on the Left, subtle abstract visuals (code snippets, blurred UI) on the Right.
*   **The Ladder (Sprint -> 8-Week -> Club):**
    *   *Critique:* Vertical stacking on desktop hides the progression.
    *   *Fix:* On Desktop, use a horizontal "Journey Map" layout using `CardSpotlight` or a horizontal scroll. Visually connect them with a "path" line.

### 2. Sprint Page (`/sprint`)
*   **Day-by-Day Breakdown:**
    *   *Critique:* Long vertical list is tiring to scroll.
    *   *Fix:* Use `AppleCardsCarousel` or a "Sticky Scroll Reveal" for the days. As you scroll, the Day changes on the left, and the details update on the right.
*   **Timeline:**
    *   *Critique:* The existing `SprintTimeline` is good but could be more interactive.

### 3. 8-Week Page (`/8-week`)
*   **Curriculum (The Weeks):**
    *   *Critique:* 8 cards vertically stacked takes up too much vertical space on desktop.
    *   *Fix:* Use a **Bento Grid** layout (3 cols) or a **Vertical Tabs** component where clicking "Week 1" reveals the details without scrolling.
*   **Tiers:**
    *   *Fix:* Enhance the "Popular" tier (Accelerator) with a `BackgroundGradient` or stronger shadow to make it pop.

### 4. Club Page (`/club`)
*   **Hero:**
    *   *Fix:* Add a background texture (e.g., `DotGridBackground`) to differentiate it from the white/dark background of other pages.
*   **Member Stories:**
    *   *Fix:* Make this a prominent slider or grid.

---

## Implementation Plan (Immediate Actions)

1.  **Home Hero:** Implement `TextGenerateEffect` for the opening story.
2.  **Global:** Create a reusable `Section` component that standardizes responsive spacing and entry animations.
3.  **8-Week Curriculum:** Refactor to use a Grid/Bento layout for better desktop density.
4.  **Ladder Section:** Upgrade to `CardSpotlight` for better interactivity.
