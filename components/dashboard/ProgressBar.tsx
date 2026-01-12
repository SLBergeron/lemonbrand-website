"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInViewport } from "@/hooks/design-system/useInViewport";

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showValue?: boolean;
  color?: "accent" | "success" | "primary";
  animated?: boolean;
  className?: string;
}

/**
 * ProgressBar Component
 * 
 * Animated progress bar for displaying percentages or progress.
 */
export function ProgressBar({
  value,
  label,
  showValue = true,
  color = "accent",
  animated = true,
  className,
}: ProgressBarProps) {
  const { ref, isInView } = useInViewport<HTMLDivElement>({ once: true });
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const colorClasses = {
    accent: "bg-accent",
    success: "bg-success",
    primary: "bg-primary",
  };

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <p className="text-sm text-muted-foreground">{label}</p>}
          {showValue && (
            <p className="text-sm font-medium text-foreground">
              {clampedValue.toFixed(0)}%
            </p>
          )}
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", colorClasses[color])}
          initial={{ width: 0 }}
          animate={animated && isInView ? { width: `${clampedValue}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

