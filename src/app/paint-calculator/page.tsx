"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  Calculator,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Printer,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PaintType {
  id: string;
  name: string;
  category: string;
  unit: string;
  coverage: { min: number; max: number; average: number };
  rate: { min: number; max: number; average: number };
}

interface Room {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  doors: string;
  doorWidth: string;
  doorHeight: string;
  windows: string;
  windowWidth: string;
  windowHeight: string;
  includeCeiling: boolean;
}

interface CalcResult {
  paintableArea: number;
  quantity: number;
  quantityMin: number;
  quantityMax: number;
  cost: number;
  costMin: number;
  costMax: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function newRoom(idx: number): Room {
  return {
    id: crypto.randomUUID(),
    name: `Room ${idx}`,
    length: "",
    width: "",
    height: "",
    doors: "1",
    doorWidth: "3",
    doorHeight: "7",
    windows: "1",
    windowWidth: "4",
    windowHeight: "4",
    includeCeiling: false,
  };
}

const sqftPerSqm = 10.764;

function toSqft(val: number, unit: "ft" | "m") {
  return unit === "m" ? val * sqftPerSqm : val;
}

function safeNum(s: string): number {
  const n = parseFloat(s);
  return isNaN(n) || n < 0 ? 0 : n;
}

function calcResult(
  areaSqft: number,
  coats: number,
  waste: number,
  safety: boolean,
  paint: PaintType
): CalcResult {
  const base = (areaSqft * coats) / paint.coverage.average;
  const baseMin = (areaSqft * coats) / paint.coverage.max;
  const baseMax = (areaSqft * coats) / paint.coverage.min;

  const wf = 1 + waste / 100;
  const sf = safety ? 1.05 : 1;

  const qty = parseFloat((base * wf * sf).toFixed(2));
  const qMin = parseFloat((baseMin * wf * sf).toFixed(2));
  const qMax = parseFloat((baseMax * wf * sf).toFixed(2));

  return {
    paintableArea: parseFloat(areaSqft.toFixed(2)),
    quantity: qty,
    quantityMin: qMin,
    quantityMax: qMax,
    cost: parseFloat((qty * paint.rate.average).toFixed(2)),
    costMin: parseFloat((qMin * paint.rate.min).toFixed(2)),
    costMax: parseFloat((qMax * paint.rate.max).toFixed(2)),
  };
}

function fmt(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function fmtCurrency(n: number) {
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip?: string;
}) {
  return (
    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
      {children}
      {tip && (
        <span title={tip} className="cursor-help text-slate-400">
          <Info className="w-3 h-3" />
        </span>
      )}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  ariaLabel?: string;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "0"}
      min={min ?? 0}
      max={max}
      step={step ?? 1}
      aria-label={ariaLabel}
      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5c249c]/30 focus:border-[#5c249c] transition bg-white"
    />
  );
}

function Select({
  value,
  onChange,
  children,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5c249c]/30 focus:border-[#5c249c] transition bg-white"
    >
      {children}
    </select>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 text-xs font-semibold transition ${
        checked ? "text-[#5c249c]" : "text-slate-500"
      }`}
    >
      <span
        className={`w-9 h-5 rounded-full relative transition-colors ${
          checked
            ? "bg-gradient-to-r from-[#2a1b92] to-[#5c249c]"
            : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  paint,
  coats,
  waste,
  onReset,
}: {
  result: CalcResult | null;
  paint: PaintType | null;
  coats: number;
  waste: number;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const summaryText = useMemo(() => {
    if (!result || !paint) return "";
    return [
      `Snowcem Paints — Paint Estimate`,
      `Paint: ${paint.name} (${paint.category})`,
      `Unit: ${paint.unit}`,
      `Coverage: ${paint.coverage.average} sqft/${paint.unit}`,
      `Rate: ₹${paint.rate.average}/${paint.unit}`,
      `Paintable Area: ${fmt(result.paintableArea)} sqft`,
      `Coats: ${coats}`,
      `Waste: ${waste}%`,
      `Quantity Required: ${fmt(result.quantity)} ${paint.unit}`,
      `Estimated Cost: ${fmtCurrency(result.cost)}`,
      `Cost Range: ${fmtCurrency(result.costMin)} – ${fmtCurrency(result.costMax)}`,
    ].join("\n");
  }, [result, paint, coats, waste]);

  const handleCopy = async () => {
    if (!summaryText) return;
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  if (!result || !paint) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-400 text-sm">
        <Calculator className="w-8 h-8 mx-auto mb-3 opacity-30" />
        Fill in the details above to see your estimate.
      </div>
    );
  }

  return (
    <div className="print:shadow-none rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur shadow-xl overflow-hidden">
      {/* Gradient top strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63]" />

      <div className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#5c249c] mb-1">
              Your Estimate
            </p>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">
              {paint.name}
            </h3>
            <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white px-2.5 py-1 rounded-full">
              {paint.category}
            </span>
          </div>
          <Image src="/image.png" alt="Snowcem Paints" width={80} height={40} className="object-contain opacity-80" />
        </div>

        {/* Grid of stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Unit", value: paint.unit },
            { label: "Coverage", value: `${paint.coverage.average} sqft/${paint.unit}` },
            { label: "Rate", value: `₹${paint.rate.average}/${paint.unit}` },
            { label: "Paintable Area", value: `${fmt(result.paintableArea)} sqft` },
            { label: "Coats", value: coats.toString() },
            { label: "Waste Applied", value: `${waste}%` },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-sm font-bold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Big numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#2a1b92]/5 to-[#5c249c]/10 border border-[#5c249c]/20 p-5">
            <p className="text-xs font-bold text-[#5c249c] uppercase tracking-wide mb-1">Quantity Required</p>
            <p className="text-3xl font-extrabold text-slate-900 font-heading">
              {fmt(result.quantity)}
              <span className="text-base font-semibold text-slate-500 ml-1">{paint.unit}</span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Range: {fmt(result.quantityMin)} – {fmt(result.quantityMax)} {paint.unit}
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#f36c21]/5 to-[#e91e63]/10 border border-[#e91e63]/20 p-5">
            <p className="text-xs font-bold text-[#e91e63] uppercase tracking-wide mb-1">Estimated Cost</p>
            <p className="text-3xl font-extrabold text-slate-900 font-heading">
              {fmtCurrency(result.cost)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Range: {fmtCurrency(result.costMin)} – {fmtCurrency(result.costMax)}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 pt-2 print:hidden">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Result"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Calculator ─────────────────────────────────────────────────────────

function QuickCalculator({
  paints,
  onResult,
  onReset,
}: {
  paints: PaintType[];
  onResult: (r: CalcResult | null, p: PaintType | null, coats: number, waste: number) => void;
  onReset: () => void;
}) {
  const [paintId, setPaintId] = useState(paints[0]?.id ?? "");
  const [area, setArea] = useState("");
  const [coats, setCoats] = useState("2");
  const [waste, setWaste] = useState("10");
  const [safety, setSafety] = useState(false);
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [finish, setFinish] = useState("Matte");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paint = useMemo(() => paints.find((p) => p.id === paintId) ?? null, [paints, paintId]);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!area || safeNum(area) <= 0) errs.area = "Enter a valid area greater than 0";
    if (!coats || safeNum(coats) <= 0) errs.coats = "Enter number of coats";
    if (safeNum(waste) < 0 || safeNum(waste) > 100) errs.waste = "Waste must be 0–100%";
    return errs;
  }, [area, coats, waste]);

  useEffect(() => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !paint) {
      onResult(null, null, safeNum(coats), safeNum(waste));
      return;
    }
    const areaSqft = toSqft(safeNum(area), unit);
    onResult(calcResult(areaSqft, safeNum(coats), safeNum(waste), safety, paint), paint, safeNum(coats), safeNum(waste));
  }, [paintId, area, coats, waste, safety, unit, paint, validate, onResult]);

  const handleReset = () => {
    setPaintId(paints[0]?.id ?? "");
    setArea("");
    setCoats("2");
    setWaste("10");
    setSafety(false);
    setUnit("ft");
    setFinish("Matte");
    onReset();
  };

  const categories = useMemo(() => [...new Set(paints.map((p) => p.category))], [paints]);

  return (
    <div className="space-y-5">
      {/* Paint Type */}
      <div className="space-y-1.5">
        <Label tip="Select the type of paint for your project">Paint Type</Label>
        <Select value={paintId} onChange={setPaintId} ariaLabel="Paint type">
          {categories.map((cat) => (
            <optgroup key={cat} label={cat}>
              {paints.filter((p) => p.category === cat).map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </optgroup>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Area */}
        <div className="space-y-1.5">
          <Label tip="Total wall area to be painted">
            Area ({unit === "ft" ? "sq ft" : "sq m"})
          </Label>
          <Input value={area} onChange={setArea} placeholder="e.g. 500" min={0} ariaLabel="Paint area" />
          {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
        </div>

        {/* Coats */}
        <div className="space-y-1.5">
          <Label tip="Number of paint coats to apply">Number of Coats</Label>
          <Select value={coats} onChange={setCoats} ariaLabel="Number of coats">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "coat" : "coats"}</option>
            ))}
          </Select>
        </div>

        {/* Waste */}
        <div className="space-y-1.5">
          <Label tip="Extra paint to account for wastage during application">Waste % (default 10%)</Label>
          <Input value={waste} onChange={setWaste} placeholder="10" min={0} max={100} ariaLabel="Waste percentage" />
          {errors.waste && <p className="text-xs text-red-500">{errors.waste}</p>}
        </div>

        {/* Finish */}
        <div className="space-y-1.5">
          <Label tip="Paint finish type (display only, does not affect quantity)">Paint Finish</Label>
          <Select value={finish} onChange={setFinish} ariaLabel="Paint finish">
            {["Matte", "Silk", "Satin", "Gloss", "Texture"].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </Select>
        </div>
      </div>

      {/* Toggles row */}
      <div className="flex flex-wrap gap-5 pt-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Measurement:</span>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-bold">
            {(["ft", "m"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-3 py-1.5 transition ${unit === u ? "bg-gradient-to-r from-[#2a1b92] to-[#5c249c] text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {u === "ft" ? "Feet" : "Meter"}
              </button>
            ))}
          </div>
        </div>
        <Toggle checked={safety} onChange={setSafety} label="Safety Margin +5%" />
      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-500 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset
      </button>
    </div>
  );
}

// ─── Advanced Calculator ──────────────────────────────────────────────────────

function AdvancedCalculator({
  paints,
  onResult,
  onReset,
}: {
  paints: PaintType[];
  onResult: (r: CalcResult | null, p: PaintType | null, coats: number, waste: number) => void;
  onReset: () => void;
}) {
  const [rooms, setRooms] = useState<Room[]>([newRoom(1)]);
  const [paintId, setPaintId] = useState(paints[0]?.id ?? "");
  const [coats, setCoats] = useState("2");
  const [waste, setWaste] = useState("10");
  const [safety, setSafety] = useState(false);
  const [unit, setUnit] = useState<"ft" | "m">("ft");

  const paint = useMemo(() => paints.find((p) => p.id === paintId) ?? null, [paints, paintId]);
  const categories = useMemo(() => [...new Set(paints.map((p) => p.category))], [paints]);

  const updateRoom = (id: string, field: keyof Room, value: string | boolean) => {
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const addRoom = () => setRooms((prev) => [...prev, newRoom(prev.length + 1)]);
  const removeRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  const totalArea = useMemo(() => {
    return rooms.reduce((sum, r) => {
      const l = toSqft(safeNum(r.length), unit);
      const w = toSqft(safeNum(r.width), unit);
      const h = toSqft(safeNum(r.height), unit);
      const dw = toSqft(safeNum(r.doorWidth), unit);
      const dh = toSqft(safeNum(r.doorHeight), unit);
      const ww = toSqft(safeNum(r.windowWidth), unit);
      const wh = toSqft(safeNum(r.windowHeight), unit);

      const perimeter = 2 * (l + w);
      const wallArea = perimeter * h;
      const ceilingArea = r.includeCeiling ? l * w : 0;
      const doorArea = safeNum(r.doors) * dw * dh;
      const windowArea = safeNum(r.windows) * ww * wh;
      return sum + wallArea + ceilingArea - doorArea - windowArea;
    }, 0);
  }, [rooms, unit]);

  useEffect(() => {
    if (!paint || totalArea <= 0 || safeNum(coats) <= 0) {
      onResult(null, null, safeNum(coats), safeNum(waste));
      return;
    }
    onResult(calcResult(totalArea, safeNum(coats), safeNum(waste), safety, paint), paint, safeNum(coats), safeNum(waste));
  }, [rooms, paintId, coats, waste, safety, unit, paint, totalArea, onResult]);

  const handleReset = () => {
    setRooms([newRoom(1)]);
    setPaintId(paints[0]?.id ?? "");
    setCoats("2");
    setWaste("10");
    setSafety(false);
    onReset();
  };

  return (
    <div className="space-y-6">
      {/* Shared settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label tip="Paint type applied across all rooms">Paint Type</Label>
          <Select value={paintId} onChange={setPaintId} ariaLabel="Paint type">
            {categories.map((cat) => (
              <optgroup key={cat} label={cat}>
                {paints.filter((p) => p.category === cat).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Number of Coats</Label>
          <Select value={coats} onChange={setCoats} ariaLabel="Number of coats">
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "coat" : "coats"}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label tip="Wastage percentage">Waste %</Label>
          <Input value={waste} onChange={setWaste} placeholder="10" min={0} max={100} ariaLabel="Waste percentage" />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Measurement:</span>
          <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-bold">
            {(["ft", "m"] as const).map((u) => (
              <button key={u} onClick={() => setUnit(u)}
                className={`px-3 py-1.5 transition ${unit === u ? "bg-gradient-to-r from-[#2a1b92] to-[#5c249c] text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}>
                {u === "ft" ? "Feet" : "Meter"}
              </button>
            ))}
          </div>
        </div>
        <Toggle checked={safety} onChange={setSafety} label="Safety Margin +5%" />
      </div>

      {/* Total area preview */}
      {totalArea > 0 && (
        <div className="bg-[#5c249c]/5 border border-[#5c249c]/20 rounded-2xl px-4 py-3 text-sm font-bold text-[#5c249c]">
          Total Paintable Area: {fmt(totalArea)} sq ft
        </div>
      )}

      {/* Rooms */}
      <div className="space-y-4">
        {rooms.map((room, idx) => (
          <div key={room.id} className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={room.name}
                onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                className="text-sm font-extrabold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-[#5c249c] w-32"
                aria-label="Room name"
              />
              {rooms.length > 1 && (
                <button onClick={() => removeRoom(room.id)} className="text-red-400 hover:text-red-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { field: "length" as const, label: "Length" },
                { field: "width" as const, label: "Width" },
                { field: "height" as const, label: "Height" },
              ].map(({ field, label }) => (
                <div key={field} className="space-y-1">
                  <Label>{label} ({unit})</Label>
                  <Input value={room[field]} onChange={(v) => updateRoom(room.id, field, v)} ariaLabel={`${room.name} ${label}`} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label tip="Number of doors in this room">Doors</Label>
                <Input value={room.doors} onChange={(v) => updateRoom(room.id, "doors", v)} min={0} ariaLabel="Number of doors" />
              </div>
              <div className="space-y-1">
                <Label>Door W × H ({unit})</Label>
                <div className="flex gap-1">
                  <Input value={room.doorWidth} onChange={(v) => updateRoom(room.id, "doorWidth", v)} placeholder="W" ariaLabel="Door width" />
                  <Input value={room.doorHeight} onChange={(v) => updateRoom(room.id, "doorHeight", v)} placeholder="H" ariaLabel="Door height" />
                </div>
              </div>
              <div className="space-y-1">
                <Label tip="Number of windows in this room">Windows</Label>
                <Input value={room.windows} onChange={(v) => updateRoom(room.id, "windows", v)} min={0} ariaLabel="Number of windows" />
              </div>
              <div className="space-y-1">
                <Label>Window W × H ({unit})</Label>
                <div className="flex gap-1">
                  <Input value={room.windowWidth} onChange={(v) => updateRoom(room.id, "windowWidth", v)} placeholder="W" ariaLabel="Window width" />
                  <Input value={room.windowHeight} onChange={(v) => updateRoom(room.id, "windowHeight", v)} placeholder="H" ariaLabel="Window height" />
                </div>
              </div>
              <div className="space-y-1 flex flex-col justify-end">
                <Toggle
                  checked={room.includeCeiling}
                  onChange={(v) => updateRoom(room.id, "includeCeiling", v)}
                  label="Include Ceiling"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={addRoom}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-bold shadow-sm hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Room
        </button>
        <button onClick={handleReset} className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-500 transition">
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>
    </div>
  );
}

// ─── Formula Accordion ────────────────────────────────────────────────────────

function FormulaAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#5c249c]" />
          How is this calculated? (Formula Reference)
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4 font-mono">
          <p className="font-sans font-bold text-slate-800 not-italic">Quick Calculator</p>
          <pre className="bg-slate-50 rounded-xl p-3 text-[11px] overflow-x-auto">
{`baseQty    = (Area × Coats) / Coverage
withWaste  = baseQty × (1 + Waste% / 100)
finalQty   = withWaste × 1.05   ← if Safety Margin ON
cost       = finalQty × Rate`}
          </pre>
          <p className="font-sans font-bold text-slate-800 not-italic mt-3">Advanced Calculator (per room)</p>
          <pre className="bg-slate-50 rounded-xl p-3 text-[11px] overflow-x-auto">
{`perimeter  = 2 × (Length + Width)
wallArea   = perimeter × Height
ceiling    = Length × Width      ← if enabled
doorArea   = Doors × DoorW × DoorH
winArea    = Windows × WinW × WinH
netArea    = wallArea + ceiling - doorArea - winArea
totalArea  = sum of all rooms' netArea`}
          </pre>
          <p className="font-sans text-[11px] text-slate-400 not-italic">
            Coverage and Rate values are averages from paints.json. Min/Max range uses min/max coverage and rate respectively.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PaintCalculatorPage() {
  const [paints, setPaints] = useState<PaintType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"quick" | "advanced">("quick");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [resultPaint, setResultPaint] = useState<PaintType | null>(null);
  const [resultCoats, setResultCoats] = useState(2);
  const [resultWaste, setResultWaste] = useState(10);

  // Fetch paints.json once
  useEffect(() => {
    fetch("/paints.json")
      .then((r) => r.json())
      .then((data: PaintType[]) => {
        setPaints(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleResult = useCallback(
    (r: CalcResult | null, p: PaintType | null, coats: number, waste: number) => {
      setResult(r);
      setResultPaint(p);
      setResultCoats(coats);
      setResultWaste(waste);
    },
    []
  );

  const handleReset = useCallback(() => {
    setResult(null);
    setResultPaint(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PaintLoader />
      <div className="sticky top-0 z-40 bg-white">
        <AnnouncementBar />
        <Header />
      </div>

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-12 px-5 border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">
              Paint Budget Calculator
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Estimate paint quantity and cost for any room or project in seconds.
              Powered by Snowcem Paints data.
            </p>
          </div>
        </section>

        {/* Calculator body */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/60 to-white">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-16 text-slate-400">
                <Calculator className="w-10 h-10 mx-auto mb-3 animate-pulse opacity-40" />
                <p className="text-sm">Loading paint data…</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

                {/* Left — inputs */}
                <div className="space-y-6">
                  {/* Tab switcher */}
                  <div className="flex rounded-2xl border border-slate-200 overflow-hidden bg-white p-1 gap-1">
                    {(["quick", "advanced"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition ${
                          activeTab === tab
                            ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {tab === "quick" ? "⚡ Quick Calculator" : "🏠 Advanced Calculator"}
                      </button>
                    ))}
                  </div>

                  {/* Calculator panel */}
                  <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
                    {activeTab === "quick" ? (
                      <QuickCalculator
                        paints={paints}
                        onResult={handleResult}
                        onReset={handleReset}
                      />
                    ) : (
                      <AdvancedCalculator
                        paints={paints}
                        onResult={handleResult}
                        onReset={handleReset}
                      />
                    )}
                  </div>

                  {/* Formula accordion */}
                  <FormulaAccordion />
                </div>

                {/* Right — result card (sticky) */}
                <div className="lg:sticky lg:top-28">
                  <ResultCard
                    result={result}
                    paint={resultPaint}
                    coats={resultCoats}
                    waste={resultWaste}
                    onReset={handleReset}
                  />
                </div>

              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Print-only styles */}
      <style>{`
        @media print {
          header, footer, nav, .print\\:hidden { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
