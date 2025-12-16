"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IconLock,
  IconCheck,
  IconPlayerPlay,
  IconProgress,
} from "@tabler/icons-react";

interface ModuleCardProps {
  module: {
    _id: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    estimatedMinutes: number;
    order: number;
  };
  status: "locked" | "available" | "in_progress" | "completed";
  progress?: {
    percentComplete: number;
  } | null;
  index: number;
}

const statusConfig = {
  locked: {
    icon: IconLock,
    badge: "Locked",
    badgeColor: "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400",
    cardStyle: "opacity-75 grayscale-[0.5]",
    clickable: false,
    accent: "bg-neutral-200 dark:bg-neutral-800",
  },
  available: {
    icon: IconPlayerPlay,
    badge: "Start",
    badgeColor: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    cardStyle: "hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10",
    clickable: true,
    accent: "bg-orange-500",
  },
  in_progress: {
    icon: IconProgress,
    badge: "In Progress",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    cardStyle: "hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 ring-1 ring-blue-500/20",
    clickable: true,
    accent: "bg-blue-500",
  },
  completed: {
    icon: IconCheck,
    badge: "Complete",
    badgeColor: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    cardStyle: "hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10",
    clickable: true,
    accent: "bg-green-500",
  },
};

export function ModuleCard({ module, status, progress, index }: ModuleCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={cn(
        "group relative bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 transition-all h-full flex flex-col",
        config.cardStyle,
        config.clickable && "cursor-pointer"
      )}
    >
      {/* Top row: Order & Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center font-mono font-bold text-neutral-500">
          0{module.order}
        </div>
        <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium", config.badgeColor)}>
          {status === "in_progress" && progress
            ? `${progress.percentComplete}%`
            : config.badge}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 mb-6">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
          {module.title}
        </h3>
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          {module.subtitle}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2 leading-relaxed">
          {module.description}
        </p>
      </div>

      {/* Progress or Footer */}
      <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
        {status === "in_progress" && progress ? (
           <div className="w-full">
              <div className="flex justify-between text-xs mb-1.5">
                 <span className="text-neutral-500">Progress</span>
                 <span className="font-medium text-blue-600 dark:text-blue-400">{progress.percentComplete}%</span>
              </div>
              <div className="h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress.percentComplete}%` }}
                />
              </div>
           </div>
        ) : (
          <>
            <span className="text-xs font-medium text-neutral-400">
              {module.estimatedMinutes} min
            </span>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
              config.clickable ? "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700" : "bg-neutral-50 dark:bg-neutral-800/50"
            )}>
              <Icon className={cn("w-4 h-4", status === 'completed' ? 'text-green-500' : 'text-neutral-600 dark:text-neutral-400')} />
            </div>
          </>
        )}
      </div>
      
      {/* Decorative accent bar on left */}
      <div className={cn("absolute left-0 top-6 bottom-6 w-0.5 rounded-r-full transition-opacity opacity-0 group-hover:opacity-100", config.accent)} />
    </motion.div>
  );

  if (config.clickable) {
    return (
      <Link href={`/sarah/dashboard/modules/${module.slug}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}