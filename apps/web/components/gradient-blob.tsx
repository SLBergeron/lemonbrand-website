"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBlobProps {
  colors?: string[];
  blur?: number;
  opacity?: number;
  animate?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GradientBlob({
  colors = ["hsl(var(--accent))", "hsl(var(--primary))", "hsl(var(--success))"],
  blur = 100,
  opacity = 0.15,
  animate = true,
  position = "top-right",
  size = "md",
  className,
}: GradientBlobProps) {
  const getPositionStyles = () => {
    switch (position) {
      case "top-left":
        return { top: "-20%", left: "-10%" };
      case "top-right":
        return { top: "-20%", right: "-10%" };
      case "bottom-left":
        return { bottom: "-20%", left: "-10%" };
      case "bottom-right":
        return { bottom: "-20%", right: "-10%" };
      case "center":
        return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
      default:
        return { top: "-20%", right: "-10%" };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { width: "300px", height: "300px" };
      case "md":
        return { width: "500px", height: "500px" };
      case "lg":
        return { width: "700px", height: "700px" };
      default:
        return { width: "500px", height: "500px" };
    }
  };

  return (
    <div
      className={cn("pointer-events-none absolute overflow-hidden", className)}
      style={{
        ...getPositionStyles(),
        ...getSizeStyles(),
        filter: `blur(${blur}px)`,
        opacity,
      }}
    >
      {/* Multiple overlapping blobs */}
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: "100%",
            height: "100%",
            top: `${i * 10}%`,
            left: `${i * 10}%`,
          }}
          animate={
            animate
              ? {
                  scale: [1, 1.1, 1],
                  x: [0, i % 2 === 0 ? 20 : -20, 0],
                  y: [0, i % 2 === 0 ? -20 : 20, 0],
                }
              : {}
          }
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}

// Simplified version for subtle background effects
interface SubtleGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function SubtleGradientBackground({
  children,
  className,
}: SubtleGradientProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <GradientBlob
        position="top-right"
        size="lg"
        opacity={0.1}
        blur={120}
        colors={["hsl(var(--accent))", "hsl(var(--primary))"]}
      />
      <GradientBlob
        position="bottom-left"
        size="md"
        opacity={0.08}
        blur={100}
        colors={["hsl(var(--primary))", "hsl(var(--success))"]}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// CTA-specific gradient with animated shift
interface AnimatedCTABackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCTABackground({
  children,
  className,
}: AnimatedCTABackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
