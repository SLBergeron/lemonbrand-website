"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface MinimalVideoGridProps {
  maxVideos?: number;
  showTitle?: boolean;
}

export default function MinimalVideoGrid({
  maxVideos = 3,
  showTitle = true,
}: MinimalVideoGridProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/api/youtube-videos");
        const data = await response.json();
        setVideos(data.slice(0, maxVideos));
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, [maxVideos]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].slice(0, maxVideos).map((i) => (
          <div key={i} className="aspect-video bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  // Use single column for 1 video, otherwise responsive grid
  const gridClass = videos.length === 1
    ? ""
    : "grid grid-cols-1 md:grid-cols-3 gap-4";

  return (
    <div className={gridClass}>
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="relative aspect-video overflow-hidden bg-muted rounded-lg">
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={videos.length === 1 ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
            />
            {/* Clean play button - no dark overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                <svg
                  className="w-6 h-6 text-black ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          {showTitle && (
            <div className="mt-3">
              <p className="text-sm font-medium line-clamp-2 group-hover:text-accent transition-colors">
                {video.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {video.publishedAt}
              </p>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
