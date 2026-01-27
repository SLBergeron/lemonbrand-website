"use client";

import Link from "next/link";
import { Button } from "@lemonbrand/ui";
import { ArrowRight, Clock, Users, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function TrialCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl"
    >
      {/* Background glows */}
      <div className="absolute -top-32 -right-32 size-64 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 size-48 rounded-full bg-success/10 blur-3xl" />

      <div className="relative p-5 sm:p-6 lg:p-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-5">
          <Sparkles className="size-3.5 text-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            Preview Complete
          </span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-2">
            Ready to Build Your Tool?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            You&apos;ve completed the free preview. Unlock the full 7-Day Sprint
            and go from idea to deployed tool.
          </p>
        </div>

        {/* Features - horizontal on mobile too */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
            <Zap className="size-4 text-accent shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">6 More Days</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
            <Users className="size-4 text-success shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">Cohort Access</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
            <Clock className="size-4 text-primary shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">$297 Credit → 8-Week</span>
          </div>
        </div>

        {/* Pricing + CTA */}
        <div className="pt-5 border-t border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight">$297</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>

            <div className="flex gap-3">
              <Button asChild variant="accent" size="lg" className="flex-1 sm:flex-none">
                <Link href="/sprint/checkout">
                  Enroll Now
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hidden sm:inline-flex">
                <Link href="/sprint">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Social proof */}
          <p className="text-xs text-muted-foreground mt-4">
            Join 50+ builders who&apos;ve shipped their first AI tools
          </p>
        </div>
      </div>
    </motion.section>
  );
}
