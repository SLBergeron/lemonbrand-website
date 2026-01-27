// Achievement system type definitions

export type AchievementId =
  // Day completion achievements
  | "day-0-complete"
  | "day-1-complete"
  | "day-2-complete"
  | "day-3-complete"
  | "day-4-complete"
  | "day-5-complete"
  | "day-6-complete"
  | "day-7-complete"
  // Speed achievements
  | "blitz-mode"
  | "speed-runner"
  // Dedication achievements
  | "early-bird"
  | "night-owl"
  | "streak-3"
  | "perfectionist"
  // Secret achievements
  | "verbose"
  | "speed-reader"
  | "revisionist";

export type AchievementCategory =
  | "milestone"
  | "speed"
  | "dedication"
  | "secret";

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  category: AchievementCategory;
  icon: string; // Emoji or icon name
  isSecret: boolean;
  day?: number; // For day-specific achievements
}

export interface AchievementProgress {
  unlocked: Record<AchievementId, number>; // id -> unlocked timestamp
  timestamps: {
    day0StartedAt?: number;
    day2AccessedAt?: number;
    day7CompletedAt?: number;
  };
  metrics: {
    wordCounts: Record<string, number>; // field-id -> count
    scrollTimes: Record<string, number>; // day-id -> time to scroll (ms)
    formEdits: Record<string, number>; // field-id -> edit count
  };
}

export interface AchievementContextValue {
  progress: AchievementProgress;
  isLoaded: boolean;
  unlocked: AchievementId[];
  isUnlocked: (id: AchievementId) => boolean;
  unlock: (id: AchievementId) => void;
  recordDayStart: (day: number) => void;
  recordDayAccess: (day: number) => void;
  recordWordCount: (fieldId: string, count: number) => void;
  recordScrollTime: (day: number, timeMs: number) => void;
  recordFormEdit: (fieldId: string) => void;
  checkAllConditions: (context: AchievementCheckContext) => AchievementId[];
  getUnlockedAt: (id: AchievementId) => number | undefined;
}

export interface AchievementCheckContext {
  completedDays: number[];
  dayProgress: Record<number, { completedAt?: number; checklistComplete: boolean }>;
  currentDay?: number;
}
