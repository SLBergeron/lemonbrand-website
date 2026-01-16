"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { ProjectBuilder, type ProjectCategory } from "@/components/dashboard/ProjectBuilder";
import { SprintTimeline } from "@/components/timeline-progress";
import { ComparisonCard } from "@/components/dashboard/ComparisonCard";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { cn, getNextCohortDate } from "@/lib/utils";
import { VerifiednodeShowcase } from "@/components/verifiednode/verifiednode-showcase";

// Dynamic import for Lottie (client-side only)
const LottieAnimation = dynamic(
  () => import('@/components/lottie-animation').then(mod => mod.LottieAnimation),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-muted/20 rounded-xl" /> }
);

// Story panel component for the scroll-based narrative
function StoryPanel({
  children,
  className = "",
  delay = 0,
  variant = "default"
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "comic" | "emphasis";
}) {
  const baseClasses = variant === "comic"
    ? "relative bg-card border-2 border-foreground/10 rounded-xl p-6 sm:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.05)]"
    : variant === "emphasis"
    ? "relative"
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(baseClasses, className)}
    >
      {children}
    </motion.div>
  );
}

// Thought bubble for internal monologue
function ThoughtBubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="relative bg-muted/50 border border-border rounded-2xl px-6 py-4 italic">
        {children}
      </div>
      {/* Thought bubble dots */}
      <div className="absolute -bottom-2 left-8 w-3 h-3 bg-muted/50 border border-border rounded-full" />
      <div className="absolute -bottom-5 left-5 w-2 h-2 bg-muted/50 border border-border rounded-full" />
    </div>
  );
}

// Emotion indicator for comic-style reactions
function EmotionBurst({ emotion, className = "" }: { emotion: "frustration" | "confusion" | "relief" | "triumph"; className?: string }) {
  const emotionConfig = {
    frustration: { text: "!!!", color: "text-destructive", bg: "bg-destructive/10" },
    confusion: { text: "???", color: "text-amber-500", bg: "bg-amber-500/10" },
    relief: { text: "...", color: "text-muted-foreground", bg: "bg-muted" },
    triumph: { text: "!!!", color: "text-success", bg: "bg-success/10" },
  };

  const config = emotionConfig[emotion];

  return (
    <motion.span
      initial={{ scale: 0, rotate: -10 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-md font-bold text-sm",
        config.color,
        config.bg,
        className
      )}
    >
      {config.text}
    </motion.span>
  );
}

// Code block visual for the "typed command" moments
function TypedCommand({ text, failed = false }: { text: string; failed?: boolean }) {
  return (
    <div className={cn(
      "font-mono text-sm sm:text-base md:text-lg p-4 sm:p-6 rounded-lg border relative",
      failed ? 'bg-destructive/5 border-destructive/30' : 'bg-muted/50 border-border'
    )}>
      <span className="text-muted-foreground select-none">→ </span>
      <span className={failed ? 'text-foreground' : 'text-foreground'}>{text}</span>
      {failed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-destructive/20 text-destructive text-xs">✕</span>
          <span className="text-xs text-destructive/80">247 lines of code you don&apos;t understand</span>
        </motion.div>
      )}
    </div>
  );
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

function SubscriptionStatus() {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get("subscribed");
  const unsubscribed = searchParams.get("unsubscribed");
  const error = searchParams.get("error");

  if (subscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-success text-success-foreground px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        You&apos;re subscribed. Check your email.
      </div>
    );
  }

  if (unsubscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        You&apos;ve been unsubscribed.
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-destructive text-white px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        Something went wrong. Please try again.
      </div>
    );
  }

  return null;
}

// Project categories for ProjectBuilder component
const projectCategories: ProjectCategory[] = [
  {
    id: "personal",
    label: "Personal Life",
    description: "I started here. Small tools. Things that annoyed me.",
    projects: [
      {
        title: "Recipe Tracker",
        description: "I love Japanese food. Every recipe app was either too simple or cluttered with features I'd never use. I built a clean way to organize my recipes exactly how I think about them.",
        time: "One afternoon",
      },
      {
        title: "Workout Logger",
        description: "I just wanted to track reps and sets. That's it. No social features, no AI coaching, no gamification. Simple.",
        time: "~3 hours",
      },
      {
        title: "Day Tracker",
        description: "A place to track my days and express my thoughts. Simple journaling that fits how I actually think, not how some app designer thinks I should.",
        time: "One weekend",
      },
    ],
  },
  {
    id: "home",
    label: "Home + Family",
    description: "Once it clicked, I started seeing problems everywhere.",
    projects: [
      {
        title: "Renovation Planner",
        description: "Take pictures of a room, use Nanobanana to visualize changes, then generate a list and bill of materials. See the renovation before you start it.",
        time: "~6 hours over two days",
      },
      {
        title: "New Year's Letter System",
        description: "Every year I send friends and family a personalized website instead of a card. Videos, photos, updates—a real web experience. The system lets me create a new one each year.",
        time: "One evening",
      },
    ],
  },
  {
    id: "work",
    label: "Work",
    description: "Then I started solving problems that saved me real time.",
    projects: [
      {
        title: "Document-to-Spreadsheet Scripts",
        description: "I had stacks of handwritten reports I needed in a spreadsheet. Built a tool to extract the data and put it straight into Excel.",
        time: "~2 hours",
      },
      {
        title: "Custom Dashboards",
        description: "A client needed to analyze a lot of HR data. I built her a custom dashboard so she could evaluate everything in one place and run her own analysis.",
        time: "2-4 hours each",
      },
    ],
  },
];

// Testimonials with metrics
const testimonials = [
  {
    quote: "I was spending 3 hours on every client proposal. Day 5 of the Sprint, I had a working prototype. Day 7, I used it on a real client. Now I spend 20 minutes instead of 3 hours.",
    name: "Sarah M.",
    role: "Marketing Consultant",
    beforeValue: 3,
    afterValue: 0.33,
    unit: " hours",
    improvement: "89% faster",
  },
  {
    quote: "After every call, I'd spend 20-30 minutes on notes. By Day 3, I had a meeting summarizer that extracts exactly what I need. I saved 2 hours a day. Not exaggerating.",
    name: "Mike T.",
    role: "Account Manager",
    beforeValue: 25,
    afterValue: 0,
    unit: " minutes",
    improvement: "100% automated",
  },
  {
    quote: "I thought building tools was for developers. Turns out it's for anyone who can explain what they want. That was the unlock for me.",
    name: "Lisa D.",
    role: "Product Manager",
    beforeValue: null,
    afterValue: null,
    unit: "",
    improvement: null,
  },
];

// What you'll understand
const understandItems = [
  "The \"context file\" that makes Claude remember your preferences, your project, your constraints—so you stop re-explaining everything",
  "Why starting with \"build me an app\" fails, and the 3-part request structure that actually works",
  "The iteration pattern that fixes bad outputs in 2-3 exchanges instead of starting over from scratch",
  "How to scope a project so it's buildable in a weekend (not a fantasy that spirals into complexity)",
  "What to do when Claude builds something that works but isn't what you meant—the specific questions that close the gap",
  "Why \"be more specific\" is bad advice, and what actually makes a request clear to AI",
  "The debugging conversation—how to describe what's broken when you don't understand the code",
  "Why your first instinct when something fails is usually wrong, and the counter-intuitive approach that fixes things faster",
];

// What you'll build
const buildItems = [
  "Something YOU choose—personal, work, or business (not a tutorial project that teaches concepts but gathers dust)",
  "A tool that actually runs—on your computer or on the web (not code snippets you don't know how to use)",
  "The foundation for everything else you'll want to make (because the skill transfers to any project)",
];

export default function HomeContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const lottieScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const lottieOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const nextCohort = getNextCohortDate();

  return (
    <>
      <main className="pt-14 sm:pt-16">
        {/* Hero: Scroll-Based Story */}
        <div ref={heroRef} className="relative">
          {/* Sticky Lottie Animation - Large and Prominent */}
          <motion.div
            className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-0 overflow-hidden"
            style={{ opacity: lottieOpacity, scale: lottieScale }}
          >
            <div className="w-full max-w-xl lg:max-w-3xl px-4">
              <LottieAnimation
                src="https://lottie.host/cc6c7c20-9996-4795-a040-d7aee572c073/SUAeelEDMA.lottie"
                loop
                autoplay
              />
            </div>
            {/* Enhanced Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-sm text-muted-foreground font-medium tracking-wide">Scroll to begin</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="p-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Story Panels - Scroll Narrative */}
          <div className="relative z-10">
            {/* Panel 1: Opening */}
            <div className="min-h-[85vh] flex items-center justify-center px-4">
              <StoryPanel className="max-w-2xl mx-auto text-center space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed">
                  The first time I tried Claude Code,
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  I thought I had it figured out.
                </p>
              </StoryPanel>
            </div>

            {/* Panel 2: First Attempt */}
            <div className="min-h-[50vh] flex items-center justify-center px-4 bg-gradient-to-b from-transparent via-background to-background">
              <StoryPanel variant="comic" className="max-w-2xl mx-auto space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground text-center">I typed:</p>
                <TypedCommand text='"Build me an app that tracks my recipes."' failed />
                <div className="text-center space-y-2">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    It gave me code. A lot of code.
                  </p>
                  <p className="text-foreground font-medium flex items-center justify-center gap-2">
                    I didn&apos;t know what to do with it. <EmotionBurst emotion="confusion" />
                  </p>
                </div>
              </StoryPanel>
            </div>

            {/* Panel 3: Second Attempt */}
            <div className="min-h-[45vh] flex items-center justify-center px-4">
              <StoryPanel variant="comic" className="max-w-2xl mx-auto space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground text-center">I tried again:</p>
                <TypedCommand text='"Build me a simple recipe tracker."' failed />
                <p className="text-base sm:text-lg text-muted-foreground text-center flex items-center justify-center gap-2">
                  More code. Still didn&apos;t work. <EmotionBurst emotion="frustration" />
                </p>
              </StoryPanel>
            </div>

            {/* Panel 4: The Doubt */}
            <div className="min-h-[45vh] flex items-center justify-center px-4">
              <StoryPanel className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground">
                  I closed the laptop thinking:
                </p>
                <ThoughtBubble className="mx-auto">
                  <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80">
                    Maybe this isn&apos;t for people like me.
                  </p>
                </ThoughtBubble>
              </StoryPanel>
            </div>

            {/* Panel 5: Time Jump */}
            <div className="min-h-[35vh] flex items-center justify-center px-4 bg-muted/30 border-y border-border/30">
              <StoryPanel className="max-w-2xl mx-auto text-center">
                <motion.p
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                >
                  That was 18 months ago.
                </motion.p>
              </StoryPanel>
            </div>

            {/* Panel 6: The Transformation */}
            <div className="min-h-[55vh] flex items-center justify-center px-4 py-12">
              <StoryPanel className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg sm:text-xl text-center text-muted-foreground">
                  Since then, I&apos;ve built:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { title: "Recipe Tracker", subtitle: "Japanese food", emoji: "🍳" },
                    { title: "Workout Logger", subtitle: "3 hours", emoji: "💪" },
                    { title: "Day Tracker", subtitle: "journaling", emoji: "🎯" },
                    { title: "Renovation Planner", subtitle: "Nanobanana", emoji: "🏠" },
                    { title: "Custom Dashboards", subtitle: "for a client", emoji: "📊" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-3 bg-card border border-border/50 rounded-lg text-center"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="font-medium text-sm mt-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 bg-accent/10 border-2 border-accent/30 rounded-xl text-center"
                >
                  <p className="text-base sm:text-lg font-semibold flex items-center justify-center gap-2">
                    And Verifiednode <EmotionBurst emotion="triumph" />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A real SaaS with 58,000 contractor records and paying customers.
                  </p>
                </motion.div>
              </StoryPanel>
            </div>

            {/* Panel 7: The Reveal */}
            <div className="min-h-[50vh] flex items-center justify-center px-4 bg-gradient-to-b from-background via-muted/20 to-background">
              <StoryPanel className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Same tool. Different approach.
                </p>
                <div className="space-y-3">
                  <p className="text-base text-muted-foreground">The difference?</p>
                  <motion.p
                    initial={{ scale: 0.95 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                  >
                    <span className="bg-accent/20 px-3 py-1 rounded-md inline-block">
                      I learned how to communicate with AI.
                    </span>
                  </motion.p>
                </div>
                <p className="text-lg sm:text-xl font-medium">
                  Not coding. <span className="text-accent">Communication.</span>
                </p>
              </StoryPanel>
            </div>

            {/* Panel 8: The Promise */}
            <div className="min-h-[45vh] flex items-center justify-center px-4 pb-12">
              <StoryPanel className="max-w-2xl mx-auto text-center space-y-6">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  If you&apos;ve tried to build something with AI and it didn&apos;t work,<br />
                  you&apos;re not bad at this.
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  You&apos;re missing a learnable skill.
                </p>
                <div className="pt-4">
                  <p className="text-lg sm:text-xl font-medium text-foreground">
                    Here&apos;s what I wish someone had told me on day one.
                  </p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mt-4"
                  >
                    <ChevronDown className="w-5 h-5 mx-auto text-muted-foreground animate-bounce" />
                  </motion.div>
                </div>
              </StoryPanel>
            </div>
          </div>
        </div>

        {/* Section 2: The Recognition */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <Section className="py-0 px-0">
              <div className="text-center space-y-6">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                    You&apos;ve tried using AI to build things.
                </h2>
                <p className="text-xl text-muted-foreground">
                    It didn&apos;t go the way the tutorials made it look.
                </p>
              </div>
          </Section>
        </section>

        {/* Section 3: Validation */}
        <Section>
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">
                  You asked Claude to make something. It gave you code.
                  You didn&apos;t know what to do with the code.
                </p>
                <p className="text-lg text-muted-foreground">
                  Or it built something—but not what you actually wanted.
                </p>
                <p className="text-lg text-muted-foreground">
                  Or it worked at first, then broke, and you couldn&apos;t fix it.
                </p>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
                  Here&apos;s what probably happened
                </p>
                <div className="space-y-3">
                  {[ 
                    "Claude built something, but it wasn't what you meant",
                    "You tried to explain what was wrong—it got worse",
                    "You didn't know what questions to ask when you got stuck",
                    "The code worked, then you changed something, and it broke",
                    "You spent 2 hours and ended up with nothing usable",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 border border-border rounded flex-shrink-0 mt-0.5 bg-muted/20" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-lg text-muted-foreground">
                  You closed the laptop thinking: <span className="italic">&quot;Maybe this isn&apos;t for people like me.&quot;</span>
                </p>
                <p className="text-lg font-medium">
                  Here&apos;s what no one told you: That&apos;s what happened to everyone the first time. Including me.
                </p>
              </div>
            </div>
        </Section>

        {/* CTA Block */}
        <Section className="py-12">
          <CallToAction
            title="Stop fighting the tools."
            description="Get the exact context file I use to make Claude remember my preferences, project structure, and constraints."
            primaryCtaText="Get Free Template"
            primaryCtaLink="/free/claudemd"
            secondaryCtaText="Learn about the Sprint"
            secondaryCtaLink="/sprint"
            spotlightColor="rgba(150, 150, 150, 0.1)"
            canvasColors={[[100, 100, 100], [150, 150, 150]]}
            radius={250}
          />
        </Section>

        {/* Section 4: The Reframe - Projects Built */}
        <Section width="wide" className="overflow-visible">
            <div className="space-y-12 overflow-visible pr-4 md:pr-8">
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  The skill isn&apos;t what you think it is
                </h2>
                <p className="text-lg text-muted-foreground">
                  I&apos;m not a developer. I&apos;m a product manager.
                </p>
                <p className="text-lg text-muted-foreground">
                  But in the last year, I&apos;ve built:
                </p>
              </div>

              {/* Project Builder Visualization */}
              <ProjectBuilder categories={projectCategories} />

              {/* Verifiednode - Full Width Visual Showcase */}
              <div className="mt-12 space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                    Business
                  </p>
                  <p className="text-muted-foreground">Then I launched a business.</p>
                </div>
                <div className="pt-6">
                  <VerifiednodeShowcase className="w-full" />
                </div>
              </div>

              {/* Reframe Statement */}
              <div className="bg-muted/50 rounded-lg p-8 text-center space-y-4 max-w-3xl mx-auto">
                <p className="text-lg font-medium">Every one of these started as an idea I couldn&apos;t find an app for.</p>
                <p className="text-muted-foreground">
                  Before: hire a developer, wait 3 months, spend $15K.
                </p>
                <p className="text-muted-foreground">
                  Now: build it myself in a weekend. Own it forever. Change it whenever I want.
                </p>
                <p className="text-muted-foreground">
                  That spreadsheet you&apos;ve been maintaining by hand? The process you wish was automated? The tool that almost exists but not quite?
                </p>
                <p className="font-medium pt-2 text-foreground">
                  You can build exactly what you need. Without writing code. Without hiring anyone.
                </p>
              </div>
            </div>
        </Section>

        {/* Section 5: Fascinations */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <Section width="wide" className="py-0 px-0">
              <div className="space-y-8 sm:space-y-12">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                  What changes when you learn to communicate with AI
                </h2>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* What you'll understand */}
                  <div className="space-y-6">
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold border-b border-border pb-2">
                      What you&apos;ll understand
                    </h3>
                    <div className="space-y-4">
                      {understandItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <div className="mt-1 p-1 bg-accent/10 rounded-sm group-hover:bg-accent/20 transition-colors">
                              <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What you'll build */}
                  <div className="space-y-6">
                    <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold border-b border-border pb-2">
                      What you&apos;ll build
                    </h3>
                    <div className="space-y-4">
                      {buildItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 group">
                          <div className="mt-1 p-1 bg-success/10 rounded-sm group-hover:bg-success/20 transition-colors">
                            <ArrowRight className="w-3 h-3 text-success flex-shrink-0" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </Section>
        </section>

        {/* Section 6: The Offer - Sprint Breakdown */}
        <Section width="wide" className="overflow-x-visible">
            <div className="space-y-8 sm:space-y-12">
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                The 7-Day Sprint
              </h2>

              {/* Sprint Timeline - allow horizontal scroll */}
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <SprintTimeline className="mt-4 sm:mt-8" />
              </div>
            </div>
        </Section>

        {/* Section 7: Risk Reversal */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <Section className="py-0 px-0">
              <div className="space-y-8 sm:space-y-12">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold text-center">
                  The part where I handle your objections
                </h2>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {/* Objection 1 */}
                    <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-background rounded-lg border border-border/50 shadow-sm">
                      <h3 className="font-semibold text-lg">&quot;What if I don&apos;t finish?&quot;</h3>
                      <div className="text-muted-foreground space-y-3">
                        <p>The Sprint is designed so you WILL finish.</p>
                        <ul className="space-y-1 pl-4 text-sm">
                          <li>• Achievable scope (we help you pick the right project)</li>
                          <li>• Daily accountability (you&apos;re not doing this alone)</li>
                          <li>• 1-2 hours per day (fits around your job)</li>
                        </ul>
                        <p className="pt-2">But here&apos;s the real answer:</p>
                        <p className="p-3 bg-accent/10 rounded-md border border-accent/20 text-foreground font-medium text-sm">
                          $297 is the price. Complete all 7 days? That $297 becomes credit toward the 8-Week.
                        </p>
                        <p>You&apos;re not spending money to learn. You&apos;re putting down a deposit on a skill—and you earn it back when you follow through.</p>
                      </div>
                    </div>

                    {/* Objection 2 */}
                    <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-background rounded-lg border border-border/50 shadow-sm">
                      <h3 className="font-semibold text-lg">&quot;What if it doesn&apos;t work for me?&quot;</h3>
                      <div className="text-muted-foreground space-y-3">
                        <p>If you can explain what you want clearly in English, you can learn to communicate with AI.</p>
                        <p>That&apos;s the whole skill. Thinking through what you want. Expressing it in a way that gets results.</p>
                        <p>If you&apos;re good at giving instructions—to people, to teams, to anyone—you have the foundation.</p>
                      </div>
                    </div>

                    {/* Objection 3 */}
                    <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-background rounded-lg border border-border/50 shadow-sm">
                      <h3 className="font-semibold text-lg">&quot;Is this just for technical people?&quot;</h3>
                      <div className="text-muted-foreground space-y-3">
                        <p>I&apos;m a product manager. Not a developer.</p>
                        <p>The people who do best in the Sprint are:</p>
                        <ul className="space-y-1 pl-4 text-sm">
                          <li>• Consultants who want custom tools for clients</li>
                          <li>• Operators who want to automate repetitive work</li>
                          <li>• Founders who want to prototype without hiring devs</li>
                          <li>• Professionals who have ideas but thought they couldn&apos;t build them</li>
                        </ul>
                        <p className="pt-2">The less &quot;technical&quot; you are, the more valuable this skill becomes.</p>
                      </div>
                    </div>

                    {/* Objection 4 */}
                    <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 bg-background rounded-lg border border-border/50 shadow-sm">
                      <h3 className="font-semibold text-lg">&quot;Can I just learn this from your free content?&quot;</h3>
                      <div className="text-muted-foreground space-y-3">
                        <p>You can learn a lot from the free content. Genuinely.</p>
                        <p>The Sprint is for people who want:</p>
                        <ul className="space-y-1 pl-4 text-sm">
                          <li>• Accountability (a cohort, a deadline, a commitment)</li>
                          <li>• Feedback (when you&apos;re stuck, someone helps)</li>
                          <li>• Speed (7 days instead of 7 months of trial and error)</li>
                        </ul>
                        <p className="pt-2">If you&apos;re disciplined enough to learn alone, go for it. The YouTube videos are real education, not bait.</p>
                        <p>But if you&apos;re the type who needs structure to follow through, the Sprint exists for you.</p>
                      </div>
                    </div>
                </div>
              </div>
          </Section>
        </section>

        {/* Section 7.5: Testimonials */}
        <Section width="wide">
            <div className="space-y-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
                What Sprint Participants Say
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="space-y-4 flex flex-col h-full">
                    <div className="bg-card border border-border/50 rounded-lg p-6 flex-1 shadow-sm">
                      <p className="text-muted-foreground mb-4 italic leading-relaxed">
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border/30">
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    {/* Show comparison card if metrics exist */}
                    {testimonial.beforeValue !== null && testimonial.afterValue !== null && (
                      <ComparisonCard
                        beforeLabel="Before"
                        beforeValue={testimonial.beforeValue}
                        afterLabel="After"
                        afterValue={testimonial.afterValue}
                        unit={testimonial.unit}
                        improvement={testimonial.improvement || undefined}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
        </Section>

        {/* Section 8: The Offer Box */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <Section className="py-0 px-0">
              <div className="bg-card border-2 border-accent rounded-xl p-4 sm:p-8 md:p-12 text-center shadow-accent/10 shadow-lg max-w-2xl mx-auto">
                <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2">
                  7-Day Claude Code Sprint
                </h3>
                <p className="text-4xl sm:text-5xl font-bold text-accent mb-6 sm:mb-8 tracking-tight">$297</p>

                <div className="text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8 bg-background p-4 sm:p-6 rounded-lg border border-border">
                  {[
                    "Build YOUR project (not a tutorial)",
                    "Daily sessions with the cohort",
                    "1-2 hours per day, fits around your job",
                    "Complete all 7 days = $297 credit toward 8-Week",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-foreground/90">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
                  <p>Next cohort: {nextCohort}</p>
                  <p>Spots: 10 (small so everyone ships)</p>
                </div>

                <Button variant="accent" size="lg" className="w-full text-sm sm:text-base md:text-lg h-11 sm:h-12" asChild>
                  <Link href="/join/sprint">
                    Join the Sprint
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </Button>
              </div>
          </Section>
        </section>

        {/* Section 9: The Ladder */}
        <Section width="wide">
            <div className="space-y-8 sm:space-y-12">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                  Where this goes (if you want)
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  The Sprint is the starting point, not the destination. Here&apos;s the full path—not because I&apos;m upselling you, but because you should know what&apos;s possible:
                </p>
              </div>

              {/* Responsive Ladder Grid - Mobile Stack / Desktop Horizontal */}
              <div className="relative">
                 {/* Desktop Connection Line - Horizontal */}
                 <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-success -z-10 opacity-30 transform -translate-y-1/2" />

                 <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {/* Sprint */}
                    <Link href="/sprint" className="block h-full">
                      <FeatureCard step="1" className="h-full group/card cursor-pointer hover:border-accent/50 transition-colors">
                           <div className="p-4 space-y-4">
                              <div className="w-full h-32 flex items-center justify-center mb-4 relative">
                                <motion.div
                                  className="w-24 h-24 sm:w-28 sm:h-28 relative z-20"
                                  initial={{ rotate: -5, scale: 1 }}
                                  whileHover={{ rotate: 5, scale: 1.1 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <Image
                                    src="/assets/3dicons/3dicons-flash-dynamic-color.png"
                                    alt="Sprint"
                                    fill
                                    className="object-contain drop-shadow-xl group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform duration-300"
                                    unoptimized
                                  />
                                </motion.div>
                              </div>
                              <h3 className="font-semibold text-xl">SPRINT</h3>
                              <p className="text-muted-foreground">You ship one tool. You prove you can do this.</p>
                              <div className="pt-4 mt-auto">
                                  <p className="text-sm text-accent font-medium">$297</p>
                                  <p className="text-xs text-muted-foreground">(becomes credit if you complete)</p>
                              </div>
                           </div>
                      </FeatureCard>
                    </Link>

                    {/* Arrow Down Mobile */}
                    <div className="flex justify-center md:hidden">
                        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
                    </div>

                    {/* 8-Week */}
                    <Link href="/8-week" className="block h-full">
                      <FeatureCard step="2" className="h-full border-primary/20 group/card cursor-pointer hover:border-primary/50 transition-colors">
                           <div className="p-4 space-y-4">
                              <div className="w-full h-32 flex items-center justify-center mb-4 relative">
                                <motion.div
                                  className="w-24 h-24 sm:w-28 sm:h-28 relative z-20"
                                  initial={{ rotate: 3, scale: 1 }}
                                  whileHover={{ rotate: -5, scale: 1.1 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <Image
                                    src="/assets/3dicons/3dicons-calender-dynamic-color.png"
                                    alt="8-Week Program"
                                    fill
                                    className="object-contain drop-shadow-xl group-hover/card:scale-110 group-hover/card:-rotate-3 transition-transform duration-300"
                                    unoptimized
                                  />
                                </motion.div>
                              </div>
                              <h3 className="font-semibold text-xl">8-WEEK</h3>
                              <p className="text-muted-foreground">You build the skill permanently. More projects. Deeper patterns. Databases, authentication, deployment.</p>
                              <div className="pt-4 mt-auto">
                                  <p className="text-sm text-primary font-medium">$997 - $4,997</p>
                                  <p className="text-xs text-muted-foreground">depending on support level</p>
                              </div>
                           </div>
                      </FeatureCard>
                    </Link>

                    {/* Arrow Down Mobile */}
                    <div className="flex justify-center md:hidden">
                        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
                    </div>

                    {/* Club */}
                    <Link href="/club" className="block h-full">
                      <FeatureCard step="3" className="h-full border-success/20 group/card cursor-pointer hover:border-success/50 transition-colors">
                           <div className="p-4 space-y-4">
                              <div className="w-full h-32 flex items-center justify-center mb-4 relative">
                                <motion.div
                                  className="w-24 h-24 sm:w-28 sm:h-28 relative z-20"
                                  initial={{ rotate: 5, scale: 1 }}
                                  whileHover={{ rotate: -3, scale: 1.1 }}
                                  transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                  <Image
                                    src="/assets/3dicons/3dicons-trophy-dynamic-color.png"
                                    alt="Club"
                                    fill
                                    className="object-contain drop-shadow-xl group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300"
                                    unoptimized
                                  />
                                </motion.div>
                              </div>
                              <h3 className="font-semibold text-xl">CLUB</h3>
                              <p className="text-muted-foreground">You keep building with a community. Monthly challenges. New patterns. Office hours.</p>
                              <div className="pt-4 mt-auto">
                                  <p className="text-sm text-success font-medium">$97/month</p>
                                  <p className="text-xs text-muted-foreground">cancel anytime</p>
                              </div>
                           </div>
                      </FeatureCard>
                    </Link>
                 </div>
              </div>

              <div className="text-center text-muted-foreground space-y-2 pt-8">
                <p>Most people start with the Sprint.</p>
                <p>Some stay there—one tool was all they needed.</p>
                <p>Some go deeper—they catch the building bug.</p>
                <p className="font-medium text-foreground pt-2">The skill is the same either way. How far you take it is up to you.</p>
              </div>
            </div>
        </Section>

        {/* Section 10: Final Word */}
        <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 bg-primary text-primary-foreground">
          <Section className="py-0 px-0">
              <div className="text-center space-y-6 sm:space-y-8 max-w-3xl mx-auto">
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-semibold">
                  Here&apos;s what I actually believe
                </h2>

                <div className="text-primary-foreground/80 space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed">
                  <p>You&apos;ve had ideas for tools that would make your life better.</p>
                  <p>Personal things. Work things. Maybe business things.</p>
                  <p>You didn&apos;t build them because you thought you couldn&apos;t. Because you &quot;don&apos;t code.&quot; Because it seemed like a skill you&apos;d need years to learn.</p>
                  <p className="text-primary-foreground font-medium pt-2 text-lg sm:text-xl">That barrier is gone now.</p>
                  <p>Not because AI is magic—it&apos;s not. But because the skill that matters isn&apos;t coding anymore. It&apos;s communication. Clarity. Knowing what you want.</p>
                  <p className="font-medium">That&apos;s something you can learn in a week.</p>
                  <p className="pt-2">The only question is whether you&apos;ll learn it now, or keep watching other people build things.</p>
                  <p>I can&apos;t decide that for you.</p>
                  <p className="text-primary-foreground font-semibold text-lg sm:text-xl pt-4">But if you&apos;re ready, I&apos;ll show you how.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8">
                  <Button variant="accent" size="lg" className="text-sm sm:text-base md:text-lg h-11 sm:h-12" asChild>
                    <Link href="/join/sprint">
                      Join the Next Sprint — $297
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 h-11 sm:h-12 text-sm sm:text-base"
                    asChild
                  >
                    <Link href="/free/claudemd">
                      Get Free Template First
                    </Link>
                  </Button>
                </div>

                <p className="text-xs sm:text-sm text-primary-foreground/60 pt-4">
                  Next cohort starts {nextCohort}. 10 spots. We keep it small.
                </p>
              </div>
          </Section>
        </section>

        {/* Subscription Status Toast */}
        <Suspense fallback={null}>
          <SubscriptionStatus />
        </Suspense>
      </main>
    </>
  );
}
