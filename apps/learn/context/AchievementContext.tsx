"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { useAchievements } from "@/hooks/useAchievements";
import { AchievementToast } from "@/components/achievements";
import { AchievementId, AchievementCheckContext, AchievementProgress } from "@/lib/achievements";

interface AchievementContextValue {
  unlocked: AchievementId[];
  isUnlocked: (id: AchievementId) => boolean;
  unlock: (id: AchievementId) => void;
  recordDayStart: (day: number) => void;
  recordDayAccess: (day: number) => void;
  recordDay7Complete: () => void;
  recordWordCount: (fieldId: string, count: number) => void;
  recordScrollTime: (day: number, timeMs: number) => void;
  recordFormEdit: (fieldId: string) => void;
  checkAllConditions: (context: AchievementCheckContext) => AchievementId[];
  getUnlockedAt: (id: AchievementId) => number | undefined;
  progress: AchievementProgress;
  isLoaded: boolean;
}

const AchievementContext = createContext<AchievementContextValue | null>(null);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const {
    progress,
    unlocked,
    isUnlocked,
    unlock,
    recordDayStart,
    recordDayAccess,
    recordDay7Complete,
    recordWordCount,
    recordScrollTime,
    recordFormEdit,
    checkAllConditions,
    getUnlockedAt,
    nextToast,
    dismissToast,
    isLoaded,
  } = useAchievements();

  const value = useMemo(
    () => ({
      progress,
      unlocked,
      isUnlocked,
      unlock,
      recordDayStart,
      recordDayAccess,
      recordDay7Complete,
      recordWordCount,
      recordScrollTime,
      recordFormEdit,
      checkAllConditions,
      getUnlockedAt,
      isLoaded,
    }),
    [
      progress,
      unlocked,
      isUnlocked,
      unlock,
      recordDayStart,
      recordDayAccess,
      recordDay7Complete,
      recordWordCount,
      recordScrollTime,
      recordFormEdit,
      checkAllConditions,
      getUnlockedAt,
      isLoaded,
    ]
  );

  const handleDismissToast = useCallback(() => {
    if (nextToast) {
      dismissToast(nextToast);
    }
  }, [nextToast, dismissToast]);

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AchievementToast achievementId={nextToast} onDismiss={handleDismissToast} />
    </AchievementContext.Provider>
  );
}

export function useAchievementContext() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error(
      "useAchievementContext must be used within an AchievementProvider"
    );
  }
  return context;
}
