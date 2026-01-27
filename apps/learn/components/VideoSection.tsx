"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoSectionProps {
  videoUrl: string;
  onWatched?: () => void;
}

export function VideoSection({ videoUrl, onWatched }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract YouTube video ID for thumbnail
  const getYouTubeId = (url: string): string | null => {
    const match = url.match(/embed\/([^?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handlePlay = () => {
    setIsPlaying(true);
    // Mark as watched after a delay (simulating watch time)
    setTimeout(() => {
      onWatched?.();
    }, 5000);
  };

  if (!videoUrl) {
    return null;
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-card border border-border/50 aspect-video">
      {!isPlaying ? (
        // Thumbnail with play button
        <button
          onClick={handlePlay}
          className="absolute inset-0 group"
          aria-label="Play video"
        >
          {/* Thumbnail */}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 lg:size-20 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="size-8 lg:size-10 text-accent-foreground fill-current ml-1" />
            </div>
          </div>
        </button>
      ) : (
        // YouTube embed
        <iframe
          src={`${videoUrl}?autoplay=1&rel=0`}
          title="Lesson video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}
