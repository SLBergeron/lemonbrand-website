"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { ProgressionVisual } from "@/components/learn/ProgressionVisual";
import { ComparisonTable } from "@/components/learn/ComparisonTable";
import { ArrowRight, Check, ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { getNextCohortDate } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Program cards for quick overview
const programs = [
  {
    name: "7-Day Sprint",
    icon: "/assets/3dicons/3dicons-flash-dynamic-color.png",
    price: "$297",
    period: "one-time",
    tagline: "Build your first tool. Prove you can do this.",
    description:
      "A 7-day intensive where you build YOUR project (not a tutorial). Ship something real by Day 7. Your $297 becomes credit toward the 8-Week.",
    bestFor: ["Have an idea but think they 'can't code'", "Want to prove to themselves they can build", "Have 1-2 hours/day for a week"],
    href: "/sprint",
    color: "accent",
  },
  {
    name: "8-Week Program",
    icon: "/assets/3dicons/3dicons-calender-dynamic-color.png",
    price: "$997+",
    period: "starting at",
    tagline: "Master the skill. Build anything you want.",
    description:
      "Go deeper after the Sprint. Databases, authentication, APIs, deployment. Multiple projects. Three tiers based on how much support you need.",
    bestFor: ["Finished the Sprint and want more", "Need databases, auth, deployment skills", "Building something complex"],
    href: "/8-week",
    color: "primary",
    popular: true,
  },
  {
    name: "Builders Club",
    icon: "/assets/3dicons/3dicons-trophy-dynamic-color.png",
    price: "$97",
    period: "/month",
    tagline: "Keep building. Stay sharp.",
    description:
      "Monthly challenges, new patterns as AI evolves, office hours with Simon. For people who've finished the 8-Week and want to keep building with a community.",
    bestFor: ["Completed the 8-Week", "Want accountability to keep building", "Want to stay current as AI changes"],
    href: "/club",
    color: "success",
  },
];

// FAQs for the learn hub
const faqs = [
  {
    question: "Which program should I start with?",
    answer: `Almost always the Sprint.

It's 7 days, $297, and you ship something real. If you complete it, your $297 becomes credit toward the 8-Week.

The Sprint proves you can do this. Then you decide if you want to go deeper.`,
  },
  {
    question: "Do I need technical skills?",
    answer: `No.

The skill isn't coding—it's communication. If you can explain what you want clearly, you can learn to build with AI.

No programming background required. No computer science degree. Just clarity about what you want to build.`,
  },
  {
    question: "How much time does this take?",
    answer: `Sprint: 1-2 hours/day for 7 days.
8-Week: 3-5 hours/week for 8 weeks.
Club: Whatever you put in. Monthly challenges, optional office hours.

It fits around a job if you protect the time.`,
  },
  {
    question: "What's the progression?",
    answer: `Sprint → 8-Week → Club

Start with the Sprint to prove you can build.
Do the 8-Week to master databases, auth, APIs, deployment.
Join the Club to keep building with a community.

Each builds on the last. You can stop at any level.`,
  },
  {
    question: "Can I skip the Sprint?",
    answer: `You can join the 8-Week directly, but I don't recommend it.

The Sprint is cheap ($297), fast (7 days), and proves you can do this. Plus, your $297 becomes credit toward the 8-Week if you complete it.

There's no downside to starting with the Sprint.`,
  },
];

// FAQ Accordion component
function FAQItem({ question, answer }: { question: string; answer: string }) {
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

export default function LearnContent() {
  const nextCohort = getNextCohortDate();

  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Hero Icon */}
            <div className="flex justify-center">
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 relative"
                initial={{ rotate: -5, scale: 1 }}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/assets/3dicons/3dicons-notebook-dynamic-color.png"
                  alt="Learn"
                  fill
                  className="object-contain drop-shadow-xl"
                  unoptimized
                />
              </motion.div>
            </div>

            <p className="text-sm font-medium tracking-wider uppercase text-accent">
              The Building Journey
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Learn to build your own tools
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Three programs, one progression. Start with the Sprint, go deeper with the 8-Week,
              keep building with the Club. Pick your starting point.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/sprint">
                  Start with the Sprint
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#compare">
                  Compare Programs
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Next cohort starts: <span className="font-medium">{nextCohort}</span>
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Progression Visual */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              The path forward
            </h2>
            <p className="text-muted-foreground">
              Start anywhere. Each program builds on the last.
            </p>
          </div>

          <ProgressionVisual />

          <p className="text-center text-sm text-muted-foreground mt-8">
            Most people start with the Sprint. Where you go from there is up to you.
          </p>
        </div>
      </section>

      {/* Program Cards */}
      <Section width="wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Choose your starting point
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each program is designed to get you building. Pick based on where you are now.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <FeatureCard
              key={program.name}
              className={`h-full ${program.popular ? "border-accent ring-1 ring-accent/20" : ""}`}
            >
              <div className="p-6 flex flex-col h-full relative">
                {program.popular && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}

                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src={program.icon}
                    alt={program.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <h3 className="font-display text-xl font-semibold mb-1">
                  {program.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-2xl font-bold">{program.price}</span>
                  <span className="text-sm text-muted-foreground">{program.period}</span>
                </div>

                <p className="text-sm text-accent mb-3">{program.tagline}</p>

                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {program.description}
                </p>

                <div className="space-y-2 mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Best for people who:
                  </p>
                  {program.bestFor.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={program.popular ? "accent" : "outline"}
                  className="w-full mt-auto"
                  asChild
                >
                  <Link href={program.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <section id="compare" className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Compare side-by-side
            </h2>
            <p className="text-muted-foreground">
              See exactly what&apos;s included in each program.
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* The Recommendation */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-accent/30 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6 text-accent" />
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold">
                  Not sure where to start?
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <span className="text-foreground font-medium">Start with the Sprint.</span> It&apos;s
                    7 days, $297, and you ship something real.
                  </p>
                  <p>
                    If you complete all 7 days, your $297 becomes credit toward the 8-Week Program.
                  </p>
                  <p>
                    This lets you prove to yourself that you can build—before committing to the
                    deeper curriculum.
                  </p>
                </div>
                <Button variant="accent" asChild>
                  <Link href="/sprint">
                    Join the Sprint
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                Common questions
              </h2>
            </div>

            <div className="divide-y divide-border/50">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="text-sm font-medium text-accent hover:underline"
              >
                See all FAQs →
              </Link>
            </div>
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Section className="py-0 px-0">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
              Ready to start building?
            </h2>
            <p className="text-primary-foreground/80">
              Pick your path. Ship something real. The skill is closer than you think.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/sprint">
                  Start with the Sprint - $297
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60">
              Next cohort: {nextCohort}
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}
