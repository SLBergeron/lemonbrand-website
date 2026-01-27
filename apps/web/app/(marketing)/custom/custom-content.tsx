"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  MessageSquare,
  Code,
  Rocket,
  Headphones,
  Clock,
  DollarSign,
  FileCode,
  Shield,
  Calendar,
  Sparkles,
  X,
} from "lucide-react";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";
import { cn } from "@/lib/utils";

const process = [
  {
    step: "1",
    icon: MessageSquare,
    title: "Discovery Call",
    description:
      "30-minute call to understand what you need. We'll scope the project and give you a fixed quote.",
    duration: "Day 1",
  },
  {
    step: "2",
    icon: Code,
    title: "Working Prototype",
    description:
      "You see a working version in 1-2 weeks. Not mockups—actual software you can click through.",
    duration: "Week 1-2",
  },
  {
    step: "3",
    icon: Rocket,
    title: "Deployment",
    description:
      "We deploy to your infrastructure. You own the accounts, the code, everything.",
    duration: "Week 2-4",
  },
  {
    step: "4",
    icon: Headphones,
    title: "Support",
    description:
      "30 days of included support. Bug fixes, questions, minor adjustments—we've got you.",
    duration: "30 days post-launch",
  },
];

const pricing = [
  {
    name: "Small Tools",
    price: "$5-15K",
    timeline: "2-4 weeks",
    description: "Single-purpose tools that solve one problem well",
    examples: [
      "Client intake forms",
      "Internal dashboards",
      "Automated reports",
      "Simple booking systems",
      "Data collection tools",
    ],
  },
  {
    name: "Complex Systems",
    price: "$15-30K",
    timeline: "4-8 weeks",
    description: "Multi-feature applications with integrations",
    examples: [
      "Customer portals",
      "Workflow automation",
      "Multi-user platforms",
      "API integrations",
      "Custom CRM/ERP modules",
    ],
    featured: true,
  },
  {
    name: "Retainer",
    price: "$2.5K/month",
    timeline: "Ongoing",
    description: "Continuous development and support",
    examples: [
      "Priority support",
      "Feature additions",
      "Performance optimization",
      "Integration updates",
      "Dedicated availability",
    ],
  },
];

const whatsIncluded = [
  {
    icon: FileCode,
    title: "Full Source Code",
    description: "You own every line. No licensing, no restrictions.",
  },
  {
    icon: Shield,
    title: "Your Infrastructure",
    description: "Deployed to your accounts. We help set them up.",
  },
  {
    icon: Clock,
    title: "30-Day Support",
    description: "Bug fixes and questions answered. Included in every project.",
  },
  {
    icon: DollarSign,
    title: "Fixed Pricing",
    description: "The quote is the price. No surprise invoices.",
  },
];

const goodFits = [
  "You're paying for software that's 80% right but 20% wrong",
  "You need something specific that doesn't exist off the shelf",
  "You want to stop depending on a vendor that could change pricing or shut down",
  "You have a manual process that should be automated",
  "You need to connect systems that don't talk to each other",
];

const badFits = [
  "You need enterprise-scale software with thousands of users",
  "You're looking for the cheapest possible solution",
  "You need 24/7 support and SLAs",
  "You want to build the next Salesforce",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function CustomContent() {
  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
    theme: CONSTANTS.CALCOM_THEME as "auto" | "light" | "dark",
  });

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-glow-accent" />
        <div className="absolute inset-0 bg-dots" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Custom Builds
              </span>
            </motion.div>

            {/* Headline with extreme contrast */}
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
              We build.
              <br />
              <span className="font-light text-muted-foreground">You own.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Bespoke tools built to your spec. You own the source code.
              No subscriptions, no vendor lock-in. Most projects delivered in 2-4 weeks.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="accent"
                size="lg"
                className="h-14 px-8 text-base font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30"
                data-cal-namespace={calOptions.namespace}
                data-cal-link={CONSTANTS.CALCOM_LINK}
                data-cal-config={`{"layout":"${calOptions.layout}"}`}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Discovery Call
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium border-2" asChild>
                <Link href="#pricing">
                  See Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section id="process" className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="absolute inset-0 bg-grid opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              From idea to deployed tool in weeks, not months.
              You see progress the whole way.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {process.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.step} variants={itemVariants}>
                  <FeatureCard className="h-full bg-card/80 backdrop-blur-sm" step={item.step}>
                    <div className="p-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl flex items-center justify-center mb-5 border border-accent/20">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        {item.duration}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FeatureCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              What&apos;s included in every build
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whatsIncluded.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="group text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-success/20 rounded-2xl blur-xl group-hover:bg-success/30 transition-colors duration-500" />
                    <div className="relative w-full h-full bg-gradient-to-br from-success/20 to-success/5 rounded-2xl flex items-center justify-center border border-success/20 group-hover:border-success/40 transition-colors duration-300">
                      <Icon className="w-9 h-9 text-success" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <div className="absolute inset-0 bg-dots opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Transparent pricing
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Fixed quotes. The price we agree on is the price you pay.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {pricing.map((tier, index) => (
              <motion.div
                key={tier.name}
                variants={itemVariants}
                className={cn(
                  "group relative rounded-2xl p-8 flex flex-col transition-all duration-300",
                  "bg-card border",
                  tier.featured
                    ? "border-accent/40 shadow-xl shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20"
                    : "border-border/60 hover:border-border hover:shadow-lg"
                )}
              >
                {/* Featured badge */}
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Glow effect for featured */}
                {tier.featured && (
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                <div className="relative">
                  <h3 className="font-display text-xl font-bold">{tier.name}</h3>
                  <div className="mt-4 mb-2">
                    <span className="font-display text-4xl font-extrabold">{tier.price}</span>
                  </div>
                  <p className="text-sm font-medium text-accent mb-2">{tier.timeline}</p>
                  <p className="text-muted-foreground mb-6">{tier.description}</p>

                  <div className="border-t border-border/50 pt-6 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      Examples
                    </p>
                    <ul className="space-y-3">
                      {tier.examples.map((example) => (
                        <li key={example} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center mt-0.5 shrink-0">
                            <Check className="w-3 h-3 text-success" />
                          </div>
                          <span className="text-muted-foreground">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Good Fit / Bad Fit */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Good Fit */}
            <motion.div
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Border gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-success/30 via-success/10 to-transparent p-px">
                <div className="w-full h-full rounded-2xl bg-card" />
              </div>

              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">
                    Good fit if...
                  </h3>
                </div>
                <ul className="space-y-4">
                  {goodFits.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 text-success" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Bad Fit */}
            <motion.div
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-border/60" />
              <div className="absolute inset-0 rounded-2xl bg-muted/30" />

              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <X className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-muted-foreground">
                    Probably not a fit if...
                  </h3>
                </div>
                <ul className="space-y-4">
                  {badFits.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-6 h-6 flex items-center justify-center mt-0.5 shrink-0 text-lg">
                        —
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <CallToAction
            variant="accent"
            title="Let's talk about what you need"
            description="30-minute discovery call. No pitch, just a conversation about your problem. If we can help, we'll tell you how. If we can't, we'll tell you that too."
            primaryCtaText="Book Discovery Call"
            primaryCtaLink={CONSTANTS.CALCOM_LINK}
            secondaryCtaText="See our tools"
            secondaryCtaLink="/tools"
            benefits={["Free 30-minute call", "Fixed quote within 48 hours", "No obligation"]}
          />
        </div>
      </section>

      {/* DIY Option */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-t border-border/50">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Budget tight?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Learn to build it yourself
            </h2>
            <p className="text-lg text-muted-foreground font-light mb-8 max-w-xl mx-auto">
              Our programs teach non-developers to build production tools with AI.
              Same methods we use for custom builds.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-base font-medium border-2"
              asChild
            >
              <Link href="/sprint">
                Learn about the programs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
