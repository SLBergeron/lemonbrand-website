"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lemonbrand/ui";
import {
  CheckCircle2,
  Circle,
  Lock,
  HelpCircle,
  MessageCircle,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { AchievementsLink } from "./achievements";
import { useAchievementContext } from "@/context/AchievementContext";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { getLesson } from "@/lib/lessons";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex";

interface SprintSidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
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

export function SprintSidebar({
  className,
  isCollapsed,
  onToggle,
}: SprintSidebarProps) {
  const pathname = usePathname();
  const { unlocked, isLoaded: achievementsLoaded } = useAchievementContext();
  const { progress, isLoaded: progressLoaded } = useLocalProgress();
  const { data: session } = useSession();

  // Check enrollment status
  const userId = session?.user?.id;
  const hasEnrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollment,
    userId ? { userId: userId as any } : "skip"
  );

  const isEnrolled = hasEnrollment === true;

  const dayMatch = pathname.match(/\/day\/(\d+)/);
  const currentDay = dayMatch ? parseInt(dayMatch[1]) : null;

  // Calculate completed days from progress (based on checklist completion)
  const completedDays: number[] = [];
  if (progressLoaded) {
    // Check Day 0
    const day0Lesson = getLesson(0);
    const day0Checklist = progress.day0?.checklist || [];
    if (day0Lesson && day0Checklist.length >= day0Lesson.checklist.length) {
      completedDays.push(0);
    }

    // Check Day 1
    const day1Lesson = getLesson(1);
    const day1Checklist = progress.day1?.checklist || [];
    if (day1Lesson && day1Checklist.length >= day1Lesson.checklist.length) {
      completedDays.push(1);
    }
    // Days 2-7 completion would come from Convex for enrolled users
    // TODO: Integrate with sprintDayProgress for enrolled users
  }

  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / 8) * 100);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ease-out overflow-hidden",
        "bg-background border-r border-border/40",
        isCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-56",
        className
      )}
    >
      {/* Logo / Course Title */}
      <div className="p-4 border-b border-border/40">
        <Link href="/sprint" className="group flex items-center gap-3">
          <Image
            src="/assets/3dicons-flash-dynamic-color.png"
            alt=""
            width={36}
            height={36}
            className="shrink-0"
          />
          <div>
            <div className="font-display font-bold text-sm text-foreground">
              7-Day Sprint
            </div>
            <div className="text-xs text-muted-foreground">
              Build Your First Tool
            </div>
          </div>
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3 border-b border-border/40">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{completedCount}/8</span>
        </div>
        <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Achievements Link */}
      {achievementsLoaded && (
        <AchievementsLink
          unlockedIds={unlocked}
          completedDays={completedDays}
        />
      )}

      {/* Day Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        <div className="space-y-0.5">
          {DAYS.map(({ day, title, isFree }) => {
            const isActive = currentDay === day;

            // Determine if this day is accessible
            // - Free days (0-1): always accessible
            // - Paid days (2-7): only accessible if enrolled
            const isAccessible = isFree || isEnrolled;
            const isLocked = !isAccessible;

            const href = isFree
              ? `/sprint/preview/day/${day}`
              : `/sprint/day/${day}`;

            const isCompleted = completedDays.includes(day);
            const status: "locked" | "available" | "completed" = isCompleted
              ? "completed"
              : isLocked
                ? "locked"
                : "available";

            // For locked days, render as a non-clickable element with tooltip
            if (isLocked) {
              return (
                <div
                  key={day}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-md text-sm opacity-50 cursor-not-allowed"
                  title="Complete checkout to unlock"
                >
                  <span className="shrink-0">
                    <Lock className="size-4 text-muted-foreground" />
                  </span>

                  <span className="flex-1 truncate text-muted-foreground">
                    <span className="font-mono text-xs">{day}</span>
                    <span className="mx-1.5 opacity-30">·</span>
                    {title}
                  </span>

                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover border border-border rounded-md text-xs text-muted-foreground whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
                    Complete checkout to unlock
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={day}
                href={href}
                className={cn(
                  "group flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive && "bg-muted/60",
                  !isActive && "hover:bg-muted/40"
                )}
              >
                <span className="shrink-0">
                  {status === "completed" ? (
                    <CheckCircle2 className="size-4 text-success" />
                  ) : isActive ? (
                    <Circle className="size-4 text-accent fill-accent" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground/50" />
                  )}
                </span>

                <span
                  className={cn(
                    "flex-1 truncate",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  <span className="font-mono text-xs">{day}</span>
                  <span className="mx-1.5 opacity-30">·</span>
                  {title}
                </span>

                {isFree && !isEnrolled && (
                  <span className="text-[9px] font-medium uppercase tracking-wide text-success">
                    Free
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Upgrade CTA for non-enrolled users */}
      {!isEnrolled && hasEnrollment !== undefined && (
        <div className="px-3 pb-3">
          <Link
            href="/sprint/checkout"
            className="block w-full px-3 py-2 rounded-md bg-accent/10 text-accent text-sm text-center hover:bg-accent/20 transition-colors"
          >
            Unlock Full Sprint
          </Link>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 border-t border-border/40 space-y-3">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <button
            onClick={onToggle}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="size-4" />
          </button>
        </div>

        <div className="space-y-1">
          <a
            href="https://discord.gg/lemonbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            <MessageCircle className="size-3.5" />
            Discord
          </a>
          <a
            href="mailto:support@lemonbrand.io"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            <HelpCircle className="size-3.5" />
            Help
          </a>
        </div>
      </div>
    </aside>
  );
}

// Floating expand button when sidebar is collapsed
export function SidebarExpandButton({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all shadow-sm",
        className
      )}
      title="Expand sidebar"
    >
      <PanelLeft className="size-4" />
    </button>
  );
}
