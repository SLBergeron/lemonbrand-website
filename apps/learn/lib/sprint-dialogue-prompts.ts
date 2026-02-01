/**
 * Day-specific system + user prompt templates for AI dialogue generation.
 *
 * Each day has a system prompt (constant) and a user prompt template
 * (populated with the user's actual data at generation time).
 */

const SHARED_SYSTEM_CONTEXT = `You are a mentor for someone building their first software tool in a 7-Day Sprint.
You give practical, specific advice based on THEIR project. No generic motivational talk.
Keep it short: 3-5 bullet points or 2-3 short paragraphs max.
Write in second person ("you"). Be direct. Reference their specific project by name when possible.
Use markdown formatting (bold for emphasis, bullets for lists).

Projects CAN have persistence. localStorage for browser apps, JSON files for local tools, SQLite for structured data. Simple file-based or browser-based persistence is encouraged — it makes projects more useful and satisfying. What's out of scope is cloud databases requiring auth, environment variable setup, and deployment configuration (PostgreSQL, Convex, Supabase, Firebase). Trackers, planners, and apps that remember things are GREAT Sprint projects when using local persistence.`;

interface DayPrompt {
  system: string;
  buildUserPrompt: (context: DayContext) => string;
}

export interface DayContext {
  projectIdea?: string;
  role?: string;
  techComfort?: string;
  targetUser?: string;
  currentProcess?: string;
  whyMatters?: string;
  successLooksLike?: string;
  // Cumulative form data from all previous days
  formResponses: Record<number, Record<string, any>>;
  // Previous day's AI dialogue (for continuity)
  previousDialogue?: string;
}

function getFormField(
  context: DayContext,
  day: number,
  fieldId: string
): string {
  return context.formResponses[day]?.[fieldId] || "";
}

function buildContextSummary(context: DayContext): string {
  const parts: string[] = [];
  if (context.role) parts.push(`**Their role:** ${context.role}`);
  if (context.techComfort)
    parts.push(`**Tech comfort:** ${context.techComfort}`);
  if (context.projectIdea)
    parts.push(`**Project idea:** ${context.projectIdea}`);
  if (context.targetUser)
    parts.push(`**Target user:** ${context.targetUser}`);
  if (context.currentProcess)
    parts.push(`**Current manual process:** ${context.currentProcess}`);
  return parts.join("\n");
}

export const DAY_PROMPTS: Record<number, DayPrompt> = {
  0: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Project sizing advice. Help them assess if their idea is right-sized for a 7-day sprint.
If their idea seems too big, suggest how to scope it down.
If they seem undecided, suggest 3 specific ideas based on their background.
Good Sprint projects: generators, calculators, formatters, dashboards, trackers (with localStorage), simple tools.
Too big for a Sprint: anything requiring auth, payments, cloud databases, multi-user sync.`,

    buildUserPrompt: (ctx) => `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}
${ctx.whyMatters ? `**Why this matters:** ${ctx.whyMatters}` : ""}
${ctx.successLooksLike ? `**Success looks like:** ${ctx.successLooksLike}` : ""}

Give them practical advice on:
1. Is this project the right size for a 7-day Sprint?
2. What should they focus on first?
3. Any early warnings about scope or complexity?

If their project description is thin, nudge them to add more detail to the form for better guidance.`,
  },

  1: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Scoping tips for their specific project. Help them know what questions to ask Claude during their scoping conversation. Warn about common traps for their project type.`,

    buildUserPrompt: (ctx) => {
      const coreFeature = getFormField(ctx, 1, "coreFeature") || getFormField(ctx, 1, "core-feature");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 0 responses:**
${ctx.formResponses[0] ? Object.entries(ctx.formResponses[0]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 0 form data yet."}

${coreFeature ? `**Core feature defined:** ${coreFeature}` : ""}

Give them scoping advice:
1. What specific questions should they ask Claude during scoping for THIS project?
2. Common traps for this type of project that beginners fall into
3. How to identify the MVP boundary for their specific idea`;
    },
  },

  2: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: CLAUDE.md guidance for their specific project. What to include for their tool type. What makes a good visualization for their project.`,

    buildUserPrompt: (ctx) => `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 1 form data:**
${ctx.formResponses[1] ? Object.entries(ctx.formResponses[1]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 1 form data yet."}

Give them guidance on:
1. What should their CLAUDE.md include for THIS specific project?
2. What key decisions or constraints should be documented?
3. What would a good visualization look like for their type of tool?`,
  },

  3: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Build day prep. Which feature to build first for their specific tool. Common gotchas for their project type. Practical tips for their first real build session.`,

    buildUserPrompt: (ctx) => {
      const openQuestions = getFormField(ctx, 2, "open-questions") || getFormField(ctx, 2, "openQuestions");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 2 form data:**
${ctx.formResponses[2] ? Object.entries(ctx.formResponses[2]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 2 form data yet."}

${openQuestions ? `**Open questions they have:** ${openQuestions}` : ""}

Give them build day advice:
1. Which feature should they build FIRST for their specific tool?
2. Common gotchas for this type of project during first build
3. How to structure their first Claude request for maximum effectiveness
${openQuestions ? "4. Address their open questions if possible" : ""}`;
    },
  },

  4: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Deploy and iterate. What to watch for when their tool goes live. What feedback to prioritize for their type of project.`,

    buildUserPrompt: (ctx) => {
      const whatsRough = getFormField(ctx, 3, "whats-rough") || getFormField(ctx, 3, "whatsRough");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 3 build report:**
${ctx.formResponses[3] ? Object.entries(ctx.formResponses[3]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 3 form data yet."}

Give them deployment advice:
1. What to watch for when deploying THIS type of tool to Vercel
2. ${whatsRough ? `They said "${whatsRough}" is still rough — should they fix this before deploying or after?` : "What to prioritize fixing before vs after deployment"}
3. What feedback to ask for when sharing THIS specific type of tool`;
    },
  },

  5: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Expansion guidance. Which capabilities would add most value to their specific tool. What to skip.`,

    buildUserPrompt: (ctx) => {
      const feedback = getFormField(ctx, 4, "feedback") || getFormField(ctx, 4, "feedback-received");
      const improvements = getFormField(ctx, 4, "improvement-ideas") || getFormField(ctx, 4, "improvementIdeas") || getFormField(ctx, 4, "feedback");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 4 deploy + feedback report:**
${ctx.formResponses[4] ? Object.entries(ctx.formResponses[4]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 4 form data yet."}

${feedback ? `**Feedback received:** ${feedback}` : ""}
${improvements ? `**Their improvement ideas:** ${improvements}` : ""}

Give them expansion advice:
1. ${improvements ? `Of their improvement ideas, which should they prioritize for THIS type of tool?` : "What capability would add the most value to their specific tool?"}
2. What to explicitly SKIP adding (common temptations for this project type)
3. How to keep scope under control on Day 5`;
    },
  },

  6: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Polish priorities. What to fix vs what to leave. Specific robustness checks for their project type.`,

    buildUserPrompt: (ctx) => {
      const toolDescription = getFormField(ctx, 5, "tool-description-now") || getFormField(ctx, 5, "toolDescriptionNow");
      const usefulness = getFormField(ctx, 5, "usefulness-rating") || getFormField(ctx, 5, "usefulnessRating");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 5 expansion report:**
${ctx.formResponses[5] ? Object.entries(ctx.formResponses[5]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 5 form data yet."}

${toolDescription ? `**Tool now does:** ${toolDescription}` : ""}
${usefulness ? `**Usefulness rating:** ${usefulness}` : ""}

Give them polish advice:
1. What are the most important things to polish for THIS specific tool?
2. What robustness checks should they ask Claude about for their project type?
3. What to leave imperfect — "good enough" is the goal for Day 6
${usefulness === "Not yet — but I can see the potential" ? "4. Their tool isn't feeling useful yet — suggest the ONE thing that would change that" : ""}`;
    },
  },

  7: {
    system: `${SHARED_SYSTEM_CONTEXT}

Focus: Ship day. Demo tips specific to their project. What to highlight. How to describe it. Celebrate their achievement.`,

    buildUserPrompt: (ctx) => {
      const oneLiner = getFormField(ctx, 6, "one-sentence") || getFormField(ctx, 6, "one-liner");
      const shipReadiness = getFormField(ctx, 6, "ship-readiness") || getFormField(ctx, 6, "shipReadiness");
      return `Here's what I know about this Sprint participant:

${buildContextSummary(ctx)}

**Day 6 polish report:**
${ctx.formResponses[6] ? Object.entries(ctx.formResponses[6]).map(([k, v]) => `- ${k}: ${v}`).join("\n") : "No Day 6 form data yet."}

${oneLiner ? `**Their one-liner:** "${oneLiner}"` : ""}
${shipReadiness ? `**Ship readiness:** ${shipReadiness}` : ""}

Give them ship day advice:
1. ${oneLiner ? `Help them refine their one-liner: "${oneLiner}"` : "Help them craft a one-sentence description of their tool"}
2. What to highlight in their demo for THIS type of project
3. Demo structure tips (what order to show things, what to skip)
${shipReadiness === "Not sure it's good enough" || shipReadiness === "Behind — still have work to do" ? "4. Reassure them — what they have IS worth shipping. Suggest what to prioritize in the time they have left." : ""}`;
    },
  },
};

/**
 * Simple hash of the context to detect when regeneration is needed.
 */
export function hashContext(context: DayContext): string {
  const str = JSON.stringify({
    projectIdea: context.projectIdea,
    role: context.role,
    formResponses: context.formResponses,
  });
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
