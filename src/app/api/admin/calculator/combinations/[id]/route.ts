import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorCombinations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const body = await req.json();
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = String(body.name).trim();
    if (body.group !== undefined) updateData.group = String(body.group).trim();
    if (body.category !== undefined) {
      updateData.category = body.category === "exterior" ? "exterior" : "interior";
    }
    if (body.topcoatId !== undefined) updateData.topcoatId = String(body.topcoatId).trim();
    if (body.tagline !== undefined) updateData.tagline = body.tagline ? String(body.tagline).trim() : null;
    if (body.description !== undefined) updateData.description = body.description ? String(body.description).trim() : null;
    if (body.warranty !== undefined) updateData.warranty = body.warranty ? String(body.warranty).trim() : null;
    if (body.finish !== undefined) updateData.finish = body.finish ? String(body.finish).trim() : null;
    if (Array.isArray(body.steps)) {
      updateData.steps = body.steps.map((s: any, idx: number) => ({
        stepNumber: idx + 1,
        type: s.type || "FINAL LAYER",
        productId: String(s.productId || ""),
        coats: Math.max(1, Number(s.coats) || 2),
      }));
    }
    if (body.recommended !== undefined) updateData.recommended = Boolean(body.recommended);
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder) || 0;
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    await db
      .update(calculatorCombinations)
      .set(updateData)
      .where(eq(calculatorCombinations.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update combination" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    await db
      .delete(calculatorCombinations)
      .where(eq(calculatorCombinations.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete combination" },
      { status: 500 }
    );
  }
}
