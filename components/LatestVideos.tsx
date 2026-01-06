"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface LatestVideosProps {
  count?: number;
  showDescription?: boolean;
}

export function LatestVideos({ count = 3, showDescription = true }: LatestVideosProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/youtube-videos');
        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        }
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        // Fallback to manual video if fetch fails
        setVideos([
          {
            id: "nMA53BV5MLM",
            title: "Building AI Agent Businesses - The Real Story",
            thumbnail: "https://img.youtube.com/vi/nMA53BV5MLM/maxresdefault.jpg",
            publishedAt: "2 weeks ago",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  const displayVideos = videos.slice(0, count);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Latest Videos
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
                <div className="mt-3 h-4 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayVideos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Latest Videos
          </h2>
          {showDescription && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Watch me build things in real-time. No editing, no fake expertise - just documenting what I&apos;m learning.
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {displayVideos.map((video) => (
            <Link
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center group-hover:scale-110 transition-all">
                    <Play className="w-8 h-8 text-neutral-900 fill-neutral-900 ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {video.publishedAt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={SOCIAL_LINKS.YOUTUBE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium group"
          >
            See all videos on YouTube
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
