"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "../providers/auth-provider";
import { IconArrowRight, IconPlayerPlay, IconCheck, IconBolt, IconTrophy } from "@tabler/icons-react";

export function CurrentModule() {
  const { user } = useAuth();
  const currentModule = useQuery(
    api.progress.getCurrentModule,
    user?._id ? { userId: user._id } : "skip"
  );

  if (!currentModule) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-neutral-900 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
      >
        <div className="animate-pulse space-y-4">
           <div className="h-4 w-32 bg-neutral-100 dark:bg-neutral-800 rounded" />
           <div className="h-8 w-64 bg-neutral-100 dark:bg-neutral-800 rounded" />
           <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full" />
        </div>
      </motion.div>
    );
  }

  const { module, progress } = currentModule;

  if (!module) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 border border-emerald-100 dark:border-emerald-800/50"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
             <IconCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">All Modules Complete</h3>
            <p className="text-emerald-700 dark:text-emerald-300 opacity-90">
              You&apos;ve mastered the curriculum! Check back later for new content.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const percentComplete = progress?.percentComplete ?? 0;
  const isStarted = progress?.status === "in_progress";
  const readyForQuiz = percentComplete === 100 && isStarted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 relative group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
                 <IconBolt className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                {readyForQuiz ? "Ready for Quiz" : isStarted ? "In Progress" : "Recommended Next"}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              {module.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl">
              {module.subtitle}
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-neutral-50 dark:bg-neutral-800/50 px-4 py-3 rounded-xl border border-neutral-100 dark:border-neutral-800">
             <div className="text-right">
                <div className="text-2xl font-bold text-neutral-900 dark:text-white leading-none">
                  {percentComplete}%
                </div>
                <div className="text-xs text-neutral-500 font-medium mt-1">COMPLETED</div>
             </div>
             <div className="w-12 h-12 rounded-full border-4 border-neutral-200 dark:border-neutral-700 relative flex items-center justify-center">
                 <IconPlayerPlay className="w-5 h-5 text-neutral-400 ml-0.5" />
                 <svg className="absolute inset-0 -rotate-90 transform" viewBox="0 0 36 36">
                    <motion.path
                      className="text-orange-500"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: percentComplete / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                 </svg>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 w-full sm:w-auto">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                {module.estimatedMinutes} mins
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                Module 0{module.order}
             </div>
          </div>
          
          <Link
            href={
              readyForQuiz
                ? `/sarah/dashboard/modules/${module.slug}/quiz`
                : isStarted
                ? `/sarah/dashboard/modules/${module.slug}/learn`
                : `/sarah/dashboard/modules/${module.slug}`
            }
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold px-6 py-3 rounded-lg transition-all shadow-lg shadow-neutral-500/10 active:scale-95"
          >
            {readyForQuiz ? (
              <>
                Take Quiz
                <IconTrophy className="w-4 h-4" />
              </>
            ) : isStarted ? (
              <>
                Continue Learning
                <IconArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Start Learning
                <IconPlayerPlay className="w-4 h-4" />
              </>
            )}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
