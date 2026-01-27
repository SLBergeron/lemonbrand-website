"use client";

import { Badge } from "@lemonbrand/ui";
import { Clock } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface LessonHeaderProps {
  day: number;
  title: string;
  subtitle?: string;
  duration: number;
  isFreePreview?: boolean;
}

export function LessonHeader({
  day,
  title,
  subtitle,
  duration,
  isFreePreview = false,
}: LessonHeaderProps) {
  return (
    <header className="space-y-4">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="accent">Day {day}</Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="size-3.5" />
          {formatDuration(duration)}
        </div>
        {isFreePreview && <Badge variant="success">Free Preview</Badge>}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight text-balance">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
