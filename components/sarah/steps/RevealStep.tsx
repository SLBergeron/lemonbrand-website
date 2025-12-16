"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconEye, IconArrowRight, IconSparkles } from "@tabler/icons-react";
import type { RevealStep as RevealStepType } from "./types";

interface RevealStepProps {
  step: RevealStepType;
  onComplete: () => void;
}

export function RevealStep({ step, onComplete }: RevealStepProps) {
  const { content } = step;
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-8"
    >
      <div className="max-w-xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center"
        >
          {content.prompt}
        </motion.h2>

        {/* Hidden/Reveal area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <motion.button
                  onClick={handleReveal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full min-h-[200px] rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-2 border-dashed border-orange-300 dark:border-orange-700 flex flex-col items-center justify-center gap-4 transition-all hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:bg-orange-200 dark:group-hover:bg-orange-800/30 transition-colors">
                    <IconEye className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {content.buttonLabel || "Tap to reveal"}
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {content.revealType === 'text' && (
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-4">
                      <IconSparkles className="w-4 h-4" />
                      Revealed
                    </div>
                    <p className="text-white text-xl leading-relaxed">
                      {Array.isArray(content.hiddenContent)
                        ? content.hiddenContent[0]
                        : content.hiddenContent}
                    </p>
                  </div>
                )}

                {content.revealType === 'stat' && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-5xl md:text-6xl font-bold text-green-600 dark:text-green-400 mb-3"
                    >
                      {Array.isArray(content.hiddenContent)
                        ? content.hiddenContent[0]
                        : content.hiddenContent}
                    </motion.div>
                    {content.caption && (
                      <p className="text-green-700 dark:text-green-300 font-medium">
                        {content.caption}
                      </p>
                    )}
                  </div>
                )}

                {content.revealType === 'gallery' && Array.isArray(content.hiddenContent) && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.hiddenContent.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white dark:bg-neutral-800 rounded-xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm"
                        >
                          <p className="text-neutral-700 dark:text-neutral-300">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    {content.caption && (
                      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4">
                        {content.caption}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue button */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
