// Server-side exports (Convex functions)
// NOTE: For client-side React code, import from "@lemonbrand/convex/client" instead
// to avoid bundling server code into the browser

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

// Also re-export client-safe exports for convenience in server contexts
export { api, internal } from "./_generated/api";
export type { Id, Doc, TableNames, DataModel } from "./_generated/dataModel";
