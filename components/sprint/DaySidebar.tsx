"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, Lock, Circle, MessageSquare } from "lucide-react";

interface DayProgress {
  day: number;
  status: "locked" | "available" | "in_progress" | "completed";
}

interface DaySidebarProps {
  progress: DayProgress[];
  discordUrl?: string;
  className?: string;
}

const DAY_TITLES = [
  "Setup",
  "Scope",
  "Structure",
  "Core",
  "Expand",
  "Polish",
  "Refine",
  "Ship!",
];

export function DaySidebar({
  progress,
  discordUrl,
  className,
}: DaySidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 border-r border-border bg-card/50 p-4 flex flex-col",
        className
      )}
    >
      <div className="mb-6">
        <Link href="/" className="font-display font-bold text-lg">
          LemonBrand
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Sprint Dashboard</p>
      </div>

      <nav className="flex-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Sprint Progress
        </p>
        <ul className="space-y-1">
          {progress.map((day) => {
            const isActive = pathname === `/dashboard/sprint/day/${day.day}`;
            const isLocked = day.status === "locked";
            const isCompleted = day.status === "completed";
            const isCurrent = day.status === "in_progress" || day.status === "available";

            return (
              <li key={day.day}>
                {isLocked ? (
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground/50 cursor-not-allowed"
                    )}
                  >
                    <Lock className="w-4 h-4" />
                    <span className="text-sm">
                      Day {day.day}: {DAY_TITLES[day.day]}
                    </span>
                  </div>
                ) : (
                  <Link
                    href={`/dashboard/sprint/day/${day.day}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      isCompleted && !isActive && "text-success"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : isCurrent ? (
                      <Circle className="w-4 h-4 fill-accent text-accent" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      Day {day.day}: {DAY_TITLES[day.day]}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="pt-4 border-t border-border">
        {discordUrl && (
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Cohort Discord
          </a>
        )}
      </div>
    </aside>
  );
}
