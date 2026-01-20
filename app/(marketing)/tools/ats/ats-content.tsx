"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Shield,
  Server,
  Calendar,
  FileText,
  Globe,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";

const complianceRequirements = [
  {
    icon: Clock,
    title: "45-Day Tracking",
    description: "Automatic tracking of interview-to-decision timeline with alerts before deadline.",
  },
  {
    icon: DollarSign,
    title: "Salary Validation",
    description: "Enforces $50,000 maximum spread on salary ranges. Blocks non-compliant postings.",
  },
  {
    icon: Globe,
    title: "Bilingual AI Notices",
    description: "Auto-generated English/French AI usage disclosures for every posting.",
  },
  {
    icon: Shield,
    title: "Experience Blocking",
    description: "Prevents \"Canadian experience\" requirements in job postings.",
  },
  {
    icon: FileText,
    title: "3-Year Retention",
    description: "Compliant record storage with audit trail for every application.",
  },
  {
    icon: Calendar,
    title: "M365 Integration",
    description: "Connects to Outlook, Calendar, and Teams for seamless workflow.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$4,500",
    description: "For small businesses with basic hiring needs",
    features: [
      "Up to 5 active job postings",
      "Core compliance features",
      "Email notifications",
      "Basic reporting",
      "30-day support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$7,500",
    description: "For growing teams with regular hiring",
    features: [
      "Unlimited job postings",
      "Full compliance suite",
      "M365 integration",
      "Advanced analytics",
      "Candidate scoring",
      "60-day support",
      "1 hour training",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$12,000",
    description: "For organizations with complex needs",
    features: [
      "Everything in Professional",
      "Multi-location support",
      "Custom workflows",
      "API access",
      "Priority support (90 days)",
      "2 hours training",
      "Custom integrations",
    ],
    popular: false,
  },
];

const trustSignals = [
  {
    title: "30-Day Money Back",
    description: "Not satisfied? Full refund, no questions asked.",
  },
  {
    title: "5-7 Day Deployment",
    description: "From purchase to live system in under a week.",
  },
  {
    title: "No Technical Staff Required",
    description: "We handle setup. You just use it.",
  },
  {
    title: "Runs on Your Infrastructure",
    description: "Your Vercel, Convex, and Clerk accounts. You control everything.",
  },
];

export default function ATSContent() {
  // Cal.com embed for inline booking
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
      <Section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <AlertTriangle className="w-4 h-4" />
            New ESA rules take effect January 1, 2026
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
            Ontario-compliant hiring.
            <br />
            <span className="text-muted-foreground">No monthly fees.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl mx-auto">
            The ATS built for O. Reg. 476/24. One-time purchase. You own it.
            Keeps running even if we disappear.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Starting at $4,500 CAD
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                See Full Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Demo
            </Button>
          </div>
        </div>
      </Section>

      {/* The Problem */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                The new rules are strict
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  O. Reg. 476/24 changes how Ontario employers hire. Starting January 1, 2026:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>You must notify applicants within 45 days of their interview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>Salary ranges can&apos;t exceed $50,000 spread</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>AI usage must be disclosed in English and French</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>&quot;Canadian experience&quot; requirements are banned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-accent mt-1 shrink-0" />
                    <span>You need 3 years of compliant records</span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                Most solutions don&apos;t cut it
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Generic ATS platforms weren&apos;t built for Ontario&apos;s new rules.
                  You&apos;re left with:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <span>Spreadsheets that aren&apos;t audit-ready</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <span>$500+/month platforms retrofitting compliance</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <span>Manual tracking that misses deadlines</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <Section width="wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Built once. You own it. Runs on your infrastructure.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Lemonbrand ATS was built from the ground up for O. Reg. 476/24.
            Every feature exists to keep you compliant.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceRequirements.map((item) => {
            const Icon = item.icon;
            return (
              <FeatureCard key={item.title} className="bg-card">
                <div className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
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

        <div className="mt-12 p-6 bg-card rounded-lg border border-border text-center">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">Even if we disappeared tomorrow</span>, your ATS keeps running.
            It&apos;s deployed to your cloud accounts. You own the code.
          </p>
        </div>
      </Section>

      {/* Pricing */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              One-time purchase. Own it forever.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare: typical ATS subscriptions cost $7,200 - $28,800 over 3 years.
              You own nothing when you stop paying.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-card rounded-lg border ${
                  tier.popular ? "border-accent shadow-lg shadow-accent/10" : "border-border"
                } p-6 flex flex-col`}
              >
                {tier.popular && (
                  <div className="text-xs font-medium text-accent uppercase tracking-wider mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground"> CAD</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={tier.popular ? "accent" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            All prices in CAD. Infrastructure costs (Vercel, Convex, Clerk) typically $20-50/month depending on usage.
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <Section width="wide">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-display font-semibold mb-2">{signal.title}</h3>
              <p className="text-sm text-muted-foreground">{signal.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Get compliant before January 1st
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Don&apos;t wait until the deadline. Get set up now and hire with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                View Full Details
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              data-cal-namespace={calOptions.namespace}
              data-cal-link={CONSTANTS.CALCOM_LINK}
              data-cal-config={`{"layout":"${calOptions.layout}"}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Tools */}
      <Section className="py-12">
        <div className="text-center">
          <Link
            href="/tools"
            className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to all tools
          </Link>
        </div>
      </Section>
    </main>
  );
}
