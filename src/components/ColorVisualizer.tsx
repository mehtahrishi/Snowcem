"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import NextImage from "next/image";
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
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
  X,
  HelpCircle,
  Check,
  Paintbrush,
  Eye,
  EyeOff,
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

interface SampleRoomPhoto {
  id: string;
  name: string;
  src: string;
  fallbackSrc?: string;
}

export interface RoomWallTarget {
  id: string;
  name: string;
  xPct: number; // Horizontal position % across image
  yPct: number; // Vertical position % across image
}

export const SAMPLE_ROOM_WALLS: Record<string, RoomWallTarget[]> = {
  "sample-living": [
    { id: "main", name: "Main Wall", xPct: 50, yPct: 35 },
    { id: "left", name: "Left Wall", xPct: 18, yPct: 44 },
    { id: "right", name: "Right Wall", xPct: 82, yPct: 40 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-bed": [
    { id: "headboard", name: "Headboard Wall", xPct: 50, yPct: 36 },
    { id: "side", name: "Side Wall", xPct: 18, yPct: 42 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-dining": [
    { id: "feature", name: "Feature Wall", xPct: 50, yPct: 34 },
    { id: "alcove", name: "Dining Alcove", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-kitchen": [
    { id: "back", name: "Backsplash Wall", xPct: 50, yPct: 32 },
    { id: "side", name: "Side Wall", xPct: 18, yPct: 42 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 12 },
  ],
  "sample-study": [
    { id: "desk", name: "Desk Wall", xPct: 46, yPct: 36 },
    { id: "bookshelf", name: "Bookshelf Wall", xPct: 82, yPct: 40 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-pooja": [
    { id: "mandir", name: "Mandir Backdrop", xPct: 50, yPct: 34 },
    { id: "side", name: "Sanctum Wall", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-washroom": [
    { id: "vanity", name: "Vanity Wall", xPct: 50, yPct: 34 },
    { id: "shower", name: "Shower Wall", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-ext": [
    { id: "facade", name: "Main Facade", xPct: 46, yPct: 38 },
    { id: "upper", name: "Upper Story", xPct: 76, yPct: 30 },
  ],
  "upload": [
    { id: "left", name: "Left Wall", xPct: 22, yPct: 44 },
    { id: "main", name: "Center Wall", xPct: 50, yPct: 38 },
    { id: "right", name: "Right Wall", xPct: 78, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 15 },
  ],
};

const SAMPLE_ROOM_PHOTOS: SampleRoomPhoto[] = [
  {
    id: "sample-living",
    name: "Living Room",
    src: "/visualizer/sample-living-room.png",
    fallbackSrc: "/experience/hall.png",
  },
  {
    id: "sample-bed",
    name: "Bedroom",
    src: "/visualizer/sample-bedroom.png",
    fallbackSrc: "/experience/bedroom.png",
  },
  {
    id: "sample-dining",
    name: "Dining Area",
    src: "/visualizer/sample-diningarea.png",
    fallbackSrc: "/experience/diningarea.png",
  },
  {
    id: "sample-kitchen",
    name: "Kitchen",
    src: "/visualizer/sample-kitchen.png",
    fallbackSrc: "/experience/kitchen.png",
  },
  {
    id: "sample-study",
    name: "Study Room",
    src: "/visualizer/sample-studyroom.png",
    fallbackSrc: "/experience/study.png",
  },
  {
    id: "sample-pooja",
    name: "Pooja Room",
    src: "/visualizer/sample-poojaroom.png",
    fallbackSrc: "/experience/pooja.png",
  },
  {
    id: "sample-washroom",
    name: "Washroom",
    src: "/visualizer/sample-washroom.png",
    fallbackSrc: "/experience/washroom.png",
  },
  {
    id: "sample-ext",
    name: "Exterior",
    src: "/visualizer/sample-exterior.png",
    fallbackSrc: "/tools/exterior.png",
  },
];

export default function ColorVisualizer() {
  // Genre / Category & Subcategory Filtering
  const [activeCategory, setActiveCategory] = useState<string>(CURATED_COLOR_CATEGORIES[0]);
  const [activeSubcategory, setActiveSubcategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [customHex, setCustomHex] = useState("#D7DAB4");
  const [selectedShade, setSelectedShade] = useState<CuratedColorShade>(CURATED_COLOR_SHADES[0]);

  // Photo Canvas States - Default to Upload option first
  const [uploadedPhotoSrc, setUploadedPhotoSrc] = useState<string | null>(null);
  const [userImageSrc, setUserImageSrc] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string>("upload");
  const [activeTool, setActiveTool] = useState<ToolMode>("smart-fill");
  const [tolerance, setTolerance] = useState<number>(24);
  const [isPainting, setIsPainting] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [showWallPills, setShowWallPills] = useState<boolean>(true);
  const [paintedWalls, setPaintedWalls] = useState<Record<string, { name: string; hex: string }>>({});

  // Reliable hardcoded room wall targets
  const currentRoomWalls = useMemo(() => {
    return SAMPLE_ROOM_WALLS[activeSampleId] || [];
  }, [activeSampleId]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const historyStackRef = useRef<ImageData[]>([]);
  const redoStackRef = useRef<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore uploaded photo and room state from sessionStorage on initial load
  useEffect(() => {
    try {
      const savedUpload = sessionStorage.getItem("snowcem_upload_photo");
      if (savedUpload) {
        setUploadedPhotoSrc(savedUpload);
        setUserImageSrc(savedUpload);
        setActiveSampleId("upload");
      }
    } catch {}
  }, []);

  // Canvas Image Loader for Real Room Photos (Preserves painted state on refresh)
  const loadUserImageToCanvas = useCallback(
    (src: string, fallbackSrc?: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const img = typeof window !== "undefined" ? new window.Image() : new Image();
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

        // Check if there is a saved painted session for this room/photo in sessionStorage!
        let savedCanvasUrl: string | null = null;
        let savedPaintedWalls: string | null = null;
        try {
          savedCanvasUrl = sessionStorage.getItem(`snowcem_canvas_${activeSampleId}`);
          savedPaintedWalls = sessionStorage.getItem(`snowcem_painted_walls_${activeSampleId}`);
        } catch {}

        if (savedCanvasUrl) {
          const savedImg = new Image();
          savedImg.onload = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(savedImg, 0, 0, w, h);
            const paintedData = ctx.getImageData(0, 0, w, h);
            historyStackRef.current = [initialData, paintedData];
            redoStackRef.current = [];
            if (savedPaintedWalls) {
              try {
                setPaintedWalls(JSON.parse(savedPaintedWalls));
              } catch {}
            }
          };
          savedImg.src = savedCanvasUrl;
        } else {
          historyStackRef.current = [initialData];
          redoStackRef.current = [];
        }
      };

      img.onerror = () => {
        if (fallbackSrc && img.src !== fallbackSrc) {
          img.src = fallbackSrc;
        }
      };

      img.src = src;
    },
    [activeSampleId]
  );

  useEffect(() => {
    if (userImageSrc) {
      const activeSample = SAMPLE_ROOM_PHOTOS.find((s) => s.id === activeSampleId);
      loadUserImageToCanvas(userImageSrc, activeSample?.fallbackSrc);
    }
  }, [userImageSrc, activeSampleId, loadUserImageToCanvas]);

  // Handle shade selection
  const handleShadeSelect = (shade: CuratedColorShade) => {
    setSelectedShade(shade);
    setCustomHex(shade.hex);
  };

  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const result = event.target.result;
        setUploadedPhotoSrc(result);
        setUserImageSrc(result);
        setActiveSampleId("upload");
        try {
          sessionStorage.setItem("snowcem_upload_photo", result);
        } catch {}
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processUploadedFile(file);
  };

  // Helper to persist canvas image and painted wall state across browser refreshes
  const persistCanvasState = useCallback((updatedWalls?: Record<string, { name: string; hex: string }>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      sessionStorage.setItem(`snowcem_canvas_${activeSampleId}`, canvas.toDataURL("image/png"));
      if (updatedWalls) {
        sessionStorage.setItem(`snowcem_painted_walls_${activeSampleId}`, JSON.stringify(updatedWalls));
      }
    } catch {}
  }, [activeSampleId]);

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
      persistCanvasState();
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
      persistCanvasState();
    }
  };

  // Reset button: Explicitly wipes sessionStorage for this room and restores clean baseline
  const handleResetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageDataRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.putImageData(originalImageDataRef.current, 0, 0);
    historyStackRef.current = [originalImageDataRef.current];
    redoStackRef.current = [];

    // Clear saved session data so refreshing starts fresh
    try {
      sessionStorage.removeItem(`snowcem_canvas_${activeSampleId}`);
      sessionStorage.removeItem(`snowcem_painted_walls_${activeSampleId}`);
    } catch {}

    setPaintedWalls((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`${activeSampleId}-`)) {
          delete next[key];
        }
      });
      return next;
    });
  };

  // Smart Fill: Always computes fill on ORIGINAL image so each wall stays isolated.
  // The result is composited onto the current canvas so other walls keep their colors.
  const performSmartFill = async (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    const initialData = originalImageDataRef.current;
    if (!canvas || !initialData) return;

    setIsPainting(true);

    // Build a data-URL from the original (clean) image for Python to work with.
    // This ensures flood-fill boundaries are always based on the real wall edges,
    // not on previously painted colors — so Wall 1 = blue, Wall 2 = red, etc.
    const getOriginalDataUrl = (): string => {
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const tmpCtx = tmp.getContext("2d");
      if (tmpCtx) tmpCtx.putImageData(initialData, 0, 0);
      return tmp.toDataURL("image/png");
    };

    try {
      const originalDataUrl = getOriginalDataUrl();
      const res = await fetch("/api/paint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_base64: originalDataUrl, // Always the clean original
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
          const pythonResultImg = new Image();
          pythonResultImg.onload = () => {
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            // Decode Python's painted result into a temporary canvas
            const tmpCanvas = document.createElement("canvas");
            tmpCanvas.width = canvas.width;
            tmpCanvas.height = canvas.height;
            const tmpCtx = tmpCanvas.getContext("2d", { willReadFrequently: true });
            if (!tmpCtx) return;
            tmpCtx.drawImage(pythonResultImg, 0, 0, canvas.width, canvas.height);
            const pythonPixels = tmpCtx.getImageData(0, 0, canvas.width, canvas.height);

            // Read what is currently on the canvas (all previously painted walls)
            const currentPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const origPixels = initialData;

            // Composite: only apply pixels that Python CHANGED from the original.
            // This preserves every other wall's color exactly as-is.
            const out = new ImageData(
              new Uint8ClampedArray(currentPixels.data),
              canvas.width,
              canvas.height
            );

            for (let i = 0; i < origPixels.data.length; i += 4) {
              const dr = Math.abs(pythonPixels.data[i]     - origPixels.data[i]);
              const dg = Math.abs(pythonPixels.data[i + 1] - origPixels.data[i + 1]);
              const db = Math.abs(pythonPixels.data[i + 2] - origPixels.data[i + 2]);
              // If this pixel was painted by Python (differs from original by >10)
              if (dr + dg + db > 30) {
                out.data[i]     = pythonPixels.data[i];
                out.data[i + 1] = pythonPixels.data[i + 1];
                out.data[i + 2] = pythonPixels.data[i + 2];
                out.data[i + 3] = pythonPixels.data[i + 3];
              }
              // Otherwise keep whatever the current canvas has (other walls unchanged)
            }

            ctx.putImageData(out, 0, 0);
            historyStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
            redoStackRef.current = [];
            setIsPainting(false);
            persistCanvasState();
          };
          pythonResultImg.src = data.image;
          return;
        }
      }
    } catch (err) {
      console.warn("Python backend error, using local fallback:", err);
    }

    // Client-side shader fallback — also uses originalImageData for the mask
    // so each wall is isolated correctly even without Python
    try {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const currentData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : initialData;

      const clickMask = createWallMaskFromClick(initialData, startX, startY, tolerance);
      const refined = refineMaskWithEdgeSnapping(clickMask, initialData, 2);

      const painted = renderPhotorealisticPaint({
        canvas,
        originalImageData: initialData,
        currentImageData: currentData,
        wallMask: refined,
        colorHex: customHex,
        opacity: 0.95,
        finish: "Smooth Satin",
      });

      if (painted) {
        historyStackRef.current.push(painted);
        redoStackRef.current = [];
        persistCanvasState();
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
    persistCanvasState();
  };

  // Instant wall fill when clicking a floating Wall Fill Pill button
  const handleFillWall = (wall: RoomWallTarget, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPainting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert percentage to actual canvas pixel coordinates
    const canvasX = Math.round((wall.xPct / 100) * canvas.width);
    const canvasY = Math.round((wall.yPct / 100) * canvas.height);

    // Apply smart photorealistic paint fill
    performSmartFill(canvasX, canvasY);

    // Track which shade this wall was painted with for visual checkmark & persist to sessionStorage
    setPaintedWalls((prev) => {
      const updated = {
        ...prev,
        [`${activeSampleId}-${wall.id}`]: {
          name: selectedShade.name,
          hex: customHex,
        },
      };
      persistCanvasState(updated);
      return updated;
    });
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

    // Create offscreen export canvas
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    // 1. Draw current painted canvas image
    exportCtx.drawImage(canvas, 0, 0);

    const triggerDownload = (targetCanvas: HTMLCanvasElement) => {
      const link = document.createElement("a");
      link.download = `Snowcem_${selectedShade.name.replace(/\s+/g, "_")}.png`;
      link.href = targetCanvas.toDataURL("image/png");
      link.click();
    };

    // 2. Load Snowcem brand logo for bottom-right placement
    const logoImg = typeof window !== "undefined" ? new window.Image() : new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      // Calculate responsive logo dimensions in bottom right corner
      const baseWidth = Math.max(120, Math.min(220, Math.round(exportCanvas.width * 0.16)));
      const naturalW = logoImg.naturalWidth || 160;
      const naturalH = logoImg.naturalHeight || 52;
      const aspectRatio = naturalH / naturalW;
      const logoWidth = baseWidth;
      const logoHeight = Math.round(logoWidth * aspectRatio);

      const margin = Math.max(16, Math.round(exportCanvas.width * 0.025));
      const badgePaddingX = Math.round(logoWidth * 0.1);
      const badgePaddingY = Math.round(logoHeight * 0.2);

      const logoX = exportCanvas.width - logoWidth - margin;
      const logoY = exportCanvas.height - logoHeight - margin;

      const badgeX = logoX - badgePaddingX;
      const badgeY = logoY - badgePaddingY;
      const badgeW = logoWidth + badgePaddingX * 2;
      const badgeH = logoHeight + badgePaddingY * 2;
      const radius = 10;

      // Draw subtle elevated white pill badge behind logo for crisp contrast on any wall shade
      exportCtx.save();
      exportCtx.shadowColor = "rgba(0, 0, 0, 0.25)";
      exportCtx.shadowBlur = 10;
      exportCtx.shadowOffsetX = 0;
      exportCtx.shadowOffsetY = 3;
      exportCtx.fillStyle = "rgba(255, 255, 255, 0.95)";

      if (typeof exportCtx.roundRect === "function") {
        exportCtx.beginPath();
        exportCtx.roundRect(badgeX, badgeY, badgeW, badgeH, radius);
        exportCtx.fill();
      } else {
        exportCtx.fillRect(badgeX, badgeY, badgeW, badgeH);
      }
      exportCtx.restore();

      // Draw brand logo in bottom right corner
      exportCtx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);

      // Trigger download
      triggerDownload(exportCanvas);
    };

    logoImg.onerror = () => {
      // Safe fallback if logo cannot be loaded
      triggerDownload(exportCanvas);
    };

    logoImg.src = "/image.png";
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
    <div className="w-full bg-canvas min-h-screen py-6 sm:py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          {/* Left Column: Visualizer Canvas Stage & Toolbar (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-lg space-y-4">

            {/* Clean Scene Switcher & Upload Header */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              {/* Room Pill Slider - Upload Photo is FIRST option */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1 bg-slate-100/80 rounded-2xl">
                {/* 1. UPLOAD PHOTO (FIRST OPTION & DEFAULT) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveSampleId("upload");
                    if (uploadedPhotoSrc) {
                      setUserImageSrc(uploadedPhotoSrc);
                    } else {
                      setIsGuideOpen(true);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${activeSampleId === "upload"
                      ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md shadow-[#5B6BB5]/25 scale-[1.02]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                    }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>

                {/* 2. SAMPLE ROOMS */}
                {SAMPLE_ROOM_PHOTOS.map((sample) => {
                  const isActive = activeSampleId === sample.id;
                  return (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => {
                        setActiveSampleId(sample.id);
                        setUserImageSrc(sample.src);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-semibold transition-all shrink-0 cursor-pointer ${isActive
                          ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-md shadow-[#5B6BB5]/25 scale-[1.02]"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                        }`}
                    >
                      {sample.name}
                    </button>
                  );
                })}
              </div>

              {/* Upload Room Action / Change Photo / Tips Button */}
              <div className="shrink-0 flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {activeSampleId === "upload" && uploadedPhotoSrc ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-heading font-bold border border-slate-200/90 hover:border-[#DF3F6F]/40 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#DF3F6F]" />
                    <span>Change Photo</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsGuideOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-heading font-bold border border-slate-200/90 hover:border-[#DF3F6F]/40 shadow-xs transition-all cursor-pointer active:scale-95"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Photo Tips</span>
                  </button>
                )}
              </div>
            </div>

            {/* Canvas Viewport (Clean, borderless, floating stage) */}
            <div className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] rounded-2xl overflow-hidden flex items-center justify-center bg-slate-900/[0.02]">
              {activeSampleId === "upload" && !uploadedPhotoSrc ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) processUploadedFile(file);
                  }}
                  className="w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex flex-col items-center justify-center p-6 sm:p-10 text-center space-y-4 border-2 border-dashed border-slate-200/90 rounded-2xl bg-gradient-to-b from-white/70 to-slate-50/70"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#5B6BB5]/15 to-[#DF3F6F]/15 border border-[#DF3F6F]/30 flex items-center justify-center text-[#DF3F6F] shadow-sm">
                    <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-[#DF3F6F]" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
                      Upload Your Room Photo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Upload a photo of your living room, bedroom, or exterior to test Snowcem paints and colours in real-time.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo to Upload</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsGuideOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-semibold text-xs border border-slate-200/90 shadow-2xs transition-all cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                      <span>Photo Tips &amp; Guidelines</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Supports JPG, PNG, WEBP (up to 10MB) • Or pick any sample room above
                  </p>
                </div>
              ) : (
                <div className="relative w-full max-w-full flex items-center justify-center">
                  <div className="relative inline-block w-full">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="w-full h-auto max-h-[600px] object-contain rounded-2xl cursor-crosshair select-none block transition-all"
                    />

                    {/* Interactive Wall Fill Pill Buttons (Hardcoded for each room) */}
                    {showWallPills && (activeSampleId !== "upload" || uploadedPhotoSrc) && currentRoomWalls.map((wall) => {
                      const wallKey = `${activeSampleId}-${wall.id}`;
                      const isPainted = Boolean(paintedWalls[wallKey]);
                      const wallState = paintedWalls[wallKey];

                      return (
                        <button
                          key={wall.id}
                          type="button"
                          onClick={(e) => handleFillWall(wall, e)}
                          className="group/pill absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-[0_4px_18px_rgba(0,0,0,0.22)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)] border-2 transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-md"
                          style={{
                            left: `${wall.xPct}%`,
                            top: `${wall.yPct}%`,
                            borderColor: isPainted ? wallState.hex : customHex,
                          }}
                          title={`Click to fill ${wall.name} with ${selectedShade.name}`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white/70 shadow-xs shrink-0"
                            style={{ backgroundColor: isPainted ? wallState.hex : customHex }}
                          />
                          <span className="text-[11px] sm:text-xs font-heading font-extrabold text-slate-900 whitespace-nowrap">
                            {wall.name}
                          </span>
                        </button>
                      );
                    })}

                    {/* Painting Indicator */}
                    {isPainting && (
                      <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-heading font-bold flex items-center gap-2 shadow-xl animate-pulse z-30 border border-white/10">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DF3F6F]" />
                        <span>Painting Wall...</span>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>


            {/* Toolbar Actions Under Canvas */}
            <div className={`flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 transition-opacity ${activeSampleId === "upload" && !uploadedPhotoSrc ? "opacity-50 pointer-events-none" : "opacity-100"
              }`}>
              {/* Tool Mode Buttons (Tap to Paint & Eraser) */}
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-2xs">
                <button
                  onClick={() => setActiveTool("smart-fill")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activeTool === "smart-fill"
                      ? "bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  title="Tap on wall to paint with selected colour"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Tap to Paint</span>
                </button>

                <button
                  onClick={() => setActiveTool("eraser")}
                  className={`px-3.5 py-2 rounded-lg text-xs font-heading font-bold flex items-center gap-1.5 transition-all cursor-pointer ${activeTool === "eraser"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  title="Erase paint from wall"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Eraser</span>
                </button>
              </div>

              {/* Undo / Redo / Reset / Save */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowWallPills(!showWallPills)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                    showWallPills
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200/70"
                  }`}
                  title={showWallPills ? "Hide wall pins" : "Show wall pins"}
                >
                  {showWallPills ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleUndo}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/70 transition-all cursor-pointer active:scale-95"
                  title="Undo last stroke"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRedo}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/70 transition-all cursor-pointer active:scale-95"
                  title="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetCanvas}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200/70 transition-all cursor-pointer active:scale-95"
                  title="Reset to original photo"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white text-xs sm:text-sm font-heading font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>

            {/* Disclaimer Just Below Tool & Image Area */}
            <div className="pt-1 text-center sm:text-left">
              <p className="text-[11px] sm:text-xs text-slate-500 italic leading-relaxed">
                * Color shade impression may vary as per the actual lighting combination. This is just for representation purposes.
              </p>
            </div>
          </div>

          {/* Right Column: Curated Palette Deck (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-lg space-y-4">

            {/* Active Shade Hero Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-12 h-12 rounded-xl border border-black/15 shadow-sm shrink-0"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-heading font-extrabold text-slate-900 truncate leading-tight">
                    {selectedShade.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {selectedShade.subcategory} • {selectedShade.recommendedSurface}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#5B6BB5] bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs shrink-0">
                {selectedShade.id}
              </span>
            </div>

            {/* 1. Category / Room Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-slate-400">
                Select Room or Style
              </label>
              <div className="relative">
                <select
                  value={activeCategory}
                  onChange={(e) => {
                    setActiveCategory(e.target.value);
                    setActiveSubcategory("All");
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-heading font-bold text-slate-800 focus:outline-none focus:border-[#5B6BB5] focus:bg-white transition-all cursor-pointer"
                >
                  {CURATED_COLOR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Subcategory Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {subcategories.map((sub) => {
                const isSubActive = activeSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-heading font-semibold transition-all shrink-0 cursor-pointer ${isSubActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                      }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            {/* 3. Search Shade */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search colour or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5B6BB5] focus:bg-white transition-all"
              />
            </div>

            {/* 4. Curated Shade Swatch Cards Grid */}
            <div className="grid grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto p-1.5 rounded-2xl bg-slate-50/60 border border-slate-100">
              {filteredShades.slice(0, 150).map((shade) => {
                const isSelected = selectedShade?.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    onClick={() => handleShadeSelect(shade)}
                    className={`group relative flex flex-col rounded-xl text-left overflow-hidden transition-all duration-200 cursor-pointer ${isSelected
                        ? "ring-2 ring-[#DF3F6F] shadow-md shadow-[#DF3F6F]/20 scale-[1.03] bg-white"
                        : "border border-slate-200/90 hover:border-slate-300 hover:shadow-xs bg-white hover:-translate-y-0.5"
                      }`}
                    title={`${shade.name} (${shade.id})`}
                  >
                    {/* Swatch Block */}
                    <div
                      className="w-full h-12 relative flex items-start justify-end p-1 transition-transform group-hover:scale-[1.02]"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isSelected && (
                        <span className="w-3.5 h-3.5 rounded-full bg-white text-[#DF3F6F] flex items-center justify-center shadow-md text-[9px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="p-1.5 bg-white space-y-0.5">
                      <h4 className="text-[10px] font-heading font-bold text-slate-900 truncate leading-tight">
                        {shade.name}
                      </h4>
                      <div className="text-[9px] text-slate-400 font-mono font-medium">
                        {shade.id}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Steps Links */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-heading">
              <Link
                href="/paint-calculator"
                className="font-bold text-[#5B6BB5] hover:text-[#DF3F6F] flex items-center gap-1 transition-colors"
              >
                <span>Paint Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/color-catalogue"
                className="font-bold text-slate-700 hover:text-[#DF3F6F] flex items-center gap-1 transition-colors"
              >
                <span>Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Photo Upload Guidelines Modal (Do's & Don'ts for Photorealistic Colour Experience) */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-guide-title"
          >
            {/* Top Brand Accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] shrink-0" />

            {/* Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-[#DF3F6F] text-[10px] font-heading font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Best Visualizer Results</span>
                </span>
                <h3 id="upload-guide-title" className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 leading-snug">
                  Photo Upload Guidelines
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Follow these simple tips to get the most accurate and clear wall paint visualization on your room.
                </p>
              </div>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Do's and Don'ts visual banner + side-by-side cards */}
            <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
              {/* Visual Reference Comparison Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs bg-slate-100">
                <NextImage
                  src="/visualizer/image.png"
                  alt="Visual comparison guide: Well-lit room (Do) vs dark/dim room (Don't)"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto object-cover select-none pointer-events-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* DO'S CARD */}
                <div className="rounded-2xl p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-heading font-bold text-sm">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>Do&apos;s for Clear Results</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                      <span><strong>Bright Natural Daylight:</strong> Shoot during the day with open curtains or even room lights.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                      <span><strong>Clear, Visible Walls:</strong> Ensure broad sections of the wall are clearly in view.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                      <span><strong>Straight-On Angle:</strong> Stand 6–10 feet back and capture the room at natural eye level.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
                      <span><strong>Sharp, In-Focus Photos:</strong> Use high-resolution, unblurred photos taken directly from your camera.</span>
                    </li>
                  </ul>
                </div>

                {/* DONT'S CARD */}
                <div className="rounded-2xl p-4 sm:p-5 bg-rose-50/70 border border-rose-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-heading font-bold text-sm">
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <span>Don&apos;ts to Avoid</span>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>No Dark or Dim Rooms:</strong> Dark rooms hide wall corners and result in distorted paint colors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>No Direct Flash / Heavy Glare:</strong> Avoid shooting straight into harsh flashlight spots or glare.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>Don&apos;t Hide the Wall:</strong> Avoid angles where cupboards or clutter cover most of the wall surface.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold mt-0.5 shrink-0">✕</span>
                      <span><strong>No Blurry or Low-Res Images:</strong> Avoid small thumbnails, compressed screenshots, or shaky photos.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Supported formats: JPG, PNG, WEBP (Up to 10MB)
              </span>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsGuideOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-heading font-semibold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsGuideOpen(false);
                    fileInputRef.current?.click();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5B6BB5] to-[#DF3F6F] hover:opacity-95 text-white font-heading font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-white" />
                  <span>Choose Photo to Upload</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
