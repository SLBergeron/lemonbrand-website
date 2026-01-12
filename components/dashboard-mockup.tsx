"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCard {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

interface DashboardMockupProps {
  title: string;
  variant?: "minimal" | "cards" | "table" | "chart";
  metrics?: MetricCard[];
  animate?: boolean;
  className?: string;
}

export function DashboardMockup({
  title,
  variant = "cards",
  metrics = [],
  animate = true,
  className,
}: DashboardMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 20 } : {}}
      animate={animate && isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-lg border border-border bg-card shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-warning/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <span className="ml-2 text-sm font-medium">{title}</span>
        </div>
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded bg-muted" />
          <div className="w-4 h-4 rounded bg-muted" />
        </div>
      </div>

      {/* Content based on variant */}
      <div className="p-4">
        {variant === "cards" && <MetricCardsView metrics={metrics} isInView={isInView} animate={animate} />}
        {variant === "minimal" && <MinimalView metrics={metrics} isInView={isInView} animate={animate} />}
        {variant === "table" && <TableView metrics={metrics} isInView={isInView} animate={animate} />}
        {variant === "chart" && <ChartView isInView={isInView} animate={animate} />}
      </div>
    </motion.div>
  );
}

// Metric cards layout
function MetricCardsView({
  metrics,
  isInView,
  animate,
}: {
  metrics: MetricCard[];
  isInView: boolean;
  animate: boolean;
}) {
  const defaultMetrics: MetricCard[] = metrics.length > 0 ? metrics : [
    { label: "Total", value: "2,847", change: "+12%", trend: "up" },
    { label: "Active", value: "1,234", change: "+8%", trend: "up" },
    { label: "Rate", value: "94%", trend: "neutral" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {defaultMetrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={animate ? { opacity: 0, scale: 0.9 } : {}}
            animate={animate && isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
            className="p-3 rounded-lg bg-muted/50 border border-border/50"
          >
            <p className="text-xs text-muted-foreground">{metric.label}</p>
            <p className="text-lg font-bold mt-1">{metric.value}</p>
            {metric.change && (
              <p className={cn(
                "text-xs mt-1",
                metric.trend === "up" && "text-success",
                metric.trend === "down" && "text-destructive",
                metric.trend === "neutral" && "text-muted-foreground"
              )}>
                {metric.change}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Fake progress bar */}
      <motion.div
        initial={animate ? { opacity: 0 } : {}}
        animate={animate && isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="space-y-2"
      >
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">78%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: "78%" } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Minimal single metric view
function MinimalView({
  metrics,
  isInView,
  animate,
}: {
  metrics: MetricCard[];
  isInView: boolean;
  animate: boolean;
}) {
  const metric = metrics[0] || { label: "Records", value: "58,000" };

  return (
    <div className="text-center py-6">
      <motion.p
        initial={animate ? { opacity: 0, y: 10 } : {}}
        animate={animate && isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-accent"
      >
        {metric.value}
      </motion.p>
      <motion.p
        initial={animate ? { opacity: 0 } : {}}
        animate={animate && isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground mt-2"
      >
        {metric.label}
      </motion.p>
    </div>
  );
}

// Table layout
function TableView({
  metrics,
  isInView,
  animate,
}: {
  metrics: MetricCard[];
  isInView: boolean;
  animate: boolean;
}) {
  const rows = metrics.length > 0 ? metrics : [
    { label: "Contractors", value: "12,847" },
    { label: "Verified", value: "8,234" },
    { label: "Pending", value: "1,203" },
  ];

  return (
    <div className="space-y-1">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, x: -10 } : {}}
          animate={animate && isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.1 + i * 0.1 }}
          className="flex justify-between py-2 border-b border-border/50 last:border-0"
        >
          <span className="text-sm text-muted-foreground">{row.label}</span>
          <span className="text-sm font-medium">{row.value}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Chart placeholder
function ChartView({
  isInView,
  animate,
}: {
  isInView: boolean;
  animate: boolean;
}) {
  const bars = [40, 65, 45, 80, 55, 70, 90];

  return (
    <div className="h-24 flex items-end justify-between gap-2">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-accent/80 rounded-t"
          initial={animate ? { height: 0 } : {}}
          animate={animate && isInView ? { height: `${height}%` } : {}}
          transition={{
            delay: 0.1 + i * 0.05,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </div>
  );
}

// Pre-configured mockups
export function VerifiednodeMockup({ className }: { className?: string }) {
  return (
    <DashboardMockup
      title="Verifiednode"
      variant="cards"
      metrics={[
        { label: "Contractors", value: "58,000" },
        { label: "Verified", value: "12,847", change: "+234", trend: "up" },
        { label: "API Cost", value: "$600" },
      ]}
      className={className}
    />
  );
}

export function ProposalGeneratorMockup({ className }: { className?: string }) {
  return (
    <DashboardMockup
      title="Proposal Generator"
      variant="minimal"
      metrics={[{ label: "Time per proposal", value: "20 min" }]}
      className={className}
    />
  );
}

export function ClientPortalMockup({ className }: { className?: string }) {
  return (
    <DashboardMockup
      title="Client Portal"
      variant="table"
      metrics={[
        { label: "Active Clients", value: "24" },
        { label: "Projects", value: "18" },
        { label: "Invoices", value: "$12,450" },
      ]}
      className={className}
    />
  );
}
