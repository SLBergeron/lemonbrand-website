"use client";

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DotGridBackgroundProps {
  children: ReactNode;
  dotSize?: number;
  gap?: number;
  fade?: "top" | "bottom" | "both" | "none";
  animate?: boolean;
  className?: string;
  containerClassName?: string;
}

export function DotGridBackground({
  children,
  dotSize = 1,
  gap = 24,
  fade = "both",
  animate = true,
  className,
  containerClassName,
}: DotGridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [0, animate ? 50 : 0]);

  // Generate the gradient mask based on fade direction
  const getMaskGradient = () => {
    switch (fade) {
      case "top":
        return "linear-gradient(to bottom, transparent, black 20%)";
      case "bottom":
        return "linear-gradient(to bottom, black 80%, transparent)";
      case "both":
        return "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)";
      default:
        return "none";
    }
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
      {/* Dot grid pattern */}
      <motion.div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          className
        )}
        style={{
          y,
          backgroundImage: `radial-gradient(circle, currentColor ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          opacity: 0.07,
          maskImage: getMaskGradient(),
          WebkitMaskImage: getMaskGradient(),
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Variant with animated dots that pulse
interface AnimatedDotGridProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedDotGrid({ children, className }: AnimatedDotGridProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Base dots */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          opacity: 0.05,
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      {/* Animated highlight dots */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.02, 0.08, 0.02],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--accent)) 1.5px, transparent 1.5px)`,
          backgroundSize: "48px 48px",
          backgroundPosition: "12px 12px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
