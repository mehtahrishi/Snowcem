"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowRight } from "lucide-react";
import { Button, Field, inputCls } from "@/components/admin/ui";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#061C18] p-4 font-sans">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-[#D8C5B3]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 shadow-lg shadow-[#D4AF37]/15">
            <img
              src="/image.png"
              alt="Snowcem Paints Logo"
              className="h-11 w-auto object-contain"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0A2621] p-6 shadow-2xl shadow-black/40 sm:p-8">
          <h1 className="text-lg font-bold text-[#EDE4D8]">Administrative Sign In</h1>
          <p className="mt-1 mb-6 text-xs leading-relaxed text-[#C2B69D]">
            Enter your administrator credentials to access the Snowcem portal.
          </p>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-400/25 bg-red-500/10 p-3.5 text-xs text-red-200"
            >
              <ShieldAlert className="h-4 w-4 shrink-0 text-red-300" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Field label="Username" required htmlFor="admin-username">
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C2B69D]/60" />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className={`${inputCls} pl-10`}
                />
              </div>
            </Field>

            <Field label="Password" required htmlFor="admin-password">
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C2B69D]/60" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`${inputCls} pl-10 pr-11`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#C2B69D]/70 hover:text-[#EDE4D8] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <Button type="submit" variant="primary" loading={loading} className="mt-2 w-full">
              <span>{loading ? "Signing in..." : "Sign In to Admin Portal"}</span>
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#061C18]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
