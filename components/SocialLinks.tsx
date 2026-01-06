"use client";

import Link from "next/link";
import { Youtube, Twitter, Mail, Github } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { SOCIAL_LINKS, SOCIAL_DESCRIPTIONS, SOCIAL_COUNTS } from "@/constants/links";

type SocialPlatform = "youtube" | "tiktok" | "twitter" | "newsletter" | "github";

interface SocialLinksProps {
  variant?: "full" | "compact" | "icons-only";
  channels?: SocialPlatform[];
  showCounts?: boolean;
  className?: string;
}

const platformIcons = {
  youtube: Youtube,
  tiktok: TikTokIcon,
  twitter: Twitter,
  newsletter: Mail,
  github: Github,
};

const platformData: Record<SocialPlatform, {
  url: string;
  handle: string;
  description: string;
  count?: number;
  countLabel?: string;
}> = {
  youtube: {
    url: SOCIAL_LINKS.YOUTUBE,
    handle: SOCIAL_LINKS.YOUTUBE_HANDLE,
    description: SOCIAL_DESCRIPTIONS.YOUTUBE,
    count: SOCIAL_COUNTS.YOUTUBE_SUBS,
    countLabel: "subscribers",
  },
  tiktok: {
    url: SOCIAL_LINKS.TIKTOK,
    handle: SOCIAL_LINKS.TIKTOK_HANDLE,
    description: SOCIAL_DESCRIPTIONS.TIKTOK,
  },
  twitter: {
    url: SOCIAL_LINKS.TWITTER,
    handle: SOCIAL_LINKS.TWITTER_HANDLE,
    description: SOCIAL_DESCRIPTIONS.TWITTER,
  },
  newsletter: {
    url: SOCIAL_LINKS.NEWSLETTER,
    handle: "Newsletter",
    description: SOCIAL_DESCRIPTIONS.NEWSLETTER,
    count: SOCIAL_COUNTS.NEWSLETTER_SUBS,
    countLabel: "subscribers",
  },
  github: {
    url: SOCIAL_LINKS.GITHUB,
    handle: SOCIAL_LINKS.GITHUB_HANDLE,
    description: SOCIAL_DESCRIPTIONS.GITHUB,
  },
};

export default function SocialLinks({
  variant = "full",
  channels = ["youtube", "tiktok", "twitter", "newsletter", "github"],
  showCounts = false,
  className = "",
}: SocialLinksProps) {
  if (variant === "icons-only") {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {channels.map((channel) => {
          const Icon = platformIcons[channel];
          const data = platformData[channel];
          return (
            <Link
              key={channel}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label={`Follow on ${channel}`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {channels.map((channel) => {
          const Icon = platformIcons[channel];
          const data = platformData[channel];
          return (
            <Link
              key={channel}
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span>{data.handle}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Full variant with descriptions
  return (
    <div className={`space-y-4 ${className}`}>
      {channels.map((channel) => {
        const Icon = platformIcons[channel];
        const data = platformData[channel];
        return (
          <Link
            key={channel}
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 rounded-lg border border-gray-800 hover:border-gray-600 dark:hover:border-gray-700 transition-all group"
          >
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {channel.charAt(0).toUpperCase() + channel.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{data.handle}</span>
              </div>
              <p className="text-sm text-gray-400">{data.description}</p>
              {showCounts && data.count && (
                <p className="text-xs text-gray-500 mt-1">
                  Join {data.count}+ {data.countLabel}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
