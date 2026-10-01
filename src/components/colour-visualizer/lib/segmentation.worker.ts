import { pipeline, SamModel, AutoProcessor, RawImage, Tensor, env } from "@huggingface/transformers";
env.allowLocalModels = false; // to self-host models, see README

const SAM = "Xenova/slimsam-77-uniform";
let model: any, proc: any, inputs: any, emb: any, seg: any, url = "";
const prog = (p: any) => self.postMessage({ type: "progress", p });

/** SAM mask (0/255) for points given as 0-1 fractions of the image; l = 1 inside, 0 outside. */
async function samMask(points: { x: number; y: number; l: number }[]) {
  const [rh, rw] = inputs.reshaped_input_sizes[0];
  const pts = points.flatMap((p) => [p.x * rw, p.y * rh]);
  const input_points = new Tensor("float32", pts, [1, 1, points.length, 2]);
  const input_labels = new Tensor("int64", points.map((p) => BigInt(p.l)), [1, 1, points.length]);
  const { pred_masks, iou_scores } = await model({ ...emb, input_points, input_labels });
  const masks = await proc.post_process_masks(pred_masks, inputs.original_sizes, inputs.reshaped_input_sizes);
  const [, , H, W] = masks[0].dims;
  const sc = Array.from(iou_scores.data as ArrayLike<number>);
  const best = sc.indexOf(Math.max(...sc));
  const out = new Uint8ClampedArray(H * W);
  for (let i = 0; i < H * W; i++) out[i] = masks[0].data[best * H * W + i] ? 255 : 0;
  return out;
}

self.onmessage = async (e: MessageEvent<any>) => {
  const d = e.data;
  try {
    if (d.type === "embed") {
      model ??= await SamModel.from_pretrained(SAM, { progress_callback: prog });
      proc ??= await AutoProcessor.from_pretrained(SAM);
      url = d.url;
      inputs = await proc(await RawImage.read(url));
      emb = await model.get_image_embeddings(inputs);
      self.postMessage({ type: "ready" });
    } else if (d.type === "segment") {
      const mask = await samMask(d.points);
      (self as any).postMessage({ type: "mask", zone: d.zone, op: d.op, mask }, [mask.buffer]);
    } else if (d.type === "discover") {
      const { w: W, h: H } = d;
      seg ??= await pipeline("image-segmentation", "Xenova/segformer-b0-finetuned-ade-512-512", { progress_callback: prog });
      const res = await seg(url);
      const grab = (label: string) => {
        const o = new Uint8ClampedArray(W * H);
        for (const s of res) {
          if (s.label !== label) continue;
          const m = s.mask;
          for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
            const v = m.data[Math.floor((y * m.height) / H) * m.width + Math.floor((x * m.width) / W)];
            if (v > o[y * W + x]) o[y * W + x] = v;
          }
        }
        return o;
      };
      const wall = grab("wall"), ceil = grab("ceiling");
      const count = (m: Uint8ClampedArray) => m.reduce((n, v) => n + (v > 127 ? 1 : 0), 0);
      const items: { kind: string; mask: Uint8ClampedArray }[] = [];
      if (count(ceil) > W * H * 0.01) items.push({ kind: "ceiling", mask: ceil });

      // Split the wall region: probe a grid of points, let SAM outline each separate surface.
      const owned = new Uint8Array(W * H), min = W * H * 0.015, cols = 7, rows = 5;
      for (let r = 0; r < rows && items.length < 7; r++) for (let c = 0; c < cols && items.length < 7; c++) {
        const px = Math.round(((c + 0.5) * W) / cols), py = Math.round(((r + 0.5) * H) / rows);
        if (wall[py * W + px] < 128 || owned[py * W + px]) continue;
        const m = await samMask([{ x: px / W, y: py / H, l: 1 }]);
        const mk = new Uint8ClampedArray(W * H);
        let n = 0;
        for (let i = 0; i < W * H; i++) if (m[i] && wall[i] > 127 && !owned[i]) { mk[i] = 255; n++; }
        owned[py * W + px] = 1; // never probe the same spot twice
        if (n < min) continue;
        for (let i = 0; i < W * H; i++) if (mk[i]) owned[i] = 1;
        items.push({ kind: "wall", mask: mk });
      }
      (self as any).postMessage({ type: "surfaces", items }, items.map((i: any) => i.mask.buffer));
    }
  } catch (err) {
    self.postMessage({ type: "error", message: String(err) });
  }
};