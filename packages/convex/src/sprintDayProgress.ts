// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Initialize day progress records for new enrollment
export const initializeForEnrollment = mutation({
  args: {
    userId: v.id("users"),
    enrollmentId: v.id("sprintEnrollments"),
  },
  handler: async (ctx, args) => {
    // Create progress records for Days 0-7
    // Day 0 is available immediately, Days 1-7 are locked
    for (let day = 0; day <= 7; day++) {
      await ctx.db.insert("sprintDayProgress", {
        userId: args.userId,
        enrollmentId: args.enrollmentId,
        day,
        status: day === 0 ? "available" : "locked",
        trainingWatched: false,
        worksheetCompleted: false,
        progressPosted: false,
      });
    }
  },
});

// Get all day progress for user
export const getDayProgressByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get progress for specific day
export const getDayProgressByUserDay = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();
  },
});

// Get progress by enrollment
export const getDayProgressByEnrollment = query({
  args: { enrollmentId: v.id("sprintEnrollments") },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_enrollment", (q) => q.eq("enrollmentId", args.enrollmentId))
      .collect();

    // Sort by day number
    return progress.sort((a, b) => a.day - b.day);
  },
});

// Mark training as watched
export const markTrainingWatched = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (!progress) {
      throw new Error("Progress record not found");
    }

    await ctx.db.patch(progress._id, {
      trainingWatched: true,
      status: progress.status === "available" ? "in_progress" : progress.status,
    });

    return await checkDayCompletion(ctx, args.userId, args.day);
  },
});

// Mark worksheet as completed
export const markWorksheetCompleted = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (!progress) {
      throw new Error("Progress record not found");
    }

    await ctx.db.patch(progress._id, {
      worksheetCompleted: true,
      status: progress.status === "available" ? "in_progress" : progress.status,
    });

    return await checkDayCompletion(ctx, args.userId, args.day);
  },
});

// Mark progress as posted (Discord)
export const markProgressPosted = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (!progress) {
      throw new Error("Progress record not found");
    }

    await ctx.db.patch(progress._id, {
      progressPosted: true,
      status: progress.status === "available" ? "in_progress" : progress.status,
    });

    return await checkDayCompletion(ctx, args.userId, args.day);
  },
});

// Update notes for a day
export const updateNotes = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (!progress) {
      throw new Error("Progress record not found");
    }

    await ctx.db.patch(progress._id, {
      notes: args.notes,
    });
  },
});

// Check if day is complete and unlock next day
async function checkDayCompletion(ctx: any, userId: any, day: number) {
  const progress = await ctx.db
    .query("sprintDayProgress")
    .withIndex("by_user_day", (q) => q.eq("userId", userId).eq("day", day))
    .first();

  if (!progress) return { completed: false, nextDayUnlocked: false };

  // For Day 0, only training is required (no worksheet or Discord post)
  const isComplete =
    day === 0
      ? progress.trainingWatched
      : progress.trainingWatched &&
        progress.worksheetCompleted &&
        progress.progressPosted;

  if (isComplete && progress.status !== "completed") {
    // Mark day as completed
    await ctx.db.patch(progress._id, {
      status: "completed",
      completedAt: Date.now(),
    });

    // Unlock next day if exists
    if (day < 7) {
      const nextDay = await ctx.db
        .query("sprintDayProgress")
        .withIndex("by_user_day", (q) =>
          q.eq("userId", userId).eq("day", day + 1)
        )
        .first();

      if (nextDay && nextDay.status === "locked") {
        await ctx.db.patch(nextDay._id, {
          status: "available",
        });
        return { completed: true, nextDayUnlocked: true };
      }
    }

    // Check if Sprint is complete (Day 7 done)
    if (day === 7) {
      // Get enrollment and mark as completed
      const enrollment = await ctx.db.get(progress.enrollmentId);
      if (enrollment && enrollment.status === "active") {
        const completedAt = Date.now();
        const creditExpiresAt = completedAt + 365 * 24 * 60 * 60 * 1000;
        await ctx.db.patch(progress.enrollmentId, {
          status: "completed",
          completedAt,
          creditExpiresAt,
        });
      }
      return { completed: true, sprintCompleted: true };
    }

    return { completed: true, nextDayUnlocked: false };
  }

  return { completed: false, nextDayUnlocked: false };
}

// Get current day (most recent available/in_progress)
export const getCurrentDay = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (allProgress.length === 0) return null;

    // Sort by day
    const sorted = allProgress.sort((a, b) => a.day - b.day);

    // Find the current day (last available or in_progress)
    let currentDay = sorted[0];
    for (const progress of sorted) {
      if (
        progress.status === "available" ||
        progress.status === "in_progress"
      ) {
        currentDay = progress;
      }
    }

    return currentDay;
  },
});

// Required checklist item counts per day (must match lesson definitions)
const CHECKLIST_COUNTS: Record<number, number> = {
  0: 6,
  1: 7,
  2: 7,
  3: 8,
  4: 10,
  5: 11,
  6: 9,
  7: 6,
};

// Get current day by Better Auth ID
export const getCurrentDayByAuthId = query({
  args: { betterAuthId: v.string() },
  handler: async (ctx, args) => {
    // Find the Convex user by Better Auth ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();

    if (!user) return null;

    // Check sprintDayProgress first (if records exist)
    const dayProgress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    if (dayProgress.length > 0) {
      const sorted = dayProgress.sort((a, b) => a.day - b.day);
      for (const progress of sorted) {
        if (progress.status !== "completed") {
          return progress.day;
        }
      }
      return 7; // All completed
    }

    // Fallback: Check checklist progress directly
    const checklistProgress = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day", (q) => q.eq("userId", user._id))
      .collect();

    // Group by day
    const completedByDay: Record<number, number> = {};
    for (const item of checklistProgress) {
      completedByDay[item.day] = (completedByDay[item.day] || 0) + 1;
    }

    // Find first incomplete day
    for (let day = 0; day <= 7; day++) {
      const completed = completedByDay[day] || 0;
      const required = CHECKLIST_COUNTS[day] || 5;
      if (completed < required) {
        return day;
      }
    }

    // All days completed
    return 7;
  },
});

// Get overall Sprint progress
export const getOverallProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db
      .query("sprintDayProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    if (allProgress.length === 0) {
      return {
        daysCompleted: 0,
        totalDays: 8,
        percentComplete: 0,
        currentDay: null,
      };
    }

    const daysCompleted = allProgress.filter(
      (p) => p.status === "completed"
    ).length;

    const sorted = allProgress.sort((a, b) => a.day - b.day);
    let currentDay = 0;
    for (const progress of sorted) {
      if (
        progress.status === "available" ||
        progress.status === "in_progress"
      ) {
        currentDay = progress.day;
      }
    }

    return {
      daysCompleted,
      totalDays: 8,
      percentComplete: Math.round((daysCompleted / 8) * 100),
      currentDay,
    };
  },
});
