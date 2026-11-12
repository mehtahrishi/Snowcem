import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ALLOWED_FOLDERS = new Set(["categories", "products", "featured", "jobs", "general"]);

function sanitizeBaseName(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image"
  );
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const rawFolder = String(formData.get("folder") || "general").toLowerCase();
    const folder = ALLOWED_FOLDERS.has(rawFolder) ? rawFolder : "general";

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const baseName = sanitizeBaseName(file.name);
    const filename = `${baseName}-${Date.now()}.webp`;

    const uploadDir = path.join(process.cwd(), "uploads", folder);
    fs.mkdirSync(uploadDir, { recursive: true, mode: 0o755 });

    const destPath = path.join(uploadDir, filename);
    await sharp(buffer).webp({ quality: 82 }).toFile(destPath);
    fs.chmodSync(destPath, 0o644);

    return NextResponse.json({
      success: true,
      url: `/uploads/${folder}/${filename}`,
    });
  } catch (error: any) {
    console.error("POST /api/admin/upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload WebP image" },
      { status: 500 }
    );
  }
}

