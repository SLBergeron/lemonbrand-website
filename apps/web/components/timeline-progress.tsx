"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, Check, Circle } from "lucide-react";

interface TimelineStep {
  id: string;
  label: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  status?: "complete" | "current" | "upcoming";
}

interface TimelineProgressProps {
  steps: TimelineStep[];
  orientation?: "horizontal" | "vertical";
  showConnectors?: boolean;
  animateOnScroll?: boolean;
  expandable?: boolean;
  className?: string;
}

export function TimelineProgress({
  steps,
  orientation = "horizontal",
  showConnectors = true,
  animateOnScroll = true,
  expandable = false,
  className,
}: TimelineProgressProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isHorizontal = orientation === "horizontal";

  // Calculate progress percentage based on completed steps
  const completedIndex = steps.findLastIndex(s => s.status === "complete");
  const currentIndex = steps.findIndex(s => s.status === "current");
  
  // If no current step, but have completed steps, progress is up to last completed. 
  // If current exists, progress is up to current.
  const activeIndex = currentIndex !== -1 ? currentIndex : completedIndex;
  
  const progressPercent = Math.max(0, (activeIndex / (steps.length - 1)) * 100);

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-2 sm:p-4",
        isHorizontal ? "overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-4" : "",
        className
      )}
    >
      <div
        className={cn(
          "relative",
          isHorizontal
            ? "flex items-start justify-between min-w-[500px] sm:min-w-[600px] w-full"
            : "flex flex-col gap-6 sm:gap-8"
        )}
      >
        {/* Continuous Background Line */}
        {showConnectors && (
          <div
            className={cn(
              "absolute bg-border/30 rounded-full",
              isHorizontal
                ? "h-0.5 sm:h-1 top-4 sm:top-5 left-0 w-full"
                : "w-0.5 sm:w-1 left-4 sm:left-5 top-0 h-full"
            )}
          >
             {/* Animated Progress Line */}
             <motion.div 
               className={cn(
                 "absolute bg-accent rounded-full",
                 isHorizontal ? "h-full left-0" : "w-full top-0"
               )}
               initial={isHorizontal ? { width: 0 } : { height: 0 }}
               animate={isInView ? (isHorizontal ? { width: `${progressPercent}%` } : { height: `${progressPercent}%` }) : {}}
               transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
             />
          </div>
        )}

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isComplete = step.status === "complete";
          const isCurrent = step.status === "current";
          const isExpanded = expandedStep === step.id;

          return (
            <motion.div
              key={step.id}
              initial={animateOnScroll ? { opacity: 0, y: 20 } : {}}
              animate={animateOnScroll && isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={cn(
                "relative z-10",
                isHorizontal ? "flex flex-col items-center" : "flex gap-4"
              )}
            >
              {/* Step dot/icon */}
              <motion.div
                className={cn(
                  "relative flex items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300",
                  isHorizontal ? "w-8 h-8 sm:w-10 sm:h-10" : "w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0",
                  isComplete && "bg-accent border-accent text-accent-foreground shadow-accent/20",
                  isCurrent && "bg-background border-accent text-accent shadow-accent/40 scale-110",
                  !isComplete && !isCurrent && "bg-card border-border text-muted-foreground"
                )}
                whileHover={expandable ? { scale: 1.1 } : {}}
                onClick={() => expandable && setExpandedStep(isExpanded ? null : step.id)}
                style={{ cursor: expandable ? "pointer" : "default" }}
              >
                {isComplete ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : Icon ? (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : isCurrent ? (
                   <Circle className="w-3 h-3 sm:w-4 sm:h-4 fill-accent" />
                ) : (
                  <span className="text-[10px] sm:text-xs font-medium">{i + 1}</span>
                )}

                {/* Pulse ring for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-accent/50"
                    animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Step content */}
              <div
                className={cn(
                  isHorizontal
                    ? "text-center mt-3 sm:mt-4 w-20 sm:w-32"
                    : "flex-1 pt-1"
                )}
              >
                <p className={cn(
                    "text-[8px] sm:text-[10px] font-mono uppercase tracking-wider mb-0.5 sm:mb-1",
                    isCurrent ? "text-accent" : "text-muted-foreground"
                )}>
                  {step.label}
                </p>
                <p
                  className={cn(
                    "font-semibold text-xs sm:text-sm transition-colors",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>

                {/* Expandable description */}
                {(step.description || expandable) && (
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded || !expandable ? "auto" : 0, // Always show if not expandable mode
                      opacity: isExpanded || !expandable ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {step.description && (
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {step.description}
                        </p>
                    )}
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

// Pre-configured Sprint timeline
export function SprintTimeline({ className }: { className?: string }) {
  const sprintSteps: TimelineStep[] = [
    { id: "day0", label: "DAY 0", title: "Setup", status: "complete", description: "Tools & Env" },
    { id: "day1", label: "DAY 1", title: "Scope", status: "complete", description: "Project Selection" },
    { id: "day2", label: "DAY 2", title: "Structure", status: "complete", description: "Context & Plan" },
    { id: "day3", label: "DAY 3", title: "Core", status: "current", description: "Key Features" },
    { id: "day4", label: "DAY 4", title: "Expand", status: "upcoming", description: "Secondary Flows" },
    { id: "day5", label: "DAY 5", title: "Polish", status: "upcoming", description: "UI/UX & Fixes" },
    { id: "day7", label: "DAY 7", title: "Ship!", status: "upcoming", description: "Launch Day" },
  ];

  return (
    <TimelineProgress
      steps={sprintSteps}
      orientation="horizontal"
      className={className}
    />
  );
}

// Pre-configured 8-Week timeline
export function EightWeekTimeline({ className }: { className?: string }) {
  const weekSteps: TimelineStep[] = [
    { id: "w1", label: "WEEK 1", title: "Foundation", status: "complete" },
    { id: "w2", label: "WEEK 2", title: "Data", status: "complete" },
    { id: "w3", label: "WEEK 3", title: "Auth", status: "current" },
    { id: "w4", label: "WEEK 4", title: "APIs", status: "upcoming" },
    { id: "w5", label: "WEEK 5", title: "Deploy", status: "upcoming" },
    { id: "w6", label: "WEEK 6", title: "Project 2", status: "upcoming" },
    { id: "w7", label: "WEEK 7", title: "Advanced", status: "upcoming" },
    { id: "w8", label: "WEEK 8", title: "Ship!", status: "upcoming" },
  ];

  return (
    <TimelineProgress
      steps={weekSteps}
      orientation="horizontal"
      className={className}
    />
  );
}