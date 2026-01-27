// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get active/upcoming cohort
export const getActive = query({
  args: {},
  handler: async (ctx) => {
    // First try to get an upcoming cohort
    const upcoming = await ctx.db
      .query("sprintCohorts")
      .withIndex("by_status", (q) => q.eq("status", "upcoming"))
      .first();

    if (upcoming) return upcoming;

    // Fall back to active cohort
    return await ctx.db
      .query("sprintCohorts")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .first();
  },
});

// Get cohort by ID
export const getByCohortId = query({
  args: { cohortId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintCohorts")
      .withIndex("by_cohortId", (q) => q.eq("cohortId", args.cohortId))
      .first();
  },
});

// Decrement available spots
export const decrementSpots = mutation({
  args: { cohortId: v.string() },
  handler: async (ctx, args) => {
    const cohort = await ctx.db
      .query("sprintCohorts")
      .withIndex("by_cohortId", (q) => q.eq("cohortId", args.cohortId))
      .first();

    if (!cohort) {
      throw new Error("Cohort not found");
    }

    if (cohort.spotsRemaining <= 0) {
      throw new Error("No spots remaining");
    }

    await ctx.db.patch(cohort._id, {
      spotsRemaining: cohort.spotsRemaining - 1,
    });

    return cohort.spotsRemaining - 1;
  },
});

// Create a new cohort (admin)
export const create = mutation({
  args: {
    cohortId: v.string(),
    name: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    maxSpots: v.number(),
    discordInviteUrl: v.optional(v.string()),
    stripePriceId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sprintCohorts", {
      cohortId: args.cohortId,
      name: args.name,
      startDate: args.startDate,
      endDate: args.endDate,
      maxSpots: args.maxSpots,
      spotsRemaining: args.maxSpots,
      status: "upcoming",
      discordInviteUrl: args.discordInviteUrl,
      stripePriceId: args.stripePriceId,
    });
  },
});

// Update cohort status
export const updateStatus = mutation({
  args: {
    cohortId: v.string(),
    status: v.union(
      v.literal("upcoming"),
      v.literal("active"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    const cohort = await ctx.db
      .query("sprintCohorts")
      .withIndex("by_cohortId", (q) => q.eq("cohortId", args.cohortId))
      .first();

    if (!cohort) {
      throw new Error("Cohort not found");
    }

    await ctx.db.patch(cohort._id, {
      status: args.status,
    });
  },
});

// Get all cohorts (admin)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("sprintCohorts").collect();
  },
});
