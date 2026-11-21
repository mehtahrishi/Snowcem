/**
 * Snowcem Paint Budget Calculator — Pure Calculation Engine
 * All materials, pricing, coverage, labour rates, product links, and system
 * combinations are loaded dynamically from MySQL via:
 * - GET /api/calculator/materials
 * - GET /api/calculator/combinations
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
  productLink?: string;
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
  recommended?: boolean;
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
  materialRequired: number;
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

function computePackRecommendation(quantity: number, unit: "Ltr" | "Kg"): string {
  if (quantity <= 0) return unit === "Ltr" ? "1 × 1L" : "1 × 1Kg";

  if (unit === "Kg") {
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

/**
 * Pure paint budget calculation engine driven by live DB materials & combinations.
 * - Exterior Multiplier = 2.5
 * - Interior Multiplier = 3.5
 * - Material Required = Total Painting Area / (Coverage / Number of Coats)
 * - Material Cost = Material Required * Cost per Unit
 * - Labour Cost = Labour Rate * Total Painting Area
 * - Total Solution Cost = Material Cost + Labour Cost
 */
export function calculatePaintBudget(
  rawUserArea: number,
  category: PaintCategory,
  dbMaterials?: Record<string, MasterProduct> | null,
  dbCombinations?: PredefinedCombination[] | null
): PaintCalculationResult {
  const userArea = Math.max(1, rawUserArea || 0);
  const multiplier = category === "exterior" ? 2.5 : 3.5;
  const totalPaintingArea = Math.round(userArea * multiplier);

  if (!dbMaterials || !dbCombinations || dbCombinations.length === 0) {
    return {
      userArea,
      category,
      multiplier,
      totalPaintingArea,
      solutions: [],
    };
  }

  const combos = dbCombinations.filter(
    (c) => c.category === category && c.recommended && Boolean(dbMaterials[c.topcoatId])
  );

  const solutions: CalculatedSolution[] = combos.map((combo) => {
    const topcoat = dbMaterials[combo.topcoatId];

    const calculatedSteps: CalculatedStep[] = (combo.steps || []).map((stepConfig, index) => {
      const product = dbMaterials[stepConfig.productId] || topcoat;
      const stepNumber = index + 1;
      const coats = stepConfig.coats || product.defaultCoats || 2;
      const coverage = product.coverage > 0 ? product.coverage : 100;
      const costPerUnit = product.costPerUnit;
      const labourRate = product.labourRate;

      const effectiveCoveragePerUnit = coverage / coats;
      const rawMaterialReq = totalPaintingArea / effectiveCoveragePerUnit;
      const materialRequired = Math.round(rawMaterialReq * 100) / 100;

      const materialCost = Math.round(rawMaterialReq * costPerUnit);
      const labourCost = Math.round(labourRate * totalPaintingArea);
      const stepTotalCost = materialCost + labourCost;

      const coatText = coats === 1 ? "1 COAT" : `${coats} COATS`;
      let typeLabel = "FINAL LAYER";
      if (stepConfig.type === "PRIMER") typeLabel = "PRIMER";
      else if (stepConfig.type === "WALL PUTTY") typeLabel = "WALL PUTTY";
      else if (stepConfig.type === "BASECOAT") typeLabel = "BASECOAT";

      return {
        stepNumber,
        stepTitle: `STEP 0${stepNumber}`,
        badge: `${coatText} • ${typeLabel}`,
        type: stepConfig.type,
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        productLink: product.productLink || "/products",
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

    const totalMaterialCost = calculatedSteps.reduce((acc, s) => acc + s.materialCost, 0);
    const totalLabourCost = calculatedSteps.reduce((acc, s) => acc + s.labourCost, 0);
    const totalEstimatedCost = totalMaterialCost + totalLabourCost;
    const costPerSqFtML =
      totalPaintingArea > 0 ? Math.round((totalEstimatedCost / totalPaintingArea) * 100) / 100 : 0;

    return {
      id: combo.id,
      name: combo.name,
      group:
        topcoat.group === "Luxury" || topcoat.group === "Premium" || topcoat.group === "Economy"
          ? topcoat.group
          : combo.group,
      category: combo.category,
      mainImage: topcoat.image,
      productLink: topcoat.productLink || "/products",
      tagline: combo.tagline || topcoat.tagline,
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
