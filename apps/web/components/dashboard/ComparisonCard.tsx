"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";
import { ArrowRight } from "lucide-react";

interface ComparisonCardProps {
  beforeLabel: string;
  beforeValue: number | string;
  afterLabel: string;
  afterValue: number | string;
  unit?: string;
  improvement?: string;
  animated?: boolean;
  className?: string;
}

/**
 * ComparisonCard Component
 * 
 * Shows before/after comparison with visual emphasis on improvement.
 */
export function ComparisonCard({
  beforeLabel,
  beforeValue,
  afterLabel,
  afterValue,
  unit = "",
  improvement,
  animated = true,
  className,
}: ComparisonCardProps) {
  const beforeDisplay =
    typeof beforeValue === "number" && animated ? (
      <AnimatedCounter value={beforeValue} suffix={unit} />
    ) : (
      `${beforeValue}${unit}`
    );

  const afterDisplay =
    typeof afterValue === "number" && animated ? (
      <AnimatedCounter value={afterValue} suffix={unit} />
    ) : (
      `${afterValue}${unit}`
    );

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between gap-4">
        {/* Before */}
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {beforeLabel}
          </p>
          <p className="text-2xl font-semibold text-muted-foreground line-through">
            {beforeDisplay}
          </p>
        </div>

        {/* Arrow */}
        <div className="text-accent">
          <ArrowRight className="w-5 h-5" />
        </div>

        {/* After */}
        <div className="flex-1 text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            {afterLabel}
          </p>
          <p className="text-2xl font-semibold text-accent">{afterDisplay}</p>
        </div>
      </div>

      {improvement && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-medium text-success">{improvement}</p>
        </div>
      )}
    </Card>
  );
}

