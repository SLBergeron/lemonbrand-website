import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@lemonbrand/ui";
import { ArrowRight, Play, CheckCircle2, Clock, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "7-Day Sprint | Build Your First AI Tool",
  description:
    "Build your first AI-powered tool in 7 days using the Build Stack framework. No coding experience required.",
};

const DAYS = [
  {
    day: 0,
    title: "Setup + Project Selection",
    description: "Install Claude Code, define your project idea, create your CLAUDE.md",
    duration: 45,
    isFree: true,
  },
  {
    day: 1,
    title: "Scope + First Build",
    description: "Narrow scope, describe your MVP, get your first working code",
    duration: 60,
    isFree: true,
  },
  {
    day: 2,
    title: "Foundation",
    description: "Build the core data structures and basic functionality",
    duration: 90,
    isFree: false,
  },
  {
    day: 3,
    title: "Structure",
    description: "Add navigation, layouts, and connect components",
    duration: 90,
    isFree: false,
  },
  {
    day: 4,
    title: "Core Features",
    description: "Implement the main functionality that makes your tool valuable",
    duration: 120,
    isFree: false,
  },
  {
    day: 5,
    title: "Expand",
    description: "Add secondary features, error handling, edge cases",
    duration: 90,
    isFree: false,
  },
  {
    day: 6,
    title: "Polish",
    description: "Improve UI/UX, add loading states, fix bugs",
    duration: 90,
    isFree: false,
  },
  {
    day: 7,
    title: "Ship It",
    description: "Deploy your tool, share with the world",
    duration: 60,
    isFree: false,
  },
];

export default function SprintOverviewPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
            <Play className="size-3" />
            7-Day Sprint
          </span>
        </div>
        <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight">
          Build Your First AI Tool
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Go from project idea to deployed tool in 7 days. No coding experience
          required. You&apos;ll learn the Build Stack framework while building something
          real.
        </p>
      </header>

      {/* Free Trial CTA */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
        {/* Accent glow */}
        <div className="absolute -top-24 -right-24 size-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 size-32 rounded-full bg-success/15 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 p-6 lg:p-8">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              <Play className="size-3" />
              No credit card required
            </div>
            <h2 className="font-display font-bold text-xl lg:text-2xl">
              Try Days 0-1 Free
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Get Claude Code installed and build your first working prototype. See what&apos;s possible before you commit.
            </p>
          </div>
          <Button asChild variant="accent" size="lg" className="shrink-0">
            <Link href="/sprint/preview/day/0">
              Start Free Trial
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Day Cards */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl">Course Curriculum</h2>
        <div className="space-y-3">
          {DAYS.map((day) => (
            <DayCard key={day.day} {...day} />
          ))}
        </div>
      </section>

      {/* What You'll Build */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl">
          What You&apos;ll Learn
        </h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <span>
              How to communicate with Claude Code to build real software
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <span>
              The Build Stack framework: Context, Direction, Iteration, Verification
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <span>
              How to scope projects to ship fast (the 2-3 Exchange Pattern)
            </span>
          </li>
          <li className="flex gap-3">
            <CheckCircle2 className="size-5 text-success shrink-0 mt-0.5" />
            <span>
              Deploying with Vercel so your tool is live on the internet
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

function DayCard({
  day,
  title,
  description,
  duration,
  isFree,
}: {
  day: number;
  title: string;
  description: string;
  duration: number;
  isFree: boolean;
}) {
  const href = isFree ? `/sprint/preview/day/${day}` : `/sprint/day/${day}`;

  return (
    <Link
      href={href}
      className="group flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all"
    >
      {/* Day Badge */}
      <div
        className={`
          shrink-0 size-10 rounded-lg flex items-center justify-center font-display font-bold text-sm
          ${isFree ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}
        `}
      >
        {day}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-display font-semibold group-hover:text-accent transition-colors">
            {title}
          </h3>
          {isFree && (
            <span className="text-xs font-medium bg-success/10 text-success px-1.5 py-0.5 rounded">
              Free
            </span>
          )}
          {!isFree && (
            <Lock className="size-3.5 text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">
          {description}
        </p>
      </div>

      {/* Duration */}
      <div className="shrink-0 flex items-center gap-1 text-sm text-muted-foreground">
        <Clock className="size-3.5" />
        {duration}m
      </div>

      {/* Arrow */}
      <ArrowRight className="shrink-0 size-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
