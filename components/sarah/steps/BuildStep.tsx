"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import type { BuildStep as BuildStepType } from "./types";

interface BuildStepProps {
  step: BuildStepType;
  onComplete: (answers: Record<string, string | string[]>) => void;
}

export function BuildStep({ step, onComplete }: BuildStepProps) {
  const { content } = step;
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);

  // Check if all required fields are filled
  const isComplete = useMemo(() => {
    return content.fields.every(field => {
      const answer = answers[field.id];
      if (field.type === 'checkbox') {
        return Array.isArray(answer) && answer.length > 0;
      }
      return answer && String(answer).trim().length > 0;
    });
  }, [answers, content.fields]);

  const handleChange = (fieldId: string, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckboxToggle = (fieldId: string, option: string) => {
    setAnswers(prev => {
      const current = (prev[fieldId] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter(v => v !== option)
        : [...current, option];
      return { ...prev, [fieldId]: updated };
    });
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleContinue = () => {
    onComplete(answers);
  };

  // Build the result string from template
  const buildResult = () => {
    if (!content.template) return null;

    let result = content.template;
    Object.entries(answers).forEach(([key, value]) => {
      const displayValue = Array.isArray(value) ? value.join(', ') : value;
      result = result.replace(`{${key}}`, displayValue || '___');
    });
    return result;
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
          className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-2 text-center"
        >
          {content.title}
        </motion.h2>

        {content.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 text-center mb-8"
          >
            {content.description}
          </motion.p>
        )}

        {/* Form fields */}
        <div className="space-y-6">
          {content.fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                {field.label}
              </label>

              {field.type === 'dropdown' && field.options && (
                <div className="flex flex-wrap gap-2">
                  {field.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleChange(field.id, option)}
                      className={cn(
                        "px-4 py-2.5 rounded-xl font-medium transition-all",
                        answers[field.id] === option
                          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {field.type === 'text' && (
                <input
                  type="text"
                  placeholder={field.placeholder || 'Type here...'}
                  value={(answers[field.id] as string) || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-orange-500 transition-colors"
                />
              )}

              {field.type === 'checkbox' && field.options && (
                <div className="space-y-2">
                  {field.options.map(option => {
                    const isChecked = ((answers[field.id] as string[]) || []).includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => handleCheckboxToggle(field.id, option)}
                        className={cn(
                          "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                          isChecked
                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                            : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-orange-500 border-orange-500"
                            : "border-neutral-300 dark:border-neutral-600"
                        )}>
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={cn(
                          "font-medium",
                          isChecked ? "text-orange-700 dark:text-orange-300" : "text-neutral-700 dark:text-neutral-300"
                        )}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Show Result Button */}
        {isComplete && !showResult && content.showResult !== false && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={handleShowResult}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
            >
              <IconSparkles className="w-5 h-5" />
              See your result
            </button>
          </motion.div>
        )}

        {/* Result preview */}
        <AnimatePresence>
          {showResult && content.template && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="mt-8"
            >
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold mb-3">
                  <IconSparkles className="w-4 h-4" />
                  Your assembled prompt
                </div>
                <p className="text-white leading-relaxed font-mono text-sm">
                  {buildResult()}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button - show when:
            1. Result has been shown (after clicking "See your result"), OR
            2. No result to show (showResult === false) and form is complete
        */}
        {isComplete && (showResult || content.showResult === false) && (
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
      </div>
    </motion.div>
  );
}
