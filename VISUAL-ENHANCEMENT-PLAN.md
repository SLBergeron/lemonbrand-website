# Visual Enhancement Plan

## Overview
This plan outlines the placement of rich visual assets (3D icons, GIFs, screenshots) to break up text density and add a "Maximalist" feel to the desktop experience while keeping the mobile experience clean.

## Asset Types
1.  **3D Icons:** Abstract, clay-morphism or glass-morphism style icons representing key concepts (Sprint, Database, API).
2.  **Product GIFs:** Looping, high-quality screen recordings showing the "work" (Claude Code terminal, Cursor editor, etc.).
3.  **Abstract Backgrounds:** Subtle gradients or mesh/grid patterns to separate sections.

## Placement Strategy

### 1. Home Page (`/`)
*   **Hero Section:**
    *   *Right Column (Desktop):* A floating 3D "Code Cube" or a looped GIF of a terminal window executing a successful build.
    *   *Why:* Immediately signals "this is about building code."
*   **"The Story" Section:**
    *   *Visual Break:* Insert a small, rotating 3D icon (e.g., a "lightbulb" or "puzzle piece") between the "I failed" and "I succeeded" paragraphs.
*   **Ladder Section:**
    *   *Sprint Card:* Add a 3D "Stopwatch" or "Running Shoe" icon floating above the card.
    *   *8-Week Card:* Add a 3D "Stack of Blocks" or "Database Cylinder".
    *   *Club Card:* Add a 3D "Community/People" bubble or "Trophy".

### 2. Sprint Page (`/sprint`)
*   **Day-by-Day:**
    *   *Each Day Card:* Replace the Lucide icon with a small, custom 3D icon representing that day's theme (e.g., Day 1 = Map, Day 7 = Rocket).
*   **Hero:**
    *   *Background:* Use a subtle "Blue Print" or grid texture behind the main text.

### 3. 8-Week Page (`/8-week`)
*   **Curriculum Grid:**
    *   *Week Cards:* Hovering over a week card could reveal a subtle GIF background showing code related to that week (e.g., Week 2 = SQL query animation).

### 4. Club Page (`/club`)
*   **Member Stories:**
    *   *Visual:* Authentic avatars (if available) or stylized 3D user portraits.

## Implementation Notes
*   **Performance:** Use optimized formats (.webm for video, .webp for images). Lazy load all assets below the fold.
*   **Mobile:** Hide heavy 3D assets on mobile or replace them with static 2D versions to preserve battery and load time.
*   **Placeholders:** Currently implemented as colored gradients/divs in the code to indicate position.

## Next Steps
1.  Source or generate the 3D assets (using tools like Spline or buying a pack).
2.  Record the "Claude Code" usage GIFs (clean terminal view, no clutter).
3.  Update the `FeatureCard` and `Section` components to accept an `image` or `icon3d` prop.
