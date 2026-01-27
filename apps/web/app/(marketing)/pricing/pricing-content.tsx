"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";

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

const pricingTiers = [
  {
    name: "7-Day Sprint",
    price: "Free",
    period: "to start",
    description: "Days 0-1 free, $297 to unlock Days 2-7. Build your first tool with Claude Code.",
    features: [
      "Daily video trainings + worksheets",
      "Self-paced — start anytime",
      "Build YOUR project (not a tutorial)",
      "Community support in Discord",
      "$297 becomes credit toward 8-Week",
    ],
    cta: "Start Free",
    ctaLink: "https://learn.lemonbrand.io/sprint",
    popular: false,
  },
  {
    name: "8-Week Program",
    price: "$997",
    period: "starting at",
    description: "Go deeper. Databases, auth, APIs, deployment. Build the skill permanently.",
    features: [
      "Everything in Sprint",
      "8 weeks of structured curriculum",
      "Multiple projects",
      "Weekly office hours",
      "Tiers: Foundation / Accelerator / Intensive",
    ],
    cta: "See 8-Week Details",
    ctaLink: "/8-week",
    popular: true,
  },
  {
    name: "Builder's Club",
    price: "$97",
    period: "/month",
    description: "Keep building with a community. Monthly challenges, new patterns, office hours.",
    features: [
      "Monthly build challenges",
      "New patterns as AI evolves",
      "Office hours with Simon",
      "Private community access",
      "Cancel anytime",
    ],
    cta: "Join the Club",
    ctaLink: "/club",
    popular: false,
  },
];

const faqs = [
  {
    question: "What if I don't know where to start?",
    answer:
      "Start with the Sprint. Day 1 helps you pick YOUR project—something you actually want to build. By Day 7, you'll have shipped it.",
  },
  {
    question: "Do I need technical skills?",
    answer:
      "No. The skill isn't coding—it's communication. If you can explain what you want clearly, you can learn to build with AI.",
  },
  {
    question: "What's the difference between Sprint and 8-Week?",
    answer:
      "The Sprint is 7 days, one project—prove you can build something. The 8-Week goes deeper: databases, authentication, APIs, deployment. Multiple projects. The full toolkit.",
  },
];

export default function PricingContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
            Pricing
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            Learn to build with AI
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Start with the Sprint. Build your first tool in 7 days.
            Go deeper with the 8-Week if you catch the building bug.
          </p>
        </div>
      </Section>

      {/* Pricing Cards */}
      <Section width="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <FeatureCard
                key={tier.name}
                className={`bg-card h-full ${tier.popular ? "border-accent ring-2 ring-accent/20" : ""}`}
              >
                <div className="p-4 flex flex-col h-full relative">
                  {tier.popular && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                        <Badge className="bg-accent text-accent-foreground border-none px-3 py-1">
                            <Zap className="w-3 h-3 mr-1" />
                            Most Popular
                        </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display font-semibold text-xl mb-2">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-display text-4xl font-bold">
                        {tier.price}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={tier.popular ? "accent" : "outline"}
                    className="w-full mt-auto"
                    asChild
                  >
                    <Link href={tier.ctaLink}>
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </FeatureCard>
            ))}
          </div>
      </Section>

      {/* FAQ Preview */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                Common questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-border/50 pb-6 last:border-0">
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
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

      {/* Booking Section */}
      <Section id="book">
          <CallToAction
            title="Ready for the 8-Week Build?"
            description="Let's discuss your specific needs and see if the 8-Week Build is right for you. We'll map out your workflows and design a custom AI system."
            primaryCtaText="Book a Discovery Call"
            primaryCtaLink="/custom"
            benefits={["30-minute call", "Custom scope", "No commitment"]}
            className="max-w-4xl mx-auto"
          />
      </Section>
    </main>
  );
}
