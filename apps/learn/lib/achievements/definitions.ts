import { Achievement, AchievementId } from "./types";

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  // Milestone Achievements (Day Completion)
  "day-0-complete": {
    id: "day-0-complete",
    title: "Ready to Build",
    description: "Complete Day 0 setup checklist",
    category: "milestone",
    icon: "🚀",
    isSecret: false,
    day: 0,
  },
  "day-1-complete": {
    id: "day-1-complete",
    title: "Scope Defined",
    description: "Complete Day 1 checklist",
    category: "milestone",
    icon: "🎯",
    isSecret: false,
    day: 1,
  },
  "day-2-complete": {
    id: "day-2-complete",
    title: "Foundation Laid",
    description: "Complete Day 2 checklist",
    category: "milestone",
    icon: "🏗️",
    isSecret: false,
    day: 2,
  },
  "day-3-complete": {
    id: "day-3-complete",
    title: "Structure Built",
    description: "Complete Day 3 checklist",
    category: "milestone",
    icon: "🧱",
    isSecret: false,
    day: 3,
  },
  "day-4-complete": {
    id: "day-4-complete",
    title: "Core Shipped",
    description: "Complete Day 4 checklist",
    category: "milestone",
    icon: "⚡",
    isSecret: false,
    day: 4,
  },
  "day-5-complete": {
    id: "day-5-complete",
    title: "Expanded",
    description: "Complete Day 5 checklist",
    category: "milestone",
    icon: "📈",
    isSecret: false,
    day: 5,
  },
  "day-6-complete": {
    id: "day-6-complete",
    title: "Polished",
    description: "Complete Day 6 checklist",
    category: "milestone",
    icon: "✨",
    isSecret: false,
    day: 6,
  },
  "day-7-complete": {
    id: "day-7-complete",
    title: "Shipped!",
    description: "Complete the entire Sprint",
    category: "milestone",
    icon: "🏆",
    isSecret: false,
    day: 7,
  },

  // Speed Achievements
  "blitz-mode": {
    id: "blitz-mode",
    title: "Blitz Mode",
    description: "Access Day 2 within 12 hours of starting Day 0",
    category: "speed",
    icon: "⚡",
    isSecret: false,
  },
  "speed-runner": {
    id: "speed-runner",
    title: "Speed Runner",
    description: "Complete the entire Sprint in under 12 hours",
    category: "speed",
    icon: "🏃",
    isSecret: false,
  },

  // Dedication Achievements
  "early-bird": {
    id: "early-bird",
    title: "Early Bird",
    description: "Complete a day before 8 AM",
    category: "dedication",
    icon: "🌅",
    isSecret: false,
  },
  "night-owl": {
    id: "night-owl",
    title: "Night Owl",
    description: "Complete a day after 10 PM",
    category: "dedication",
    icon: "🦉",
    isSecret: false,
  },
  "streak-3": {
    id: "streak-3",
    title: "On a Roll",
    description: "Complete 3 consecutive days",
    category: "dedication",
    icon: "🔥",
    isSecret: false,
  },
  perfectionist: {
    id: "perfectionist",
    title: "Perfectionist",
    description: "100% checklist on all completed days",
    category: "dedication",
    icon: "💯",
    isSecret: false,
  },

  // Secret Achievements
  verbose: {
    id: "verbose",
    title: "Verbose",
    description: "Write 250+ words in your project brief",
    category: "secret",
    icon: "📝",
    isSecret: true,
  },
  "speed-reader": {
    id: "speed-reader",
    title: "Speed Reader",
    description: "Scroll to the bottom in under 30 seconds",
    category: "secret",
    icon: "📖",
    isSecret: true,
  },
  revisionist: {
    id: "revisionist",
    title: "Revisionist",
    description: "Edit a form response after submitting",
    category: "secret",
    icon: "✏️",
    isSecret: true,
  },
};

export const ACHIEVEMENT_ORDER: AchievementId[] = [
  // Milestones first
  "day-0-complete",
  "day-1-complete",
  "day-2-complete",
  "day-3-complete",
  "day-4-complete",
  "day-5-complete",
  "day-6-complete",
  "day-7-complete",
  // Speed
  "blitz-mode",
  "speed-runner",
  // Dedication
  "early-bird",
  "night-owl",
  "streak-3",
  "perfectionist",
  // Secrets last
  "verbose",
  "speed-reader",
  "revisionist",
];

export const TOTAL_ACHIEVEMENTS = ACHIEVEMENT_ORDER.length;

export const SECRET_ACHIEVEMENT_COUNT = ACHIEVEMENT_ORDER.filter(
  (id) => ACHIEVEMENTS[id].isSecret
).length;

export function getAchievementsByCategory(category: string): Achievement[] {
  return ACHIEVEMENT_ORDER
    .map((id) => ACHIEVEMENTS[id])
    .filter((a) => a.category === category);
}

export function getVisibleAchievements(unlockedIds: AchievementId[]): Achievement[] {
  return ACHIEVEMENT_ORDER.map((id) => {
    const achievement = ACHIEVEMENTS[id];
    if (achievement.isSecret && !unlockedIds.includes(id)) {
      return null;
    }
    return achievement;
  }).filter(Boolean) as Achievement[];
}
