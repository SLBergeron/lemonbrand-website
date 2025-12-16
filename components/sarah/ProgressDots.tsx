"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
  completed: number[];
}

export function ProgressDots({ total, current, completed }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        const isCompleted = completed.includes(index);
        const isPast = index < current;

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              scale: isActive ? 1.3 : 1,
              backgroundColor: isCompleted || isPast
                ? "#22c55e" // green-500
                : isActive
                ? "#f97316" // orange-500
                : "#e5e5e5", // neutral-200
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              isActive && "ring-4 ring-orange-500/20"
            )}
          />
        );
      })}
    </div>
  );
}
