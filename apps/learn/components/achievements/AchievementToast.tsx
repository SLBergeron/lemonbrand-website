"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@lemonbrand/ui";
import { X } from "lucide-react";
import { ACHIEVEMENTS, AchievementId } from "@/lib/achievements";

interface AchievementToastProps {
  achievementId: AchievementId | null;
  onDismiss: () => void;
  autoDismissMs?: number;
}

export function AchievementToast({
  achievementId,
  onDismiss,
  autoDismissMs = 5000,
}: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const achievement = achievementId ? ACHIEVEMENTS[achievementId] : null;

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onDismiss();
    }, 300);
  }, [onDismiss]);

  useEffect(() => {
    if (achievementId) {
      // Small delay to trigger animation
      const showTimer = setTimeout(() => setIsVisible(true), 50);

      // Auto dismiss
      const dismissTimer = setTimeout(() => {
        handleDismiss();
      }, autoDismissMs);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(dismissTimer);
      };
    } else {
      setIsVisible(false);
      setIsExiting(false);
    }
  }, [achievementId, autoDismissMs, handleDismiss]);

  if (!achievement || !achievementId) return null;

  return (
    <div
      className={cn(
        "fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50",
        "pointer-events-none"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto",
          "flex items-center gap-4 px-5 py-4 rounded-2xl",
          "bg-card/95 backdrop-blur-lg border border-accent/30",
          "shadow-2xl",
          "transition-all duration-300 ease-out",
          // Animation states
          isVisible && !isExiting
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95",
          // Glow effect
          isVisible && !isExiting && "animate-achievement-glow"
        )}
        style={{
          boxShadow: isVisible && !isExiting
            ? "0 0 40px hsl(var(--accent) / 0.3), 0 20px 40px -10px rgba(0,0,0,0.3)"
            : undefined,
        }}
      >
        {/* Achievement badge */}
        <div className="relative">
          <div
            className={cn(
              "size-14 rounded-xl flex items-center justify-center text-3xl",
              "bg-accent/20 border border-accent/30",
              isVisible && !isExiting && "animate-achievement-icon"
            )}
          >
            {achievement.icon}
          </div>
          {/* Sparkle effect */}
          {isVisible && !isExiting && (
            <div className="absolute -inset-1 rounded-xl animate-achievement-sparkle" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent mb-0.5">
            Achievement Unlocked
          </div>
          <div className="font-display font-bold text-lg text-foreground">
            {achievement.title}
          </div>
          <div className="text-sm text-muted-foreground">
            {achievement.description}
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
