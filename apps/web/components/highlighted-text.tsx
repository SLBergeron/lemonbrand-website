"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlightedTextProps {
  children: string;
  color?: string;
  animate?: boolean;
  delay?: number;
  className?: string;
}

export function HighlightedText({
  children,
  color,
  animate = true,
  delay = 0,
  className,
}: HighlightedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={cn("relative inline", className)}>
      {/* Highlight background */}
      <motion.span
        className="absolute inset-0 -z-10"
        style={{
          background: color || "hsl(var(--accent) / 0.2)",
          borderRadius: "2px",
          padding: "0 4px",
          margin: "0 -4px",
        }}
        initial={animate ? { scaleX: 0, originX: 0 } : { scaleX: 1 }}
        animate={animate && isInView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Text */}
      <span className="relative">{children}</span>
    </span>
  );
}

// Variant with underline effect instead of highlight
interface UnderlineTextProps {
  children: string;
  color?: string;
  animate?: boolean;
  delay?: number;
  thickness?: number;
  className?: string;
}

export function UnderlineText({
  children,
  color,
  animate = true,
  delay = 0,
  thickness = 2,
  className,
}: UnderlineTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={cn("relative inline", className)}>
      {/* Underline */}
      <motion.span
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: color || "hsl(var(--accent))",
          height: thickness,
        }}
        initial={animate ? { scaleX: 0, originX: 0 } : { scaleX: 1 }}
        animate={animate && isInView ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      {/* Text */}
      <span className="relative">{children}</span>
    </span>
  );
}

// Gradient highlight variant
interface GradientHighlightProps {
  children: string;
  from?: string;
  to?: string;
  animate?: boolean;
  delay?: number;
  className?: string;
}

export function GradientHighlight({
  children,
  from = "hsl(var(--accent))",
  to = "hsl(var(--primary))",
  animate = true,
  delay = 0,
  className,
}: GradientHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={cn("relative inline", className)}
      initial={animate ? { opacity: 0.5 } : {}}
      animate={animate && isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      style={{
        background: `linear-gradient(90deg, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </motion.span>
  );
}
