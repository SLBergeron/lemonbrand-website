"use client";

import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/components/sarah/providers/auth-provider";
import { ModuleCard } from "@/components/sarah/modules/module-card";
import { IconBook } from "@tabler/icons-react";

type ModuleWithProgress = {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  status: "locked" | "available" | "in_progress" | "completed";
  progress: { percentComplete: number } | null;
};

export default function ModulesPage() {
  const { user } = useAuth();
  const modules = useQuery(
    api.modules.getAllWithProgress,
    user?._id ? { userId: user._id } : {}
  );

  const completedCount = modules?.filter((m: { status: string }) => m.status === "completed").length ?? 0;
  const totalCount = modules?.length ?? 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <IconBook className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
              Learning Modules
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              {completedCount} of {totalCount} modules completed
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-4">
          <div className="w-32 h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
            />
          </div>
          <span className="text-sm font-bold text-neutral-900 dark:text-white">
            {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
          </span>
        </div>
      </motion.div>

      {/* Journey map description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-neutral-600 dark:text-neutral-400 max-w-2xl"
      >
        Progress through each module to unlock the next. Complete all modules to become
        an AI-empowered marketing leader!
      </motion.p>

      {/* Modules grid */}
      {modules ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(modules as ModuleWithProgress[]).map((module: ModuleWithProgress, index: number) => (
            <ModuleCard
              key={module._id}
              module={module}
              status={module.status}
              progress={module.progress}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-72 bg-neutral-100 dark:bg-neutral-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Learning path visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/5 dark:to-yellow-500/5 rounded-2xl p-6 border border-orange-500/20"
      >
        <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
          Your Learning Path
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          {(modules as ModuleWithProgress[] | undefined)?.map((module: ModuleWithProgress, index: number) => (
            <div key={module._id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  module.status === "completed"
                    ? "bg-green-500 text-white"
                    : module.status === "in_progress"
                      ? "bg-yellow-500 text-white"
                      : module.status === "available"
                        ? "bg-orange-500 text-white"
                        : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500"
                }`}
              >
                {module.order}
              </div>
              {index < (modules?.length ?? 0) - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    module.status === "completed"
                      ? "bg-green-500"
                      : "bg-neutral-300 dark:bg-neutral-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
