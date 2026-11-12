import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { curatedPalettes } from "@/lib/db/schema";
import { and, asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    const conditions = [eq(curatedPalettes.isActive, true)];
    if (category) {
      conditions.push(eq(curatedPalettes.category, category));
    }
    if (subcategory) {
      conditions.push(eq(curatedPalettes.subcategory, subcategory));
    }

    const rows = await db
      .select()
      .from(curatedPalettes)
      .where(and(...conditions))
      .orderBy(asc(curatedPalettes.sortOrder));

    return NextResponse.json({ success: true, shades: rows });
  } catch (error: any) {
    console.error("GET /api/curated-palettes error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load curated shades" },
      { status: 500 }
    );
  }
}
