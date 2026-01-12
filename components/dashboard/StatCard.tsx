"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animated-counter";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  animated?: boolean;
  className?: string;
}

/**
 * StatCard Component
 * 
 * Displays a single statistic in dashboard style with optional trend indicator.
 */
export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  trend,
  trendValue,
  icon,
  animated = true,
  className,
}: StatCardProps) {
  const trendIcons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    neutral: <Minus className="w-4 h-4" />,
  };

  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  const displayValue =
    typeof value === "number" && animated ? (
      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
    ) : (
      `${prefix}${value}${suffix}`
    );

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-semibold">{displayValue}</p>
        {trend && trendValue && (
          <div className={cn("flex items-center gap-1 text-sm", trendColors[trend])}>
            {trendIcons[trend]}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

