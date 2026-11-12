import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaVideos } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(mediaVideos)
      .where(eq(mediaVideos.isActive, true))
      .orderBy(asc(mediaVideos.sortOrder));

    return NextResponse.json({ success: true, videos: rows });
  } catch (error: any) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load media" },
      { status: 500 }
    );
  }
}
