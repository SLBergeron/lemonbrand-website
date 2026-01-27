"use client";

import { cn } from "@lemonbrand/ui";
import { Trophy } from "lucide-react";

interface TrophyRingProps {
  completedDays: number[];
  totalDays?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CONFIG = {
  sm: { size: 48, strokeWidth: 5, iconSize: 16, radius: 18 },
  md: { size: 72, strokeWidth: 6, iconSize: 24, radius: 28 },
  lg: { size: 96, strokeWidth: 8, iconSize: 32, radius: 38 },
};

export function TrophyRing({
  completedDays,
  totalDays = 8,
  className,
  size = "md",
}: TrophyRingProps) {
  const config = SIZE_CONFIG[size];
  const center = config.size / 2;

  // Calculate progress (0 to 1)
  const progress = Math.min(completedDays.length / totalDays, 1);
  const isComplete = progress >= 1;

  // Arc math: 270° arc with 90° gap at bottom
  // The arc spans from 135° to 405° (45°) going clockwise
  const circumference = 2 * Math.PI * config.radius;
  const arcLength = (270 / 360) * circumference; // 270° of the full circumference
  const progressLength = progress * arcLength;

  // SVG rotation: rotate -135° to start the arc at bottom-left
  // Default SVG circle starts at 3 o'clock (right), we want to start at bottom-left (135°)
  // So we rotate by (135 - 90) = 45° but since stroke-dasharray starts at the "top" after rotation
  // We need to rotate so the arc starts at bottom-left
  // Rotation should be: 90 + 45 = 135° from top, which means rotating the SVG by 135°
  const rotation = 135;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.size}
        height={config.size}
        viewBox={`0 0 ${config.size} ${config.size}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Background arc (muted) - the full 270° track */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
        />

        {/* Progress arc (accent) */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progressLength} ${circumference}`}
          className="transition-all duration-700 ease-out"
          style={{
            filter: isComplete
              ? "drop-shadow(0 0 8px hsl(var(--accent) / 0.6))"
              : progress > 0
                ? "drop-shadow(0 0 4px hsl(var(--accent) / 0.4))"
                : undefined,
          }}
        />
      </svg>

      {/* Center trophy icon */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-300",
          isComplete
            ? "text-accent"
            : progress > 0
              ? "text-accent/70"
              : "text-muted-foreground/40"
        )}
        style={{
          filter: isComplete ? "drop-shadow(0 0 8px hsl(var(--accent) / 0.6))" : undefined,
        }}
      >
        <Trophy
          className={cn(
            "transition-transform duration-500",
            isComplete && "scale-110"
          )}
          style={{ width: config.iconSize, height: config.iconSize }}
        />
      </div>
    </div>
  );
}
