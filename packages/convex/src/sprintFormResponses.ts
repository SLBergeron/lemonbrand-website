// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save form response for a day
export const save = mutation({
  args: {
    userId: v.id("users"),
    enrollmentId: v.optional(v.id("sprintEnrollments")),
    day: v.number(),
    responses: v.any(),
    generatedContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if response already exists
    const existing = await ctx.db
      .query("sprintFormResponses")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();

    if (existing) {
      // Update existing response
      await ctx.db.patch(existing._id, {
        responses: args.responses,
        generatedContent: args.generatedContent,
        submittedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new response
    return await ctx.db.insert("sprintFormResponses", {
      userId: args.userId,
      enrollmentId: args.enrollmentId,
      day: args.day,
      responses: args.responses,
      generatedContent: args.generatedContent,
      submittedAt: Date.now(),
    });
  },
});

// Get form response for a specific day
export const getFormResponseByUserDay = query({
  args: {
    userId: v.id("users"),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintFormResponses")
      .withIndex("by_user_day", (q) =>
        q.eq("userId", args.userId).eq("day", args.day)
      )
      .first();
  },
});

// Get all form responses for a user
export const getFormResponsesByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintFormResponses")
      .withIndex("by_user_day", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get form responses by enrollment
export const getFormResponsesByEnrollment = query({
  args: { enrollmentId: v.id("sprintEnrollments") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintFormResponses")
      .withIndex("by_enrollment", (q) => q.eq("enrollmentId", args.enrollmentId))
      .collect();
  },
});
