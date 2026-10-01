// Lightness-preserving recolor: paint-colour hue/chroma, original wall shading.
const LIN = new Float32Array(256).map((_, i) => {
  const c = i / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
});
const gam = (c: number) =>
  Math.max(0, Math.min(255, Math.round((c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055) * 255)));
const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
const fi = (t: number) => (t * t * t > 0.008856 ? t * t * t : (t - 16 / 116) / 7.787);

export const hexToRgb = (h: string): [number, number, number] => {
  const n = parseInt(h.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lightness = (r: number, g: number, b: number) =>
  116 * f(0.2126 * LIN[r] + 0.7152 * LIN[g] + 0.0722 * LIN[b]) - 16;

export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  const R = LIN[r], G = LIN[g], B = LIN[b];
  const fx = f((0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047);
  const fy = f(0.2126 * R + 0.7152 * G + 0.0722 * B);
  const fz = f((0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883);
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}
function labToRgb(L: number, a: number, b: number): [number, number, number] {
  const fy = (L + 16) / 116;
  const x = fi(fy + a / 500) * 0.95047, y = fi(fy), z = fi(fy - b / 200) * 1.08883;
  return [
    gam(3.2406 * x - 1.5372 * y - 0.4986 * z),
    gam(-0.9689 * x + 1.8758 * y + 0.0415 * z),
    gam(0.0557 * x - 0.204 * y + 1.057 * z),
  ];
}

/** Average wall lightness under a mask (the "flat" level that shading is measured against). */
export function refFor(base: Uint8ClampedArray, mask: Uint8ClampedArray): number {
  let s = 0, n = 0;
  for (let i = 0; i < mask.length; i += 5)
    if (mask[i] > 127) { s += lightness(base[i * 4], base[i * 4 + 1], base[i * 4 + 2]); n++; }
  return n ? s / n : 60;
}

export type Rect = { x0: number; y0: number; x1: number; y1: number };

/** Paints one zone into `out` (reads original pixels from `base`). Optional rect = only touch that area. */
export function applyColour(
  out: Uint8ClampedArray, base: Uint8ClampedArray, w: number,
  mask: Uint8ClampedArray, hex: string, ref: number, rect?: Rect
) {
  const h = mask.length / w;
  const { x0, y0, x1, y1 } = rect ?? { x0: 0, y0: 0, x1: w, y1: h };
  const [Lt, at, bt] = rgbToLab(...hexToRgb(hex));
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
    const i = y * w + x;
    const m = Math.min(1, Math.max(0, (mask[i] / 255 - 0.25) / 0.5)); // tight edge transition
    if (m <= 0) continue;
    const p = i * 4;
    const L = Math.max(0, Math.min(100, Lt + (lightness(base[p], base[p + 1], base[p + 2]) - ref) * 0.9));
    const k = L < Lt ? 0.55 + 0.45 * (L / Math.max(Lt, 1)) : 1; // shadows get duller, like real paint
    const [r, g, b] = labToRgb(L, at * k, bt * k);
    out[p] = out[p] * (1 - m) + r * m;
    out[p + 1] = out[p + 1] * (1 - m) + g * m;
    out[p + 2] = out[p + 2] * (1 - m) + b * m;
  }
}