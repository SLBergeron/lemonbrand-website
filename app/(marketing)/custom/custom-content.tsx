"use client";

import Link from "next/link";
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
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";

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

export default function CustomContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
            Custom Builds
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
            We build.
            <br />
            <span className="text-muted-foreground">You own.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Bespoke tools built to your spec. You own the source code.
            No subscriptions, no vendor lock-in. Most projects delivered in 2-4 weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/work-with-me">
                Book Discovery Call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#pricing">
                See Pricing
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* The Process */}
      <section id="process" className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              How it works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From idea to deployed tool in weeks, not months.
              You see progress the whole way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item) => {
              const Icon = item.icon;
              return (
                <FeatureCard key={item.step} className="bg-card" step={item.step}>
                  <div className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                      {item.duration}
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FeatureCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <Section width="wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            What&apos;s included in every build
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whatsIncluded.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-success" />
                </div>
                <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fixed quotes. The price we agree on is the price you pay.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((tier, index) => (
              <div
                key={tier.name}
                className={`bg-card rounded-lg border ${
                  index === 1 ? "border-accent shadow-lg shadow-accent/10" : "border-border"
                } p-6 flex flex-col`}
              >
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{tier.timeline}</p>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                <div className="border-t border-border pt-4 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                    Examples
                  </p>
                  <ul className="space-y-2">
                    {tier.examples.map((example) => (
                      <li key={example} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Good Fit / Bad Fit */}
      <Section width="wide">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-success/5 border border-success/20 rounded-lg p-6">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-success" />
              Good fit if...
            </h3>
            <ul className="space-y-3">
              {goodFits.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 border border-border rounded-lg p-6">
            <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-muted-foreground">—</span>
              Probably not a fit if...
            </h3>
            <ul className="space-y-3">
              {badFits.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-muted-foreground mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <CallToAction
          title="Let's talk about what you need"
          description="30-minute discovery call. No pitch, just a conversation about your problem. If we can help, we'll tell you how. If we can't, we'll tell you that too."
          primaryCtaText="Book Discovery Call"
          primaryCtaLink="/work-with-me"
          secondaryCtaText="See our tools"
          secondaryCtaLink="/tools"
          benefits={["Free 30-minute call", "Fixed quote within 48 hours", "No obligation"]}
          className="max-w-4xl mx-auto"
        />
      </Section>

      {/* DIY Option */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Budget tight?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Learn to build it yourself
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our programs teach non-developers to build production tools with AI.
            Same methods we use for custom builds.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/sprint">
              Learn about the programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
