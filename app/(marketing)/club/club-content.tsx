"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import {
  ArrowRight,
  Check,
  X,
  Calendar,
  Video,
  Users,
  MessageSquare,
  Trophy,
  BookOpen,
  Archive,
  ChevronDown,
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

// What you get
const benefits = [
  {
    title: "Monthly Build Challenges",
    icon: Trophy,
    description: `Every month, a new building challenge.

Sometimes it's a specific project type.
Sometimes it's a technique to practice.
Sometimes it's a problem to solve creatively.

You don't have to participate.
But if you do, you'll keep your skills sharp.`,
  },
  {
    title: "New Patterns & Tutorials",
    icon: BookOpen,
    description: `AI tools change fast.
Claude gets updates. New models come out.
Better patterns emerge.

Club members get new tutorials when things change.
Stay current without having to figure it out yourself.`,
  },
  {
    title: "Office Hours",
    icon: Calendar,
    description: `Monthly live calls with Simon.

Bring your questions.
Get unstuck on projects.
See how others are solving problems.

Recorded if you can't make it live.`,
  },
  {
    title: "Private Community",
    icon: MessageSquare,
    description: `Discord channel for Club members only.

Share what you're building.
Get feedback from other builders.
Help others when you can.

A community of people who actually build things.`,
  },
  {
    title: "Archive Access",
    icon: Archive,
    description: `All previous monthly tutorials.
All previous challenges.
All previous office hours recordings.

Months of content from day one.`,
  },
];

// For you / not for you
const forYouItems = [
  "Finished the 8-Week and want to keep building",
  "Learn better with a community than alone",
  "Want to stay current as AI tools evolve",
  "Like having monthly challenges for motivation",
];

const notForYouItems = [
  { text: "Are still learning the basics", subtext: "(do the Sprint first)" },
  { text: "Don't have time to build anything right now", subtext: "" },
  { text: "Prefer learning solo", subtext: "" },
];

// Sample month
const sampleMonth = [
  {
    week: "Week 1",
    title: "New tutorial drops",
    example: 'This month: "Building with the latest Claude model updates."',
  },
  {
    week: "Week 2",
    title: "Monthly challenge announced",
    example: 'This month: "Build a tool that uses webhooks."',
  },
  {
    week: "Week 3",
    title: "Office hours live call",
    example: "Bring questions. Watch others get unstuck.",
  },
  {
    week: "Week 4",
    title: "Challenge showcase",
    example: "See what other members built. Share yours.",
  },
];

// FAQ items
const faqItems = [
  {
    question: "Do I need to have done the 8-Week?",
    answer: `Recommended but not required.

The Club assumes you have the core skills. If you haven't done the 8-Week, you might struggle to keep up with the monthly content.

You can do the Sprint and 8-Week first, then join the Club when you're ready.`,
  },
  {
    question: "What if I cancel and rejoin later?",
    answer: `No problem.

Cancel anytime.
Rejoin when you want.
You'll have access to everything from when you were a member.`,
  },
  {
    question: "Is there a discount for paying annually?",
    answer: `Yes.

$97/month = $1,164/year
Annual prepay = $797/year (save $367)

Pay for 8 months, get 12.`,
  },
  {
    question: "How active is the community?",
    answer: `Very.

People share what they're building regularly.
Questions get answered quickly.
The monthly challenges get participation.

It's a community of people who actually build things, not a ghost town.`,
  },
];

// FAQ Accordion component
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
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

export default function ClubContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="text-center">
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
                initial={{ rotate: 5, scale: 1 }}
                whileHover={{ rotate: -3, scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/assets/3dicons/3dicons-trophy-dynamic-color.png"
                  alt="AI Builders Club"
                  fill
                  className="object-contain drop-shadow-xl"
                  unoptimized
                />
              </motion.div>
            </div>

            <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
              &quot;I opened Claude Code and it felt... unfamiliar.
              <br />
              Not the tool—me. I&apos;d forgotten the patterns.&quot;
            </blockquote>

            <div className="space-y-2 text-muted-foreground">
              <p>That was Marcus. 8-Week graduate.</p>
              <p>Four months without building.</p>
            </div>

            <p className="text-lg text-foreground font-medium pt-4">
              The Club exists so that doesn&apos;t happen to you.
            </p>

            <div className="pt-6 space-y-4">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                AI Builders Club
              </h1>

              <p className="text-3xl font-bold">$97/month</p>

              <Button variant="accent" size="lg" asChild>
                <Link href="#join">
                  Join the Club
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
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
                You finished the 8-Week.
                <br />
                You can build anything you want now.
              </p>

              <p className="text-foreground font-medium">
                But here&apos;s what happens to most people:
              </p>

              <div className="bg-card border border-border/50 rounded-lg p-6 space-y-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30">
                <p>They build a few things.</p>
                <p>Then life gets busy.</p>
                <p>
                  Then six months later, they try to build something and realize
                  they&apos;ve gotten rusty.
                </p>
              </div>

              <p className="text-foreground font-medium pt-4">
                The Club exists to prevent that.
              </p>

              <ul className="space-y-2 pt-2">
                <li className="flex items-start gap-2">
                  <Trophy className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Monthly challenges to keep you building.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>New patterns as AI tools evolve.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>A community of builders to learn from.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>Office hours when you get stuck.</span>
                </li>
              </ul>

              <p className="pt-4 text-foreground font-medium">
                $97/month. Cancel anytime.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 2: What You Get */}
      <Section width="wide">
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-12">
              What You Get
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <FeatureCard key={i} className="bg-card">
                    <div className="p-4 flex flex-col h-full">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </FeatureCard>
                );
              })}
            </div>
          </div>
      </Section>

      {/* Section 2.5: Member Stories */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
              Member Stories
            </h2>

            <div className="bg-card border border-border/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30 max-w-3xl mx-auto">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-accent/20">
                   {/* Avatar Placeholder */}
                   <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                   <span className="text-lg font-semibold text-accent relative z-10">M</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Marcus</p>
                    <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded border border-accent/20 font-medium uppercase tracking-wide">Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    8-Week Graduate
                  </p>
                </div>
              </div>
              <div className="text-muted-foreground text-sm space-y-4">
                <p>Marcus finished the 8-Week in October.</p>
                <p>By February, he tried to build something new.</p>
                <blockquote className="border-l-4 border-accent/50 pl-4 italic">
                  &quot;I opened Claude Code and it felt... unfamiliar. Not the
                  tool—me. I&apos;d forgotten the patterns. I was making mistakes I&apos;d
                  fixed months ago.&quot;
                </blockquote>
                <p>He joined the Club in March.</p>
                <blockquote className="border-l-4 border-accent/50 pl-4 italic">
                  &quot;The monthly challenges keep me sharp. Even if I only spend
                  4-5 hours that month, I&apos;m building. The patterns stay fresh.
                  And when I have a real project, I don&apos;t have to warm up—I&apos;m
                  already there.&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* Section 3: Who This Is For */}
      <Section width="wide">
          <div className="space-y-12 max-w-3xl mx-auto">
            {/* For you */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center">
                The Club is for people who:
              </h2>

              <motion.div
                className="grid md:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {forYouItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20 transition-all duration-200 hover:border-accent/40"
                  >
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Not for you */}
            <div className="space-y-6">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-center">
                The Club is NOT for people who:
              </h3>

              <motion.div
                className="grid md:grid-cols-3 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {notForYouItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg"
                  >
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {item.text}{" "}
                      {item.subtext && (
                        <span className="text-muted-foreground/70">
                          {item.subtext}
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <p className="text-center text-muted-foreground pt-4">
                If you&apos;re not going to build anything,
                <br />
                don&apos;t pay $97/month. Come back when you&apos;re ready.
              </p>
            </div>
          </div>
      </Section>

      {/* Section 4: Sample Monthly Content */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-12">
              What a typical month looks like
            </h2>

            <div className="space-y-4">
              {sampleMonth.map((week, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border/50 rounded-lg p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-accent/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 font-mono text-sm font-semibold text-accent">
                      {week.week}
                    </div>
                    <div>
                      <p className="font-semibold">{week.title}</p>
                      <p className="text-sm text-muted-foreground italic">
                        {week.example}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Section 5: FAQ */}
      <Section>
          <div className="space-y-8">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-center mb-8">
              Questions you probably have
            </h2>

            <div className="divide-y divide-border/50">
              {faqItems.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
      </Section>

      {/* Section 6: The Offer Box */}
      <section
        id="join"
        className="py-20 px-4 bg-muted/30 border-y border-border/50"
      >
        <Section className="py-0 px-0">
          <div className="bg-card border-2 border-accent/30 rounded-xl p-8 shadow-lg max-w-xl mx-auto">
              <div className="text-center space-y-6">
                <h2 className="font-display text-2xl font-semibold">
                  AI Builders Club
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-2xl font-bold">$97</p>
                    <p className="text-sm text-muted-foreground">/month</p>
                  </div>
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                    <p className="text-2xl font-bold">$797</p>
                    <p className="text-sm text-muted-foreground">/year</p>
                    <p className="text-xs text-accent font-medium">
                      Save $367
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-left pt-4 border-t border-border/50">
                  <p className="font-medium text-center">What you get:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Monthly build challenges
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <BookOpen className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        New patterns and tutorials
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Video className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Monthly office hours with Simon
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Private Discord community
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Archive className="w-4 h-4 text-accent" />
                      <span className="text-muted-foreground">
                        Full archive access
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Cancel anytime. No commitment.
                </p>

                <div className="space-y-3">
                  <Button variant="accent" size="lg" className="w-full" asChild>
                    <Link href="/checkout/club/monthly">
                      Join Monthly - $97
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/checkout/club/annual">
                      Join Annual - $797
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
          </div>
        </Section>
      </section>

      {/* Section 7: Final CTA */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <Section className="py-0 px-0">
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-lg text-primary-foreground/80">
              You have the skills.
            </p>
            <p className="text-primary-foreground/80">
              The question is whether you&apos;ll keep using them.
            </p>
            <p className="text-lg font-medium">
              If you want a community to build with:
            </p>

            <Button variant="accent" size="lg" asChild>
              <Link href="#join">
                Join the Club
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <p className="text-sm text-primary-foreground/60">
              $97/month. Cancel anytime.
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}