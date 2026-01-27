"use client";

import { Badge, Button } from "@lemonbrand/ui";
import { Clock, ChevronRight, ChevronDown, Lock, Play } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson } from "@/lib/lessons";
import { SectionRenderer, SectionDivider } from "./lesson";
import { LessonChecklist } from "./LessonChecklist";
import { TrialCTA } from "./TrialCTA";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { useAchievementContext } from "@/context/AchievementContext";
import { BlitzModeMessage } from "./achievements";
import { isBlitzModeEligible } from "@/lib/achievements";
import { useState, useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { useQuery } from "convex/react";
import { api } from "@lemonbrand/convex/client";

interface LessonPageProps {
  day: number;
  isPreview: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function LessonPage({ day, isPreview }: LessonPageProps) {
  const { getDayProgress, toggleChecklistItem, recordDayStart, markDayComplete, progress: localProgress } = useLocalProgress();
  const {
    recordDayStart: recordAchievementDayStart,
    recordDayAccess,
    recordScrollTime,
    checkAllConditions,
    progress: achievementProgress,
    isLoaded: achievementsLoaded,
  } = useAchievementContext();
  const lesson = getLesson(day);
  const pageLoadTime = useRef(Date.now());
  const hasRecordedScroll = useRef(false);

  // Check enrollment status
  const { data: session } = useSession();
  const betterAuthId = session?.user?.id;
  const hasEnrollment = useQuery(
    api.sprintEnrollments.hasActiveEnrollmentByAuthId,
    betterAuthId ? { betterAuthId } : "skip"
  );
  const isEnrolled = hasEnrollment === true;

  // Track if user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showBlitzMode, setShowBlitzMode] = useState(false);

  const dayProgress = getDayProgress(day as 0 | 1);
  const completedItems = dayProgress?.checklist || [];
  const totalItems = lesson?.checklist.length || 0;
  const progressPercent = totalItems > 0
    ? Math.round((completedItems.length / totalItems) * 100)
    : 0;

  // Record day start on first visit
  useEffect(() => {
    if (!lesson) return;
    if (isPreview && (day === 0 || day === 1)) {
      recordDayStart(day as 0 | 1);
    }
    // Record for achievement tracking
    if (day === 0) {
      recordAchievementDayStart(0);
    }
    if (day === 2) {
      recordDayAccess(2);
    }
  }, [day, isPreview, lesson, recordDayStart, recordAchievementDayStart, recordDayAccess]);

  // Check for blitz mode eligibility on Day 2
  useEffect(() => {
    if (day === 2 && achievementsLoaded) {
      const isEligible = isBlitzModeEligible(achievementProgress);
      setShowBlitzMode(isEligible);
    }
  }, [day, achievementsLoaded, achievementProgress]);

  // Track scroll for scroll indicator
  useEffect(() => {
    if (!lesson) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }

      // Track scroll to bottom for speed reader achievement
      if (!hasRecordedScroll.current) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
          const scrollTime = Date.now() - pageLoadTime.current;
          recordScrollTime(day, scrollTime);
          hasRecordedScroll.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [day, lesson, recordScrollTime]);

  // Mark day complete and check achievements when checklist hits 100%
  useEffect(() => {
    if (!lesson) return;
    if (!achievementsLoaded) return;
    if (progressPercent !== 100) return;

    // Mark the current day as complete if not already
    const currentDayProgress = localProgress[`day${day}` as "day0" | "day1"];
    if (isPreview && (day === 0 || day === 1) && !currentDayProgress?.completedAt) {
      markDayComplete(day as 0 | 1);
    }

    // Use current time for completion timestamp (for time-based achievements)
    const now = Date.now();

    // Build context for achievement checking
    const completedDays: number[] = [];
    const dayProgressMap: Record<number, { completedAt?: number; checklistComplete: boolean }> = {};

    // Check each day's completion status
    [0, 1].forEach((d) => {
      const p = localProgress[`day${d}` as "day0" | "day1"];
      const lessonForDay = getLesson(d);
      const isChecklistComplete = lessonForDay
        ? (p?.checklist?.length || 0) >= lessonForDay.checklist.length
        : false;

      if (isChecklistComplete) {
        completedDays.push(d);
      }

      dayProgressMap[d] = {
        // Use existing completedAt, or current time if this is the day we just completed
        completedAt: p?.completedAt || (d === day && isChecklistComplete ? now : undefined),
        checklistComplete: isChecklistComplete,
      };
    });

    // Check all achievement conditions
    checkAllConditions({
      completedDays,
      dayProgress: dayProgressMap,
      currentDay: day,
    });
  }, [progressPercent, achievementsLoaded, localProgress, lesson, day, isPreview, markDayComplete, checkAllConditions]);

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h1 className="font-display text-2xl font-bold mb-3">
          Day {day} Coming Soon
        </h1>
        <p className="text-muted-foreground">
          This lesson is being prepared.
        </p>
      </div>
    );
  }

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-24 lg:pb-12"
    >
      {/* Header */}
      <motion.header variants={itemVariants} className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Badge variant="accent" className="font-mono">
            Day {day}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="size-3.5" />
            {lesson.duration} min
          </span>
          {isPreview && !isEnrolled && (
            <Badge variant="success" className="text-xs">
              Free
            </Badge>
          )}
        </div>

        <h1 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-4">
          {lesson.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          {lesson.subtitle}
        </p>
      </motion.header>

      {/* Blitz Mode Message (Day 2 only) */}
      {showBlitzMode && day === 2 && (
        <motion.div variants={itemVariants}>
          <BlitzModeMessage />
        </motion.div>
      )}

      {/* Objectives */}
      <motion.section variants={itemVariants} className="mb-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-6">
          By the end of today
        </h2>
        <ul className="space-y-3">
          {lesson.objectives.map((objective, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="size-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
              <span className="text-foreground">{objective}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Video Placeholder */}
      <motion.section variants={itemVariants} className="mb-20">
        <div className="aspect-video rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center">
          <div className="text-center">
            <div className="size-14 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
              <Play className="size-6 text-muted-foreground ml-0.5" />
            </div>
            <p className="text-sm text-muted-foreground">Video coming soon</p>
          </div>
        </div>
      </motion.section>

      <SectionDivider />

      {/* Lesson Sections */}
      <div className="space-y-16">
        {lesson.sections.map((section) => (
          <motion.div key={section.id} variants={itemVariants}>
            <SectionRenderer
              section={section}
              isPreview={isPreview}
              day={day}
            />
          </motion.div>
        ))}
      </div>

      <SectionDivider className="my-16" />

      {/* Checklist */}
      <motion.div variants={itemVariants}>
        <LessonChecklist
          items={lesson.checklist}
          completedItems={completedItems}
          onToggle={(itemId) => {
            if (isPreview && (day === 0 || day === 1)) {
              toggleChecklistItem(day as 0 | 1, itemId);
            }
          }}
          disabled={!isPreview}
        />
      </motion.div>

      {/* Progress */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between py-6 mt-10 border-t border-border/50"
      >
        <div>
          <div className="font-display font-semibold">
            {completedItems.length}/{totalItems} done
          </div>
          <div className="text-sm text-muted-foreground">
            {progressPercent === 100
              ? "Ready for next day"
              : `${progressPercent}% complete`}
          </div>
        </div>
        <div className="w-24 h-1.5 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="h-full rounded-full bg-accent"
          />
        </div>
      </motion.div>

      {/* Next Day Teaser */}
      {lesson.nextDayTeaser && (
        <motion.p
          variants={itemVariants}
          className="text-sm text-muted-foreground mt-6"
        >
          <span className="font-medium text-foreground">Tomorrow: </span>
          {lesson.nextDayTeaser}
        </motion.p>
      )}

      {/* Trial CTA - hide for enrolled users */}
      {isPreview && day === 1 && !isEnrolled && (
        <motion.div variants={itemVariants} className="mt-16">
          <TrialCTA />
        </motion.div>
      )}

      {/* Navigation */}
      {day < 7 && (
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center pt-10 mt-10 border-t border-border/50"
        >
          {day > 0 ? (
            <Button variant="ghost" asChild size="sm">
              <Link
                href={
                  isEnrolled
                    ? `/sprint/day/${day - 1}`
                    : day <= 1
                      ? `/sprint/preview/day/${day - 1}`
                      : `/sprint/day/${day - 1}`
                }
              >
                <ChevronRight className="size-4 rotate-180 mr-1" />
                Day {day - 1}
              </Link>
            </Button>
          ) : (
            <div />
          )}

          <Button asChild variant="accent">
            {day === 1 && isPreview && !isEnrolled ? (
              <Link href="/sprint/checkout">
                Unlock Full Course
                <Lock className="size-4 ml-2" />
              </Link>
            ) : (
              <Link
                href={
                  isEnrolled
                    ? `/sprint/day/${day + 1}`
                    : day < 1
                      ? `/sprint/preview/day/${day + 1}`
                      : `/sprint/day/${day + 1}`
                }
              >
                Day {day + 1}
                <ChevronRight className="size-4 ml-1" />
              </Link>
            )}
          </Button>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-40"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="size-5 text-muted-foreground/40" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
