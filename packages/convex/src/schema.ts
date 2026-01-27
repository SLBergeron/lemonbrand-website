import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles (linked to BetterAuth)
  users: defineTable({
    betterAuthId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
    lastActiveAt: v.number(),
    preferredPace: v.optional(
      v.union(v.literal("relaxed"), v.literal("moderate"), v.literal("intensive"))
    ),
    notificationsEnabled: v.boolean(),
    totalXP: v.number(),
    stripeCustomerId: v.optional(v.string()),
  })
    .index("by_betterAuthId", ["betterAuthId"])
    .index("by_email", ["email"]),

  // Module definitions (content structure)
  modules: defineTable({
    slug: v.string(),
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("fundamentals"),
      v.literal("communication"),
      v.literal("creative"),
      v.literal("data"),
      v.literal("operations"),
      v.literal("strategic")
    ),
    order: v.number(),
    estimatedMinutes: v.number(),
    imageUrl: v.string(),
    prerequisiteModuleSlugs: v.array(v.string()),
    isLocked: v.boolean(),
    unlockCondition: v.optional(
      v.object({
        type: v.union(
          v.literal("module_complete"),
          v.literal("quiz_score"),
          v.literal("percentage_complete")
        ),
        targetSlug: v.optional(v.string()),
        threshold: v.optional(v.number()),
      })
    ),
    xpReward: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_order", ["order"]),

  // Lessons within modules
  lessons: defineTable({
    moduleId: v.id("modules"),
    slug: v.string(),
    number: v.string(), // e.g., "1.1", "2.3"
    title: v.string(),
    estimatedMinutes: v.number(),
    order: v.number(),
    contentType: v.union(
      v.literal("text"),
      v.literal("video"),
      v.literal("interactive"),
      v.literal("quiz")
    ),
    content: v.string(), // Markdown or JSON depending on type
    videoUrl: v.optional(v.string()),
    xpReward: v.number(),
  })
    .index("by_module", ["moduleId"])
    .index("by_slug", ["slug"])
    .index("by_module_order", ["moduleId", "order"]),

  // Quiz questions (separate for flexibility)
  quizQuestions: defineTable({
    moduleId: v.id("modules"),
    questionNumber: v.number(),
    type: v.union(
      v.literal("scenario"),
      v.literal("true_false"),
      v.literal("matching"),
      v.literal("ranking"),
      v.literal("reflection")
    ),
    question: v.string(),
    options: v.optional(
      v.array(
        v.object({
          id: v.string(),
          text: v.string(),
          isCorrect: v.optional(v.boolean()),
        })
      )
    ),
    correctAnswer: v.optional(v.string()),
    explanation: v.string(),
    points: v.number(),
  })
    .index("by_module", ["moduleId"])
    .index("by_module_number", ["moduleId", "questionNumber"]),

  // User progress tracking
  userProgress: defineTable({
    userId: v.id("users"),
    moduleId: v.id("modules"),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    completedLessonIds: v.array(v.id("lessons")),
    percentComplete: v.number(),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    timeSpentMinutes: v.number(),
    lastAccessedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_module", ["userId", "moduleId"])
    .index("by_user_status", ["userId", "status"]),

  // Quiz attempts and scores
  quizAttempts: defineTable({
    userId: v.id("users"),
    moduleId: v.id("modules"),
    attemptNumber: v.number(),
    answers: v.array(
      v.object({
        questionId: v.id("quizQuestions"),
        selectedAnswer: v.string(),
        isCorrect: v.boolean(),
        timeSpentSeconds: v.number(),
      })
    ),
    score: v.number(),
    totalQuestions: v.number(),
    correctAnswers: v.number(),
    startedAt: v.number(),
    completedAt: v.number(),
    passed: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_module", ["userId", "moduleId"]),

  // Achievement definitions
  achievements: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    iconType: v.string(),
    category: v.union(
      v.literal("progress"),
      v.literal("mastery"),
      v.literal("streak"),
      v.literal("special")
    ),
    conditionType: v.union(
      v.literal("modules_completed"),
      v.literal("quiz_perfect"),
      v.literal("streak_days"),
      v.literal("category_complete"),
      v.literal("time_spent"),
      v.literal("first_completion"),
      v.literal("course_complete")
    ),
    conditionThreshold: v.number(),
    conditionTarget: v.optional(v.string()),
    xpReward: v.number(),
    isSecret: v.boolean(),
    order: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"]),

  // User achievements (earned badges)
  userAchievements: defineTable({
    userId: v.id("users"),
    achievementId: v.id("achievements"),
    earnedAt: v.number(),
    notified: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_user_achievement", ["userId", "achievementId"]),

  // Learning streaks
  userStreaks: defineTable({
    userId: v.id("users"),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActivityDate: v.string(), // YYYY-MM-DD
    streakHistory: v.array(
      v.object({
        date: v.string(),
        minutesSpent: v.number(),
        lessonsCompleted: v.number(),
      })
    ),
  }).index("by_user", ["userId"]),

  // Module unlock state
  moduleUnlocks: defineTable({
    userId: v.id("users"),
    moduleId: v.id("modules"),
    unlockedAt: v.number(),
    unlockedBy: v.union(
      v.literal("default"),
      v.literal("prerequisite"),
      v.literal("achievement"),
      v.literal("manual")
    ),
  })
    .index("by_user", ["userId"])
    .index("by_user_module", ["userId", "moduleId"]),

  // ============================================
  // NEW: Page-based learning (Brilliant-style)
  // ============================================

  // Page progress tracking (simpler than modules)
  pageProgress: defineTable({
    userId: v.id("users"),
    pageId: v.string(), // e.g., "youre-not-behind", "the-intern-metaphor"
    completedAt: v.number(),
    xpEarned: v.number(),
    stepAnswers: v.optional(v.any()), // Store user's answers for personalization
    timeSpentSeconds: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_page", ["userId", "pageId"]),

  // Page badges earned
  pageBadges: defineTable({
    userId: v.id("users"),
    pageId: v.string(),
    badgeName: v.string(),
    badgeIcon: v.string(),
    xpReward: v.number(),
    earnedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_page", ["userId", "pageId"]),

  // ============================================
  // Newsletter & Templates (Personal Brand)
  // ============================================

  // Newsletter subscribers
  newsletterSubscribers: defineTable({
    email: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("active"),
      v.literal("unsubscribed")
    ),
    confirmationToken: v.optional(v.string()),
    confirmedAt: v.optional(v.number()),
    unsubscribedAt: v.optional(v.number()),
    subscribedAt: v.number(),
    source: v.string(), // "homepage", "templates", "youtube", "substack"
    tags: v.array(v.string()),
    // Onboarding sequence tracking
    onboardingStep: v.optional(v.number()), // 0=welcome, 2=day2, 3=day3, 4=day4, 5=day5, 7=day7, null=complete
    lastOnboardingEmailAt: v.optional(v.number()),
    // Substack welcome sequence tracking
    substackStep: v.optional(v.number()), // 1=welcome, 2=buildstack, 3=casestudy, 4=failure, 5=cta, null=complete
    lastSubstackEmailAt: v.optional(v.number()),
    // Substack-specific fields
    segment: v.optional(v.string()), // "internal-tool", "lead-gen", "offer-prototype"
    role: v.optional(v.string()),
    painPoint: v.optional(v.string()),
    triedBefore: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_confirmation_token", ["confirmationToken"])
    .index("by_onboarding", ["status", "onboardingStep"])
    .index("by_substack", ["status", "substackStep"]),

  // Templates catalog (GitHub repos with step-by-step guides)
  templates: defineTable({
    slug: v.string(),
    title: v.string(),
    tagline: v.optional(v.string()), // Short hook, e.g., "Stop undercharging for projects"
    description: v.string(),
    category: v.union(
      v.literal("process"),
      v.literal("code"),
      v.literal("ai")
    ),
    isAvailable: v.boolean(),
    isFeatured: v.optional(v.boolean()), // Show prominently at top
    order: v.optional(v.number()), // Lower = first (default 100)
    githubUrl: v.string(),
    guideUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()), // Link to related YouTube video
    prerequisites: v.array(v.string()),
    whatYoullGet: v.optional(v.array(v.string())), // Bullet points of deliverables
    whoIsThisFor: v.optional(v.string()), // Target audience one-liner
    thumbnailUrl: v.optional(v.string()),
    accessCount: v.number(),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_available", ["isAvailable"])
    .index("by_order", ["order"]),

  // Template access tracking
  templateAccess: defineTable({
    templateId: v.id("templates"),
    email: v.string(),
    accessedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_template", ["templateId"]),

  // ============================================
  // Sprint Program (7-Day AI Building)
  // ============================================

  // Sprint cohorts (admin-managed)
  sprintCohorts: defineTable({
    cohortId: v.string(), // e.g., "feb-2025"
    name: v.string(), // "February 2025"
    startDate: v.string(), // "2025-02-03" (Day 0)
    endDate: v.string(), // "2025-02-10" (Day 7)
    maxSpots: v.number(), // 10
    spotsRemaining: v.number(),
    status: v.union(
      v.literal("upcoming"),
      v.literal("active"),
      v.literal("completed")
    ),
    discordInviteUrl: v.optional(v.string()),
    stripePriceId: v.string(),
  })
    .index("by_cohortId", ["cohortId"])
    .index("by_status", ["status"]),

  // Sprint enrollments (purchases)
  sprintEnrollments: defineTable({
    userId: v.id("users"),
    cohortId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    stripeCheckoutSessionId: v.optional(v.string()),
    stripePaymentIntentId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"), // Account created, payment pending
      v.literal("active"), // Payment confirmed, enrolled
      v.literal("completed"), // Finished all 7 days
      v.literal("credit_applied"), // $297 credit used toward 8-Week
      v.literal("expired") // Didn't complete, credit expired
    ),
    enrollmentType: v.optional(v.union(v.literal("cohort"), v.literal("self-paced"))), // cohort (default) or self-paced
    amountPaid: v.number(), // In cents (29700 = $297)
    currency: v.string(), // "usd"
    enrolledAt: v.optional(v.number()), // When payment confirmed
    completedAt: v.optional(v.number()), // When Day 7 completed
    creditExpiresAt: v.optional(v.number()), // 12 months from completion
    creditAppliedAt: v.optional(v.number()), // When used toward 8-Week
    projectIdea: v.optional(v.string()), // Captured during signup
  })
    .index("by_user", ["userId"])
    .index("by_cohort", ["cohortId"])
    .index("by_status", ["status"])
    .index("by_stripe_checkout", ["stripeCheckoutSessionId"]),

  // Sprint pending purchases (email-first checkout before account creation)
  sprintPendingPurchases: defineTable({
    email: v.string(),
    stripeSessionId: v.string(),
    stripeCustomerId: v.optional(v.string()),
    status: v.union(
      v.literal("pending"), // Checkout started, awaiting payment
      v.literal("completed"), // Payment confirmed
      v.literal("expired") // Abandoned checkout (24h timeout)
    ),
    localProgress: v.optional(v.any()), // Stored Day 0-1 progress from localStorage
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
    abandonmentEmailSentAt: v.optional(v.number()), // When cart abandonment email was sent
  })
    .index("by_email", ["email"])
    .index("by_session", ["stripeSessionId"])
    .index("by_status", ["status"]),

  // Sprint day progress (Days 0-7)
  sprintDayProgress: defineTable({
    userId: v.id("users"),
    enrollmentId: v.id("sprintEnrollments"),
    day: v.number(), // 0-7
    status: v.union(
      v.literal("locked"),
      v.literal("available"),
      v.literal("in_progress"),
      v.literal("completed")
    ),
    trainingWatched: v.boolean(),
    worksheetCompleted: v.boolean(),
    progressPosted: v.boolean(), // Posted in Discord
    completedAt: v.optional(v.number()),
    notes: v.optional(v.string()), // User's personal notes
  })
    .index("by_user", ["userId"])
    .index("by_enrollment", ["enrollmentId"])
    .index("by_user_day", ["userId", "day"]),

  // Sprint content (admin-managed day content)
  sprintContent: defineTable({
    day: v.number(), // 0-7
    title: v.string(), // "Setup + Project Selection"
    subtitle: v.optional(v.string()),
    trainingVideoUrl: v.string(), // YouTube/Vimeo embed URL
    trainingDurationMinutes: v.number(), // 15
    worksheetUrl: v.optional(v.string()), // PDF download URL
    markdownContent: v.optional(v.string()), // Additional content
    markdownContentMac: v.optional(v.string()), // OS-specific content for Mac
    markdownContentWindows: v.optional(v.string()), // OS-specific content for Windows
    objectives: v.array(v.string()), // Learning objectives
    deliverables: v.array(v.string()), // What to complete
    checklistItems: v.array(
      v.object({
        id: v.string(),
        label: v.string(),
        description: v.optional(v.string()),
      })
    ),
    isFreePreview: v.optional(v.boolean()), // Day 0-1 = true
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
    )), // Dynamic form fields per day
    generatedFileTemplate: v.optional(v.string()), // Template for downloads
    bonusContent: v.optional(v.string()), // Collapsible advanced content
  }).index("by_day", ["day"]),

  // ============================================
  // Sprint Form Responses & Checklist Tracking
  // ============================================

  // Form responses per day
  sprintFormResponses: defineTable({
    userId: v.id("users"),
    enrollmentId: v.optional(v.id("sprintEnrollments")),
    day: v.number(),
    responses: v.any(), // Form field values
    generatedContent: v.optional(v.string()), // Generated markdown
    submittedAt: v.number(),
  })
    .index("by_user_day", ["userId", "day"])
    .index("by_enrollment", ["enrollmentId"]),

  // Granular checklist tracking
  sprintChecklistProgress: defineTable({
    userId: v.id("users"),
    day: v.number(),
    itemId: v.string(),
    completedAt: v.number(),
  })
    .index("by_user_day", ["userId", "day"])
    .index("by_user_day_item", ["userId", "day", "itemId"]),

  // ============================================
  // PRD Generation Rate Limiting
  // ============================================

  // Rate limits for AI PRD generation (5 requests/hour per IP)
  prdRateLimits: defineTable({
    identifier: v.string(), // IP address or user ID
    requestCount: v.number(),
    windowStart: v.number(), // Timestamp of window start
  }).index("by_identifier", ["identifier"]),
});
