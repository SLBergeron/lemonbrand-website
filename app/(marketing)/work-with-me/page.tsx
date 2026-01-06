"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CONSTANTS } from "@/constants/links";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import FollowCTA from "@/components/FollowCTA";
import { ArrowRight, Check, Users, Zap, BookOpen, TrendingUp } from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function WorkWithMePage() {
  const parentRef = useRef<HTMLDivElement>(null);

  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
    theme: "auto",
  });

  const painPoints = [
    {
      title: "Everyone's experimenting, nobody's shipping",
      description:
        "Your developers try random AI tools but nothing sticks. No consistent approach, no shared knowledge, no compound gains.",
    },
    {
      title: "The best practices don't exist yet",
      description:
        "You can't hire for this. The people who are actually good at AI-assisted development aren't writing blog posts about it.",
    },
    {
      title: "You're falling behind every day",
      description:
        "While you're debating which tool to try, your competitors are shipping 3x faster. The gap is widening.",
    },
  ];

  const trainingPrograms = [
    {
      name: "Team Foundations",
      format: "2-day intensive",
      price: "Starting at $5,000",
      ideal: "Teams of 5-15 new to AI development",
      features: [
        "Claude Code fundamentals and setup",
        "Effective prompting for developers",
        "AI-assisted code review workflows",
        "Hands-on exercises with real problems",
      ],
    },
    {
      name: "AI Transformation",
      format: "8-week program",
      price: "Starting at $15,000",
      ideal: "Companies wanting systematic upskilling",
      popular: true,
      features: [
        "Everything in Foundations",
        "Advanced agent architectures",
        "Custom tooling and MCP integration",
        "1:1 coaching sessions",
        "Private Slack channel for support",
      ],
    },
    {
      name: "Executive Advisory",
      format: "Ongoing partnership",
      price: "$2,500/month",
      ideal: "Companies making AI a core competency",
      features: [
        "Quarterly AI roadmap planning",
        "Monthly strategy sessions",
        "Team skill assessments",
        "Hiring and team structure guidance",
        "Priority access for consultations",
      ],
    },
  ];

  const curriculum = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Claude Code Mastery",
      items: ["Setup and configuration", "Effective prompting strategies", "Code review workflows", "Custom tool creation"],
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "AI-First Development",
      items: ["When to use AI vs. manual coding", "Prompt library development", "Quality assurance for AI output", "Documentation as code"],
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Building AI Systems",
      items: ["Agent architectures", "Orchestration patterns", "Production deployment", "Monitoring and iteration"],
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Team Transformation",
      items: ["Workflow redesign", "Knowledge sharing systems", "Measurement and ROI tracking", "Scaling what works"],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery Call",
      duration: "30 minutes",
      description:
        "We assess your team's current capabilities, understand your goals, and identify the biggest opportunities for AI leverage.",
    },
    {
      step: "02",
      title: "Custom Program Design",
      duration: "1 week",
      description:
        "Based on discovery, I design a training program tailored to your team's skill level, tech stack, and business objectives.",
    },
    {
      step: "03",
      title: "Delivery & Implementation",
      duration: "2-8 weeks",
      description:
        "Interactive sessions with hands-on exercises using your actual codebase. Not theory — real application.",
    },
    {
      step: "04",
      title: "Ongoing Support",
      duration: "Optional",
      description:
        "Post-training support to ensure skills stick. Office hours, async support, and check-ins as your team grows.",
    },
  ];

  const qualifications = [
    {
      title: "You Have a Technical Team",
      description:
        "Developers, engineers, or technical product people who write code. This isn't for non-technical teams wanting to 'understand AI.'",
    },
    {
      title: "You're Ready to Invest in Skills",
      description:
        "You understand that training pays off through increased output, not just knowledge. You want ROI, not certificates.",
    },
    {
      title: "You Want Systematic Change",
      description:
        "You're not looking for a one-off workshop that everyone forgets. You want to fundamentally change how your team works.",
    },
  ];

  const faqItems = [
    {
      question: "Do you train non-technical teams?",
      answer:
        "No. This is specifically for developers, engineers, and technical product people who write code. If you want AI awareness training for executives or marketers, I'm not the right fit.",
    },
    {
      question: "Can you train on tools other than Claude Code?",
      answer:
        "I focus on Claude Code because it's what I use every day. If you're committed to other tools, we can discuss, but my deepest expertise is in the Anthropic ecosystem.",
    },
    {
      question: "What's the minimum team size?",
      answer:
        "Workshops work best with 5-15 people. Smaller teams can do 1:1 coaching. Larger organizations often do multiple cohorts.",
    },
    {
      question: "Do you do on-site training?",
      answer:
        "Yes. Workshops can be virtual or on-site. On-site has a travel fee but often works better for team bonding and focus.",
    },
    {
      question: "How is this different from YouTube tutorials?",
      answer:
        "My YouTube shows how I work. Training teaches your team how to work. It's customized to your codebase, your problems, and includes hands-on practice with feedback.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={parentRef}
        className="relative py-24 sm:py-32 lg:py-40 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-sm font-medium tracking-wider uppercase text-accent mb-6"
          >
            AI Team Training
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            Train Your Team to Build with AI
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Stop hiring more people. Start multiplying the ones you have.
            I teach technical teams how to use Claude Code and AI tools to 10x their output.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <FollowCTA platform="youtube" variant="secondary" />
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Your Team Is Drowning in AI Noise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm"
              >
                <h3 className="font-display font-semibold text-lg mb-3">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Transformation */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              What Changes After Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-muted/50 border border-border/50 rounded-lg p-8">
              <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-6">
                Before
              </p>
              <ul className="space-y-4">
                {[
                  "Team experiments randomly with AI",
                  "Each person figures things out alone",
                  "Inconsistent quality from AI-assisted code",
                  "Tribal knowledge, nothing documented",
                  "Still need to hire for every new project",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="text-destructive mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-8">
              <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
                After
              </p>
              <ul className="space-y-4">
                {[
                  "Systematic AI workflows across the team",
                  "Shared playbooks and prompt libraries",
                  "Consistent, high-quality AI output",
                  "Documented systems that scale",
                  "One trained team handles 3x the work",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Training Programs
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose the depth that matches your ambition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingPrograms.map((program, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className={`relative bg-card border rounded-lg p-6 shadow-premium-sm ${
                  program.popular
                    ? "border-accent shadow-accent"
                    : "border-border/50"
                }`}
              >
                {program.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-sm text-muted-foreground mb-2">{program.format}</p>
                <h3 className="font-display font-semibold text-xl mb-2">
                  {program.name}
                </h3>
                <p className="text-accent font-semibold mb-4">{program.price}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Ideal for: {program.ideal}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200"
            >
              Discuss Which Program Fits
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* What Your Team Will Learn */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              What Your Team Will Learn
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4 text-accent">
                  {category.icon}
                </div>
                <h3 className="font-display font-semibold text-lg mb-4">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              How We Work Together
            </h2>
          </div>

          <div className="space-y-6">
            {process.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="bg-card border border-border/50 rounded-lg p-6 md:p-8 shadow-premium-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-accent font-display font-semibold">
                      {step.step}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-display font-semibold text-lg">
                        {step.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        ({step.duration})
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              This Is For You If...
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualifications.map((qual, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="bg-card border border-border/50 rounded-lg p-6 shadow-premium-sm"
              >
                <h3 className="font-display font-semibold text-lg mb-3">
                  {qual.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {qual.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
            What Teams Are Achieving
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              "Teams shipping 2-3x faster after implementing AI workflows",
              "Reduced dependency on new hires for scaling projects",
              "Consistent code quality with AI-assisted review",
              "Knowledge systems that compound over time",
            ].map((result, index) => (
              <div
                key={index}
                className="bg-card border border-border/50 rounded-lg p-4 text-left"
              >
                <p className="text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {result}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground italic">
            Results vary. I don&apos;t promise magic — I teach systems that work if you implement them.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="border-b border-border/50 pb-6"
              >
                <h3 className="font-display font-semibold text-lg mb-2">
                  {item.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 border-t border-border/50 bg-accent/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Ready to Transform Your Team?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a 30-minute strategy call. We&apos;ll discuss your team, your goals,
            and whether training makes sense. No pitch — just an honest conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-base font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <FollowCTA platform="youtube" variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
