"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Link as LinkTransition } from "next-view-transitions";

export const Button = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "accent";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
  | React.ComponentProps<typeof LinkTransition>
)) => {
  const baseStyles =
    "px-5 py-2.5 rounded-sm text-sm font-medium tracking-wide relative cursor-pointer transition-all duration-200 ease-out inline-flex items-center justify-center text-center";

  const variantStyles = {
    // Premium primary - deep charcoal with lift
    primary:
      "bg-primary text-primary-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0",
    // Secondary - subtle, outlined
    secondary:
      "bg-transparent border border-border text-foreground hover:border-foreground hover:bg-muted/50 dark:hover:bg-muted/30",
    // Dark - inverted
    dark:
      "bg-foreground text-background shadow-[0_2px_0_0_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0",
    // Accent - amber/gold with glow
    accent:
      "bg-accent text-accent-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,140,30,0.3)] active:translate-y-0",
  };

  const Component = Tag as React.ElementType;
  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
