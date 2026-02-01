// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get cached AI dialogue for a specific user + day
export const getByUserDay = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintAiDialogue")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();
  },
});

// Save (upsert) AI dialogue for a user + day
export const save = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
    content: v.string(),
    contextHash: v.string(),
    model: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sprintAiDialogue")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: args.content,
        contextHash: args.contextHash,
        generatedAt: Date.now(),
        model: args.model,
      });
      return existing._id;
    }

    return await ctx.db.insert("sprintAiDialogue", {
      userId: args.userId,
      day: args.day,
      content: args.content,
      contextHash: args.contextHash,
      generatedAt: Date.now(),
      model: args.model,
    });
  },
});

// Invalidate (delete) cached dialogue so it regenerates
export const invalidate = mutation({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sprintAiDialogue")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
