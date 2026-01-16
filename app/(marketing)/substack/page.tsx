"use client";

import { SubstackActivationForm } from "@/components/SubstackActivationForm";
import { Section } from "@/components/shared/Section";
import { DotGridBackground } from "@/components/dot-grid-background";
import { SubtleGradientBackground } from "@/components/gradient-blob";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wrench, Calculator, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function SubstackActivationPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <SubtleGradientBackground className="relative border-b border-border/50">
        <DotGridBackground fade="bottom" containerClassName="pt-32 sm:pt-40 pb-20 sm:pb-28 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Badge
                  variant="accent"
                  className="px-4 py-1.5 text-sm font-medium gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Simon&apos;s Agents
                </Badge>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeInUp} className="text-center space-y-6">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                  Ship AI tools fast
                  <br />
                  <span className="text-muted-foreground">(without being a developer)</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get the Build Stack Starter Kit — the exact CLAUDE.md template I use for every project,
                  plus a 5-email sequence that teaches the method.
                </p>
              </motion.div>

              {/* What you'll build */}
              <motion.div variants={fadeInUp} className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                  <Wrench className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Internal tools</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                  <Calculator className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Lead-gen utilities</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card/50 rounded-lg border border-border/50">
                  <Rocket className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm">Offer prototypes</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </DotGridBackground>
      </SubtleGradientBackground>

      {/* Form Section */}
      <Section width="default">
        <div className="bg-card border border-border/50 rounded-xl p-6 sm:p-8 shadow-lg">
          <SubstackActivationForm />
        </div>
      </Section>

      {/* About Simon */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50">
        <Section width="default" className="py-0 px-0">
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">About</p>
            <p className="text-muted-foreground">
              I run two ventures. <strong>VerifiedNode</strong> is verification infrastructure
              for an agentic internet — 58,000+ contractor records.{" "}
              <strong>LemonBrand</strong> teaches non-developers to build with Claude Code.
            </p>
            <p className="text-muted-foreground">
              When I say &quot;agents,&quot; I don&apos;t mean bots running in the cloud.
              I mean <strong>you</strong> empowered by AI — and the tools you build that work for you.
            </p>
            <p className="text-sm text-muted-foreground pt-4">
              <Link href="https://substack.com/@slbergeron" className="text-accent hover:underline">
                Read the newsletter on Substack →
              </Link>
            </p>
          </div>
        </Section>
      </section>
    </main>
  );
}
