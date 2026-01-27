"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  AchievementId,
  AchievementProgress,
  AchievementCheckContext,
} from "@/lib/achievements";
import { checkAchievementConditions } from "@/lib/achievements";

const STORAGE_KEY = "sprint-achievements";

function getInitialProgress(): AchievementProgress {
  if (typeof window === "undefined") {
    return {
      unlocked: {} as Record<AchievementId, number>,
      timestamps: {},
      metrics: {
        wordCounts: {},
        scrollTimes: {},
        formEdits: {},
      },
    };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure all required fields exist
      return {
        unlocked: parsed.unlocked || {},
        timestamps: parsed.timestamps || {},
        metrics: {
          wordCounts: parsed.metrics?.wordCounts || {},
          scrollTimes: parsed.metrics?.scrollTimes || {},
          formEdits: parsed.metrics?.formEdits || {},
        },
      };
    }
  } catch {
    // Ignore parse errors
  }

  return {
    unlocked: {} as Record<AchievementId, number>,
    timestamps: {},
    metrics: {
      wordCounts: {},
      scrollTimes: {},
      formEdits: {},
    },
  };
}

export function useAchievements() {
  const [progress, setProgress] = useState<AchievementProgress>(getInitialProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pendingToasts, setPendingToasts] = useState<AchievementId[]>([]);

  // Load on mount (client-side)
  useEffect(() => {
    setProgress(getInitialProgress());
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  const saveProgress = useCallback((newProgress: AchievementProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Get list of unlocked achievement IDs
  const unlocked = useMemo(() => {
    return Object.keys(progress.unlocked) as AchievementId[];
  }, [progress.unlocked]);

  // Check if a specific achievement is unlocked
  const isUnlocked = useCallback(
    (id: AchievementId): boolean => {
      return !!progress.unlocked[id];
    },
    [progress.unlocked]
  );

  // Get timestamp when achievement was unlocked
  const getUnlockedAt = useCallback(
    (id: AchievementId): number | undefined => {
      return progress.unlocked[id];
    },
    [progress.unlocked]
  );

  // Manually unlock an achievement
  const unlock = useCallback(
    (id: AchievementId) => {
      if (progress.unlocked[id]) return; // Already unlocked

      setProgress((prev) => {
        const newProgress = {
          ...prev,
          unlocked: {
            ...prev.unlocked,
            [id]: Date.now(),
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });

      // Add to pending toasts
      setPendingToasts((prev) => [...prev, id]);
    },
    [progress.unlocked, saveProgress]
  );

  // Record when a day was first started
  const recordDayStart = useCallback(
    (day: number) => {
      if (day === 0) {
        setProgress((prev) => {
          // Don't overwrite if already set
          if (prev.timestamps.day0StartedAt) return prev;

          const newProgress = {
            ...prev,
            timestamps: {
              ...prev.timestamps,
              day0StartedAt: Date.now(),
            },
          };
          saveProgress(newProgress);
          return newProgress;
        });
      }
    },
    [saveProgress]
  );

  // Record when a day was accessed (for blitz mode)
  const recordDayAccess = useCallback(
    (day: number) => {
      if (day === 2) {
        setProgress((prev) => {
          // Don't overwrite if already set
          if (prev.timestamps.day2AccessedAt) return prev;

          const newProgress = {
            ...prev,
            timestamps: {
              ...prev.timestamps,
              day2AccessedAt: Date.now(),
            },
          };
          saveProgress(newProgress);
          return newProgress;
        });
      }
    },
    [saveProgress]
  );

  // Record when Day 7 is completed (for speed runner achievement)
  const recordDay7Complete = useCallback(() => {
    setProgress((prev) => {
      // Don't overwrite if already set
      if (prev.timestamps.day7CompletedAt) return prev;

      const newProgress = {
        ...prev,
        timestamps: {
          ...prev.timestamps,
          day7CompletedAt: Date.now(),
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Record word count for a form field
  const recordWordCount = useCallback(
    (fieldId: string, count: number) => {
      setProgress((prev) => {
        const newProgress = {
          ...prev,
          metrics: {
            ...prev.metrics,
            wordCounts: {
              ...prev.metrics.wordCounts,
              [fieldId]: count,
            },
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  // Record scroll time for speed reader achievement
  const recordScrollTime = useCallback(
    (day: number, timeMs: number) => {
      const key = `day-${day}`;
      setProgress((prev) => {
        // Only record if it's faster than previous or first time
        const existing = prev.metrics.scrollTimes[key];
        if (existing && existing <= timeMs) return prev;

        const newProgress = {
          ...prev,
          metrics: {
            ...prev.metrics,
            scrollTimes: {
              ...prev.metrics.scrollTimes,
              [key]: timeMs,
            },
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  // Record form edit for revisionist achievement
  const recordFormEdit = useCallback(
    (fieldId: string) => {
      setProgress((prev) => {
        const currentCount = prev.metrics.formEdits[fieldId] || 0;
        const newProgress = {
          ...prev,
          metrics: {
            ...prev.metrics,
            formEdits: {
              ...prev.metrics.formEdits,
              [fieldId]: currentCount + 1,
            },
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  // Check all conditions and unlock any newly earned achievements
  const checkAllConditions = useCallback(
    (context: AchievementCheckContext): AchievementId[] => {
      const newlyUnlocked = checkAchievementConditions(progress, context);

      // Unlock each newly earned achievement
      newlyUnlocked.forEach((id) => {
        unlock(id);
      });

      return newlyUnlocked;
    },
    [progress, unlock]
  );

  // Dismiss a toast
  const dismissToast = useCallback((id: AchievementId) => {
    setPendingToasts((prev) => prev.filter((toastId) => toastId !== id));
  }, []);

  // Get next pending toast (FIFO)
  const nextToast = pendingToasts[0] || null;

  // Clear all progress (for testing/reset)
  const clearProgress = useCallback(() => {
    setProgress({
      unlocked: {} as Record<AchievementId, number>,
      timestamps: {},
      metrics: {
        wordCounts: {},
        scrollTimes: {},
        formEdits: {},
      },
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    progress,
    isLoaded,
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
    pendingToasts,
    nextToast,
    dismissToast,
    clearProgress,
  };
}
