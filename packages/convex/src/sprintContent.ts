// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get content for specific day
export const getByDay = query({
  args: { day: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sprintContent")
      .withIndex("by_day", (q) => q.eq("day", args.day))
      .first();
  },
});

// Get all sprint content
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const content = await ctx.db.query("sprintContent").collect();
    return content.sort((a, b) => a.day - b.day);
  },
});

// Create or update day content (admin)
export const upsert = mutation({
  args: {
    day: v.number(),
    title: v.string(),
    subtitle: v.optional(v.string()),
    trainingVideoUrl: v.string(),
    trainingDurationMinutes: v.number(),
    worksheetUrl: v.optional(v.string()),
    markdownContent: v.optional(v.string()),
    markdownContentMac: v.optional(v.string()),
    markdownContentWindows: v.optional(v.string()),
    objectives: v.array(v.string()),
    deliverables: v.array(v.string()),
    checklistItems: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        description: v.optional(v.string()),
      })
    ),
    isFreePreview: v.optional(v.boolean()),
    formSchema: v.optional(v.array(
      v.object({
        id: v.string(),
        type: v.union(
          v.literal("text"),
          v.literal("textarea"),
          v.literal("select"),
          v.literal("radio"),
          v.literal("checkbox")
        ),
        label: v.string(),
        placeholder: v.optional(v.string()),
        required: v.optional(v.boolean()),
        options: v.optional(v.array(v.string())),
      })
    )),
    generatedFileTemplate: v.optional(v.string()),
    bonusContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sprintContent")
      .withIndex("by_day", (q) => q.eq("day", args.day))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }

    return await ctx.db.insert("sprintContent", args);
  },
});

// Seed initial Day 0 content
export const seedDay0 = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("sprintContent")
      .withIndex("by_day", (q) => q.eq("day", 0))
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("sprintContent", {
      day: 0,
      title: "Get Ready to Build",
      subtitle:
        "Before the Sprint officially starts, let's get your tools ready. This takes 30-45 minutes.",
      trainingVideoUrl: "", // To be added
      trainingDurationMinutes: 12,
      objectives: [
        "Set up Claude Code on your machine",
        "Configure your Anthropic API key",
        "Run your first Claude command",
        "Join the Discord and meet your cohort",
      ],
      deliverables: [
        "Working Claude Code installation",
        "Verified API connection",
        "Discord introduction posted",
      ],
      checklistItems: [
        {
          id: "install-claude",
          label: "Install Claude Code",
          description: "Download and install Claude Code CLI on your machine",
        },
        {
          id: "setup-api",
          label: "Set up Anthropic API",
          description: "Create your API key and add it to your environment",
        },
        {
          id: "first-command",
          label: "Run your first command",
          description: "Verify everything works by running a test command",
        },
        {
          id: "join-discord",
          label: "Join the Discord",
          description: "Access your private cohort channel",
        },
        {
          id: "introduce-yourself",
          label: "Introduce yourself",
          description:
            "Post a quick intro in Discord - your name and what you want to build",
        },
      ],
    });
  },
});
