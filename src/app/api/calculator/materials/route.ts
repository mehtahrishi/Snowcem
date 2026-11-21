import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorMaterials } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

function toNum(val: unknown, fallback = 0): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET() {
  try {
    await ensureTablesExist();

    const rows = await db
      .select()
      .from(calculatorMaterials)
      .where(eq(calculatorMaterials.isActive, true))
      .orderBy(asc(calculatorMaterials.sortOrder), asc(calculatorMaterials.name));

    const data = rows.map((row) => ({
      id: row.id,
      name: row.name,
      group: row.group,
      category: row.category,
      unit: row.unit === "Kg" ? "Kg" : "Ltr",
      mrp: toNum(row.mrp),
      dpl: toNum(row.dpl),
      pack: toNum(row.pack, 1),
      costPerUnit: toNum(row.costPerUnit),
      coverage: toNum(row.coverage),
      defaultCoats: toNum(row.defaultCoats, 2),
      labourRate: toNum(row.labourRate),
      image: row.image || "",
      tagline: row.tagline || "",
      warranty: row.warranty || undefined,
      finish: row.finish || undefined,
      productLink: row.productLink || undefined,
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("GET /api/calculator/materials error:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch calculator materials", data: [] },
      { status: 500 }
    );
  }
}
