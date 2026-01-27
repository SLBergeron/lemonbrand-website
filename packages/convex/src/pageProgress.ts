// @ts-nocheck
// Page-based progress tracking for Brilliant-style learning
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Complete a page and earn badge
export const completePage = mutation({
  args: {
    userId: v.id("users"),
    pageId: v.string(),
    badgeName: v.string(),
    badgeIcon: v.string(),
    xpReward: v.number(),
    stepAnswers: v.optional(v.any()),
    timeSpentSeconds: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if already completed
    const existing = await ctx.db
      .query("pageProgress")
      .withIndex("by_user_page", (q) =>
        q.eq("userId", args.userId).eq("pageId", args.pageId)
      )
      .first();

    if (existing) {
      // Already completed - just update answers if provided
      if (args.stepAnswers) {
        await ctx.db.patch(existing._id, {
          stepAnswers: args.stepAnswers,
        });
      }
      return { alreadyCompleted: true, xpEarned: 0 };
    }

    // Create progress record
    await ctx.db.insert("pageProgress", {
      userId: args.userId,
      pageId: args.pageId,
      completedAt: Date.now(),
      xpEarned: args.xpReward,
      stepAnswers: args.stepAnswers,
      timeSpentSeconds: args.timeSpentSeconds,
    });

    // Create badge record
    await ctx.db.insert("pageBadges", {
      userId: args.userId,
      pageId: args.pageId,
      badgeName: args.badgeName,
      badgeIcon: args.badgeIcon,
      xpReward: args.xpReward,
      earnedAt: Date.now(),
    });

    // Add XP to user
    const user = await ctx.db.get(args.userId);
    if (user) {
      await ctx.db.patch(args.userId, {
        totalXP: user.totalXP + args.xpReward,
        lastActiveAt: Date.now(),
      });
    }

    // Update streak
    await updateStreak(ctx, args.userId);

    return {
      alreadyCompleted: false,
      xpEarned: args.xpReward,
      badgeName: args.badgeName,
    };
  },
});

// Get all page progress for a user
export const getUserPageProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("pageProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const badges = await ctx.db
      .query("pageBadges")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const completedPageIds = progress.map((p) => p.pageId);
    const totalXpEarned = progress.reduce((sum, p) => sum + p.xpEarned, 0);

    return {
      completedPageIds,
      totalPages: 6, // Total pages in the course
      pagesCompleted: completedPageIds.length,
      percentComplete: Math.round((completedPageIds.length / 6) * 100),
      totalXpEarned,
      badges,
      progress,
    };
  },
});

// Check if a specific page is completed
export const isPageCompleted = query({
  args: {
    userId: v.id("users"),
    pageId: v.string(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("pageProgress")
      .withIndex("by_user_page", (q) =>
        q.eq("userId", args.userId).eq("pageId", args.pageId)
      )
      .first();

    return !!progress;
  },
});

// Get page progress with step answers (for personalization)
export const getPageProgressWithAnswers = query({
  args: {
    userId: v.id("users"),
    pageId: v.string(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("pageProgress")
      .withIndex("by_user_page", (q) =>
        q.eq("userId", args.userId).eq("pageId", args.pageId)
      )
      .first();

    return progress;
  },
});

// Get dashboard stats for pages
export const getPageDashboardStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    const progress = await ctx.db
      .query("pageProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const badges = await ctx.db
      .query("pageBadges")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get streak info
    const streak = await ctx.db
      .query("userStreaks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const totalTimeMinutes = progress.reduce(
      (sum, p) => sum + Math.round((p.timeSpentSeconds || 0) / 60),
      0
    );

    return {
      user: {
        name: user.name,
        email: user.email,
        totalXP: user.totalXP,
      },
      pagesCompleted: progress.length,
      totalPages: 6,
      percentComplete: Math.round((progress.length / 6) * 100),
      badgesEarned: badges.length,
      totalBadges: 6, // 6 page badges + bonus badges later
      totalTimeMinutes,
      currentStreak: streak?.currentStreak || 0,
      longestStreak: streak?.longestStreak || 0,
      completedPageIds: progress.map((p) => p.pageId),
    };
  },
});

// Helper: Update user streak
async function updateStreak(ctx: any, userId: any) {
  const today = new Date().toISOString().split("T")[0];

  let streak = await ctx.db
    .query("userStreaks")
    .withIndex("by_user", (q: any) => q.eq("userId", userId))
    .first();

  if (!streak) {
    // Create streak record
    await ctx.db.insert("userStreaks", {
      userId,
      currentStreak: 1,
      longestStreak: 1,
      lastActivityDate: today,
      streakHistory: [
        {
          date: today,
          minutesSpent: 5,
          lessonsCompleted: 1,
        },
      ],
    });
    return;
  }

  // Check if already logged today
  if (streak.lastActivityDate === today) {
    // Already active today, just update history
    const newHistory = streak.streakHistory.map((h: any) =>
      h.date === today
        ? { ...h, lessonsCompleted: h.lessonsCompleted + 1 }
        : h
    );
    await ctx.db.patch(streak._id, { streakHistory: newHistory });
    return;
  }

  // Calculate streak
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  let currentStreak = 1;
  if (streak.lastActivityDate === yesterday) {
    // Continue streak
    currentStreak = streak.currentStreak + 1;
  }

  const newHistory = [
    ...streak.streakHistory,
    {
      date: today,
      minutesSpent: 5,
      lessonsCompleted: 1,
    },
  ].slice(-90); // Keep last 90 days

  await ctx.db.patch(streak._id, {
    currentStreak,
    longestStreak: Math.max(streak.longestStreak, currentStreak),
    lastActivityDate: today,
    streakHistory: newHistory,
  });
}
