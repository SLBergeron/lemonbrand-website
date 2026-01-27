"use client";

import { cn } from "@lemonbrand/ui";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";

interface BlitzModeMessageProps {
  className?: string;
}

export function BlitzModeMessage({ className }: BlitzModeMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-accent/30 bg-accent/5 p-5 mb-10",
        className
      )}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5 animate-pulse-subtle" />

      <div className="relative flex gap-4">
        {/* Icon */}
        <div className="shrink-0">
          <div className="size-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Zap className="size-5 text-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="font-display font-bold text-accent flex items-center gap-2">
            <span>You&apos;re moving fast.</span>
            <span className="text-muted-foreground font-normal">Good.</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Some people sprint through. Some take their time. Both work.
            <br />
            If you&apos;re here early, you&apos;re probably the type who learns by doing.
            <br />
            <span className="text-foreground font-medium">Keep that momentum.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
