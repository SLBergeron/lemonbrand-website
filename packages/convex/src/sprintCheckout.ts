// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a pending purchase (email-first checkout before account creation)
export const createPendingPurchase = mutation({
  args: {
    email: v.string(),
    stripeSessionId: v.string(),
    localProgress: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Check if email already has a pending purchase
    const existing = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .first();

    if (existing) {
      // Update existing pending purchase with new session
      await ctx.db.patch(existing._id, {
        stripeSessionId: args.stripeSessionId,
        localProgress: args.localProgress,
      });
      return existing._id;
    }

    // Create new pending purchase
    return await ctx.db.insert("sprintPendingPurchases", {
      email: args.email,
      stripeSessionId: args.stripeSessionId,
      status: "pending",
      localProgress: args.localProgress,
      createdAt: Date.now(),
    });
  },
});

// Complete pending purchase after payment success
export const completePendingPurchase = mutation({
  args: {
    stripeSessionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const pending = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_session", (q) => q.eq("stripeSessionId", args.stripeSessionId))
      .first();

    if (!pending) {
      throw new Error("Pending purchase not found");
    }

    if (pending.status === "completed") {
      // Already completed (idempotent)
      return pending._id;
    }

    await ctx.db.patch(pending._id, {
      status: "completed",
      stripeCustomerId: args.stripeCustomerId,
      completedAt: Date.now(),
    });

    return pending._id;
  },
});

// Get pending purchase by Stripe session ID
export const getPendingPurchaseBySession = query({
  args: { stripeSessionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_session", (q) => q.eq("stripeSessionId", args.stripeSessionId))
      .first();
  },
});

// Get pending purchase by email
export const getPendingPurchaseByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Check if email has completed purchase (for checking existing purchases)
export const hasCompletedPurchase = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const purchase = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "completed"))
      .first();

    return !!purchase;
  },
});

// Create self-paced enrollment after account creation
export const createSelfPacedEnrollment = mutation({
  args: {
    userId: v.id("users"),
    stripeSessionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    amountPaid: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already has an enrollment
    const existing = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    if (existing) {
      // Already enrolled (idempotent)
      return existing._id;
    }

    // Create active enrollment (already paid via pending purchase)
    return await ctx.db.insert("sprintEnrollments", {
      userId: args.userId,
      cohortId: "self-paced", // Special cohort ID for self-paced
      stripeCheckoutSessionId: args.stripeSessionId,
      stripeCustomerId: args.stripeCustomerId,
      stripePaymentIntentId: args.stripePaymentIntentId,
      status: "active",
      enrollmentType: "self-paced",
      amountPaid: args.amountPaid,
      currency: args.currency,
      enrolledAt: Date.now(),
    });
  },
});

// Create self-paced enrollment by Better Auth ID
export const createSelfPacedEnrollmentByAuthId = mutation({
  args: {
    betterAuthId: v.string(),
    stripeSessionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    amountPaid: v.number(),
    currency: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the Convex user by Better Auth ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if user already has an enrollment
    const existing = await ctx.db
      .query("sprintEnrollments")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) =>
        q.or(
          q.eq(q.field("status"), "active"),
          q.eq(q.field("status"), "completed")
        )
      )
      .first();

    if (existing) {
      // Already enrolled (idempotent)
      return existing._id;
    }

    // Create active enrollment (already paid via pending purchase)
    return await ctx.db.insert("sprintEnrollments", {
      userId: user._id,
      cohortId: "self-paced",
      stripeCheckoutSessionId: args.stripeSessionId,
      stripeCustomerId: args.stripeCustomerId,
      stripePaymentIntentId: args.stripePaymentIntentId,
      status: "active",
      enrollmentType: "self-paced",
      amountPaid: args.amountPaid,
      currency: args.currency,
      enrolledAt: Date.now(),
    });
  },
});

// Sync local progress to Convex after enrollment
export const syncLocalProgress = mutation({
  args: {
    userId: v.id("users"),
    localProgress: v.any(), // { completedItems: string[], dayProgress: {...} }
  },
  handler: async (ctx, args) => {
    const { localProgress } = args;

    if (!localProgress) return;

    // Sync checklist items (Days 0-1 only during preview)
    if (localProgress.completedItems && Array.isArray(localProgress.completedItems)) {
      for (const itemKey of localProgress.completedItems) {
        // Parse itemKey format: "day-{day}-{itemId}"
        const match = itemKey.match(/^day-(\d+)-(.+)$/);
        if (!match) continue;

        const day = parseInt(match[1], 10);
        const itemId = match[2];

        // Only sync Days 0-1 (preview days)
        if (day > 1) continue;

        // Check if already exists
        const existing = await ctx.db
          .query("sprintChecklistProgress")
          .withIndex("by_user_day_item", (q) =>
            q.eq("userId", args.userId).eq("day", day).eq("itemId", itemId)
          )
          .first();

        if (!existing) {
          await ctx.db.insert("sprintChecklistProgress", {
            userId: args.userId,
            day,
            itemId,
            completedAt: Date.now(),
          });
        }
      }
    }

    return { synced: true };
  },
});

// Sync local progress by Better Auth ID
export const syncLocalProgressByAuthId = mutation({
  args: {
    betterAuthId: v.string(),
    localProgress: v.any(),
  },
  handler: async (ctx, args) => {
    const { localProgress } = args;

    if (!localProgress) return { synced: false };

    // Find the Convex user by Better Auth ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_betterAuthId", (q) => q.eq("betterAuthId", args.betterAuthId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Sync checklist items (Days 0-1 only during preview)
    if (localProgress.completedItems && Array.isArray(localProgress.completedItems)) {
      for (const itemKey of localProgress.completedItems) {
        const match = itemKey.match(/^day-(\d+)-(.+)$/);
        if (!match) continue;

        const day = parseInt(match[1], 10);
        const itemId = match[2];

        if (day > 1) continue;

        const existing = await ctx.db
          .query("sprintChecklistProgress")
          .withIndex("by_user_day_item", (q) =>
            q.eq("userId", user._id).eq("day", day).eq("itemId", itemId)
          )
          .first();

        if (!existing) {
          await ctx.db.insert("sprintChecklistProgress", {
            userId: user._id,
            day,
            itemId,
            completedAt: Date.now(),
          });
        }
      }
    }

    return { synced: true };
  },
});

// Expire stale pending purchases (24h timeout) - for cron job
export const expireStalePurchases = mutation({
  args: {},
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    const stalePurchases = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .filter((q) => q.lt(q.field("createdAt"), twentyFourHoursAgo))
      .collect();

    for (const purchase of stalePurchases) {
      await ctx.db.patch(purchase._id, {
        status: "expired",
      });
    }

    return { expired: stalePurchases.length };
  },
});

// Get pending purchases eligible for abandonment email
// Criteria: pending status, created 1-24 hours ago, no abandonment email sent yet
export const getPendingForAbandonment = query({
  args: {},
  handler: async (ctx) => {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;

    const pending = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    // Filter in memory since we need complex conditions
    return pending.filter(
      (p) =>
        p.createdAt < oneHourAgo &&
        p.createdAt > twentyFourHoursAgo &&
        !p.abandonmentEmailSentAt
    );
  },
});

// Mark abandonment email as sent
export const markAbandonmentEmailSent = mutation({
  args: { purchaseId: v.id("sprintPendingPurchases") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.purchaseId, {
      abandonmentEmailSentAt: Date.now(),
    });
  },
});
