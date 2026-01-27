// Re-export schema and all convex functions
export { default as schema } from "./schema";
export * from "./auth";
export * from "./sprintCohorts";
export * from "./sprintContent";
export * from "./sprintDayProgress";
export * from "./sprintEnrollments";
export * from "./sprintCheckout";
export * from "./sprintFormResponses";
export * from "./sprintChecklistProgress";
export * from "./seedSprintContent";
export * from "./users";
export * from "./prdRateLimits";

// Re-export the generated api for use in Next.js API routes
export { api, internal } from "./_generated/api";

// Re-export types from dataModel for use in Next.js
export type { Id, Doc, TableNames, DataModel } from "./_generated/dataModel";
