import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { mediaVideos } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db.select().from(mediaVideos).orderBy(asc(mediaVideos.sortOrder));
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, language, youtubeId, youtubeUrl, description, tag, sortOrder } = body;

    if (!title?.trim() || !youtubeId?.trim() || !language?.trim()) {
      return NextResponse.json(
        { error: "Title, language, and YouTube ID are required." },
        { status: 400 }
      );
    }

    const id = `video-${language.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`;

    await db.insert(mediaVideos).values({
      id,
      title: title.trim(),
      language: language.trim(),
      youtubeId: youtubeId.trim(),
      youtubeUrl: youtubeUrl?.trim() || `https://youtu.be/${youtubeId.trim()}`,
      description: description?.trim() || "",
      tag: tag?.trim() || "Regional TVC",
      sortOrder: Number(sortOrder) || 0,
      isActive: true,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/media error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create media video" },
      { status: 500 }
    );
  }
}
