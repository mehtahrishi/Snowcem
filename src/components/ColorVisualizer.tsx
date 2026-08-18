"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  RotateCcw,
  Check,
  Search,
  Home,
  Bed,
  Utensils,
  Building,
  MapPin,
  ArrowRight,
  Share2,
  Upload,
  Droplets,
  Paintbrush,
  Eraser,
  Undo2,
  Redo2,
  Download,
  Sliders,
  Camera,
  Image as ImageIcon
} from "lucide-react";

// Curated Master Snowcem Shade Palette
export interface VisualizerShade {
  id: string;
  name: string;
  code: string;
  hex: string;
  category: "Interior" | "Exterior" | "Luxury" | "Heritage";
  family: "Neutrals" | "Blues" | "Greens" | "Reds" | "Yellows" | "Purples";
  productMatch: string;
  finish: string;
}

const MASTER_SHADES: VisualizerShade[] = [
  // Neutrals & Whites
  { id: "s-1", name: "Ethereal Off-White", code: "2652P", hex: "#ECEFF1", category: "Interior", family: "Neutrals", productMatch: "Zenita Velvet Finish", finish: "Luxury Velvet" },
  { id: "s-2", name: "Mission Beige", code: "2078P", hex: "#E3D5CA", category: "Interior", family: "Neutrals", productMatch: "Celeste Luxury Emulsion", finish: "Smooth Silk" },
  { id: "s-3", name: "Beige Mirage", code: "2869P", hex: "#E8D8C8", category: "Interior", family: "Neutrals", productMatch: "Sentino Interior", finish: "Rich Matte" },
  { id: "s-4", name: "Snowcoat Pearl", code: "ST-0010", hex: "#F3F4F6", category: "Exterior", family: "Neutrals", productMatch: "Snowcoat Exterior", finish: "Weatherproof Matt" },
  { id: "s-5", name: "Tinted Clay", code: "S2704", hex: "#C4A482", category: "Exterior", family: "Neutrals", productMatch: "Sandtex Matt", finish: "Heavy Duty Texture" },

  // Regal Blues
  { id: "s-6", name: "Cosmic Ocean", code: "S1175", hex: "#1A365D", category: "Luxury", family: "Blues", productMatch: "Uni-glosss Luxury", finish: "High Gloss Reflective" },
  { id: "s-7", name: "Classy Blue", code: "S2673", hex: "#1D4ED8", category: "Interior", family: "Blues", productMatch: "Zenita Velvet Finish", finish: "Velvet Sheen" },
  { id: "s-8", name: "Jonathan Blue", code: "S4473", hex: "#3B82F6", category: "Interior", family: "Blues", productMatch: "Celeste Interior", finish: "Soft Pearl" },
  { id: "s-9", name: "River Volta", code: "S7472", hex: "#0284C7", category: "Exterior", family: "Blues", productMatch: "Pentasia Exterior", finish: "Weather Resistant" },
  { id: "s-10", name: "April Sky", code: "2372P", hex: "#B0C4DE", category: "Interior", family: "Blues", productMatch: "Sentino Interior", finish: "Smooth Matte" },

  // Refreshing Greens
  { id: "s-11", name: "Teal Green", code: "S1175T", hex: "#008080", category: "Luxury", family: "Greens", productMatch: "Uni-glosss Luxury", finish: "High Gloss" },
  { id: "s-12", name: "Long Creepers", code: "S8393", hex: "#15803D", category: "Exterior", family: "Greens", productMatch: "Sandtex Matt", finish: "Rugged Matt" },
  { id: "s-13", name: "Steppes Lime", code: "S4503", hex: "#84CC16", category: "Interior", family: "Greens", productMatch: "Celeste Interior", finish: "Silk Sheen" },
  { id: "s-14", name: "Sap Green", code: "2677D", hex: "#507D2A", category: "Exterior", family: "Greens", productMatch: "Snowcryl XT", finish: "Anti-Algal Emulsion" },
  { id: "s-15", name: "Chilled Daiquiri", code: "2575P", hex: "#D1F2D9", category: "Interior", family: "Greens", productMatch: "Snowcare Anti-Bacterial", finish: "Hygienic Matte" },

  // Warm Corals, Terracottas & Reds
  { id: "s-16", name: "Tomato Red", code: "S2005", hex: "#EF4444", category: "Luxury", family: "Reds", productMatch: "Uni-glosss Luxury", finish: "Gloss Enamel" },
  { id: "s-17", name: "Coral Reef", code: "S7075", hex: "#F97316", category: "Interior", family: "Reds", productMatch: "Zenita Velvet Finish", finish: "Velvet Satin" },
  { id: "s-18", name: "All Guard Terracotta", code: "AG-6055", hex: "#C2410C", category: "Exterior", family: "Reds", productMatch: "All Guard Exterior", finish: "UV Shield Matt" },
  { id: "s-19", name: "Apricot Whisper", code: "2148P", hex: "#FED7AA", category: "Interior", family: "Reds", productMatch: "Celeste Interior", finish: "Soft Satin" },
  { id: "s-20", name: "Fresh Pink", code: "2232P", hex: "#F472B6", category: "Interior", family: "Reds", productMatch: "Sentino Interior", finish: "Smooth Matte" },

  // Sunlit Yellows & Golds
  { id: "s-21", name: "Hummer Yellow", code: "S2779", hex: "#EAB308", category: "Interior", family: "Yellows", productMatch: "Zenita Velvet Finish", finish: "Warm Sheen" },
  { id: "s-22", name: "Marigold Gold", code: "S10X1", hex: "#F59E0B", category: "Luxury", family: "Yellows", productMatch: "Uni-glosss Luxury", finish: "Reflective Gloss" },
  { id: "s-23", name: "School Bus", code: "S6978", hex: "#FACC15", category: "Exterior", family: "Yellows", productMatch: "Trump Weather Defense", finish: "Durable Exterior" },
  { id: "s-24", name: "Chardonnay Glow", code: "2022P", hex: "#FEF08A", category: "Interior", family: "Yellows", productMatch: "Celeste Interior", finish: "Silk Luster" },
  { id: "s-25", name: "Buff Sand", code: "2113P", hex: "#FDE047", category: "Exterior", family: "Yellows", productMatch: "Sandtex Matt", finish: "Textured Matt" },

  // Royal Purples & Deep Tones
  { id: "s-26", name: "Snowcem Royal Purple", code: "SN-9010", hex: "#4A154B", category: "Luxury", family: "Purples", productMatch: "Uni-glosss Luxury", finish: "Regal Gloss" },
  { id: "s-27", name: "Zenita Deep Indigo", code: "ZN-4089", hex: "#2E1065", category: "Interior", family: "Purples", productMatch: "Zenita Velvet Finish", finish: "Ultra Velvet" },
  { id: "s-28", name: "Virasat Magenta", code: "VR-8012", hex: "#8E003B", category: "Heritage", family: "Purples", productMatch: "True Colours Palette", finish: "Rich Satin" },
  { id: "s-29", name: "May Blossom Lavender", code: "2197P", hex: "#E9D5FF", category: "Interior", family: "Purples", productMatch: "Celeste Interior", finish: "Soft Velvet" },
  { id: "s-30", name: "Agate Slate", code: "S8705", hex: "#64748B", category: "Exterior", family: "Neutrals", productMatch: "Snowcryl XT", finish: "Silicone Fortified" },
];

export type RoomSceneId = "living-room" | "bedroom" | "dining-room" | "exterior-villa";
export type SurfaceTarget = "mainWall" | "sideWall" | "trimWall";

interface RoomScene {
  id: RoomSceneId;
  name: string;
  icon: React.ElementType;
  description: string;
  surfaces: {
    mainWall: { name: string; defaultColor: string };
    sideWall: { name: string; defaultColor: string };
    trimWall: { name: string; defaultColor: string };
  };
}

const ROOM_SCENES: RoomScene[] = [
  {
    id: "living-room",
    name: "Modern Living Room",
    icon: Home,
    description: "Spacious contemporary living room with accent feature wall, sofa lounge, and ambient lighting.",
    surfaces: {
      mainWall: { name: "Main Feature Wall", defaultColor: "#1A365D" },
      sideWall: { name: "Side Ambient Wall", defaultColor: "#ECEFF1" },
      trimWall: { name: "Ceiling & Base Trim", defaultColor: "#FFFFFF" },
    },
  },
  {
    id: "bedroom",
    name: "Master Bedroom",
    icon: Bed,
    description: "Serene bedroom with headboard backdrop wall and modern nightstands.",
    surfaces: {
      mainWall: { name: "Headboard Feature Wall", defaultColor: "#4A154B" },
      sideWall: { name: "Side Natural Wall", defaultColor: "#E8D8C8" },
      trimWall: { name: "Ceiling Coving", defaultColor: "#F8FAFC" },
    },
  },
  {
    id: "dining-room",
    name: "Luxury Dining Room",
    icon: Utensils,
    description: "Warm dining area with feature backdrop wall, pendant lighting, and sideboard.",
    surfaces: {
      mainWall: { name: "Dining Backdrop Wall", defaultColor: "#C2410C" },
      sideWall: { name: "Side Nook Wall", defaultColor: "#FEF08A" },
      trimWall: { name: "Archway Trim", defaultColor: "#FFFFFF" },
    },
  },
  {
    id: "exterior-villa",
    name: "Exterior Villa Facade",
    icon: Building,
    description: "Modern architectural villa facade with exterior body walls and column trims.",
    surfaces: {
      mainWall: { name: "Main Exterior Body", defaultColor: "#C4A482" },
      sideWall: { name: "Balcony Accent Wall", defaultColor: "#15803D" },
      trimWall: { name: "Pillars & Roof Trim", defaultColor: "#F3F4F6" },
    },
  },
];

// Helper: Convert hex to RGBA
function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16) || 0;
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

type ToolMode = "smart-fill" | "brush" | "eraser";

export default function ColorVisualizer() {
  const [isUploadMode, setIsUploadMode] = useState<boolean>(false);
  const [selectedScene, setSelectedScene] = useState<RoomScene>(ROOM_SCENES[0]);
  const [activeSurface, setActiveSurface] = useState<SurfaceTarget>("mainWall");
  const [wallColors, setWallColors] = useState<{ [sceneId: string]: { mainWall: string; sideWall: string; trimWall: string } }>({
    "living-room": { mainWall: "#1A365D", sideWall: "#ECEFF1", trimWall: "#FFFFFF" },
    "bedroom": { mainWall: "#4A154B", sideWall: "#E8D8C8", trimWall: "#F8FAFC" },
    "dining-room": { mainWall: "#C2410C", sideWall: "#FEF08A", trimWall: "#FFFFFF" },
    "exterior-villa": { mainWall: "#C4A482", sideWall: "#15803D", trimWall: "#F3F4F6" },
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("All");
  const [activeFamilyTab, setActiveFamilyTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#2a1b92");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Beta Upload Canvas States
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolMode>("smart-fill");
  const [brushSize, setBrushSize] = useState<number>(24);
  const [tolerance, setTolerance] = useState<number>(35);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const historyStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentColors = wallColors[selectedScene.id];

  // Helper to find selected shade details
  const activeColorHex = isUploadMode
    ? customHex
    : currentColors[activeSurface];

  const currentShadeDetails = MASTER_SHADES.find(
    (s) => s.hex.toLowerCase() === activeColorHex.toLowerCase()
  ) || {
    name: "Custom Snowcem Tint",
    code: "CUSTOM",
    hex: activeColorHex,
    category: "Custom Tint",
    productMatch: "Snowcem Multi-Surface Tintable",
    finish: "Custom Finish",
  };

  // Handle color change
  const applyColor = (hex: string) => {
    setCustomHex(hex);
    if (!isUploadMode) {
      setWallColors((prev) => ({
        ...prev,
        [selectedScene.id]: {
          ...prev[selectedScene.id],
          [activeSurface]: hex,
        },
      }));
    }
  };

  // Reset current scene to defaults
  const resetCurrentScene = () => {
    setWallColors((prev) => ({
      ...prev,
      [selectedScene.id]: {
        mainWall: selectedScene.surfaces.mainWall.defaultColor,
        sideWall: selectedScene.surfaces.sideWall.defaultColor,
        trimWall: selectedScene.surfaces.trimWall.defaultColor,
      },
    }));
  };

  // Canvas Image Loader for Beta Upload
  const loadUserImageToCanvas = useCallback((src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const maxW = 900;
      const maxH = 600;
      let w = img.width;
      let h = img.height;

      if (w > maxW || h > maxH) {
        const ratio = Math.min(maxW / w, maxH / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }

      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      originalImageRef.current = img;
      const initialData = ctx.getImageData(0, 0, w, h);
      originalImageDataRef.current = initialData;
      historyStackRef.current = [ctx.getImageData(0, 0, w, h)];
      redoStackRef.current = [];
    };
    img.src = src;
  }, []);

  useEffect(() => {
    if (isUploadMode && userImageSrc) {
      loadUserImageToCanvas(userImageSrc);
    }
  }, [isUploadMode, userImageSrc, loadUserImageToCanvas]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setUserImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const pushCanvasHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    if (historyStackRef.current.length > 15) {
      historyStackRef.current.shift();
    }
    historyStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    redoStackRef.current = [];
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

  // Smart Flood Fill with Luminance Preservation
  const performSmartFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    const startIdx = (startY * w + startX) * 4;
    const targetR = data[startIdx];
    const targetG = data[startIdx + 1];
    const targetB = data[startIdx + 2];

    const [fillR, fillG, fillB] = hexToRgb(currentShadeDetails.hex);

    const matchColor = (idx: number): boolean => {
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const dist = Math.sqrt(
        Math.pow(r - targetR, 2) + Math.pow(g - targetG, 2) + Math.pow(b - targetB, 2)
      );
      return dist <= tolerance * 2.2;
    };

    const visited = new Uint8Array(w * h);
    const queue: number[] = [startX + startY * w];
    visited[startX + startY * w] = 1;

    while (queue.length > 0) {
      const pos = queue.pop()!;
      const cx = pos % w;
      const cy = Math.floor(pos / w);
      const idx = (cy * w + cx) * 4;

      const origLuminance = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
      
      data[idx] = Math.min(255, Math.round(fillR * origLuminance * 1.08));
      data[idx + 1] = Math.min(255, Math.round(fillG * origLuminance * 1.08));
      data[idx + 2] = Math.min(255, Math.round(fillB * origLuminance * 1.08));
      data[idx + 3] = 255;

      const neighbors = [
        [cx + 1, cy],
        [cx - 1, cy],
        [cx, cy + 1],
        [cx, cy - 1],
      ];

      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          const nPos = ny * w + nx;
          if (!visited[nPos]) {
            const nIdx = (ny * w + nx) * 4;
            if (matchColor(nIdx)) {
              visited[nPos] = 1;
              queue.push(nPos);
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    pushCanvasHistory();
  };

  const drawBrush = (x: number, y: number, isEraser: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isEraser && originalImageRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(originalImageRef.current, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = currentShadeDetails.hex;
      ctx.globalAlpha = 0.85;
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY),
    };
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    if (activeTool === "smart-fill") {
      performSmartFill(x, y);
    } else {
      isDrawingRef.current = true;
      drawBrush(x, y, activeTool === "eraser");
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    if (activeTool === "brush" || activeTool === "eraser") {
      const { x, y } = getCanvasCoords(e);
      drawBrush(x, y, activeTool === "eraser");
    }
  };

  const handlePointerUp = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      pushCanvasHistory();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height + 70;
    const expCtx = exportCanvas.getContext("2d");
    if (!expCtx) return;

    expCtx.drawImage(canvas, 0, 0);

    expCtx.fillStyle = "#0F172A";
    expCtx.fillRect(0, canvas.height, canvas.width, 70);

    const grad = expCtx.createLinearGradient(0, canvas.height, canvas.width, canvas.height);
    grad.addColorStop(0, "#2a1b92");
    grad.addColorStop(0.5, "#5c249c");
    grad.addColorStop(1, "#e91e63");
    expCtx.fillStyle = grad;
    expCtx.fillRect(0, canvas.height, canvas.width, 4);

    expCtx.fillStyle = "#FFFFFF";
    expCtx.font = "bold 16px sans-serif";
    expCtx.fillText(`Snowcem Paints | ${currentShadeDetails.name} (${currentShadeDetails.code})`, 20, canvas.height + 36);

    expCtx.fillStyle = "#94A3B8";
    expCtx.font = "12px sans-serif";
    expCtx.fillText(`Product: ${currentShadeDetails.productMatch} &bull; snowcem.com`, 20, canvas.height + 56);

    const link = document.createElement("a");
    link.download = `snowcem-visualized-${currentShadeDetails.code.toLowerCase()}.png`;
    link.href = exportCanvas.toDataURL("image/png");
    link.click();
  };

  // Filter shades
  const filteredShades = MASTER_SHADES.filter((shade) => {
    const matchesCategory = activeCategoryTab === "All" || shade.category === activeCategoryTab;
    const matchesFamily = activeFamilyTab === "All" || shade.family === activeFamilyTab;
    const matchesSearch =
      searchQuery === "" ||
      shade.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shade.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shade.productMatch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFamily && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Visualizer Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent pb-1">
            Preview Snowcem Colours on Real Walls
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Select a room space or upload your own room photo, choose your wall, and experiment with authentic Snowcem shades to visualize your home with zero mess.
          </p>
        </div>

        {/* Room Scene Tabs Switcher + Upload Your Room Tab */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
          {ROOM_SCENES.map((scene) => {
            const Icon = scene.icon;
            const isSelected = !isUploadMode && selectedScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => {
                  setIsUploadMode(false);
                  setSelectedScene(scene);
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap shadow-xs ${
                  isSelected
                    ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white scale-105 shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{scene.name}</span>
              </button>
            );
          })}

          {/* Upload Your Room Image Tab (Beta Testing) */}
          <button
            onClick={() => setIsUploadMode(true)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap shadow-xs relative ${
              isUploadMode
                ? "bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white scale-105 shadow-md ring-2 ring-purple-400/40"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-purple-200"
            }`}
          >
            <Camera className="w-4 h-4 text-pink-500" />
            <span>Upload Your Room</span>
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 uppercase tracking-wider shadow-xs">
              BETA
            </span>
          </button>
        </div>

        {/* Main Visualizer Workspace Studio (Canvas + Controls + Palette) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Room Canvas (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Interactive Canvas Card */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden relative">
              
              {isUploadMode ? (
                /* BETA CUSTOM ROOM PHOTO UPLOAD VIEWPORT */
                <div className="space-y-4">
                  {/* Upload Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    {/* Tool Selectors */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setActiveTool("smart-fill")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition-all ${
                          activeTool === "smart-fill"
                            ? "bg-white text-slate-900 shadow-xs font-extrabold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Droplets className="w-3.5 h-3.5 text-blue-600" />
                        <span>Tap to Paint</span>
                      </button>

                      <button
                        onClick={() => setActiveTool("brush")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition-all ${
                          activeTool === "brush"
                            ? "bg-white text-slate-900 shadow-xs font-extrabold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Paintbrush className="w-3.5 h-3.5 text-[#5c249c]" />
                        <span>Brush</span>
                      </button>

                      <button
                        onClick={() => setActiveTool("eraser")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-heading transition-all ${
                          activeTool === "eraser"
                            ? "bg-white text-slate-900 shadow-xs font-extrabold"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Eraser className="w-3.5 h-3.5 text-pink-600" />
                        <span>Eraser</span>
                      </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5c249c] text-xs font-bold font-heading transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>
                      <button
                        onClick={handleUndo}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Undo"
                      >
                        <Undo2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleRedo}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Redo"
                      >
                        <Redo2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleResetCanvas}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold font-heading shadow-xs transition-colors"
                        title="Download image"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="px-1 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                    {activeTool === "smart-fill" ? (
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-slate-800 font-heading shrink-0 flex items-center gap-1">
                          <Sliders className="w-3.5 h-3.5 text-[#5c249c]" />
                          Spread Tolerance: {tolerance}%
                        </span>
                        <input
                          type="range"
                          min="10"
                          max="75"
                          value={tolerance}
                          onChange={(e) => setTolerance(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5c249c]"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-bold text-slate-800 font-heading shrink-0 flex items-center gap-1">
                          <Paintbrush className="w-3.5 h-3.5 text-[#5c249c]" />
                          Tool Size: {brushSize}px
                        </span>
                        <input
                          type="range"
                          min="6"
                          max="64"
                          value={brushSize}
                          onChange={(e) => setBrushSize(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5c249c]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Canvas Viewport Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner flex items-center justify-center select-none">
                    {userImageSrc ? (
                      <canvas
                        ref={canvasRef}
                        onMouseDown={handlePointerDown}
                        onMouseMove={handlePointerMove}
                        onMouseUp={handlePointerUp}
                        onTouchStart={handlePointerDown}
                        onTouchMove={handlePointerMove}
                        onTouchEnd={handlePointerUp}
                        className={`w-full h-full object-contain ${
                          activeTool === "smart-fill"
                            ? "cursor-crosshair"
                            : activeTool === "brush"
                            ? "cursor-pointer"
                            : "cursor-cell"
                        }`}
                      />
                    ) : (
                      /* Empty Upload Dropzone */
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-slate-900/60 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#e91e63] mb-4 group-hover:scale-110 transition-transform">
                          <Upload className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-white font-heading">
                          Upload a Photo of Your Room
                        </h4>
                        <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
                          Take a photo from your phone or select an image file (JPG, PNG) to virtually paint your own walls with Snowcem colors.
                        </p>
                        <span className="px-5 py-2.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-extrabold font-heading rounded-xl shadow-md">
                          Browse Photo from Device
                        </span>
                      </div>
                    )}

                    {userImageSrc && (
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                        <span>
                          {activeTool === "smart-fill"
                            ? "Tap on wall to paint"
                            : activeTool === "brush"
                            ? "Drag brush across wall"
                            : "Drag eraser to restore"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* PRESET ARCHITECTURAL ROOM SCENES */
                <div>
                  {/* Active Surface Selector Bar (Pill Tabs) & Reset */}
                  <div className="flex items-center justify-between gap-2 mb-4 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-1.5 flex-1">
                      {(["mainWall", "sideWall", "trimWall"] as SurfaceTarget[]).map((surface) => {
                        const surfaceInfo = selectedScene.surfaces[surface];
                        const isSelected = activeSurface === surface;
                        const color = currentColors[surface];
                        return (
                          <button
                            key={surface}
                            onClick={() => setActiveSurface(surface)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl text-xs font-heading font-bold transition-all ${
                              isSelected
                                ? "bg-white text-slate-900 shadow-md font-extrabold scale-[1.02]"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs shrink-0"
                              style={{ backgroundColor: color }}
                            />
                            <span className="truncate">{surfaceInfo.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={resetCurrentScene}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 text-xs font-bold font-heading transition-colors shrink-0 shadow-2xs border border-slate-200"
                      title="Reset room to default colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>

                  {/* Room Canvas Viewport */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <svg
                      viewBox="0 0 800 600"
                      className="w-full h-full object-cover transition-colors duration-500"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="wallLeftShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="wallRightShadow" x1="100%" y1="0%" x2="0%" y2="0%">
                          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="wallBackLighting" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="ceilingShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="softSunlight" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="warmLightGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#fef08a" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="marbleTableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f8fafc" />
                          <stop offset="50%" stopColor="#e2e8f0" />
                          <stop offset="100%" stopColor="#f8fafc" />
                        </linearGradient>
                        <linearGradient id="villaSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#38bdf8" />
                          <stop offset="60%" stopColor="#bae6fd" />
                          <stop offset="100%" stopColor="#f0f9ff" />
                        </linearGradient>
                      </defs>

                      {selectedScene.id === "exterior-villa" ? (
                        /* DEDICATED ARCHITECTURAL EXTERIOR VILLA SCENE */
                        <g id="exterior-villa-scene">
                          <rect x="0" y="0" width="800" height="600" fill="url(#villaSkyGrad)" />
                          <ellipse cx="180" cy="70" rx="90" ry="25" fill="#ffffff" opacity="0.4" filter="blur(3px)" />
                          <ellipse cx="640" cy="90" rx="120" ry="30" fill="#ffffff" opacity="0.35" filter="blur(4px)" />

                          <rect x="0" y="480" width="800" height="120" fill="#15803d" />
                          <polygon points="260,600 340,490 480,490 560,600" fill="#cbd5e1" />
                          <line x1="260" y1="600" x2="340" y2="490" stroke="#94a3b8" strokeWidth="2" />
                          <line x1="560" y1="600" x2="480" y2="490" stroke="#94a3b8" strokeWidth="2" />

                          {/* 1. Main Exterior Body Facade (Main Wall) */}
                          <g
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("mainWall")}
                          >
                            <rect x="130" y="105" width="290" height="375" fill={currentColors.mainWall} rx="2" />
                            <rect x="420" y="105" width="250" height="375" fill={currentColors.mainWall} rx="2" />
                          </g>

                          {/* 2. Accent Balcony Volume & Entrance Portal (Side Wall) */}
                          <g
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("sideWall")}
                          >
                            <rect x="360" y="105" width="300" height="165" fill={currentColors.sideWall} rx="4" />
                            <rect x="250" y="270" width="180" height="210" fill={currentColors.sideWall} rx="2" />
                          </g>

                          <rect x="100" y="105" width="580" height="15" fill="#000000" opacity="0.2" pointerEvents="none" />
                          <rect x="360" y="270" width="300" height="18" fill="#000000" opacity="0.25" pointerEvents="none" />

                          {/* 3. Roof Fascia, Pillars, Balcony Slab & Trim (Trim Wall) */}
                          <g
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("trimWall")}
                          >
                            <rect x="100" y="88" width="580" height="20" rx="3" fill={currentColors.trimWall} stroke="#d4d4d8" strokeWidth="1" />
                            <rect x="110" y="268" width="560" height="16" rx="2" fill={currentColors.trimWall} stroke="#d4d4d8" strokeWidth="1" />
                            <rect x="140" y="284" width="26" height="196" fill={currentColors.trimWall} stroke="#d4d4d8" strokeWidth="1" />
                            <rect x="110" y="478" width="560" height="16" fill={currentColors.trimWall} stroke="#d4d4d8" strokeWidth="1" />
                          </g>

                          {/* Windows & Door */}
                          <rect x="170" y="130" width="150" height="110" rx="3" fill="#0284c7" opacity="0.75" stroke="#1e293b" strokeWidth="5" />
                          <line x1="245" y1="130" x2="245" y2="240" stroke="#1e293b" strokeWidth="3" />
                          <line x1="170" y1="185" x2="320" y2="185" stroke="#1e293b" strokeWidth="3" />
                          <polygon points="175,135 240,135 175,200" fill="#ffffff" opacity="0.2" pointerEvents="none" />

                          <rect x="400" y="125" width="230" height="120" rx="3" fill="#0284c7" opacity="0.8" stroke="#1e293b" strokeWidth="6" />
                          <line x1="475" y1="125" x2="475" y2="245" stroke="#1e293b" strokeWidth="4" />
                          <line x1="550" y1="125" x2="550" y2="245" stroke="#1e293b" strokeWidth="4" />
                          <polygon points="405,130 500,130 405,225" fill="#ffffff" opacity="0.2" pointerEvents="none" />

                          <rect x="360" y="220" width="300" height="50" fill="#38bdf8" opacity="0.35" stroke="#94a3b8" strokeWidth="2" />
                          <line x1="360" y1="220" x2="660" y2="220" stroke="#e2e8f0" strokeWidth="4" />

                          <rect x="460" y="305" width="180" height="150" rx="3" fill="#0284c7" opacity="0.8" stroke="#1e293b" strokeWidth="6" />
                          <line x1="550" y1="305" x2="550" y2="455" stroke="#1e293b" strokeWidth="4" />
                          <polygon points="465,310 540,310 465,385" fill="#ffffff" opacity="0.2" pointerEvents="none" />

                          <rect x="290" y="315" width="105" height="163" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="5" />
                          <line x1="310" y1="318" x2="310" y2="475" stroke="#451a03" strokeWidth="2" />
                          <line x1="330" y1="318" x2="330" y2="475" stroke="#451a03" strokeWidth="2" />
                          <line x1="350" y1="318" x2="350" y2="475" stroke="#451a03" strokeWidth="2" />
                          <line x1="370" y1="318" x2="370" y2="475" stroke="#451a03" strokeWidth="2" />
                          <rect x="300" y="375" width="6" height="50" rx="3" fill="#f8fafc" />

                          <rect x="270" y="360" width="8" height="24" rx="2" fill="#18181b" />
                          <polygon points="266,355 282,355 292,340 256,340" fill="#fef08a" opacity="0.3" pointerEvents="none" />
                          <polygon points="266,388 282,388 292,405 256,405" fill="#fef08a" opacity="0.3" pointerEvents="none" />

                          <rect x="90" y="450" width="60" height="35" rx="3" fill="#334155" />
                          <path d="M 120 450 Q 100 400 90 410 Q 120 440 120 450 Z" fill="#16a34a" />
                          <path d="M 120 450 Q 120 390 120 450 Z" fill="#15803d" />
                          <path d="M 120 450 Q 140 400 150 410 Q 120 440 120 450 Z" fill="#22c55e" />

                          <ellipse cx="710" cy="360" rx="22" ry="110" fill="#14532d" />
                          <ellipse cx="740" cy="380" rx="18" ry="90" fill="#15803d" />
                        </g>
                      ) : (
                        /* HIGH-END ARCHITECTURAL INTERIOR SCENES */
                        <g id="interior-scenes">
                          {/* 1. Ceiling & Coving (Trim Wall) */}
                          <polygon
                            points="0,0 800,0 640,110 160,110"
                            fill={currentColors.trimWall}
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("trimWall")}
                          />
                          <polygon points="0,0 800,0 640,110 160,110" fill="url(#ceilingShadow)" pointerEvents="none" />
                          <polyline points="150,110 650,110" stroke="#fef08a" strokeWidth="4" opacity="0.4" filter="blur(2px)" />

                          {/* 2. Side Ambient Walls (Left Wall & Right Wall) */}
                          <polygon
                            points="0,0 160,110 160,470 0,600"
                            fill={currentColors.sideWall}
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("sideWall")}
                          />
                          <polygon points="0,0 160,110 160,470 0,600" fill="url(#wallLeftShadow)" pointerEvents="none" />

                          <polygon
                            points="800,0 640,110 640,470 800,600"
                            fill={currentColors.sideWall}
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("sideWall")}
                          />
                          <polygon points="800,0 640,110 640,470 800,600" fill="url(#wallRightShadow)" pointerEvents="none" />

                          <polygon points="25,50 135,125 135,460 25,560" fill="#bae6fd" opacity="0.85" />
                          <polygon points="25,50 135,125 135,460 25,560" stroke="#1e293b" strokeWidth="4" fill="none" />
                          <line x1="80" y1="87" x2="80" y2="510" stroke="#1e293b" strokeWidth="3" />
                          <line x1="25" y1="305" x2="135" y2="292" stroke="#1e293b" strokeWidth="3" />
                          <polygon points="125,120 155,120 155,470 125,470" fill="#ffffff" opacity="0.75" />
                          <polygon points="10,40 35,40 35,570 10,570" fill="#ffffff" opacity="0.75" />

                          {/* 3. Main Feature Wall (Back Wall) */}
                          <polygon
                            points="160,110 640,110 640,470 160,470"
                            fill={currentColors.mainWall}
                            className="cursor-pointer hover:opacity-95 transition-all duration-500"
                            onClick={() => setActiveSurface("mainWall")}
                          />
                          <polygon points="160,110 640,110 640,470 160,470" fill="url(#wallBackLighting)" pointerEvents="none" />

                          <line x1="160" y1="110" x2="160" y2="470" stroke="#000000" strokeWidth="2" opacity="0.25" />
                          <line x1="640" y1="110" x2="640" y2="470" stroke="#000000" strokeWidth="2" opacity="0.25" />
                          <line x1="160" y1="110" x2="640" y2="110" stroke="#000000" strokeWidth="2" opacity="0.15" />

                          {/* 4. Luxury Floor Base */}
                          <polygon points="0,600 160,470 640,470 800,600" fill="#71717a" opacity="0.9" />
                          <line x1="160" y1="468" x2="640" y2="468" stroke="#ffffff" strokeWidth="7" opacity="0.9" />

                          {/* 5. Custom Decor */}
                          {selectedScene.id === "living-room" && (
                            <g id="living-room-decor">
                              <rect x="175" y="130" width="70" height="325" fill="#78350f" opacity="0.85" rx="3" />
                              {[185, 195, 205, 215, 225, 235].map((x) => (
                                <line key={x} x1={x} y1="130" x2={x} y2="455" stroke="#451a03" strokeWidth="2" />
                              ))}

                              <rect x="555" y="130" width="70" height="325" fill="#78350f" opacity="0.85" rx="3" />
                              {[565, 575, 585, 595, 605, 615].map((x) => (
                                <line key={x} x1={x} y1="130" x2={x} y2="455" stroke="#451a03" strokeWidth="2" />
                              ))}

                              <rect x="270" y="145" width="260" height="150" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="4" />
                              <rect x="280" y="155" width="240" height="130" rx="2" fill="#0f172a" />
                              <circle cx="360" cy="220" r="35" fill="#f36c21" opacity="0.9" />
                              <path d="M 330 250 Q 400 170 470 240" stroke="#38bdf8" strokeWidth="6" fill="none" />
                              <line x1="320" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="2" opacity="0.5" />
                              <rect x="360" y="138" width="80" height="5" rx="2" fill="#eab308" />

                              <rect x="270" y="325" width="260" height="40" rx="4" fill="#18181b" />
                              <rect x="275" y="330" width="250" height="30" rx="2" fill="#27272a" />

                              <ellipse cx="400" cy="495" rx="220" ry="65" fill="#f1f5f9" opacity="0.9" />
                              <ellipse cx="400" cy="495" rx="205" ry="55" stroke="#cbd5e1" strokeWidth="2" fill="none" />

                              <rect x="245" y="375" width="310" height="105" rx="24" fill="#18181b" />
                              <rect x="220" y="415" width="45" height="65" rx="14" fill="#27272a" />
                              <rect x="535" y="415" width="45" height="65" rx="14" fill="#27272a" />
                              <rect x="265" y="390" width="130" height="75" rx="12" fill="#3f3f46" />
                              <rect x="405" y="390" width="130" height="75" rx="12" fill="#3f3f46" />
                              
                              <rect x="275" y="385" width="45" height="45" rx="10" fill="#f36c21" />
                              <rect x="480" y="385" width="45" height="45" rx="10" fill="#8e003b" />

                              <ellipse cx="370" cy="485" rx="45" ry="20" fill="url(#marbleTableGrad)" stroke="#cbd5e1" strokeWidth="2" />
                              <ellipse cx="430" cy="495" rx="35" ry="16" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                              <rect x="365" y="470" width="10" height="15" rx="3" fill="#0284c7" />

                              <path d="M 120 480 Q 90 200 170 210" stroke="#eab308" strokeWidth="3" fill="none" />
                              <path d="M 155 210 L 185 210 L 195 230 L 145 230 Z" fill="#eab308" />
                              <circle cx="170" cy="225" r="25" fill="#fef08a" opacity="0.3" filter="blur(4px)" />

                              <rect x="670" y="445" width="50" height="55" rx="6" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                              <ellipse cx="695" cy="405" rx="24" ry="45" fill="#14532d" />
                              <ellipse cx="675" cy="375" rx="18" ry="35" fill="#15803d" />
                              <ellipse cx="715" cy="380" rx="20" ry="38" fill="#16a34a" />
                            </g>
                          )}

                          {selectedScene.id === "bedroom" && (
                            <g id="bedroom-decor">
                              <rect x="210" y="160" width="380" height="230" rx="10" fill="#27272a" />
                              <rect x="225" y="175" width="350" height="200" rx="8" fill="#3f3f46" />
                              {[255, 285, 315, 345, 375, 405, 435, 465, 495, 525].map((x) => (
                                <line key={x} x1={x} y1="175" x2={x} y2="375" stroke="#27272a" strokeWidth="2" />
                              ))}
                              <line x1="210" y1="160" x2="590" y2="160" stroke="#fef08a" strokeWidth="4" opacity="0.6" filter="blur(2px)" />

                              <rect x="340" y="125" width="120" height="40" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                              <circle cx="400" cy="145" r="14" fill="#f36c21" opacity="0.8" />

                              <polygon points="170,540 230,440 570,440 630,540" fill="#e2e8f0" opacity="0.9" />

                              <rect x="230" y="375" width="340" height="120" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                              <rect x="230" y="420" width="340" height="75" rx="10" fill="#e2e8f0" />
                              <rect x="230" y="460" width="340" height="35" rx="6" fill="#5c249c" opacity="0.85" />
                              
                              <rect x="255" y="340" width="105" height="45" rx="10" fill="#ffffff" stroke="#d4d4d8" strokeWidth="2" />
                              <rect x="440" y="340" width="105" height="45" rx="10" fill="#ffffff" stroke="#d4d4d8" strokeWidth="2" />
                              <rect x="275" y="355" width="65" height="30" rx="6" fill="#f36c21" />
                              <rect x="460" y="355" width="65" height="30" rx="6" fill="#f36c21" />

                              <rect x="140" y="405" width="65" height="50" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                              <rect x="595" y="405" width="65" height="50" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />

                              <line x1="172" y1="110" x2="172" y2="350" stroke="#eab308" strokeWidth="2" />
                              <circle cx="172" cy="360" r="14" fill="#fbbf24" opacity="0.9" />
                              <circle cx="172" cy="360" r="28" fill="#fef08a" opacity="0.3" filter="blur(4px)" />

                              <line x1="627" y1="110" x2="627" y2="350" stroke="#eab308" strokeWidth="2" />
                              <circle cx="627" cy="360" r="14" fill="#fbbf24" opacity="0.9" />
                              <circle cx="627" cy="360" r="28" fill="#fef08a" opacity="0.3" filter="blur(4px)" />
                            </g>
                          )}

                          {selectedScene.id === "dining-room" && (
                            <g id="dining-decor">
                              <path d="M 280 400 L 280 190 Q 400 120 520 190 L 520 400 Z" fill="#ffffff" opacity="0.2" />
                              <path d="M 280 400 L 280 190 Q 400 120 520 190 L 520 400 Z" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.6" />

                              <rect x="250" y="320" width="300" height="40" rx="6" fill="#18181b" stroke="#27272a" strokeWidth="2" />
                              <ellipse cx="320" cy="305" rx="10" ry="15" fill="#f36c21" />
                              <ellipse cx="345" cy="300" rx="8" ry="20" fill="#0284c7" />
                              <ellipse cx="475" cy="305" rx="12" ry="14" fill="#e2e8f0" />

                              <line x1="400" y1="110" x2="400" y2="230" stroke="#eab308" strokeWidth="3" />
                              <line x1="350" y1="230" x2="450" y2="230" stroke="#eab308" strokeWidth="2" />
                              <circle cx="350" cy="245" r="16" fill="#fbbf24" />
                              <circle cx="350" cy="245" r="30" fill="#fef08a" opacity="0.3" filter="blur(4px)" />
                              <circle cx="400" cy="255" r="18" fill="#fbbf24" />
                              <circle cx="400" cy="255" r="34" fill="#fef08a" opacity="0.3" filter="blur(4px)" />
                              <circle cx="450" cy="245" r="16" fill="#fbbf24" />
                              <circle cx="450" cy="245" r="30" fill="#fef08a" opacity="0.3" filter="blur(4px)" />

                              <rect x="280" y="340" width="45" height="85" rx="10" fill="#3f3f46" />
                              <rect x="475" y="340" width="45" height="85" rx="10" fill="#3f3f46" />

                              <ellipse cx="400" cy="430" rx="165" ry="40" fill="url(#marbleTableGrad)" stroke="#cbd5e1" strokeWidth="3" />
                              <path d="M 370 440 L 360 520 L 440 520 L 430 440 Z" fill="#18181b" />

                              <ellipse cx="400" cy="425" rx="20" ry="8" fill="#15803d" />
                              <circle cx="400" cy="420" r="6" fill="#f36c21" />
                              <ellipse cx="340" cy="425" rx="4" ry="8" fill="#38bdf8" opacity="0.6" />
                              <ellipse cx="460" cy="425" rx="4" ry="8" fill="#38bdf8" opacity="0.6" />

                              <rect x="240" y="380" width="50" height="95" rx="12" fill="#18181b" />
                              <rect x="510" y="380" width="50" height="95" rx="12" fill="#18181b" />
                            </g>
                          )}
                        </g>
                      )}
                    </svg>

                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-1.5 pointer-events-none">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                      <span>Click any wall to paint it</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Paint Selected Indicator Card (Below Image Canvas) */}
              <div className="mt-4 bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl border border-slate-300 shadow-xs shrink-0"
                    style={{ backgroundColor: currentShadeDetails.hex }}
                  />
                  <div>
                    <span className="text-[10px] font-heading font-extrabold uppercase text-[#5c249c] tracking-wider block">
                      {isUploadMode ? "Active Paint Color" : `Painting ${selectedScene.surfaces[activeSurface].name}`}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 block font-heading">
                      {currentShadeDetails.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Code: {currentShadeDetails.code} &bull; {currentShadeDetails.productMatch}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(`${currentShadeDetails.name} (${currentShadeDetails.code})`)}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs text-slate-800 transition-all text-xs font-bold font-heading shrink-0 flex items-center gap-1.5"
                  title="Copy Shade Name & Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
            </div>

            {/* Current Room Color Scheme Summary Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-extrabold uppercase text-[#5c249c] font-heading tracking-wide">
                  Ready to Paint?
                </span>
                <h4 className="text-base font-bold text-slate-900 font-heading">
                  Take these shade codes to your nearest Snowcem dealer.
                </h4>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/find-dealer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-extrabold font-heading rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Dealer</span>
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-heading rounded-xl transition-all"
                >
                  <span>Book Painter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Snowcem Shade Palette & Search Tray (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 md:p-9 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Palette Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  Snowcem Colour Palette
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any shade to apply {isUploadMode ? "to your paint brush" : `to ${selectedScene.surfaces[activeSurface].name}`}
                </p>
              </div>

              {/* Custom Color Picker Input */}
              <div className="flex items-center gap-2 shrink-0" title="Pick Any Custom Color">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    applyColor(e.target.value);
                  }}
                  className="w-9 h-9 rounded-xl cursor-pointer border border-slate-300 p-0.5 shadow-2xs hover:scale-105 transition-transform"
                />
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search shades by name, code or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5c249c] shadow-inner"
              />
            </div>

            {/* Category Filter Pills (All / Interior / Exterior / Luxury / Heritage) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(["All", "Interior", "Exterior", "Luxury", "Heritage"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryTab(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold font-heading whitespace-nowrap transition-all ${
                    activeCategoryTab === cat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Color Family Pills (Neutrals / Blues / Greens / Reds / Yellows / Purples) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {(["All", "Neutrals", "Blues", "Greens", "Reds", "Yellows", "Purples"] as const).map((fam) => (
                <button
                  key={fam}
                  onClick={() => setActiveFamilyTab(fam)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                    activeFamilyTab === fam
                      ? "bg-purple-100 text-[#5c249c] font-bold border border-purple-200"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>

            {/* Shade Swatches Grid */}
            <div className="p-1 sm:p-2 grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto pr-2 rounded-2xl bg-slate-50/60 border border-slate-100">
              {filteredShades.map((shade) => {
                const isApplied = currentShadeDetails.hex.toLowerCase() === shade.hex.toLowerCase();
                return (
                  <button
                    key={shade.id}
                    onClick={() => applyColor(shade.hex)}
                    className={`group/swatch relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isApplied
                        ? "border-[#5c249c] ring-2 ring-[#5c249c]/20 bg-purple-50/40 shadow-sm scale-[1.02]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {/* Color Swatch Circle Stage */}
                    <div
                      className="w-full h-14 rounded-xl border border-black/10 shadow-inner flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover/swatch:scale-105"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isApplied && (
                        <div className="w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#5c249c] shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Shade Info Text */}
                    <div className="pt-2.5 space-y-0.5">
                      <span className="text-xs font-bold text-slate-900 block font-heading truncate">
                        {shade.name}
                      </span>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-mono">{shade.code}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold truncate max-w-[70px]">
                          {shade.category}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Palette Footer Link to Shade Card */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Viewing {filteredShades.length} curated Snowcem shades
              </span>
              <Link
                href="/color-catalogue"
                className="text-[#5c249c] font-bold font-heading hover:underline inline-flex items-center gap-1"
              >
                <span>Full Shade Card</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
