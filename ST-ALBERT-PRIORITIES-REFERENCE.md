# St-Albert 10 Priorities Page - Implementation Reference

**Created:** 2025-11-12
**Purpose:** Password-protected page for St-Albert quarterly priorities review
**Meeting Date:** Tomorrow (Nov 13, 2025)

---

## PROJECT OVERVIEW

Create a password-protected web page displaying 10 quarterly priorities for St-Albert Cheese to review before tomorrow's meeting with Valerie.

**Key Requirements:**
- Simple password protection with preview
- LemonBrand aesthetic styling
- Clear, professional presentation
- Mobile-responsive design
- Uses Shadcn UI components

---

## TECHNICAL IMPLEMENTATION

### Route Structure
```
/app/st-albert-q4-2025/
  ├── page.tsx (main component with password protection)
  └── layout.tsx (optional custom layout)
```

### Password Protection Pattern

**Simple client-side password check** (adequate for non-sensitive business docs):

```typescript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StAlbertQ4Page() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);

  const CORRECT_PASSWORD = "stalbert2025"; // Change as needed

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isUnlocked) {
    return <PasswordScreen
      onSubmit={handleSubmit}
      value={passwordInput}
      onChange={setPasswordInput}
      error={error}
    />;
  }

  return <PrioritiesContent />;
}
```

---

## LEMONBRAND AESTHETIC GUIDELINES

### Color Palette
```typescript
const colors = {
  primary: "orange-500",      // #f97316
  primaryHover: "orange-600", // #ea580c
  accent: "orange-100",       // Light accent
  neutral: "neutral-50/900",  // Background
  text: "neutral-900",        // Dark text
  textLight: "neutral-600",   // Secondary text
  border: "neutral-200",      // Borders
};
```

### Typography
- **Headings:** Bold, tracking-tight, large scale (text-4xl to text-6xl)
- **Body:** Clean, readable (text-base, text-neutral-600)
- **Accents:** Semibold, orange-500 for emphasis

### Component Style
- **Rounded corners:** rounded-2xl, rounded-3xl (generous)
- **Shadows:** hover:shadow-lg transitions
- **Spacing:** Generous padding (p-8, p-12)
- **Borders:** Subtle border-neutral-200
- **Gradients:** from-white to-neutral-50 backgrounds

### Layout Patterns (from existing pages)
```typescript
<div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
  <section className="relative py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      {/* Content */}
    </div>
  </section>
</div>
```

---

## PASSWORD SCREEN DESIGN

### Preview Section (Visible Before Password Entry)
```typescript
<div className="max-w-2xl mx-auto text-center mb-8">
  <div className="flex items-center justify-center gap-3 mb-6">
    <img
      src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
      alt="St Albert Cheese"
      className="h-16 w-auto"
    />
  </div>

  <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
    Q4 2025 Strategic Priorities
  </h1>

  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
    Quarterly Planning Review for St-Albert Cheese
  </p>

  <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-700 dark:text-orange-300 text-sm font-semibold">
    <span>📅</span>
    <span>Meeting: November 13, 2025</span>
  </div>
</div>
```

### Password Input Form
```typescript
<Card className="max-w-md mx-auto">
  <CardHeader>
    <CardTitle>Protected Document</CardTitle>
    <CardDescription>
      Please enter the password you received from Simon
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          className={error ? "border-red-500" : ""}
          autoFocus
        />
        {error && (
          <p className="text-sm text-red-500">
            Incorrect password. Please try again.
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        Unlock Document
      </Button>
    </form>
  </CardContent>
</Card>
```

---

## PRIORITIES CONTENT STRUCTURE

### Main Layout

```typescript
<div className="min-h-screen bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 py-12 px-4">
  <div className="max-w-5xl mx-auto">
    {/* Header with Logo and Title */}
    <Header />

    {/* Executive Summary Card */}
    <ExecutiveSummary />

    {/* 10 Priorities Grid */}
    <PrioritiesGrid />

    {/* Next Steps */}
    <NextSteps />
  </div>
</div>
```

### Header Component
```typescript
<div className="text-center mb-12">
  <img
    src="https://cdn.prod.website-files.com/67f2c3d3da332df3a9d5d98a/67f2c9fbe3dd7a3962ddff9a_St%20Albert%20Logo.svg"
    alt="St Albert Cheese"
    className="h-20 w-auto mx-auto mb-6"
  />
  <h1 className="text-5xl font-bold text-neutral-900 dark:text-white mb-3">
    Q4 2025 Strategic Priorities
  </h1>
  <p className="text-xl text-neutral-600 dark:text-neutral-400">
    Quarterly Planning Review • November 2025
  </p>
</div>
```

### Priority Card Design
```typescript
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader className="pb-3">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold text-lg flex items-center justify-center">
            {number}
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            {category}
          </Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <CardDescription className="text-base mb-4">
      {description}
    </CardDescription>

    {/* Key Metrics */}
    <div className="space-y-2 mb-4">
      <h4 className="font-semibold text-sm text-neutral-700">Key Metrics:</h4>
      <ul className="space-y-1">
        {metrics.map(metric => (
          <li className="text-sm text-neutral-600 flex items-center gap-2">
            <span className="text-orange-500">▸</span>
            {metric}
          </li>
        ))}
      </ul>
    </div>

    {/* Timeline */}
    <div className="flex items-center gap-2 text-sm text-neutral-500">
      <Calendar className="h-4 w-4" />
      <span>Target: {timeline}</span>
    </div>
  </CardContent>
</Card>
```

---

## THE 10 PRIORITIES CONTENT

**Note:** These need to be filled in with actual St-Albert quarterly priorities. Here's the structure:

```typescript
const PRIORITIES = [
  {
    number: 1,
    category: "Technology",
    title: "[PRIORITY 1 TITLE]",
    description: "[Detailed description of what this priority entails]",
    metrics: [
      "[Key metric 1]",
      "[Key metric 2]",
      "[Key metric 3]"
    ],
    timeline: "[Q4 2025 / December 2025 / etc.]",
    owner: "[Department/Person responsible]"
  },
  // ... repeat for priorities 2-10
];
```

### Categories to Consider
- Technology & Automation
- HR & Workforce Development
- Operations & Efficiency
- Product Development
- Marketing & Sales
- Finance & Cost Control
- Quality & Compliance
- Customer Experience
- Innovation & R&D
- Strategic Partnerships

---

## EXECUTIVE SUMMARY SECTION

```typescript
<Card className="mb-12 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200">
  <CardHeader>
    <CardTitle className="text-2xl">Executive Summary</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-600 mb-2">10</div>
        <div className="text-sm text-neutral-600">Strategic Priorities</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-600 mb-2">Q4</div>
        <div className="text-sm text-neutral-600">2025 Focus Period</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-600 mb-2">[X]</div>
        <div className="text-sm text-neutral-600">Key Initiatives</div>
      </div>
    </div>

    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
      [Brief overview paragraph about the quarterly focus and strategic direction]
    </p>
  </CardContent>
</Card>
```

---

## NEXT STEPS SECTION

```typescript
<Card className="mt-12">
  <CardHeader>
    <CardTitle>Next Steps</CardTitle>
  </CardHeader>
  <CardContent>
    <ol className="space-y-3">
      <li className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
          1
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Review All Priorities</div>
          <div className="text-sm text-neutral-600">Take time to review each priority in detail before our meeting</div>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
          2
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Prepare Questions</div>
          <div className="text-sm text-neutral-600">Note any questions or concerns about specific priorities</div>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
          3
        </div>
        <div>
          <div className="font-semibold text-neutral-900">Meeting Discussion</div>
          <div className="text-sm text-neutral-600">We'll discuss each priority and finalize our Q4 roadmap on November 13</div>
        </div>
      </li>
    </ol>

    <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <p className="text-sm text-neutral-700 dark:text-neutral-300">
        <strong>Questions?</strong> Contact Simon at simon@lemonbrand.io
      </p>
    </div>
  </CardContent>
</Card>
```

---

## REQUIRED SHADCN COMPONENTS

Install these components if not already available:
```bash
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add badge
```

### Imports Needed
```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Lock, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
```

---

## ANIMATIONS

### Password Unlock Animation
```typescript
<AnimatePresence mode="wait">
  {!isUnlocked ? (
    <motion.div
      key="password"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen flex items-center justify-center"
    >
      <PasswordScreen />
    </motion.div>
  ) : (
    <motion.div
      key="content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PrioritiesContent />
    </motion.div>
  )}
</AnimatePresence>
```

### Card Entrance Animations
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.1 }}
>
  <PriorityCard />
</motion.div>
```

---

## MOBILE RESPONSIVENESS

### Breakpoint Strategy
- **Mobile:** Single column, full-width cards
- **Tablet (md):** Two-column grid for priorities
- **Desktop (lg):** Two-column grid with wider max-width

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Priority cards */}
</div>
```

### Responsive Text Sizes
```typescript
<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
<p className="text-base sm:text-lg">
```

---

## DARK MODE SUPPORT

All components should support dark mode using Tailwind's `dark:` prefix:

```typescript
className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
```

---

## DEPLOYMENT CHECKLIST

1. ✅ Create `/app/st-albert-q4-2025/page.tsx`
2. ✅ Set password in environment variable or constant
3. ✅ Test password protection flow
4. ✅ Verify all 10 priorities display correctly
5. ✅ Test mobile responsiveness
6. ✅ Test dark mode
7. ✅ Verify St-Albert logo loads correctly
8. ✅ Share password with Valerie separately (SMS/email)
9. ✅ Send page URL to Valerie before meeting

---

## EXAMPLE URL STRUCTURE

**Production URL:** `https://lemonbrand.io/st-albert-q4-2025`
**Password:** `[Set and share separately with Valerie]`

---

## CONTENT TO BE ADDED

**ACTION REQUIRED:** Fill in the actual 10 priorities with:
- Priority title
- Detailed description
- Key metrics (3-5 per priority)
- Timeline/deadline
- Department/person responsible
- Any dependencies or prerequisites

**Sources for content:**
- `/Users/slbergeron/lemonbrandRelaunch/3-Strategy/clients/st-albert-cheese.md`
- Recent meeting notes
- Email communications with Valerie
- Q4 strategic planning documents

---

## NOTES

- Keep password simple but not guessable (e.g., "stalbert" + quarter + year)
- Consider adding a "Print" button for Valerie to keep a hard copy
- Add meta tags to prevent search engine indexing (noindex, nofollow)
- Consider session storage to keep unlocked state during session
- Test on mobile before sharing with client

---

**END OF REFERENCE DOCUMENT**

Use this document as your comprehensive guide when building the page with Shadcn MCP in the lemonbrand-website repository.
