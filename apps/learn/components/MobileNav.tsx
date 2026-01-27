"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, Button } from "@lemonbrand/ui";
import {
  ChevronLeft,
  ChevronRight,
  List,
  X,
  CheckCircle2,
  Circle,
  Lock,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface MobileNavProps {
  className?: string;
}

const DAYS = [
  { day: 0, title: "Setup", isFree: true },
  { day: 1, title: "Scope", isFree: true },
  { day: 2, title: "Foundation", isFree: false },
  { day: 3, title: "Structure", isFree: false },
  { day: 4, title: "Core", isFree: false },
  { day: 5, title: "Expand", isFree: false },
  { day: 6, title: "Polish", isFree: false },
  { day: 7, title: "Ship", isFree: false },
];

export function MobileNav({ className }: MobileNavProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Extract current day from pathname
  const dayMatch = pathname.match(/\/day\/(\d+)/);
  const currentDay = dayMatch ? parseInt(dayMatch[1]) : null;

  const prevDay = currentDay !== null && currentDay > 0 ? currentDay - 1 : null;
  const nextDay = currentDay !== null && currentDay < 7 ? currentDay + 1 : null;

  const getHref = (day: number) => {
    const dayData = DAYS.find((d) => d.day === day);
    return dayData?.isFree
      ? `/sprint/preview/day/${day}`
      : `/sprint/day/${day}`;
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav
        className={cn(
          "fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border",
          className
        )}
      >
        <div className="flex items-center justify-between px-4 h-14">
          {/* Previous */}
          <Button
            variant="ghost"
            size="sm"
            disabled={prevDay === null}
            asChild={prevDay !== null}
            className="w-20"
          >
            {prevDay !== null ? (
              <Link href={getHref(prevDay)}>
                <ChevronLeft className="size-4 mr-1" />
                Prev
              </Link>
            ) : (
              <span className="opacity-50">
                <ChevronLeft className="size-4 mr-1" />
                Prev
              </span>
            )}
          </Button>

          {/* Days Drawer Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDrawerOpen(true)}
            className="gap-2 border-border/50 shadow-premium-sm"
          >
            <List className="size-4" />
            Day {currentDay ?? "-"}
          </Button>

          {/* Next */}
          <Button
            variant="ghost"
            size="sm"
            disabled={nextDay === null}
            asChild={nextDay !== null}
            className="w-20"
          >
            {nextDay !== null ? (
              <Link href={getHref(nextDay)}>
                Next
                <ChevronRight className="size-4 ml-1" />
              </Link>
            ) : (
              <span className="opacity-50">
                Next
                <ChevronRight className="size-4 ml-1" />
              </span>
            )}
          </Button>
        </div>
      </nav>

      {/* Days Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-2xl max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="font-display font-semibold">Course Days</h3>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Day List */}
            <div className="overflow-y-auto p-2 pb-4">
              {DAYS.map(({ day, title, isFree }) => {
                const isActive = currentDay === day;
                const href = isFree
                  ? `/sprint/preview/day/${day}`
                  : `/sprint/day/${day}`;

                // TODO: Get real completion status from progress data
                const isCompleted = false;
                const status: "locked" | "available" | "completed" = isCompleted
                  ? "completed"
                  : isFree
                    ? "available"
                    : "locked";

                return (
                  <Link
                    key={day}
                    href={href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-muted/50",
                      status === "locked" && "opacity-50"
                    )}
                  >
                    {/* Status Icon */}
                    <span className="shrink-0">
                      {status === "completed" ? (
                        <CheckCircle2 className="size-5 text-success" />
                      ) : status === "locked" ? (
                        <Lock className="size-5" />
                      ) : (
                        <Circle className="size-5" />
                      )}
                    </span>

                    {/* Day Label */}
                    <span className="flex-1">
                      <span className="font-medium">Day {day}:</span> {title}
                    </span>

                    {/* Free Badge */}
                    {isFree && (
                      <span className="shrink-0 text-xs font-medium bg-success/10 text-success px-2 py-0.5 rounded">
                        Free
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Spacer for bottom nav */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
