"use client";

import Link from "next/link";
import { Youtube, Twitter, Mail, Github, ArrowRight } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { SOCIAL_LINKS } from "@/constants/links";

type SocialPlatform = "youtube" | "tiktok" | "twitter" | "newsletter" | "github";

interface FollowCTAProps {
  platform: SocialPlatform;
  variant?: "primary" | "secondary" | "ghost";
  text?: string;
  className?: string;
  fullWidth?: boolean;
}

const platformIcons = {
  youtube: Youtube,
  tiktok: TikTokIcon,
  twitter: Twitter,
  newsletter: Mail,
  github: Github,
};

const platformUrls = {
  youtube: SOCIAL_LINKS.YOUTUBE,
  tiktok: SOCIAL_LINKS.TIKTOK,
  twitter: SOCIAL_LINKS.TWITTER,
  newsletter: SOCIAL_LINKS.NEWSLETTER,
  github: SOCIAL_LINKS.GITHUB,
};

const defaultText = {
  youtube: "Subscribe on YouTube",
  tiktok: "Follow on TikTok",
  twitter: "Follow on X",
  newsletter: "Join Newsletter",
  github: "View on GitHub",
};

export default function FollowCTA({
  platform,
  variant = "primary",
  text,
  className = "",
  fullWidth = false,
}: FollowCTAProps) {
  const Icon = platformIcons[platform];
  const url = platformUrls[platform];
  const buttonText = text || defaultText[platform];

  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all group";

  const variantStyles = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 border border-neutral-900 dark:border-white",
    secondary: "border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800",
    ghost: "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
    >
      <Icon className="w-5 h-5" />
      <span>{buttonText}</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
