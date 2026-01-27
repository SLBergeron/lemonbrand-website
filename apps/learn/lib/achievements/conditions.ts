import { AchievementId, AchievementProgress, AchievementCheckContext } from "./types";

// 12 hours in milliseconds
const BLITZ_MODE_THRESHOLD = 12 * 60 * 60 * 1000;

// 30 seconds in milliseconds
const SPEED_READER_THRESHOLD = 30 * 1000;

// Word count threshold for verbose achievement
const VERBOSE_WORD_COUNT = 250;

type ConditionChecker = (
  progress: AchievementProgress,
  context: AchievementCheckContext
) => boolean;

const dayCompleteCondition = (day: number): ConditionChecker => {
  return (_progress, context) => {
    return context.completedDays.includes(day);
  };
};

const CONDITIONS: Record<AchievementId, ConditionChecker> = {
  // Day completion achievements
  "day-0-complete": dayCompleteCondition(0),
  "day-1-complete": dayCompleteCondition(1),
  "day-2-complete": dayCompleteCondition(2),
  "day-3-complete": dayCompleteCondition(3),
  "day-4-complete": dayCompleteCondition(4),
  "day-5-complete": dayCompleteCondition(5),
  "day-6-complete": dayCompleteCondition(6),
  "day-7-complete": dayCompleteCondition(7),

  // Blitz mode: Day 2 accessed within 12 hours of Day 0 start
  "blitz-mode": (progress) => {
    const { day0StartedAt, day2AccessedAt } = progress.timestamps;
    if (!day0StartedAt || !day2AccessedAt) return false;
    return day2AccessedAt - day0StartedAt < BLITZ_MODE_THRESHOLD;
  },

  // Speed runner: Complete entire Sprint in under 12 hours
  "speed-runner": (progress) => {
    const { day0StartedAt, day7CompletedAt } = progress.timestamps;
    if (!day0StartedAt || !day7CompletedAt) return false;
    return day7CompletedAt - day0StartedAt < BLITZ_MODE_THRESHOLD;
  },

  // Early bird: Complete any day before 8 AM
  "early-bird": (_progress, context) => {
    return Object.entries(context.dayProgress).some(([, data]) => {
      if (!data.completedAt) return false;
      const hour = new Date(data.completedAt).getHours();
      return hour < 8;
    });
  },

  // Night owl: Complete any day after 10 PM
  "night-owl": (_progress, context) => {
    return Object.entries(context.dayProgress).some(([, data]) => {
      if (!data.completedAt) return false;
      const hour = new Date(data.completedAt).getHours();
      return hour >= 22;
    });
  },

  // Streak of 3: Complete 3 consecutive days
  "streak-3": (_progress, context) => {
    const completedDays = [...context.completedDays].sort((a, b) => a - b);
    if (completedDays.length < 3) return false;

    // Check for any consecutive sequence of 3
    for (let i = 0; i <= completedDays.length - 3; i++) {
      if (
        completedDays[i + 1] === completedDays[i] + 1 &&
        completedDays[i + 2] === completedDays[i] + 2
      ) {
        return true;
      }
    }
    return false;
  },

  // Perfectionist: All completed days have 100% checklist completion
  perfectionist: (_progress, context) => {
    const completedEntries = Object.entries(context.dayProgress).filter(
      ([, data]) => data.completedAt
    );
    if (completedEntries.length === 0) return false;
    return completedEntries.every(([, data]) => data.checklistComplete);
  },

  // Verbose: 250+ words in project brief
  verbose: (progress) => {
    const whatToBuildCount = progress.metrics.wordCounts["whatToBuild"] || 0;
    const projectBriefCount = progress.metrics.wordCounts["projectBrief"] || 0;
    return Math.max(whatToBuildCount, projectBriefCount) >= VERBOSE_WORD_COUNT;
  },

  // Speed reader: Scroll to bottom in under 30 seconds
  "speed-reader": (progress) => {
    return Object.values(progress.metrics.scrollTimes).some(
      (time) => time > 0 && time < SPEED_READER_THRESHOLD
    );
  },

  // Revisionist: Edit a form after submitting
  revisionist: (progress) => {
    return Object.values(progress.metrics.formEdits).some((count) => count > 0);
  },
};

/**
 * Check which achievements should be newly unlocked based on current state
 */
export function checkAchievementConditions(
  progress: AchievementProgress,
  context: AchievementCheckContext
): AchievementId[] {
  const newlyUnlocked: AchievementId[] = [];

  for (const [id, condition] of Object.entries(CONDITIONS) as [
    AchievementId,
    ConditionChecker
  ][]) {
    // Skip if already unlocked
    if (progress.unlocked[id]) continue;

    // Check condition
    if (condition(progress, context)) {
      newlyUnlocked.push(id);
    }
  }

  return newlyUnlocked;
}

/**
 * Check a single achievement condition
 */
export function checkSingleAchievement(
  id: AchievementId,
  progress: AchievementProgress,
  context: AchievementCheckContext
): boolean {
  const condition = CONDITIONS[id];
  if (!condition) return false;
  return condition(progress, context);
}

/**
 * Check if user qualifies for blitz mode (for showing message)
 */
export function isBlitzModeEligible(progress: AchievementProgress): boolean {
  const { day0StartedAt, day2AccessedAt } = progress.timestamps;
  if (!day0StartedAt || !day2AccessedAt) return false;
  return day2AccessedAt - day0StartedAt < BLITZ_MODE_THRESHOLD;
}
