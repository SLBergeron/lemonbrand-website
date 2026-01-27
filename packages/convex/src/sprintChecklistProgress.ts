// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Toggle a checklist item (complete/uncomplete)
export const toggle = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if item is already completed
    const existing = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day_item", (q) =>
        q
          .eq("userId", args.userId)
          .eq("day", args.day)
          .eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      // Item was completed, remove it (toggle off)
      await ctx.db.delete(existing._id);
      return { completed: false };
    }

    // Item not completed, mark as completed
    await ctx.db.insert("sprintChecklistProgress", {
      userId: args.userId,
      day: args.day,
      itemId: args.itemId,
      completedAt: Date.now(),
    });

    return { completed: true };
  },
});

// Mark item as completed (idempotent)
export const complete = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day_item", (q) =>
        q
          .eq("userId", args.userId)
          .eq("day", args.day)
          .eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("sprintChecklistProgress", {
      userId: args.userId,
      day: args.day,
      itemId: args.itemId,
      completedAt: Date.now(),
    });
  },
});

// Mark item as uncompleted
export const uncomplete = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day_item", (q) =>
        q
          .eq("userId", args.userId)
          .eq("day", args.day)
          .eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

// Get all completed items for a day
export const getChecklistByUserDay = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .collect();
  },
});

// Get completed item IDs for a day
export const getCompletedItemIds = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .collect();

    return items.map((item) => item.itemId);
  },
});

// Check if specific item is completed
export const isItemCompleted = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day_item", (q) =>
        q
          .eq("userId", args.userId)
          .eq("day", args.day)
          .eq("itemId", args.itemId)
      )
      .first();

    return !!item;
  },
});

// Get checklist progress summary for all days
export const getSummary = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db
      .query("sprintChecklistProgress")
      .withIndex("by_user_day", (q) => q.eq("userId", args.userId))
      .collect();

    // Group by day
    const byDay: Record<number, string[]> = {};
    for (const item of allProgress) {
      if (!byDay[item.day]) {
        byDay[item.day] = [];
      }
      byDay[item.day].push(item.itemId);
    }

    return byDay;
  },
});
