"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ExternalLink, Shield, Server, Calendar, Code, Users, Calculator, ClipboardCheck, FileText } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { CallToAction } from "@/components/shared/CallToAction";
import { WaitlistSignup } from "@/components/shared/WaitlistSignup";

const products = [
  {
    name: "Lemonbrand ATS",
    tagline: "Ontario-compliant hiring. No monthly fees.",
    description:
      "The applicant tracking system built for O. Reg. 476/24. One-time purchase, runs on your infrastructure, keeps working even if we disappear.",
    status: "Available Now",
    features: [
      "45-day interview notification tracking",
      "Salary range validation ($50K max spread)",
      "AI usage disclosure (bilingual)",
      "3-year compliant record retention",
      "M365 integration",
    ],
    pricing: "Starting at $4,500 CAD",
    comparisonPrice: "vs $500/month competitors",
    href: "https://ats.lemonbrand.io",
    external: true,
    highlight: true,
  },
  {
    name: "VerifiedNode",
    tagline: "Trust layer for the agentic web.",
    description:
      "Contractor verification with 58,000+ records. Built with the same methods we teach.",
    status: "Live Product",
    features: [
      "Real-time verification API",
      "Contractor reputation scores",
      "Compliance documentation",
      "Fraud prevention",
    ],
    pricing: "Contact for pricing",
    href: "https://www.verifiednode.com",
    external: true,
    highlight: false,
  },
];

const comingSoon = [
  {
    name: "Client Portal",
    slug: "portal",
    description: "White-labeled client access for agencies. Share files, updates, and invoices.",
    icon: Users,
    subdomain: "portal.lemonbrand.io",
  },
  {
    name: "Desk Booking",
    slug: "deskbook",
    description: "Simple workspace reservation for hybrid offices. No per-seat fees.",
    icon: Calendar,
    subdomain: "deskbook.lemonbrand.io",
  },
  {
    name: "Proposal System",
    slug: "proposals",
    description: "Create, send, and track proposals. E-signatures included.",
    icon: Code,
    subdomain: "proposals.lemonbrand.io",
  },
];

const freeTools = [
  {
    name: "Custom Tool Quote Generator",
    description: "Get an instant estimate for your custom business tool. Answer a few questions, see your price range.",
    icon3d: "/assets/3dicons/3dicons-chart-dynamic-color.png",
    href: "/tools/proposal-generator",
    highlight: true,
  },
  {
    name: "SaaS vs Own Calculator",
    description: "See what you're really paying for that subscription over 3 years. Compare to owning outright.",
    icon3d: "/assets/3dicons/3dicons-calculator-dynamic-color.png",
    href: "/tools/calculator",
    highlight: false,
  },
  {
    name: "O. Reg. 476/24 Compliance Checker",
    description: "Check if your hiring process meets Ontario's new ESA requirements (effective Jan 1, 2026).",
    icon3d: "/assets/3dicons/3dicons-shield-dynamic-color.png",
    href: "/tools/compliance-checker",
    highlight: false,
  },
];

export default function ToolsContent() {
  return (
    <main className="pt-16">
      {/* Hero - Shorter */}
      <Section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">
            Tools You Own
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            No subscriptions.
            <span className="text-muted-foreground"> No vendor lock-in.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            One-time purchase. Your infrastructure. You own the code.
          </p>
        </div>
      </Section>

      {/* Free Tools - Prominent Section */}
      <section id="free" className="py-12 sm:py-16 px-3 sm:px-4 bg-accent/5 border-y border-accent/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              Try Our Free Tools
            </h2>
            <p className="text-muted-foreground">
              No signup required. Make smarter decisions about your software.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTools.map((tool) => {
              return (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="bg-card rounded-xl border-2 border-border p-8 transition-all hover:border-accent hover:shadow-lg group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 relative mb-5">
                      <Image
                        src={tool.icon3d}
                        alt={tool.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-5">{tool.description}</p>
                    <span className="inline-flex items-center gap-2 text-accent font-medium text-sm px-4 py-2 bg-accent/10 rounded-full group-hover:bg-accent group-hover:text-white transition-all">
                      Try Free
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 bg-muted/30 border-b border-border/50">
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
                  <span className="font-semibold text-success">$4,500 - $12,000</span>
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

      {/* Products */}
      <Section width="wide">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            Available tools
          </h2>
          <p className="text-muted-foreground">
            Pre-built solutions for common problems. One-time purchase, you own it forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product) => (
            <FeatureCard
              key={product.name}
              className={`bg-card ${product.highlight ? "border-accent/50" : ""}`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      {product.status}
                    </span>
                    <h3 className="font-display text-xl font-semibold mt-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {product.tagline}
                    </p>
                  </div>
                  {product.highlight && (
                    <div className="bg-accent/10 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">{product.pricing}</p>
                      {product.comparisonPrice && (
                        <p className="text-xs text-muted-foreground">{product.comparisonPrice}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant={product.highlight ? "accent" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link
                      href={product.href}
                      {...(product.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {product.external ? (
                        <>
                          Visit Site
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Link>
                  </Button>
                </div>
              </div>
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* Coming Soon */}
      <Section width="wide">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            More subscription killers coming
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re building alternatives to expensive subscriptions. Same model: one-time purchase, you own it.
            Get notified when they launch.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {comingSoon.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-card rounded-lg border border-border p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.subdomain}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <WaitlistSignup productName={item.name} productSlug={item.slug} />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Custom Build CTA */}
      <Section>
        <CallToAction
          title="Need something specific?"
          description="We build custom tools to your spec. Same model: you own the code, no subscriptions. Most projects delivered in 2-4 weeks."
          primaryCtaText="Get a Quote"
          primaryCtaLink="/custom"
          secondaryCtaText="See how it works"
          secondaryCtaLink="/custom#process"
          benefits={["Full source code ownership", "30-day support included", "5-15K for most projects"]}
          className="max-w-4xl mx-auto"
        />
      </Section>

      {/* DIY Option */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 border-t border-border/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Want to build your own tools?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight mb-4">
            We teach that too
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Can&apos;t afford a custom build? Learn to do it yourself. Our programs teach
            non-developers to build production tools with AI.
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
