import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
};

export async function GET(
  _request: NextRequest,
  context: { params: { path: string[] } }
) {
  try {
    const segments = context.params?.path || [];
    if (segments.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const uploadsRoot = path.resolve(process.cwd(), "uploads");
    const targetPath = path.resolve(uploadsRoot, ...segments);

    // Prevent directory traversal outside uploadsRoot
    if (
      targetPath !== uploadsRoot &&
      !targetPath.startsWith(uploadsRoot + path.sep)
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GET /api/uploads error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
