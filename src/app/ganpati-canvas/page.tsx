"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import PaintLoader from "@/components/PaintLoader";
import {
  Palette,
  RotateCcw,
  Download,
  Paintbrush,
  Sparkles,
  Undo2,
  CheckCircle2,
  Droplets,
  Eraser,
  Share2,
  MousePointer2,
} from "lucide-react";

// Snowcem Brand Palette & Divine Festival Colors
const SNOWCEM_CANVAS_PALETTE = [
  { name: "Snowcem Navy", hex: "#2a1b92" },
  { name: "Royal Purple", hex: "#5c249c" },
  { name: "Magenta Divine", hex: "#e91e63" },
  { name: "Snowcem Orange", hex: "#f36c21" },
  { name: "Marigold Yellow", hex: "#facc15" },
  { name: "Modak Gold", hex: "#eab308" },
  { name: "Sacred Crimson", hex: "#dc2626" },
  { name: "Vermillion Sindoor", hex: "#b91c1c" },
  { name: "Temple Ruby", hex: "#9f1239" },
  { name: "Lotus Pink", hex: "#ec4899" },
  { name: "Peacock Blue", hex: "#0284c7" },
  { name: "Ocean Deep", hex: "#0369a1" },
  { name: "Divine Teal", hex: "#0d9488" },
  { name: "Fresh Pista", hex: "#22c55e" },
  { name: "Leaf Green", hex: "#15803d" },
  { name: "Sandalwood Cream", hex: "#fef08a" },
  { name: "Warm Terracotta", hex: "#c2410c" },
  { name: "Midnight Black", hex: "#0f172a" },
  { name: "Pure White", hex: "#ffffff" },
];

const BRUSH_SIZES = [
  { label: "Fine", size: 4 },
  { label: "Medium", size: 12 },
  { label: "Thick", size: 24 },
  { label: "Broad", size: 44 },
];

type ToolMode = "fill" | "brush" | "eraser";

// Convert hex to RGBA
function hexToRgba(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255];
}

// Check if a pixel color matches a target color within tolerance
function colorsMatch(
  data: Uint8ClampedArray,
  pos: number,
  target: [number, number, number, number],
  tolerance: number
): boolean {
  return (
    Math.abs(data[pos] - target[0]) <= tolerance &&
    Math.abs(data[pos + 1] - target[1]) <= tolerance &&
    Math.abs(data[pos + 2] - target[2]) <= tolerance &&
    Math.abs(data[pos + 3] - target[3]) <= tolerance
  );
}

// Queue-based scanline flood fill algorithm
function floodFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillColor: [number, number, number, number],
  width: number,
  height: number
) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const startPos = (y * width + x) * 4;
  const targetColor: [number, number, number, number] = [
    data[startPos],
    data[startPos + 1],
    data[startPos + 2],
    data[startPos + 3],
  ];

  // Don't fill if clicking the same color
  if (
    fillColor[0] === targetColor[0] &&
    fillColor[1] === targetColor[1] &&
    fillColor[2] === targetColor[2] &&
    fillColor[3] === targetColor[3]
  ) {
    return;
  }

  // Don't fill if clicking on a dark outline pixel (line art boundary)
  const brightness = targetColor[0] * 0.299 + targetColor[1] * 0.587 + targetColor[2] * 0.114;
  if (brightness < 80 && targetColor[3] > 200) {
    return; // This is a dark outline pixel, don't fill
  }

  const tolerance = 50;
  const queue: [number, number][] = [[x, y]];
  const visited = new Uint8Array(width * height);

  while (queue.length > 0) {
    const [cx, cy] = queue.pop()!;
    const idx = cy * width + cx;

    if (cx < 0 || cx >= width || cy < 0 || cy >= height) continue;
    if (visited[idx]) continue;

    const pos = idx * 4;
    if (!colorsMatch(data, pos, targetColor, tolerance)) continue;

    visited[idx] = 1;
    data[pos] = fillColor[0];
    data[pos + 1] = fillColor[1];
    data[pos + 2] = fillColor[2];
    data[pos + 3] = fillColor[3];

    queue.push([cx + 1, cy]);
    queue.push([cx - 1, cy]);
    queue.push([cx, cy + 1]);
    queue.push([cx, cy - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
}

export default function GanpatiCanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#f36c21");
  const [selectedBrushSize, setSelectedBrushSize] = useState<number>(12);
  const [toolMode, setToolMode] = useState<ToolMode>("fill");
  const [brushOpacity, setBrushOpacity] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [coloredRegions, setColoredRegions] = useState<number>(0);
  const [showShareToast, setShowShareToast] = useState(false);

  // Load Ganpati Outline Image into Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/ganpati-outline.jpg";
    img.onload = () => {
      canvas.width = img.naturalWidth || 900;
      canvas.height = img.naturalHeight || 900;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialState]);
    };
  }, []);

  const saveStateToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-20), state]);
  }, []);

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/ganpati-outline.jpg";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([newState]);
      setColoredRegions(0);
    };
  };

  // Get canvas coordinates from event
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY),
    };
  };

  // Fill Tool Handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (toolMode !== "fill") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!coords) return;

    const rgba = hexToRgba(selectedColor);
    floodFill(ctx, coords.x, coords.y, rgba, canvas.width, canvas.height);
    saveStateToHistory();
    setColoredRegions((prev) => prev + 1);
  };

  // Drawing Handlers (Brush & Eraser)
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (toolMode === "fill") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const coords = getCanvasCoords(e);
    if (!coords) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || toolMode === "fill") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!coords) return;

    ctx.lineTo(coords.x, coords.y);

    if (toolMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(255,255,255,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = brushOpacity;
    }

    ctx.lineWidth = selectedBrushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Reset globals after drawing
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveStateToHistory();
    }
  };

  const compositeWithWatermark = (): Promise<HTMLCanvasElement> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!;
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const ctx = offscreen.getContext("2d")!;

      // Draw main canvas content
      ctx.drawImage(canvas, 0, 0);

      // Load the Snowcem logo fresh and composite it
      const logo = new Image();
      logo.src = "/image.png";
      logo.onload = () => {
        const padding = 20;
        const logoWidth = canvas.width * 0.15;
        const logoHeight = (logo.naturalHeight / logo.naturalWidth) * logoWidth;
        const x = canvas.width - logoWidth - padding;
        const y = canvas.height - logoHeight - padding;

        ctx.globalAlpha = 0.85;
        ctx.drawImage(logo, x, y, logoWidth, logoHeight);
        ctx.globalAlpha = 1;

        resolve(offscreen);
      };
    });
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const composited = await compositeWithWatermark();
    const link = document.createElement("a");
    link.download = "Snowcem_Ganpati_Artwork.png";
    link.href = composited.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const composited = await compositeWithWatermark();
      composited.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.share) {
          const file = new File([blob], "Snowcem_Ganpati_Artwork.png", { type: "image/png" });
          await navigator.share({
            title: "My Ganpati Artwork — Snowcem Paints",
            text: "I colored this Ganpati artwork using Snowcem Paints divine color palette! 🎨🙏",
            files: [file],
          });
        } else {
          // Fallback: copy image to clipboard
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setShowShareToast(true);
          setTimeout(() => setShowShareToast(false), 3000);
        }
      }, "image/png");
    } catch {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  // Active tool cursor class
  const cursorClass =
    toolMode === "fill"
      ? "cursor-crosshair"
      : toolMode === "eraser"
      ? "cursor-cell"
      : "cursor-crosshair";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <AnnouncementBar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Header Title Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-1">
              Ganpati Colouring Canvas
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Express your devotion &amp; creativity! Tap regions to fill or paint freely with vibrant Snowcem paint shades.
            </p>
          </div>

          {/* CANVAS WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">

            {/* LEFT PALETTE & TOOLS PANEL (4 COLS) */}
            <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5 lg:sticky lg:top-28">

              {/* TOOL MODE SELECTOR */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading">
                  Active Tool
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { mode: "fill" as ToolMode, label: "Fill", icon: Droplets },
                      { mode: "brush" as ToolMode, label: "Brush", icon: Paintbrush },
                      { mode: "eraser" as ToolMode, label: "Eraser", icon: Eraser },
                    ] as const
                  ).map((tool) => (
                    <button
                      key={tool.mode}
                      onClick={() => setToolMode(tool.mode)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        toolMode === tool.mode
                          ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white border-transparent shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <tool.icon className="w-3.5 h-3.5" />
                      {tool.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* COLOR PALETTE */}
              <div>
                <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading mb-1">
                  Snowcem Paint Palette
                </h3>
                <p className="text-[10px] text-slate-500 mb-3">
                  Select your active paint shade
                </p>

                <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2">
                  {SNOWCEM_CANVAS_PALETTE.map((c) => {
                    const isSelected = selectedColor === c.hex;
                    return (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c.hex)}
                        title={c.name}
                        className={`w-9 h-9 rounded-xl transition-all relative flex items-center justify-center border ${
                          isSelected
                            ? "scale-110 shadow-md ring-2 ring-purple-600 border-white"
                            : "hover:scale-105 border-slate-200"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <CheckCircle2
                            className={`w-4 h-4 ${
                              c.hex === "#ffffff" || c.hex === "#fef08a" || c.hex === "#facc15"
                                ? "text-slate-900"
                                : "text-white"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Color Preview */}
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-lg border border-slate-200 shadow-inner"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="text-[11px] font-semibold text-slate-600">
                    {SNOWCEM_CANVAS_PALETTE.find((c) => c.hex === selectedColor)?.name || "Custom"}
                  </span>
                </div>
              </div>

              {/* BRUSH SIZE (only for brush/eraser modes) */}
              {toolMode !== "fill" && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading">
                      Tip Thickness
                    </h4>
                    <span className="text-[11px] font-semibold text-purple-700">{selectedBrushSize}px</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {BRUSH_SIZES.map((b) => (
                      <button
                        key={b.label}
                        onClick={() => setSelectedBrushSize(b.size)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all border text-center ${
                          selectedBrushSize === b.size
                            ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white border-transparent shadow-2xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BRUSH OPACITY (only for brush mode) */}
              {toolMode === "brush" && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading">
                      Opacity
                    </h4>
                    <span className="text-[11px] font-semibold text-purple-700">{Math.round(brushOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={brushOpacity}
                    onChange={(e) => setBrushOpacity(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              )}

              {/* ACTION BUTTONS */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={handleUndo}
                  disabled={history.length <= 1}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold py-2.5 px-3 rounded-xl transition-all text-xs border border-slate-200"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Undo</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold py-2.5 px-3 rounded-xl transition-all text-xs border border-slate-200"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* DOWNLOAD & SHARE */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleDownload}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] hover:opacity-95 text-white font-extrabold py-3 px-4 rounded-2xl transition-all shadow-sm text-xs font-heading"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-4 rounded-2xl transition-all shadow-sm text-xs font-heading"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* STATS */}
              {coloredRegions > 0 && (
                <div className="text-center py-2 bg-purple-50 border border-purple-100 rounded-xl">
                  <span className="text-[11px] font-bold text-purple-700">
                    🎨 {coloredRegions} region{coloredRegions !== 1 ? "s" : ""} colored
                  </span>
                </div>
              )}

            </div>

            {/* RIGHT INTERACTIVE CANVAS STAGE (8 COLS) */}
            <div className="lg:col-span-8 bg-white p-3 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center relative">

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-3xl z-10">
                  <div className="flex flex-col items-center space-y-2">
                    <Sparkles className="w-8 h-8 text-purple-600 animate-spin" />
                    <span className="text-xs font-semibold text-slate-500">Loading Ganpati Lineart Canvas...</span>
                  </div>
                </div>
              )}

              {/* Active Tool Indicator */}
              <div className="w-full flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                    {toolMode === "fill" && <Droplets className="w-3.5 h-3.5 text-purple-600" />}
                    {toolMode === "brush" && <Paintbrush className="w-3.5 h-3.5 text-purple-600" />}
                    {toolMode === "eraser" && <Eraser className="w-3.5 h-3.5 text-purple-600" />}
                    <span className="text-[11px] font-bold text-slate-700 capitalize">{toolMode} Mode</span>
                  </div>
                  <div
                    className="w-5 h-5 rounded-md border border-slate-200 shadow-inner"
                    style={{ backgroundColor: toolMode === "eraser" ? "#ffffff" : selectedColor }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  {toolMode === "fill"
                    ? "Click any enclosed area to flood-fill with color"
                    : toolMode === "brush"
                    ? "Click & drag to paint brush strokes"
                    : "Click & drag to erase painted areas"}
                </span>
              </div>

              {/* Canvas Container */}
              <div className={`relative w-full max-w-[600px] aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white ${cursorClass}`}>
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={900}
                  onClick={handleCanvasClick}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full touch-none select-none"
                />
              </div>

              <p className="text-[11px] text-slate-400 font-normal mt-3 text-center leading-relaxed max-w-md">
                {toolMode === "fill" ? (
                  <>💡 <strong>Fill Mode:</strong> Tap any white region of the Ganpati outline to flood-fill it with your chosen Snowcem paint shade.</>
                ) : toolMode === "eraser" ? (
                  <>🧹 <strong>Eraser Mode:</strong> Drag across areas to erase your paint strokes.</>
                ) : (
                  <>🖌️ <strong>Brush Mode:</strong> Click or touch &amp; drag to freely paint across the canvas with your chosen shade.</>
                )}
              </p>

            </div>

          </div>

        </div>
      </main>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold">Artwork copied to clipboard!</span>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
