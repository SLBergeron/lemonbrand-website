"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconPlayerPlay,
  IconLock,
  IconCheck,
  IconClock,
  IconBook,
  IconQuestionMark,
  IconTrophy,
  IconChevronRight,
} from "@tabler/icons-react";

type Lesson = {
  _id: string;
  number: string;
  title: string;
  estimatedMinutes: number;
};

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { user } = useAuth();

  const moduleData = useQuery(
    api.modules.getBySlug,
    user?._id ? { slug, userId: user._id } : { slug }
  );

  const startModuleMutation = useMutation(api.progress.startModule);

  const handleStartModule = async () => {
    if (!user?._id || !moduleData?._id) return;

    try {
      await startModuleMutation({
        userId: user._id,
        moduleId: moduleData._id,
      });
      toast.success("Module started! Let&apos;s learn.");
      // Navigate to first lesson (placeholder for now)
      router.push(`/sarah/dashboard/modules/${slug}/learn`);
    } catch (error) {
      toast.error("Failed to start module");
    }
  };

  if (!moduleData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
          <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const isLocked = !moduleData.isUnlocked;
  const progress = moduleData.progress;
  const percentComplete = progress?.percentComplete ?? 0;
  const isCompleted = progress?.status === "completed";
  const isInProgress = progress?.status === "in_progress";

  // Check if all lessons are complete but quiz not passed
  const allLessonsComplete =
    moduleData.lessons &&
    progress?.completedLessonIds?.length === moduleData.lessons.length;
  const readyForQuiz = allLessonsComplete && !isCompleted;
  const hasQuiz = (moduleData.quizQuestions?.length ?? 0) > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link
          href="/sarah/dashboard/modules"
          className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-orange-500 transition-colors"
        >
          <IconArrowLeft className="w-4 h-4" />
          Back to Modules
        </Link>
      </motion.div>

      {/* Module header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl p-8 text-white relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              Module {moduleData.order}
            </span>
            {isCompleted && (
              <span className="px-3 py-1 bg-green-500 rounded-full text-sm font-medium flex items-center gap-1">
                <IconCheck className="w-4 h-4" />
                Completed
              </span>
            )}
            {isLocked && (
              <span className="px-3 py-1 bg-neutral-500 rounded-full text-sm font-medium flex items-center gap-1">
                <IconLock className="w-4 h-4" />
                Locked
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">{moduleData.title}</h1>
          <p className="text-xl opacity-90 mb-4">{moduleData.subtitle}</p>
          <p className="opacity-80 max-w-2xl">{moduleData.description}</p>

          <div className="flex flex-wrap items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <IconClock className="w-5 h-5 opacity-80" />
              <span>{moduleData.estimatedMinutes} min</span>
            </div>
            <div className="flex items-center gap-2">
              <IconBook className="w-5 h-5 opacity-80" />
              <span>{moduleData.lessons?.length ?? 0} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <IconQuestionMark className="w-5 h-5 opacity-80" />
              <span>{moduleData.quizQuestions?.length ?? 0} quiz questions</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress section (if started) */}
      {(isInProgress || isCompleted) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
              Your Progress
            </h2>
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              {percentComplete}%
            </span>
          </div>
          <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentComplete}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Lessons list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800"
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Lessons
        </h2>

        {moduleData.lessons && moduleData.lessons.length > 0 ? (
          <ul className="space-y-3">
            {moduleData.lessons.map((lesson: any, index: number) => {
              const isLessonCompleted = progress?.completedLessonIds?.includes(lesson._id as any);
              const canAccess = !isLocked && (isInProgress || !moduleData.isLocked);

              return (
                <li key={lesson._id}>
                  {canAccess ? (
                    <Link
                      href={`/sarah/dashboard/modules/${slug}/learn?lesson=${lesson.slug}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          isLessonCompleted
                            ? "bg-green-500 text-white"
                            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 group-hover:bg-orange-500 group-hover:text-white"
                        }`}
                      >
                        {isLessonCompleted ? (
                          <IconCheck className="w-4 h-4" />
                        ) : (
                          lesson.number
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {lesson.estimatedMinutes} min
                        </p>
                      </div>
                      <IconChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-orange-500 transition-colors" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 opacity-50">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-500">
                        <IconLock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {lesson.estimatedMinutes} min
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400">
            Lesson content coming soon...
          </p>
        )}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        {isLocked ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <IconLock className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Complete the previous module to unlock this one
            </p>
          </div>
        ) : isCompleted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <Link
                href={`/sarah/dashboard/modules/${slug}/learn`}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                <IconCheck className="w-5 h-5" />
                Review Module
              </Link>
              {hasQuiz && (
                <Link
                  href={`/sarah/dashboard/modules/${slug}/quiz`}
                  className="inline-flex items-center gap-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold px-6 py-4 rounded-xl transition-all"
                >
                  <IconTrophy className="w-5 h-5" />
                  Retake Quiz
                </Link>
              )}
            </div>
            <p className="text-sm text-green-600 dark:text-green-400">
              Module completed! You can review lessons or retake the quiz anytime.
            </p>
          </div>
        ) : readyForQuiz && hasQuiz ? (
          <>
            <Link
              href={`/sarah/dashboard/modules/${slug}/quiz`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
            >
              <IconTrophy className="w-5 h-5" />
              Take the Quiz
            </Link>
            <p className="text-sm text-neutral-500">
              All lessons complete! Pass the quiz to complete this module.
            </p>
          </>
        ) : (
          <button
            onClick={handleStartModule}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
          >
            <IconPlayerPlay className="w-5 h-5" />
            {isInProgress ? "Continue Learning" : "Start Module"}
          </button>
        )}
      </motion.div>
    </div>
  );
}
