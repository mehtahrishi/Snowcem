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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E5DDD5]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D1B3E] tracking-tight">
            Snowcem Admin Control Center
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Centralized management for authorized dealers, certified painters, and official color catalogues.
          </p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-[#E0D7CE] shadow-sm transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Overview</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dealers Card */}
        <div className="bg-white border border-[#E5DDD5] hover:border-slate-300 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Network Dealers
            </span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Store size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#0D1B3E]">
              {loading ? "..." : stats.dealers}
            </span>
            <span className="text-xs text-slate-500 font-medium">authorized centers</span>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/dealers"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Manage Dealers</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/dealers"
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
            >
              + Add Partner
            </Link>
          </div>
        </div>

        {/* Painters Card */}
        <div className="bg-white border border-[#E5DDD5] hover:border-slate-300 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Certified Painters
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Paintbrush size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#0D1B3E]">
              {loading ? "..." : stats.painters}
            </span>
            <span className="text-xs text-slate-500 font-medium">registered contractors</span>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/painters"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
            >
              <span>Manage Directory</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/painters"
              className="text-[11px] font-semibold text-emerald-700 flex items-center space-x-1"
            >
              <Upload size={12} />
              <span>Bulk XLSX</span>
            </Link>
          </div>
        </div>

        {/* Colors Card */}
        <div className="bg-white border border-[#E5DDD5] hover:border-slate-300 rounded-3xl p-6 transition-all shadow-sm hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Color Catalogue
            </span>
            <div className="p-2.5 rounded-2xl bg-orange-50 text-[#f36c21] border border-orange-100">
              <Palette size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-[#0D1B3E]">
              {loading ? "..." : stats.colors}
            </span>
            <span className="text-xs text-slate-500 font-medium">shades registered</span>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/colors"
              className="text-xs font-bold text-[#f36c21] hover:text-orange-700 flex items-center space-x-1"
            >
              <span>Manage Catalogue</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/admin/colors"
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
            >
              Hex Namer Tool
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Color Namer Tool Showcase */}
        <div className="bg-white border border-[#E5DDD5] rounded-3xl p-7 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-orange-50 text-[#f36c21] border border-orange-100">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#0D1B3E] text-base">
                Hex-to-Color Intelligent Naming
              </h3>
              <p className="text-xs text-slate-500">
                Powered by color-namer library
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            Pick any hex value on the visual picker. The system cross-references against Pantone, NTC, and HTML color dictionaries to auto-fill shade names and generate unique Snowcem product codes.
          </p>
          <Link
            href="/admin/colors"
            className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-[#f36c21] hover:bg-[#e05307] px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all"
          >
            <span>Open Color Manager</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Database & Architecture */}
        <div className="bg-white border border-[#E5DDD5] rounded-3xl p-7 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
              <Database size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#0D1B3E] text-base">
                Stateless Iron Session &amp; MariaDB
              </h3>
              <p className="text-xs text-slate-500">
                Zero database lookup authentication
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-5">
            Admin sessions are cryptographically sealed using 256-bit AES encryption via stateless iron-session cookies. Direct MariaDB connection pool ensures high concurrency and persistent updates.
          </p>
          <div className="flex items-center space-x-4 text-xs text-slate-600">
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Full CRUD Enabled</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Direct SSH Tunnel Ready</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
