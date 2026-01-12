"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotsCounterProps {
  total: number;
  filled: number;
  label?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SpotsCounter({
  total,
  filled,
  label = "spots remaining",
  animate = true,
  size = "md",
  className,
}: SpotsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const remaining = total - filled;

  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const gapSizes = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center", gapSizes[size], className)}
    >
      {/* Dots */}
      <div className={cn("flex items-center", gapSizes[size])}>
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <motion.div
              key={i}
              className={cn(
                "rounded-full",
                dotSizes[size],
                isFilled
                  ? "bg-muted-foreground/30"
                  : "bg-accent"
              )}
              initial={animate ? { scale: 0, opacity: 0 } : {}}
              animate={
                animate && isInView
                  ? {
                      scale: 1,
                      opacity: 1,
                    }
                  : {}
              }
              transition={{
                delay: i * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
              }}
            >
              {/* Pulse effect for remaining spots */}
              {!isFilled && (
                <motion.div
                  className={cn(
                    "rounded-full bg-accent",
                    dotSizes[size]
                  )}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Label */}
      <motion.span
        className={cn(
          "text-muted-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}
        initial={animate ? { opacity: 0, x: -10 } : {}}
        animate={animate && isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: total * 0.05 + 0.2, duration: 0.3 }}
      >
        <span className="font-semibold text-accent">{remaining}</span> {label}
      </motion.span>
    </div>
  );
}

// Compact badge variant
interface SpotsBadgeProps {
  remaining: number;
  className?: string;
}

export function SpotsBadge({ remaining, className }: SpotsBadgeProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20",
        className
      )}
      animate={{
        borderColor: ["hsl(var(--accent) / 0.2)", "hsl(var(--accent) / 0.4)", "hsl(var(--accent) / 0.2)"],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        className="w-2 h-2 rounded-full bg-accent"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-sm font-medium">
        <span className="text-accent">{remaining}</span>
        <span className="text-muted-foreground"> spots left</span>
      </span>
    </motion.div>
  );
}

// Progress bar variant
interface SpotsProgressProps {
  total: number;
  filled: number;
  label?: string;
  className?: string;
}

export function SpotsProgress({
  total,
  filled,
  label,
  className,
}: SpotsProgressProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const remaining = total - filled;
  const percentage = (filled / total) * 100;

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label || "Spots filled"}</span>
        <span className="font-medium">
          <span className="text-accent">{remaining}</span>
          <span className="text-muted-foreground"> remaining</span>
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
