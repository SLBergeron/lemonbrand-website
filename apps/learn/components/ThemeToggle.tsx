"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@lemonbrand/ui";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch - show placeholder
    return (
      <button
        className={cn(
          "relative size-9 rounded-full bg-muted/50 flex items-center justify-center",
          className
        )}
        aria-label="Toggle theme"
      >
        <div className="size-4 bg-muted-foreground/20 rounded-full animate-pulse" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative size-9 rounded-full transition-all duration-300",
        "bg-gradient-to-br",
        isDark
          ? "from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800"
          : "from-amber-100 to-orange-100 hover:from-amber-50 hover:to-orange-50",
        "border",
        isDark ? "border-slate-700/50" : "border-amber-200/50",
        "shadow-sm hover:shadow-md",
        isDark ? "hover:shadow-accent/10" : "hover:shadow-amber-300/30",
        className
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon */}
      <Sun
        className={cn(
          "absolute inset-0 m-auto size-4 transition-all duration-300",
          isDark
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100 text-amber-600"
        )}
      />
      {/* Moon icon */}
      <Moon
        className={cn(
          "absolute inset-0 m-auto size-4 transition-all duration-300",
          isDark
            ? "opacity-100 rotate-0 scale-100 text-slate-300"
            : "opacity-0 -rotate-90 scale-0"
        )}
      />

      {/* Subtle glow effect on hover */}
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100",
          isDark
            ? "bg-gradient-to-br from-accent/20 to-transparent"
            : "bg-gradient-to-br from-amber-300/30 to-transparent"
        )}
      />
    </button>
  );
}
