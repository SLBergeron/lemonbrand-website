"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { CONSTANTS } from "@/constants/links";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import FollowCTA from "@/components/FollowCTA";
import { ArrowRight, Check, Users, Zap, Target, Lightbulb, Mail, BarChart3, FileText, MessageSquare } from "lucide-react";

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
      title: "Drowning in AI hype, paralyzed by choice",
      description:
        "ChatGPT, Claude, Gemini, Copilot... everyone's talking about AI but nobody's telling you which tools actually matter for your job.",
    },
    {
      title: "Your competitors seem miles ahead",
      description:
        "You keep seeing headlines about AI transforming industries. Meanwhile, you're still copy-pasting between apps and formatting spreadsheets manually.",
    },
    {
      title: "No roadmap, just random experiments",
      description:
        "You've tried a few AI tools but nothing stuck. Without a clear implementation path, it feels like throwing darts blindfolded.",
    },
  ];

  const trainingPrograms = [
    {
      name: "AI Kickstart",
      format: "Half-day workshop",
      price: "Starting at $2,500",
      ideal: "Teams wanting practical AI skills fast",
      features: [
        "Hands-on with the AI tools that matter",
        "Prompt writing for your actual work",
        "Quick wins you can use tomorrow",
        "No coding or technical background needed",
      ],
    },
    {
      name: "AI Implementation Roadmap",
      format: "4-week program",
      price: "Starting at $8,000",
      ideal: "Organizations ready for systematic change",
      popular: true,
      features: [
        "Custom workflow analysis for your team",
        "Tool selection based on your needs",
        "Hands-on training sessions",
        "Implementation playbook you keep forever",
        "30 days of follow-up support",
      ],
    },
    {
      name: "Strategic AI Advisory",
      format: "Ongoing partnership",
      price: "$2,000/month",
      ideal: "Leaders wanting an AI implementation partner",
      features: [
        "Monthly strategy sessions",
        "Team training as new tools emerge",
        "Workflow optimization reviews",
        "Priority access for questions",
        "Quarterly roadmap updates",
      ],
    },
  ];

  const curriculum = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "AI Writing & Communication",
      items: ["Email drafting and responses", "Proposal and report writing", "Meeting summaries and follow-ups", "Content creation workflows"],
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Data Without Spreadsheet Pain",
      items: ["Analyzing data in plain English", "Creating reports automatically", "Spotting trends and insights", "Visualizing information clearly"],
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Sales & Marketing AI",
      items: ["Lead research and qualification", "Personalized outreach at scale", "Campaign ideation and copy", "Competitive analysis"],
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Thinking Partner Skills",
      items: ["Strategic brainstorming", "Decision frameworks", "Problem-solving conversations", "Research and synthesis"],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery Call",
      duration: "30 minutes",
      description:
        "We talk about your team's daily work, the friction points, and where AI could make the biggest impact. No jargon, just plain conversation.",
    },
    {
      step: "02",
      title: "Workflow Analysis",
      duration: "1 week",
      description:
        "I map your team's actual workflows and identify the highest-impact opportunities for AI. You get a clear picture of what's possible.",
    },
    {
      step: "03",
      title: "Training & Implementation",
      duration: "1-4 weeks",
      description:
        "Hands-on sessions where your team learns by doing. We use your real work — your emails, your data, your problems.",
    },
    {
      step: "04",
      title: "Follow-Up & Support",
      duration: "30 days included",
      description:
        "Questions come up after training. I'm available to help your team troubleshoot and refine their new workflows.",
    },
  ];

  const qualifications = [
    {
      title: "You're Not Technical (And That's Fine)",
      description:
        "This is designed for marketing, sales, operations, HR, finance — anyone who works with information. No coding. No IT background needed.",
    },
    {
      title: "You Want Practical, Not Theoretical",
      description:
        "You're not interested in AI philosophy or future predictions. You want to know what works today and how to use it for your job.",
    },
    {
      title: "You're Ready to Change How You Work",
      description:
        "AI isn't magic — it requires building new habits. You're willing to put in the effort to transform your workflows.",
    },
  ];

  const faqItems = [
    {
      question: "Do I need any technical skills?",
      answer:
        "No. This training is specifically designed for non-technical professionals. If you can write an email and use a web browser, you have all the skills you need. I'll teach you the rest.",
    },
    {
      question: "Which AI tools will we learn?",
      answer:
        "Primarily Claude and ChatGPT, plus specialized tools depending on your work. I focus on tools that are reliable, easy to use, and actually useful for business — not every shiny new thing.",
    },
    {
      question: "How is this different from watching YouTube tutorials?",
      answer:
        "Tutorials show generic examples. I work with your actual workflows, your real data, and your specific challenges. Plus you get live feedback, can ask questions, and leave with a playbook built for your team.",
    },
    {
      question: "What if AI tools change after training?",
      answer:
        "The core skills I teach — prompt writing, workflow thinking, output evaluation — transfer across tools. When interfaces change, the fundamentals don't. Advisory clients get updates as tools evolve.",
    },
    {
      question: "Can you train our whole department?",
      answer:
        "Yes. I've trained teams from 3 to 30 people. Larger groups work best in cohorts of 8-12 for hands-on practice. We'll figure out the right structure for your team.",
    },
    {
      question: "What results can we expect?",
      answer:
        "Most people save 5-10 hours per week on routine tasks within the first month. That's emails, reports, research, and data work. The bigger win is usually better quality output, not just speed.",
    },
    {
      question: "Is our data safe when using AI tools?",
      answer:
        "Good question. I teach data hygiene as part of every training — what to share, what not to share, and how to use AI tools responsibly. We'll also discuss your company's specific policies.",
    },
    {
      question: "What's your refund policy?",
      answer:
        "If you're not satisfied after the first session, I'll refund the full amount. I'd rather have happy clients than unhappy payments. That said, this has never happened.",
    },
  ];

  const useCases = [
    { icon: <Mail className="w-5 h-5" />, label: "Email & communication" },
    { icon: <FileText className="w-5 h-5" />, label: "Reports & proposals" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Data analysis" },
    { icon: <Target className="w-5 h-5" />, label: "Sales & outreach" },
    { icon: <Users className="w-5 h-5" />, label: "Meeting prep & follow-up" },
    { icon: <Lightbulb className="w-5 h-5" />, label: "Research & brainstorming" },
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
            AI Implementation for Teams
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6"
          >
            Finally, a Roadmap for AI That Makes Sense
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            You don&apos;t need to be technical to use AI effectively.
            I help marketing, sales, and operations teams implement AI tools that actually work — no coding required.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground text-sm font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <FollowCTA platform="youtube" variant="secondary" />
          </motion.div>

          {/* Use Cases Strip */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap justify-center gap-3"
          >
            {useCases.map((useCase, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {useCase.icon}
                {useCase.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 border-t border-border/50 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Sound Familiar?
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
                  "Spending hours on emails and reports",
                  "Manually formatting data in spreadsheets",
                  "Googling the same questions repeatedly",
                  "Watching competitors move faster",
                  "Feeling behind on every AI announcement",
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
                  "Draft quality emails in 2 minutes, not 20",
                  "Analyze data by asking questions in plain English",
                  "Have an AI research assistant on demand",
                  "Clear playbook for what AI to use when",
                  "Confident about which tools actually matter",
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
              Pick the level that matches where you are
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
              What You&apos;ll Learn
            </h2>
            <p className="text-muted-foreground">
              Practical skills you can use the same day
            </p>
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
              "5-10 hours saved per person per week on routine tasks",
              "Emails and reports drafted 80% faster",
              "Data analysis without waiting for IT or analysts",
              "Consistent quality across team communications",
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
            Results vary based on role and current workflows. Most improvement happens in the first 30 days.
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
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation. We&apos;ll talk about your team,
            your current workflows, and whether AI training makes sense for you. No pressure, no pitch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-base font-medium rounded-sm shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] transition-all duration-200"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <FollowCTA platform="youtube" variant="secondary" />
          </div>
        </div>
      </section>
    </main>
  );
}
