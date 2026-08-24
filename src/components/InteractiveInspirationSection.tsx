"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Sun,
  Sunset,
  Moon,
  CloudRain,
  Copy,
  Check,
  Eye,
  Layers,
  ArrowRight,
  Palette,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Sliders,
  CheckCircle2,
  Maximize2
} from "lucide-react";

type LightingMode = "daylight" | "sunset" | "evening" | "monsoon";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  role: string;
  shadeName: string;
  shadeHex: string;
  productName: string;
  productSlug: string;
  categorySlug: string;
  finish: string;
}

interface PaletteColor {
  name: string;
  hex: string;
  role: string;
}

interface SpaceTheme {
  id: string;
  name: string;
  tagline: string;
  category: "Interior" | "Exterior";
  image: string;
  description: string;
  hotspots: Hotspot[];
  palette: PaletteColor[];
}

const SPACES_DATA: SpaceTheme[] = [
  {
    id: "living-room",
    name: "Contemporary Royal Living",
    tagline: "Velvet Depth & Warm Earth Tones",
    category: "Interior",
    image: "/products/interior-bg/zenita-velvet-finish.png",
    description:
      "A grand living space styled with rich jewel tones and warm earthen accents, designed with Zenita Velvet Finish for unmatched durability and luxury tactile feel.",
    hotspots: [
      {
        id: "hs-living-1",
        x: 38,
        y: 42,
        title: "Main Accent Wall",
        role: "Primary Feature",
        shadeName: "Royal Heritage Navy",
        shadeHex: "#2a1b92",
        productName: "Zenita Velvet Finish",
        productSlug: "zenita-velvet-finish",
        categorySlug: "interior-emulsion-paints",
        finish: "Silky Velvet Matt",
      },
      {
        id: "hs-living-2",
        x: 68,
        y: 48,
        title: "Warm Alcove & Framing",
        role: "Complementary Tone",
        shadeName: "Snowcem Sunset Ochre",
        shadeHex: "#f36c21",
        productName: "Sentino Luxury Emulsion",
        productSlug: "sentino",
        categorySlug: "interior-emulsion-paints",
        finish: "Soft Satin Sheen",
      },
      {
        id: "hs-living-3",
        x: 50,
        y: 18,
        title: "Ceiling & Cornice",
        role: "Light Reflector",
        shadeName: "Warm Ivory Pearl",
        shadeHex: "#fef9ee",
        productName: "Snowpearl Lustre",
        productSlug: "snowpearl",
        categorySlug: "interior-emulsion-paints",
        finish: "Semi-Gloss Lustre",
      },
    ],
    palette: [
      { name: "Royal Heritage Navy", hex: "#2a1b92", role: "Primary Wall" },
      { name: "Snowcem Sunset Ochre", hex: "#f36c21", role: "Accent Wall" },
      { name: "Velvet Magenta", hex: "#e91e63", role: "Decor Accents" },
      { name: "Warm Ivory Pearl", hex: "#fef9ee", role: "Ceiling / Trims" },
    ],
  },
  {
    id: "master-bedroom",
    name: "Sanctuary Master Bedroom",
    tagline: "Calming Pastels & Silken Sheen",
    category: "Interior",
    image: "/products/interior-bg/celeste.png",
    description:
      "A restful sanctuary combining soothing lavender-mauve with crisp chalk trims, coated with Celeste Luxury Sheen for stain resistance and ambient light diffusion.",
    hotspots: [
      {
        id: "hs-bed-1",
        x: 45,
        y: 40,
        title: "Headboard Master Wall",
        role: "Restful Horizon",
        shadeName: "Mystic Royale Lilac",
        shadeHex: "#5c249c",
        productName: "Celeste Luxury Emulsion",
        productSlug: "celeste",
        categorySlug: "interior-emulsion-paints",
        finish: "Silky Smooth Lustre",
      },
      {
        id: "hs-bed-2",
        x: 75,
        y: 35,
        title: "Window Bay & Panelling",
        role: "Ambient Softener",
        shadeName: "Petal Dawn Rose",
        shadeHex: "#e91e63",
        productName: "Celeste Luxury Emulsion",
        productSlug: "celeste",
        categorySlug: "interior-emulsion-paints",
        finish: "Silky Smooth Lustre",
      },
      {
        id: "hs-bed-3",
        x: 25,
        y: 20,
        title: "Ceiling Crown Moulding",
        role: "Spaciousness",
        shadeName: "Whisper White",
        shadeHex: "#f8fafc",
        productName: "Snowcoat Anti-Fungal",
        productSlug: "snowcoat",
        categorySlug: "interior-emulsion-paints",
        finish: "Smooth Matt",
      },
    ],
    palette: [
      { name: "Mystic Royale Lilac", hex: "#5c249c", role: "Primary Wall" },
      { name: "Petal Dawn Rose", hex: "#e91e63", role: "Feature Trim" },
      { name: "Lavender Fog", hex: "#ddd6fe", role: "Secondary Wall" },
      { name: "Whisper White", hex: "#f8fafc", role: "Ceiling" },
    ],
  },
  {
    id: "exterior-villa",
    name: "Heritage Weatherproof Villa",
    tagline: "60+ Years Weather Protection & Texture",
    category: "Exterior",
    image: "/products/exterior-bg/sandtex-matt.jpg",
    description:
      "Timeless exterior architecture shielded by Sandtex Matt and Uni-glosss, engineered to withstand torrential monsoon rains, harsh UV rays, and algae formation for decades.",
    hotspots: [
      {
        id: "hs-ext-1",
        x: 42,
        y: 38,
        title: "Main Exterior Facade",
        role: "Heavy Weather Shield",
        shadeName: "Sandstone Ochre Gold",
        shadeHex: "#d97706",
        productName: "Sandtex Matt Heavy Duty",
        productSlug: "sandtex-matt",
        categorySlug: "exterior-emulsion-paints",
        finish: "High-Build Textured Matt",
      },
      {
        id: "hs-ext-2",
        x: 78,
        y: 30,
        title: "Architectural Pillars & Cornice",
        role: "Anti-Fungal High-Gloss",
        shadeName: "Pristine Snow White",
        shadeHex: "#ffffff",
        productName: "Uni-glosss Premium",
        productSlug: "unigloss-15",
        categorySlug: "exterior-emulsion-paints",
        finish: "High Glass Polymeric",
      },
      {
        id: "hs-ext-3",
        x: 22,
        y: 72,
        title: "Plinth & Boundary Base",
        role: "Water Repellent Coat",
        shadeName: "Basalt Charcoal",
        shadeHex: "#334155",
        productName: "Snowcryl Shine 100% Acrylic",
        productSlug: "snowcryl-shine",
        categorySlug: "exterior-emulsion-paints",
        finish: "Elastomeric Satin",
      },
    ],
    palette: [
      { name: "Sandstone Ochre Gold", hex: "#d97706", role: "Main Facade" },
      { name: "Pristine Snow White", hex: "#ffffff", role: "Pillars & Trims" },
      { name: "Basalt Charcoal", hex: "#334155", role: "Base Plinth" },
      { name: "Earthy Terracotta", hex: "#9a3412", role: "Roof & Accents" },
    ],
  },
  {
    id: "dining-kitchen",
    name: "Vibrant Culinary & Dining",
    tagline: "Stain-Proof Easy-Wash Elegance",
    category: "Interior",
    image: "/visualizer/sample-dining.png",
    description:
      "A high-energy entertaining and dining space coated with Sentino Easy2Wash, formulated for scrubbable performance, stain repulsion, and bright light bouncing.",
    hotspots: [
      {
        id: "hs-dining-1",
        x: 52,
        y: 44,
        title: "Dining Focal Wall",
        role: "Energy & Warmth",
        shadeName: "Marigold Sunburst",
        shadeHex: "#eab308",
        productName: "Sentino Easy2Wash",
        productSlug: "sentino-easy2wash",
        categorySlug: "interior-emulsion-paints",
        finish: "Scrubbable Satin Sheen",
      },
      {
        id: "hs-dining-2",
        x: 22,
        y: 50,
        title: "Breakfast Nook Partition",
        role: "Warm Accent",
        shadeName: "Burnt Ochre Spice",
        shadeHex: "#c2410c",
        productName: "Zenita Luxury Emulsion",
        productSlug: "zenita",
        categorySlug: "interior-emulsion-paints",
        finish: "Velvet Matt",
      },
      {
        id: "hs-dining-3",
        x: 50,
        y: 16,
        title: "Ceiling & Trim",
        role: "Brightener",
        shadeName: "Porcelain Cream",
        shadeHex: "#fffbeb",
        productName: "Snowcoat Anti-Fungal",
        productSlug: "snowcoat",
        categorySlug: "interior-emulsion-paints",
        finish: "Smooth Matt",
      },
    ],
    palette: [
      { name: "Marigold Sunburst", hex: "#eab308", role: "Focal Wall" },
      { name: "Burnt Ochre Spice", hex: "#c2410c", role: "Accent Nook" },
      { name: "Porcelain Cream", hex: "#fffbeb", role: "Ceiling" },
      { name: "Slate Timber Grey", hex: "#475569", role: "Trims & Doors" },
    ],
  },
];

export default function InteractiveInspirationSection() {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);
  const [lightingMode, setLightingMode] = useState<LightingMode>("daylight");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(
    SPACES_DATA[0].hotspots[0]
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTabMode, setActiveTabMode] = useState<"spaces" | "videoReels">("spaces");

  // Video reels state
  const [activeVideoId, setActiveVideoId] = useState("/inspiration/video1.mp4");
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSpace = SPACES_DATA[selectedSpaceIndex];

  // Dynamic overlay filters for lighting simulation
  const getLightingOverlayStyle = () => {
    switch (lightingMode) {
      case "sunset":
        return "bg-gradient-to-tr from-amber-500/25 via-orange-500/15 to-purple-900/25 mix-blend-multiply";
      case "evening":
        return "bg-gradient-to-b from-indigo-950/40 via-purple-950/30 to-amber-900/20 mix-blend-multiply";
      case "monsoon":
        return "bg-gradient-to-br from-slate-800/30 via-cyan-950/20 to-slate-900/25 mix-blend-multiply backdrop-saturate-85";
      case "daylight":
      default:
        return "bg-transparent";
    }
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div 
        className="absolute top-10 left-1/4 w-96 h-96 bg-[#2a1b92]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#e91e63]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-extrabold uppercase tracking-wider shadow-xs mb-3 font-heading">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Space &amp; Color Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-heading">
              Experience Paint In <span className="bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] bg-clip-text text-transparent">Living Spaces</span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Don&apos;t just browse swatch cards. Test dynamic daylight transitions, tap architectural wall hotspots to reveal formulation recipes, and curate your coordinated home palette in real-time.
            </p>
          </div>

          {/* Mode Switcher (Spaces vs Video Transformation Reels) */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-2xs self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTabMode("spaces")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all duration-200 flex items-center gap-1.5 ${
                activeTabMode === "spaces"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#2a1b92]" />
              <span>Interactive Spaces</span>
            </button>
            <button
              onClick={() => setActiveTabMode("videoReels")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-heading transition-all duration-200 flex items-center gap-1.5 ${
                activeTabMode === "videoReels"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Play className="w-3.5 h-3.5 text-[#e91e63]" />
              <span>Transformation Reels</span>
            </button>
          </div>
        </div>

        {activeTabMode === "spaces" ? (
          <div>
            {/* Spaces Selector Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
              {SPACES_DATA.map((space, idx) => (
                <button
                  key={space.id}
                  onClick={() => {
                    setSelectedSpaceIndex(idx);
                    setActiveHotspot(space.hotspots[0]);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold font-heading whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                    selectedSpaceIndex === idx
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                      : "bg-white text-slate-600 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    selectedSpaceIndex === idx ? "bg-snowcem-orange animate-pulse" : "bg-slate-300"
                  }`} />
                  <span>{space.name}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Studio Arena Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Canvas: Live Interactive Room with Lighting + Hotspot Pulsers */}
              <div className="lg:col-span-8 space-y-4">
                
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-900 group">
                  
                  {/* Background Space Image */}
                  <Image
                    src={currentSpace.image}
                    alt={currentSpace.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
                    priority
                  />

                  {/* Dynamic Lighting Simulation Overlay */}
                  <div 
                    className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${getLightingOverlayStyle()}`} 
                  />

                  {/* Interactive Glowing Wall Hotspots */}
                  {currentSpace.hotspots.map((hs) => {
                    const isSelected = activeHotspot?.id === hs.id;
                    return (
                      <button
                        key={hs.id}
                        onClick={() => setActiveHotspot(hs)}
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/hotspot focus:outline-hidden"
                        aria-label={`Inspect ${hs.title} shade`}
                      >
                        {/* Outer Pulse Ring */}
                        <div className={`absolute -inset-2.5 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? "bg-white/40 scale-125 animate-ping opacity-60" 
                            : "bg-white/20 group-hover/hotspot:scale-125"
                        }`} />

                        {/* Inner Pin Button */}
                        <div className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md border-2 shadow-xl flex items-center justify-center transition-transform duration-300 ${
                          isSelected
                            ? "bg-white border-white scale-110 shadow-2xl"
                            : "bg-slate-900/80 border-white/80 group-hover/hotspot:scale-110"
                        }`}>
                          <div 
                            className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                            style={{ backgroundColor: hs.shadeHex }}
                          />
                        </div>

                        {/* Hover Tooltip Tag */}
                        <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 opacity-0 group-hover/hotspot:opacity-100 sm:block hidden whitespace-nowrap z-30`}>
                          <div className="bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-lg border border-white/10">
                            {hs.title} ({hs.shadeName})
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {/* Top Bar Floating Badge: Current Space Category & Title */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-extrabold text-[11px] uppercase tracking-wider border border-white/20">
                      {currentSpace.category} Space
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-slate-900 font-bold text-[11px] shadow-sm hidden sm:inline-block">
                      {currentSpace.tagline}
                    </span>
                  </div>

                  {/* Interactive Daylight & Atmosphere Dial (Floating Bottom Right) */}
                  <div className="absolute bottom-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl shadow-xl flex items-center gap-1">
                    <button
                      onClick={() => setLightingMode("daylight")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        lightingMode === "daylight"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-300 hover:text-white"
                      }`}
                      title="Simulate 12:00 PM Natural Daylight"
                    >
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden sm:inline">Daylight</span>
                    </button>
                    <button
                      onClick={() => setLightingMode("sunset")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        lightingMode === "sunset"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-300 hover:text-white"
                      }`}
                      title="Simulate Golden Hour Warm Sunset"
                    >
                      <Sunset className="w-3.5 h-3.5 text-orange-500" />
                      <span className="hidden sm:inline">Golden Hour</span>
                    </button>
                    <button
                      onClick={() => setLightingMode("evening")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        lightingMode === "evening"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-300 hover:text-white"
                      }`}
                      title="Simulate Cozy Evening Luxe Lighting"
                    >
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden sm:inline">Evening</span>
                    </button>
                    <button
                      onClick={() => setLightingMode("monsoon")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        lightingMode === "monsoon"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-300 hover:text-white"
                      }`}
                      title="Simulate Monsoon Weatherproof Protection"
                    >
                      <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline">Monsoon</span>
                    </button>
                  </div>
                </div>

                {/* Coordinated Color Palette Strip Below Canvas */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-heading">
                      Coordinated Space Palette
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 font-heading">
                      Click any swatch to copy code or inspect
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                    {currentSpace.palette.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleCopy(color.hex)}
                        className="group flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 transition-all text-left shadow-2xs"
                        title={`Copy ${color.name} (${color.hex})`}
                      >
                        <div
                          className="w-5 h-5 rounded-lg border border-slate-300/80 shadow-inner shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {color.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 font-medium">
                            {color.hex} &bull; {color.role}
                          </div>
                        </div>
                        <div className="ml-1 text-slate-400 group-hover:text-slate-700 transition-colors">
                          {copiedHex === color.hex ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Active Wall Inspector Card & Formula Specs */}
              <div className="lg:col-span-4 space-y-5">
                {activeHotspot ? (
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
                    {/* Top Accent Strip */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-2" 
                      style={{ backgroundColor: activeHotspot.shadeHex }} 
                    />

                    <div>
                      {/* Badge Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5c249c] bg-purple-50 border border-purple-200 px-3 py-1 rounded-full inline-flex items-center gap-1 font-heading">
                          <Eye className="w-3 h-3" />
                          {activeHotspot.role}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 font-mono">
                          {activeHotspot.shadeHex}
                        </span>
                      </div>

                      {/* Hotspot Title & Shade Details */}
                      <h3 className="text-2xl font-black text-slate-900 font-heading tracking-tight">
                        {activeHotspot.title}
                      </h3>
                      
                      <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-2xl border border-slate-300 shadow-md shrink-0 flex items-center justify-center"
                          style={{ backgroundColor: activeHotspot.shadeHex }}
                        >
                          <div className="w-4 h-4 rounded-full bg-white/40 backdrop-blur-xs" />
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">
                            Selected Shade
                          </div>
                          <div className="text-base font-black text-slate-900 font-heading">
                            {activeHotspot.shadeName}
                          </div>
                          <button
                            onClick={() => handleCopy(activeHotspot.shadeHex)}
                            className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#2a1b92] hover:text-[#e91e63] transition-colors"
                          >
                            {copiedHex === activeHotspot.shadeHex ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied Hex!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Code: {activeHotspot.shadeHex}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Formulation & Product Specs */}
                      <div className="mt-5 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                          Recommended Snowcem Product
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-black font-heading text-white">
                              {activeHotspot.productName}
                            </span>
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                              {activeHotspot.finish}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-light">
                            High-solid emulsion with superior scrubbability and anti-fungal barrier formulation.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <Link
                        href={`/products/${activeHotspot.categorySlug}/${activeHotspot.productSlug}`}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#2a1b92] via-[#5c249c] to-[#e91e63] text-white text-xs font-extrabold font-heading text-center shadow-md hover:shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Product Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/color-visualizer"
                          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-heading text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <Compass className="w-3 h-3 text-[#2a1b92]" />
                          <span>3D Visualizer</span>
                        </Link>
                        <Link
                          href="/paint-calculator"
                          className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-heading text-center transition-colors flex items-center justify-center gap-1"
                        >
                          <Sliders className="w-3 h-3 text-[#e91e63]" />
                          <span>Estimate Cost</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          /* Video Transformation Reels Mode */
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Video Player Container */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 group">
                  <video
                    ref={videoRef}
                    src={activeVideoId}
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Play / Mute Floating Overlay Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
                    <button
                      onClick={toggleVideoPlay}
                      className="px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-black/80 transition-all shadow-md"
                    >
                      {isVideoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause Reel</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Reel</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={toggleVideoMute}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-black/80 transition-all shadow-md"
                      title={isVideoMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-4 h-4 text-slate-300" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Selection & Brand Note */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-snowcem-orange bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full inline-block font-heading mb-3">
                    Behind Every Brush Stroke
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-white leading-snug">
                    Watch Real Room &amp; Villa Transformations
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm font-light leading-relaxed">
                    Witness the craftsmanship, rich pigment dispersion, and weatherproofing power of Snowcem Paints captured in ultra-crisp transformation cinematography.
                  </p>
                </div>

                {/* Reel Playlist Switches */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setActiveVideoId("/inspiration/video1.mp4");
                      setIsVideoPlaying(true);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      activeVideoId === "/inspiration/video1.mp4"
                        ? "bg-white/10 border-snowcem-orange shadow-lg"
                        : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2a1b92] to-[#e91e63] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-heading text-white">
                        Reel 01: Modern Heritage Living Room
                      </div>
                      <div className="text-xs text-slate-400">
                        Featuring Zenita Velvet Finish &bull; Luxury Interior
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveVideoId("/inspiration/video2.mp4");
                      setIsVideoPlaying(true);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                      activeVideoId === "/inspiration/video2.mp4"
                        ? "bg-white/10 border-snowcem-orange shadow-lg"
                        : "bg-white/5 border-white/10 hover:bg-white/8"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-[#f36c21] flex items-center justify-center text-white shrink-0 shadow-md">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-heading text-white">
                        Reel 02: Weatherproof Villa Facade
                      </div>
                      <div className="text-xs text-slate-400">
                        Featuring Sandtex Matt &bull; Heavy-Duty Exterior
                      </div>
                    </div>
                  </button>
                </div>

                <div className="pt-2">
                  <Link
                    href="/color-catalogue"
                    className="inline-flex items-center gap-2 text-xs font-bold text-snowcem-orange hover:text-white transition-colors"
                  >
                    <span>Browse complete 500+ shade catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
