"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";
import { ProgressBar } from "./ProgressBar";

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  prefix?: string;
  description?: string;
  visual?: "bar" | "progress" | "none";
  visualValue?: number; // 0-100 for progress
  animated?: boolean;
  className?: string;
}

/**
 * MetricCard Component
 * 
 * Displays key metrics with optional visual representation.
 */
export function MetricCard({
  title,
  value,
  unit = "",
  prefix = "",
  description,
  visual = "none",
  visualValue,
  animated = true,
  className,
}: MetricCardProps) {
  const displayValue =
    typeof value === "number" && animated ? (
      <AnimatedCounter value={value} suffix={unit} prefix={prefix} />
    ) : (
      `${prefix}${value}${unit}`
    );

  return (
    <Card className={cn("p-6", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-semibold mb-2">{displayValue}</p>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {visual === "progress" && visualValue !== undefined && (
        <ProgressBar value={visualValue} showValue={false} color="accent" />
      )}
      {visual === "bar" && visualValue !== undefined && (
        <div className="mt-4">
          <ProgressBar value={visualValue} color="primary" />
        </div>
      )}
    </Card>
  );
}