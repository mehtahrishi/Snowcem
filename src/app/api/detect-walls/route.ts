import { NextRequest, NextResponse } from "next/server";

export interface WallTarget {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image_base64, room_id } = body;
    const pythonApiUrl =
      process.env.PYTHON_DETECT_WALLS_API_URL ||
      "http://127.0.0.1:8000/api/detect-walls";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(pythonApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_base64: image_base64 || "",
        room_id: room_id || "upload",
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data.success && Array.isArray(data.walls) && data.walls.length > 0) {
        return NextResponse.json({
          success: true,
          walls: data.walls,
          source: "python-backend",
        });
      }
    }

    // Python returned no walls — return empty so UI shows nothing
    return NextResponse.json({ success: true, walls: [] });
  } catch {
    // Backend unavailable — return empty so UI shows nothing
    return NextResponse.json({ success: true, walls: [] });
  }
}
