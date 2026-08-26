import { pipeline, env } from "@xenova/transformers";

// Disable local model checking to force Hugging Face CDN fetch
env.allowLocalModels = false;
env.useBrowserCache = true;

class SegmentationPipeline {
  static task = "image-segmentation";
  static model = "Xenova/segformer-b0-finetuned-ade-512-512";
  static instance = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, {
        quantized: true,
        progress_callback,
      });
    }
    return this.instance;
  }
}

// Listen for image processing commands from the main Next.js canvas thread
self.addEventListener("message", async (event) => {
  const { image } = event.data;
  if (!image) return;

  try {
    self.postMessage({ status: "loading", message: "Loading AI model & analyzing walls..." });

    const segmenter = await SegmentationPipeline.getInstance((p) => {
      if (p.status === "progress" && p.progress !== undefined) {
        self.postMessage({
          status: "loading",
          message: `Downloading AI Neural Model (${Math.round(p.progress)}%)...`,
          progress: p.progress,
        });
      }
    });

    self.postMessage({ status: "loading", message: "Detecting room geometry & walls..." });
    const output = await segmenter(image);

    // Filter for structural elements (strictly walls)
    const validLabels = new Set([
      "wall",
      "wall-brick",
      "wall-stone",
      "wall-tile",
      "wall-wood",
      "facade",
      "partition",
    ]);

    // Objects to strictly exclude
    const obstacleLabels = new Set([
      "ceiling", "vault",
      "sofa", "couch", "chair", "table", "coffee table", "television",
      "plant", "curtain", "drape", "windowpane", "door", "floor", "rug", "carpet",
      "painting", "picture", "frame", "bed", "cushion"
    ]);

    // Serialize RawImage masks for transferable worker response
    const serializableSegments = [];

    for (let i = 0; i < output.length; i++) {
      const seg = output[i];
      const label = (seg.label || "").toLowerCase();
      
      if (!seg.mask || !seg.mask.data) continue;

      // Extract single channel binary data
      const maskW = seg.mask.width;
      const maskH = seg.mask.height;
      const channels = seg.mask.channels || 1;
      const rawData = seg.mask.data;
      const binData = new Uint8Array(maskW * maskH);

      if (channels === 1) {
        for (let j = 0; j < maskW * maskH; j++) {
          binData[j] = rawData[j] > 0 ? 255 : 0;
        }
      } else {
        for (let j = 0; j < maskW * maskH; j++) {
          binData[j] = rawData[j * channels] > 0 ? 255 : 0;
        }
      }

      serializableSegments.push({
        id: `seg-${i}-${label}`,
        label,
        isWall: validLabels.has(label),
        isObstacle: obstacleLabels.has(label),
        mask: {
          width: maskW,
          height: maskH,
          data: Array.from(binData),
        },
      });
    }

    const wallSegments = serializableSegments.filter((seg) => seg.isWall);

    if (wallSegments.length === 0) {
      const fallbackWalls = serializableSegments.filter((seg) => !seg.isObstacle);
      self.postMessage({
        status: "success",
        masks: fallbackWalls.length > 0 ? fallbackWalls : serializableSegments,
      });
      return;
    }

    // Send isolated wall masks back to the main UI canvas
    self.postMessage({ status: "success", masks: wallSegments });
  } catch (error) {
    self.postMessage({ status: "error", message: error.message || "Failed to segment image." });
  }
});
