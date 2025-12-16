"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconX, IconCheck, IconArrowRight } from "@tabler/icons-react";
import type { CompareStep as CompareStepType } from "./types";

interface CompareStepProps {
  step: CompareStepType;
  onComplete: () => void;
}

export function CompareStep({ step, onComplete }: CompareStepProps) {
  const { content } = step;
  const [revealed, setRevealed] = useState(false);

  const styleConfig = {
    bad: {
      border: "border-red-200 dark:border-red-800",
      bg: "bg-red-50/50 dark:bg-red-900/10",
      icon: IconX,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-500",
      label: "text-red-600 dark:text-red-400",
    },
    good: {
      border: "border-green-200 dark:border-green-800",
      bg: "bg-green-50/50 dark:bg-green-900/10",
      icon: IconCheck,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-500",
      label: "text-green-600 dark:text-green-400",
    },
    neutral: {
      border: "border-neutral-200 dark:border-neutral-700",
      bg: "bg-neutral-50/50 dark:bg-neutral-900/30",
      icon: null,
      iconBg: "bg-neutral-100 dark:bg-neutral-800",
      iconColor: "text-neutral-500",
      label: "text-neutral-600 dark:text-neutral-400",
    },
  };

  const leftStyle = styleConfig[content.left.style];
  const rightStyle = styleConfig[content.right.style];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-8"
    >
      <div className="max-w-3xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center"
        >
          {content.title}
        </motion.h2>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "rounded-2xl border-2 p-6 transition-all",
              leftStyle.border,
              leftStyle.bg
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              {leftStyle.icon && (
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", leftStyle.iconBg)}>
                  <leftStyle.icon className={cn("w-5 h-5", leftStyle.iconColor)} />
                </div>
              )}
              <span className={cn("font-bold text-sm uppercase tracking-wide", leftStyle.label)}>
                {content.left.label}
              </span>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono text-sm">
                &ldquo;{content.left.content}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "rounded-2xl border-2 p-6 transition-all",
              rightStyle.border,
              rightStyle.bg
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              {rightStyle.icon && (
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", rightStyle.iconBg)}>
                  <rightStyle.icon className={cn("w-5 h-5", rightStyle.iconColor)} />
                </div>
              )}
              <span className={cn("font-bold text-sm uppercase tracking-wide", rightStyle.label)}>
                {content.right.label}
              </span>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono text-sm">
                &ldquo;{content.right.content}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Explanation */}
        {content.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
          >
            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
              {content.explanation}
            </p>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={onComplete}
            className="group flex items-center gap-2 px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Continue
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
