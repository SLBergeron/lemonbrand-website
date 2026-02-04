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
      onboardingStep: 0,
      lastOnboardingEmailAt: Date.now(),
    });

    return { success: true, email: subscriber.email };
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

// Get subscribers who need onboarding emails
// Returns subscribers where enough time has passed since their last email
export const getSubscribersForOnboarding = query({
  handler: async (ctx) => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    // Get all active subscribers with an onboarding step
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    // Filter to those who need the next email
    // Onboarding sequence: 0 (welcome) -> 2 (day 2) -> 3 (day 3) -> 4 (day 4) -> 5 (day 5) -> 7 (day 7) -> null (complete)
    const nextStepMap: Record<number, { nextStep: number | null; daysToWait: number }> = {
      0: { nextStep: 2, daysToWait: 2 },  // Day 0 -> Day 2 (wait 2 days)
      2: { nextStep: 3, daysToWait: 1 },  // Day 2 -> Day 3 (wait 1 day)
      3: { nextStep: 4, daysToWait: 1 },  // Day 3 -> Day 4 (wait 1 day)
      4: { nextStep: 5, daysToWait: 1 },  // Day 4 -> Day 5 (wait 1 day)
      5: { nextStep: 7, daysToWait: 2 },  // Day 5 -> Day 7 (wait 2 days)
      7: { nextStep: null, daysToWait: 0 }, // Day 7 -> complete
    };

    return subscribers
      .filter((s) => {
        if (s.onboardingStep === undefined || s.onboardingStep === null) return false;
        if (!s.lastOnboardingEmailAt) return false;

        const stepConfig = nextStepMap[s.onboardingStep];
        if (!stepConfig || stepConfig.nextStep === null) return false;

        const timeSinceLastEmail = now - s.lastOnboardingEmailAt;
        const waitTime = stepConfig.daysToWait * oneDayMs;

        return timeSinceLastEmail >= waitTime;
      })
      .map((s) => ({
        _id: s._id,
        email: s.email,
        currentStep: s.onboardingStep!,
        nextStep: nextStepMap[s.onboardingStep!]?.nextStep,
      }));
  },
});

// Update onboarding step after sending email
export const updateOnboardingStep = mutation({
  args: {
    subscriberId: v.id("newsletterSubscribers"),
    newStep: v.union(v.number(), v.null()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.subscriberId, {
      onboardingStep: args.newStep ?? undefined,
      lastOnboardingEmailAt: Date.now(),
    });
    return { success: true };
  },
});

// ============================================
// Substack Activation (Simon's Agents)
// ============================================

// Subscribe from Substack activation form
export const subscribeSubstack = mutation({
  args: {
    email: v.string(),
    segment: v.string(), // "internal-tool", "lead-gen", "offer-prototype"
    role: v.optional(v.string()),
    painPoint: v.optional(v.string()),
    triedBefore: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    // Check if email already exists
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // If already has substack sequence, return success
      if (existing.substackStep !== undefined) {
        return { success: true, alreadySubscribed: true };
      }

      // Add substack sequence to existing subscriber
      await ctx.db.patch(existing._id, {
        segment: args.segment,
        role: args.role,
        painPoint: args.painPoint,
        triedBefore: args.triedBefore,
        substackStep: 1,
        lastSubstackEmailAt: Date.now(),
        tags: [...(existing.tags || []), `substack-${args.segment}`],
      });

      return { success: true, isExisting: true, email };
    }

    // Create new subscriber with substack sequence
    await ctx.db.insert("newsletterSubscribers", {
      email,
      status: "active", // No confirmation needed for substack activation
      subscribedAt: Date.now(),
      source: "substack",
      tags: [`substack-${args.segment}`],
      segment: args.segment,
      role: args.role,
      painPoint: args.painPoint,
      triedBefore: args.triedBefore,
      substackStep: 1,
      lastSubstackEmailAt: Date.now(),
    });

    return { success: true, email };
  },
});

// Get subscribers who need Substack welcome emails
export const getSubscribersForSubstackSequence = query({
  handler: async (ctx) => {
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    // Get all active subscribers with a substack step
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    // Substack sequence: 1 (welcome) -> 2 (day 2) -> 3 (day 4) -> 4 (day 7) -> 5 (day 14) -> null (complete)
    const nextStepMap: Record<number, { nextStep: number | null; daysToWait: number }> = {
      1: { nextStep: 2, daysToWait: 2 },  // Day 0 -> Day 2
      2: { nextStep: 3, daysToWait: 2 },  // Day 2 -> Day 4
      3: { nextStep: 4, daysToWait: 3 },  // Day 4 -> Day 7
      4: { nextStep: 5, daysToWait: 7 },  // Day 7 -> Day 14
      5: { nextStep: null, daysToWait: 0 }, // Complete
    };

    return subscribers
      .filter((s) => {
        if (s.substackStep === undefined || s.substackStep === null) return false;
        if (!s.lastSubstackEmailAt) return false;

        const stepConfig = nextStepMap[s.substackStep];
        if (!stepConfig || stepConfig.nextStep === null) return false;

        const timeSinceLastEmail = now - s.lastSubstackEmailAt;
        const waitTime = stepConfig.daysToWait * oneDayMs;

        return timeSinceLastEmail >= waitTime;
      })
      .map((s) => ({
        _id: s._id,
        email: s.email,
        segment: s.segment,
        currentStep: s.substackStep!,
        nextStep: nextStepMap[s.substackStep!]?.nextStep,
      }));
  },
});

// Update substack step after sending email
export const updateSubstackStep = mutation({
  args: {
    subscriberId: v.id("newsletterSubscribers"),
    newStep: v.union(v.number(), v.null()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.subscriberId, {
      substackStep: args.newStep ?? undefined,
      lastSubstackEmailAt: Date.now(),
    });
    return { success: true };
  },
});

// ============================================
// Sprint Waitlist
// ============================================

// Get sprint waitlist subscribers
export const getWaitlistSubscribers = query({
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("newsletterSubscribers")
      .collect();

    return subscribers
      .filter((s) => s.tags?.includes("sprint-waitlist"))
      .map((s) => ({
        email: s.email,
        subscribedAt: s.subscribedAt,
        status: s.status,
      }));
  },
});

// Subscribe to sprint waitlist (no confirmation required)
export const subscribeWaitlist = mutation({
  args: {
    email: v.string(),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    const source = args.source || "sprint-waitlist";

    // Check for existing subscriber
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      // Add tag if not already on waitlist
      const tags = existing.tags || [];
      if (!tags.includes("sprint-waitlist")) {
        await ctx.db.patch(existing._id, {
          tags: [...tags, "sprint-waitlist"],
        });
      }
      return { success: true, alreadySubscribed: existing.status === "active" };
    }

    // Create new subscriber
    await ctx.db.insert("newsletterSubscribers", {
      email,
      status: "active",
      subscribedAt: Date.now(),
      source,
      tags: ["sprint-waitlist"],
    });

    return { success: true };
  },
});
