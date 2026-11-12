import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorMaterials } from "@/lib/db/schema";
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
    if (body.category !== undefined) updateData.category = String(body.category).trim();
    if (body.unit !== undefined) updateData.unit = String(body.unit).trim();
    if (body.mrp !== undefined) updateData.mrp = String(body.mrp);
    if (body.dpl !== undefined) updateData.dpl = String(body.dpl);
    if (body.pack !== undefined) updateData.pack = String(body.pack);
    if (body.costPerUnit !== undefined) updateData.costPerUnit = String(body.costPerUnit);
    if (body.coverage !== undefined) updateData.coverage = String(body.coverage);
    if (body.defaultCoats !== undefined) updateData.defaultCoats = Number(body.defaultCoats);
    if (body.labourRate !== undefined) updateData.labourRate = String(body.labourRate);
    if (body.image !== undefined) updateData.image = body.image ? String(body.image).trim() : null;
    if (body.tagline !== undefined) updateData.tagline = body.tagline ? String(body.tagline).trim() : null;
    if (body.warranty !== undefined) updateData.warranty = body.warranty ? String(body.warranty).trim() : null;
    if (body.finish !== undefined) updateData.finish = body.finish ? String(body.finish).trim() : null;
    if (body.sortOrder !== undefined) updateData.sortOrder = Number(body.sortOrder);
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);

    await db
      .update(calculatorMaterials)
      .set(updateData)
      .where(eq(calculatorMaterials.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update material" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    await db
      .delete(calculatorMaterials)
      .where(eq(calculatorMaterials.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete material" },
      { status: 500 }
    );
  }
}
