"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Palette,
  Search,
  Upload,
  Eraser,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  Camera,
  Layers,
  Check,
  Eye,
  HelpCircle,
  X,
  Sparkles,
  ArrowRight,
  Info,
  Sliders,
  Paintbrush,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { applyColour, refFor } from "./lib/recolor";
import { bestSpot, refineMask } from "./lib/refine";
import {
  CURATED_COLOR_SHADES,
  CURATED_COLOR_CATEGORIES,
  SUBCATEGORIES_BY_CATEGORY,
  CuratedColorShade,
} from "@/data/curatedShadesData";

const MAX_CANVAS_DIM = 1200;

interface SampleRoom {
  id: string;
  name: string;
  src: string;
}

const SAMPLE_ROOMS: SampleRoom[] = [
  { id: "sample-living", name: "Living Room", src: "/visualizer/sample-living-room.png" },
  { id: "sample-bedroom", name: "Bedroom", src: "/visualizer/sample-bedroom.png" },
  { id: "sample-dining", name: "Dining Area", src: "/visualizer/sample-diningarea.png" },
  { id: "sample-kitchen", name: "Kitchen", src: "/visualizer/sample-kitchen.png" },
  { id: "sample-study", name: "Study Room", src: "/visualizer/sample-studyroom.png" },
  { id: "sample-pooja", name: "Pooja Room", src: "/visualizer/sample-poojaroom.png" },
];

type ToolType = "tap" | "brush" | "erase";

interface Zone {
  kind: string;
  mask: Uint8ClampedArray | null;
  ref: number;
  hex: string | null;
  name: string;
  spot: { x: number; y: number } | null;
}

export default function ColourVisualizer() {
  // 1. Color Palette States (100% Snowcem Data)
  const [selectedCategory, setSelectedCategory] = useState<string>(CURATED_COLOR_CATEGORIES[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShade, setSelectedShade] = useState<CuratedColorShade>(CURATED_COLOR_SHADES[0]);

  // 2. Active Tab & Room Selection
  const [activeTab, setActiveTab] = useState<string>("upload"); // 'upload' | sample room id
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [isPhotoTipsOpen, setIsPhotoTipsOpen] = useState(false);

  // 3. Engine Refs & States
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseImgData = useRef<ImageData | null>(null);
  const outImgData = useRef<ImageData | null>(null);
  const zonesRef = useRef<Zone[]>([]);
  const workerRef = useRef<Worker | null>(null);

  // History stack for undo / redo
  const historyRef = useRef<Zone[][]>([]);
  const redoRef = useRef<Zone[][]>([]);

  const [activeZoneIdx, setActiveZoneIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "busy" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [activeTool, setActiveTool] = useState<ToolType>("tap");
  const [brushSize, setBrushSize] = useState(32);
  const [isComparing, setIsComparing] = useState(false);
  const [showSurfacePills, setShowSurfacePills] = useState(true);
  const [, forceRender] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter Subcategories based on chosen Category
  const availableSubcategories = useMemo(() => {
    return ["All", ...(SUBCATEGORIES_BY_CATEGORY[selectedCategory] || [])];
  }, [selectedCategory]);

  // Filtered Shades
  const filteredShades = useMemo(() => {
    return CURATED_COLOR_SHADES.filter((shade) => {
      const matchCat = selectedCategory === "All" || shade.category === selectedCategory;
      const matchSub = selectedSubcategory === "All" || shade.subcategory === selectedSubcategory;
      const matchSearch =
        !searchQuery ||
        shade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shade.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shade.hex.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSub && matchSearch;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  // Push state to undo history
  const pushHistory = useCallback(() => {
    const cloned = zonesRef.current.map((z) => ({
      ...z,
      mask: z.mask ? new Uint8ClampedArray(z.mask) : null,
    }));
    historyRef.current.push(cloned);
    if (historyRef.current.length > 20) historyRef.current.shift();
    redoRef.current = [];
  }, []);

  // Redraw canvas with lightness-preserving LAB recoloring
  const draw = useCallback((rect?: { x0: number; y0: number; x1: number; y1: number }) => {
    const c = canvasRef.current;
    const b = baseImgData.current;
    const o = outImgData.current;
    if (!c || !b || !o) return;

    const W = b.width;
    const r = rect ?? { x0: 0, y0: 0, x1: W, y1: b.height };

    // Copy original pixels to output buffer in target rect
    for (let y = r.y0; y < r.y1; y++) {
      o.data.set(
        b.data.subarray((y * W + r.x0) * 4, (y * W + r.x1) * 4),
        (y * W + r.x0) * 4
      );
    }

    // Apply color if not in compare mode
    if (!isComparing) {
      for (const zn of zonesRef.current) {
        if (zn.mask && zn.hex) {
          applyColour(o.data, b.data, W, zn.mask, zn.hex, zn.ref, r);
        }
      }
    }

    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.putImageData(o, 0, 0, r.x0, r.y0, r.x1 - r.x0, r.y1 - r.y0);
    }
  }, [isComparing]);

  useEffect(() => {
    draw();
  }, [draw, status]);

  // Recalculate reference lightness & button position after surface mask changes
  const commitZone = useCallback((idx: number) => {
    const b = baseImgData.current;
    const zn = zonesRef.current[idx];
    if (!b || !zn?.mask) return;

    zn.ref = refFor(b.data, zn.mask);
    const others = zonesRef.current
      .filter((o, k) => k !== idx && o.spot)
      .map((o) => o.spot!);
    zn.spot = bestSpot(zn.mask, b.width, b.height, others);
  }, []);

  // Web Worker for SlimSAM & SegFormer in-browser AI segmentation
  useEffect(() => {
    let w: Worker | null = null;
    try {
      w = new Worker(new URL("./lib/segmentation.worker.ts", import.meta.url), {
        type: "module",
      });

      w.onmessage = (e) => {
        const d = e.data;
        const b = baseImgData.current;

        if (d.type === "progress" && d.p?.progress) {
          setStatusMsg(`Initializing AI models… ${Math.round(d.p.progress)}%`);
        } else if (d.type === "ready" && b) {
          setStatus("busy");
          setStatusMsg("Auto-detecting walls & ceilings…");
          w?.postMessage({ type: "discover", w: b.width, h: b.height });
        } else if (d.type === "surfaces" && b) {
          const items = d.items.map((it: any) => {
            const mask = refineMask(b, it.mask);
            let sx = 0,
              n = 0;
            for (let i = 0; i < mask.length; i += 7) {
              if (mask[i] > 127) {
                sx += i % b.width;
                n++;
              }
            }
            return { kind: it.kind, mask, cx: n ? sx / n : 0 };
          });

          const walls = items
            .filter((i: any) => i.kind === "wall")
            .sort((a: any, b2: any) => a.cx - b2.cx);
          const ceil = items.filter((i: any) => i.kind === "ceiling");

          const label = (i: number) =>
            walls.length === 3
              ? ["Left Wall", "Center Wall", "Right Wall"][i]
              : walls.length === 2
              ? ["Left Wall", "Right Wall"][i]
              : `Wall ${i + 1}`;

          zonesRef.current = [
            ...walls.map((it: any, i: number) => ({
              kind: "wall",
              mask: it.mask,
              ref: 60,
              hex: null,
              name: label(i),
              spot: null,
            })),
            ...ceil.map((it: any) => ({
              kind: "ceiling",
              mask: it.mask,
              ref: 60,
              hex: null,
              name: "Ceiling",
              spot: null,
            })),
          ];

          zonesRef.current.forEach((_, i) => commitZone(i));
          setActiveZoneIdx(0);
          setStatus("ready");
          setStatusMsg("");
          draw();
          forceRender((v) => v + 1);
        } else if (d.type === "mask" && b) {
          const zn = zonesRef.current[d.zone];
          if (zn) {
            const nm = refineMask(b, d.mask);
            if (!zn.mask) {
              zn.mask = nm;
            } else {
              for (let i = 0; i < nm.length; i++) {
                zn.mask[i] =
                  d.op === "add"
                    ? Math.max(zn.mask[i], nm[i])
                    : nm[i] > 127
                    ? 0
                    : zn.mask[i];
              }
            }
            commitZone(d.zone);
            setStatus("ready");
            setStatusMsg("");
            draw();
            forceRender((v) => v + 1);
          }
        } else if (d.type === "error") {
          console.warn("[visualizer worker error]:", d.message);
          setStatus("ready");
          setStatusMsg("");
        }
      };

      workerRef.current = w;
    } catch (err) {
      console.warn("Worker init skipped in non-browser env", err);
    }

    return () => {
      w?.terminate();
    };
  }, [draw, commitZone]);

  // Load an image onto the canvas and initialize AI embeddings
  const loadImage = useCallback(
    async (src: string) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const s = Math.min(1, MAX_CANVAS_DIM / Math.max(img.width, img.height));
        const w = Math.round(img.width * s);
        const h = Math.round(img.height * s);

        const c = canvasRef.current;
        if (!c) return;

        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, w, h);
        baseImgData.current = ctx.getImageData(0, 0, w, h);
        outImgData.current = new ImageData(new Uint8ClampedArray(baseImgData.current.data), w, h);

        zonesRef.current = [];
        historyRef.current = [];
        redoRef.current = [];
        setActiveZoneIdx(0);
        setStatus("loading");
        setStatusMsg("Analyzing room dimensions…");
        forceRender((v) => v + 1);

        c.toBlob((bl) => {
          if (bl && workerRef.current) {
            workerRef.current.postMessage({
              type: "embed",
              url: URL.createObjectURL(bl),
            });
          }
        });
      };
      img.src = src;
    },
    []
  );

  // Switch room when activeTab changes
  useEffect(() => {
    if (activeTab === "upload") {
      if (uploadedImageSrc) {
        loadImage(uploadedImageSrc);
      } else {
        baseImgData.current = null;
        outImgData.current = null;
        zonesRef.current = [];
        setStatus("idle");
        forceRender((v) => v + 1);
      }
    } else {
      const sample = SAMPLE_ROOMS.find((r) => r.id === activeTab);
      if (sample) {
        loadImage(sample.src);
      }
    }
  }, [activeTab, uploadedImageSrc, loadImage]);

  // Handle User Photo File Upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setUploadedImageSrc(url);
    setActiveTab("upload");
  };

  // Convert canvas pointer coordinates
  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * c.width,
      y: ((e.clientY - r.top) / r.height) * c.height,
    };
  };

  // Canvas Interactions: Tap to Paint, Brush, or Erase
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const currentZone = zonesRef.current[activeZoneIdx];
    if (status !== "ready") return;

    if (activeTool === "tap") {
      const p = getCanvasPos(e);
      const c = canvasRef.current!;

      // Check if clicked inside an existing zone
      const b = baseImgData.current;
      if (b) {
        const pxIdx = Math.floor(p.y) * b.width + Math.floor(p.x);
        for (let i = 0; i < zonesRef.current.length; i++) {
          const zn = zonesRef.current[i];
          if (zn.mask && zn.mask[pxIdx] > 127) {
            pushHistory();
            zn.hex = selectedShade.hex;
            setActiveZoneIdx(i);
            draw();
            forceRender((v) => v + 1);
            return;
          }
        }
      }

      // If clicked outside existing recognized surfaces, run point-segmentation
      pushHistory();
      let targetIdx = activeZoneIdx;
      if (!currentZone) {
        zonesRef.current.push({
          kind: "wall",
          mask: null,
          ref: 60,
          hex: selectedShade.hex,
          name: `Wall ${zonesRef.current.length + 1}`,
          spot: null,
        });
        targetIdx = zonesRef.current.length - 1;
        setActiveZoneIdx(targetIdx);
      } else {
        currentZone.hex = selectedShade.hex;
      }

      setStatus("busy");
      setStatusMsg("Applying shade…");
      workerRef.current?.postMessage({
        type: "segment",
        zone: targetIdx,
        op: "add",
        points: [{ x: p.x / c.width, y: p.y / c.height, l: 1 }],
      });
    } else {
      handlePointerMove(e);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const currentZone = zonesRef.current[activeZoneIdx];
    if (!currentZone || (activeTool !== "brush" && activeTool !== "erase") || e.buttons !== 1 || !baseImgData.current)
      return;

    const c = canvasRef.current!;
    const k = c.width / c.getBoundingClientRect().width;
    const p = getCanvasPos(e);
    const rad = (brushSize * k) / 2;

    currentZone.mask ??= new Uint8ClampedArray(c.width * c.height);
    const r = {
      x0: Math.max(0, Math.floor(p.x - rad)),
      y0: Math.max(0, Math.floor(p.y - rad)),
      x1: Math.min(c.width, Math.ceil(p.x + rad)),
      y1: Math.min(c.height, Math.ceil(p.y + rad)),
    };

    for (let y = r.y0; y < r.y1; y++) {
      for (let x = r.x0; x < r.x1; x++) {
        if ((x - p.x) ** 2 + (y - p.y) ** 2 < rad * rad) {
          currentZone.mask[y * c.width + x] = activeTool === "brush" ? 255 : 0;
        }
      }
    }
    draw(r);
  };

  const handlePointerUp = () => {
    const currentZone = zonesRef.current[activeZoneIdx];
    if (currentZone?.mask && baseImgData.current && (activeTool === "brush" || activeTool === "erase")) {
      commitZone(activeZoneIdx);
      forceRender((v) => v + 1);
    }
  };

  // Color Swatch Selection Handler
  const handleSelectShade = (shade: CuratedColorShade) => {
    setSelectedShade(shade);
    const z = zonesRef.current[activeZoneIdx];
    if (z && z.mask) {
      pushHistory();
      z.hex = shade.hex;
      draw();
      forceRender((v) => v + 1);
    }
  };

  // Paint All Walls Action
  const handlePaintAllWalls = () => {
    if (!zonesRef.current.length) return;
    pushHistory();
    for (const zn of zonesRef.current) {
      if (zn.kind === "wall") {
        zn.hex = selectedShade.hex;
      }
    }
    draw();
    forceRender((v) => v + 1);
  };

  // Undo Handler
  const handleUndo = () => {
    if (!historyRef.current.length) return;
    const previous = historyRef.current.pop()!;
    const currentCloned = zonesRef.current.map((z) => ({
      ...z,
      mask: z.mask ? new Uint8ClampedArray(z.mask) : null,
    }));
    redoRef.current.push(currentCloned);
    zonesRef.current = previous;
    draw();
    forceRender((v) => v + 1);
  };

  // Redo Handler
  const handleRedo = () => {
    if (!redoRef.current.length) return;
    const next = redoRef.current.pop()!;
    const currentCloned = zonesRef.current.map((z) => ({
      ...z,
      mask: z.mask ? new Uint8ClampedArray(z.mask) : null,
    }));
    historyRef.current.push(currentCloned);
    zonesRef.current = next;
    draw();
    forceRender((v) => v + 1);
  };

  // Reset Painted Colors Handler
  const handleReset = () => {
    pushHistory();
    for (const zn of zonesRef.current) {
      zn.hex = null;
    }
    draw();
    forceRender((v) => v + 1);
  };

  // Download High-Res Canvas
  const handleDownloadImage = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `snowcem-visualizer-${selectedShade.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      a.click();
    }, "image/png");
  };

  return (
    <div className="w-full max-w-[1540px] mx-auto px-3 sm:px-6 lg:px-8 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[410px_1fr] gap-6 items-start">
        
        {/* ========================================================
            LEFT COLUMN: COLOR PALETTE DOCK (SCREENSHOT 1)
        ======================================================== */}
        <aside className="bg-white rounded-3xl border border-[#EBE4DD] shadow-sm p-4 sm:p-5 flex flex-col space-y-4 h-auto lg:h-[calc(100vh-130px)] lg:max-h-[860px] lg:min-h-[660px] lg:sticky lg:top-24">
          
          {/* 1. ACTIVE SELECTED SHADE CARD */}
          <div className="shrink-0 p-3.5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DC] flex items-center justify-between shadow-2xs">
            <div className="flex items-center space-x-3.5 min-w-0">
              <div
                className="w-12 h-12 rounded-xl shadow-xs border border-black/10 shrink-0 transition-colors"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <div className="min-w-0">
                <h2 className="font-extrabold text-[#0D1B3E] text-base leading-tight truncate">
                  {selectedShade.name}
                </h2>
                <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                  {selectedShade.subcategory} • Walls &amp; Trims
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-[#E0D7CE] shrink-0 shadow-2xs">
              {selectedShade.id}
            </span>
          </div>

          {/* 2. SELECT ROOM OR STYLE DROPDOWN */}
          <div className="shrink-0 space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Room or Style
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory("All");
              }}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs font-bold text-[#0D1B3E] focus:outline-none focus:ring-2 focus:ring-[#DF3F6F]/20 focus:border-[#DF3F6F] cursor-pointer"
            >
              {CURATED_COLOR_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. SUBCATEGORY PILLS */}
          <div className="shrink-0 flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none py-0.5">
            {availableSubcategories.map((subcat) => (
              <button
                key={subcat}
                type="button"
                onClick={() => setSelectedSubcategory(subcat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubcategory === subcat
                    ? "bg-[#0D1B3E] text-white shadow-xs"
                    : "bg-[#FAF8F5] text-slate-700 hover:bg-slate-200/70 border border-[#E0D7CE]"
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          {/* 4. SEARCH INPUT */}
          <div className="shrink-0 relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search colour or code..."
              className="w-full pl-9 pr-3.5 py-2 bg-[#FAF8F5] border border-[#E0D7CE] rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#DF3F6F]/20 focus:border-[#DF3F6F]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* 5. 3-COLUMN SWATCH CARDS GRID */}
          <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-3 auto-rows-max content-start gap-2.5 min-h-0">
            {filteredShades.length === 0 ? (
              <div className="col-span-3 py-8 text-center text-slate-400 text-xs font-medium">
                No colours found matching &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredShades.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    type="button"
                    onClick={() => handleSelectShade(shade)}
                    className={`group relative flex flex-col h-[116px] shrink-0 rounded-xl overflow-hidden border text-left transition-all cursor-pointer shadow-2xs hover:shadow-xs ${
                      isSelected
                        ? "border-2 border-[#DF3F6F] ring-2 ring-[#DF3F6F]/20"
                        : "border-[#E8E1D9] hover:border-slate-400"
                    }`}
                  >
                    {/* Swatch color tile */}
                    <div
                      className="w-full h-16 shrink-0 relative transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-white flex items-center justify-center text-[#DF3F6F] shadow-xs">
                          <Check size={11} strokeWidth={3} />
                        </span>
                      )}
                    </div>

                    {/* Swatch details */}
                    <div className="p-2 bg-white flex-1 flex flex-col justify-between min-h-0">
                      <span className="text-[11px] font-bold text-[#0D1B3E] leading-tight line-clamp-1">
                        {shade.name}
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-400 font-semibold mt-0.5">
                        {shade.id}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* 6. BOTTOM FOOTER QUICK LINKS */}
          <div className="shrink-0 pt-3 border-t border-[#EAE3DC] flex items-center justify-between text-xs font-bold text-[#5B5BAB]">
            <Link
              href="/paint-calculator"
              className="inline-flex items-center space-x-1 hover:text-[#DF3F6F] transition-colors"
            >
              <span>Paint Calculator</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/color-catalogue"
              className="inline-flex items-center space-x-1 hover:text-[#DF3F6F] transition-colors"
            >
              <span>Full Catalogue</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </aside>


        {/* ========================================================
            RIGHT COLUMN: MAIN CANVAS STAGE (SCREENSHOT 2 & 3)
        ======================================================== */}
        <section className="bg-white rounded-3xl border border-[#EBE4DD] shadow-sm p-4 sm:p-6 flex flex-col space-y-4">
          
          {/* 1. TOP ROOM PRESETS & UPLOAD SELECTOR BAR */}
          <div className="flex items-center justify-between border-b border-[#EAE3DC] pb-3 gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center space-x-2">
              {/* Upload Photo Button Tab */}
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "upload"
                    ? "bg-gradient-to-r from-[#5B5BAB] to-[#D83E78] text-white shadow-md shadow-pink-500/20"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Camera size={14} />
                <span>Upload Photo</span>
              </button>

              {/* Sample Room Tabs */}
              {SAMPLE_ROOMS.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setActiveTab(room.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === room.id
                      ? "text-[#0D1B3E] font-black border-b-2 border-[#DF3F6F] rounded-b-none"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            {/* Photo Tips Button */}
            <button
              type="button"
              onClick={() => setIsPhotoTipsOpen(true)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 text-xs font-semibold shrink-0 cursor-pointer"
            >
              <HelpCircle size={13} />
              <span>Photo Tips</span>
            </button>
          </div>

          {/* 2. MAIN CANVAS VIEWPORT */}
          <div className="relative w-full min-h-[460px] sm:min-h-[520px] rounded-2xl bg-[#FAF8F5] border border-dashed border-[#DCD3CB] flex items-center justify-center overflow-hidden">
            
            {/* STATE A: NO PHOTO LOADED YET IN UPLOAD TAB */}
            {activeTab === "upload" && !uploadedImageSrc ? (
              <div className="p-8 max-w-md text-center flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 flex items-center justify-center text-[#DF3F6F] shadow-sm">
                  <Camera size={30} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0D1B3E] tracking-tight">
                    Upload Your Room Photo
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    Upload a photo of your living room, bedroom, or exterior to test Snowcem paints and colours in real-time.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full justify-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#5B5BAB] to-[#D83E78] hover:opacity-95 text-white shadow-md shadow-pink-500/20 cursor-pointer"
                  >
                    <Upload size={15} />
                    <span>Choose Photo to Upload</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPhotoTipsOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-xl text-xs font-bold bg-white border border-[#E0D7CE] text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
                  >
                    <HelpCircle size={14} />
                    <span>Photo Tips &amp; Guidelines</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 font-medium">
                  Supports JPG, PNG, WEBP (up to 10MB) • Or pick any sample room above
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </div>
            ) : (
              /* STATE B: ROOM ACTIVE ON CANVAS */
              <div className="relative w-full h-full flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  className={`max-w-full max-h-[72vh] object-contain rounded-xl shadow-sm ${
                    activeTool !== "tap" ? "cursor-crosshair" : "cursor-pointer"
                  }`}
                />

                {/* INTERACTIVE SURFACE SELECTION PILLS (bestSpot Algorithm) */}
                {showSurfacePills &&
                  !isComparing &&
                  status === "ready" &&
                  zonesRef.current.map((zn, idx) => {
                    if (!zn.spot) return null;
                    const isActive = activeZoneIdx === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveZoneIdx(idx);
                          pushHistory();
                          zn.hex = selectedShade.hex;
                          draw();
                          forceRender((v) => v + 1);
                        }}
                        style={{
                          left: `${zn.spot.x * 100}%`,
                          top: `${zn.spot.y * 100}%`,
                        }}
                        title={`Paint ${zn.name} with ${selectedShade.name}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex items-center cursor-pointer transition-transform hover:scale-110"
                      >
                        <span
                          className={`w-7 h-7 rounded-full border-2 shadow-md flex items-center justify-center transition-all ${
                            isActive
                              ? "border-white ring-3 ring-[#DF3F6F] scale-110"
                              : "border-white/90 ring-1 ring-black/20"
                          }`}
                          style={{ backgroundColor: zn.hex || "#FFFFFF" }}
                        >
                          {!zn.hex && (
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                          )}
                        </span>
                      </button>
                    );
                  })}

                {/* PROGRESS / BUSY OVERLAY */}
                {(status === "loading" || status === "busy") && (
                  <div className="absolute inset-x-0 bottom-3 mx-auto w-fit max-w-sm px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-sm text-white text-xs font-semibold flex items-center space-x-2 shadow-xl z-30">
                    <Loader2 size={14} className="animate-spin text-[#DF3F6F]" />
                    <span>{statusMsg || "Processing AI segmentation…"}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. BOTTOM TOOLBAR (SCREENSHOT 3) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EAE3DC]">
            {/* Left Controls */}
            <div className="flex items-center space-x-2 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTool("tap")}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTool === "tap"
                    ? "bg-gradient-to-r from-[#DF3F6F] to-[#B481B5] text-white shadow-xs"
                    : "bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100"
                }`}
              >
                <Paintbrush size={14} />
                <span>Tap to Paint</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTool(activeTool === "erase" ? "tap" : "erase")}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTool === "erase"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100"
                }`}
              >
                <Eraser size={14} />
                <span>Eraser</span>
              </button>

              <button
                type="button"
                onClick={handlePaintAllWalls}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100 cursor-pointer shadow-2xs"
              >
                <Layers size={14} />
                <span>Paint All Walls</span>
              </button>
            </div>

            {/* Right Controls: Compare, Undo, Redo, Reset, Save Image */}
            <div className="flex items-center space-x-2">
              {/* Hold to Compare Eye */}
              <button
                type="button"
                onPointerDown={() => setIsComparing(true)}
                onPointerUp={() => setIsComparing(false)}
                onPointerLeave={() => setIsComparing(false)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isComparing
                    ? "bg-[#0D1B3E] text-white border-[#0D1B3E]"
                    : "bg-[#FAF8F5] text-slate-700 border-[#E0D7CE] hover:bg-slate-100"
                }`}
                title="Hold to see original unpainted photo"
              >
                <Eye size={16} />
              </button>

              {/* Undo */}
              <button
                type="button"
                onClick={handleUndo}
                disabled={!historyRef.current.length}
                className="p-2 rounded-xl bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100 disabled:opacity-40 transition-all cursor-pointer"
                title="Undo last action"
              >
                <Undo2 size={16} />
              </button>

              {/* Redo */}
              <button
                type="button"
                onClick={handleRedo}
                disabled={!redoRef.current.length}
                className="p-2 rounded-xl bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100 disabled:opacity-40 transition-all cursor-pointer"
                title="Redo action"
              >
                <Redo2 size={16} />
              </button>

              {/* Reset */}
              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl bg-[#FAF8F5] text-slate-700 border border-[#E0D7CE] hover:bg-slate-100 transition-all cursor-pointer"
                title="Reset all colors"
              >
                <RotateCcw size={16} />
              </button>

              {/* Save Image Button */}
              <button
                type="button"
                onClick={handleDownloadImage}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#B481B5] to-[#DF3F6F] hover:opacity-95 text-white shadow-md shadow-pink-500/20 cursor-pointer"
              >
                <Download size={14} />
                <span>Save Image</span>
              </button>
            </div>
          </div>

          {/* 4. FOOTER DISCLAIMER */}
          <p className="text-[11px] text-slate-400 italic pt-1">
            * Color shade impression may vary as per the actual lighting combination. This is just for representation purposes.
          </p>
        </section>
      </div>

      {/* PHOTO TIPS & GUIDELINES MODAL */}
      {isPhotoTipsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-[#0D1B3E]">
                <HelpCircle size={18} className="text-[#DF3F6F]" />
                <h4 className="font-bold text-base">Photo Tips &amp; Guidelines</h4>
              </div>
              <button
                onClick={() => setIsPhotoTipsOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
                <span className="font-bold block mb-1">For Best Results:</span>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Capture the room in daylight with natural light spread across walls.</li>
                  <li>Hold the camera straight at eye level to avoid extreme perspective tilt.</li>
                  <li>Ensure the wall edges and trim lines are visible in the frame.</li>
                  <li>Avoid heavy flash or extreme shadows.</li>
                </ul>
              </div>

              <p className="text-slate-500">
                Our in-browser AI automatically separates your walls from furniture, windows, and ceiling, preserving realistic ambient shadows and lighting.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsPhotoTipsOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0D1B3E] text-white hover:bg-slate-800"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
