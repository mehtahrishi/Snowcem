"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  RotateCcw,
  Search,
  Upload,
  Eraser,
  Undo2,
  Redo2,
  Download,
  Camera,
  Wand2,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { createWallMaskFromClick } from "@/lib/wallSegmentation";
import { renderPhotorealisticPaint, refineMaskWithEdgeSnapping } from "@/lib/paintShader";
import {
  CURATED_COLOR_SHADES,
  CURATED_COLOR_CATEGORIES,
  SUBCATEGORIES_BY_CATEGORY,
  CuratedColorShade,
} from "@/data/curatedShadesData";

type ToolMode = "smart-fill" | "eraser";

const SAMPLE_ROOM_PHOTOS = [
  { id: "sample-living", name: "Living Room", src: "/visualizer/sample-living-room.png" },
  { id: "sample-bed", name: "Master Bedroom", src: "/visualizer/sample-bedroom.png" },
  { id: "sample-dining", name: "Dining Room", src: "/visualizer/sample-dining.png" },
  { id: "sample-ext", name: "Villa Facade", src: "/visualizer/sample-exterior.png" },
];

export default function ColorVisualizer() {
  // Genre / Category & Subcategory Filtering
  const [activeCategory, setActiveCategory] = useState<string>(CURATED_COLOR_CATEGORIES[0]);
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#D7DAB4");
  const [selectedShade, setSelectedShade] = useState<CuratedColorShade>(CURATED_COLOR_SHADES[0]);

  // Photo Canvas States
  const [userImageSrc, setUserImageSrc] = useState<string>(SAMPLE_ROOM_PHOTOS[0].src);
  const [activeSampleId, setActiveSampleId] = useState<string>(SAMPLE_ROOM_PHOTOS[0].id);
  const [activeTool, setActiveTool] = useState<ToolMode>("smart-fill");
  const [tolerance, setTolerance] = useState<number>(24);
  const [isPainting, setIsPainting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const historyStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Canvas Image Loader for Real Room Photos (Instant rendering)
  const loadUserImageToCanvas = useCallback((src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      originalImageRef.current = img;

      const maxDim = 1200;
      let w = img.naturalWidth || img.width;
      let h = img.naturalHeight || img.height;

      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }

      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const initialData = ctx.getImageData(0, 0, w, h);
      originalImageDataRef.current = initialData;
      historyStackRef.current = [initialData];
      redoStackRef.current = [];
    };
    img.src = src;
  }, []);

  useEffect(() => {
    if (userImageSrc) {
      loadUserImageToCanvas(userImageSrc);
    }
  }, [userImageSrc, loadUserImageToCanvas]);

  // Handle shade selection
  const handleShadeSelect = (shade: CuratedColorShade) => {
    setSelectedShade(shade);
    setCustomHex(shade.hex);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setUserImageSrc(event.target.result);
        setActiveSampleId("custom");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUndo = () => {
    if (historyStackRef.current.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentState = historyStackRef.current.pop();
    if (currentState) {
      redoStackRef.current.push(currentState);
    }
    const prevState = historyStackRef.current[historyStackRef.current.length - 1];
    if (prevState) {
      ctx.putImageData(prevState, 0, 0);
    }
  };

  const handleRedo = () => {
    if (redoStackRef.current.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nextState = redoStackRef.current.pop();
    if (nextState) {
      historyStackRef.current.push(nextState);
      ctx.putImageData(nextState, 0, 0);
    }
  };

  const handleResetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageDataRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.putImageData(originalImageDataRef.current, 0, 0);
    historyStackRef.current = [originalImageDataRef.current];
    redoStackRef.current = [];
  };

  // Smart Fill: Connects to Python FastAPI backend with instant client fallback
  const performSmartFill = async (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    const initialData = originalImageDataRef.current;
    if (!canvas || !initialData) return;

    setIsPainting(true);

    try {
      const currentDataUrl = canvas.toDataURL("image/png");
      const res = await fetch("/api/paint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: currentDataUrl,
          click_x: startX,
          click_y: startY,
          hex_color: customHex,
          tolerance: tolerance || 24,
          paint_weight: 0.8,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.image) {
          const img = new Image();
          img.onload = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const paintedData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            historyStackRef.current.push(paintedData);
            redoStackRef.current = [];
            setIsPainting(false);
          };
          img.src = data.image;
          return;
        }
      }
    } catch {
      // Fallback to local client-side shader engine
    }

    // Client-side shader fallback
    try {
      const clickMask = createWallMaskFromClick(initialData, startX, startY, tolerance);
      const refined = refineMaskWithEdgeSnapping(clickMask, initialData, 2);

      const painted = renderPhotorealisticPaint({
        canvas,
        originalImageData: initialData,
        wallMask: refined,
        colorHex: customHex,
        opacity: 0.95,
        finish: "Smooth Satin",
      });

      if (painted) {
        historyStackRef.current.push(painted);
        redoStackRef.current = [];
      }
    } catch (e) {
      console.error("Local paint error:", e);
    } finally {
      setIsPainting(false);
    }
  };

  const performEraseAtSpot = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (historyStackRef.current.length > 20) historyStackRef.current.shift();
    historyStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStackRef.current = [];
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.floor((e.clientX - rect.left) * scaleX),
      y: Math.floor((e.clientY - rect.top) * scaleY),
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting) return;
    const coords = getCanvasCoords(e);
    if (!coords) return;

    if (activeTool === "smart-fill") {
      performSmartFill(coords.x, coords.y);
    } else if (activeTool === "eraser") {
      performEraseAtSpot(coords.x, coords.y);
    }
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Snowcem_${selectedShade.name.replace(/\s+/g, "_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Subcategories for Active Category
  const subcategories = useMemo(() => {
    return ["All", ...(SUBCATEGORIES_BY_CATEGORY[activeCategory] || [])];
  }, [activeCategory]);

  // Filtered Curated Shades
  const filteredShades = useMemo(() => {
    return CURATED_COLOR_SHADES.filter((s) => {
      const matchCat = s.category === activeCategory;
      const matchSub = activeSubcategory === "All" || s.subcategory === activeSubcategory;
      const matchSearch =
        searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hex.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSub && matchSearch;
    });
  }, [activeCategory, activeSubcategory, searchQuery]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-6 sm:py-10 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Visualizer Canvas Stage & Toolbar (7.5 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-md">
            
            {/* Clean Scene Switcher & Upload Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {SAMPLE_ROOM_PHOTOS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setActiveSampleId(sample.id);
                      setUserImageSrc(sample.src);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                      activeSampleId === sample.id
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 text-orange-700 hover:bg-orange-100 text-xs font-bold transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Room Photo</span>
                </button>
              </div>
            </div>

            {/* Canvas Viewport (Auto-fits image without dead space or stuck loading) */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 shadow-inner flex items-center justify-center min-h-[280px]">
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className="w-full h-auto max-h-[580px] object-contain rounded-2xl cursor-crosshair select-none block"
              />

              {/* Painting Indicator */}
              {isPainting && (
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse z-20">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e91e63]" />
                  <span>Painting wall...</span>
                </div>
              )}

              {/* Hint */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-semibold flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>
                  {activeTool === "smart-fill" ? `Tap on wall to apply: ${selectedShade.name}` : "Tap to erase paint"}
                </span>
              </div>
            </div>

            {/* Toolbar Actions Under Canvas */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-100">
              {/* Tool Mode Buttons (Only Tap to Paint & Eraser) */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTool("smart-fill")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeTool === "smart-fill"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Tap any wall to fill with selected shade"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#e91e63]" />
                  <span>Tap to Paint</span>
                </button>

                <button
                  onClick={() => setActiveTool("eraser")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                    activeTool === "eraser"
                      ? "bg-white text-gray-900 shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  title="Erase paint to restore original wall"
                >
                  <Eraser className="w-3.5 h-3.5 text-gray-700" />
                  <span>Eraser</span>
                </button>
              </div>

              {/* Undo / Redo / Reset / Save */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleUndo}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  title="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetCanvas}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  title="Reset to Original"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2a1b92] text-white hover:bg-[#1e1370] text-xs font-bold shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Genre-Based Curated Palette Deck (4.5 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-gray-200 shadow-md space-y-4">
            
            {/* Header & Active Shade Info */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-extrabold text-gray-900">
                  Curated Colour Deck
                </h3>
                <p className="text-[11px] text-gray-500">
                  {selectedShade.name} • {selectedShade.recommendedSurface}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-md border border-black/20 shadow-xs"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <span className="text-xs font-mono font-bold text-[#2a1b92] bg-indigo-50 px-2 py-0.5 rounded">
                  {selectedShade.id}
                </span>
              </div>
            </div>

            {/* 1. Category / Genre Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                Select Space / Mood Genre
              </label>
              <select
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setActiveSubcategory("All");
                }}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#2a1b92]"
              >
                {CURATED_COLOR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Subcategory Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                    activeSubcategory === sub
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* 3. Search Shade */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, ID, or hex..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2a1b92]"
              />
            </div>

            {/* 4. Architectural Shade Cards Grid (Unique ID Selection & Premium Layout) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto p-2">
              {filteredShades.slice(0, 150).map((shade) => {
                const isSelected = selectedShade?.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    onClick={() => handleShadeSelect(shade)}
                    className={`group relative flex flex-col rounded-2xl text-left overflow-hidden transition-all duration-150 ${
                      isSelected
                        ? "border-2 border-[#2a1b92] shadow-md bg-indigo-50/20"
                        : "border border-gray-200 hover:border-gray-300 hover:shadow-xs bg-white"
                    }`}
                    title={`${shade.name} (${shade.id}) - ${shade.subcategory}`}
                  >
                    {/* Top Color Swatch Block */}
                    <div
                      className="w-full h-14 sm:h-16 relative flex items-start justify-end p-1.5 transition-transform group-hover:scale-[1.01]"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {/* Active Selection Badge */}
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-white text-[#2a1b92] flex items-center justify-center shadow-md text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Bottom Metadata Info */}
                    <div className="p-2 sm:p-2.5 bg-white space-y-0.5">
                      <h4 className="text-[11px] sm:text-xs font-extrabold text-slate-900 truncate font-heading leading-tight">
                        {shade.name}
                      </h4>
                      <div className="text-[9px] sm:text-[10px] text-slate-500 font-mono font-bold">
                        {shade.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Steps */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <Link
                href="/paint-calculator"
                className="font-bold text-[#2a1b92] hover:text-[#e91e63] flex items-center gap-1 transition-colors"
              >
                <span>Paint Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/color-catalogue"
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
