/**
 * Transformers.js AI Room & Wall Segmentation Engine
 * 
 * Uses client-side SegFormer B0 trained on ADE20K dataset (quantized ONNX, ~12MB)
 * to automatically detect:
 * - 'wall' (all interior & exterior wall surfaces)
 * - 'ceiling' (ceiling trims & surfaces)
 * - 'floor' (floors, rugs)
 * 
 * Also performs connected-component labeling to identify distinct wall surfaces
 * (e.g. Main Wall, Accent Wall, Left Wall).
 */

export interface SegmentationSegment {
  id: string;
  label: string; // e.g. "wall", "ceiling", "floor"
  score: number;
  mask: Uint8Array; // 0..255 binary/alpha mask of dimensions (width x height)
  width: number;
  height: number;
  pixelCount: number;
}

export interface SegmentationResult {
  width: number;
  height: number;
  wallMask: Uint8Array; // Combined full wall mask
  ceilingMask?: Uint8Array;
  floorMask?: Uint8Array;
  segments: SegmentationSegment[];
  subWalls: {
    id: string;
    name: string;
    mask: Uint8Array;
    pixelCount: number;
    center: { x: number; y: number };
  }[];
}

// Pipeline cache to avoid reloading model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let segmenterPipeline: any = null;
let isLoadingModel = false;

/**
 * Initializes and caches the Transformers.js segmentation pipeline
 */
export async function getSegmentationPipeline(
  onProgress?: (progress: { status: string; progress?: number; file?: string }) => void
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (segmenterPipeline) {
    return segmenterPipeline;
  }

  if (isLoadingModel) {
    // Wait for ongoing load
    while (isLoadingModel) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (segmenterPipeline) return segmenterPipeline;
  }

  isLoadingModel = true;
  try {
    const { pipeline, env } = await import("@xenova/transformers");

    // Configure client-side environment
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    if (env.backends?.onnx?.wasm) {
      env.backends.onnx.wasm.numThreads = 1;
    }

    segmenterPipeline = await pipeline(
      "image-segmentation",
      "Xenova/segformer-b0-finetuned-ade-512-512",
      {
        quantized: true,
        progress_callback: onProgress,
      }
    );

    return segmenterPipeline;
  } catch (error) {
    console.error("Failed to load Transformers.js segmentation model:", error);
    throw error;
  } finally {
    isLoadingModel = false;
  }
}

/**
 * Runs AI segmentation on an image element or canvas
 */
export async function segmentRoomImage(
  imageSource: HTMLImageElement | HTMLCanvasElement,
  onProgress?: (status: string, percentage?: number) => void
): Promise<SegmentationResult> {
  const width = "videoWidth" in imageSource ? imageSource.width : imageSource.width;
  const height = "videoHeight" in imageSource ? imageSource.height : imageSource.height;
  const totalPixels = width * height;

  onProgress?.("Loading AI Neural Network...", 15);

  const segmenter = await getSegmentationPipeline((p) => {
    if (p.status === "progress" && p.progress !== undefined) {
      onProgress?.(`Downloading AI Model (${Math.round(p.progress)}%)...`, Math.round(p.progress * 0.5));
    } else if (p.status === "ready") {
      onProgress?.("AI Model ready. Analyzing room geometry...", 60);
    }
  });

  onProgress?.("Detecting walls and lighting boundaries...", 75);

  // Run segmentation pipeline
  const results = await segmenter(imageSource);

  onProgress?.("Refining architectural surfaces...", 90);

  const wallMask = new Uint8Array(totalPixels);
  const obstacleMask = new Uint8Array(totalPixels);
  const ceilingMask = new Uint8Array(totalPixels);
  const floorMask = new Uint8Array(totalPixels);
  const segments: SegmentationSegment[] = [];

  // ADE20K exact wall labels
  const wallLabels = new Set(["wall", "wall-brick", "wall-stone", "wall-tile", "wall-wood", "partition"]);
  
  // ADE20K foreground objects to strictly EXCLUDE from wall painting
  const obstacleLabels = new Set([
    "sofa", "couch", "armchair", "chair", "seat", "bench",
    "table", "desk", "coffee table", "nightstand",
    "television", "screen", "tv",
    "plant", "flora", "flower", "pot", "vase",
    "curtain", "drape", "drapery", "blind", "shade",
    "windowpane", "window", "glass",
    "door", "doorway",
    "floor", "flooring", "rug", "carpet", "mat",
    "ceiling", "vault",
    "painting", "picture", "frame", "poster",
    "lamp", "light", "chandelier", "sconce", "fan", "ceiling fan",
    "pillow", "cushion", "bed", "blanket",
    "cabinet", "shelf", "bookcase", "wardrobe", "cupboard", "counter", "refrigerator",
    "person", "man", "woman", "child", "dog", "cat"
  ]);

  // Process outputs
  if (Array.isArray(results) && results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      const item = results[i];
      const label = (item.label || "").toLowerCase();
      const rawImg = item.mask; // RawImage from Transformers.js

      if (!rawImg || !rawImg.data) continue;

      const singleChannel = extractMaskChannel(rawImg);
      const itemMask = rescale1ChannelMask(
        singleChannel.data,
        singleChannel.width,
        singleChannel.height,
        width,
        height
      );

      let count = 0;
      for (let p = 0; p < totalPixels; p++) {
        if (itemMask[p] > 0) {
          count++;
          if (wallLabels.has(label)) {
            wallMask[p] = 255;
          } else if (obstacleLabels.has(label)) {
            obstacleMask[p] = 255;
            if (label === "ceiling") ceilingMask[p] = 255;
            if (label === "floor" || label === "rug" || label === "carpet") floorMask[p] = 255;
          }
        }
      }

      segments.push({
        id: `seg-${i}-${label}`,
        label,
        score: item.score ?? 1.0,
        mask: itemMask,
        width,
        height,
        pixelCount: count,
      });
    }
  }

  // Subtract all obstacles (sofa, TV, floor, ceiling, frames, curtains) from wall mask
  for (let p = 0; p < totalPixels; p++) {
    if (obstacleMask[p] === 255) {
      wallMask[p] = 0;
    }
  }

  // Split into distinct sub-wall regions using connected components
  const subWalls = extractDistinctWallRegions(wallMask, width, height);

  onProgress?.("Complete", 100);

  return {
    width,
    height,
    wallMask,
    ceilingMask,
    floorMask,
    segments,
    subWalls,
  };
}

/**
 * Robust extractor for RawImage single-channel or multi-channel buffers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractMaskChannel(rawImg: any): { data: Uint8Array; width: number; height: number } {
  const w = rawImg.width;
  const h = rawImg.height;
  const channels = rawImg.channels || 1;
  const rawData = rawImg.data;
  const out = new Uint8Array(w * h);

  if (channels === 1) {
    for (let i = 0; i < w * h; i++) {
      out[i] = rawData[i] > 0 ? 255 : 0;
    }
  } else if (channels === 4) {
    for (let i = 0; i < w * h; i++) {
      const a = rawData[i * 4 + 3];
      const r = rawData[i * 4];
      out[i] = (a > 0 && r > 0) || a > 128 ? 255 : 0;
    }
  } else {
    for (let i = 0; i < w * h; i++) {
      out[i] = rawData[i * channels] > 0 ? 255 : 0;
    }
  }
  return { data: out, width: w, height: h };
}

/**
 * Rescales a 1-channel mask to full target canvas dimensions using bilinear interpolation
 */
function rescale1ChannelMask(
  srcData: Uint8Array,
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number
): Uint8Array {
  const dst = new Uint8Array(dstW * dstH);
  if (srcW === dstW && srcH === dstH) {
    dst.set(srcData);
    return dst;
  }

  const xRatio = (srcW - 1) / dstW;
  const yRatio = (srcH - 1) / dstH;

  for (let dy = 0; dy < dstH; dy++) {
    const sy = dy * yRatio;
    const y0 = Math.floor(sy);
    const y1 = Math.min(srcH - 1, y0 + 1);
    const yWeight = sy - y0;

    for (let dx = 0; dx < dstW; dx++) {
      const sx = dx * xRatio;
      const x0 = Math.floor(sx);
      const x1 = Math.min(srcW - 1, x0 + 1);
      const xWeight = sx - x0;

      const p00 = srcData[y0 * srcW + x0];
      const p10 = srcData[y0 * srcW + x1];
      const p01 = srcData[y1 * srcW + x0];
      const p11 = srcData[y1 * srcW + x1];

      const val =
        p00 * (1 - xWeight) * (1 - yWeight) +
        p10 * xWeight * (1 - yWeight) +
        p01 * (1 - xWeight) * yWeight +
        p11 * xWeight * yWeight;

      dst[dy * dstW + dx] = val > 64 ? 255 : 0;
    }
  }

  return dst;
}

/**
 * Interactive edge-aware wall region grower from clicked coordinate
 */
export function createWallMaskFromClick(
  imageData: ImageData,
  startX: number,
  startY: number,
  tolerance: number = 32
): Uint8Array {
  const width = imageData.width;
  const height = imageData.height;
  const totalPixels = width * height;
  const mask = new Uint8Array(totalPixels);
  const src = imageData.data;

  const startIdx = (startY * width + startX) * 4;
  const startR = src[startIdx];
  const startG = src[startIdx + 1];
  const startB = src[startIdx + 2];

  const visited = new Uint8Array(totalPixels);
  const queue: number[] = [startX + startY * width];
  visited[startX + startY * width] = 1;
  mask[startX + startY * width] = 255;

  const maxDiff = tolerance * 2.3;

  while (queue.length > 0) {
    const pos = queue.pop()!;
    const cx = pos % width;
    const cy = Math.floor(pos / width);
    const pIdx = pos * 4;

    const curR = src[pIdx];
    const curG = src[pIdx + 1];
    const curB = src[pIdx + 2];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos]) {
          visited[nPos] = 1;
          const nIdx = nPos * 4;
          const nR = src[nIdx];
          const nG = src[nIdx + 1];
          const nB = src[nIdx + 2];

          // Check color similarity against start pixel and local neighbor
          const diffStart = Math.sqrt(
            Math.pow(nR - startR, 2) + Math.pow(nG - startG, 2) + Math.pow(nB - startB, 2)
          );
          const diffLocal = Math.sqrt(
            Math.pow(nR - curR, 2) + Math.pow(nG - curG, 2) + Math.pow(nB - curB, 2)
          );

          if (diffStart <= maxDiff && diffLocal <= 22) {
            mask[nPos] = 255;
            queue.push(nPos);
          }
        }
      }
    }
  }

  return mask;
}

/**
 * Connected Component Labeling to group distinct wall surfaces
 * (e.g. Left Wall, Feature Wall, Right Wall)
 */
function extractDistinctWallRegions(
  wallMask: Uint8Array,
  width: number,
  height: number
): { id: string; name: string; mask: Uint8Array; pixelCount: number; center: { x: number; y: number } }[] {
  const totalPixels = width * height;
  const labels = new Int32Array(totalPixels);
  let currentLabel = 1;
  const minRegionSize = Math.round(totalPixels * 0.03); // At least 3% of photo

  const queue: number[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (wallMask[idx] === 255 && labels[idx] === 0) {
        // Start BFS flood for this connected wall patch
        labels[idx] = currentLabel;
        queue.push(idx);

        while (queue.length > 0) {
          const pos = queue.pop()!;
          const cx = pos % width;
          const cy = Math.floor(pos / width);

          const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = ny * width + nx;
              if (wallMask[nIdx] === 255 && labels[nIdx] === 0) {
                labels[nIdx] = currentLabel;
                queue.push(nIdx);
              }
            }
          }
        }

        currentLabel++;
      }
    }
  }

  // Tally sizes and centers
  const regionStats = new Map<
    number,
    { count: number; sumX: number; sumY: number; label: number }
  >();

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const l = labels[idx];
      if (l > 0) {
        const stat = regionStats.get(l) || { count: 0, sumX: 0, sumY: 0, label: l };
        stat.count++;
        stat.sumX += x;
        stat.sumY += y;
        regionStats.set(l, stat);
      }
    }
  }

  // Filter significant regions and sort left-to-right
  const sortedRegions = Array.from(regionStats.values())
    .filter((r) => r.count >= minRegionSize)
    .sort((a, b) => a.sumX / a.count - b.sumX / b.count);

  if (sortedRegions.length === 0) {
    // Return single global wall if no sub-partitions
    return [
      {
        id: "wall-full",
        name: "Full Wall Surface",
        mask: wallMask,
        pixelCount: totalPixels,
        center: { x: Math.round(width / 2), y: Math.round(height / 2) },
      },
    ];
  }

  const subWalls = sortedRegions.map((region, idx) => {
    const mask = new Uint8Array(totalPixels);
    for (let p = 0; p < totalPixels; p++) {
      if (labels[p] === region.label) {
        mask[p] = 255;
      }
    }

    let name = `Wall Section ${idx + 1}`;
    if (sortedRegions.length === 1) {
      name = "Main Wall";
    } else if (sortedRegions.length === 2) {
      name = idx === 0 ? "Left Wall" : "Right Wall";
    } else if (sortedRegions.length === 3) {
      name = idx === 0 ? "Left Wall" : idx === 1 ? "Feature Wall" : "Right Wall";
    }

    return {
      id: `wall-sub-${region.label}`,
      name,
      mask,
      pixelCount: region.count,
      center: {
        x: Math.round(region.sumX / region.count),
        y: Math.round(region.sumY / region.count),
      },
    };
  });

  return subWalls;
}

/**
 * Instant adaptive wall mask builder (runs in < 1ms) so the canvas is immediately
 * reactive to user color clicks even before neural network downloading/inference begins.
 */
export function createInstantAdaptiveWallMask(imageData: ImageData): Uint8Array {
  const width = imageData.width;
  const height = imageData.height;
  const mask = new Uint8Array(width * height);
  const data = imageData.data;

  const topLimit = Math.round(height * 0.08);
  const bottomLimit = Math.round(height * 0.82);

  for (let y = topLimit; y < bottomLimit; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (lum > 0.12 && lum < 0.96) {
        mask[y * width + x] = 255;
      }
    }
  }
  return mask;
}
