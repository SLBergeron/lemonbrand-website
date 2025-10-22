"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LazyVideoProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
};

export function LazyVideo({
  src,
  poster,
  autoPlay = false,
  className,
  onPlay,
  onPause,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { rootMargin: "100px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Handle auto-play when revealed
  useEffect(() => {
    if (!videoRef.current || !isLoaded) return;

    if (autoPlay) {
      videoRef.current.play().catch((error) => {
        console.warn("Auto-play failed:", error);
      });
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [autoPlay, isLoaded]);

  return (
    <video
      ref={videoRef}
      className={cn("h-full w-full object-cover object-center", className)}
      poster={poster}
      loop
      muted
      playsInline
      preload={isInView ? "auto" : "metadata"}
      onLoadedData={() => setIsLoaded(true)}
      onPlay={onPlay}
      onPause={onPause}
    >
      {isInView && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
}
