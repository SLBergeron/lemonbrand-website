"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconBox3DProps {
  icon: LucideIcon;
  color?: "accent" | "primary" | "success" | "default";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
}

export function IconBox3D({
  icon: Icon,
  color = "accent",
  size = "md",
  animate = true,
  className,
}: IconBox3DProps) {
  const sizes = {
    sm: {
      box: "w-10 h-10",
      icon: "w-5 h-5",
      shadow: "translate-y-1 translate-x-0.5",
    },
    md: {
      box: "w-12 h-12",
      icon: "w-6 h-6",
      shadow: "translate-y-1.5 translate-x-0.5",
    },
    lg: {
      box: "w-16 h-16",
      icon: "w-8 h-8",
      shadow: "translate-y-2 translate-x-1",
    },
  };

  const colors = {
    accent: {
      bg: "bg-accent",
      text: "text-accent-foreground",
      shadow: "bg-accent/30",
    },
    primary: {
      bg: "bg-primary",
      text: "text-primary-foreground",
      shadow: "bg-primary/30",
    },
    success: {
      bg: "bg-success",
      text: "text-success-foreground",
      shadow: "bg-success/30",
    },
    default: {
      bg: "bg-muted",
      text: "text-muted-foreground",
      shadow: "bg-muted-foreground/20",
    },
  };

  const s = sizes[size];
  const c = colors[color];

  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={animate ? { y: -2 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* 3D Shadow layer */}
      <div
        className={cn(
          "absolute rounded-lg",
          s.box,
          s.shadow,
          c.shadow
        )}
      />

      {/* Main icon box */}
      <motion.div
        className={cn(
          "relative rounded-lg flex items-center justify-center",
          s.box,
          c.bg
        )}
        whileHover={animate ? { scale: 1.05 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Icon className={cn(s.icon, c.text)} />
      </motion.div>
    </motion.div>
  );
}

// Floating animated version
interface FloatingIconProps {
  icon: LucideIcon;
  color?: "accent" | "primary" | "success" | "default";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FloatingIcon({
  icon: Icon,
  color = "accent",
  size = "md",
  className,
}: FloatingIconProps) {
  const sizes = {
    sm: { box: "w-10 h-10", icon: "w-5 h-5" },
    md: { box: "w-12 h-12", icon: "w-6 h-6" },
    lg: { box: "w-16 h-16", icon: "w-8 h-8" },
  };

  const colors = {
    accent: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/20" },
    primary: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
    success: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
    default: { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" },
  };

  const s = sizes[size];
  const c = colors[color];

  return (
    <motion.div
      className={cn(
        "relative rounded-xl flex items-center justify-center border",
        s.box,
        c.bg,
        c.border,
        className
      )}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Icon className={cn(s.icon, c.text)} />
    </motion.div>
  );
}

// Icon with glow effect
interface GlowIconProps {
  icon: LucideIcon;
  color?: "accent" | "primary" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GlowIcon({
  icon: Icon,
  color = "accent",
  size = "md",
  className,
}: GlowIconProps) {
  const sizes = {
    sm: { box: "w-10 h-10", icon: "w-5 h-5" },
    md: { box: "w-12 h-12", icon: "w-6 h-6" },
    lg: { box: "w-16 h-16", icon: "w-8 h-8" },
  };

  const colors = {
    accent: {
      bg: "bg-accent",
      text: "text-accent-foreground",
      glow: "shadow-[0_0_20px_hsl(var(--accent)/0.5)]",
    },
    primary: {
      bg: "bg-primary",
      text: "text-primary-foreground",
      glow: "shadow-[0_0_20px_hsl(var(--primary)/0.5)]",
    },
    success: {
      bg: "bg-success",
      text: "text-success-foreground",
      glow: "shadow-[0_0_20px_hsl(var(--success)/0.5)]",
    },
  };

  const s = sizes[size];
  const c = colors[color];

  return (
    <motion.div
      className={cn(
        "rounded-xl flex items-center justify-center",
        s.box,
        c.bg,
        c.glow,
        className
      )}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <Icon className={cn(s.icon, c.text)} />
    </motion.div>
  );
}

// Category icon with label
interface CategoryIconProps {
  icon: LucideIcon;
  label: string;
  color?: "accent" | "primary" | "success" | "default";
  className?: string;
}

export function CategoryIcon({
  icon: Icon,
  label,
  color = "accent",
  className,
}: CategoryIconProps) {
  const colors = {
    accent: { bg: "bg-accent/10", text: "text-accent" },
    primary: { bg: "bg-primary/10", text: "text-primary" },
    success: { bg: "bg-success/10", text: "text-success" },
    default: { bg: "bg-muted", text: "text-muted-foreground" },
  };

  const c = colors[color];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <motion.div
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center",
          c.bg
        )}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Icon className={cn("w-7 h-7", c.text)} />
      </motion.div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}
