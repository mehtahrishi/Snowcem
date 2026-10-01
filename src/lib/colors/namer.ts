import namer from "color-namer";

export interface ColorMatch {
  name: string;
  hex: string;
  distance: number;
}

export interface ColorNamingResult {
  hex: string;
  name: string;
  palette: string;
  allMatches: {
    ntc: ColorMatch[];
    pantone: ColorMatch[];
    basic: ColorMatch[];
    html: ColorMatch[];
  };
}

/**
 * Validates and normalizes a hex color string (e.g., #fff -> #ffffff, or ffffff -> #ffffff)
 */
export function normalizeHex(hex: string): string {
  let cleanHex = hex.trim().replace(/^#/, "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    return "#000000";
  }
  return `#${cleanHex.toUpperCase()}`;
}

/**
 * Finds the closest human-readable color names for any given hex code.
 */
export function getClosestColorName(hex: string): ColorNamingResult {
  const normalized = normalizeHex(hex);
  try {
    const results = namer(normalized);
    // NTC (Name That Color) and Pantone provide the most descriptive decorative names
    const primaryNtc = results.ntc?.[0];
    const primaryPantone = results.pantone?.[0];

    const chosenName = primaryNtc?.name || primaryPantone?.name || "Custom Shade";

    return {
      hex: normalized,
      name: chosenName,
      palette: primaryNtc ? "ntc" : "pantone",
      allMatches: {
        ntc: (results.ntc || []).slice(0, 5),
        pantone: (results.pantone || []).slice(0, 5),
        basic: (results.basic || []).slice(0, 5),
        html: (results.html || []).slice(0, 5),
      },
    };
  } catch (err) {
    return {
      hex: normalized,
      name: "Custom Shade",
      palette: "default",
      allMatches: { ntc: [], pantone: [], basic: [], html: [] },
    };
  }
}
