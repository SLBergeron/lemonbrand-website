"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";

const PROJECT_IDEAS = [
  { value: "productivity", label: "A personal productivity tool" },
  { value: "business", label: "Something for my business" },
  { value: "client", label: "A client-facing product" },
  { value: "undecided", label: "I have ideas but haven't decided yet" },
];

export function JoinForm() {
  const router = useRouter();
  const syncUser = useMutation(api.users.syncFromAuth);
  const cohort = useQuery(api.sprintCohorts.getActive);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    projectIdea: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create account with BetterAuth
      const result = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (result.error) {
        setError(result.error.message || "Failed to create account");
        setIsLoading(false);
        return;
      }

      // Sync user to Convex
      if (result.data?.user) {
        await syncUser({
          betterAuthId: result.data.user.id,
          email: formData.email,
          name: formData.name,
        });

        // Store project idea in session storage for checkout
        if (formData.projectIdea) {
          sessionStorage.setItem("sprintProjectIdea", formData.projectIdea);
        }

        // Redirect to checkout
        router.push("/checkout/sprint");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">First Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="What should we call you?"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">
          This is where you&apos;ll get Day 0 access
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          minLength={8}
          disabled={isLoading}
        />
        <p className="text-xs text-muted-foreground">At least 8 characters</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectIdea">
          What are you hoping to build?{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <select
          id="projectIdea"
          value={formData.projectIdea}
          onChange={(e) =>
            setFormData({ ...formData, projectIdea: e.target.value })
          }
          disabled={isLoading}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select an option...</option>
          {PROJECT_IDEAS.map((idea) => (
            <option key={idea.value} value={idea.value}>
              {idea.label}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        className="w-full"
        disabled={isLoading || !cohort}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating your account...
          </>
        ) : (
          <>
            Continue to Payment
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="text-accent hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}
