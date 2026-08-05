"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-cyan flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-foreground-muted text-sm">
            Sign in to manage your NextGen Tech dashboard.
          </p>
        </div>

        <div className="card-base p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm text-foreground-muted mb-2"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder="admin@nextgentech.com"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm text-foreground-muted mb-2"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-glass-bg border border-glass-border rounded-xl px-4 py-3 text-foreground placeholder:text-foreground-dim focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
