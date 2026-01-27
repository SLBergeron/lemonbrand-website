"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewportOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Hook to detect when an element enters the viewport
 * 
 * @param options - Configuration options
 * @returns Object with ref and isInView state
 * 
 * @example
 * const { ref, isInView } = useInViewport<HTMLDivElement>({ once: true });
 * return <div ref={ref}>{isInView && 'Visible!'}</div>;
 */
export function useInViewport<T extends HTMLElement = HTMLElement>(options: UseInViewportOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = false,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If once is true and we've already been in view, don't set up observer
    if (once && hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && once) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, hasBeenInView]);

  return { ref, isInView };
}