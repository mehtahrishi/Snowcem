/**
 * Snowcem Paint Budget Calculator Master Data & Calculation Engine
 * Extracted directly from:
 * - "Paint Budget Calculator Working.xlsx" (Working Ext, Working Int, Combo Ext, Combo Int)
 * - "paint budget calculator understanding.docx"
 */

export type PaintCategory = "interior" | "exterior";
export type ProductTier = "Luxury" | "Premium" | "Economy";
export type ApplicationStepType = "PRIMER" | "WALL PUTTY" | "FINAL LAYER" | "BASECOAT";

export interface MasterProduct {
  id: string;
  name: string;
  group: ProductTier | "Specialty";
  category: "Ext" | "Int" | "WP" | "PRI" | "PUTTY" | "DIST";
  unit: "Ltr" | "Kg";
  mrp: number;
  dpl: number;
  pack: number;
  costPerUnit: number;
  coverage: number; // sq.ft per Ltr or Kg for 1 coat spread
  defaultCoats: number;
  labourRate: number; // INR per sq.ft
  image: string;
  tagline: string;
  warranty?: string;
  finish?: string;
}

export interface ComboStepConfig {
  stepNumber: number;
  type: ApplicationStepType;
  productId: string;
  coats: number;
}

export interface PredefinedCombination {
  id: string;
  name: string;
  group: ProductTier;
  category: PaintCategory;
  topcoatId: string;
  tagline: string;
  description: string;
  warranty?: string;
  finish?: string;
  steps: ComboStepConfig[];
}

export interface CalculatedStep {
  stepNumber: number;
  stepTitle: string; // e.g. "STEP 01"
  badge: string; // e.g. "1 COAT • PRIMER"
  type: ApplicationStepType;
  productId: string;
  productName: string;
  productImage: string;
  productLink?: string;
  coats: number;
  coverage: number;
  costPerUnit: number;
  materialRequired: number; // rounded to 1-2 decimals
  unit: "Ltr" | "Kg";
  materialCost: number;
  labourRate: number;
  labourCost: number;
  stepTotalCost: number;
  packRecommendation: string;
}

export interface CalculatedSolution {
  id: string;
  name: string;
  group: ProductTier;
  category: PaintCategory;
  mainImage: string;
  productLink?: string;
  tagline: string;
  description: string;
  warranty?: string;
  finish?: string;
  userArea: number;
  multiplier: number;
  totalPaintingArea: number;
  totalMaterialCost: number;
  totalLabourCost: number;
  totalEstimatedCost: number;
  costPerSqFtML: number;
  steps: CalculatedStep[];
}

export interface PaintCalculationResult {
  userArea: number;
  category: PaintCategory;
  multiplier: number;
  totalPaintingArea: number;
  solutions: CalculatedSolution[];
}

// =========================================================================
// 1. MASTER PRODUCTS CATALOG
// =========================================================================

export const MASTER_PRODUCTS: Record<string, MasterProduct> = {
  // --- EXTERIOR TOPCOATS ---
  "uni-glosss-18": {
    id: "uni-glosss-18",
    name: "UNI-GLOSSS-18",
    group: "Luxury",
    category: "Ext",
    unit: "Ltr",
    mrp: 21694,
    dpl: 12052,
    pack: 20,
    costPerUnit: 1084.7,
    coverage: 180,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/unigloss-18.png",
    tagline: "Ultra-luxury exterior gloss emulsion with 18-year weather defense",
    warranty: "18 Years",
    finish: "High Gloss",
  },
  "uni-glosss-15": {
    id: "uni-glosss-15",
    name: "UNI-GLOSSS-15",
    group: "Luxury",
    category: "Ext",
    unit: "Ltr",
    mrp: 19836,
    dpl: 11020,
    pack: 20,
    costPerUnit: 991.8,
    coverage: 170,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/unigloss-15.png",
    tagline: "Solar reflective luxury exterior emulsion with 15-year weather shield",
    warranty: "15 Years",
    finish: "High Gloss",
  },
  "uni-glosss-11": {
    id: "uni-glosss-11",
    name: "UNI-GLOSSS-11",
    group: "Luxury",
    category: "Ext",
    unit: "Ltr",
    mrp: 17820,
    dpl: 9900,
    pack: 20,
    costPerUnit: 891.0,
    coverage: 160,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/unigloss-11.png",
    tagline: "Advanced solar reflective exterior system with 11-year durability",
    warranty: "11 Years",
    finish: "Rich Gloss",
  },
  "uni-glosss-10": {
    id: "uni-glosss-10",
    name: "UNI-GLOSSS-10",
    group: "Luxury",
    category: "Ext",
    unit: "Ltr",
    mrp: 15624,
    dpl: 8680,
    pack: 20,
    costPerUnit: 781.2,
    coverage: 160,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/unigloss.png",
    tagline: "Multi-surface luxury exterior protection with 10-year assurance",
    warranty: "10 Years",
    finish: "Rich Gloss",
  },
  "pentasia-5in1": {
    id: "pentasia-5in1",
    name: "Pentasia 5 in 1 Exterior Emulsion",
    group: "Luxury",
    category: "Ext",
    unit: "Ltr",
    mrp: 15048,
    dpl: 8360,
    pack: 20,
    costPerUnit: 752.4,
    coverage: 140,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/pentasia.png",
    tagline: "5-in-1 all-weather elastomeric exterior silicone emulsion",
    warranty: "8 Years",
    finish: "Smooth Sheen",
  },
  "pentasia-universal": {
    id: "pentasia-universal",
    name: "Pentasia Universal",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 12654,
    dpl: 7030,
    pack: 20,
    costPerUnit: 632.7,
    coverage: 180,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/pentasia-universal.png",
    tagline: "High-durability exterior weather-shield emulsion",
    warranty: "7 Years",
    finish: "Soft Sheen",
  },
  "pentasia-dust-guard": {
    id: "pentasia-dust-guard",
    name: "Pentasia Dust Guard",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 10980,
    dpl: 6100,
    pack: 20,
    costPerUnit: 549.0,
    coverage: 115,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/pentasia.png",
    tagline: "Advanced anti-dust pick up exterior protective finish",
    warranty: "6 Years",
    finish: "Matt Finish",
  },
  "sandtex-matt": {
    id: "sandtex-matt",
    name: "Sandtex Matt",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 9918,
    dpl: 5510,
    pack: 20,
    costPerUnit: 495.9,
    coverage: 95,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/sandtex-matt.png",
    tagline: "India's legendary heavy-bodied textured exterior acrylic finish",
    warranty: "5 Years",
    finish: "Textured Matt",
  },
  "snowcryl-weatherprotek-shine": {
    id: "snowcryl-weatherprotek-shine",
    name: "Snowcryl Weatherprotek shine",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 10890,
    dpl: 6050,
    pack: 20,
    costPerUnit: 544.5,
    coverage: 115,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/snowcryl-shine.png",
    tagline: "Anti-fungal exterior acrylic emulsion with subtle gloss sheen",
    warranty: "5 Years",
    finish: "Shine Sheen",
  },
  "snowcryl-shine": {
    id: "snowcryl-shine",
    name: "Snowcryl Shine",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 10494,
    dpl: 5830,
    pack: 20,
    costPerUnit: 524.7,
    coverage: 130,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/snowcryl-shine.png",
    tagline: "Bright exterior sheen emulsion with rain and UV resistance",
    warranty: "5 Years",
    finish: "Shine",
  },
  "snowcryl": {
    id: "snowcryl",
    name: "Snowcryl",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 9702,
    dpl: 5390,
    pack: 20,
    costPerUnit: 485.1,
    coverage: 140,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/snowcryl-low.png",
    tagline: "Pure 100% acrylic exterior emulsion with proven longevity",
    warranty: "5 Years",
    finish: "Smooth Matt",
  },
  "trump": {
    id: "trump",
    name: "Trump",
    group: "Economy",
    category: "Ext",
    unit: "Ltr",
    mrp: 7524,
    dpl: 4180,
    pack: 20,
    costPerUnit: 376.2,
    coverage: 130,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/trump.png",
    tagline: "Economical acrylic exterior emulsion with vibrant wall finish",
    warranty: "3 Years",
    finish: "Matt",
  },
  "splus-shine": {
    id: "splus-shine",
    name: "S.Plus Shine",
    group: "Economy",
    category: "Ext",
    unit: "Ltr",
    mrp: 6570,
    dpl: 3650,
    pack: 20,
    costPerUnit: 328.5,
    coverage: 120,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/snowcem-plus-shine.png",
    tagline: "Value exterior emulsion with brilliant radiant shine",
    warranty: "3 Years",
    finish: "Shine",
  },
  "splus": {
    id: "splus",
    name: "S.Plus",
    group: "Economy",
    category: "Ext",
    unit: "Ltr",
    mrp: 6030,
    dpl: 3350,
    pack: 20,
    costPerUnit: 301.5,
    coverage: 120,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/snowcem-plus.png",
    tagline: "Budget-friendly exterior wall emulsion for clean bright facades",
    warranty: "3 Years",
    finish: "Matt",
  },
  "outweather": {
    id: "outweather",
    name: "Outweather",
    group: "Economy",
    category: "Ext",
    unit: "Ltr",
    mrp: 4374,
    dpl: 2430,
    pack: 20,
    costPerUnit: 218.7,
    coverage: 120,
    defaultCoats: 2,
    labourRate: 6,
    image: "/products/exterior/outweather-exterior.png",
    tagline: "Economical exterior protective emulsion against tropical elements",
    warranty: "2 Years",
    finish: "Matt",
  },
  "sandtex-floor-coat": {
    id: "sandtex-floor-coat",
    name: "Sandtex Matt floor coat Emulsion",
    group: "Premium",
    category: "Ext",
    unit: "Ltr",
    mrp: 3094,
    dpl: 1719,
    pack: 4,
    costPerUnit: 773.5,
    coverage: 55,
    defaultCoats: 3,
    labourRate: 6,
    image: "/products/exterior/sandtex-floor-coat.png",
    tagline: "Heavy-duty exterior floor coat emulsion for tiles, driveways & walkways",
    warranty: "5 Years",
    finish: "Matt Floor Finish",
  },

  // --- EXTERIOR / DUAL PRIMERS & WATERPROOFING ---
  "snowcare-damp-proof-10yr": {
    id: "snowcare-damp-proof-10yr",
    name: "Snowcare Damp Proof 10 YR",
    group: "Premium",
    category: "WP",
    unit: "Ltr",
    mrp: 10403,
    dpl: 5265,
    pack: 20,
    costPerUnit: 520.15,
    coverage: 35,
    defaultCoats: 1,
    labourRate: 2,
    image: "/products/waterproof/snowcare-damp-proof.png",
    tagline: "High elastomeric waterproofing base barrier with 10-year damp protection",
  },
  "snowcare-sealer-primer": {
    id: "snowcare-sealer-primer",
    name: "Snowcare Sealer & Primer",
    group: "Luxury",
    category: "PRI",
    unit: "Ltr",
    mrp: 6300,
    dpl: 3500,
    pack: 20,
    costPerUnit: 315.0,
    coverage: 110,
    defaultCoats: 1,
    labourRate: 2,
    image: "/products/primers/snowcem-sealerandprimer.png",
    tagline: "Deep-penetrating acrylic sealer primer for alkaline & porous walls",
  },
  "splus-duo-primer": {
    id: "splus-duo-primer",
    name: "S.Plus Duo Primer",
    group: "Premium",
    category: "PRI",
    unit: "Ltr",
    mrp: 4162,
    dpl: 2280,
    pack: 20,
    costPerUnit: 208.1,
    coverage: 110,
    defaultCoats: 1,
    labourRate: 2,
    image: "/products/primers/snowcem-plus-duo.png",
    tagline: "Dual-action exterior & interior base primer with high opacity",
  },
  "outweather-xpert-primer": {
    id: "outweather-xpert-primer",
    name: "Outweather Xpert Primer",
    group: "Economy",
    category: "PRI",
    unit: "Ltr",
    mrp: 3822,
    dpl: 1860,
    pack: 20,
    costPerUnit: 191.1,
    coverage: 130,
    defaultCoats: 1,
    labourRate: 2,
    image: "/products/primers/snowcem-ext-int-primer.png",
    tagline: "Reliable exterior undercoat primer for enhanced topcoat adhesion",
  },

  // --- INTERIOR TOPCOATS ---
  "zenita-velvet-finish": {
    id: "zenita-velvet-finish",
    name: "Zenita Velvet finish",
    group: "Luxury",
    category: "Int",
    unit: "Ltr",
    mrp: 21292,
    dpl: 11829,
    pack: 20,
    costPerUnit: 1064.6,
    coverage: 280,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/zenita-velvet-finish.png",
    tagline: "Ultra-luxury velvet finish interior emulsion with Teflon stain barrier",
    warranty: "8 Years",
    finish: "Velvet Sheen",
  },
  "zenita-int-emulsion": {
    id: "zenita-int-emulsion",
    name: "Zenita Int Emulsion",
    group: "Luxury",
    category: "Int",
    unit: "Ltr",
    mrp: 19098,
    dpl: 10610,
    pack: 20,
    costPerUnit: 954.9,
    coverage: 280,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/zenita.png",
    tagline: "Luxury interior smooth sheen emulsion with antimicrobial defense",
    warranty: "8 Years",
    finish: "Smooth Sheen",
  },
  "celeste": {
    id: "celeste",
    name: "Celeste",
    group: "Luxury",
    category: "Int",
    unit: "Ltr",
    mrp: 16956,
    dpl: 9420,
    pack: 20,
    costPerUnit: 847.8,
    coverage: 210,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/celeste.png",
    tagline: "Royal interior emulsion with rich eggshell luster & scrub resistance",
    warranty: "7 Years",
    finish: "Rich Eggshell",
  },
  "sentino-easy-2-wash": {
    id: "sentino-easy-2-wash",
    name: "Sentino Easy 2 Wash",
    group: "Premium",
    category: "Int",
    unit: "Ltr",
    mrp: 13689,
    dpl: 7605,
    pack: 20,
    costPerUnit: 684.45,
    coverage: 260,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/sentino-easy2wash.png",
    tagline: "100% washable stain-resistant premium acrylic interior emulsion",
    warranty: "5 Years",
    finish: "Soft Sheen",
  },
  "sentino-int-emulsion": {
    id: "sentino-int-emulsion",
    name: "Sentino Int Emulsion",
    group: "Premium",
    category: "Int",
    unit: "Ltr",
    mrp: 10512,
    dpl: 5840,
    pack: 20,
    costPerUnit: 525.6,
    coverage: 250,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/sentino.png",
    tagline: "Rich smooth matte interior emulsion with uniform wall spread",
    warranty: "5 Years",
    finish: "Smooth Matt",
  },
  "snowpearl-shine": {
    id: "snowpearl-shine",
    name: "Snowpearl Shine",
    group: "Economy",
    category: "Int",
    unit: "Ltr",
    mrp: 6246,
    dpl: 3470,
    pack: 20,
    costPerUnit: 312.3,
    coverage: 260,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/snowpearl.png",
    tagline: "Lustrous bright interior emulsion for vibrant cost-effective walls",
    warranty: "3 Years",
    finish: "Shine",
  },
  "snowpearl": {
    id: "snowpearl",
    name: "Snowpearl",
    group: "Economy",
    category: "Int",
    unit: "Ltr",
    mrp: 5274,
    dpl: 2930,
    pack: 20,
    costPerUnit: 263.7,
    coverage: 260,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/snowpearl.png",
    tagline: "Everyday interior wall emulsion with clean white brightness",
    warranty: "3 Years",
    finish: "Matt",
  },
  "snowcoat": {
    id: "snowcoat",
    name: "Snowcoat",
    group: "Economy",
    category: "Int",
    unit: "Ltr",
    mrp: 3726,
    dpl: 2070,
    pack: 20,
    costPerUnit: 186.3,
    coverage: 190,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/snowcoat.png",
    tagline: "Durable interior wall paint with breathable formulation",
    warranty: "2 Years",
    finish: "Matt",
  },
  "snowcoat-pro": {
    id: "snowcoat-pro",
    name: "Snowcoat PRO",
    group: "Economy",
    category: "Int",
    unit: "Ltr",
    mrp: 3289,
    dpl: 1827,
    pack: 20,
    costPerUnit: 164.45,
    coverage: 190,
    defaultCoats: 2,
    labourRate: 8,
    image: "/products/interior/snowcoat.png",
    tagline: "Professional economy interior paint for residential & rental repaints",
    warranty: "2 Years",
    finish: "Matt",
  },

  // --- INTERIOR PRIMERS & BASECOATS ---
  "snowcare-damp-protect-dual-int": {
    id: "snowcare-damp-protect-dual-int",
    name: "Snowcare Damp Protect Dual (Interior Basecoat)",
    group: "Premium",
    category: "WP",
    unit: "Ltr",
    mrp: 6786,
    dpl: 3770,
    pack: 20,
    costPerUnit: 339.3,
    coverage: 195,
    defaultCoats: 2,
    labourRate: 4,
    image: "/products/waterproof/snowcare-damp-protect-dual.png",
    tagline: "Dual damp-protective interior waterproofing primer barrier",
  },
  "universal-primer": {
    id: "universal-primer",
    name: "Universal Primer",
    group: "Premium",
    category: "PRI",
    unit: "Ltr",
    mrp: 4788,
    dpl: 2660,
    pack: 20,
    costPerUnit: 239.4,
    coverage: 110,
    defaultCoats: 2,
    labourRate: 2,
    image: "/products/primers/universal-primer.png",
    tagline: "All-surface interior acrylic primer with superior adhesion",
  },
  "outweather-ext-int-primer": {
    id: "outweather-ext-int-primer",
    name: "Outweather Ext Int Primer",
    group: "Economy",
    category: "PRI",
    unit: "Ltr",
    mrp: 3690,
    dpl: 2050,
    pack: 20,
    costPerUnit: 184.5,
    coverage: 130,
    defaultCoats: 2,
    labourRate: 2,
    image: "/products/primers/snowcem-ext-int-primer.png",
    tagline: "Multi-utility interior/exterior wall priming emulsion",
  },
  "outweather-prof-primer": {
    id: "outweather-prof-primer",
    name: "Outweather Prof Primer",
    group: "Economy",
    category: "PRI",
    unit: "Ltr",
    mrp: 3168,
    dpl: 1760,
    pack: 20,
    costPerUnit: 158.4,
    coverage: 130,
    defaultCoats: 2,
    labourRate: 2,
    image: "/products/primers/snowcem-ext-int-primer.png",
    tagline: "Economical professional interior primer undercoat",
  },

  // --- WALL PUTTIES ---
  "snowcem-acrylic-putty": {
    id: "snowcem-acrylic-putty",
    name: "Snowcem Acrylic Putty",
    group: "Luxury",
    category: "PUTTY",
    unit: "Kg",
    mrp: 2052,
    dpl: 1140,
    pack: 20,
    costPerUnit: 102.6,
    coverage: 41,
    defaultCoats: 2,
    labourRate: 4,
    image: "/products/putty/acrylicputty.png",
    tagline: "Butter-smooth ready-to-use acrylic paste putty for mirror-flat walls",
  },
  "snowcare-wall-putty": {
    id: "snowcare-wall-putty",
    name: "Snowcare Wall Putty",
    group: "Premium",
    category: "PUTTY",
    unit: "Kg",
    mrp: 1613,
    dpl: 896,
    pack: 40,
    costPerUnit: 40.325,
    coverage: 24,
    defaultCoats: 2,
    labourRate: 4,
    image: "/products/putty/wallputty.png",
    tagline: "White cement polymer-fortified water-resistant wall putty",
  },
};

// =========================================================================
// 2. PREDEFINED COMBINATIONS MASTER (COMBO EXT & COMBO INT)
// =========================================================================

export const PREDEFINED_COMBINATIONS: PredefinedCombination[] = [
  // -----------------------------------------------------------------------
  // EXTERIOR COMBINATIONS (16 PREDEFINED SOLUTIONS)
  // -----------------------------------------------------------------------
  {
    id: "ext-unigloss-18",
    name: "UNI-GLOSSS-18 System",
    group: "Luxury",
    category: "exterior",
    topcoatId: "uni-glosss-18",
    tagline: "Ultra-luxury exterior gloss system with 10-year damp proof primer barrier",
    description: "The pinnacle of exterior durability. Combines an elastomeric damp-proof basecoat with solar-reflective nano-gloss topcoats for 18 years of facade protection.",
    warranty: "18 Years",
    finish: "High Gloss",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-damp-proof-10yr", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "uni-glosss-18", coats: 2 },
    ],
  },
  {
    id: "ext-unigloss-15",
    name: "UNI-GLOSSS-15 System",
    group: "Luxury",
    category: "exterior",
    topcoatId: "uni-glosss-15",
    tagline: "High-gloss exterior weather shield system with damp proof base",
    description: "Formulated for extreme weather, high UV index, and torrential rain, backed by a 15-year performance life.",
    warranty: "15 Years",
    finish: "High Gloss",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-damp-proof-10yr", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "uni-glosss-15", coats: 2 },
    ],
  },
  {
    id: "ext-unigloss-11",
    name: "UNI-GLOSSS-11 System",
    group: "Luxury",
    category: "exterior",
    topcoatId: "uni-glosss-11",
    tagline: "Solar reflective luxury exterior emulsion with 11-year protection",
    description: "Nano-silicone exterior gloss emulsion that deflects heat and repels algae, bonded over a waterproof primer.",
    warranty: "11 Years",
    finish: "Rich Gloss",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-damp-proof-10yr", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "uni-glosss-11", coats: 2 },
    ],
  },
  {
    id: "ext-unigloss-10",
    name: "UNI-GLOSSS-10 System",
    group: "Luxury",
    category: "exterior",
    topcoatId: "uni-glosss-10",
    tagline: "Complete 10-year multi-surface gloss paint system",
    description: "Superior crack-bridging and gloss retention paired with heavy-duty damp resistance.",
    warranty: "10 Years",
    finish: "Rich Gloss",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-damp-proof-10yr", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "uni-glosss-10", coats: 2 },
    ],
  },
  {
    id: "ext-pentasia-5in1",
    name: "Pentasia 5 in 1 Exterior System",
    group: "Luxury",
    category: "exterior",
    topcoatId: "pentasia-5in1",
    tagline: "Elastomeric all-weather silicone protection with sealer primer",
    description: "Features anti-carbonation, crack-bridging, dirt-pickup resistance, water repellence, and anti-fungal defense.",
    warranty: "8 Years",
    finish: "Smooth Sheen",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "pentasia-5in1", coats: 2 },
    ],
  },
  {
    id: "ext-pentasia-universal",
    name: "Pentasia Universal System",
    group: "Premium",
    category: "exterior",
    topcoatId: "pentasia-universal",
    tagline: "Heavy-duty weather-proof emulsion with deep sealer primer",
    description: "High-spread silicone weather coat engineered to resist heavy monsoons and intense sun exposure.",
    warranty: "7 Years",
    finish: "Soft Sheen",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "pentasia-universal", coats: 2 },
    ],
  },
  {
    id: "ext-pentasia-dust-guard",
    name: "Pentasia Dust Guard System",
    group: "Premium",
    category: "exterior",
    topcoatId: "pentasia-dust-guard",
    tagline: "Anti-dust exterior emulsion with sealing undercoat",
    description: "Cross-linking polymer technology prevents dust and dirt from embedding into building facades.",
    warranty: "6 Years",
    finish: "Matt Finish",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "pentasia-dust-guard", coats: 2 },
    ],
  },
  {
    id: "ext-sandtex-matt",
    name: "Sandtex Matt System",
    group: "Premium",
    category: "exterior",
    topcoatId: "sandtex-matt",
    tagline: "Heritage heavy-bodied textured exterior acrylic system",
    description: "Snowcem's benchmark exterior textured coating that conceals hairline plaster imperfections.",
    warranty: "5 Years",
    finish: "Textured Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "sandtex-matt", coats: 2 },
    ],
  },
  {
    id: "ext-snowcryl-weatherprotek-shine",
    name: "Snowcryl Weatherprotek Shine System",
    group: "Premium",
    category: "exterior",
    topcoatId: "snowcryl-weatherprotek-shine",
    tagline: "Anti-fungal acrylic emulsion with subtle gloss shine",
    description: "Enhanced biocidal formula protects exterior masonry from black spots and fungal growth.",
    warranty: "5 Years",
    finish: "Shine Sheen",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "snowcryl-weatherprotek-shine", coats: 2 },
    ],
  },
  {
    id: "ext-snowcryl-shine",
    name: "Snowcryl Shine System",
    group: "Premium",
    category: "exterior",
    topcoatId: "snowcryl-shine",
    tagline: "High-radiance exterior finish with sealer primer",
    description: "Offers bright outdoor reflectance and durable protection against weathering.",
    warranty: "5 Years",
    finish: "Shine",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "snowcryl-shine", coats: 2 },
    ],
  },
  {
    id: "ext-snowcryl",
    name: "Snowcryl System",
    group: "Premium",
    category: "exterior",
    topcoatId: "snowcryl",
    tagline: "100% pure acrylic exterior emulsion with sealer undercoat",
    description: "Time-tested smooth acrylic exterior paint with excellent UV color stability.",
    warranty: "5 Years",
    finish: "Smooth Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "snowcare-sealer-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "snowcryl", coats: 2 },
    ],
  },
  {
    id: "ext-trump",
    name: "Trump Exterior System",
    group: "Economy",
    category: "exterior",
    topcoatId: "trump",
    tagline: "Economical exterior emulsion with Duo Primer",
    description: "Reliable and budget-friendly exterior paint system for rental homes and regular refreshes.",
    warranty: "3 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "splus-duo-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "trump", coats: 2 },
    ],
  },
  {
    id: "ext-splus-shine",
    name: "S.Plus Shine System",
    group: "Economy",
    category: "exterior",
    topcoatId: "splus-shine",
    tagline: "Radiant exterior sheen finish with Duo Primer undercoat",
    description: "Affordable shine emulsion that gives external walls an attractive gloss sheen.",
    warranty: "3 Years",
    finish: "Shine",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "splus-duo-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "splus-shine", coats: 2 },
    ],
  },
  {
    id: "ext-splus",
    name: "S.Plus Exterior System",
    group: "Economy",
    category: "exterior",
    topcoatId: "splus",
    tagline: "Affordable breathable exterior finish with Outweather Primer",
    description: "High-value exterior wall paint that provides clean uniform white and pastel facades.",
    warranty: "3 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "outweather-xpert-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "splus", coats: 2 },
    ],
  },
  {
    id: "ext-outweather",
    name: "Outweather Exterior System",
    group: "Economy",
    category: "exterior",
    topcoatId: "outweather",
    tagline: "Cost-effective exterior emulsion with Xpert Primer",
    description: "Formulated for broad coverage and fundamental weather defense at an attractive price point.",
    warranty: "2 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "outweather-xpert-primer", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "outweather", coats: 2 },
    ],
  },
  {
    id: "ext-sandtex-floor-coat",
    name: "Sandtex Floor Coat System",
    group: "Premium",
    category: "exterior",
    topcoatId: "sandtex-floor-coat",
    tagline: "3-Coat heavy-duty self-priming exterior floor system",
    description: "Specially engineered for exterior terraces, interlocking pavers, tiles, and driveways with high abrasion resistance.",
    warranty: "5 Years",
    finish: "Matt Floor Finish",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "sandtex-floor-coat", coats: 1 },
      { stepNumber: 2, type: "FINAL LAYER", productId: "sandtex-floor-coat", coats: 2 },
    ],
  },

  // -----------------------------------------------------------------------
  // INTERIOR COMBINATIONS (9 PREDEFINED SOLUTIONS)
  // -----------------------------------------------------------------------
  {
    id: "int-zenita-velvet",
    name: "Zenita Velvet Finish System",
    group: "Luxury",
    category: "interior",
    topcoatId: "zenita-velvet-finish",
    tagline: "Ultra-luxury velvet finish with Acrylic Putty & Damp Protect Basecoat",
    description: "Snowcem's flagship luxury interior solution. Acrylic putty levelling followed by damp-protection basecoat and 2 coats of stain-resistant velvet sheen.",
    warranty: "8 Years",
    finish: "Velvet Sheen",
    steps: [
      { stepNumber: 1, type: "BASECOAT", productId: "snowcare-damp-protect-dual-int", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcem-acrylic-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "zenita-velvet-finish", coats: 2 },
    ],
  },
  {
    id: "int-zenita-emulsion",
    name: "Zenita Interior Emulsion System",
    group: "Luxury",
    category: "interior",
    topcoatId: "zenita-int-emulsion",
    tagline: "Luxury smooth sheen system with Acrylic Putty & Damp Protect Base",
    description: "Creates silky-smooth walls with antibacterial hygiene defense and rich color depth.",
    warranty: "8 Years",
    finish: "Smooth Sheen",
    steps: [
      { stepNumber: 1, type: "BASECOAT", productId: "snowcare-damp-protect-dual-int", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcem-acrylic-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "zenita-int-emulsion", coats: 2 },
    ],
  },
  {
    id: "int-celeste",
    name: "Celeste Royal Interior System",
    group: "Luxury",
    category: "interior",
    topcoatId: "celeste",
    tagline: "Royal eggshell finish with Acrylic Putty & Damp Protect Base",
    description: "Combines superior opacity, luxurious eggshell sheen, and durable stain washability.",
    warranty: "7 Years",
    finish: "Rich Eggshell",
    steps: [
      { stepNumber: 1, type: "BASECOAT", productId: "snowcare-damp-protect-dual-int", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcem-acrylic-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "celeste", coats: 2 },
    ],
  },
  {
    id: "int-sentino-easy2wash",
    name: "Sentino Easy 2 Wash System",
    group: "Premium",
    category: "interior",
    topcoatId: "sentino-easy-2-wash",
    tagline: "100% washable stain-resistant finish with Acrylic Putty & Basecoat",
    description: "The ideal family choice for busy homes. High scrub resistance that washes stains off with ease.",
    warranty: "5 Years",
    finish: "Soft Sheen",
    steps: [
      { stepNumber: 1, type: "BASECOAT", productId: "snowcare-damp-protect-dual-int", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcem-acrylic-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "sentino-easy-2-wash", coats: 2 },
    ],
  },
  {
    id: "int-sentino-emulsion",
    name: "Sentino Interior Emulsion System",
    group: "Premium",
    category: "interior",
    topcoatId: "sentino-int-emulsion",
    tagline: "Smooth matte interior finish with Wall Putty & Ext Int Primer",
    description: "Balanced premium solution offering high coverage and sophisticated matte wall aesthetics.",
    warranty: "5 Years",
    finish: "Smooth Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "outweather-ext-int-primer", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcare-wall-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "sentino-int-emulsion", coats: 2 },
    ],
  },
  {
    id: "int-snowpearl-shine",
    name: "Snowpearl Shine System",
    group: "Economy",
    category: "interior",
    topcoatId: "snowpearl-shine",
    tagline: "Bright interior gloss sheen with Wall Putty & Universal Primer",
    description: "Brings radiant brightness into living spaces at an attractive price point.",
    warranty: "3 Years",
    finish: "Shine",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "universal-primer", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcare-wall-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "snowpearl-shine", coats: 2 },
    ],
  },
  {
    id: "int-snowpearl",
    name: "Snowpearl Interior System",
    group: "Economy",
    category: "interior",
    topcoatId: "snowpearl",
    tagline: "Clean bright matte finish with Wall Putty & Duo Primer",
    description: "Everyday interior wall coating that guarantees even coverage and reliable durability.",
    warranty: "3 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "splus-duo-primer", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcare-wall-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "snowpearl", coats: 2 },
    ],
  },
  {
    id: "int-snowcoat",
    name: "Snowcoat Interior System",
    group: "Economy",
    category: "interior",
    topcoatId: "snowcoat",
    tagline: "Value-packed interior paint with Wall Putty & Professional Primer",
    description: "Cost-efficient emulsion for clean, modern walls with quick turnaround time.",
    warranty: "2 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "outweather-prof-primer", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcare-wall-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "snowcoat", coats: 2 },
    ],
  },
  {
    id: "int-snowcoat-pro",
    name: "Snowcoat PRO System",
    group: "Economy",
    category: "interior",
    topcoatId: "snowcoat-pro",
    tagline: "Economical professional interior paint system",
    description: "Specially tailored for rental repainting and commercial interior refreshes with minimal budget.",
    warranty: "2 Years",
    finish: "Matt",
    steps: [
      { stepNumber: 1, type: "PRIMER", productId: "outweather-prof-primer", coats: 2 },
      { stepNumber: 2, type: "WALL PUTTY", productId: "snowcare-wall-putty", coats: 2 },
      { stepNumber: 3, type: "FINAL LAYER", productId: "snowcoat-pro", coats: 2 },
    ],
  },
];

// =========================================================================
// 3. PRODUCT LINKS & PACK RECOMMENDATION HELPERS
// =========================================================================

export const PRODUCT_LINKS: Record<string, string> = {
  "uni-glosss-18": "/products/exterior-emulsion-paints/uni-glosss-18",
  "uni-glosss-15": "/products/exterior-emulsion-paints/uni-glosss-15",
  "uni-glosss-11": "/products/exterior-emulsion-paints/uni-glosss-11",
  "uni-glosss-10": "/products/exterior-emulsion-paints/uni-glosss",
  "pentasia-5in1": "/products/exterior-emulsion-paints/pentasia",
  "pentasia-universal": "/products/exterior-emulsion-paints/pentasia-universal",
  "pentasia-dust-guard": "/products/exterior-emulsion-paints/pentasia",
  "sandtex-matt": "/products/exterior-emulsion-paints/sandtex-matt",
  "snowcryl-weatherprotek-shine": "/products/exterior-emulsion-paints/snowcryl-shine",
  "snowcryl-shine": "/products/exterior-emulsion-paints/snowcryl-shine",
  "snowcryl": "/products/exterior-emulsion-paints/snowcryl",
  "trump": "/products/exterior-emulsion-paints/trump",
  "splus-shine": "/products/exterior-emulsion-paints/snowcem-plus-shine",
  "splus": "/products/exterior-emulsion-paints/snowcem-plus",
  "outweather": "/products/exterior-emulsion-paints/outweather",
  "sandtex-floor-coat": "/products/exterior-emulsion-paints/sandtex-floor-coat",
  "snowcare-damp-proof-10yr": "/products/waterproof-range/snowcare-damp-proof",
  "snowcare-sealer-primer": "/products/primers/snowcem-sealer-and-primer",
  "splus-duo-primer": "/products/primers/snowcem-plus-duo",
  "outweather-xpert-primer": "/products/primers/snowcem-ext-int-primer",
  "zenita-velvet-finish": "/products/interior-emulsion-paints/zenita-velvet-finish",
  "zenita-int-emulsion": "/products/interior-emulsion-paints/zenita",
  "celeste": "/products/interior-emulsion-paints/celeste",
  "sentino-easy-2-wash": "/products/interior-emulsion-paints/sentino-easy2wash",
  "sentino-int-emulsion": "/products/interior-emulsion-paints/sentino",
  "snowpearl-shine": "/products/interior-emulsion-paints/snowpearl",
  "snowpearl": "/products/interior-emulsion-paints/snowpearl",
  "snowcoat": "/products/interior-emulsion-paints/snowcoat",
  "snowcoat-pro": "/products/interior-emulsion-paints/snowcoat",
  "snowcare-damp-protect-dual-int": "/products/waterproof-range/snowcare-damp-protect-dual",
  "universal-primer": "/products/primers/universal-primer",
  "outweather-ext-int-primer": "/products/primers/snowcem-ext-int-primer",
  "outweather-prof-primer": "/products/primers/snowcem-ext-int-primer",
  "snowcem-acrylic-putty": "/products/putty/acrylic-putty",
  "snowcare-wall-putty": "/products/putty/wall-putty",
};

export function getProductLink(productId: string): string {
  return PRODUCT_LINKS[productId] || "/products";
}

function computePackRecommendation(quantity: number, unit: "Ltr" | "Kg"): string {
  if (quantity <= 0) return unit === "Ltr" ? "1 × 1L" : "1 × 1Kg";

  if (unit === "Kg") {
    // Putty packs are typically 40kg, 20kg, 5kg, 1kg
    const rounded = Math.ceil(quantity);
    const p40 = Math.floor(rounded / 40);
    let rem = rounded % 40;
    const p20 = Math.floor(rem / 20);
    rem = rem % 20;
    const p5 = Math.floor(rem / 5);
    const p1 = rem % 5;

    const parts: string[] = [];
    if (p40 > 0) parts.push(`${p40} × 40Kg`);
    if (p20 > 0) parts.push(`${p20} × 20Kg`);
    if (p5 > 0) parts.push(`${p5} × 5Kg`);
    if (p1 > 0) parts.push(`${p1} × 1Kg`);
    return parts.join(" + ") || "1 × 20Kg";
  } else {
    // Liquid packs: 20L, 10L, 4L, 1L
    const rounded = Math.ceil(quantity);
    const p20 = Math.floor(rounded / 20);
    let rem = rounded % 20;
    const p10 = Math.floor(rem / 10);
    rem = rem % 10;
    const p4 = Math.floor(rem / 4);
    const p1 = rem % 4;

    const parts: string[] = [];
    if (p20 > 0) parts.push(`${p20} × 20L`);
    if (p10 > 0) parts.push(`${p10} × 10L`);
    if (p4 > 0) parts.push(`${p4} × 4L`);
    if (p1 > 0) parts.push(`${p1} × 1L`);
    return parts.join(" + ") || "1 × 1L";
  }
}

// =========================================================================
// 4. MAIN CALCULATION ENGINE
// =========================================================================

/**
 * Calculates paint budget and returns dynamic solution cards
 * based on user carpet area and category (Interior / Exterior).
 *
 * Requirements implemented:
 * - Exterior Multiplier = 2.5
 * - Interior Multiplier = 3.5
 * - No user product selection; returns all applicable solutions from master combo.
 * - Dynamic "How to Apply" steps generated from each combo.
 * - Material Required = Total Painting Area / (Coverage / Number of Coats)
 * - Material Cost = Material Required * Cost per Unit
 * - Labour Cost = Labour Rate * Total Painting Area
 * - Total Solution Cost = Material Cost + Labour Cost
 * - Per SQFT Cost = Total Solution Cost / Total Painting Area (Cost/sq.ft M+L)
 */
export function calculatePaintBudget(
  rawUserArea: number,
  category: PaintCategory
): PaintCalculationResult {
  const userArea = Math.max(1, rawUserArea || 0);

  // Category Multiplier
  const multiplier = category === "exterior" ? 2.5 : 3.5;
  const totalPaintingArea = Math.round(userArea * multiplier);

  // Filter combinations for the selected category
  const combos = PREDEFINED_COMBINATIONS.filter((c) => c.category === category);

  const solutions: CalculatedSolution[] = combos.map((combo) => {
    const topcoat = MASTER_PRODUCTS[combo.topcoatId] || MASTER_PRODUCTS["uni-glosss-18"];

    // Dynamic Steps Calculation
    const calculatedSteps: CalculatedStep[] = combo.steps.map((stepConfig, index) => {
      const product = MASTER_PRODUCTS[stepConfig.productId] || topcoat;
      const stepNumber = index + 1;
      const coats = stepConfig.coats || 2;
      const coverage = product.coverage;
      const costPerUnit = product.costPerUnit;
      const labourRate = product.labourRate;

      // Material Required = Area / (Coverage / Coats) = (Area * Coats) / Coverage
      const effectiveCoveragePerUnit = coverage / coats;
      const rawMaterialReq = totalPaintingArea / effectiveCoveragePerUnit;
      const materialRequired = Math.round(rawMaterialReq * 100) / 100;

      // Material Cost = Material Required * Cost per Unit
      const materialCost = Math.round(rawMaterialReq * costPerUnit);

      // Labour Cost = Labour Rate * Area
      const labourCost = Math.round(labourRate * totalPaintingArea);

      // Total Step Cost
      const stepTotalCost = materialCost + labourCost;

      // Badges
      const coatText = coats === 1 ? "1 COAT" : `${coats} COATS`;
      let typeLabel = "FINAL LAYER";
      if (stepConfig.type === "PRIMER") typeLabel = "PRIMER";
      else if (stepConfig.type === "WALL PUTTY") typeLabel = "WALL PUTTY";
      else if (stepConfig.type === "BASECOAT") typeLabel = "BASECOAT";

      const badge = `${coatText} • ${typeLabel}`;
      const stepTitle = `STEP 0${stepNumber}`;

      return {
        stepNumber,
        stepTitle,
        badge,
        type: stepConfig.type,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        productLink: getProductLink(product.id),
        coats,
        coverage,
        costPerUnit,
        materialRequired,
        unit: product.unit,
        materialCost,
        labourRate,
        labourCost,
        stepTotalCost,
        packRecommendation: computePackRecommendation(materialRequired, product.unit),
      };
    });

    // Sum Solution Totals
    const totalMaterialCost = calculatedSteps.reduce((acc, s) => acc + s.materialCost, 0);
    const totalLabourCost = calculatedSteps.reduce((acc, s) => acc + s.labourCost, 0);
    const totalEstimatedCost = totalMaterialCost + totalLabourCost;
    const costPerSqFtML = totalPaintingArea > 0
      ? Math.round((totalEstimatedCost / totalPaintingArea) * 100) / 100
      : 0;

    return {
      id: combo.id,
      name: combo.name,
      group: combo.group,
      category: combo.category,
      mainImage: topcoat.image,
      productLink: getProductLink(topcoat.id),
      tagline: combo.tagline,
      description: combo.description,
      warranty: combo.warranty || topcoat.warranty,
      finish: combo.finish || topcoat.finish,
      userArea,
      multiplier,
      totalPaintingArea,
      totalMaterialCost,
      totalLabourCost,
      totalEstimatedCost,
      costPerSqFtML,
      steps: calculatedSteps,
    };
  });

  return {
    userArea,
    category,
    multiplier,
    totalPaintingArea,
    solutions,
  };
}
