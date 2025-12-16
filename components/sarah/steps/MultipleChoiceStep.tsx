"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconCheck, IconX, IconArrowRight } from "@tabler/icons-react";
import type { MultipleChoiceStep as MultipleChoiceStepType } from "./types";

interface MultipleChoiceStepProps {
  step: MultipleChoiceStepType;
  onComplete: (answer: string | string[]) => void;
}

export function MultipleChoiceStep({ step, onComplete }: MultipleChoiceStepProps) {
  const { content } = step;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  // Check if this step has correct/incorrect answers
  const hasCorrectAnswers = content.options.some(opt => opt.isCorrect !== undefined);

  const handleSelect = (optionId: string) => {
    if (showFeedback) return;

    if (content.allowMultiple) {
      setSelectedIds(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedIds([optionId]);
      // For single-select, show feedback immediately
      setShowFeedback(true);
    }
  };

  const handleContinue = () => {
    const answer = content.allowMultiple ? selectedIds : selectedIds[0];
    onComplete(answer);
  };

  const getOptionState = (option: { id: string; isCorrect?: boolean }) => {
    if (!showFeedback) return 'default';
    if (!hasCorrectAnswers) return selectedIds.includes(option.id) ? 'selected' : 'default';
    if (option.isCorrect) return 'correct';
    if (selectedIds.includes(option.id) && !option.isCorrect) return 'incorrect';
    return 'default';
  };

  const isCorrectAnswer = hasCorrectAnswers
    ? content.options.find(o => selectedIds.includes(o.id))?.isCorrect
    : true;

  const feedbackMessage = hasCorrectAnswers
    ? (isCorrectAnswer ? content.feedback?.correct : content.feedback?.incorrect)
    : content.feedback?.neutral;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
    >
      <div className="max-w-xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center"
        >
          {content.question}
        </motion.h2>

        <div className="space-y-3">
          {content.options.map((option, index) => {
            const state = getOptionState(option);
            const isSelected = selectedIds.includes(option.id);

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(option.id)}
                disabled={showFeedback}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-left transition-all relative overflow-hidden group",
                  state === 'default' && !isSelected && "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 bg-white dark:bg-neutral-900",
                  state === 'default' && isSelected && "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
                  state === 'selected' && "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
                  state === 'correct' && "border-green-500 bg-green-50 dark:bg-green-900/20",
                  state === 'incorrect' && "border-red-500 bg-red-50 dark:bg-red-900/20",
                  showFeedback && "cursor-default"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors",
                    state === 'default' && !isSelected && "bg-neutral-100 dark:bg-neutral-800 text-neutral-500",
                    state === 'default' && isSelected && "bg-orange-500 text-white",
                    state === 'selected' && "bg-orange-500 text-white",
                    state === 'correct' && "bg-green-500 text-white",
                    state === 'incorrect' && "bg-red-500 text-white"
                  )}>
                    {state === 'correct' ? (
                      <IconCheck className="w-5 h-5" />
                    ) : state === 'incorrect' ? (
                      <IconX className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={cn(
                      "font-semibold transition-colors",
                      state === 'correct' && "text-green-700 dark:text-green-300",
                      state === 'incorrect' && "text-red-700 dark:text-red-300",
                      state !== 'correct' && state !== 'incorrect' && "text-neutral-900 dark:text-white"
                    )}>
                      {option.label}
                    </p>
                    {option.description && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className={cn(
                "mt-6 p-4 rounded-xl",
                isCorrectAnswer || !hasCorrectAnswers
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
              )}
            >
              <p className={cn(
                "text-sm",
                isCorrectAnswer || !hasCorrectAnswers
                  ? "text-green-700 dark:text-green-300"
                  : "text-amber-700 dark:text-amber-300"
              )}>
                {feedbackMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={handleContinue}
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
