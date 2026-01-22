"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
  step?: string;
  media?: React.ReactNode;
  glowColor?: string;
}

export const FeatureCard = ({
  children,
  className,
  step,
  media,
  glowColor = "accent",
}: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Glow color mapping
  const glowColors: Record<string, string> = {
    accent: "hsl(var(--accent) / 0.15)",
    primary: "hsl(var(--primary) / 0.1)",
    success: "hsl(var(--success) / 0.12)",
  };

  const glowBg = glowColors[glowColor] || glowColors.accent;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-2xl overflow-hidden",
        "bg-card border border-border/60",
        "transition-all duration-300",
        "hover:border-border hover:shadow-lg",
        className
      )}
    >
      {/* Spotlight gradient that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) =>
              `radial-gradient(400px circle at ${x}px ${y}px, ${glowBg}, transparent 60%)`
          ),
        }}
      />

      {/* Border glow on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          "bg-gradient-to-br from-transparent via-transparent to-transparent",
          glowColor === "accent" && "group-hover:shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.2)]",
          glowColor === "primary" && "group-hover:shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]",
          glowColor === "success" && "group-hover:shadow-[inset_0_0_0_1px_hsl(var(--success)/0.2)]"
        )}
      />

      {/* Step number watermark */}
      {step && (
        <div className="absolute top-4 right-4 text-6xl font-display font-bold text-muted-foreground/10 pointer-events-none select-none transition-colors duration-300 group-hover:text-muted-foreground/15">
          {step}
        </div>
      )}

      {/* Optional media that fades in on hover */}
      {media && (
        <div className="absolute right-0 top-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {media}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
