"use client";

import { ModeToggleSection } from "@/lib/lessons/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@lemonbrand/ui";
import { FastForward, FileText, Keyboard } from "lucide-react";

interface Props {
  section: ModeToggleSection;
}

export function ModeToggleSectionComponent({ section }: Props) {
  const [activeMode, setActiveMode] = useState<"plan" | "build">("plan");

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <h2 className="font-display text-xl font-bold">{section.title}</h2>

      {/* Apple Glass Toggle */}
      <div className="relative">
        {/* Glass container */}
        <div className="relative bg-gradient-to-b from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-2 shadow-lg">
          {/* Toggle pills */}
          <div className="relative flex gap-2">
            {/* Sliding background indicator */}
            <motion.div
              className={cn(
                "absolute inset-y-0 rounded-xl transition-colors duration-300",
                activeMode === "plan"
                  ? "bg-gradient-to-br from-blue-500/20 to-blue-600/30 border border-blue-400/30"
                  : "bg-gradient-to-br from-purple-500/20 to-purple-600/30 border border-purple-400/30"
              )}
              initial={false}
              animate={{
                left: activeMode === "plan" ? "0%" : "50%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Plan Mode Button */}
            <button
              onClick={() => setActiveMode("plan")}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300",
                activeMode === "plan"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              )}
            >
              {/* Plan Mode Icon - Document style */}
              <div
                className={cn(
                  "relative flex items-center justify-center size-10 rounded-lg transition-all duration-300",
                  activeMode === "plan"
                    ? "bg-blue-500/20 border border-blue-400/40"
                    : "bg-muted/30 border border-border/50"
                )}
              >
                <FileText
                  className={cn(
                    "size-5 transition-colors duration-300",
                    activeMode === "plan" ? "text-blue-400" : "text-muted-foreground"
                  )}
                />
              </div>
              <div className="text-left">
                <div
                  className={cn(
                    "font-display font-semibold text-sm transition-colors duration-300",
                    activeMode === "plan" ? "text-blue-400" : "text-muted-foreground"
                  )}
                >
                  Plan Mode
                </div>
                <div className="text-xs text-muted-foreground">Read & refine</div>
              </div>
            </button>

            {/* Build Mode Button */}
            <button
              onClick={() => setActiveMode("build")}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl transition-all duration-300",
                activeMode === "build"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground/70"
              )}
            >
              {/* Accept Edits Icon - Purple fast forward */}
              <div
                className={cn(
                  "relative flex items-center justify-center size-10 rounded-lg transition-all duration-300",
                  activeMode === "build"
                    ? "bg-purple-500/20 border border-purple-400/40"
                    : "bg-muted/30 border border-border/50"
                )}
              >
                <FastForward
                  className={cn(
                    "size-5 transition-colors duration-300",
                    activeMode === "build" ? "text-purple-400" : "text-muted-foreground"
                  )}
                  fill={activeMode === "build" ? "currentColor" : "none"}
                />
              </div>
              <div className="text-left">
                <div
                  className={cn(
                    "font-display font-semibold text-sm transition-colors duration-300",
                    activeMode === "build" ? "text-purple-400" : "text-muted-foreground"
                  )}
                >
                  Accept Edits
                </div>
                <div className="text-xs text-muted-foreground">Auto-accept on</div>
              </div>
            </button>
          </div>
        </div>

        {/* Keyboard hint */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground"
        >
          <Keyboard className="size-4" />
          <span>{section.hint}</span>
        </motion.div>
      </div>

      {/* Content panels */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/50">
        {/* Plan Mode Content */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeMode === "plan" ? 1 : 0,
            x: activeMode === "plan" ? 0 : -20,
            position: activeMode === "plan" ? "relative" : "absolute",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "p-6 inset-0",
            activeMode !== "plan" && "pointer-events-none"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
              <FileText className="size-6 text-blue-400" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-blue-400">
                {section.planMode.label}
              </h3>
              <ul className="space-y-2">
                {section.planMode.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 rounded-full bg-blue-400/60 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Build Mode Content */}
        <motion.div
          initial={false}
          animate={{
            opacity: activeMode === "build" ? 1 : 0,
            x: activeMode === "build" ? 0 : 20,
            position: activeMode === "build" ? "relative" : "absolute",
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "p-6 inset-0",
            activeMode !== "build" && "pointer-events-none"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center shrink-0">
              <FastForward className="size-6 text-purple-400" fill="currentColor" />
            </div>
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg text-purple-400">
                {section.buildMode.label}
              </h3>
              <ul className="space-y-2">
                {section.buildMode.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 size-1.5 rounded-full bg-purple-400/60 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
