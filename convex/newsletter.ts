import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Generate a random token for email confirmation
function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Subscribe a new email
export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.string(),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    // Check if email already exists
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // If already active, just return success
      if (existing.status === "active") {
        return { success: true, alreadySubscribed: true };
      }

      // If pending or unsubscribed, reactivate with new token
      const token = generateToken();
      await ctx.db.patch(existing._id, {
        status: "pending",
        confirmationToken: token,
        subscribedAt: Date.now(),
        source: args.source,
        tags: args.tags || [],
      });

      return { success: true, token, isResubscribe: true };
    }

    // Create new subscriber
    const token = generateToken();
    await ctx.db.insert("newsletterSubscribers", {
      email,
      status: "pending",
      confirmationToken: token,
      subscribedAt: Date.now(),
      source: args.source,
      tags: args.tags || [],
    });

    return { success: true, token };
  },
});

// Confirm email subscription
export const confirm = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_confirmation_token", (q) =>
        q.eq("confirmationToken", args.token)
      )
      .first();

    if (!subscriber) {
      return { success: false, error: "Invalid or expired token" };
    }

    if (subscriber.status === "active") {
      return { success: true, alreadyConfirmed: true };
    }

    await ctx.db.patch(subscriber._id, {
      status: "active",
      confirmedAt: Date.now(),
      confirmationToken: undefined,
    });

    return { success: true };
  },
});

// Unsubscribe
export const unsubscribe = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    const subscriber = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!subscriber) {
      return { success: false, error: "Email not found" };
    }

    await ctx.db.patch(subscriber._id, {
      status: "unsubscribed",
      unsubscribedAt: Date.now(),
    });

    return { success: true };
  },
});

// Get subscriber by email
export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    return await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
  },
});

// Get subscriber count (for social proof)
export const getActiveCount = query({
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
    return subscribers.length;
  },
});
