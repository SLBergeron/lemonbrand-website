"use client";

import { useState, useEffect, useCallback } from "react";

// Local progress storage for free trial (Days 0-1)
const STORAGE_KEY = "sprint-preview-progress";

export interface DayProgress {
  checklist: string[]; // IDs of completed items
  formResponses: Record<string, unknown>;
  videoWatched: boolean;
  completedAt?: number;
  startedAt?: number; // First access timestamp
  formSubmittedAt?: number; // Form submission timestamp
}

export interface LocalProgress {
  day0?: DayProgress;
  day1?: DayProgress;
}

function getInitialProgress(): LocalProgress {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parse errors
  }
  return {};
}

export function useLocalProgress() {
  const [progress, setProgress] = useState<LocalProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load on mount
  useEffect(() => {
    setProgress(getInitialProgress());
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever progress changes
  const saveProgress = useCallback((newProgress: LocalProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const updateDayProgress = useCallback(
    (day: 0 | 1, updates: Partial<DayProgress>) => {
      setProgress((prev) => {
        const key = `day${day}` as "day0" | "day1";
        const currentDay = prev[key] || {
          checklist: [],
          formResponses: {},
          videoWatched: false,
        };
        const newProgress = {
          ...prev,
          [key]: {
            ...currentDay,
            ...updates,
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  const toggleChecklistItem = useCallback(
    (day: 0 | 1, itemId: string) => {
      setProgress((prev) => {
        const key = `day${day}` as "day0" | "day1";
        const currentDay = prev[key] || {
          checklist: [],
          formResponses: {},
          videoWatched: false,
        };
        const checklist = currentDay.checklist.includes(itemId)
          ? currentDay.checklist.filter((id) => id !== itemId)
          : [...currentDay.checklist, itemId];

        const newProgress = {
          ...prev,
          [key]: {
            ...currentDay,
            checklist,
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  const markVideoWatched = useCallback(
    (day: 0 | 1) => {
      updateDayProgress(day, { videoWatched: true });
    },
    [updateDayProgress]
  );

  const saveFormResponse = useCallback(
    (day: 0 | 1, responses: Record<string, unknown>) => {
      updateDayProgress(day, { formResponses: responses });
    },
    [updateDayProgress]
  );

  const markDayComplete = useCallback(
    (day: 0 | 1) => {
      updateDayProgress(day, { completedAt: Date.now() });
    },
    [updateDayProgress]
  );

  const recordDayStart = useCallback(
    (day: 0 | 1) => {
      setProgress((prev) => {
        const key = `day${day}` as "day0" | "day1";
        const currentDay = prev[key];

        // Don't overwrite if already set
        if (currentDay?.startedAt) return prev;

        const newProgress = {
          ...prev,
          [key]: {
            checklist: [],
            formResponses: {},
            videoWatched: false,
            ...currentDay,
            startedAt: Date.now(),
          },
        };
        saveProgress(newProgress);
        return newProgress;
      });
    },
    [saveProgress]
  );

  const markFormSubmitted = useCallback(
    (day: 0 | 1) => {
      updateDayProgress(day, { formSubmittedAt: Date.now() });
    },
    [updateDayProgress]
  );

  const getDayProgress = useCallback(
    (day: 0 | 1): DayProgress | undefined => {
      const key = `day${day}` as "day0" | "day1";
      return progress[key];
    },
    [progress]
  );

  const clearProgress = useCallback(() => {
    setProgress({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return {
    progress,
    isLoaded,
    updateDayProgress,
    toggleChecklistItem,
    markVideoWatched,
    saveFormResponse,
    markDayComplete,
    recordDayStart,
    markFormSubmitted,
    getDayProgress,
    clearProgress,
  };
}
