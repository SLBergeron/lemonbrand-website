// @ts-nocheck
// Note: ts-nocheck is temporary until `npx convex dev` generates proper types
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get quiz questions for a module
export const getQuestions = query({
  args: { moduleId: v.id("modules") },
  handler: async (ctx, args) => {
    const questions = await ctx.db
      .query("quizQuestions")
      .withIndex("by_module", (q) => q.eq("moduleId", args.moduleId))
      .collect();

    // Sort by question number and remove correct answers for client
    return questions
      .sort((a, b) => a.questionNumber - b.questionNumber)
      .map((q) => ({
        _id: q._id,
        questionNumber: q.questionNumber,
        type: q.type,
        question: q.question,
        options: q.options?.map((opt) => ({
          id: opt.id,
          text: opt.text,
          // Don't send isCorrect to client
        })),
        points: q.points,
      }));
  },
});

// Check a single answer (for immediate feedback)
export const checkAnswer = mutation({
  args: {
    questionId: v.id("quizQuestions"),
    selectedAnswer: v.string(),
  },
  handler: async (ctx, args) => {
    const question = await ctx.db.get(args.questionId);
    if (!question) return null;

    let isCorrect = false;
    let correctId = null;

    if (question.type === "true_false") {
      isCorrect = question.correctAnswer === args.selectedAnswer;
      correctId = question.correctAnswer;
    } else {
      const correctOption = question.options?.find((opt) => opt.isCorrect);
      isCorrect = correctOption?.id === args.selectedAnswer;
      correctId = correctOption?.id;
    }

    return {
      isCorrect,
      correctId,
      explanation: question.explanation,
    };
  },
});

// Submit quiz attempt
export const submitAttempt = mutation({
  args: {
    userId: v.id("users"),
    moduleId: v.id("modules"),
    answers: v.array(
      v.object({
        questionId: v.id("quizQuestions"),
        selectedAnswer: v.string(),
        timeSpentSeconds: v.number(),
      })
    ),
    startedAt: v.number(),
  },
  handler: async (ctx, args) => {
    // Get questions with correct answers
    const questions = await ctx.db
      .query("quizQuestions")
      .withIndex("by_module", (q) => q.eq("moduleId", args.moduleId))
      .collect();

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    // Score answers
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    const scoredAnswers = args.answers.map((answer) => {
      const question = questionMap.get(answer.questionId.toString());
      if (!question) {
        return { ...answer, isCorrect: false };
      }

      totalPoints += question.points;

      // Check correctness based on question type
      let isCorrect = false;
      if (question.type === "true_false") {
        isCorrect = question.correctAnswer === answer.selectedAnswer;
      } else if (question.options) {
        const correctOption = question.options.find((opt) => opt.isCorrect);
        isCorrect = correctOption?.id === answer.selectedAnswer;
      }

      if (isCorrect) {
        correctCount++;
        earnedPoints += question.points;
      }

      return { ...answer, isCorrect };
    });

    const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
    const passed = score >= 70;

    // Count previous attempts
    const previousAttempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .collect();

    // Create attempt record
    const attemptId = await ctx.db.insert("quizAttempts", {
      userId: args.userId,
      moduleId: args.moduleId,
      attemptNumber: previousAttempts.length + 1,
      answers: scoredAnswers,
      score,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      startedAt: args.startedAt,
      completedAt: Date.now(),
      passed,
    });

    // Check if module was already completed (this is a retake)
    const existingProgress = await ctx.db
      .query("userProgress")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .first();

    const wasAlreadyCompleted = existingProgress?.status === "completed";

    // If passed, mark module as completed (only if not already)
    if (passed) {
      if (existingProgress && !wasAlreadyCompleted) {
        await ctx.db.patch(existingProgress._id, {
          status: "completed",
          percentComplete: 100,
          completedAt: Date.now(),
        });
      }

      // Only award XP if this is the FIRST time passing
      if (!wasAlreadyCompleted) {
        const module = await ctx.db.get(args.moduleId);
        if (module) {
          const user = await ctx.db.get(args.userId);
          if (user) {
            // Quiz pass XP
            let xpEarned = 25;
            // Perfect score bonus
            if (score === 100) xpEarned += 25;
            // Module completion XP
            xpEarned += module.xpReward;

            await ctx.db.patch(args.userId, {
              totalXP: user.totalXP + xpEarned,
            });
          }

          // Check for module unlocks
          await checkAndUnlockModules(ctx, args.userId, module.slug);
        }
      }
    }

    // Check achievements
    // (This would trigger achievement checks for quiz-related achievements)

    return {
      attemptId,
      score,
      passed,
      correctCount,
      totalQuestions: questions.length,
      answers: scoredAnswers.map((a) => ({
        questionId: a.questionId,
        isCorrect: a.isCorrect,
      })),
      isRetake: wasAlreadyCompleted,
    };
  },
});

// Get attempt history for a module
export const getAttemptHistory = query({
  args: {
    userId: v.id("users"),
    moduleId: v.id("modules"),
  },
  handler: async (ctx, args) => {
    const attempts = await ctx.db
      .query("quizAttempts")
      .withIndex("by_user_module", (q) =>
        q.eq("userId", args.userId).eq("moduleId", args.moduleId)
      )
      .collect();

    return attempts.sort((a, b) => b.attemptNumber - a.attemptNumber);
  },
});

// Get quiz results with explanations
export const getResults = query({
  args: { attemptId: v.id("quizAttempts") },
  handler: async (ctx, args) => {
    const attempt = await ctx.db.get(args.attemptId);
    if (!attempt) return null;

    // Get questions with explanations
    const questions = await ctx.db
      .query("quizQuestions")
      .withIndex("by_module", (q) => q.eq("moduleId", attempt.moduleId))
      .collect();

    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    const detailedAnswers = attempt.answers.map((answer) => {
      const question = questionMap.get(answer.questionId.toString());
      return {
        question: question?.question,
        selectedAnswer: answer.selectedAnswer,
        isCorrect: answer.isCorrect,
        correctAnswer: question?.correctAnswer,
        explanation: question?.explanation,
        options: question?.options,
      };
    });

    return {
      ...attempt,
      detailedAnswers,
    };
  },
});

// Helper: Check and unlock modules
async function checkAndUnlockModules(
  ctx: any,
  userId: any,
  completedModuleSlug: string
) {
  const allModules = await ctx.db.query("modules").collect();

  for (const module of allModules) {
    if (!module.isLocked) continue;

    const existingUnlock = await ctx.db
      .query("moduleUnlocks")
      .withIndex("by_user_module", (q: any) =>
        q.eq("userId", userId).eq("moduleId", module._id)
      )
      .first();

    if (existingUnlock) continue;

    if (
      module.unlockCondition?.type === "module_complete" &&
      module.unlockCondition.targetSlug === completedModuleSlug
    ) {
      await ctx.db.insert("moduleUnlocks", {
        userId,
        moduleId: module._id,
        unlockedAt: Date.now(),
        unlockedBy: "prerequisite",
      });
    }
  }
}

// Seed quiz questions for Module 1
export const seedModule1Quiz = mutation({
  handler: async (ctx) => {
    const module1 = await ctx.db
      .query("modules")
      .withIndex("by_slug", (q) => q.eq("slug", "ai-foundations"))
      .first();

    if (!module1) {
      return { error: "Module 1 not found. Seed modules first." };
    }

    // Delete existing questions to allow re-seeding with updated content
    const existing = await ctx.db
      .query("quizQuestions")
      .withIndex("by_module", (q) => q.eq("moduleId", module1._id))
      .collect();

    for (const q of existing) {
      await ctx.db.delete(q._id);
    }

    const questions = [
      {
        moduleId: module1._id,
        questionNumber: 1,
        type: "scenario" as const,
        question:
          "A colleague wants to paste a client's full contract into an AI assistant to get a summary. What should you advise?",
        options: [
          { id: "a", text: "Go ahead - AI assistants are secure", isCorrect: false },
          {
            id: "b",
            text: "Anonymize sensitive details first, or use an enterprise-tier tool with data protection",
            isCorrect: true,
          },
          { id: "c", text: "Never use AI for any legal documents", isCorrect: false },
          { id: "d", text: "Only use it if the contract is under 10 pages", isCorrect: false },
        ],
        explanation:
          "Always anonymize sensitive information (client names, financial details) before using consumer AI tools. Enterprise tiers typically offer 'no training on your data' guarantees, making them safer for confidential work.",
        points: 10,
      },
      {
        moduleId: module1._id,
        questionNumber: 2,
        type: "scenario" as const,
        question:
          "You're getting inconsistent results from AI. Your prompts usually say things like 'Write me something about our product launch.' What's the most effective fix?",
        options: [
          { id: "a", text: "Try different AI tools until one works better", isCorrect: false },
          { id: "b", text: "Make your prompts shorter and simpler", isCorrect: false },
          {
            id: "c",
            text: "Add context (who you are, the audience), specify the format, and show examples of what you want",
            isCorrect: true,
          },
          { id: "d", text: "Use more formal language", isCorrect: false },
        ],
        explanation:
          "The RCTF framework works: Role (who should the AI be), Context (what's the situation), Task (what exactly you need), Format (how should output look). Adding examples of good outputs dramatically improves results.",
        points: 10,
      },
      {
        moduleId: module1._id,
        questionNumber: 3,
        type: "scenario" as const,
        question:
          "You've built a custom AI assistant with your brand guidelines and templates uploaded. When is this MORE useful than a regular AI chat?",
        options: [
          { id: "a", text: "Only for very complex tasks", isCorrect: false },
          { id: "b", text: "Never - regular chat is always just as good", isCorrect: false },
          {
            id: "c",
            text: "For recurring tasks where you'd otherwise repeat the same instructions every time",
            isCorrect: true,
          },
          { id: "d", text: "Only when working with images", isCorrect: false },
        ],
        explanation:
          "Custom assistants shine for recurring work. Instead of re-explaining your brand voice, templates, and preferences each time, the assistant remembers. This saves time and ensures consistency across outputs.",
        points: 10,
      },
      {
        moduleId: module1._id,
        questionNumber: 4,
        type: "scenario" as const,
        question:
          "Your team is using AI to draft customer emails. Using the human-in-the-loop principle, what's the right level of oversight?",
        options: [
          { id: "a", text: "Full autonomy - let AI send emails directly to save time", isCorrect: false },
          {
            id: "b",
            text: "AI drafts, human reviews and approves before sending",
            isCorrect: true,
          },
          { id: "c", text: "Don't use AI for customer communication at all", isCorrect: false },
          { id: "d", text: "Only review emails to VIP customers", isCorrect: false },
        ],
        explanation:
          "Customer communication sits in the 'Draft + Review' zone of the trust spectrum. AI can draft efficiently, but a human should review for tone, accuracy, and brand alignment before anything reaches customers.",
        points: 10,
      },
      {
        moduleId: module1._id,
        questionNumber: 5,
        type: "true_false" as const,
        question:
          "When choosing between AI tools, you should pick one and master it deeply rather than trying to use many tools superficially.",
        correctAnswer: "true",
        explanation:
          "Tool mastery beats tool-hopping. While different AI tools have different strengths, knowing one tool deeply (its quirks, best prompts, limitations) delivers more value than surface-level familiarity with many. You can always expand later.",
        points: 10,
      },
    ];

    for (const question of questions) {
      await ctx.db.insert("quizQuestions", question);
    }

    return { message: "Quiz questions seeded", count: questions.length, replaced: existing.length };
  },
});
