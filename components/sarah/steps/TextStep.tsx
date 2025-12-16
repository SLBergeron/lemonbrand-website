"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBulb, IconChartBar, IconSparkles } from "@tabler/icons-react";
import type { TextStep as TextStepType } from "./types";

interface TextStepProps {
  step: TextStepType;
  onComplete: () => void;
}

const highlightStyles = {
  quote: {
    bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    border: "border-blue-100 dark:border-blue-800",
    icon: IconBulb,
    iconColor: "text-blue-500",
  },
  stat: {
    bg: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
    border: "border-orange-100 dark:border-orange-800",
    icon: IconChartBar,
    iconColor: "text-orange-500",
  },
  tip: {
    bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    border: "border-green-100 dark:border-green-800",
    icon: IconSparkles,
    iconColor: "text-green-500",
  },
};

export function TextStep({ step, onComplete }: TextStepProps) {
  const { content } = step;
  const highlight = content.highlight ? highlightStyles[content.highlight] : null;
  const HighlightIcon = highlight?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      <div className="max-w-xl w-full">
        {content.title && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 text-center"
          >
            {content.title}
          </motion.h2>
        )}

        {highlight ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "rounded-2xl p-6 border",
              highlight.bg,
              highlight.border
            )}
          >
            <div className="flex gap-4">
              {HighlightIcon && (
                <div className={cn("flex-shrink-0", highlight.iconColor)}>
                  <HighlightIcon className="w-6 h-6" />
                </div>
              )}
              <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-200">
                {content.body}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl leading-relaxed text-neutral-600 dark:text-neutral-300 text-center"
          >
            {content.body}
          </motion.p>
        )}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={onComplete}
            className="group relative overflow-hidden px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Continue</span>
            <div className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              Continue
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
