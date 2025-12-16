"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconTrophy,
  IconStar,
  IconSparkles,
  IconArrowRight,
  IconShield,
  IconBrain,
  IconTarget,
  IconRocket,
  IconBulb,
  IconUsers,
} from "@tabler/icons-react";
import type { CompletionStep as CompletionStepType } from "./types";

interface CompletionStepProps {
  step: CompletionStepType;
  onComplete: () => void;
  isLastPage?: boolean;
}

// Map icon names to components
const iconMap: Record<string, any> = {
  trophy: IconTrophy,
  star: IconStar,
  shield: IconShield,
  brain: IconBrain,
  target: IconTarget,
  rocket: IconRocket,
  bulb: IconBulb,
  users: IconUsers,
  sparkles: IconSparkles,
};

export function CompletionStep({ step, onComplete, isLastPage }: CompletionStepProps) {
  const { content } = step;
  const [showConfetti, setShowConfetti] = useState(true);

  const BadgeIcon = iconMap[content.badge.icon] || IconTrophy;

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-8 relative overflow-hidden"
    >
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                x: "50%",
                y: "50%",
                scale: 0,
              }}
              animate={{
                opacity: [1, 1, 0],
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0.5],
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className={cn(
                "absolute w-3 h-3 rounded-full",
                i % 3 === 0 && "bg-orange-500",
                i % 3 === 1 && "bg-amber-500",
                i % 3 === 2 && "bg-yellow-500"
              )}
            />
          ))}
        </div>
      )}

      <div className="max-w-md w-full text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur-2xl opacity-30 scale-150" />

            {/* Badge circle */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <BadgeIcon className="w-16 h-16 text-white" />
            </div>

            {/* XP bubble */}
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg"
            >
              +{content.badge.xp} XP
            </motion.div>
          </div>
        </motion.div>

        {/* Badge name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-2">
            Badge Earned
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            {content.badge.name}
          </h2>
        </motion.div>

        {/* Custom message */}
        {content.message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-neutral-600 dark:text-neutral-400 mb-8"
          >
            {content.message}
          </motion.p>
        )}

        {/* Course complete celebration for last page */}
        {isLastPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
          >
            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
              <IconStar className="w-5 h-5" />
              <span className="font-bold">Course Complete!</span>
              <IconStar className="w-5 h-5" />
            </div>
            <p className="text-green-700 dark:text-green-300 text-sm">
              You&apos;ve completed all 6 lessons. You&apos;re now ready to be an AI champion.
            </p>
          </motion.div>
        )}

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={onComplete}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25 mx-auto"
          >
            {isLastPage ? "Back to Dashboard" : "Continue to Next Lesson"}
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
