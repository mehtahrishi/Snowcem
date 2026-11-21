"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Store,
  Paintbrush,
  Palette,
  Package,
  Layers,
  Sparkles,
  Briefcase,
  UserCheck,
  Video,
  Mail,
  Calculator,
  SlidersHorizontal,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import {
  PageHeader,
  StatCard,
  Button,
  useToast,
} from "@/components/admin/ui";

interface StatsData {
  dealers: number;
  painters: number;
  colors: number;
  categories: number;
  products: number;
  featured: number;
  jobs: number;
  jobApplications: number;
  media: number;
  curatedPalettes: number;
  inquiries: number;
  calcLeads: number;
  calcMaterials: number;
  calcCombinations: number;
}

const EMPTY_STATS: StatsData = {
  dealers: 0,
  painters: 0,
  colors: 0,
  categories: 0,
  products: 0,
  featured: 0,
  jobs: 0,
  jobApplications: 0,
  media: 0,
  curatedPalettes: 0,
  inquiries: 0,
  calcLeads: 0,
  calcMaterials: 0,
  calcCombinations: 0,
};

export default function AdminDashboardPage() {
  const toast = useToast();
  const [stats, setStats] = useState<StatsData>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to load overview stats");
      const data = await res.json();
      setStats(data.stats || EMPTY_STATS);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

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
      href: "/admin/calculator?tab=leads",
      cta: "Open Calculator",
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
      title: "Job Applications",
      count: stats.jobApplications,
      label: "candidate resumes",
      icon: UserCheck,
      href: "/admin/job-applications",
      cta: "Review Applicants",
      highlight: true,
    },
    {
      title: "Calculator Materials",
      count: stats.calcMaterials,
      label: `${stats.calcCombinations} system combos`,
      icon: Calculator,
      href: "/admin/calculator?tab=materials",
      cta: "Manage Rates & Combos",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        description="Overview of products, colours, dealers, painters, and customer leads."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={fetchStats} loading={loading}>
            Refresh Overview
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group block rounded-2xl transition hover:-translate-y-0.5 ${
              card.highlight
                ? "ring-1 ring-[#D4AF37]/35 hover:ring-[#D4AF37]/60"
                : "hover:ring-1 hover:ring-white/20"
            }`}
          >
            <StatCard
              icon={card.icon}
              label={card.title}
              value={loading ? "…" : card.count}
              hint={
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span>{card.label}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#D4AF37] group-hover:text-[#F3E5AB]">
                    {card.cta}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
