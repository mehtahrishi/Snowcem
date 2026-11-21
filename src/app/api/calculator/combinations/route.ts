import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorCombinations } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureTablesExist();

    const rows = await db
      .select()
      .from(calculatorCombinations)
      .where(eq(calculatorCombinations.isActive, true))
      .orderBy(asc(calculatorCombinations.sortOrder), asc(calculatorCombinations.name));

    const data = rows.map((row) => ({
      id: row.id,
      name: row.name,
      group: row.group as "Luxury" | "Premium" | "Economy",
      category: row.category as "interior" | "exterior",
      topcoatId: row.topcoatId,
      tagline: row.tagline || "",
      description: row.description || "",
      warranty: row.warranty || undefined,
      finish: row.finish || undefined,
      recommended: Boolean(row.recommended),
      steps: Array.isArray(row.steps) ? row.steps : [],
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("GET /api/calculator/combinations error:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch calculator combinations", data: [] },
      { status: 500 }
    );
  }
}
