"use client";

import { useState, useEffect } from "react";

export type OS = "mac" | "windows" | "linux" | "unknown";

export function useOS(): { os: OS; setOS: (os: OS) => void } {
  const [os, setOS] = useState<OS>("unknown");

  useEffect(() => {
    // Check if there's a saved preference
    const saved = localStorage.getItem("preferred-os") as OS | null;
    if (saved && ["mac", "windows", "linux"].includes(saved)) {
      setOS(saved);
      return;
    }

    // Auto-detect from navigator
    if (typeof window !== "undefined" && navigator.platform) {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();

      if (platform.includes("mac") || userAgent.includes("mac")) {
        setOS("mac");
      } else if (platform.includes("win") || userAgent.includes("windows")) {
        setOS("windows");
      } else if (platform.includes("linux") || userAgent.includes("linux")) {
        setOS("linux");
      } else {
        // Default to mac for unknown (most common for Claude Code users)
        setOS("mac");
      }
    }
  }, []);

  const handleSetOS = (newOS: OS) => {
    setOS(newOS);
    localStorage.setItem("preferred-os", newOS);
  };

  return { os, setOS: handleSetOS };
}
