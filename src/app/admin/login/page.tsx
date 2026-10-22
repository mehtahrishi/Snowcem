"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowRight, Paintbrush } from "lucide-react";

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
    <div className="min-h-screen bg-[#061C18] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#D8C5B3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] shadow-lg shadow-[#D4AF37]/20 mb-4">
            <Paintbrush className="w-7 h-7 text-[#061C18]" />
          </div>
          <h1 className="text-2xl font-black text-[#EDE4D8] tracking-tight">
            SNOWCEM PAINTS
          </h1>
          <p className="text-[#C2B69D] text-xs mt-1 font-medium">
            Authorized Administrator Control Center
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] rounded-3xl p-7 sm:p-9 shadow-xl shadow-black/40">
          <h2 className="text-lg font-bold text-[#EDE4D8] mb-1">Administrative Sign In</h2>
          <p className="text-xs text-[#C2B69D] mb-6">
            Enter your secure administrator credentials to access the panel.
          </p>

          {error && (
            <div className="mb-5 flex items-center space-x-2.5 p-3.5 bg-[#7A2E2E]/35 border border-[#E8A0A0]/30 text-[#E8A0A0] rounded-xl text-xs">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-[#E8A0A0]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#C2B69D] uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C2B69D]/70">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0E302A] border border-[#D8C7B3]/[0.15] rounded-xl text-sm text-[#EDE4D8] placeholder-[#C2B69D]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/25 focus:border-[#D4AF37] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#C2B69D] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C2B69D]/70">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 bg-[#0E302A] border border-[#D8C7B3]/[0.15] rounded-xl text-sm text-[#EDE4D8] placeholder-[#C2B69D]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/25 focus:border-[#D4AF37] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#C2B69D]/70 hover:text-[#EDE4D8]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 text-[#061C18] font-bold text-sm rounded-xl shadow-lg shadow-[#D4AF37]/25 transition-all disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Admin Portal"}</span>
              <ArrowRight size={16} />
            </button>
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
        <div className="min-h-screen bg-[#061C18] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
