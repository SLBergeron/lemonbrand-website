"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  from?: number;
  className?: string;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  decimals = 0,
  from = 0,
  className,
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(from, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) => {
    const formatted = current.toFixed(decimals);
    // Add commas for thousands
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// Variant for before/after display with strikethrough
interface BeforeAfterCounterProps {
  before: number;
  after: number;
  beforePrefix?: string;
  afterPrefix?: string;
  beforeSuffix?: string;
  afterSuffix?: string;
  duration?: number;
  className?: string;
}

export function BeforeAfterCounter({
  before,
  after,
  beforePrefix = "",
  afterPrefix = "",
  beforeSuffix = "",
  afterSuffix = "",
  duration = 2,
  className,
}: BeforeAfterCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={cn("flex items-center gap-3", className)}>
      <motion.span
        className="text-muted-foreground line-through"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        {beforePrefix}
        {before.toLocaleString()}
        {beforeSuffix}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-muted-foreground"
      >
        →
      </motion.span>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="font-semibold text-accent"
      >
        <AnimatedCounter
          value={after}
          prefix={afterPrefix}
          suffix={afterSuffix}
          duration={duration}
        />
      </motion.span>
    </div>
  );
}
