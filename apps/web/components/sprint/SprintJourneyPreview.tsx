"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Wrench,
  Target,
  FileCode,
  Blocks,
  Layers,
  Sparkles,
  Bug,
  Rocket,
  LucideIcon,
} from "lucide-react";

interface DayStep {
  day: number;
  title: string;
  icon: LucideIcon;
}

const days: DayStep[] = [
  { day: 0, title: "Setup", icon: Wrench },
  { day: 1, title: "Scope", icon: Target },
  { day: 2, title: "Plan", icon: FileCode },
  { day: 3, title: "Build", icon: Blocks },
  { day: 4, title: "Expand", icon: Layers },
  { day: 5, title: "Polish", icon: Sparkles },
  { day: 6, title: "Test", icon: Bug },
  { day: 7, title: "Ship!", icon: Rocket },
];

export function SprintJourneyPreview({ className }: { className?: string }) {
  return (
    <div className={cn("", className)}>
      {/* Compact grid of day pills */}
      <div className="grid grid-cols-4 gap-2">
        {days.map((step, i) => {
          const Icon = step.icon;
          const isShipDay = step.day === 7;

          return (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "relative flex flex-col items-center gap-1.5 p-2.5 rounded-lg transition-colors",
                isShipDay
                  ? "bg-accent/15 border border-accent/30"
                  : "bg-muted/50 hover:bg-muted/80"
              )}
            >
              {/* Day number badge */}
              <span
                className={cn(
                  "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center",
                  isShipDay
                    ? "bg-accent text-accent-foreground"
                    : "bg-border text-muted-foreground"
                )}
              >
                {step.day}
              </span>

              {/* Icon */}
              <Icon
                className={cn(
                  "w-4 h-4",
                  isShipDay ? "text-accent" : "text-muted-foreground"
                )}
              />

              {/* Title */}
              <span
                className={cn(
                  "text-[10px] font-medium leading-none",
                  isShipDay ? "text-accent" : "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          />
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">7 days</span>
      </div>
    </div>
  );
}
