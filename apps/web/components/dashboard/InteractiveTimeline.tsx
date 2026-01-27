"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, LucideIcon } from "lucide-react";
import { useInViewport } from "@/hooks/design-system/useInViewport";

export interface TimelineStep {
  id: string;
  label: string;
  title: string;
  description: string;
  status?: "complete" | "current" | "upcoming";
  icon?: LucideIcon;
}

interface InteractiveTimelineProps {
  steps: TimelineStep[];
  orientation?: "horizontal" | "vertical";
  onStepClick?: (step: TimelineStep) => void;
  className?: string;
}

/**
 * InteractiveTimeline Component
 * 
 * Interactive timeline with clickable steps and expandable details.
 */
export function InteractiveTimeline({
  steps,
  orientation = "horizontal",
  onStepClick,
  className,
}: InteractiveTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const { ref, isInView } = useInViewport<HTMLDivElement>({ once: true });
  const isHorizontal = orientation === "horizontal";

  const handleStepClick = (step: TimelineStep) => {
    if (expandedStep === step.id) {
      setExpandedStep(null);
    } else {
      setExpandedStep(step.id);
    }
    onStepClick?.(step);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative",
        isHorizontal ? "overflow-x-auto pb-4" : "",
        className
      )}
    >
      <div
        className={cn(
          "relative",
          isHorizontal
            ? "flex items-start gap-0 min-w-max"
            : "flex flex-col gap-6"
        )}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isComplete = step.status === "complete";
          const isCurrent = step.status === "current";
          const isExpanded = expandedStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={isInView ? { opacity: 0, y: 20 } : {}}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={cn(
                "relative",
                isHorizontal ? "flex flex-col items-center" : "flex gap-4"
              )}
            >
              {/* Connector line (before) */}
              {i > 0 && (
                <motion.div
                  className={cn(
                    "absolute bg-border",
                    isHorizontal
                      ? "h-0.5 top-5 right-1/2 w-full -translate-x-1/2"
                      : "w-0.5 left-5 bottom-1/2 h-full -translate-y-1/2"
                  )}
                  style={{
                    background: isComplete
                      ? "hsl(var(--accent))"
                      : "hsl(var(--border))",
                  }}
                  initial={{ scaleX: 0, scaleY: 0 }}
                  animate={isInView ? { scaleX: 1, scaleY: 1 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                />
              )}

              {/* Step dot/icon */}
              <motion.button
                type="button"
                onClick={() => handleStepClick(step)}
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-full border-2 transition-all",
                  isHorizontal ? "w-10 h-10" : "w-10 h-10 flex-shrink-0",
                  isComplete && "bg-accent border-accent text-accent-foreground",
                  isCurrent &&
                    "bg-accent/20 border-accent text-accent shadow-lg",
                  !isComplete &&
                    !isCurrent &&
                    "bg-background border-border text-muted-foreground hover:border-accent/50",
                  onStepClick && "cursor-pointer"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : Icon ? (
                  <Icon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{i + 1}</span>
                )}

                {/* Pulse effect for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-accent"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* Step content */}
              <div
                className={cn(
                  isHorizontal
                    ? "text-center mt-3 w-32"
                    : "flex-1 pt-1"
                )}
              >
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-1">
                  {step.label}
                </p>
                <p
                  className={cn(
                    "font-semibold text-sm mb-2",
                    isCurrent && "text-accent"
                  )}
                >
                  {step.title}
                </p>

                {/* Expandable description */}
                {step.description && (
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

