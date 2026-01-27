"use client";

import React from "react";
import { Youtube, Twitter, Mail, Github } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import FollowCTA from "./FollowCTA";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function FollowAlong() {
  const channels = [
    {
      icon: Youtube,
      title: "YouTube - Raw build sessions",
      description: "Full, unedited videos of me building things and figuring them out. No script, no polish, just real work.",
      platform: "youtube" as const,
      category: "Video Content",
      src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2574&auto=format&fit=crop",
    },
    {
      icon: TikTokIcon,
      title: "TikTok - Honest business talk",
      description: "Real thoughts on building, challenges, and lessons. No trends, no dancing. Just me talking about what's actually happening.",
      platform: "tiktok" as const,
      category: "Short Form",
      src: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?q=80&w=2574&auto=format&fit=crop",
    },
    {
      icon: Mail,
      title: "Newsletter - Weekly digest",
      description: "Every Monday: What I built, what I learned, what's next.",
      platform: "newsletter" as const,
      category: "Email",
      src: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=2574&auto=format&fit=crop",
    },
    {
      icon: Github,
      title: "GitHub - Open source projects",
      description: "All my code, projects, and experiments. Watch the repositories grow in real-time as I build.",
      platform: "github" as const,
      category: "Code",
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=2574&auto=format&fit=crop",
    },
    {
      icon: Twitter,
      title: "X/Twitter - Real-time updates",
      description: "Quick wins, setbacks, and transparent progress updates as they happen.",
      platform: "twitter" as const,
      category: "Real-Time",
      src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2574&auto=format&fit=crop",
    },
  ];

  const ChannelContent = ({ channel }: { channel: typeof channels[0] }) => {
    const Icon = channel.icon;
    return (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-white dark:bg-neutral-700">
            <Icon className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100 mb-2">
              {channel.title}
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-3xl">
              {channel.description}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <FollowCTA
            platform={channel.platform}
            variant="primary"
          />
        </div>
      </div>
    );
  };

  const cards = channels.map((channel, index) => (
    <Card
      key={channel.platform}
      card={{
        src: channel.src,
        title: channel.title,
        category: channel.category,
        content: <ChannelContent channel={channel} />,
      }}
      index={index}
    />
  ));

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full h-full">
        <div className="max-w-7xl pl-4 mx-auto mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Follow Along As I Build
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl">
            I&apos;m documenting everything - the wins, the mistakes, and the messy middle.
            Everything I create is raw and honest. No fake guru energy.
          </p>
        </div>
        <Carousel items={cards} />
      </div>
    </section>
  );
}
