"use client";

import { useProgress } from "../providers/progress-provider";
import { IconSparkles, IconFlame } from "@tabler/icons-react";

export function TopBar() {
  const { totalXP, currentStreak, overallProgress } = useProgress();

  return (
    <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Progress bar - desktop */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md">
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Overall Progress
          </span>
          <div className="flex-1 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-neutral-900 dark:text-white">
            {overallProgress}%
          </span>
        </div>

        {/* Mobile stats */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-2">
            <IconSparkles className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-neutral-900 dark:text-white">
              {totalXP}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconFlame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-neutral-900 dark:text-white">
              {currentStreak}
            </span>
          </div>
        </div>

        {/* Right side - placeholder for future features */}
        <div className="flex items-center gap-2">
          {/* Notifications, etc. could go here */}
        </div>
      </div>
    </header>
  );
}
