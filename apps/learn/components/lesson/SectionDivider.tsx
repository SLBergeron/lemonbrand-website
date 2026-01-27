"use client";

import { cn } from "@lemonbrand/ui";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn("flex items-center justify-center py-12", className)}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-px bg-border/60" />
        <div className="size-1 rounded-full bg-border" />
        <div className="w-8 h-px bg-border/60" />
      </div>
    </div>
  );
}
