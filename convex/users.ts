// @ts-nocheck
// Note: ts-nocheck is temporary until `npx convex dev` generates proper types
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Sync user from BetterAuth
export const syncFromAuth = mutation({
  args: {
    betterAuthId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();

    if (existing) {
      // Update last active
      await ctx.db.patch(existing._id, {
        lastActiveAt: Date.now(),
        name: args.name ?? existing.name,
        avatarUrl: args.avatarUrl ?? existing.avatarUrl,
      });
      return existing._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      betterAuthId: args.betterAuthId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      notificationsEnabled: true,
      totalXP: 0,
    });

    // Initialize streak record
    await ctx.db.insert("userStreaks", {
      userId,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: "",
      streakHistory: [],
    });

    // Auto-unlock Module 1 (fundamentals)
    const module1 = await ctx.db
      .query("modules")
      .withIndex("by_slug", (q) => q.eq("slug", "ai-foundations"))
      .first();

    if (module1) {
      await ctx.db.insert("moduleUnlocks", {
        userId,
        moduleId: module1._id,
        unlockedAt: Date.now(),
        unlockedBy: "default",
      });
    }

    return userId;
  },
});

// Get current user by BetterAuth ID
export const getByAuthId = query({
  args: { betterAuthId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();
  },
});

// Get user dashboard stats
export const getDashboardStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    // Get all progress records
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get streak
    const streak = await ctx.db
      .query("userStreaks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    // Get achievements
    const achievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get total modules
    const allModules = await ctx.db.query("modules").collect();

    // Calculate stats
    const completedModules = progress.filter((p) => p.status === "completed").length;
    const inProgressModules = progress.filter((p) => p.status === "in_progress").length;
    const totalTimeMinutes = progress.reduce((acc, p) => acc + p.timeSpentMinutes, 0);

    // Get all lessons for percentage
    const allLessons = await ctx.db.query("lessons").collect();
    const completedLessonIds = progress.flatMap((p) => p.completedLessonIds);

    return {
      totalXP: user.totalXP,
      currentStreak: streak?.currentStreak ?? 0,
      longestStreak: streak?.longestStreak ?? 0,
      modulesCompleted: completedModules,
      modulesInProgress: inProgressModules,
      totalModules: allModules.length,
      lessonsCompleted: completedLessonIds.length,
      totalLessons: allLessons.length,
      badgesEarned: achievements.length,
      totalTimeMinutes,
      overallProgress: allLessons.length > 0
        ? Math.round((completedLessonIds.length / allLessons.length) * 100)
        : 0,
    };
  },
});

// Add XP to user
export const addXP = mutation({
  args: {
    userId: v.id("users"),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return;

    await ctx.db.patch(args.userId, {
      totalXP: user.totalXP + args.amount,
    });

    return user.totalXP + args.amount;
  },
});
