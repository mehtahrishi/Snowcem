import { rgbToLab } from "./recolor";

function box(a: Float32Array, w: number, h: number, r: number) {
  const t = new Float32Array(a.length), o = new Float32Array(a.length), k = 2 * r + 1;
  for (let y = 0; y < h; y++) {
    const row = y * w; let s = 0;
    for (let x = -r; x <= r; x++) s += a[row + Math.min(w - 1, Math.max(0, x))];
    for (let x = 0; x < w; x++) {
      t[row + x] = s / k;
      s += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < w; x++) {
    let s = 0;
    for (let y = -r; y <= r; y++) s += t[Math.min(h - 1, Math.max(0, y)) * w + x];
    for (let y = 0; y < h; y++) {
      o[y * w + x] = s / k;
      s += t[Math.min(h - 1, y + r + 1) * w + x] - t[Math.max(0, y - r) * w + x];
    }
  }
  return o;
}

/** 1) guided filter snaps mask edges to real photo edges, 2) drops pixels whose colour is far from the wall. */
export function refineMask(base: ImageData, mask: Uint8ClampedArray, r = 6, eps = 4e-4): Uint8ClampedArray {
  const { width: w, height: h, data } = base, n = w * h;
  const I = new Float32Array(n), P = new Float32Array(n), II = new Float32Array(n), IP = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    I[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255;
    P[i] = mask[i] / 255; II[i] = I[i] * I[i]; IP[i] = I[i] * P[i];
  }
  const mI = box(I, w, h, r), mP = box(P, w, h, r), mII = box(II, w, h, r), mIP = box(IP, w, h, r);
  const A = new Float32Array(n), B = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    A[i] = (mIP[i] - mI[i] * mP[i]) / (mII[i] - mI[i] * mI[i] + eps);
    B[i] = mP[i] - A[i] * mI[i];
  }
  const mA = box(A, w, h, r), mB = box(B, w, h, r);
  const out = new Uint8ClampedArray(n);
  let L0 = 0, a0 = 0, b0 = 0, c = 0;
  for (let i = 0; i < n; i++) {
    const q = Math.min(1, Math.max(0, (mA[i] * I[i] + mB[i] - 0.5) * 4 + 0.5)); // sharpen
    out[i] = q * 255;
    if (q > 0.9 && i % 3 === 0) {
      const l = rgbToLab(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
      L0 += l[0]; a0 += l[1]; b0 += l[2]; c++;
    }
  }
  if (!c) return out;
  L0 /= c; a0 /= c; b0 /= c;
  for (let i = 0; i < n; i++) {
    if (!out[i]) continue;
    const l = rgbToLab(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
    if (Math.hypot(l[1] - a0, l[2] - b0) > 25 || Math.abs(l[0] - L0) > 45) out[i] = 0;
  }
  return out;
}

/** Finds the roomiest open spot inside a mask (for placing a button). Returns 0-1 fractions, or null if empty. */
export function bestSpot(
  mask: Uint8ClampedArray, w: number, h: number, avoid: { x: number; y: number }[] = []
): { x: number; y: number } | null {
  const s = 8, gw = Math.ceil(w / s), gh = Math.ceil(h / s), d = new Float32Array(gw * gh);
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++)
    d[gy * gw + gx] = mask[Math.min(h - 1, gy * s + 4) * w + Math.min(w - 1, gx * s + 4)] > 127 ? 1e3 : 0;
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
    const i = y * gw + x;
    if (d[i]) d[i] = Math.min(d[i], (y ? d[i - gw] : 0) + 1, (x ? d[i - 1] : 0) + 1);
  }
  for (let y = gh - 1; y >= 0; y--) for (let x = gw - 1; x >= 0; x--) {
    const i = y * gw + x;
    if (d[i]) d[i] = Math.min(d[i], (y < gh - 1 ? d[i + gw] : 0) + 1, (x < gw - 1 ? d[i + 1] : 0) + 1);
  }
  let best = 0, bx = 0, by = 0;
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    let sc = d[gy * gw + gx];
    if (!sc) continue;
    const fx = ((gx + 0.5) * s) / w, fy = ((gy + 0.5) * s) / h;
    if (avoid.some((a) => Math.hypot((a.x - fx) * w, (a.y - fy) * h) < 0.08 * w)) sc *= 0.1; // keep buttons apart
    if (sc > best) { best = sc; bx = fx; by = fy; }
  }
  return best ? { x: bx, y: by } : null;
}