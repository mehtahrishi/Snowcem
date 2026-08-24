"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
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
  Upload,
  FileImage,
  RefreshCw,
  Pipette,
} from "lucide-react";

// Expanded Divine Palette
const SNOWCEM_CANVAS_PALETTE = [
  { name: "Snowcem Orange", hex: "#f36c21" },
  { name: "Snowcem Navy", hex: "#2a1b92" },
  { name: "Royal Purple", hex: "#5c249c" },
  { name: "Magenta Divine", hex: "#e91e63" },
  { name: "Marigold Yellow", hex: "#facc15" },
  { name: "Modak Gold", hex: "#eab308" },
  { name: "Sacred Crimson", hex: "#dc2626" },
  { name: "Vermillion Sindoor", hex: "#b91c1c" },
  { name: "Temple Ruby", hex: "#9f1239" },
  { name: "Lotus Pink", hex: "#ec4899" },
  { name: "Bright Coral", hex: "#ff6b6b" },
  { name: "Sunset Orange", hex: "#ff8c00" },
  { name: "Peacock Blue", hex: "#0284c7" },
  { name: "Ocean Deep", hex: "#0369a1" },
  { name: "Divine Teal", hex: "#0d9488" },
  { name: "Bright Cyan", hex: "#06b6d4" },
  { name: "Fresh Pista", hex: "#22c55e" },
  { name: "Leaf Green", hex: "#15803d" },
  { name: "Emerald Green", hex: "#059669" },
  { name: "Sandalwood Cream", hex: "#fef08a" },
  { name: "Soft Peach", hex: "#ffedd5" },
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

const FESTIVAL_TEMPLATES = [
  {
    id: "ganpati",
    name: "Ganesh Chaturthi",
    shortName: "Ganesh Art",
    icon: "🐘",
    src: "/ganpati-outline.jpg",
  },
  {
    id: "diwali",
    name: "Diwali Lights",
    shortName: "Diya & Rangoli",
    icon: "🪔",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><rect width="900" height="900" fill="%23ffffff"/><g stroke="%231e293b" stroke-width="4" fill="%23ffffff" stroke-linecap="round" stroke-linejoin="round"><circle cx="450" cy="450" r="380"/><circle cx="450" cy="450" r="320"/><path d="M450 150 Q490 270 450 350 Q410 270 450 150 Z"/><path d="M450 550 Q490 630 450 750 Q410 630 450 550 Z"/><path d="M150 450 Q270 490 350 450 Q270 410 150 450 Z"/><path d="M550 450 Q630 490 750 450 Q630 410 550 450 Z"/><path d="M238 238 Q344 324 379 379 Q324 344 238 238 Z"/><path d="M662 662 Q556 576 521 521 Q576 556 662 662 Z"/><path d="M662 238 Q556 324 521 379 Q576 344 662 238 Z"/><path d="M238 662 Q344 576 379 521 Q324 556 238 662 Z"/><circle cx="450" cy="450" r="100"/><path d="M450 400 Q480 340 450 300 Q420 340 450 400 Z" fill="%23ffffff"/><path d="M370 520 Q450 620 530 520 Z" fill="%23ffffff"/></g></svg>`,
  },
  {
    id: "navratri",
    name: "Navratri Festival",
    shortName: "Divine Kalash",
    icon: "🌺",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><rect width="900" height="900" fill="%23ffffff"/><g stroke="%231e293b" stroke-width="4" fill="%23ffffff" stroke-linecap="round" stroke-linejoin="round"><circle cx="450" cy="450" r="390"/><circle cx="450" cy="450" r="340"/><path d="M450 200 Q490 280 450 340 Q410 280 450 200 Z"/><path d="M450 560 Q490 620 450 700 Q410 620 450 560 Z"/><path d="M200 450 Q280 490 340 450 Q280 410 200 450 Z"/><path d="M560 450 Q620 490 700 450 Q620 410 560 450 Z"/><path d="M350 480 L550 480 L510 620 Q450 670 390 620 Z"/><path d="M410 480 C410 420 490 420 490 480 Z"/><path d="M450 420 L450 360 L490 400 L450 420 Z"/><circle cx="450" cy="450" r="70"/><circle cx="450" cy="450" r="30"/></g></svg>`,
  },
  {
    id: "holi",
    name: "Holi Colors",
    shortName: "Floral Mandala",
    icon: "🎨",
    src: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900"><rect width="900" height="900" fill="%23ffffff"/><g stroke="%231e293b" stroke-width="4" fill="%23ffffff" stroke-linecap="round" stroke-linejoin="round"><circle cx="450" cy="450" r="400"/><circle cx="450" cy="450" r="300"/><circle cx="450" cy="450" r="200"/><circle cx="450" cy="450" r="100"/><path d="M450 50 Q520 180 450 250 Q380 180 450 50 Z"/><path d="M450 650 Q520 720 450 850 Q380 720 450 650 Z"/><path d="M50 450 Q180 520 250 450 Q180 380 50 450 Z"/><path d="M650 450 Q720 520 850 450 Q720 380 650 450 Z"/><circle cx="450" cy="450" r="40"/></g></svg>`,
  },
];

const DEFAULT_IMAGE_SRC = "/ganpati-outline.jpg";

function hexToRgba(hex: string): [number, number, number, number] {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
  const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
  const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
  return [r, g, b, 255];
}

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

  if (
    fillColor[0] === targetColor[0] &&
    fillColor[1] === targetColor[1] &&
    fillColor[2] === targetColor[2] &&
    fillColor[3] === targetColor[3]
  ) {
    return;
  }

  const brightness = targetColor[0] * 0.299 + targetColor[1] * 0.587 + targetColor[2] * 0.114;
  if (brightness < 80 && targetColor[3] > 200) {
    return;
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

export default function FestiveStudioPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activeImageSrc, setActiveImageSrc] = useState<string>(DEFAULT_IMAGE_SRC);
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>("#f36c21");
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [selectedBrushSize, setSelectedBrushSize] = useState<number>(12);
  const [toolMode, setToolMode] = useState<ToolMode>("fill");
  const [brushOpacity, setBrushOpacity] = useState<number>(1);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [coloredRegions, setColoredRegions] = useState<number>(0);
  const [showShareToast, setShowShareToast] = useState(false);

  const loadImageToCanvas = useCallback((src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setImageLoaded(false);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const imgW = img.naturalWidth || 900;
      const imgH = img.naturalHeight || 900;

      canvas.width = imgW;
      canvas.height = imgH;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, imgW, imgH);
      ctx.drawImage(img, 0, 0, imgW, imgH);

      setImageLoaded(true);
      const initialState = ctx.getImageData(0, 0, imgW, imgH);
      setHistory([initialState]);
      setColoredRegions(0);
    };
  }, []);

  useEffect(() => {
    loadImageToCanvas(activeImageSrc);
  }, [activeImageSrc, loadImageToCanvas]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCustomImageSrc(dataUrl);
        setActiveImageSrc(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectCustomColor = (hex: string) => {
    const formatted = hex.startsWith("#") ? hex : `#${hex}`;
    setSelectedColor(formatted);
    setCustomColors((prev) => {
      if (prev.includes(formatted)) return prev;
      return [formatted, ...prev.slice(0, 7)];
    });
  };

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
    loadImageToCanvas(activeImageSrc);
  };

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

  const isDrawingRef = useRef<boolean>(false);
  const lastCoordsRef = useRef<{ x: number; y: number } | null>(null);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (toolMode === "fill") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!coords) return;

    isDrawingRef.current = true;
    lastCoordsRef.current = coords;

    const scaleRatio = Math.max(0.5, canvas.width / 900);
    const strokeWidth = selectedBrushSize * scaleRatio;

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, Math.max(1, strokeWidth / 2), 0, Math.PI * 2);
    if (toolMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(255,255,255,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = selectedColor;
      ctx.globalAlpha = brushOpacity;
    }
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || toolMode === "fill") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!coords || !lastCoordsRef.current) return;

    const scaleRatio = Math.max(0.5, canvas.width / 900);
    const strokeWidth = selectedBrushSize * scaleRatio;

    ctx.beginPath();
    ctx.moveTo(lastCoordsRef.current.x, lastCoordsRef.current.y);
    ctx.lineTo(coords.x, coords.y);

    if (toolMode === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(255,255,255,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = brushOpacity;
    }

    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;

    lastCoordsRef.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastCoordsRef.current = null;
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

      ctx.drawImage(canvas, 0, 0);

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
      logo.onerror = () => {
        resolve(offscreen);
      };
    });
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const composited = await compositeWithWatermark();
    const link = document.createElement("a");
    link.download = "Snowcem_Festive_Artwork.png";
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
          const file = new File([blob], "Snowcem_Festive_Artwork.png", { type: "image/png" });
          await navigator.share({
            title: "My Festive Artwork — Snowcem Paints",
            text: "I colored this festive artwork using Snowcem Paints color palette! 🎨✨",
            files: [file],
          });
        } else {
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

  const cursorClass =
    toolMode === "fill"
      ? "cursor-crosshair"
      : toolMode === "eraser"
      ? "cursor-cell"
      : "cursor-crosshair";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PaintLoader />

      <div className="sticky top-0 z-40 bg-white shadow-xs">
        <Header />
      </div>

      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              Seasonal Festive Studio
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent leading-tight sm:leading-snug pb-1">
              Festive Studio &amp; Digital Canvas
            </h1>
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              Celebrate every Indian festival! Select templates for Ganesh Chaturthi, Diwali, Navratri, or Holi — or upload your custom sketch and paint with Snowcem&apos;s divine color spectrum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto">

            <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-5 lg:sticky lg:top-28">

              <div className="space-y-3 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <FileImage className="w-3.5 h-3.5 text-purple-600" />
                    Select Festival Template
                  </h4>
                  {customImageSrc && activeImageSrc === customImageSrc && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-md">
                      Custom Upload
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {FESTIVAL_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setActiveImageSrc(tmpl.src)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
                        activeImageSrc === tmpl.src
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-sm">{tmpl.icon}</span>
                      <span className="truncate">{tmpl.shortName}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                      customImageSrc && activeImageSrc === customImageSrc
                        ? "bg-gradient-to-r from-[#2a1b92] to-[#e91e63] text-white border-transparent shadow-xs"
                        : "bg-amber-50/80 text-amber-900 border-amber-200 hover:bg-amber-100"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Custom Sketch / Image
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {customImageSrc && activeImageSrc !== customImageSrc && (
                  <button
                    onClick={() => setActiveImageSrc(customImageSrc)}
                    className="w-full text-center text-[11px] font-semibold text-purple-700 hover:underline pt-1 flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Re-select uploaded image
                  </button>
                )}
              </div>

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

              <div className="space-y-4 py-4 px-3 sm:px-4 my-1 border border-slate-100 bg-slate-50/50 rounded-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider font-heading flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-purple-600" />
                    Color Palette &amp; Picker
                  </h3>
                  <span className="text-[10px] font-medium text-slate-500">
                    Unlimited Colors
                  </span>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-7 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 py-1">
                  <label
                    className="relative w-8 h-8 rounded-xl cursor-pointer transition-all flex items-center justify-center border border-slate-300 bg-gradient-to-tr from-rose-500 via-yellow-400 via-emerald-400 to-indigo-600 hover:scale-105 shadow-xs overflow-hidden flex-shrink-0"
                    title="Click to open full color spectrum picker"
                  >
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => handleSelectCustomColor(e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Pipette className="w-4 h-4 text-white drop-shadow-md" />
                  </label>

                  {SNOWCEM_CANVAS_PALETTE.map((c) => {
                    const isSelected = selectedColor.toLowerCase() === c.hex.toLowerCase();
                    return (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c.hex)}
                        title={c.name}
                        className={`w-8 h-8 rounded-xl transition-all relative flex items-center justify-center border ${
                          isSelected
                            ? "scale-110 shadow-md ring-2 ring-purple-600 border-white z-10"
                            : "hover:scale-105 border-slate-200"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && (
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              c.hex === "#ffffff" || c.hex === "#fef08a" || c.hex === "#facc15" || c.hex === "#ffedd5"
                                ? "text-slate-900"
                                : "text-white"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg border border-slate-200 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: selectedColor }}
                    />

                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono font-bold">#</span>
                      <input
                        type="text"
                        value={selectedColor.replace("#", "").toUpperCase()}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
                          if (val.length === 6) {
                            handleSelectCustomColor(`#${val}`);
                          } else {
                            setSelectedColor(`#${val}`);
                          }
                        }}
                        maxLength={6}
                        placeholder="F36C21"
                        className="w-full pl-6 pr-2 py-1 text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 uppercase"
                      />
                    </div>

                    <label className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold px-2.5 py-1 rounded-lg cursor-pointer flex items-center gap-1 transition-all">
                      <Pipette className="w-3.5 h-3.5" />
                      <span>Pick</span>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleSelectCustomColor(e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  {customColors.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Recent:</span>
                      <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                        {customColors.map((hex) => (
                          <button
                            key={hex}
                            onClick={() => setSelectedColor(hex)}
                            title={hex}
                            className={`w-5 h-5 rounded-md border transition-transform ${
                              selectedColor.toLowerCase() === hex.toLowerCase()
                                ? "ring-2 ring-purple-600 scale-110"
                                : "hover:scale-105 border-slate-200"
                            }`}
                            style={{ backgroundColor: hex }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

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

              {coloredRegions > 0 && (
                <div className="text-center py-2 bg-purple-50 border border-purple-100 rounded-xl">
                  <span className="text-[11px] font-bold text-purple-700">
                    🎨 {coloredRegions} region{coloredRegions !== 1 ? "s" : ""} colored
                  </span>
                </div>
              )}

            </div>

            <div className="lg:col-span-8 bg-white p-3 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center relative">

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-3xl z-10">
                  <div className="flex flex-col items-center space-y-2">
                    <Sparkles className="w-8 h-8 text-purple-600 animate-spin" />
                    <span className="text-xs font-semibold text-slate-500">Loading Canvas Line-Art...</span>
                  </div>
                </div>
              )}

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
                    ? "Click any enclosed white area to flood-fill with color"
                    : toolMode === "brush"
                    ? "Click & drag to paint brush strokes"
                    : "Click & drag to erase painted areas"}
                </span>
              </div>

              <div className={`relative w-full max-w-[600px] min-h-[350px] sm:min-h-[450px] flex items-center justify-center p-3 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100/50 ${cursorClass}`}>
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="max-w-full max-h-[550px] w-auto h-auto object-contain touch-none select-none shadow-sm rounded-xl bg-white"
                />
              </div>

              <p className="text-[11px] text-slate-400 font-normal mt-3 text-center leading-relaxed max-w-md">
                {toolMode === "fill" ? (
                  <>💡 <strong>Fill Mode:</strong> Tap any white region of the line-art image to flood-fill it with your chosen paint shade.</>
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

      {showShareToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold">Artwork copied to clipboard!</span>
        </div>
      )}

      <Footer />
    </div>
  );
}
