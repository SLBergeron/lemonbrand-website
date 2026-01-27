"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Youtube, Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";

const products = [
  {
    name: "Lemonbrand ATS",
    description:
      "Ontario ESA-compliant applicant tracking system. Built for O. Reg. 476/24. One-time purchase, clients own the code.",
    status: "Live",
    link: "https://ats.lemonbrand.io",
    external: true,
  },
  {
    name: "VerifiedNode",
    description:
      "Trust layer for the agentic web. 58,000+ contractor records, paying customers. Built with the same methods I use for client work.",
    status: "Live",
    link: "https://www.verifiednode.com",
    external: true,
  },
  {
    name: "Custom Client Tools",
    description:
      "Dashboards, automation systems, internal tools. Built to spec, delivered in weeks. Clients own everything.",
    status: "Ongoing",
    link: "/custom",
    external: false,
  },
];

const values = [
  {
    title: "You Own Everything",
    description:
      "No subscriptions, no vendor lock-in. The code runs on your infrastructure. Even if I disappeared, your tools keep working.",
  },
  {
    title: "Fixed Pricing, No Surprises",
    description:
      "The quote is the price. I scope projects carefully so there are no surprise invoices or scope creep.",
  },
  {
    title: "Ship Fast, Iterate Live",
    description:
      "Working prototype in 1-2 weeks. We iterate on real software, not wireframes and mockups.",
  },
  {
    title: "Plain Language",
    description:
      "No jargon. No buzzwords. I explain what I'm building and why. You understand what you're paying for.",
  },
];

export default function AboutContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-wider uppercase text-accent mb-6">
              About
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
              I build tools businesses own forever
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I&apos;m Simon Bergeron. I build custom software for businesses who are tired
              of paying $500/month for tools that almost work.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              One-time purchase. You own the code. No subscriptions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="accent" size="sm" asChild>
                <Link href="/custom">
                  Work With Me
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Photo */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-sm">
              <div
                className="absolute inset-0 rounded-lg bg-accent/20"
                style={{
                  transform: "translate(8px, 8px)",
                }}
              />
              <Image
                src="/assets/Profile_updated_tall.webp"
                alt="Simon Bergeron"
                width={400}
                height={500}
                className="relative w-full h-auto rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Story */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-8">
              The short version
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I&apos;ve been in the startup ecosystem for 13 years—project management,
                automation, sales, building websites. Self-taught everything.
              </p>
              <p>
                When AI coding tools matured, I realized something: businesses don&apos;t need
                to rent software anymore. The tools they need can be built fast and owned forever.
              </p>
              <p>
                I started building tools for myself. Then for clients. Now I run a practice
                that delivers custom software in weeks instead of months, at a fraction of
                traditional development costs.
              </p>
              <p>
                The model is simple: you tell me what you need, I build it, you own it.
                No recurring fees. No vendor lock-in. Just tools that work exactly how you work.
              </p>
              <p className="text-foreground font-medium">
                I also teach people to build their own tools—same methods I use. But most
                clients just want it done. That&apos;s fine too.
              </p>
            </div>
          </div>
        </Section>
      </section>

      {/* Products */}
      <Section width="wide">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            What I&apos;ve built
          </h2>
          <p className="text-muted-foreground">
            Real products with real users. Not demos or proofs of concept.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <FeatureCard key={product.name} className="bg-card">
              <div className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      product.status === "Live"
                        ? "text-success bg-success/10"
                        : "text-muted-foreground bg-muted"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                  {product.description}
                </p>
                <Link
                  href={product.link}
                  {...(product.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="inline-flex items-center text-sm font-medium text-accent hover:underline mt-auto"
                >
                  {product.external ? "Visit site" : "Learn more"}
                  {product.external ? (
                    <ExternalLink className="w-3 h-3 ml-1" />
                  ) : (
                    <ArrowRight className="w-3 h-3 ml-1" />
                  )}
                </Link>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border/50">
        <Section className="py-0 px-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-12 text-center">
              How I work
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <CallToAction
          title="Ready to own your tools?"
          description="Book a 30-minute discovery call. We'll talk about what you need, I'll tell you if I can help, and you'll get a fixed quote within 48 hours."
          primaryCtaText="Book Discovery Call"
          primaryCtaLink="/custom"
          secondaryCtaText="See what I've built"
          secondaryCtaLink="/tools"
          className="max-w-4xl mx-auto"
        />
      </Section>
    </main>
  );
}
