"use client";

import { useState, useEffect, useCallback } from "react";

const VISITOR_ID_KEY = "lemonbrand-visitor-id";

/**
 * Generate a UUID v4
 */
function generateUUID(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get the visitor ID from localStorage, or generate a new one
 * This is a utility function that can be used outside of React components
 */
export function getVisitorId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    let visitorId = localStorage.getItem(VISITOR_ID_KEY);

    if (!visitorId) {
      visitorId = generateUUID();
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    }

    return visitorId;
  } catch {
    // localStorage not available (private browsing, etc.)
    return null;
  }
}

/**
 * Hook to access the visitor ID in React components
 * Generates a UUID on first visit and persists to localStorage
 */
export function useVisitorId() {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = getVisitorId();
    setVisitorId(id);
    setIsLoaded(true);
  }, []);

  const clearVisitorId = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(VISITOR_ID_KEY);
      setVisitorId(null);
    } catch {
      // Ignore errors
    }
  }, []);

  return {
    visitorId,
    isLoaded,
    clearVisitorId,
  };
}
