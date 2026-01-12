# Design System Library Structure

**Purpose:** Centralized component library, design tokens, and reusable React patterns for the LemonBrand website.

---

## Directory Structure

```
lib/
├── design-system/
│   ├── tokens.ts          # Design tokens (colors, spacing, typography)
│   ├── utils.ts           # Design system utilities
│   └── types.ts           # TypeScript types for design system

components/
├── dashboard/             # Dashboard-style visualization components
│   ├── StatCard.tsx
│   ├── ProgressBar.tsx
│   ├── ProjectTimeline.tsx
│   ├── MetricCard.tsx
│   ├── ComparisonCard.tsx
│   ├── InteractiveTimeline.tsx
│   └── ProjectBuilder.tsx
│
├── shared/                # Shared/reusable components
│   ├── ProjectCard.tsx
│   ├── Section.tsx
│   ├── Grid.tsx
│   ├── Container.tsx
│   └── ImagePlaceholder.tsx

hooks/
├── design-system/         # Reusable React hooks
│   ├── useIntersection.ts
│   ├── useAnimatedValue.ts
│   └── useInViewport.ts
```

---

## Design Tokens (`lib/design-system/tokens.ts`)

Centralized design tokens extracted from CSS variables.

```typescript
// Color tokens
export const colors = {
  primary: 'hsl(207, 30%, 24%)',      // Slate Navy
  accent: 'hsl(28, 79%, 52%)',        // Builder Orange
  success: 'hsl(145, 63%, 42%)',      // Production Green
  background: 'hsl(210, 17%, 98%)',   // Paper White
  surface: 'hsl(200, 12%, 93%)',      // Warm Gray
  text: 'hsl(195, 6%, 18%)',          // Charcoal
  muted: 'hsl(199, 6%, 42%)',         // Slate Gray
  // ... dark mode variants
} as const;

// Spacing tokens
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  section: 'clamp(5rem, 10vw, 8rem)',
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    display: 'var(--font-inter), system-ui, sans-serif',
    body: 'var(--font-inter), system-ui, sans-serif',
    mono: 'var(--font-jetbrains-mono), monospace',
  },
  fontSize: {
    display: '3rem',
    h1: '2.375rem',
    h2: '1.875rem',
    h3: '1.5rem',
    h4: '1.1875rem',
    body: '1rem',
    small: '0.875rem',
  },
} as const;

// Shadow tokens
export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  accent: 'var(--shadow-accent)',
} as const;
```

---

## Dashboard Components

### StatCard (`components/dashboard/StatCard.tsx`)

**Purpose:** Display a single statistic in dashboard style.

**Props:**
```typescript
interface StatCardProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
<StatCard 
  label="Time Saved" 
  value={2.4} 
  suffix=" hours/day"
  trend="up"
  trendValue="+40%"
/>
```

### MetricCard (`components/dashboard/MetricCard.tsx`)

**Purpose:** Display key metrics with visualization.

**Props:**
```typescript
interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  description?: string;
  visual?: 'bar' | 'progress' | 'none';
  visualValue?: number; // 0-100 for progress
  className?: string;
}
```

**Usage:**
```tsx
<MetricCard 
  title="Contractor Records" 
  value={58000} 
  description="Total records in database"
  visual="progress"
  visualValue={100}
/>
```

### ComparisonCard (`components/dashboard/ComparisonCard.tsx`)

**Purpose:** Show before/after comparison.

**Props:**
```typescript
interface ComparisonCardProps {
  beforeLabel: string;
  beforeValue: number | string;
  afterLabel: string;
  afterValue: number | string;
  unit?: string;
  improvement?: string;
  className?: string;
}
```

**Usage:**
```tsx
<ComparisonCard 
  beforeLabel="Before" 
  beforeValue={3} 
  afterLabel="After"
  afterValue={0.33}
  unit=" hours"
  improvement="89% faster"
/>
```

### InteractiveTimeline (`components/dashboard/InteractiveTimeline.tsx`)

**Purpose:** Interactive timeline with clickable steps.

**Props:**
```typescript
interface TimelineStep {
  id: string;
  label: string;
  title: string;
  description: string;
  status?: 'complete' | 'current' | 'upcoming';
}

interface InteractiveTimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (step: TimelineStep) => void;
  className?: string;
}
```

**Usage:**
```tsx
<InteractiveTimeline 
  steps={sprintSteps}
  orientation="horizontal"
  onStepClick={(step) => console.log(step)}
/>
```

### ProjectBuilder (`components/dashboard/ProjectBuilder.tsx`)

**Purpose:** Visual representation of project progression.

**Props:**
```typescript
interface ProjectCategory {
  id: string;
  label: string;
  projects: Array<{
    title: string;
    description: string;
    time: string;
    highlight?: boolean;
  }>;
}

interface ProjectBuilderProps {
  categories: ProjectCategory[];
  onProjectHover?: (project: Project) => void;
  className?: string;
}
```

**Usage:**
```tsx
<ProjectBuilder 
  categories={projectCategories}
  onProjectHover={(project) => setHighlightedProject(project)}
/>
```

### ProgressBar (`components/dashboard/ProgressBar.tsx`)

**Purpose:** Animated progress bar.

**Props:**
```typescript
interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  color?: 'accent' | 'success' | 'primary';
  animated?: boolean;
  className?: string;
}
```

---

## Shared Components

### ProjectCard (`components/shared/ProjectCard.tsx`)

**Purpose:** Standardized project card component.

**Props:**
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  time?: string;
  highlight?: boolean;
  category?: string;
  onClick?: () => void;
  className?: string;
}
```

### Section (`components/shared/Section.tsx`)

**Purpose:** Standardized section wrapper.

**Props:**
```typescript
interface SectionProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'muted' | 'primary';
  className?: string;
}
```

### Grid (`components/shared/Grid.tsx`)

**Purpose:** Standardized grid layout.

**Props:**
```typescript
interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### ImagePlaceholder (`components/shared/ImagePlaceholder.tsx`)

**Purpose:** Placeholder for missing images.

**Props:**
```typescript
interface ImagePlaceholderProps {
  width?: number | string;
  height?: number | string;
  label?: string;
  aspectRatio?: 'square' | 'wide' | 'tall' | 'auto';
  className?: string;
}
```

---

## React Hooks

### useIntersection (`hooks/design-system/useIntersection.ts`)

**Purpose:** Track element intersection with viewport.

```typescript
const ref = useIntersection({
  threshold: 0.5,
  once: true,
  callback: (isIntersecting) => {
    if (isIntersecting) {
      // Element is in view
    }
  }
});
```

### useAnimatedValue (`hooks/design-system/useAnimatedValue.ts`)

**Purpose:** Animate numeric values (for counters, progress bars).

```typescript
const animatedValue = useAnimatedValue({
  from: 0,
  to: 100,
  duration: 2000,
  ease: 'easeOut'
});
```

### useInViewport (`hooks/design-system/useInViewport.ts`)

**Purpose:** Check if element is in viewport (simpler than useIntersection).

```typescript
const { ref, isInView } = useInViewport({
  threshold: 0.1,
  once: true
});
```

---

## Implementation Guidelines

### 1. Use Design Tokens
Always reference design tokens instead of hard-coding values:
```tsx
// ❌ Bad
<div className="bg-[#2C3E50] p-4">

// ✅ Good
<div className="bg-primary p-md">
```

### 2. Use Shared Components
Replace hard-coded elements with shared components:
```tsx
// ❌ Bad
<div className="bg-card border rounded-lg p-5">
  <h3>{title}</h3>
  <p>{description}</p>
</div>

// ✅ Good
<ProjectCard title={title} description={description} />
```

### 3. Use React Hooks for Interactivity
Leverage hooks for common patterns:
```tsx
// ✅ Good
const { ref, isInView } = useInViewport({ once: true });
const animatedValue = useAnimatedValue({ from: 0, to: 100 });
```

### 4. Follow Design Principles
- **Clarity Over Decoration**: Every element serves a purpose
- **Specificity Over Abstraction**: Use real data, not placeholders
- **Production Over Learning**: Professional, solid design
- **Respect Over Hype**: Subtle, confident interactions

---

## Component Patterns

### Dashboard Component Pattern
```tsx
"use client";

import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/design-system/useInViewport";
import { cn } from "@/lib/utils";

interface MyDashboardComponentProps {
  // Props
  className?: string;
}

export function MyDashboardComponent({ 
  className 
}: MyDashboardComponentProps) {
  const { ref, isInView } = useInViewport({ once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className={cn("dashboard-component", className)}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### Shared Component Pattern
```tsx
import { cn } from "@/lib/utils";
import { spacing, typography } from "@/lib/design-system/tokens";

interface MySharedComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function MySharedComponent({ 
  children, 
  className 
}: MySharedComponentProps) {
  return (
    <div className={cn("shared-component", className)}>
      {children}
    </div>
  );
}
```

---

## Next Steps

1. Create directory structure
2. Implement design tokens file
3. Build shared components first
4. Build dashboard components
5. Create React hooks
6. Refactor existing components to use library
7. Add interactive visualizations to homepage

