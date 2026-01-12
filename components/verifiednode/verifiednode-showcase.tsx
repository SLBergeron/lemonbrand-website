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

// Animated stat bar component
function StatBar({
  label,
  value,
  suffix = "",
  prefix = "",
  percentage,
  delay = 0
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  percentage: number;
  delay?: number;
}) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs sm:text-sm text-muted-foreground">{label}</span>
        <span className="text-base sm:text-lg font-semibold">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </span>
      </div>
      <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function VerifiednodeShowcase({ className }: VerifiednodeShowcaseProps) {
  const isDesktop = useIsDesktop();
  const cardRotation = isDesktop ? 4 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      {/* Header with logo - positioned outside overflow container */}
      <div className="absolute -top-3 sm:-top-4 left-3 sm:left-6 md:left-8 z-20 flex items-center gap-1.5 sm:gap-3 bg-background px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg border border-border/50 shadow-sm">
        <VerifiednodeLogo size="sm" className="sm:hidden" />
        <VerifiednodeLogo size="md" className="hidden sm:block" />
        <a
          href="https://verifiednode.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] sm:text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          verifiednode.com
          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </a>
      </div>

      {/* Wrapper with border - full width */}
      <div className="relative rounded-xl sm:rounded-2xl border border-border/60 bg-muted/30 p-3 sm:p-6 md:p-8 pt-10 sm:pt-14 pb-4 sm:pb-8 lg:pb-8 overflow-hidden">
        {/* Content grid - 50/50 split on desktop */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          {/* Left: Description + Stats */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                A real SaaS product. Authentication. Payments.{" "}
                <span className="text-foreground font-medium">Actual paying customers.</span>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Built entirely with Claude Code in ~2 months.
              </p>
            </div>

            {/* Animated Stats Bars */}
            <div className="space-y-3 sm:space-y-4">
              <StatBar
                label="Contractor Records"
                value={58000}
                percentage={100}
                delay={0.3}
              />
              <StatBar
                label="Build Time"
                value={2}
                suffix=" months"
                percentage={25}
                delay={0.5}
              />
              <StatBar
                label="Total API Cost"
                value={600}
                prefix="$"
                percentage={15}
                delay={0.7}
              />
            </div>
          </div>

          {/* Right: Card with rotation - grid cell handles sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: cardRotation }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative justify-self-center lg:justify-self-end"
            style={{ transformOrigin: "center center" }}
          >
            {/* Deep shadow for 3D effect - only on desktop */}
            {isDesktop && (
              <div
                className="absolute inset-0 rounded-xl bg-black/25 dark:bg-black/40 blur-2xl"
                style={{
                  transform: `rotate(${cardRotation}deg) translateY(20px) translateX(12px) scale(0.95)`,
                }}
              />
            )}

            {/* Card */}
            <ContractorTrustCard
              companyName="Apex Builders & HVAC"
              showToggle={true}
              className="relative shadow-xl lg:shadow-2xl"
            />
          </motion.div>
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
