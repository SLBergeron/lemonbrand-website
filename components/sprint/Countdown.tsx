"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO date string
  className?: string;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "days" },
    { value: timeLeft.hours, label: "hours" },
    { value: timeLeft.minutes, label: "min" },
    { value: timeLeft.seconds, label: "sec" },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 sm:w-20 h-14 sm:h-20 rounded-lg bg-card border border-border flex items-center justify-center">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground mt-2">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
