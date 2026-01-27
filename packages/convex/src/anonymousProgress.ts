// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Anonymous Progress Tracking
 *
 * Tracks user progress (form responses, checklist completions) from their first visit,
 * even before they provide an email or create an account.
 *
 * Flow:
 * 1. First visit → visitorId generated (localStorage)
 * 2. Day 0-1 form/checklist → saved to anonymousProgress
 * 3. Checkout (email entered) → linkVisitorToEmail
 * 4. Account created → linkVisitorToUser + migrateToUser
 */

// Save anonymous progress (form or checklist)
export const saveAnonymousProgress = mutation({
  args: {
    visitorId: v.string(),
    type: v.union(v.literal("form"), v.literal("checklist")),
    day: v.number(),
    data: v.any(),
  },
  handler: async (ctx, args) => {
    // Check if record exists for this visitor/type/day
    const existing = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor_type_day", (q) =>
        q
          .eq("visitorId", args.visitorId)
          .eq("type", args.type)
          .eq("day", args.day)
      )
      .first();

    if (existing) {
      // Update existing record
      await ctx.db.patch(existing._id, {
        data: args.data,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new record
    return await ctx.db.insert("anonymousProgress", {
      visitorId: args.visitorId,
      type: args.type,
      day: args.day,
      data: args.data,
      updatedAt: Date.now(),
    });
  },
});

// Link all visitor records to an email (called at checkout)
export const linkVisitorToEmail = mutation({
  args: {
    visitorId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
      .collect();

    let updated = 0;
    for (const record of records) {
      if (!record.linkedEmail) {
        await ctx.db.patch(record._id, {
          linkedEmail: args.email.toLowerCase(),
        });
        updated++;
      }
    }

    return { updated };
  },
});

// Link all visitor records to a user (called at account creation)
export const linkVisitorToUser = mutation({
  args: {
    visitorId: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
      .collect();

    let updated = 0;
    for (const record of records) {
      if (!record.linkedUserId) {
        await ctx.db.patch(record._id, {
          linkedUserId: args.userId,
        });
        updated++;
      }
    }

    return { updated };
  },
});

// Migrate anonymous data to user's permanent tables
// Called after account creation to copy form responses to sprintFormResponses
export const migrateToUser = mutation({
  args: {
    visitorId: v.string(),
    userId: v.id("users"),
    enrollmentId: v.optional(v.id("sprintEnrollments")),
  },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
      .filter((q) => q.eq(q.field("migratedAt"), undefined))
      .collect();

    let migrated = 0;

    for (const record of records) {
      if (record.type === "form") {
        // Check if form response already exists for this user/day
        const existingForm = await ctx.db
          .query("sprintFormResponses")
          .withIndex("by_user_day", (q) =>
            q.eq("userId", args.userId).eq("day", record.day)
          )
          .first();

        if (!existingForm) {
          // Handle both old format (data = responses) and new format (data = { responses, generatedContent })
          const formData = record.data?.responses || record.data;
          const generatedContent = record.data?.generatedContent;

          // Migrate form response
          await ctx.db.insert("sprintFormResponses", {
            userId: args.userId,
            enrollmentId: args.enrollmentId,
            day: record.day,
            responses: formData,
            generatedContent: generatedContent,
            submittedAt: record.updatedAt,
          });
        }
      } else if (record.type === "checklist" && record.data?.completedItems) {
        // Migrate checklist items
        for (const itemId of record.data.completedItems) {
          const existingItem = await ctx.db
            .query("sprintChecklistProgress")
            .withIndex("by_user_day_item", (q) =>
              q.eq("userId", args.userId).eq("day", record.day).eq("itemId", itemId)
            )
            .first();

          if (!existingItem) {
            await ctx.db.insert("sprintChecklistProgress", {
              userId: args.userId,
              day: record.day,
              itemId,
              completedAt: record.updatedAt,
            });
          }
        }
      }

      // Mark as migrated
      await ctx.db.patch(record._id, {
        linkedUserId: args.userId,
        migratedAt: Date.now(),
      });
      migrated++;
    }

    return { migrated };
  },
});

// Get all progress for a visitor
export const getByVisitor = query({
  args: { visitorId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor", (q) => q.eq("visitorId", args.visitorId))
      .collect();
  },
});

// Get all progress linked to an email
export const getAnonymousProgressByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("anonymousProgress")
      .withIndex("by_email", (q) => q.eq("linkedEmail", args.email.toLowerCase()))
      .collect();
  },
});

// Get project idea for an email (for personalized outreach)
export const getProjectIdeaByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Find Day 0 form response linked to this email
    const formRecord = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_email", (q) => q.eq("linkedEmail", args.email.toLowerCase()))
      .filter((q) =>
        q.and(q.eq(q.field("type"), "form"), q.eq(q.field("day"), 0))
      )
      .first();

    if (!formRecord || !formRecord.data) {
      return null;
    }

    // Handle both old format (data = responses) and new format (data = { responses, generatedContent })
    const responses = formRecord.data.responses || formRecord.data;
    const generatedContent = formRecord.data.generatedContent || null;

    // Return relevant fields for outreach
    return {
      whatToBuild: responses.whatToBuild || null,
      projectBrief: responses.projectBrief || null,
      experience: responses.experience || null,
      motivation: responses.motivation || null,
      generatedContent, // The AI-generated PRD
      updatedAt: formRecord.updatedAt,
    };
  },
});

// Get abandoned checkouts with project ideas (for batch outreach)
export const getAbandonedWithProjectIdeas = query({
  args: {},
  handler: async (ctx) => {
    // Get pending purchases that have linked anonymous progress
    const pendingPurchases = await ctx.db
      .query("sprintPendingPurchases")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    const results = [];

    for (const purchase of pendingPurchases) {
      // Get anonymous progress for this email
      const formRecords = await ctx.db
        .query("anonymousProgress")
        .withIndex("by_email", (q) => q.eq("linkedEmail", purchase.email))
        .filter((q) => q.eq(q.field("type"), "form"))
        .collect();

      // Count completed days
      const daysCompleted = formRecords.length;

      // Find Day 0 project idea (handle both old and new data formats)
      const day0Form = formRecords.find((r) => r.day === 0);
      const day0Responses = day0Form?.data?.responses || day0Form?.data;
      const projectIdea = day0Responses?.whatToBuild || null;
      const generatedContent = day0Form?.data?.generatedContent || null;

      if (projectIdea) {
        results.push({
          email: purchase.email,
          projectIdea,
          generatedContent, // Include the AI-generated PRD if available
          lastActivityAt: Math.max(...formRecords.map((r) => r.updatedAt)),
          daysCompleted,
          purchaseCreatedAt: purchase.createdAt,
          abandonmentEmailSent: !!purchase.abandonmentEmailSentAt,
        });
      }
    }

    // Sort by last activity (most recent first)
    return results.sort((a, b) => b.lastActivityAt - a.lastActivityAt);
  },
});

// Get form response for a specific visitor and day
export const getFormByVisitorDay = query({
  args: {
    visitorId: v.string(),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor_type_day", (q) =>
        q.eq("visitorId", args.visitorId).eq("type", "form").eq("day", args.day)
      )
      .first();

    return record?.data || null;
  },
});

// Get checklist state for a specific visitor and day
export const getChecklistByVisitorDay = query({
  args: {
    visitorId: v.string(),
    day: v.number(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("anonymousProgress")
      .withIndex("by_visitor_type_day", (q) =>
        q
          .eq("visitorId", args.visitorId)
          .eq("type", "checklist")
          .eq("day", args.day)
      )
      .first();

    return record?.data || null;
  },
});
