"use client";

import { cn } from "@lemonbrand/ui";
import { Lock } from "lucide-react";
import { Achievement } from "@/lib/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: number;
  variant?: "compact" | "full";
}

export function AchievementCard({
  achievement,
  isUnlocked,
  unlockedAt,
  variant = "compact",
}: AchievementCardProps) {
  const isSecret = achievement.isSecret && !isUnlocked;

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
          isUnlocked
            ? "bg-accent/10 border border-accent/20"
            : "bg-muted/30 border border-transparent opacity-60"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "size-8 rounded-md flex items-center justify-center text-lg shrink-0",
            isUnlocked ? "bg-accent/20" : "bg-muted/50"
          )}
        >
          {isSecret ? (
            <span className="text-muted-foreground">?</span>
          ) : isUnlocked ? (
            <span>{achievement.icon}</span>
          ) : (
            <Lock className="size-3.5 text-muted-foreground/50" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-sm font-medium truncate",
              isUnlocked ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {isSecret ? "???" : achievement.title}
          </div>
          {!isSecret && (
            <div className="text-xs text-muted-foreground truncate">
              {achievement.description}
            </div>
          )}
        </div>

        {/* Checkmark for unlocked */}
        {isUnlocked && (
          <div className="size-5 rounded-full bg-accent flex items-center justify-center shrink-0">
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
        )}
      </div>
    );
  }

  // Full variant - for toast or expanded view
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-all duration-300",
        isUnlocked
          ? "bg-card border-accent/30 shadow-lg"
          : "bg-muted/30 border-border opacity-60"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "size-12 rounded-lg flex items-center justify-center text-2xl shrink-0",
          isUnlocked ? "bg-accent/20" : "bg-muted/50"
        )}
      >
        {isSecret ? (
          <span className="text-muted-foreground">?</span>
        ) : isUnlocked ? (
          <span>{achievement.icon}</span>
        ) : (
          <Lock className="size-5 text-muted-foreground/50" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "font-display font-semibold",
            isUnlocked ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {isSecret ? "Secret Achievement" : achievement.title}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">
          {isSecret ? "Keep exploring to unlock" : achievement.description}
        </div>
        {isUnlocked && unlockedAt && (
          <div className="text-xs text-muted-foreground/70 mt-1">
            Unlocked {formatRelativeTime(unlockedAt)}
          </div>
        )}
      </div>
    </div>
  );
}

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString();
}
