import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { curatedPalettes } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 500);

  let query = db.select().from(curatedPalettes);
  const rows = await query.orderBy(asc(curatedPalettes.sortOrder)).limit(limit);

  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, subcategory, name, hex, recommendedSurface, moodAndDescription, sortOrder } = body;

    if (!category?.trim() || !subcategory?.trim() || !name?.trim() || !hex?.trim()) {
      return NextResponse.json(
        { error: "Category, Subcategory, Name, and Hex are required." },
        { status: 400 }
      );
    }

    const id = `shade-${crypto.randomUUID().slice(0, 8)}`;

    await db.insert(curatedPalettes).values({
      id,
      category: category.trim(),
      subcategory: subcategory.trim(),
      name: name.trim(),
      hex: hex.trim().toUpperCase(),
      recommendedSurface: recommendedSurface?.trim() || null,
      moodAndDescription: moodAndDescription?.trim() || null,
      sortOrder: Number(sortOrder) || 0,
      isActive: true,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/curated-palettes error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create curated shade" },
      { status: 500 }
    );
  }
}
