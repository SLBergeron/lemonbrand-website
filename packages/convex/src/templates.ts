import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all available templates, sorted by order
export const list = query({
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_available", (q) => q.eq("isAvailable", true))
      .collect();
    // Sort by order (lower first), then by createdAt (newer first)
    return templates.sort((a, b) => {
      const orderA = a.order ?? 100;
      const orderB = b.order ?? 100;
      if (orderA !== orderB) return orderA - orderB;
      return b.createdAt - a.createdAt;
    });
  },
});

// Get featured template (for homepage hero)
export const getFeatured = query({
  handler: async (ctx) => {
    const templates = await ctx.db
      .query("templates")
      .withIndex("by_available", (q) => q.eq("isAvailable", true))
      .collect();
    return templates.find((t) => t.isFeatured) ?? null;
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
        tagline: "Stop sending embarrassing spreadsheet quotes",
        description:
          "Professional quote generator that makes you look established. Clients see a polished PDF, you see a simple form. Built with Next.js.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/quote-builder",
        videoUrl: "https://www.youtube.com/watch?v=example1",
        prerequisites: ["Claude Code", "GitHub account", "Node.js installed"],
        whatYoullGet: [
          "Complete Next.js application code",
          "PDF generation with professional styling",
          "Client-facing quote viewer",
          "Admin dashboard for managing quotes",
          "Step-by-step setup guide",
        ],
        whoIsThisFor: "Freelance developers and small agencies who quote custom projects",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "pricing-calculator",
        title: "Pricing Calculator",
        tagline: "Never undercharge for a project again",
        description:
          "Input your costs, desired profit, and project scope. Get a price that actually makes sense. Based on real agency pricing models.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/pricing-calculator",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        prerequisites: ["Claude Code", "GitHub account"],
        whatYoullGet: [
          "Interactive pricing calculator",
          "Hourly vs project-based comparison",
          "Profit margin calculator",
          "Scope creep buffer formula",
          "Export to quote template",
        ],
        whoIsThisFor: "Anyone who struggles to price their services confidently",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "youtube-video-generation",
        title: "YouTube Video Generation Process",
        tagline: "From idea to published in 2 hours",
        description:
          "The exact process I use to script, record, and edit YouTube videos. Includes AI prompts for scripting and thumbnail generation.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/youtube-generation-process",
        videoUrl: "https://www.youtube.com/watch?v=example3",
        prerequisites: ["Claude Code", "Screen recording software", "Basic video editor"],
        whatYoullGet: [
          "Complete production workflow document",
          "AI prompts for script generation",
          "Thumbnail creation process",
          "Equipment recommendations (budget-friendly)",
          "Publishing checklist",
        ],
        whoIsThisFor: "Developers who want to start a YouTube channel but don't know where to begin",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "citizenship-test-app",
        title: "Canadian Citizenship Test App",
        tagline: "Learn by building something real",
        description:
          "Full quiz application with progress tracking, spaced repetition, and mobile-first design. Perfect for learning React patterns.",
        category: "code" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/citizenship-test-app",
        prerequisites: ["Claude Code", "GitHub account", "Basic React knowledge"],
        whatYoullGet: [
          "Complete React application",
          "Quiz engine with scoring",
          "Progress persistence (localStorage)",
          "Mobile-responsive design",
          "Extensible question format",
        ],
        whoIsThisFor: "Developers who learn best by studying real, working applications",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "bilingual-letter-template",
        title: "Bilingual Letter Template",
        tagline: "Professional announcements in minutes",
        description:
          "Template system for sending polished letters in English and French. Includes mail merge, contact management, and PDF export.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/bilingual-letter-template",
        prerequisites: ["Claude Code", "Google account (for Sheets)"],
        whatYoullGet: [
          "Letter templates (EN/FR)",
          "Contact list spreadsheet format",
          "Mail merge instructions",
          "PDF export workflow",
          "Example letters for common scenarios",
        ],
        whoIsThisFor: "Canadian businesses or anyone needing professional bilingual communications",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "claude-code-guide",
        title: "Claude Code Assistant Guide",
        tagline: "10x your coding speed in a weekend",
        description:
          "Everything I've learned using Claude Code daily for 6+ months. From basic prompts to advanced multi-file refactoring workflows.",
        category: "ai" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/claude-code-guide",
        videoUrl: "https://www.youtube.com/watch?v=example6",
        prerequisites: ["Claude Code subscription", "VS Code or terminal"],
        whatYoullGet: [
          "Prompt templates for common tasks",
          "Multi-file editing patterns",
          "Debugging workflow guide",
          "Project scaffolding prompts",
          "Real examples from my projects",
        ],
        whoIsThisFor: "Developers who have Claude Code but aren't getting full value from it",
        accessCount: 0,
        createdAt: Date.now(),
      },
      {
        slug: "vercel-deployment-guide",
        title: "Vercel Deployment Guide",
        tagline: "From localhost to live in 10 minutes",
        description:
          "Step-by-step deployment for Next.js projects. Covers environment variables, custom domains, and common gotchas that break deployments.",
        category: "process" as const,
        isAvailable: true,
        githubUrl: "https://github.com/SLBergeron/vercel-deployment-guide",
        prerequisites: ["GitHub account", "Vercel account (free tier works)"],
        whatYoullGet: [
          "Deployment checklist",
          "Environment variable setup guide",
          "Custom domain configuration",
          "Troubleshooting common errors",
          "CI/CD workflow explanation",
        ],
        whoIsThisFor: "Developers deploying their first production project",
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

// Update a template's video URL
export const updateVideoUrl = mutation({
  args: {
    slug: v.string(),
    videoUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!template) {
      return { success: false, message: "Template not found" };
    }

    await ctx.db.patch(template._id, { videoUrl: args.videoUrl });
    return { success: true, id: template._id };
  },
});

// Update a template's thumbnail URL
export const updateThumbnailUrl = mutation({
  args: {
    slug: v.string(),
    thumbnailUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const template = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!template) {
      return { success: false, message: "Template not found" };
    }

    await ctx.db.patch(template._id, { thumbnailUrl: args.thumbnailUrl });
    return { success: true, id: template._id };
  },
});

// Set a template as featured (only one can be featured)
export const setFeatured = mutation({
  args: {
    slug: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Clear existing featured
    const allTemplates = await ctx.db.query("templates").collect();
    for (const t of allTemplates) {
      if (t.isFeatured) {
        await ctx.db.patch(t._id, { isFeatured: false });
      }
    }

    // Set new featured
    const template = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!template) {
      return { success: false, message: "Template not found" };
    }

    await ctx.db.patch(template._id, {
      isFeatured: true,
      order: args.order ?? 1,
    });
    return { success: true, id: template._id };
  },
});

// Add the proposal generator template
export const addProposalTemplate = mutation({
  handler: async (ctx) => {
    // Check if already exists
    const existing = await ctx.db
      .query("templates")
      .withIndex("by_slug", (q) => q.eq("slug", "proposal-generator"))
      .first();

    if (existing) {
      return { success: false, message: "Proposal template already exists", id: existing._id };
    }

    const id = await ctx.db.insert("templates", {
      slug: "proposal-generator",
      title: "The $4,500 Proposal Template",
      tagline: "Close deals in 5 minutes, not 2 hours",
      description:
        "The exact proposal template that closed a $4,500 deal. Print-optimized, professional, and dead simple to customize with AI. Stop spending hours on proposals.",
      category: "process" as const,
      isAvailable: true,
      githubUrl: "https://github.com/SLBergeron/proposal-template",
      videoUrl: "https://youtu.be/V4gbpooTLYs",
      thumbnailUrl: "https://raw.githubusercontent.com/SLBergeron/proposal-template/main/PROPOSAL_GENERATOR.png",
      prerequisites: ["Node.js installed", "Claude or any AI assistant", "5 minutes"],
      whatYoullGet: [
        "7-page print-optimized proposal template",
        "React + Vite project (easy to run)",
        "Professional PDF export",
        "Pricing table with anchoring built in",
        "Full customization guide",
      ],
      whoIsThisFor: "Freelancers, agencies, and consultants who send proposals",
      accessCount: 0,
      createdAt: Date.now(),
    });

    return { success: true, id };
  },
});
