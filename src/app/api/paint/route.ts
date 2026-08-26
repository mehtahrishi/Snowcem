import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pythonApiUrl =
      process.env.PYTHON_PAINT_API_URL || "http://127.0.0.1:8000/api/paint";

    // Forward request to FastAPI backend with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_base64: body.image_base64,
        click_x: Math.round(body.click_x),
        click_y: Math.round(body.click_y),
        hex_color: body.hex_color.startsWith("#")
          ? body.hex_color.toUpperCase()
          : `#${body.hex_color}`.toUpperCase(),
        tolerance: body.tolerance || 24,
        paint_weight: body.paint_weight || 0.8,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }

    const errData = await response.text();
    return NextResponse.json(
      { success: false, error: errData, fallback: true },
      { status: 200 }
    );
  } catch (error) {
    // Return fallback signal so client-side canvas engine handles it seamlessly
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Python backend unavailable",
        fallback: true,
      },
      { status: 200 }
    );
  }
}
