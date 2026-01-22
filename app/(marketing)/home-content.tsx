"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown, MessageSquare, Code, Rocket, Clock, ExternalLink } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { getNextCohortDate, cn } from "@/lib/utils";
import { VerifiednodeShowcase } from "@/components/verifiednode/verifiednode-showcase";
import { useCurrency } from "@/hooks/useCurrency";

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
  const { currency } = useCurrency();

  return (
    <>
      <main className="pt-14 sm:pt-16">
        {/* Hero */}
        <Section className="relative py-24 sm:py-32 bg-glow-accent bg-dots overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
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
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
            >
              Tools you own.
              <br />
              <span className="font-light text-muted-foreground">No subscriptions.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed mb-8 max-w-2xl mx-auto"
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
        <section className="relative py-16 sm:py-20 px-3 sm:px-4 bg-noise bg-mesh border-y border-border/50 overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6">
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
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
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
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Tools we&apos;ve built
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pre-built solutions for common problems. One-time purchase, you own it forever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                    <p className="font-semibold text-foreground">Starting at $4,500 {currency}</p>
                    <p className="text-xs text-muted-foreground">vs $500/month competitors</p>
                  </div>
                  <Button variant="accent" size="sm" asChild>
                    <Link href="https://ats.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FeatureCard>

            {/* Book-A-Desk Card */}
            <FeatureCard className="bg-card border-accent/30">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      Available Now
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      Book-A-Desk
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Workspace reservation made simple.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Hot desk booking, floor maps, team coordination. Perfect for hybrid offices and coworking spaces.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">Contact for pricing</p>
                    <p className="text-xs text-muted-foreground">one-time purchase</p>
                  </div>
                  <Button variant="accent" size="sm" asChild>
                    <Link href="https://desk.lemonbrand.io" target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="w-4 h-4 ml-1" />
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
        <section className="relative py-16 sm:py-20 px-3 sm:px-4 bg-grid bg-glow-primary border-y border-border/50 overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
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
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-wider text-accent mb-3 font-medium">
              The proof
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              We build real products
            </h2>
          </div>
          <VerifiednodeShowcase className="w-full" />
        </Section>

        {/* DIY Option */}
        <section className="relative py-20 sm:py-28 px-3 sm:px-4 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30" />
          <div className="absolute inset-0 bg-grid opacity-[0.03]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    For the DIYers
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
                  Want to build your own?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                  We weren&apos;t always building tools for clients. We learned to build them for ourselves first—
                  and we teach that same skill.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  If you can explain what you want clearly, you can learn to build it with AI.
                  No coding background required.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Build your own tools instead of paying us",
                    "Same methods we use for client work",
                    "Ship something real in 7 days",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-muted-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Button variant="accent" size="lg" className="shadow-lg shadow-accent/20" asChild>
                  <Link href="/sprint">
                    Learn about the programs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              {/* Programs Overview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                {[
                  { href: "/sprint", name: "7-Day Sprint", price: "$297", desc: "Build your first tool. Prove you can do this.", color: "accent" },
                  { href: "/8-week", name: "8-Week Program", price: "$997+", desc: "Master the skill. Databases, auth, deployment.", color: "primary" },
                  { href: "/club", name: "Builders Club", price: "$97/mo", desc: "Keep building. Community, challenges, office hours.", color: "success" },
                ].map((program) => (
                  <Link key={program.name} href={program.href} className="block group">
                    <div className={cn(
                      "relative rounded-2xl border p-6 transition-all duration-300",
                      "bg-card/80 backdrop-blur-sm",
                      "border-border/60 hover:border-border",
                      "hover:shadow-lg hover:-translate-y-0.5",
                      program.color === "accent" && "hover:border-accent/40 hover:shadow-accent/10",
                      program.color === "primary" && "hover:border-primary/40 hover:shadow-primary/10",
                      program.color === "success" && "hover:border-success/40 hover:shadow-success/10"
                    )}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-bold text-lg">{program.name}</h3>
                        <span className={cn(
                          "font-bold",
                          program.color === "accent" && "text-accent",
                          program.color === "primary" && "text-primary",
                          program.color === "success" && "text-success"
                        )}>{program.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {program.desc}
                      </p>
                      <ArrowRight className={cn(
                        "absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-50 group-hover:translate-x-0",
                        program.color === "accent" && "text-accent",
                        program.color === "primary" && "text-primary",
                        program.color === "success" && "text-success"
                      )} />
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <Section>
          <CallToAction
            variant="accent"
            title="Ready to own your tools?"
            description="See what we've built, get a quote for something custom, or learn to build your own."
            primaryCtaText="See Our Tools"
            primaryCtaLink="/tools"
            secondaryCtaText="Get a Custom Quote"
            secondaryCtaLink="/custom"
            benefits={["No subscriptions", "You own the code", "30-day support"]}
            className="max-w-4xl mx-auto"
          />
        </Section>

        {/* Final Section */}
        <section className="relative py-20 sm:py-28 px-3 sm:px-4 bg-primary text-primary-foreground overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-grid opacity-[0.02]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8">
              Two paths to the same destination
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Option 1</div>
                <h3 className="text-xl font-bold mb-2">We build it for you</h3>
                <p className="text-primary-foreground/70 text-sm">
                  Custom tools, fixed price, you own everything. Delivered in 2-4 weeks.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">Option 2</div>
                <h3 className="text-xl font-bold mb-2">Learn to build it yourself</h3>
                <p className="text-primary-foreground/70 text-sm">
                  Same methods we use, taught in a week. No coding background required.
                </p>
              </div>
            </div>

            <p className="text-primary-foreground/80 text-lg mb-10">
              Either way, you end up with tools you own. <span className="text-primary-foreground font-semibold">No subscriptions. No vendor lock-in.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/20 h-14 px-8 text-base font-semibold"
                asChild
              >
                <Link href="/tools">
                  See Our Tools
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-primary-foreground hover:bg-white/10 h-14 px-8 text-base font-semibold"
                asChild
              >
                <Link href="/custom">
                  Get a Custom Quote
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/50 mt-8">
              Or{" "}
              <Link href="/sprint" className="text-primary-foreground/70 underline underline-offset-4 hover:text-primary-foreground transition-colors">
                learn to build your own
              </Link>
              . Next cohort starts {nextCohort}.
            </p>
          </motion.div>
        </section>

        {/* Subscription Status Toast */}
        <Suspense fallback={null}>
          <SubscriptionStatus />
        </Suspense>
      </main>
    </>
  );
}
