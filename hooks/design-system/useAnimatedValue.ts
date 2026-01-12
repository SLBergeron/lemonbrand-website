"use client";

import { useEffect, useState } from "react";
import { useSpring, useTransform } from "framer-motion";

interface UseAnimatedValueOptions {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  enabled?: boolean;
  format?: (value: number) => string;
}

/**
 * Hook to animate a numeric value using framer-motion
 * 
 * @param options - Animation configuration
 * @returns Animated value as a MotionValue that can be used with motion components
 * 
 * @example
 * const animatedValue = useAnimatedValue({ from: 0, to: 100, duration: 2000 });
 * // Use with motion.span: <motion.span>{useTransform(animatedValue, (v) => v.toFixed(0))}</motion.span>
 */
export function useAnimatedValue(options: UseAnimatedValueOptions) {
  const {
    from,
    to,
    duration = 2000,
    delay = 0,
    enabled = true,
    format,
  } = options;

  const [hasStarted, setHasStarted] = useState(false);

  const spring = useSpring(from, {
    stiffness: 50,
    damping: 30,
    duration: duration / 1000, // Convert to seconds
  });

  useEffect(() => {
    if (enabled && !hasStarted) {
      const timer = setTimeout(() => {
        spring.set(to);
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [enabled, hasStarted, spring, to, delay]);

  const display = useTransform(spring, (current) => {
    if (format) {
      return format(current);
    }
    return current;
  });

  return { spring, display, value: spring };
}

