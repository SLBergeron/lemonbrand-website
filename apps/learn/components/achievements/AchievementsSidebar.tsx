"use client";

import { useState } from "react";
import { cn } from "@lemonbrand/ui";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TrophyRing } from "./TrophyRing";
import { AchievementCard } from "./AchievementCard";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_ORDER,
  SECRET_ACHIEVEMENT_COUNT,
  AchievementId,
} from "@/lib/achievements";

interface AchievementsSidebarProps {
  unlockedIds: AchievementId[];
  completedDays: number[];
  getUnlockedAt: (id: AchievementId) => number | undefined;
  className?: string;
}

export function AchievementsSidebar({
  unlockedIds,
  completedDays,
  getUnlockedAt,
  className,
}: AchievementsSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENT_ORDER.length;

  // Count unlocked secrets
  const unlockedSecrets = unlockedIds.filter(
    (id) => ACHIEVEMENTS[id].isSecret
  ).length;
  const remainingSecrets = SECRET_ACHIEVEMENT_COUNT - unlockedSecrets;

  // Separate visible achievements (non-secrets + unlocked secrets)
  const visibleAchievements = ACHIEVEMENT_ORDER.filter((id) => {
    const achievement = ACHIEVEMENTS[id];
    return !achievement.isSecret || unlockedIds.includes(id);
  });

  return (
    <div className={cn("border-b border-border/40", className)}>
      {/* Collapsed header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full px-4 py-3 flex items-center gap-3",
          "hover:bg-muted/30 transition-colors",
          "text-left"
        )}
      >
        {/* Trophy ring */}
        <TrophyRing completedDays={completedDays} size="sm" />

        {/* Label */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-foreground">
            Achievements
          </div>
          <div className="text-xs text-muted-foreground">
            {unlockedCount}/{totalCount} Unlocked
          </div>
        </div>

        {/* Expand indicator */}
        {isExpanded ? (
          <ChevronDown className="size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-1.5 animate-fade-in">
          {/* Achievement list */}
          {visibleAchievements.map((id) => {
            const achievement = ACHIEVEMENTS[id];
            const isUnlocked = unlockedIds.includes(id);
            return (
              <AchievementCard
                key={id}
                achievement={achievement}
                isUnlocked={isUnlocked}
                unlockedAt={getUnlockedAt(id)}
                variant="compact"
              />
            );
          })}

          {/* Secret achievements hint */}
          {remainingSecrets > 0 && (
            <div className="text-xs text-muted-foreground/60 text-center py-2 italic">
              {remainingSecrets} secret achievement{remainingSecrets > 1 ? "s" : ""} remaining
            </div>
          )}
        </div>
      )}
    </div>
  );
}
