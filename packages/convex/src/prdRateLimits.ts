import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const RATE_LIMIT = 5; // requests per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Check rate limit and increment if allowed.
 * Returns { allowed: true, remaining: N } or { allowed: false, resetAt: timestamp }
 */
export const checkAndIncrement = mutation({
  args: {
    identifier: v.string(),
  },
  handler: async (ctx, { identifier }) => {
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
      return { allowed: true, remaining: RATE_LIMIT - 1 };
    }

    // Check if window has expired
    if (existing.windowStart < windowStart) {
      // Reset window
      await ctx.db.patch(existing._id, {
        requestCount: 1,
        windowStart: now,
      });
      return { allowed: true, remaining: RATE_LIMIT - 1 };
    }

    // Check if under limit
    if (existing.requestCount < RATE_LIMIT) {
      await ctx.db.patch(existing._id, {
        requestCount: existing.requestCount + 1,
      });
      return { allowed: true, remaining: RATE_LIMIT - existing.requestCount - 1 };
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
  },
  handler: async (ctx, { identifier }) => {
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    const existing = await ctx.db
      .query("prdRateLimits")
      .withIndex("by_identifier", (q) => q.eq("identifier", identifier))
      .first();

    if (!existing || existing.windowStart < windowStart) {
      return { remaining: RATE_LIMIT, resetAt: null };
    }

    const remaining = Math.max(0, RATE_LIMIT - existing.requestCount);
    const resetAt = existing.requestCount >= RATE_LIMIT
      ? existing.windowStart + WINDOW_MS
      : null;

    return { remaining, resetAt };
  },
});
