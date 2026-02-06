import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const DEFAULT_RATE_LIMIT = 5; // requests per window for free users
const PAID_RATE_LIMIT = 50; // requests per window for paid users (10x)
const WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check rate limit and increment if allowed.
 * Pass limit to override the default (e.g. 50 for paid users).
 * Returns { allowed: true, remaining: N } or { allowed: false, resetAt: timestamp }
 */
export const checkAndIncrement = mutation({
  args: {
    identifier: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { identifier, limit }) => {
    const rateLimit = limit ?? DEFAULT_RATE_LIMIT;
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    // Find existing rate limit record
    const existing = await ctx.db
      .query("prdRateLimits")
      .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
      .first();

    if (!existing) {
      // First request - create record
      await ctx.db.insert("prdRateLimits", {
        identifier,
        requestCount: 1,
        windowStart: now,
      });
      return { allowed: true, remaining: rateLimit - 1 };
    }

    // Check if window has expired
    if (existing.windowStart < windowStart) {
      // Reset window
      await ctx.db.patch(existing._id, {
        requestCount: 1,
        windowStart: now,
      });
      return { allowed: true, remaining: rateLimit - 1 };
    }

    // Check if under limit
    if (existing.requestCount < rateLimit) {
      await ctx.db.patch(existing._id, {
        requestCount: existing.requestCount + 1,
      });
      return { allowed: true, remaining: rateLimit - existing.requestCount - 1 };
    }

    // Rate limited
    const resetAt = existing.windowStart + WINDOW_MS;
    return { allowed: false, resetAt };
  },
});

/**
 * Check current rate limit status without incrementing.
 */
export const checkStatus = query({
  args: {
    identifier: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { identifier, limit }) => {
    const rateLimit = limit ?? DEFAULT_RATE_LIMIT;
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    const existing = await ctx.db
      .query("prdRateLimits")
      .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
      .first();

    if (!existing || existing.windowStart < windowStart) {
      return { remaining: rateLimit, resetAt: null };
    }

    const remaining = Math.max(0, rateLimit - existing.requestCount);
    const resetAt = existing.requestCount >= rateLimit
      ? existing.windowStart + WINDOW_MS
      : null;

    return { remaining, resetAt };
  },
});

/**
 * Reset rate limit for a specific identifier (admin use).
 */
export const reset = mutation({
  args: {
    identifier: v.string(),
  },
  handler: async (ctx, { identifier }) => {
    const existing = await ctx.db
      .query("prdRateLimits")
      .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { reset: true };
    }

    return { reset: false };
  },
});
