"use client";

import { motion } from "framer-motion";
import { useAchievementContext } from "@/context/AchievementContext";
import { TrophyRing } from "@/components/achievements";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_ORDER,
  AchievementId,
} from "@/lib/achievements";
import { cn } from "@lemonbrand/ui";
import { Lock } from "lucide-react";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { getLesson } from "@/lib/lessons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function AchievementsPage() {
  const { unlocked, getUnlockedAt, isLoaded } = useAchievementContext();
  const { progress, isLoaded: progressLoaded } = useLocalProgress();

  // Calculate completed days based on checklist completion
  const completedDays: number[] = [];
  if (progressLoaded) {
    const day0Lesson = getLesson(0);
    const day0Checklist = progress.day0?.checklist || [];
    if (day0Lesson && day0Checklist.length >= day0Lesson.checklist.length) {
      completedDays.push(0);
    }

    const day1Lesson = getLesson(1);
    const day1Checklist = progress.day1?.checklist || [];
    if (day1Lesson && day1Checklist.length >= day1Lesson.checklist.length) {
      completedDays.push(1);
    }
  }

  const unlockedCount = unlocked.length;
  const totalCount = ACHIEVEMENT_ORDER.length;

  // Group achievements by category
  const milestones = ACHIEVEMENT_ORDER.filter(
    (id) => ACHIEVEMENTS[id].category === "milestone"
  );
  const speed = ACHIEVEMENT_ORDER.filter(
    (id) => ACHIEVEMENTS[id].category === "speed"
  );
  const dedication = ACHIEVEMENT_ORDER.filter(
    (id) => ACHIEVEMENTS[id].category === "dedication"
  );
  const secrets = ACHIEVEMENT_ORDER.filter(
    (id) => ACHIEVEMENTS[id].category === "secret"
  );

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24 lg:pb-12"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="mb-12 text-center">
        <div className="flex justify-center mb-6">
          <TrophyRing completedDays={completedDays} size="lg" />
        </div>
        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-3">
          Achievements
        </h1>
        <p className="text-muted-foreground">
          <span className="text-accent font-semibold">{unlockedCount}</span>
          <span className="mx-1">/</span>
          <span>{totalCount}</span>
          <span className="ml-2">unlocked</span>
        </p>
      </motion.header>

      {/* Milestones */}
      <motion.section variants={itemVariants} className="mb-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Milestones
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {milestones.map((id) => (
            <AchievementTile
              key={id}
              id={id}
              isUnlocked={unlocked.includes(id)}
              unlockedAt={getUnlockedAt(id)}
            />
          ))}
        </div>
      </motion.section>

      {/* Speed */}
      <motion.section variants={itemVariants} className="mb-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Speed
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {speed.map((id) => (
            <AchievementTile
              key={id}
              id={id}
              isUnlocked={unlocked.includes(id)}
              unlockedAt={getUnlockedAt(id)}
            />
          ))}
        </div>
      </motion.section>

      {/* Dedication */}
      <motion.section variants={itemVariants} className="mb-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Dedication
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dedication.map((id) => (
            <AchievementTile
              key={id}
              id={id}
              isUnlocked={unlocked.includes(id)}
              unlockedAt={getUnlockedAt(id)}
            />
          ))}
        </div>
      </motion.section>

      {/* Secrets */}
      <motion.section variants={itemVariants}>
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
          Secrets
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {secrets.map((id) => (
            <AchievementTile
              key={id}
              id={id}
              isUnlocked={unlocked.includes(id)}
              unlockedAt={getUnlockedAt(id)}
              isSecret
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function AchievementTile({
  id,
  isUnlocked,
  unlockedAt,
  isSecret = false,
}: {
  id: AchievementId;
  isUnlocked: boolean;
  unlockedAt?: number;
  isSecret?: boolean;
}) {
  const achievement = ACHIEVEMENTS[id];
  const showSecret = isSecret && !isUnlocked;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center p-4 rounded-xl border transition-all duration-300",
        isUnlocked
          ? "bg-accent/10 border-accent/30"
          : "bg-muted/20 border-border/50 opacity-50"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "size-12 rounded-lg flex items-center justify-center text-2xl mb-3 transition-all",
          isUnlocked ? "bg-accent/20" : "bg-muted/30 grayscale"
        )}
      >
        {showSecret ? (
          <Lock className="size-5 text-muted-foreground" />
        ) : (
          <span className={cn(!isUnlocked && "opacity-40")}>
            {achievement.icon}
          </span>
        )}
      </div>

      {/* Title */}
      <div
        className={cn(
          "font-display font-semibold text-sm text-center mb-1",
          isUnlocked ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {showSecret ? "???" : achievement.title}
      </div>

      {/* Description */}
      <div className="text-xs text-muted-foreground text-center line-clamp-2">
        {showSecret ? "Keep exploring" : achievement.description}
      </div>

      {/* Unlocked indicator */}
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <div className="size-5 rounded-full bg-accent flex items-center justify-center">
            <svg
              className="size-3 text-accent-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
