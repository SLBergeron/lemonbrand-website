"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lemonbrand/ui";
import { TrophyRing } from "./TrophyRing";
import { ACHIEVEMENT_ORDER, AchievementId } from "@/lib/achievements";

interface AchievementsLinkProps {
  unlockedIds: AchievementId[];
  completedDays: number[];
  className?: string;
}

export function AchievementsLink({
  unlockedIds,
  completedDays,
  className,
}: AchievementsLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === "/sprint/achievements";

  const unlockedCount = unlockedIds.length;
  const totalCount = ACHIEVEMENT_ORDER.length;

  return (
    <Link
      href="/sprint/achievements"
      className={cn(
        "flex items-center gap-3 px-4 py-3 border-b border-border/40 transition-colors",
        isActive ? "bg-muted/50" : "hover:bg-muted/30",
        className
      )}
    >
      <TrophyRing completedDays={completedDays} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-foreground">Achievements</div>
        <div className="text-xs text-muted-foreground">
          {unlockedCount}/{totalCount} Unlocked
        </div>
      </div>
    </Link>
  );
}
