"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calculator, Layers, Package, Users } from "lucide-react";
import AdminCalculatorLeadsPage from "./leads/page";
import AdminCalculatorMaterialsPage from "./materials/page";
import CombinationsTab from "./combinations/CombinationsTab";

type CalcTab = "leads" | "materials" | "combinations";

const TABS: { id: CalcTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "leads", label: "Leads", icon: Users },
  { id: "materials", label: "Materials & Rates", icon: Package },
  { id: "combinations", label: "Combinations", icon: Layers },
];

function CalculatorHubInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialParam = searchParams.get("tab") as CalcTab | null;
  const [activeTab, setActiveTab] = useState<CalcTab>(
    initialParam && ["leads", "materials", "combinations"].includes(initialParam)
      ? initialParam
      : "leads"
  );

  useEffect(() => {
    const param = searchParams.get("tab") as CalcTab | null;
    if (param && ["leads", "materials", "combinations"].includes(param)) {
      setActiveTab(param);
    }
  }, [searchParams]);

  function selectTab(tab: CalcTab) {
    setActiveTab(tab);
    router.replace(`/admin/calculator?tab=${tab}`, { scroll: false });
  }

  return (
    <div className="space-y-6">
      {/* Unified Paint Calculator Tab Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0A2621] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading text-base font-bold text-white sm:text-lg">
              Paint Calculator
            </h1>
            <p className="text-xs text-[#C2B69D]">
              Manage leads, material pricing &amp; coverage, and system combinations in one place.
            </p>
          </div>
        </div>

        <div className="inline-flex rounded-xl border border-white/10 bg-[#061C18] p-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectTab(tab.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#061C18] shadow-sm"
                    : "text-[#C2B69D] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Content */}
      <div>
        {activeTab === "leads" && <AdminCalculatorLeadsPage />}
        {activeTab === "materials" && <AdminCalculatorMaterialsPage />}
        {activeTab === "combinations" && <CombinationsTab />}
      </div>
    </div>
  );
}

export default function AdminCalculatorHubPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[#C2B69D]">Loading Paint Calculator…</div>}>
      <CalculatorHubInner />
    </Suspense>
  );
}
