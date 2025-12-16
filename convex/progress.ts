// @ts-nocheck
// Note: ts-nocheck is temporary until `npx convex dev` generates proper types
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Start a module (create progress record)
export const startModule = mutation({
  args: {
    userId: v.id("users"),
    moduleId: v.id("modules"),
  },
  handler: async (ctx, args) => {
    // Check if progress already exists
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .first();

    if (existing) {
      // Update last accessed
      await ctx.db.patch(existing._id, {
        lastAccessedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new progress record
    const progressId = await ctx.db.insert("userProgress", {
      userId: args.userId,
      moduleId: args.moduleId,
      status: "in_progress",
      completedLessonIds: [],
      percentComplete: 0,
      startedAt: Date.now(),
      timeSpentMinutes: 0,
      lastAccessedAt: Date.now(),
    });

    return progressId;
  },
});

// Complete a lesson
export const completeLesson = mutation({
  args: {
    userId: v.id("users"),
    moduleId: v.id("modules"),
    lessonId: v.id("lessons"),
    timeSpentMinutes: v.number(),
  },
  handler: async (ctx, args) => {
    // Get or create progress
    let progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .first();

    if (!progress) {
      // Start module first
      const progressId = await ctx.db.insert("userProgress", {
        userId: args.userId,
        moduleId: args.moduleId,
        status: "in_progress",
        completedLessonIds: [],
        percentComplete: 0,
        startedAt: Date.now(),
        timeSpentMinutes: 0,
        lastAccessedAt: Date.now(),
      });
      progress = await ctx.db.get(progressId);
    }

    if (!progress) return null;

    // Check if lesson already completed
    if (progress.completedLessonIds.includes(args.lessonId)) {
      return { alreadyCompleted: true };
    }

    // Get total lessons in module
    const allLessons = await ctx.db
      .query("lessons")
      .withIndex("by_module", (q) => q.eq("moduleId", args.moduleId))
      .collect();

    const newCompletedLessons = [...progress.completedLessonIds, args.lessonId];
    const percentComplete = Math.round(
      (newCompletedLessons.length / allLessons.length) * 100
    );

    // Get lesson for XP
    const lesson = await ctx.db.get(args.lessonId);
    const xpEarned = lesson?.xpReward ?? 10;

    // Update progress
    await ctx.db.patch(progress._id, {
      completedLessonIds: newCompletedLessons,
      percentComplete,
      timeSpentMinutes: progress.timeSpentMinutes + args.timeSpentMinutes,
      lastAccessedAt: Date.now(),
    });

    // Add XP to user
    const user = await ctx.db.get(args.userId);
    if (user) {
      await ctx.db.patch(args.userId, {
        totalXP: user.totalXP + xpEarned,
      });
    }

    // Update streak
    await updateStreak(ctx, args.userId, args.timeSpentMinutes);

    return {
      percentComplete,
      xpEarned,
      lessonsRemaining: allLessons.length - newCompletedLessons.length,
    };
  },
});

// Complete a module (after quiz passed)
export const completeModule = mutation({
  args: {
    userId: v.id("users"),
    moduleId: v.id("modules"),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .first();

    if (!progress) return null;

    // Update progress to completed
    await ctx.db.patch(progress._id, {
      status: "completed",
      percentComplete: 100,
      completedAt: Date.now(),
    });

    // Get module for XP reward
    const module = await ctx.db.get(args.moduleId);
    if (module) {
      const user = await ctx.db.get(args.userId);
      if (user) {
        await ctx.db.patch(args.userId, {
          totalXP: user.totalXP + module.xpReward,
        });
      }

      // Check for modules to unlock
      await checkAndUnlockModules(ctx, args.userId, module.slug);
    }

    return { completed: true };
  },
});

// Helper: Update user streak
async function updateStreak(
  ctx: any,
  userId: any,
  minutesSpent: number
) {
  const today = new Date().toISOString().split("T")[0];

  const streak = await ctx.db
    .query("userStreaks")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .first();

  if (!streak) return;

  // Check if already logged today
  const todayEntry = streak.streakHistory.find(
    (h: any) => h.date === today
  );

  let newHistory = [...streak.streakHistory];
  if (todayEntry) {
    // Update today's entry
    newHistory = newHistory.map((h: any) =>
      h.date === today
        ? {
            ...h,
            minutesSpent: h.minutesSpent + minutesSpent,
            lessonsCompleted: h.lessonsCompleted + 1,
          }
        : h
    );
  } else {
    // Add new entry
    newHistory.push({
      date: today,
      minutesSpent,
      lessonsCompleted: 1,
    });
  }

  // Calculate streak
  let currentStreak = streak.currentStreak;
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  if (streak.lastActivityDate === yesterday) {
    // Continue streak
    currentStreak = streak.currentStreak + 1;
  } else if (streak.lastActivityDate !== today) {
    // Streak broken, start new
    currentStreak = 1;
  }

  await ctx.db.patch(streak._id, {
    currentStreak,
    longestStreak: Math.max(streak.longestStreak, currentStreak),
    lastActivityDate: today,
    streakHistory: newHistory.slice(-90), // Keep last 90 days
  });
}

// Helper: Check and unlock subsequent modules
async function checkAndUnlockModules(
  ctx: any,
  userId: any,
  completedModuleSlug: string
) {
  // Find modules that have this as prerequisite
  const allModules = await ctx.db.query("modules").collect();

  for (const module of allModules) {
    if (!module.isLocked) continue;

    // Check if already unlocked
    const existingUnlock = await ctx.db
      .query("moduleUnlocks")
      .withIndex("by_user_module", (q: any) =>
        q.eq("userId", userId).eq("moduleId", module._id)
      )
      .first();

    if (existingUnlock) continue;

    // Check unlock condition
    if (
      module.unlockCondition?.type === "module_complete" &&
      module.unlockCondition.targetSlug === completedModuleSlug
    ) {
      await ctx.db.insert("moduleUnlocks", {
        userId,
        moduleId: module._id,
        unlockedAt: Date.now(),
        unlockedBy: "prerequisite",
      });
    }
  }
}

// Get user's current module (continue where left off)
export const getCurrentModule = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Find in-progress module
    const inProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_status", (q) =>
        q.eq("userId", args.userId).eq("status", "in_progress")
      )
      .first();

    if (inProgress) {
      const module = await ctx.db.get(inProgress.moduleId);
      return { module, progress: inProgress };
    }

    // If no in-progress, find first available unlocked module
    const unlocks = await ctx.db
      .query("moduleUnlocks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const unlockedIds = new Set(unlocks.map((u) => u.moduleId.toString()));

    const modules = await ctx.db
      .query("modules")
      .withIndex("by_order")
      .collect();

    // Find first unlocked module without completed progress
    for (const module of modules) {
      const isUnlocked = !module.isLocked || unlockedIds.has(module._id.toString());
      if (!isUnlocked) continue;

      const progress = await ctx.db
        .query("userProgress")
        .withIndex("by_user_module", (q) =>
          q.eq("userId", args.userId).eq("moduleId", module._id)
        )
        .first();

      if (!progress || progress.status !== "completed") {
        return { module, progress };
      }
    }

    return null;
  },
});
