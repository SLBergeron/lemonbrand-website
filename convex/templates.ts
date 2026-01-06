import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all available templates
export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("templates")
      .withIndex("by_available", (q) => q.eq("isAvailable", true))
      .collect();
  },
});

// Get templates by category
export const listByCategory = query({
  args: {
    category: v.union(
      v.literal("process"),
      v.literal("code"),
      v.literal("ai")
    ),
  },
  handler: async (ctx, args) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return templates.filter((t) => t.isAvailable);
  },
});

// Get template by slug
export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Record template access and increment count
export const recordAccess = mutation({
  args: {
    templateId: v.id("templates"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    // Check if already accessed by this email
    const existingAccess = await ctx.db
      .query("templateAccess")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();

    const alreadyAccessed = existingAccess.some(
      (a) => a.templateId === args.templateId
    );

    if (!alreadyAccessed) {
      // Record the access
      await ctx.db.insert("templateAccess", {
        templateId: args.templateId,
        email,
        accessedAt: Date.now(),
      });

      // Increment access count
      const template = await ctx.db.get(args.templateId);
      if (template) {
        await ctx.db.patch(args.templateId, {
          accessCount: template.accessCount + 1,
        });
      }
    }

    // Return the template with GitHub URL
    const template = await ctx.db.get(args.templateId);
    return template;
  },
});

// Get access count for a template
export const getAccessCount = query({
  args: {
    templateId: v.id("templates"),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db.get(args.templateId);
    return template?.accessCount ?? 0;
  },
});

// Seed the 7 initial templates
export const seedTemplates = mutation({
  handler: async (ctx) => {
    const templates = [
      {
        slug: "quote-builder",
        title: "Quote Builder for Web Devs",
        description:
          "Build professional quotes for web dev projects. GitHub repo with step-by-step guide.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/quote-builder",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "pricing-calculator",
        title: "Pricing Calculator",
        description:
          "Calculate pricing for contracts and projects. Never undercharge again.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/pricing-calculator",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "youtube-video-generation",
        title: "YouTube Video Generation Process",
        description:
          "Step-by-step workflow for generating YouTube content efficiently.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/youtube-generation-process",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "citizenship-test-app",
        title: "Canadian Citizenship Test App",
        description:
          "Interactive app for Canadian citizenship test preparation.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/citizenship-test-app",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "bilingual-letter-template",
        title: "Bilingual Letter Template",
        description:
          "Template for sending letters (FR/EN) to contact groups. Perfect for announcements.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/bilingual-letter-template",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "claude-code-guide",
        title: "Claude Code Assistant Guide",
        description:
          "How to use Claude Code as your coding assistant. From basics to advanced workflows.",
        category: "ai" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/claude-code-guide",
        prerequisites: ["Claude Code", "GitHub account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "vercel-deployment-guide",
        title: "Vercel Deployment Guide",
        description:
          "Step-by-step guide to deploying your projects on Vercel. From zero to production.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/vercel-deployment-guide",
        prerequisites: ["GitHub account", "Vercel account"],
        accessCount: 0,
        createdAt: Date.now(),
      },
    ];

    // Check if templates already exist
    const existingTemplates = await ctx.db.query("templates").collect();
    if (existingTemplates.length > 0) {
      return { success: false, message: "Templates already seeded" };
    }

    // Insert all templates
    for (const template of templates) {
      await ctx.db.insert("templates", template);
    }

    return { success: true, count: templates.length };
  },
});

// Clear all templates (for development)
export const clearTemplates = mutation({
  handler: async (ctx) => {
    const templates = await ctx.db.query("templates").collect();
    for (const template of templates) {
      await ctx.db.delete(template._id);
    }
    return { success: true, deleted: templates.length };
  },
});
