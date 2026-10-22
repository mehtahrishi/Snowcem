"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Paintbrush,
  Palette,
  Database,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
  Upload,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{
    dealers: number;
    painters: number;
    colors: number;
  }>({ dealers: 0, painters: 0, colors: 0 });

  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || { dealers: 0, painters: 0, colors: 0 });
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#D8C7B3]/[0.10]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#EDE4D8] tracking-tight">
            Snowcem Admin Control Center
          </h1>
          <p className="text-sm text-[#C2B69D] mt-1 font-medium">
            Centralized management for authorized dealers, certified painters, and official color catalogues.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0A2621] hover:bg-[#0E302A] text-[#EDE4D8] border border-[#D8C7B3]/[0.15] transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Overview</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dealers Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] hover:border-[#D4AF37]/40 rounded-3xl p-6 transition-all shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#C2B69D] uppercase tracking-wider">
              Network Dealers
            </span>
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Store size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#EDE4D8]">
              {loading ? "..." : stats.dealers}
            </span>
            <span className="text-xs text-[#C2B69D] font-medium">authorized centers</span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D8C7B3]/[0.08] flex items-center justify-between">
            <Link
              href="/admin/dealers"
              className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center space-x-1"
            >
              <span>Manage Dealers</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/dealers"
              className="text-[11px] font-semibold text-[#C2B69D] hover:text-[#EDE4D8]"
            >
              + Add Partner
            </Link>
          </div>
        </div>

        {/* Painters Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] hover:border-[#D4AF37]/40 rounded-3xl p-6 transition-all shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#C2B69D] uppercase tracking-wider">
              Certified Painters
            </span>
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Paintbrush size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#EDE4D8]">
              {loading ? "..." : stats.painters}
            </span>
            <span className="text-xs text-[#C2B69D] font-medium">registered contractors</span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D8C7B3]/[0.08] flex items-center justify-between">
            <Link
              href="/admin/painters"
              className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center space-x-1"
            >
              <span>Manage Directory</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/painters"
              className="text-[11px] font-semibold text-[#D4AF37] flex items-center space-x-1"
            >
              <Upload size={12} />
              <span>Bulk XLSX</span>
            </Link>
          </div>
        </div>

        {/* Colors Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] hover:border-[#D4AF37]/40 rounded-3xl p-6 transition-all shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#C2B69D] uppercase tracking-wider">
              Color Catalogue
            </span>
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Palette size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#EDE4D8]">
              {loading ? "..." : stats.colors}
            </span>
            <span className="text-xs text-[#C2B69D] font-medium">shades registered</span>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D8C7B3]/[0.08] flex items-center justify-between">
            <Link
              href="/admin/colors"
              className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center space-x-1"
            >
              <span>Manage Catalogue</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/colors"
              className="text-[11px] font-semibold text-[#C2B69D] hover:text-[#EDE4D8]"
            >
              Hex Namer Tool
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Color Namer Tool Showcase */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] rounded-3xl p-7 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#EDE4D8] text-base">
                Hex-to-Color Intelligent Naming
              </h3>
              <p className="text-xs text-[#C2B69D]">
                Powered by color-namer library
              </p>
            </div>
          </div>
          <p className="text-xs text-[#C2B69D] leading-relaxed mb-5">
            Pick any hex value on the visual picker. The system cross-references against Pantone, NTC, and HTML color dictionaries to auto-fill shade names and generate unique Snowcem product codes.
          </p>
          <Link
            href="/admin/colors"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#061C18] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 px-4 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/25 transition-all"
          >
            <span>Open Color Manager</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Database & Architecture */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] rounded-3xl p-7 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Database size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#EDE4D8] text-base">
                Stateless Iron Session &amp; MariaDB
              </h3>
              <p className="text-xs text-[#C2B69D]">
                Zero database lookup authentication
              </p>
            </div>
          </div>
          <p className="text-xs text-[#C2B69D] leading-relaxed mb-5">
            Admin sessions are cryptographically sealed using 256-bit AES encryption via stateless iron-session cookies. Direct MariaDB connection pool ensures high concurrency and persistent updates.
          </p>
          <div className="flex items-center space-x-4 text-xs text-[#C2B69D]">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-[#D4AF37]" />
              <span>Full CRUD Enabled</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-[#D4AF37]" />
              <span>Direct SSH Tunnel Ready</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
