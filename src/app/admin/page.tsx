"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Paintbrush,
  Palette,
  Package,
  Layers,
  Sparkles,
  Briefcase,
  Video,
  Mail,
  Calculator,
  SlidersHorizontal,
  ArrowRight,
  RefreshCw,
  PlusCircle,
  Clock,
  TrendingUp,
} from "lucide-react";

interface StatsData {
  dealers: number;
  painters: number;
  colors: number;
  categories: number;
  products: number;
  featured: number;
  jobs: number;
  media: number;
  curatedPalettes: number;
  inquiries: number;
  calcLeads: number;
  calcMaterials: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    dealers: 0,
    painters: 0,
    colors: 0,
    categories: 0,
    products: 0,
    featured: 0,
    jobs: 0,
    media: 0,
    curatedPalettes: 0,
    inquiries: 0,
    calcLeads: 0,
    calcMaterials: 0,
  });

  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(
          data.stats || {
            dealers: 0,
            painters: 0,
            colors: 0,
            categories: 0,
            products: 0,
            featured: 0,
            jobs: 0,
            media: 0,
            curatedPalettes: 0,
            inquiries: 0,
            calcLeads: 0,
            calcMaterials: 0,
          }
        );
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

  const statCards = [
    {
      title: "Products",
      count: stats.products,
      label: "catalogued paints",
      icon: Package,
      href: "/admin/products",
      cta: "Manage Products",
    },
    {
      title: "Categories",
      count: stats.categories,
      label: "divisions & types",
      icon: Layers,
      href: "/admin/categories",
      cta: "Manage Categories",
    },
    {
      title: "Color Catalogue",
      count: stats.colors,
      label: "registered shades",
      icon: Palette,
      href: "/admin/colors",
      cta: "Color Library",
    },
    {
      title: "Curated Palettes",
      count: stats.curatedPalettes,
      label: "visualizer shades",
      icon: SlidersHorizontal,
      href: "/admin/curated-palettes",
      cta: "Manage Palettes",
    },
    {
      title: "Customer Inquiries",
      count: stats.inquiries,
      label: "queries & leads",
      icon: Mail,
      href: "/admin/inquiries",
      cta: "View Leads",
      highlight: true,
    },
    {
      title: "Paint Calculator Leads",
      count: stats.calcLeads,
      label: "budget estimates",
      icon: Calculator,
      href: "/admin/calculator/leads",
      cta: "View Calculator Leads",
      highlight: true,
    },
    {
      title: "Network Dealers",
      count: stats.dealers,
      label: "authorized centers",
      icon: Store,
      href: "/admin/dealers",
      cta: "Manage Dealers",
    },
    {
      title: "Certified Painters",
      count: stats.painters,
      label: "contractors registered",
      icon: Paintbrush,
      href: "/admin/painters",
      cta: "Manage Painters",
    },
    {
      title: "Explore Our Best",
      count: stats.featured,
      label: "hero spotlight items",
      icon: Sparkles,
      href: "/admin/featured",
      cta: "Manage Featured",
    },
    {
      title: "Media & TVCs",
      count: stats.media,
      label: "brand commercials",
      icon: Video,
      href: "/admin/media",
      cta: "Manage Media",
    },
    {
      title: "Career Openings",
      count: stats.jobs,
      label: "active job postings",
      icon: Briefcase,
      href: "/admin/jobs",
      cta: "Manage Jobs",
    },
    {
      title: "Calculator Materials",
      count: stats.calcMaterials,
      label: "cost & coverage specs",
      icon: Calculator,
      href: "/admin/calculator/materials",
      cta: "Manage Rates",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#D8C7B3]/[0.10]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#EDE4D8] tracking-tight">
            Snowcem Admin Control Center
          </h1>
          <p className="text-sm text-[#C2B69D] mt-1 font-medium">
            Live overview of all product catalogs, consumer inquiries, dealers, painters, and calculator models.
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

      {/* Grid of Dynamic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`bg-[#0A2621] border rounded-3xl p-5 transition-all shadow-lg shadow-black/20 flex flex-col justify-between ${
                card.highlight
                  ? "border-[#D4AF37]/40 bg-gradient-to-br from-[#0A2621] via-[#0D302A] to-[#0A2621]"
                  : "border-[#D8C7B3]/[0.10] hover:border-[#D4AF37]/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#C2B69D] uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div
                    className={`p-2 rounded-xl border ${
                      card.highlight
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30"
                        : "bg-[#D4AF37]/[0.10] text-[#D4AF37] border-[#D4AF37]/20"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline space-x-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#EDE4D8]">
                    {loading ? "..." : card.count}
                  </span>
                  <span className="text-xs text-[#C2B69D] font-medium">{card.label}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#D8C7B3]/[0.08] flex items-center justify-between">
                <Link
                  href={card.href}
                  className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center space-x-1"
                >
                  <span>{card.cta}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Callouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Inquiries Action Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] rounded-3xl p-7 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#EDE4D8] text-base">
                Unified Customer Lead Queue
              </h3>
              <p className="text-xs text-[#C2B69D]">
                Website Contact, Let&apos;s Connect Popup &amp; Painting Assistance
              </p>
            </div>
          </div>
          <p className="text-xs text-[#C2B69D] leading-relaxed mb-5">
            Real-time feed of all incoming customer requests from across the platform. Update lead status from Unread to In Progress or Resolved.
          </p>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#061C18] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 px-4 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/25 transition-all"
          >
            <span>Review Customer Inquiries</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Color Management Card */}
        <div className="bg-[#0A2621] border border-[#D8C7B3]/[0.10] rounded-3xl p-7 shadow-lg shadow-black/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/[0.12] text-[#D4AF37] border border-[#D4AF37]/20">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#EDE4D8] text-base">
                Color Catalogue &amp; Curated Decks
              </h3>
              <p className="text-xs text-[#C2B69D]">
                296 catalog shades &amp; 1,800 room visualizer palettes
              </p>
            </div>
          </div>
          <p className="text-xs text-[#C2B69D] leading-relaxed mb-5">
            Full control over brand shades, hex codes, color families, and curated room themes. Color matching is synchronised across the live visualizer and public shade finder.
          </p>
          <Link
            href="/admin/colors"
            className="inline-flex items-center space-x-2 text-xs font-bold text-[#061C18] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] hover:brightness-110 px-4 py-2.5 rounded-xl shadow-md shadow-[#D4AF37]/25 transition-all"
          >
            <span>Open Color Manager</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
