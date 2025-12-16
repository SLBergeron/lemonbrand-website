// @ts-nocheck
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all achievements with user's earned state
export const getAllWithProgress = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const achievements = await ctx.db.query("achievements").collect();

    if (!args.userId) {
      return achievements.map((a) => ({
        ...a,
        earned: false,
        earnedAt: null,
        isVisible: !a.isSecret,
      }));
    }

    const userAchievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const earnedMap = new Map(
      userAchievements.map((ua) => [ua.achievementId.toString(), ua])
    );

    return achievements.map((a) => {
      const earned = earnedMap.get(a._id.toString());
      return {
        ...a,
        earned: !!earned,
        earnedAt: earned?.earnedAt ?? null,
        isVisible: !a.isSecret || !!earned,
      };
    });
  },
});

// Get user's earned achievements
export const getUserAchievements = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const userAchievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const achievements = await Promise.all(
      userAchievements.map(async (ua) => {
        const achievement = await ctx.db.get(ua.achievementId);
        return {
          ...achievement,
          earnedAt: ua.earnedAt,
          notified: ua.notified,
        };
      })
    );

    return achievements.filter(Boolean);
  },
});

// Get unnotified achievements
export const getUnnotified = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const unnotified = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("notified"), false))
      .collect();

    const achievements = await Promise.all(
      unnotified.map(async (ua) => {
        const achievement = await ctx.db.get(ua.achievementId);
        return { ...achievement, userAchievementId: ua._id };
      })
    );

    return achievements.filter(Boolean);
  },
});

// Mark achievement as notified
export const markNotified = mutation({
  args: { userAchievementId: v.id("userAchievements") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userAchievementId, { notified: true });
  },
});

// Check and award achievements
export const checkAndAward = mutation({
  args: {
    userId: v.id("users"),
    trigger: v.string(), // What triggered the check
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return [];

    // Get user's current stats
    const progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const completedModules = progress.filter((p) => p.status === "completed").length;
    const totalLessonsCompleted = progress.reduce(
      (acc, p) => acc + p.completedLessonIds.length,
      0
    );

    const streak = await ctx.db
      .query("userStreaks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const quizAttempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const perfectQuizzes = quizAttempts.filter((q) => q.score === 100).length;
    const totalModules = (await ctx.db.query("modules").collect()).length;

    // Get already earned achievements
    const earnedAchievements = await ctx.db
      .query("userAchievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const earnedIds = new Set(earnedAchievements.map((ea) => ea.achievementId.toString()));

    // Check all achievements
    const allAchievements = await ctx.db.query("achievements").collect();
    const newlyEarned: any[] = [];

    for (const achievement of allAchievements) {
      if (earnedIds.has(achievement._id.toString())) continue;

      let shouldAward = false;

      switch (achievement.conditionType) {
        case "modules_completed":
          shouldAward = completedModules >= achievement.conditionThreshold;
          break;

        case "quiz_perfect":
          shouldAward = perfectQuizzes >= achievement.conditionThreshold;
          break;

        case "streak_days":
          shouldAward = (streak?.currentStreak ?? 0) >= achievement.conditionThreshold;
          break;

        case "first_completion":
          shouldAward = totalLessonsCompleted >= 1;
          break;

        case "course_complete":
          shouldAward = completedModules >= totalModules;
          break;

        case "time_spent":
          const totalMinutes = progress.reduce((acc, p) => acc + p.timeSpentMinutes, 0);
          shouldAward = totalMinutes >= achievement.conditionThreshold;
          break;
      }

      if (shouldAward) {
        await ctx.db.insert("userAchievements", {
          userId: args.userId,
          achievementId: achievement._id,
          earnedAt: Date.now(),
          notified: false,
        });

        // Award XP
        await ctx.db.patch(args.userId, {
          totalXP: user.totalXP + achievement.xpReward,
        });

        newlyEarned.push(achievement);
      }
    }

    return newlyEarned;
  },
});

// Seed achievements
export const seedAchievements = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("achievements").first();
    if (existing) {
      return { message: "Achievements already seeded" };
    }

    const achievementsData = [
      // Progress
      {
        slug: "first-steps",
        title: "First Steps",
        description: "Complete your first lesson",
        iconType: "footprints",
        category: "progress" as const,
        conditionType: "first_completion" as const,
        conditionThreshold: 1,
        xpReward: 25,
        isSecret: false,
        order: 1,
      },
      {
        slug: "module-master",
        title: "Module Master",
        description: "Complete your first module",
        iconType: "medal",
        category: "progress" as const,
        conditionType: "modules_completed" as const,
        conditionThreshold: 1,
        xpReward: 50,
        isSecret: false,
        order: 2,
      },
      {
        slug: "halfway-there",
        title: "Halfway There",
        description: "Complete 3 modules",
        iconType: "mountain",
        category: "progress" as const,
        conditionType: "modules_completed" as const,
        conditionThreshold: 3,
        xpReward: 100,
        isSecret: false,
        order: 3,
      },
      {
        slug: "course-graduate",
        title: "Course Graduate",
        description: "Complete all modules",
        iconType: "graduation-cap",
        category: "progress" as const,
        conditionType: "course_complete" as const,
        conditionThreshold: 6,
        xpReward: 250,
        isSecret: false,
        order: 4,
      },

      // Mastery
      {
        slug: "perfectionist",
        title: "Perfectionist",
        description: "Score 100% on any quiz",
        iconType: "star",
        category: "mastery" as const,
        conditionType: "quiz_perfect" as const,
        conditionThreshold: 1,
        xpReward: 50,
        isSecret: false,
        order: 5,
      },
      {
        slug: "quiz-master",
        title: "Quiz Master",
        description: "Score 100% on 3 different quizzes",
        iconType: "trophy",
        category: "mastery" as const,
        conditionType: "quiz_perfect" as const,
        conditionThreshold: 3,
        xpReward: 150,
        isSecret: false,
        order: 6,
      },

      // Streak
      {
        slug: "consistent-learner",
        title: "Consistent Learner",
        description: "Maintain a 3-day learning streak",
        iconType: "flame",
        category: "streak" as const,
        conditionType: "streak_days" as const,
        conditionThreshold: 3,
        xpReward: 50,
        isSecret: false,
        order: 7,
      },
      {
        slug: "week-warrior",
        title: "Week Warrior",
        description: "Maintain a 7-day learning streak",
        iconType: "fire",
        category: "streak" as const,
        conditionType: "streak_days" as const,
        conditionThreshold: 7,
        xpReward: 100,
        isSecret: false,
        order: 8,
      },

      // Special/Secret
      {
        slug: "dedicated-learner",
        title: "Dedicated Learner",
        description: "Spend over 2 hours learning",
        iconType: "clock",
        category: "special" as const,
        conditionType: "time_spent" as const,
        conditionThreshold: 120,
        xpReward: 75,
        isSecret: true,
        order: 9,
      },
    ];

    for (const achievement of achievementsData) {
      await ctx.db.insert("achievements", achievement);
    }

    return { message: "Achievements seeded", count: achievementsData.length };
  },
});
