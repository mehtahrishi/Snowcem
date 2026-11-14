"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Calculator,
  User,
  Phone,
  MapPin,
  Calendar,
  Trash2,
  RefreshCw,
  Clock,
  Paintbrush,
} from "lucide-react";
import {
  PageHeader,
  Toolbar,
  Button,
  IconButton,
  Badge,
  SearchInput,
  EmptyState,
  LoadingState,
  useToast,
  useConfirm,
} from "@/components/admin/ui";

interface LeadRow {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  startTimeline: string | null;
  localPainterHired: string | null;
  space: string;
  need: string;
  carpetArea: number;
  selectedTier: string | null;
  totalEstimatedCost: string | null;
  status: string;
  createdAt: string;
}

export default function AdminCalculatorLeadsPage() {
  const toast = useToast();
  const confirm = useConfirm();

  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const url = search
        ? `/api/admin/calculator/leads?search=${encodeURIComponent(search)}`
        : "/api/admin/calculator/leads";
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load calculator leads");
      setLeads(Array.isArray(json?.data) ? json.data : []);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load calculator leads");
    } finally {
      setLoading(false);
    }
  }, [search, toast]);

  useEffect(() => {
    load();
  }, [load]);

  async function removeLead(lead: LeadRow) {
    const ok = await confirm({
      title: `Delete estimate for "${lead.fullName}"?`,
      description: "This budget estimate lead will be permanently deleted.",
      confirmLabel: "Delete Lead",
      tone: "danger",
    });
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/calculator/leads/${lead.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Delete failed");
      }
      setLeads((prev) => prev.filter((item) => item.id !== lead.id));
      toast.success("Calculator lead deleted");
    } catch (err: any) {
      toast.error(err?.message || "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Calculator}
        title="Paint Calculator Leads"
        description="Customer budget estimates submitted from the Paint Budget Calculator."
        actions={
          <Button variant="secondary" icon={RefreshCw} onClick={load} loading={loading}>
            Refresh
          </Button>
        }
      />

      <Toolbar className="justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name, phone, or PIN code..."
          className="sm:max-w-sm"
        />
        <Badge tone="gold">
          {leads.length} {leads.length === 1 ? "lead" : "leads"}
        </Badge>
      </Toolbar>

      {loading ? (
        <LoadingState rows={5} />
      ) : leads.length === 0 ? (
        <EmptyState
          icon={Calculator}
          title="No calculator leads found"
          description={
            search
              ? "No budget estimate leads match your search."
              : "Customer estimates submitted from the calculator will appear here."
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A2621]">
          <div className="divide-y divide-white/[0.06]">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col justify-between gap-4 p-5 transition-colors hover:bg-white/[0.02] md:flex-row md:items-start"
              >
                <div className="min-w-0 flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#EDE4D8]">
                      <User className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {lead.fullName}
                    </span>
                    <Badge tone="gold">
                      {lead.space} • {lead.need}
                    </Badge>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#C2B69D]/80">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#C2B69D]">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 font-mono text-[#EDE4D8] hover:text-[#D4AF37]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {lead.phone}
                    </a>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                      PIN: <strong className="text-[#EDE4D8]">{lead.pincode}</strong>
                    </span>
                    <Badge tone="neutral">Carpet Area: {lead.carpetArea} sq.ft</Badge>
                    {lead.selectedTier && <Badge tone="gold">Tier: {lead.selectedTier}</Badge>}
                    {lead.totalEstimatedCost && (
                      <Badge tone="success" className="font-mono">
                        Estimate: ₹{Number(lead.totalEstimatedCost).toLocaleString("en-IN")}
                      </Badge>
                    )}
                  </div>

                  {(lead.startTimeline || lead.localPainterHired) && (
                    <div className="flex flex-wrap items-center gap-4 pt-0.5 text-xs text-[#C2B69D]/85">
                      {lead.startTimeline && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                          Timeline: <strong className="text-[#EDE4D8]">{lead.startTimeline}</strong>
                        </span>
                      )}
                      {lead.localPainterHired && (
                        <span className="inline-flex items-center gap-1.5">
                          <Paintbrush className="h-3.5 w-3.5 text-[#D4AF37]" />
                          Painter Hired: <strong className="text-[#EDE4D8]">{lead.localPainterHired}</strong>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 items-center self-end md:self-center">
                  <IconButton
                    icon={Trash2}
                    label="Delete lead"
                    tone="danger"
                    onClick={() => removeLead(lead)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
