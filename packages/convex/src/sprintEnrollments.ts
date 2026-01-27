// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a pending enrollment (after account creation, before payment)
export const createPending = mutation({
  args: {
    userId: v.id("users"),
    cohortId: v.string(),
    stripeCheckoutSessionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    projectIdea: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already has an enrollment for this cohort
    const existing = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("cohortId"), args.cohortId))
      .first();

    if (existing) {
      // Update existing pending enrollment
      await ctx.db.patch(existing._id, {
        stripeCheckoutSessionId: args.stripeCheckoutSessionId,
        stripeCustomerId: args.stripeCustomerId,
      });
      return existing._id;
    }

    // Create new pending enrollment
    return await ctx.db.insert("sprintEnrollments", {
      userId: args.userId,
      cohortId: args.cohortId,
      stripeCheckoutSessionId: args.stripeCheckoutSessionId,
      stripeCustomerId: args.stripeCustomerId,
      status: "pending",
      amountPaid: 0,
      currency: "usd",
      projectIdea: args.projectIdea,
    });
  },
});

// Activate enrollment after successful payment
export const activate = mutation({
  args: {
    stripeCheckoutSessionId: v.string(),
    stripePaymentIntentId: v.string(),
    amountPaid: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_stripe_checkout", (q) =>
        q.eq("stripeCheckoutSessionId", args.stripeCheckoutSessionId)
      )
      .first();

    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    if (enrollment.status === "active") {
      // Already activated (idempotent)
      return enrollment._id;
    }

    await ctx.db.patch(enrollment._id, {
      status: "active",
      stripePaymentIntentId: args.stripePaymentIntentId,
      amountPaid: args.amountPaid,
      currency: args.currency,
      enrolledAt: Date.now(),
    });

    return enrollment._id;
  },
});

// Get enrollment by user
export const getEnrollmentByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();
  },
});

// Get enrollment by checkout session ID
export const getByCheckoutSession = query({
  args: { stripeCheckoutSessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_stripe_checkout", (q) =>
        q.eq("stripeCheckoutSessionId", args.stripeCheckoutSessionId)
      )
      .first();
  },
});

// Check if user has active enrollment (by Convex user ID)
export const hasActiveEnrollment = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    return !!enrollment;
  },
});

// Check if user has active enrollment (by Better Auth ID)
export const hasActiveEnrollmentByAuthId = query({
  args: { betterAuthId: v.string() },
  handler: async (ctx, args) => {
    // First, find the Convex user by their Better Auth ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();

    if (!user) {
      return false;
    }

    // Then check their enrollment
    const enrollment = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    return !!enrollment;
  },
});

// Mark Sprint as completed
export const markCompleted = mutation({
  args: { enrollmentId: v.id("sprintEnrollments") },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db.get(args.enrollmentId);
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }

    const completedAt = Date.now();
    // Credit expires 12 months from completion
    const creditExpiresAt = completedAt + 365 * 24 * 60 * 60 * 1000;

    await ctx.db.patch(args.enrollmentId, {
      status: "completed",
      completedAt,
      creditExpiresAt,
    });

    return { completedAt, creditExpiresAt };
  },
});

// Get enrollment with cohort details
export const getWithCohort = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const enrollment = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    if (!enrollment) return null;

    const cohort = await ctx.db
      .query("sprintCohorts")
      .withIndex("by_cohortId", (q) => q.eq("cohortId", enrollment.cohortId))
      .first();

    return {
      ...enrollment,
      cohort,
    };
  },
});

// Update project idea
export const updateProjectIdea = mutation({
  args: {
    enrollmentId: v.id("sprintEnrollments"),
    projectIdea: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.enrollmentId, {
      projectIdea: args.projectIdea,
    });
  },
});
