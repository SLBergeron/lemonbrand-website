"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ExternalLink, Code, Users, Building2 } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { CallToAction } from "@/components/shared/CallToAction";
import { WaitlistSignup } from "@/components/shared/WaitlistSignup";
import { useCurrency } from "@/hooks/useCurrency";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Lemonbrand ATS",
    tagline: "Ontario-compliant hiring. No monthly fees.",
    description:
      "The applicant tracking system built for O. Reg. 476/24. One-time purchase, runs on your infrastructure, keeps working even if we disappear.",
    status: "Available Now",
    icon3d: "/assets/3dicons/3dicons-shield-dynamic-color.png",
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
    name: "Book-A-Desk",
    tagline: "Simple desk booking for hybrid teams.",
    description:
      "Workspace reservation for hybrid offices. No per-seat fees, no monthly subscriptions. One-time purchase, runs on your infrastructure.",
    status: "Available Now",
    icon3d: "/assets/3dicons/3dicons-calender-dynamic-color.png",
    features: [
      "Interactive floor plan views",
      "Recurring booking support",
      "Team availability at a glance",
      "No per-seat pricing",
    ],
    pricing: "Starting at $999",
    comparisonPrice: "vs $15/seat/month competitors",
    href: "https://desk.lemonbrand.io",
    external: true,
    highlight: true,
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
    name: "Proposal System",
    slug: "proposals",
    description: "Create, send, and track proposals. E-signatures included.",
    icon: Code,
    subdomain: "proposals.lemonbrand.io",
  },
  {
    name: "Property Management",
    slug: "property",
    description: "Tenant management, lease tracking, and maintenance requests. No per-unit fees.",
    icon: Building2,
    subdomain: "property.lemonbrand.io",
  },
];

const freeTools = [
  {
    name: "Custom Tool Quote Generator",
    description: "Get an instant estimate for your custom business tool. Answer a few questions, see your price range.",
    icon3d: "/assets/3dicons/3dicons-chart-dynamic-color.png",
    href: "/tools/proposal-generator",
  },
  {
    name: "SaaS vs Own Calculator",
    description: "See what you're really paying for that subscription over 3 years. Compare to owning outright.",
    icon3d: "/assets/3dicons/3dicons-calculator-dynamic-color.png",
    href: "/tools/calculator",
  },
  {
    name: "O. Reg. 476/24 Compliance Checker",
    description: "Check if your hiring process meets Ontario's new ESA requirements (effective Jan 1, 2026).",
    icon3d: "/assets/3dicons/3dicons-shield-dynamic-color.png",
    href: "/tools/compliance-checker",
  },
];

// Stagger animation variants
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

// Free tool card component with enhanced hover
function FreeToolCard({ tool, index }: { tool: typeof freeTools[0]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={tool.href}
        className="group block h-full"
      >
        <div className={cn(
          "relative h-full rounded-2xl p-6 sm:p-8",
          "bg-gradient-to-b from-card to-card/80",
          "border border-border/60",
          "transition-all duration-300",
          "hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5",
          "overflow-hidden"
        )}>
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:via-transparent group-hover:to-accent/3 transition-all duration-500" />

          <div className="relative flex flex-col items-center text-center h-full">
            {/* 3D Icon */}
            <div className="w-20 h-20 relative mb-6">
              <Image
                src={tool.icon3d}
                alt={tool.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                unoptimized
              />
            </div>

            {/* Content */}
            <h3 className="font-display text-lg font-bold tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {tool.description}
            </p>

            {/* CTA */}
            <span className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              "px-5 py-2.5 rounded-full",
              "bg-accent/10 text-accent",
              "transition-all duration-300",
              "group-hover:bg-accent group-hover:text-white",
              "group-hover:shadow-lg group-hover:shadow-accent/25"
            )}>
              Try Free
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Product card component with enhanced design
function ProductCard({ product }: { product: typeof products[0] }) {
  const { currency } = useCurrency();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <div className={cn(
        "relative h-full rounded-2xl",
        "bg-gradient-to-b from-card via-card to-card/90",
        "border transition-all duration-300",
        product.highlight
          ? "border-accent/30 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
          : "border-border/60 hover:border-border hover:shadow-lg",
        "overflow-hidden"
      )}>
        {/* Top accent for highlighted card */}
        {product.highlight && (
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        )}

        <div className="p-6 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <span className={cn(
                "inline-block text-xs font-semibold uppercase tracking-wider mb-2",
                product.highlight ? "text-accent" : "text-muted-foreground"
              )}>
                {product.status}
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {product.tagline}
              </p>
            </div>
            <div className="w-16 h-16 relative shrink-0">
              <Image
                src={product.icon3d}
                alt={product.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-2.5 mb-6 flex-1">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="pt-5 border-t border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-lg">{product.pricing.replace("CAD", currency)}</p>
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
      </div>
    </motion.div>
  );
}

// Coming soon card
function ComingSoonCard({ item, index }: { item: typeof comingSoon[0]; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "relative rounded-2xl p-6",
        "bg-card/50 backdrop-blur-sm",
        "border border-border/50",
        "transition-all duration-300",
        "hover:border-border hover:bg-card/80"
      )}
    >
      {/* Icon and title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-muted/80 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground font-mono">{item.subdomain}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        {item.description}
      </p>

      <WaitlistSignup productName={item.name} productSlug={item.slug} />
    </motion.div>
  );
}

export default function ToolsContent() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <Section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-glow-accent opacity-50" />
        <div className="absolute inset-0 bg-dots opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <p className="text-sm font-semibold tracking-wider uppercase text-accent mb-5">
            Tools You Own
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-5">
            No subscriptions.
            <br />
            <span className="font-light text-muted-foreground">No vendor lock-in.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            One-time purchase. Your infrastructure. You own the code forever.
          </p>
        </motion.div>
      </Section>

      {/* Free Tools */}
      <section id="free" className="relative py-16 sm:py-20 px-3 sm:px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-accent/[0.05] to-transparent" />
        <div className="absolute inset-0 bg-mesh opacity-50" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Try Our Free Tools
            </h2>
            <p className="text-muted-foreground text-lg">
              No signup required. Make smarter software decisions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {freeTools.map((tool, index) => (
              <FreeToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="relative py-16 sm:py-20 px-3 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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
                <p className="font-semibold text-foreground">
                  There&apos;s another way.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 sm:p-8"
            >
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <span className="text-muted-foreground">Typical SaaS (3 years)</span>
                  <span className="font-bold text-lg text-destructive">$7,200 - $28,800</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <span className="text-muted-foreground">What you own after</span>
                  <span className="font-bold text-destructive">Nothing</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-medium">Our tools (one-time)</span>
                  <span className="font-bold text-lg text-success">$4,500 - $12,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">What you own after</span>
                  <span className="font-bold text-success">Everything</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products */}
      <Section width="wide" className="relative">
        <div className="absolute inset-0 bg-glow-primary opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Available tools
          </h2>
          <p className="text-muted-foreground text-lg">
            Pre-built solutions for common problems. One-time purchase, you own it forever.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid md:grid-cols-2 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </motion.div>
      </Section>

      {/* Coming Soon */}
      <Section width="wide" className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            More subscription killers coming
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We&apos;re building alternatives to expensive subscriptions. Same model: one-time purchase, you own it.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {comingSoon.map((item, index) => (
            <ComingSoonCard key={item.name} item={item} index={index} />
          ))}
        </motion.div>
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
      <section className="relative py-20 sm:py-24 px-3 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-4">
            Want to build your own tools?
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-5">
            We teach that too
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Can&apos;t afford a custom build? Learn to do it yourself. Our programs teach
            non-developers to build production tools with AI.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/sprint">
              Learn about the programs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
