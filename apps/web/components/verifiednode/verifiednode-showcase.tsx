"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ContractorTrustCard } from "./contractor-trust-card";
import { VerifiednodeLogo } from "./verifiednode-logo";
import { ExternalLink } from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";

// Simple hook to detect if we're on desktop
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return isDesktop;
}

interface VerifiednodeShowcaseProps {
  className?: string;
}

// Stat item with animated counter
function StatItem({
  label,
  value,
  suffix = "",
  prefix = "",
  delay = 0
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="text-xs text-muted-foreground mt-0.5 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function VerifiednodeShowcase({ className }: VerifiednodeShowcaseProps) {
  const isDesktop = useIsDesktop();
  const cardRotation = isDesktop ? 5 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Main container with subtle background */}
      <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-muted/50 via-muted/30 to-muted/50 overflow-visible">
        {/* Inner content - true 50/50 grid */}
        <div className="grid lg:grid-cols-2 min-h-[400px] lg:min-h-[420px]">

          {/* Left column: Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12 order-2 lg:order-1">
            {/* Logo header */}
            <div className="flex items-center gap-3 mb-6">
              <VerifiednodeLogo size="lg" />
              <div className="h-5 w-px bg-border" />
              <a
                href="https://verifiednode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1.5"
              >
                verifiednode.com
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Headline */}
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3">
              The trust layer for AI search
            </h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
              A real SaaS with authentication, payments, and paying customers.
              Built entirely with Claude Code—proof the same methods we use for clients actually ship.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 sm:gap-8 pt-4 border-t border-border/50">
              <StatItem
                label="Contractor records"
                value={58000}
                suffix="+"
                delay={0.2}
              />
              <StatItem
                label="Build time"
                value={2}
                suffix=" months"
                delay={0.3}
              />
              <StatItem
                label="API cost"
                value={600}
                prefix="$"
                delay={0.4}
              />
            </div>
          </div>

          {/* Right column: Card showcase */}
          <div className="relative flex items-center justify-center p-6 sm:p-8 lg:p-10 order-1 lg:order-2">
            {/* Subtle radial glow behind card */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] bg-accent/5 rounded-full blur-3xl" />
            </div>

            {/* Card with 3D rotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: cardRotation }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ transformOrigin: "center center" }}
            >
              {/* Deep shadow for 3D effect */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl blur-2xl transition-opacity duration-500",
                  isDesktop ? "bg-black/25 dark:bg-black/50 opacity-100" : "opacity-0"
                )}
                style={{
                  transform: `rotate(${cardRotation}deg) translateY(24px) translateX(16px) scale(0.92)`,
                }}
              />

              {/* The actual card */}
              <ContractorTrustCard
                companyName="Apex Builders & HVAC"
                showToggle={true}
                className="relative shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Compact version for tighter layouts
interface VerifiednodeCompactShowcaseProps {
  className?: string;
}

export function VerifiednodeCompactShowcase({ className }: VerifiednodeCompactShowcaseProps) {
  const isDesktop = useIsDesktop();
  const cardRotation = isDesktop ? 4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Card with rotation extending out of any container */}
      <motion.div
        initial={{ rotate: 0 }}
        whileInView={{ rotate: cardRotation }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
        style={{ transformOrigin: "center center" }}
      >
        {/* Shadow - only on desktop */}
        {isDesktop && (
          <div
            className="absolute inset-0 rounded-xl bg-black/20 dark:bg-black/35 blur-xl"
            style={{ transform: `rotate(${cardRotation}deg) translateY(16px) translateX(8px)` }}
          />
        )}

        <ContractorTrustCard
          companyName="Apex Builders & HVAC"
          showToggle={true}
          className="relative"
        />
      </motion.div>
    </motion.div>
  );
}
