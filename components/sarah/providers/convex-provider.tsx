"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convex = convexUrl
  ? new ConvexReactClient(convexUrl, { expectAuth: true })
  : null;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // Return children without Convex when URL is not configured
    return <>{children}</>;
  }

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
