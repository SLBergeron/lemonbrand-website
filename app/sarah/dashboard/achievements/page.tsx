"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import {
  IconTrophy,
  IconFlame,
  IconStar,
  IconMedal,
  IconClock,
  IconLock,
  IconQuestionMark,
} from "@tabler/icons-react";

const iconMap: Record<string, typeof IconTrophy> = {
  footprints: IconMedal,
  medal: IconMedal,
  mountain: IconTrophy,
  "graduation-cap": IconTrophy,
  star: IconStar,
  trophy: IconTrophy,
  flame: IconFlame,
  fire: IconFlame,
  clock: IconClock,
  default: IconQuestionMark,
};

interface AchievementCardProps {
  achievement: {
    _id: string;
    title: string;
    description: string;
    iconType: string;
    category: string;
    xpReward: number;
    isSecret: boolean;
  };
  earned: boolean;
  earnedAt: number | null;
  isVisible: boolean;
  index: number;
}

function AchievementCard({
  achievement,
  earned,
  earnedAt,
  isVisible,
  index,
}: AchievementCardProps) {
  const Icon = iconMap[achievement.iconType] || iconMap.default;

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mb-4">
          <IconQuestionMark className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="font-semibold text-neutral-500">Secret Badge</h3>
        <p className="text-sm text-neutral-400 mt-1">Keep exploring to discover this!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl p-6 flex flex-col items-center text-center border ${
        earned
          ? "bg-white dark:bg-neutral-900 border-orange-500/30"
          : "bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 opacity-60"
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          earned
            ? "bg-gradient-to-br from-orange-500 to-yellow-500 shadow-lg shadow-orange-500/25"
            : "bg-neutral-200 dark:bg-neutral-700"
        }`}
      >
        {earned ? (
          <Icon className="w-8 h-8 text-white" />
        ) : (
          <IconLock className="w-6 h-6 text-neutral-400" />
        )}
      </div>

      <h3
        className={`font-semibold ${
          earned ? "text-neutral-900 dark:text-white" : "text-neutral-500"
        }`}
      >
        {achievement.title}
      </h3>

      <p
        className={`text-sm mt-1 ${
          earned ? "text-neutral-600 dark:text-neutral-400" : "text-neutral-400"
        }`}
      >
        {achievement.description}
      </p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            earned
              ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
          }`}
        >
          +{achievement.xpReward} XP
        </span>
      </div>

      {earned && earnedAt && (
        <p className="text-xs text-neutral-400 mt-3">
          Earned {new Date(earnedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
}

export default function AchievementsPage() {
  const { user } = useAuth();
  const achievements = useQuery(
    api.achievements.getAllWithProgress,
    user?._id ? { userId: user._id } : {}
  );

  const earnedCount = achievements?.filter((a: { earned: boolean }) => a.earned).length ?? 0;
  const totalCount = achievements?.filter((a: { isVisible: boolean }) => a.isVisible).length ?? 0;

  // Group by category
  type AchievementItem = {
    _id: string;
    title: string;
    description: string;
    iconType: string;
    category: string;
    xpReward: number;
    isSecret: boolean;
    earned: boolean;
    earnedAt: number | null;
    isVisible: boolean;
  };
  const byCategory = achievements
    ? achievements.reduce(
        (acc: Record<string, AchievementItem[]>, achievement: AchievementItem) => {
          const category = achievement.category;
          if (!acc[category]) acc[category] = [];
          acc[category].push(achievement);
          return acc;
        },
        {}
      )
    : undefined;

  const categoryLabels: Record<string, string> = {
    progress: "Progress",
    mastery: "Mastery",
    streak: "Streaks",
    special: "Special",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <IconTrophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
              Achievements
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {earnedCount} of {totalCount} badges earned
            </p>
          </div>
        </div>
      </motion.div>

      {/* Achievement categories */}
      {byCategory &&
        (Object.entries(byCategory) as [string, AchievementItem[]][]).map(([category, items]) => (
          <motion.section
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              {categoryLabels[category] || category}
              <span className="text-sm font-normal text-neutral-500">
                ({items.filter((a) => a.earned).length}/
                {items.filter((a) => a.isVisible).length})
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((achievement, index) => (
                <AchievementCard
                  key={achievement._id}
                  achievement={achievement}
                  earned={achievement.earned}
                  earnedAt={achievement.earnedAt}
                  isVisible={achievement.isVisible}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        ))}

      {/* Empty state */}
      {!achievements && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-48 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
}
