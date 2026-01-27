"use client";

import { cn } from "@lemonbrand/ui";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";

interface CalloutProps {
  type: "tip" | "warning" | "info";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const icons = {
  tip: Lightbulb,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  tip: {
    container: "bg-success/10 border-success/30",
    icon: "bg-success/20 text-success",
    title: "text-success",
  },
  warning: {
    container: "bg-accent/10 border-accent/30",
    icon: "bg-accent/20 text-accent",
    title: "text-accent",
  },
  info: {
    container: "bg-primary/10 border-primary/30",
    icon: "bg-primary/20 text-primary",
    title: "text-primary",
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const Icon = icons[type];
  const style = styles[type];

  const defaultTitles = {
    tip: "Pro Tip",
    warning: "Heads Up",
    info: "Note",
  };

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-lg border my-6",
        style.container,
        className
      )}
    >
      <div
        className={cn(
          "shrink-0 size-8 rounded-lg flex items-center justify-center",
          style.icon
        )}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className={cn("font-display font-semibold text-sm mb-1", style.title)}>
          {title || defaultTitles[type]}
        </div>
        <div className="text-sm text-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
