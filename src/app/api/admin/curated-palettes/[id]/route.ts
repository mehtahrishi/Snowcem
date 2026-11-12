import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { curatedPalettes } from "@/lib/db/schema";
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
    const { category, subcategory, name, hex, recommendedSurface, moodAndDescription, sortOrder, isActive } = body;

    await db
      .update(curatedPalettes)
      .set({
        ...(category !== undefined ? { category: category.trim() } : {}),
        ...(subcategory !== undefined ? { subcategory: subcategory.trim() } : {}),
        ...(name !== undefined ? { name: name.trim() } : {}),
        ...(hex !== undefined ? { hex: hex.trim().toUpperCase() } : {}),
        ...(recommendedSurface !== undefined ? { recommendedSurface: recommendedSurface.trim() } : {}),
        ...(moodAndDescription !== undefined ? { moodAndDescription: moodAndDescription.trim() } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) || 0 } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      })
      .where(eq(curatedPalettes.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/curated-palettes/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update curated shade" },
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
    await db.delete(curatedPalettes).where(eq(curatedPalettes.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/curated-palettes/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete curated shade" },
      { status: 500 }
    );
  }
}
