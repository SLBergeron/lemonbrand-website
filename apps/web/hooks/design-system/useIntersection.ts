"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseIntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
  callback?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}

/**
 * Hook to track element intersection with viewport
 * More flexible than useInViewport with callback support
 * 
 * @param options - Configuration options
 * @returns Ref object to attach to element
 * 
 * @example
 * const ref = useIntersection({
 *   threshold: 0.5,
 *   once: true,
 *   callback: (isIntersecting) => {
 *     if (isIntersecting) {
 *       // Element is in view
 *     }
 *   }
 * });
 * return <div ref={ref}>Content</div>;
 */
export function useIntersection(options: UseIntersectionOptions = {}): RefObject<HTMLElement> {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    root = null,
    once = false,
    callback,
  } = options;

  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If once is true and we've already intersected, don't set up observer
    if (once && hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (callback) {
          callback(isIntersecting, entry);
        }

        if (isIntersecting && once) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, once, hasIntersected, callback]);

  return ref;
}

