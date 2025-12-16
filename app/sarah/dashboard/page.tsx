"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { pages } from "@/content/sarah-pages";
import {
  IconSparkles,
  IconCheck,
  IconPlayerPlay,
  IconTrophy,
  IconFlame,
  IconClock,
  IconShield,
  IconUsers,
  IconTarget,
  IconRocket,
  IconBrain,
} from "@tabler/icons-react";

// Map badge icons to components
const badgeIcons: Record<string, any> = {
  shield: IconShield,
  users: IconUsers,
  target: IconTarget,
  rocket: IconRocket,
  brain: IconBrain,
  trophy: IconTrophy,
};

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = useQuery(
    api.pageProgress.getPageDashboardStats,
    user?._id ? { userId: user._id } : "skip"
  );

  const completedPageIds = stats?.completedPageIds || [];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25 mb-4">
          <IconSparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
          Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {completedPageIds.length === 0
            ? "Ready to get clear on AI?"
            : completedPageIds.length === 6
            ? "You've completed all lessons!"
            : `${completedPageIds.length} of 6 lessons complete`}
        </p>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
            <IconCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            {stats?.pagesCompleted || 0}/6
          </p>
          <p className="text-xs text-neutral-500">Lessons</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
            <IconTrophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            {stats?.user?.totalXP || 0}
          </p>
          <p className="text-xs text-neutral-500">XP Earned</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-2">
            <IconFlame className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 dark:text-white">
            {stats?.currentStreak || 0}
          </p>
          <p className="text-xs text-neutral-500">Day Streak</p>
        </div>
      </motion.div>

      {/* Lessons grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Your Lessons
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {pages.map((page, index) => {
            const isCompleted = completedPageIds.includes(page.id);
            const BadgeIcon = badgeIcons[page.badge.icon] || IconTrophy;

            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link href={`/sarah/dashboard/learn/${page.id}`}>
                  <div
                    className={cn(
                      "group relative bg-white dark:bg-neutral-900 rounded-2xl p-5 border transition-all cursor-pointer overflow-hidden",
                      isCompleted
                        ? "border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg hover:shadow-orange-500/10"
                    )}
                  >
                    {/* Completion indicator */}
                    {isCompleted && (
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <IconCheck className="w-5 h-5 text-white" />
                      </div>
                    )}

                    {/* Page number */}
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                          isCompleted
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30"
                        )}
                      >
                        <BadgeIcon
                          className={cn(
                            "w-6 h-6 transition-colors",
                            isCompleted
                              ? "text-green-600 dark:text-green-400"
                              : "text-neutral-500 group-hover:text-orange-600 dark:group-hover:text-orange-400"
                          )}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                            Lesson {index + 1}
                          </span>
                          {isCompleted && (
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                              +{page.badge.xp} XP
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                          {page.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-1 text-xs text-neutral-400">
                        <IconClock className="w-3.5 h-3.5" />
                        <span>{page.estimatedMinutes} min</span>
                      </div>

                      <div
                        className={cn(
                          "flex items-center gap-1 text-sm font-medium transition-colors",
                          isCompleted
                            ? "text-green-600 dark:text-green-400"
                            : "text-neutral-500 group-hover:text-orange-600 dark:group-hover:text-orange-400"
                        )}
                      >
                        {isCompleted ? (
                          <>
                            <span>Review</span>
                          </>
                        ) : (
                          <>
                            <span>Start</span>
                            <IconPlayerPlay className="w-4 h-4" />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Hover accent */}
                    <div
                      className={cn(
                        "absolute left-0 top-4 bottom-4 w-1 rounded-r-full transition-opacity opacity-0 group-hover:opacity-100",
                        isCompleted ? "bg-green-500" : "bg-orange-500"
                      )}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Course complete message */}
      {completedPageIds.length === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-800"
        >
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
              <IconTrophy className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-4 text-center">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Hey, you did it!
              </h3>

              <p className="text-neutral-700 dark:text-neutral-300">
                I knew you would. Seriously—you&apos;re going to be great at this.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                This isn&apos;t the end of anything. It&apos;s the start. You&apos;ve got a new chapter ahead, and now you&apos;ve got a new way of thinking to bring to it.
              </p>

              <p className="text-neutral-600 dark:text-neutral-400">
                Go try Claude. Play around. Break things. Figure out what works for you.
              </p>

              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold px-6 py-3 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors mt-2"
              >
                Open Claude
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <p className="text-neutral-600 dark:text-neutral-400 pt-2">
                And if you ever want to talk through something you&apos;re working on—just text me. I&apos;m always down to help figure it out together.
              </p>

              <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                Let&apos;s go build our nest eggs.
              </p>

              <p className="text-neutral-500 dark:text-neutral-400 italic pt-2">
                — Simon
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
