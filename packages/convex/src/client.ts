// Client-safe exports only
// This file should ONLY export the api object and types
// DO NOT import any server-side code here

// Re-export the generated api for use with useQuery/useMutation in React
export { api, internal } from "./_generated/api";

// Re-export types from dataModel for use in Next.js
export type { Id, Doc, TableNames, DataModel } from "./_generated/dataModel";
