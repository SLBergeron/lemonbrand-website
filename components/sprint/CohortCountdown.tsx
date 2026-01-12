"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// First Monday of February 2026, then every 2 weeks
const FIRST_COHORT = new Date("2026-02-02T09:00:00");
const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

function getNextCohortDate(): Date {
  const now = new Date();

  // If before first cohort, return first cohort date
  if (now < FIRST_COHORT) {
    return FIRST_COHORT;
  }

  // Calculate how many 2-week periods have passed since first cohort
  const timeSinceFirst = now.getTime() - FIRST_COHORT.getTime();
  const periodsPassed = Math.floor(timeSinceFirst / TWO_WEEKS_MS);

  // Next cohort is the next period
  const nextCohort = new Date(
    FIRST_COHORT.getTime() + (periodsPassed + 1) * TWO_WEEKS_MS
  );

  return nextCohort;
}

function formatCohortName(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold font-mono text-foreground tabular-nums">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function CohortCountdown({ className }: { className?: string }) {
  const [nextCohort, setNextCohort] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const cohortDate = getNextCohortDate();
    setNextCohort(cohortDate);
    setTimeLeft(calculateTimeLeft(cohortDate));

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(cohortDate);
      setTimeLeft(newTimeLeft);

      // If countdown finished, recalculate next cohort
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        const newCohort = getNextCohortDate();
        setNextCohort(newCohort);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!nextCohort || !timeLeft) {
    return (
      <div className={cn("", className)}>
        <p className="text-xs text-muted-foreground">Next cohort</p>
        <p className="font-medium text-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">Next cohort</p>
        <p className="text-xs font-medium text-accent">
          {formatCohortName(nextCohort)}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 py-2 px-3 bg-muted/50 rounded-lg">
        <CountdownUnit value={timeLeft.days} label="days" />
        <span className="text-muted-foreground/50 font-mono">:</span>
        <CountdownUnit value={timeLeft.hours} label="hrs" />
        <span className="text-muted-foreground/50 font-mono">:</span>
        <CountdownUnit value={timeLeft.minutes} label="min" />
        <span className="text-muted-foreground/50 font-mono">:</span>
        <CountdownUnit value={timeLeft.seconds} label="sec" />
      </div>
    </div>
  );
}
