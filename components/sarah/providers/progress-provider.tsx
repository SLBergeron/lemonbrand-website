"use client";

import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "./auth-provider";
import { Id } from "@/convex/_generated/dataModel";

interface ModuleProgress {
  moduleId: Id<"modules">;
  status: "not_started" | "in_progress" | "completed";
  percentComplete: number;
  completedLessonIds: Id<"lessons">[];
}

interface ProgressContextValue {
  // Dashboard stats
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  modulesCompleted: number;
  lessonsCompleted: number;
  totalLessons: number;
  overallProgress: number;
  badgesEarned: number;
  totalTimeMinutes: number;

  // Loading state
  isLoading: boolean;
}

const defaultProgress: ProgressContextValue = {
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  modulesCompleted: 0,
  lessonsCompleted: 0,
  totalLessons: 0,
  overallProgress: 0,
  badgesEarned: 0,
  totalTimeMinutes: 0,
  isLoading: true,
};

const ProgressContext = createContext<ProgressContextValue>(defaultProgress);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const stats = useQuery(
    api.users.getDashboardStats,
    user?._id ? { userId: user._id } : "skip"
  );

  const value: ProgressContextValue = stats
    ? {
        totalXP: stats.totalXP,
        currentStreak: stats.currentStreak,
        longestStreak: stats.longestStreak,
        modulesCompleted: stats.modulesCompleted,
        lessonsCompleted: stats.lessonsCompleted,
        totalLessons: stats.totalLessons,
        overallProgress: stats.overallProgress,
        badgesEarned: stats.badgesEarned,
        totalTimeMinutes: stats.totalTimeMinutes,
        isLoading: false,
      }
    : { ...defaultProgress, isLoading: !user };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
}
