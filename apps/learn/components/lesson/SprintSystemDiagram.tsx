"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Target,
  FileText,
  Hammer,
  Rocket,
  Sparkles,
  Check,
} from "lucide-react";

const steps = [
  {
    day: "Day 0",
    label: "Setup",
    description: "Tools + idea",
    icon: Lightbulb,
  },
  {
    day: "Day 1",
    label: "Scope",
    description: "Define with AI",
    icon: Target,
  },
  {
    day: "Day 2",
    label: "Context",
    description: "CLAUDE.md + plan",
    icon: FileText,
  },
  {
    day: "Day 3",
    label: "Build",
    description: "First version",
    icon: Hammer,
  },
  {
    day: "Day 4",
    label: "Deploy",
    description: "Live + feedback",
    icon: Rocket,
  },
  {
    day: "Day 5",
    label: "Expand",
    description: "Add real value",
    icon: Sparkles,
    current: true,
  },
];

export function SprintSystemDiagram() {
  return (
    <div className="w-full py-6">
      {/* Desktop: Horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
          <div className="absolute top-8 left-0 h-0.5 bg-accent/50" style={{ width: '83%' }} />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isCompleted = i < 5;
              const isCurrent = step.current;

              return (
                <motion.div
                  key={step.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  {/* Icon circle */}
                  <div
                    className={`relative size-16 rounded-2xl flex items-center justify-center mb-3 transition-all ${
                      isCurrent
                        ? "bg-accent/20 border-2 border-accent shadow-lg shadow-accent/20"
                        : isCompleted
                        ? "bg-emerald-500/10 border-2 border-emerald-500/40 backdrop-blur-sm"
                        : "bg-card border border-border"
                    }`}
                    style={isCompleted && !isCurrent ? { backgroundColor: 'hsl(var(--background))' } : undefined}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="size-6 text-emerald-400" />
                    ) : (
                      <Icon
                        className={`size-6 ${
                          isCurrent ? "text-accent" : "text-muted-foreground"
                        }`}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-xs font-medium mb-1 ${
                      isCurrent ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {step.day}
                  </span>
                  <span
                    className={`text-sm font-semibold mb-0.5 ${
                      isCurrent ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-xs text-muted-foreground text-center max-w-[80px]">
                    {step.description}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical list */}
      <div className="md:hidden space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = i < 5;
          const isCurrent = step.current;

          return (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`flex items-center gap-4 p-3 rounded-xl ${
                isCurrent
                  ? "bg-accent/10 border border-accent/30"
                  : "bg-card/50 border border-border/50"
              }`}
            >
              {/* Icon */}
              <div
                className={`size-10 rounded-lg flex items-center justify-center ${
                  isCurrent
                    ? "bg-accent/20"
                    : isCompleted
                    ? "bg-emerald-500/20"
                    : "bg-muted/50"
                }`}
              >
                {isCompleted && !isCurrent ? (
                  <Check className="size-5 text-emerald-400" />
                ) : (
                  <Icon
                    className={`size-5 ${
                      isCurrent ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {step.day}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {step.description}
                </span>
              </div>

              {/* Current indicator */}
              {isCurrent && (
                <span className="text-xs font-medium text-accent px-2 py-0.5 rounded-full bg-accent/20">
                  You are here
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="text-center text-sm text-muted-foreground mt-6"
      >
        This is your system. It works for any project.
      </motion.p>
    </div>
  );
}
