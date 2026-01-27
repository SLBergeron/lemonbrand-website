"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@lemonbrand/ui";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { signIn, useSession } from "@/lib/auth-client";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<"google" | "email" | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (session?.user) {
      router.push("/sprint");
    }
  }, [session, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setAuthMethod("google");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/sprint",
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
      setAuthMethod(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAuthMethod("email");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      setAuthMethod(null);
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      setLoading(false);
      setAuthMethod(null);
      return;
    }

    try {
      const result = await signIn.email({
        email: email.toLowerCase(),
        password,
      });

      if (result.error) {
        setError(result.error.message || "Invalid email or password.");
        setLoading(false);
        setAuthMethod(null);
        return;
      }

      // Success - redirect to sprint
      router.push("/sprint");
    } catch (err) {
      console.error("Email sign-in error:", err);
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      setAuthMethod(null);
    }
  };

  // Show loading while checking session
  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Already logged in, show loading while redirecting
  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link
            href="https://lemonbrand.io"
            className="font-display font-bold text-2xl tracking-tight"
          >
            LemonBrand
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight mt-6">
            Welcome back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your courses
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          {/* Error message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading && authMethod === "google" ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <svg className="size-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full"
              disabled={loading || !email || !password}
            >
              {loading && authMethod === "email" ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Sign In
            </Button>
          </form>
        </div>

        {/* Footer links */}
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-accent hover:text-foreground underline underline-offset-4 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
