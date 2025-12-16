"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { ProgressDots } from "./ProgressDots";
import {
  TextStep,
  MultipleChoiceStep,
  DragDropStep,
  BuildStep,
  CompareStep,
  RevealStep,
  CompletionStep,
} from "./steps";
import type { Page, Step, StepProgress } from "./steps/types";

interface PagePlayerProps {
  page: Page;
  onPageComplete: (pageId: string, stepAnswers: StepProgress[]) => void;
  isLastPage?: boolean;
}

export function PagePlayer({ page, onPageComplete, isLastPage }: PagePlayerProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState<StepProgress[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const currentStep = page.steps[currentStepIndex];
  const totalSteps = page.steps.length;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Handle step completion
  const handleStepComplete = useCallback((answer?: any) => {
    // Record progress
    const progress: StepProgress = {
      stepId: currentStep.id,
      completed: true,
      answer,
    };

    setStepProgress(prev => [...prev.filter(p => p.stepId !== currentStep.id), progress]);
    setCompletedSteps(prev => [...new Set([...prev, currentStepIndex])]);

    // Move to next step or complete page
    if (isLastStep) {
      // Page complete - call callback
      onPageComplete(page.id, [...stepProgress, progress]);
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStep, currentStepIndex, isLastStep, onPageComplete, page.id, stepProgress]);

  // Handle going back (for text steps mainly)
  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  // Render the current step based on its type
  const renderStep = () => {
    switch (currentStep.type) {
      case 'text':
        return (
          <TextStep
            step={currentStep}
            onComplete={() => handleStepComplete()}
          />
        );

      case 'multiple-choice':
        return (
          <MultipleChoiceStep
            step={currentStep}
            onComplete={(answer) => handleStepComplete(answer)}
          />
        );

      case 'drag-drop':
        return (
          <DragDropStep
            step={currentStep}
            onComplete={(answer) => handleStepComplete(answer)}
          />
        );

      case 'build':
        return (
          <BuildStep
            step={currentStep}
            onComplete={(answer) => handleStepComplete(answer)}
          />
        );

      case 'compare':
        return (
          <CompareStep
            step={currentStep}
            onComplete={() => handleStepComplete()}
          />
        );

      case 'reveal':
        return (
          <RevealStep
            step={currentStep}
            onComplete={() => handleStepComplete()}
          />
        );

      case 'completion':
        return (
          <CompletionStep
            step={currentStep}
            onComplete={() => handleStepComplete()}
            isLastPage={isLastPage}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      {/* Top navigation bar */}
      <header className="h-16 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/sarah/dashboard"
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-neutral-600 dark:text-neutral-400"
          >
            <IconX className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
          <span className="font-semibold text-neutral-900 dark:text-white">
            {page.title}
          </span>
        </div>

        {/* Progress dots in header */}
        <ProgressDots
          total={totalSteps}
          current={currentStepIndex}
          completed={completedSteps}
        />

        {/* Step counter */}
        <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium min-w-[60px] text-right">
          {currentStepIndex + 1} / {totalSteps}
        </span>
      </header>

      {/* Main content area */}
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Back button (only show on non-first steps and non-completion steps) */}
      {currentStepIndex > 0 && currentStep.type !== 'completion' && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="fixed bottom-8 left-8 flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <IconArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </motion.button>
      )}
    </div>
  );
}
