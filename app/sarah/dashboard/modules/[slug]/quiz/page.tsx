"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconCheck,
  IconX,
  IconChevronRight,
  IconTrophy,
  IconRefresh,
  IconArrowRight,
} from "@tabler/icons-react";

type QuizQuestion = {
  _id: string;
  questionNumber: number;
  type: "scenario" | "true_false" | "multiple_choice";
  question: string;
  options?: { id: string; text: string }[];
  points: number;
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user } = useAuth();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizStartedAt] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    explanation?: string;
    correctId?: string | null;
  } | null>(null);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [feedbackByQuestion, setFeedbackByQuestion] = useState<Record<string, {
    isCorrect: boolean;
    explanation?: string;
    correctId?: string | null;
  }>>({});
  
  const [results, setResults] = useState<{
    score: number;
    passed: boolean;
    correctCount: number;
    totalQuestions: number;
    answers: { questionId: string; isCorrect: boolean }[];
    isRetake?: boolean;
  } | null>(null);

  const moduleData = useQuery(
    api.modules.getBySlug,
    user?._id ? { slug, userId: user._id } : { slug }
  );

  const questions = useQuery(
    api.quizzes.getQuestions,
    moduleData?._id ? { moduleId: moduleData._id } : "skip"
  ) as QuizQuestion[] | undefined;

  const submitAttemptMutation = useMutation(api.quizzes.submitAttempt);
  const checkAnswerMutation = useMutation(api.quizzes.checkAnswer);

  // Check if all lessons are completed or module is already done (for retakes)
  const allLessonsComplete =
    moduleData?.lessons &&
    moduleData.progress?.completedLessonIds?.length === moduleData.lessons.length;
  const isModuleCompleted = moduleData?.progress?.status === "completed";
  const canTakeQuiz = allLessonsComplete || isModuleCompleted;

  const currentQuestion = questions?.[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion._id] : null;

  // Restore or clear feedback when navigating between questions
  useEffect(() => {
    if (currentQuestion) {
      const storedFeedback = feedbackByQuestion[currentQuestion._id];
      setFeedback(storedFeedback || null);
    }
  }, [currentQuestionIndex, currentQuestion?._id]);

  const handleSelectAnswer = (answerId: string) => {
    if (!currentQuestion || results || feedback) return; // Disable changing if checking
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: answerId,
    }));
  };

  const handleCheckAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    try {
        const result = await checkAnswerMutation({
            questionId: currentQuestion._id as any,
            selectedAnswer: selectedAnswer
        });

        if (result) {
            const feedbackData = {
                isCorrect: result.isCorrect,
                explanation: result.explanation,
                correctId: result.correctId
            };

            setFeedback(feedbackData);

            // Store feedback for this question so we can show it when navigating back
            setFeedbackByQuestion(prev => ({
                ...prev,
                [currentQuestion._id]: feedbackData
            }));

            // Track which answers have been checked and if they were correct
            setCheckedAnswers(prev => ({
                ...prev,
                [currentQuestion._id]: result.isCorrect
            }));

            if (result.isCorrect) {
                toast.success("Correct!", { position: "bottom-center" });
            } else {
                toast.error("Incorrect", { position: "bottom-center" });
            }
        }
    } catch (e) {
        toast.error("Failed to check answer");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user?._id || !moduleData?._id || !questions) return;

    // Check all questions answered
    const unanswered = questions.filter((q) => !answers[q._id]);
    if (unanswered.length > 0) {
      toast.error(`Please answer all questions (${unanswered.length} remaining)`);
      // Go to first unanswered
      const firstUnansweredIndex = questions.findIndex((q) => !answers[q._id]);
      setCurrentQuestionIndex(firstUnansweredIndex);
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id as any,
        selectedAnswer: answers[q._id],
        timeSpentSeconds: 30, // Estimate
      }));

      const result = await submitAttemptMutation({
        userId: user._id,
        moduleId: moduleData._id,
        answers: formattedAnswers,
        startedAt: quizStartedAt,
      });

      setResults(result);

      if (result.passed) {
        toast.success(`Congratulations! You passed with ${result.score}%!`);
      } else {
        toast.error(`Score: ${result.score}%. You need 70% to pass.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setFeedback(null);
    setCheckedAnswers({});
    setFeedbackByQuestion({});
    setCurrentQuestionIndex(0);
    setResults(null);
  };

  // Loading state
  if (!moduleData || !questions) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded" />
        </div>
      </div>
    );
  }

  // No quiz questions
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          No Quiz Available
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          This module doesn&apos;t have a quiz yet. Module completion will be automatic.
        </p>
        <Link
          href={`/sarah/dashboard/modules/${slug}`}
          className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-semibold"
        >
          <IconArrowLeft className="w-5 h-5" />
          Back to Module
        </Link>
      </div>
    );
  }

  // Lessons not complete and module not already done
  if (!canTakeQuiz) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Complete All Lessons First
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          You need to complete all lessons before taking the quiz.
        </p>
        <Link
          href={`/sarah/dashboard/modules/${slug}/learn`}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Continue Learning
          <IconArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  // Results view
  if (results) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "rounded-3xl p-8 text-center",
            results.passed
              ? "bg-gradient-to-br from-green-500 to-emerald-600"
              : "bg-gradient-to-br from-orange-500 to-red-500"
          )}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
            {results.passed ? (
              <IconTrophy className="w-10 h-10 text-white" />
            ) : (
              <IconX className="w-10 h-10 text-white" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {results.passed
              ? results.isRetake
                ? "Great Practice!"
                : "Congratulations!"
              : "Not Quite There"}
          </h1>

          <p className="text-white/90 text-lg mb-6">
            {results.passed
              ? results.isRetake
                ? "Nice work on the retake! Your mastery is solid."
                : "You've passed the quiz and completed this module!"
              : "You need 70% to pass. Review the lessons and try again."}
          </p>

          {results.isRetake && results.passed && (
            <p className="text-white/60 text-sm mb-4">
              (This was a practice retake - no additional XP awarded)
            </p>
          )}

          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white">{results.score}%</div>
              <div className="text-white/70 text-sm mt-1">Score</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white">
                {results.correctCount}/{results.totalQuestions}
              </div>
              <div className="text-white/70 text-sm mt-1">Correct</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {results.passed ? (
              <Link
                href="/sarah/dashboard/modules"
                className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
              >
                Continue to Next Module
                <IconArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center justify-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors"
                >
                  <IconRefresh className="w-5 h-5" />
                  Try Again
                </button>
                <Link
                  href={`/sarah/dashboard/modules/${slug}/learn`}
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  Review Lessons
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Answer summary */}
        <div className="mt-8 bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
            Your Answers
          </h2>
          <div className="space-y-3">
            {questions.map((q, i) => {
              const answerResult = results.answers.find(
                (a) => a.questionId === q._id
              );
              return (
                <div
                  key={q._id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg",
                    answerResult?.isCorrect
                      ? "bg-green-50 dark:bg-green-900/20"
                      : "bg-red-50 dark:bg-red-900/20"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      answerResult?.isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    )}
                  >
                    {answerResult?.isCorrect ? (
                      <IconCheck className="w-4 h-4" />
                    ) : (
                      <IconX className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    Question {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/sarah/dashboard/modules/${slug}`}
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          Exit Quiz
        </Link>
        <div className="text-sm font-medium text-neutral-500">
          {moduleData.title} Quiz
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>
            {Object.keys(answers).length} answered
          </span>
        </div>
        <div className="h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      {currentQuestion && (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion._id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
        >
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full mb-4">
              {currentQuestion.type === "true_false"
                ? "True or False"
                : "Scenario"}
            </span>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.type === "true_false" ? (
              <>
                {["true", "false"].map((option) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = feedback?.correctId === option;
                  const isWrong = feedback && isSelected && !feedback.isCorrect;

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelectAnswer(option)}
                      disabled={!!feedback}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        feedback
                          ? isCorrect
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : isWrong
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : "border-neutral-200 dark:border-neutral-700 opacity-50"
                          : isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-neutral-900 dark:text-white capitalize">
                          {option}
                        </span>
                        {feedback && isCorrect && (
                          <IconCheck className="w-5 h-5 text-green-500" />
                        )}
                        {feedback && isWrong && (
                          <IconX className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </>
            ) : (
              currentQuestion.options?.map((option) => {
                const isSelected = selectedAnswer === option.id;
                const isCorrect = feedback?.correctId === option.id;
                const isWrong = feedback && isSelected && !feedback.isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={!!feedback}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      feedback
                        ? isCorrect
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : isWrong
                          ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                          : "border-neutral-200 dark:border-neutral-700 opacity-50"
                        : isSelected
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                          feedback
                            ? isCorrect
                              ? "bg-green-500 text-white"
                              : isWrong
                              ? "bg-red-500 text-white"
                              : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                            : isSelected
                            ? "bg-orange-500 text-white"
                            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500"
                        )}
                      >
                        {feedback && isCorrect ? (
                          <IconCheck className="w-4 h-4" />
                        ) : feedback && isWrong ? (
                          <IconX className="w-4 h-4" />
                        ) : (
                          option.id.toUpperCase()
                        )}
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-200">
                        {option.text}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Feedback panel */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "mt-6 p-4 rounded-xl border-2",
                  feedback.isCorrect
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      feedback.isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    )}
                  >
                    {feedback.isCorrect ? (
                      <IconCheck className="w-5 h-5" />
                    ) : (
                      <IconX className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4
                      className={cn(
                        "font-semibold mb-1",
                        feedback.isCorrect
                          ? "text-green-700 dark:text-green-300"
                          : "text-red-700 dark:text-red-300"
                      )}
                    >
                      {feedback.isCorrect ? "Correct!" : "Not quite right"}
                    </h4>
                    {feedback.explanation && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {feedback.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white disabled:opacity-30 transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex flex-col items-end gap-2">
          {/* Primary action button */}
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedAnswer}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
              <IconCheck className="w-5 h-5" />
            </button>
          ) : feedback ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Next Question
              <IconChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedAnswer}
              className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Check Answer
              <IconChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Skip link - only show when not checked yet */}
          {!feedback && currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="text-sm text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 disabled:opacity-30 transition-colors"
            >
              Skip without checking →
            </button>
          )}
        </div>
      </div>

      {/* Question dots */}
      <div className="flex justify-center gap-2 mt-8">
        {questions.map((q, i) => {
          const isChecked = q._id in checkedAnswers;
          const isCorrect = checkedAnswers[q._id];
          const hasAnswer = !!answers[q._id];
          const isCurrent = i === currentQuestionIndex;

          return (
            <button
              key={q._id}
              onClick={() => setCurrentQuestionIndex(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                isCurrent
                  ? "scale-125 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900"
                  : "",
                isCurrent
                  ? isChecked
                    ? isCorrect
                      ? "bg-green-500 ring-green-500"
                      : "bg-red-500 ring-red-500"
                    : "bg-orange-500 ring-orange-500"
                  : isChecked
                  ? isCorrect
                    ? "bg-green-500"
                    : "bg-red-500"
                  : hasAnswer
                  ? "bg-orange-400"
                  : "bg-neutral-300 dark:bg-neutral-600"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}