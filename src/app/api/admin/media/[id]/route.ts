import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { mediaVideos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, language, youtubeId, youtubeUrl, description, tag, sortOrder, isActive } = body;

    await db
      .update(mediaVideos)
      .set({
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(language !== undefined ? { language: language.trim() } : {}),
        ...(youtubeId !== undefined ? { youtubeId: youtubeId.trim() } : {}),
        ...(youtubeUrl !== undefined ? { youtubeUrl: youtubeUrl.trim() } : {}),
        ...(description !== undefined ? { description: description.trim() } : {}),
        ...(tag !== undefined ? { tag: tag.trim() } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) || 0 } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      })
      .where(eq(mediaVideos.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/media/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update media video" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.delete(mediaVideos).where(eq(mediaVideos.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/media/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete media video" },
      { status: 500 }
    );
  }
}
