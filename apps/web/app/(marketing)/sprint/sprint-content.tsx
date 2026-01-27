"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DotGridBackground } from "@/components/dot-grid-background";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { SubtleGradientBackground } from "@/components/gradient-blob";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  Check,
  X,
  Clock,
  Users,
  MessageSquare,
  Video,
  FileText,
  ChevronDown,
  Sparkles,
  Target,
  Hammer,
  Rocket,
  Search,
  Play,
  Settings,
  Code,
  Globe,
  Lightbulb,
  Flag,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Who this is for
const forYouItems = [
  {
    text: "Have ideas for tools but think they \"can't code\"",
    subtext: "You don't need to code. You need to communicate.",
  },
  {
    text: "Tried AI tools and got frustrated",
    subtext: "You're missing patterns, not ability.",
  },
  {
    text: "Learn better with deadlines and accountability",
    subtext: "The cohort keeps you moving.",
  },
  {
    text: "Want to build something specific—not just \"learn AI\"",
    subtext: "You pick the project. We help you scope it.",
  },
  {
    text: "Have 1-2 hours a day for a week",
    subtext: "It fits around a job. Barely.",
  },
];

// Not for you
const notForYouItems = [
  {
    text: "Want to passively watch content",
    subtext: "You're building every day. It's work.",
  },
  {
    text: "Need hand-holding through every line of code",
    subtext: "You'll learn to problem-solve, not copy-paste.",
  },
  {
    text: "Don't have a project in mind",
    subtext: "We can help you find one—but you need to want something.",
  },
];


// Detailed curriculum data
const curriculumDays = [
  {
    day: "0",
    title: "Get Ready to Build",
    duration: "30 min",
    isFree: true,
    icon: Settings,
    fascination: "You're not learning to code. You're learning to communicate with something that codes.",
    whatHappens: [
      "Choose your path: Cursor ($20/mo visual IDE) or Claude Code Terminal ($20/mo for Claude Pro)",
      "Set up billing and verify everything works",
      "Optional: Set up voice input (Wispr Flow) — talk faster than you type",
      "Pick YOUR project — a tool that does ONE thing well",
      "Generate your project-idea.md — Claude helps you clarify what you're actually building",
    ],
    keyInsight: "Before you write a single line of code, you'll have a clear project brief that sets up everything that follows.",
  },
  {
    day: "1",
    title: "Scope Your Project",
    duration: "60 min",
    isFree: true,
    icon: Target,
    fascination: "You don't know what you need until you talk it through.",
    whatHappens: [
      "No code today — that's intentional",
      "Use Claude as a thinking partner to scope your project",
      "Learn to reference files instead of pasting (scales as project grows)",
      "Make Claude disagree with you — surface problems before Day 5",
      "Generate project-scope.md with core feature, what's out, open questions",
    ],
    keyInsight: "Planning catches mistakes before they become code. Changing a plan is free. Changing code costs time.",
  },
  {
    day: "2",
    title: "Build Your Foundation",
    duration: "90 min",
    isFree: false,
    icon: Search,
    fascination: "The thinking is the hard part. The code is the cheap part.",
    whatHappens: [
      "Create CLAUDE.md — your project's persistent memory across sessions",
      "Learn Plan Mode vs Build Mode (when to review vs when to let Claude execute)",
      "Visualize your project with HTML before building it",
      "See your tool's flow before writing application code",
      "Test context: open fresh session, Claude already knows your project",
    ],
    keyInsight: "When you're stuck thinking, ask Claude to visualize it. HTML files are disposable thinking tools.",
  },
  {
    day: "3",
    title: "Build Your First Feature",
    duration: "2.5 hrs",
    isFree: false,
    icon: Code,
    fascination: "This is the fun part.",
    whatHappens: [
      "Create a real Next.js project (Claude sets everything up)",
      "See your app running at localhost:3000",
      "Set up Git and GitHub — your save point system",
      "Identify your critical first feature and build it",
      "Learn that errors are information, not failure — just paste them to Claude",
    ],
    keyInsight: "You're not expected to understand every line. Try things, see what happens, shape what emerges.",
  },
  {
    day: "4",
    title: "Make It Real",
    duration: "2.5 hrs",
    isFree: false,
    icon: Globe,
    fascination: "Anyone with a link can see it. That changes everything.",
    whatHappens: [
      "Learn the start-of-session ritual: recontextualize Claude in 30 seconds",
      "Deploy to Vercel (free) — your project goes live on the internet",
      "Experience push → live workflow (change code, push, see it live in 30 seconds)",
      "Fix common problems: mobile issues, layout problems, generic AI look",
      "Master the 2-3 Exchange Pattern: \"Here's what I have / what's wrong / what I wanted\"",
      "Share your URL, get real feedback from someone outside the Sprint",
    ],
    keyInsight: "Iterate, don't start over. Starting over throws away everything you've learned.",
  },
  {
    day: "5",
    title: "Add Real Value",
    duration: "2.5 hrs",
    isFree: false,
    icon: Lightbulb,
    fascination: "You have a system now.",
    whatHappens: [
      "Turn yesterday's feedback into today's features",
      "Add capabilities (things that matter) not features (things you list)",
      "Recognize the paradigm shift: agents aren't just for software",
      "Start capturing future project ideas — the habit that compounds",
      "Understand: 80% of what you do on a computer can be done better through an agent",
    ],
    keyInsight: "You didn't just learn to build an app. You learned a new way of using your computer.",
  },
  {
    day: "6",
    title: "Finish, Don't Perfect",
    duration: "90 min",
    isFree: false,
    icon: Flag,
    fascination: "Today is about stopping.",
    whatHappens: [
      "Recognize and resist the feature trap (\"just one more thing...\")",
      "Ask the 5 robustness questions: empty fields, unexpected input, empty states, too much data, obvious breaks",
      "Basic security check (2 minutes, not an audit)",
      "Final polish: loading states, confirmation messages, cleaner layout",
      "Prepare your one-sentence description for tomorrow",
    ],
    keyInsight: "You get better by building more things, not by perfecting one thing.",
  },
  {
    day: "7",
    title: "You Built Something Real",
    duration: "60 min",
    isFree: false,
    icon: Trophy,
    fascination: "Most people never build anything. You actually did it.",
    whatHappens: [
      "Record a 2-5 minute demo video (Loom or any screen recorder)",
      "Share with the cohort — video, live URL, one thing you learned",
      "Watch others' demos, celebrate each other",
      "Reflect on what you learned and decide what's next",
      "You're a builder now. That matters.",
    ],
    keyInsight: "Seven days ago, you had an idea. Now you have a working tool, live on the internet, that you built.",
  },
];

// FAQ items
const faqItems = [
  {
    question: "What if I fall behind?",
    answer: `Life happens. The cohort has a rhythm, but you can catch up.

The daily trainings are recorded.
The Discord channel stays active.
I'd rather you finish late than not at all.

That said—if you know you have a crazy week coming, wait for the next cohort.`,
  },
  {
    question: "What technical skills do I need?",
    answer: `None.

You don't need to know how to code.
You don't need a computer science background.
You don't need to have used Claude before.

If you can write clear instructions in English, you can do this.`,
  },
  {
    question: "What do I need to have installed?",
    answer: `• A computer (Mac or PC)
• Claude Code (free to install)
• An Anthropic API account (pay-as-you-go)

Day 0 covers setup. You'll be ready before Day 1.`,
  },
  {
    question: "How much will the API cost?",
    answer: `Most Sprint projects cost $5-20 in API credits.

That's the total for the whole week.

Verifiednode (a real SaaS) cost $600 over 2 months.
Your Sprint project is much smaller.`,
  },
  {
    question: "What if I don't have a project idea?",
    answer: `The Day 1 worksheet helps you find one.

But I'll give you a hint now:

Think about something that annoys you.
Something you wish worked differently.
Something you've tried to solve with existing tools but couldn't find quite the right thing.

That's your project.`,
  },
  {
    question: "Can I get a refund?",
    answer: `Two guarantees:

1. 48-hour money-back guarantee. Not what you expected? Full refund, no questions asked.

2. Completion credit. Finish all 7 days and your $297 becomes credit toward the 8-Week program (valid 12 months).

The first is a safety net. The second rewards follow-through.`,
  },
];

// What you get
const whatYouGet = [
  { icon: Video, text: "7 daily trainings (video + worksheet)" },
  { icon: MessageSquare, text: "Private Discord cohort channel" },
  { icon: Users, text: "Daily feedback on your project" },
  { icon: Calendar, text: "Ship Day call with live demos" },
  { icon: FileText, text: "CLAUDE.md template" },
];

// FAQ Accordion component
function FAQItem({
  question,
  answer,
}: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`font-semibold transition-colors duration-200 ${isOpen ? "text-accent" : ""}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="text-muted-foreground whitespace-pre-line">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Curriculum Day Accordion component
interface CurriculumDayData {
  day: string;
  title: string;
  duration: string;
  isFree: boolean;
  icon: typeof Settings;
  fascination: string;
  whatHappens: string[];
  keyInsight: string;
}

function CurriculumDay({ day }: { day: CurriculumDayData }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = day.icon;

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center gap-4 text-left group hover:bg-muted/30 transition-colors"
      >
        {/* Day number */}
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-5 h-5 text-accent" />
        </div>

        {/* Title and metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-sm font-semibold text-accent">
              Day {day.day}
            </span>
            <span className="text-muted-foreground">|</span>
            <span className="font-semibold truncate">{day.title}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{day.duration}</span>
            {day.isFree ? (
              <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-xs">
                FREE
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-xs">
                PAID
              </Badge>
            )}
          </div>
        </div>

        {/* Chevron */}
        <div
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
              {/* Fascination quote */}
              <p className="text-foreground font-medium italic">
                &ldquo;{day.fascination}&rdquo;
              </p>

              {/* What happens */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">What happens:</p>
                <ul className="space-y-2">
                  {day.whatHappens.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key insight */}
              <div className="bg-accent/5 border border-accent/20 rounded-md px-4 py-3">
                <p className="text-sm">
                  <span className="font-medium text-accent">Key insight:</span>{" "}
                  <span className="text-muted-foreground">{day.keyInsight}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SprintContent() {
  return (
    <main className="pt-16">
      {/* Back to Learn Hub */}
      <div className="px-4 py-3 bg-muted/30 border-b border-border/50">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Compare all programs</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <SubtleGradientBackground className="relative border-b border-border/50">
        <DotGridBackground fade="bottom" containerClassName="pt-40 sm:pt-48 lg:pt-60 pb-32 sm:pb-40 lg:pb-52 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Hero Icon */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <motion.div
                  className="w-24 h-24 sm:w-28 sm:h-28 relative"
                  initial={{ rotate: -5, scale: 1 }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src="/assets/3dicons/3dicons-flash-dynamic-color.png"
                    alt="Sprint"
                    fill
                    className="object-contain drop-shadow-xl"
                    unoptimized
                  />
                </motion.div>
              </motion.div>

              {/* Badge */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Badge
                  variant="accent"
                  className="px-4 py-1.5 text-sm font-medium gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  7-Day Intensive Sprint
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={fadeInUp} className="text-center space-y-6">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
                  I built my first tool in{" "}
                  <span className="text-accent">7 days</span>.
                </h1>

                <div className="text-xl sm:text-2xl text-muted-foreground leading-relaxed space-y-3 max-w-2xl mx-auto">
                  <p>
                    A Japanese recipe tracker. Nothing fancy.
                    <br />
                    But it worked. I made it. Me.
                  </p>
                  <p className="text-foreground font-medium text-lg sm:text-xl">
                    That was the moment everything changed.
                  </p>
                </div>
              </motion.div>

              {/* Offer Section */}
              <motion.div
                variants={fadeInUp}
                className="pt-8"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 sm:p-10 shadow-lg max-w-2xl mx-auto">
                  <div className="space-y-6 text-center">
                    <div className="space-y-4">
                      <p className="text-2xl sm:text-3xl font-display font-semibold">
                        Ship your first AI-built tool in 7 days.
                      </p>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground/80">Build something real:</p>
                        <ul className="space-y-1">
                          <li>• Replace a SaaS you&apos;re overpaying for</li>
                          <li>• Ship a lead-gen calculator or qualifier</li>
                          <li>• Prototype an offer and sell before building fully</li>
                        </ul>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-3">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/30 mb-2">
                        Days 0-1 Free
                      </Badge>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-5xl sm:text-6xl font-bold text-foreground">
                          Free to Start
                        </span>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        $297 to unlock Days 2-7
                      </p>

                      <div className="space-y-2 text-muted-foreground">
                        <p className="text-base sm:text-lg">
                          Complete all 7 days?
                        </p>
                        <p className="text-foreground font-medium text-base sm:text-lg">
                          That $297 becomes credit toward the 8-Week program.
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 space-y-2">
                      <Button variant="accent" size="lg" asChild className="text-base px-8 py-6 h-auto">
                        <Link href="https://learn.lemonbrand.io/sprint">
                          Start Free
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                      </Button>
                      <p className="text-sm text-muted-foreground">No credit card required</p>
                    </div>

                    {/* Self-paced Info */}
                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Self-paced — start anytime</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </DotGridBackground>
      </SubtleGradientBackground>

      {/* Video Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">
              See What You&apos;ll Build
            </h2>
            <p className="text-muted-foreground">
              Watch a 3-minute walkthrough of the Sprint experience
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-muted/50 to-muted rounded-xl border border-border/50 overflow-hidden group cursor-pointer">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-grid opacity-[0.03]" />

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent/90 rounded-full flex items-center justify-center shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>

            {/* Coming soon label */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                Video coming soon
              </Badge>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Section 1: What This Is */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              What This Is
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                The 7-Day Sprint is a structured program where you build
                something real with Claude Code.
              </p>
              <p>
                Not a tutorial. Not a demo.
                <br />
                <span className="text-foreground font-medium">
                  YOUR project. Something you actually want.
                </span>
              </p>
              <p>Every day for a week, you&apos;ll:</p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span>Watch a short training (10-15 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span>Work on your project (1-2 hours)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span>Share progress with the cohort</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                  <span>Get help when you&apos;re stuck</span>
                </li>
              </ul>
              <p className="pt-4 text-foreground font-medium">
                By Day 7, you ship a working tool.
                <br />
                Something that exists because you built it.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 2: Who This Is For */}
      <Section width="wide">
        <div className="space-y-12">
          {/* For you */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              This is for people who:
            </h2>

            <motion.div
              className="grid md:grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {forYouItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg border border-accent/20 transition-all duration-200 hover:border-accent/40"
                >
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Not for you */}
          <div className="space-y-6">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-center">
              This is NOT for people who:
            </h3>

            <motion.div
              className="grid md:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {notForYouItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
                >
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.subtext}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Section 3: Detailed Curriculum */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section width="wide" className="py-0 px-0">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                What You&apos;ll Learn — Day by Day
              </h2>
              <p className="text-muted-foreground">
                ~13 hours over 7 days. No fluff. Just building.
              </p>
            </div>

            {/* Curriculum Accordion */}
            <motion.div
              className="max-w-3xl mx-auto space-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {curriculumDays.map((day, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <CurriculumDay day={day} />
                </motion.div>
              ))}
            </motion.div>

            {/* Total Time Summary */}
            <div className="max-w-xl mx-auto bg-card border border-border/50 rounded-lg p-6">
              <div className="text-center space-y-3">
                <p className="font-semibold">Total: ~13 hours over 7 days</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">FREE</Badge>
                    <span>Days 0-1: 1.5 hours — setup + scope</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">$297</Badge>
                    <span>Days 2-7: 11.5 hours — build + ship</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  Self-paced. Start anytime. Keep access forever.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Mid-Page CTA 1: After Free Days */}
      <Section>
        <div className="max-w-xl mx-auto text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Days 0-1 are free. See if this is for you.
          </p>
          <Button variant="accent" size="lg" asChild>
            <Link href="https://learn.lemonbrand.io/sprint">
              Start Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Section 4: Who This Is For (already exists above) - now add Risk Reversal */}
      {/* Section 4: Win Your Money Back */}
      <Section>
        <div className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
            The Risk Reversal
          </h2>

          <div className="space-y-6">
            {/* Guarantee 1: Money-back */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-accent" />
                48-Hour Money-Back Guarantee
              </h3>
              <p className="text-muted-foreground">
                Not what you expected? Full refund within 48 hours, no questions asked.
              </p>
            </div>

            {/* Guarantee 2: Completion credit */}
            <div className="bg-card border border-accent/30 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Completion Credit
              </h3>
              <p className="text-muted-foreground mb-4">
                Complete all 7 days? Your $297 becomes credit toward the 8-Week program.
              </p>
              <p className="text-sm text-muted-foreground mb-3">Here&apos;s what &quot;complete&quot; means:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Finish each daily training and exercise
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Post progress in the cohort channel
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Submit your project on Ship Day
                </li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Credit valid for 12 months. Applies to any 8-Week tier.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mid-Page CTA 2: After Risk Reversal */}
      <section className="py-12 px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            Ready to build your first tool?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="https://learn.lemonbrand.io/sprint">
                Start Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                See Pricing
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <Section>
        <div className="space-y-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
            Questions you probably have
          </h2>

          <motion.div
            className="divide-y divide-border/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {faqItems.map((item, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <FAQItem question={item.question} answer={item.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Section 7: The Offer Box */}
      <section id="join" className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="bg-card border-2 border-accent/30 rounded-xl p-8 shadow-lg max-w-xl mx-auto">
            <div className="text-center space-y-6">
              <h2 className="font-display text-2xl font-semibold">
                7-Day Claude Code Sprint
              </h2>

              <div className="space-y-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                  Days 0-1 Free
                </Badge>
                <p className="text-4xl font-bold">Free to Start</p>
                <p className="text-muted-foreground">$297 to unlock Days 2-7</p>
              </div>

              <div className="space-y-3 text-left">
                <p className="font-medium text-center mb-4">What you get:</p>
                {whatYouGet.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-accent" />
                      <span className="text-muted-foreground">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-3">
                <p className="text-sm font-medium text-accent">
                  Complete all 7 days = $297 credit toward 8-Week
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Self-paced — <span className="font-medium">start anytime</span>
                </p>
              </div>

              <div className="space-y-2">
                <Button variant="accent" size="lg" className="w-full" asChild>
                  <Link href="https://learn.lemonbrand.io/sprint">
                    Start Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">No credit card required</p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 8: What Comes After */}
      <Section width="wide">
        <div className="space-y-8 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
            The path (if you want it)
          </h2>

          <p className="text-center text-muted-foreground">
            The Sprint is the starting point.
            <br />
            After you ship, you have options:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Option 1 */}
            <div className="bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30">
              <h3 className="font-semibold text-lg mb-2">Option 1: Stop Here</h3>
              <p className="text-muted-foreground text-sm">
                You built one tool. That might be all you needed.
                <br />
                You have the skill now. You can build more on your own.
              </p>
            </div>

            {/* Option 2 */}
            <div className="bg-card border border-accent/30 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              <h3 className="font-semibold text-lg mb-2">
                Option 2: Go Deeper with the 8-Week
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                If you caught the building bug, the 8-Week program takes you
                further:
              </p>
              <ul className="space-y-1 text-muted-foreground text-xs mb-4">
                <li>• Multiple projects</li>
                <li>• Databases, authentication</li>
                <li>• 1-on-1 calls (on higher tiers)</li>
              </ul>
              <div className="bg-accent/10 rounded px-2 py-1 text-center">
                <p className="text-xs font-medium text-accent">Use your $297 credit</p>
              </div>
            </div>

            {/* Option 3 */}
            <div className="bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30">
              <h3 className="font-semibold text-lg mb-2">
                Option 3: Join the Club (Later)
              </h3>
              <p className="text-muted-foreground mb-2 text-sm">
                After the 8-Week, the AI Builders Club keeps you building:
              </p>
              <ul className="space-y-1 text-muted-foreground text-xs mb-2">
                <li>• Monthly challenges</li>
                <li>• New patterns as AI evolves</li>
                <li>• Community</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4">
                $97/month. Cancel anytime.
              </p>
            </div>
          </div>

          <p className="text-center text-muted-foreground pt-4">
            Most people start with the Sprint.
            <br />
            Where you go from there is up to you.
          </p>
        </div>
      </Section>

      {/* Section 9: Final CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Section className="py-0 px-0">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-lg text-primary-foreground/80">
              You&apos;ve read this far.
            </p>
            <p className="text-primary-foreground/80">
              You either want to build something,
              <br />
              or you&apos;re really into reading sales pages.
            </p>
            <p className="text-lg font-medium">If it&apos;s the first one, start free.</p>

            <div className="space-y-2">
              <Button variant="accent" size="lg" asChild>
                <Link href="https://learn.lemonbrand.io/sprint">
                  Start Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-primary-foreground/60">
                No credit card required
              </p>
            </div>

            <p className="text-sm text-primary-foreground/60">
              Days 0-1 free. $297 to unlock the full Sprint.
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}
