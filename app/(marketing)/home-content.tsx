"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, MessageSquare, Code, Rocket, Clock } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { getNextCohortDate } from "@/lib/utils";
import { VerifiednodeShowcase } from "@/components/verifiednode/verifiednode-showcase";

function SubscriptionStatus() {
  const searchParams = useSearchParams();
  const subscribed = searchParams.get("subscribed");
  const unsubscribed = searchParams.get("unsubscribed");
  const error = searchParams.get("error");

  if (subscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-success text-success-foreground px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        You&apos;re subscribed. Check your email.
      </div>
    );
  }

  if (unsubscribed) {
    return (
      <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        You&apos;ve been unsubscribed.
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-destructive text-white px-4 py-2 text-sm rounded-sm shadow-lg z-50">
        Something went wrong. Please try again.
      </div>
    );
  }

  return null;
}

const processSteps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description: "30-minute call to scope your project. Fixed quote within 48 hours.",
  },
  {
    icon: Code,
    title: "Build",
    description: "Working prototype in 1-2 weeks. You see progress, not just promises.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Deployed to your infrastructure. You own every line of code.",
  },
  {
    icon: Clock,
    title: "Support",
    description: "30 days of included support. We don't disappear after delivery.",
  },
];

export default function HomeContent() {
  const nextCohort = getNextCohortDate();

  return (
    <>
      <main className="pt-14 sm:pt-16">
        {/* Hero */}
        <Section className="py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-wider uppercase text-accent mb-6"
            >
              Build Once. Own Forever.
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6"
            >
              Tools you own.
              <br />
              <span className="text-muted-foreground">No subscriptions.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              Tired of paying $500/month for software that almost does what you need?
              We build custom tools businesses own forever. No vendor lock-in. Built with AI, delivered in weeks.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/tools">
                  See Our Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/custom">
                  Get a Custom Quote
                </Link>
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm text-muted-foreground mt-6"
            >
              Want to build your own?{" "}
              <Link href="/sprint" className="text-accent hover:underline">
                We teach that too.
              </Link>
            </motion.p>
          </div>
        </Section>

        {/* Problem Section */}
        <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                  The subscription trap
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You signed up for $49/month. Now it&apos;s $99. Then $199.
                    The features you need are in the &quot;Enterprise&quot; tier.
                  </p>
                  <p>
                    Three years in, you&apos;ve paid $7,200 and you own nothing.
                    Cancel and you lose everything.
                  </p>
                  <p className="font-medium text-foreground">
                    There&apos;s another way.
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">Typical SaaS (3 years)</span>
                    <span className="font-semibold text-destructive">$7,200 - $28,800</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-muted-foreground">What you own after</span>
                    <span className="font-semibold text-destructive">Nothing</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-foreground font-medium">Our tools (one-time)</span>
                    <span className="font-semibold text-success">$4,500 - $15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">What you own after</span>
                    <span className="font-semibold text-success">Everything</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Choose Your Path */}
        <Section width="wide">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
              Where do you want to start?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Choose your path
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three ways to work with us. Pick what fits.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Buy Path */}
            <Link href="/tools" className="block group">
              <FeatureCard className="bg-card h-full hover:border-accent/50 transition-colors">
                <div className="p-6 flex flex-col h-full text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src="/assets/3dicons/3dicons-tools-dynamic-color.png"
                      alt="Build it for me"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Build it for me
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    Custom tools built to your spec. One-time purchase, you own it forever.
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">$4.5K - $30K</p>
                    <p className="text-xs text-muted-foreground">one-time</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      See Our Tools
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </FeatureCard>
            </Link>

            {/* Learn Path */}
            <Link href="/learn" className="block group">
              <FeatureCard className="bg-card h-full border-accent/30 hover:border-accent/50 transition-colors">
                <div className="p-6 flex flex-col h-full text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src="/assets/3dicons/3dicons-flash-dynamic-color.png"
                      alt="Teach me to build"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Teach me to build
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    Learn to build your own tools with AI. From first tool to production apps.
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">From $297</p>
                    <p className="text-xs text-muted-foreground">start with the Sprint</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Compare Programs
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </FeatureCard>
            </Link>

            {/* Explore Path */}
            <Link href="/tools#free" className="block group">
              <FeatureCard className="bg-card h-full hover:border-accent/50 transition-colors">
                <div className="p-6 flex flex-col h-full text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <Image
                      src="/assets/3dicons/3dicons-explorer-dynamic-color.png"
                      alt="Let me explore"
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    Let me explore first
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    Try our free calculators and tools. See if we&apos;re a good fit.
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-success">Free</p>
                    <p className="text-xs text-muted-foreground">no signup required</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-accent font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Try Free Tools
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </FeatureCard>
            </Link>
          </div>
        </Section>

        {/* Products Showcase */}
        <Section width="wide">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              Tools we&apos;ve built
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-built solutions for common problems. One-time purchase, you own it forever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* ATS Card */}
            <FeatureCard className="bg-card border-accent/30">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      Available Now
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      Lemonbrand ATS
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ontario-compliant hiring. No monthly fees.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Built for O. Reg. 476/24. 45-day tracking, salary validation, bilingual AI notices, M365 integration.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">Starting at $4,500 CAD</p>
                    <p className="text-xs text-muted-foreground">vs $500/month competitors</p>
                  </div>
                  <Button variant="accent" size="sm" asChild>
                    <Link href="/tools/ats">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FeatureCard>

            {/* Custom Builds Card */}
            <FeatureCard className="bg-card">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Custom Development
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      Need something specific?
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We build tools to your spec.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Bespoke tools built in 2-4 weeks. You own the source code. Fixed pricing, no surprises.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">$5,000 - $30,000</p>
                    <p className="text-xs text-muted-foreground">depending on complexity</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/custom">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FeatureCard>
          </div>
        </Section>

        {/* How It Works */}
        <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                How custom builds work
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From idea to deployed tool in weeks, not months. Fixed pricing, no surprises.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="relative">
                    <div className="bg-card rounded-lg border border-border p-6 h-full">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <Button variant="accent" size="lg" asChild>
                <Link href="/custom">
                  Start a Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Proof Section - VerifiedNode */}
        <Section width="wide">
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              The proof
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
              We build real products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not just client work. We build and operate our own tools using the same methods.
            </p>
          </div>
          <VerifiednodeShowcase className="w-full" />
          <div className="mt-8 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              VerifiedNode: 58,000+ contractor records, paying customers.
              Built with AI-assisted development—the same approach we use for every project.
            </p>
          </div>
        </Section>

        {/* DIY Option */}
        <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-y border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
                  For the DIYers
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
                  Want to build your own?
                </h2>
                <p className="text-muted-foreground mb-6">
                  We weren&apos;t always building tools for clients. We learned to build them for ourselves first—
                  and we teach that same skill.
                </p>
                <p className="text-muted-foreground mb-6">
                  If you can explain what you want clearly, you can learn to build it with AI.
                  No coding background required. Just clarity about what you need.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Build your own tools instead of paying us",
                    "Same methods we use for client work",
                    "Ship something real in 7 days",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-success shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/sprint">
                    Learn about the programs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Programs Overview */}
              <div className="space-y-4">
                <Link href="/sprint" className="block group">
                  <div className="bg-card rounded-lg border border-border p-5 hover:border-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">7-Day Sprint</h3>
                      <span className="text-accent font-medium">$297</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Build your first tool. Prove you can do this.
                    </p>
                  </div>
                </Link>
                <Link href="/8-week" className="block group">
                  <div className="bg-card rounded-lg border border-border p-5 hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">8-Week Program</h3>
                      <span className="text-primary font-medium">$997+</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Master the skill. Databases, auth, deployment.
                    </p>
                  </div>
                </Link>
                <Link href="/club" className="block group">
                  <div className="bg-card rounded-lg border border-border p-5 hover:border-success/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Builders Club</h3>
                      <span className="text-success font-medium">$97/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Keep building. Community, challenges, office hours.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <Section>
          <CallToAction
            title="Ready to own your tools?"
            description="See what we've built, get a quote for something custom, or learn to build your own."
            primaryCtaText="See Our Tools"
            primaryCtaLink="/tools"
            secondaryCtaText="Get a Custom Quote"
            secondaryCtaLink="/custom"
            className="max-w-4xl mx-auto"
          />
        </Section>

        {/* Final Section */}
        <section className="py-16 sm:py-20 px-3 sm:px-4 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
              Two paths to the same destination
            </h2>
            <div className="text-primary-foreground/80 space-y-4 text-lg leading-relaxed mb-8">
              <p>You need tools that work exactly how you work.</p>
              <p>
                <strong className="text-primary-foreground">Option 1:</strong> We build it for you.
                Custom tools, fixed price, you own everything.
              </p>
              <p>
                <strong className="text-primary-foreground">Option 2:</strong> You learn to build it yourself.
                Same methods, taught in a week.
              </p>
              <p className="pt-2">
                Either way, you end up with tools you own. No subscriptions. No vendor lock-in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link href="/tools">
                  See Our Tools
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/custom">
                  Get a Custom Quote
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              Or{" "}
              <Link href="/sprint" className="underline hover:text-primary-foreground/80">
                learn to build your own
              </Link>
              . Next cohort starts {nextCohort}.
            </p>
          </div>
        </section>

        {/* Subscription Status Toast */}
        <Suspense fallback={null}>
          <SubscriptionStatus />
        </Suspense>
      </main>
    </>
  );
}
