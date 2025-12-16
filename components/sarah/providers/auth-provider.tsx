"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface User {
  _id: Id<"users">;
  email: string;
  name?: string;
  avatarUrl?: string;
  totalXP: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();
  const [convexUser, setConvexUser] = useState<User | null>(null);

  const syncUser = useMutation(api.users.syncFromAuth);
  const getUser = useQuery(
    api.users.getByAuthId,
    session?.user?.id ? { betterAuthId: session.user.id } : "skip"
  );

  // Sync user to Convex when session is available
  useEffect(() => {
    if (session?.user && !getUser) {
      syncUser({
        betterAuthId: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined,
        avatarUrl: session.user.image || undefined,
      });
    }
  }, [session, getUser, syncUser]);

  useEffect(() => {
    if (getUser) {
      setConvexUser(getUser as User);
    } else {
      setConvexUser(null);
    }
  }, [getUser]);

  return (
    <AuthContext.Provider
      value={{
        user: convexUser,
        isLoading: isPending,
        isAuthenticated: !!session && !!convexUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
