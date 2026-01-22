"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  benefits?: string[];
  className?: string;
  variant?: "default" | "accent" | "minimal";
}

export function CallToAction({
  title,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  benefits,
  className,
  variant = "default",
}: CallToActionProps) {
  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={cn("text-center", className)}
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="accent" size="lg" asChild>
            <Link href={primaryCtaLink}>
              {primaryCtaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          {secondaryCtaText && secondaryCtaLink && (
            <Button variant="outline" size="lg" asChild>
              <Link href={secondaryCtaLink}>
                {secondaryCtaText}
              </Link>
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative", className)}
    >
      <div
        className={cn(
          "relative rounded-3xl overflow-hidden",
          variant === "accent"
            ? "bg-gradient-to-br from-accent/10 via-accent/5 to-transparent"
            : "bg-gradient-to-br from-primary/5 via-card to-card"
        )}
      >
        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-border/60" />

        {/* Accent glow orbs */}
        <div className={cn(
          "absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none",
          variant === "accent" ? "bg-accent/20" : "bg-accent/10"
        )} />
        <div className={cn(
          "absolute -bottom-32 -left-32 w-64 h-64 rounded-full blur-3xl pointer-events-none",
          variant === "accent" ? "bg-primary/15" : "bg-primary/5"
        )} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-12 items-center">
            {/* Left: Text content */}
            <div className="space-y-6">
              {/* Badge */}
              {variant === "accent" && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    Let&apos;s Build
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {title}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                {description}
              </p>

              {/* Benefits */}
              {benefits && benefits.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
                  {benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col gap-4 lg:min-w-[240px]">
              <Button
                variant="accent"
                size="lg"
                className={cn(
                  "w-full h-14 text-base font-semibold",
                  "shadow-lg shadow-accent/25",
                  "hover:shadow-xl hover:shadow-accent/30"
                )}
                asChild
              >
                <Link href={primaryCtaLink}>
                  {primaryCtaText}
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {secondaryCtaText && secondaryCtaLink && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 text-base font-medium border-2"
                  asChild
                >
                  <Link href={secondaryCtaLink}>
                    {secondaryCtaText}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
