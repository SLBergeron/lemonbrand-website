"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useProgress } from "../providers/progress-provider";
import {
  IconBook,
  IconTrophy,
  IconClock,
  IconFlame,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}

interface StatCardProps {
  icon: typeof IconBook;
  label: string;
  value: string | number;
  subtext?: string;
  colorClass: string;
  delay: number;
}

function StatCard({ icon: Icon, label, value, subtext, colorClass, delay }: StatCardProps) {
  const isNumeric = typeof value === "number";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-5 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-100 dark:hover:shadow-neutral-900/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", colorClass)}>
          <Icon className="w-5 h-5" />
        </div>
        {subtext && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
            {subtext}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {isNumeric ? <Counter value={value} /> : value}
        </p>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function OverviewStats() {
  const {
    modulesCompleted,
    totalLessons,
    lessonsCompleted,
    badgesEarned,
    totalTimeMinutes,
    currentStreak,
  } = useProgress();

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={IconBook}
        label="Lessons Done"
        value={lessonsCompleted}
        subtext={`${Math.round((lessonsCompleted / (totalLessons || 1)) * 100)}%`}
        colorClass="bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/30"
        delay={0}
      />
      <StatCard
        icon={IconTrophy}
        label="Badges"
        value={badgesEarned}
        colorClass="bg-yellow-50 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-500/30"
        delay={0.1}
      />
      <StatCard
        icon={IconClock}
        label="Focus Time"
        value={formatTime(totalTimeMinutes)}
        colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/30"
        delay={0.2}
      />
      <StatCard
        icon={IconFlame}
        label="Day Streak"
        value={currentStreak}
        colorClass="bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/30"
        delay={0.3}
      />
    </div>
  );
}
