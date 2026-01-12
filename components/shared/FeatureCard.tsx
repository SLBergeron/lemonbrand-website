"use client";

import React from "react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
  step?: string;
  media?: React.ReactNode;
  spotlightColor?: string;
  canvasColors?: number[][];
  radius?: number;
}

export const FeatureCard = ({ children, className, step, media, spotlightColor, canvasColors, radius }: FeatureCardProps) => {
  return (
    <CardSpotlight
      className={cn(
        "bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden",
        "dark:bg-card dark:border-border", // Override default dark theme in CardSpotlight
        className
      )}
      color={spotlightColor || "rgba(150, 150, 150, 0.15)"} // Very light gray hover effect
      canvasColors={canvasColors || [[200, 200, 200], [180, 180, 180]]} // Light gray canvas colors
      radius={radius}
    >
      {step && (
        <div className="absolute top-4 right-4 text-6xl font-display font-bold text-muted-foreground/25 pointer-events-none select-none">
          {step}
        </div>
      )}
      {media && (
        <div className="absolute right-0 top-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {media}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </CardSpotlight>
  );
};
