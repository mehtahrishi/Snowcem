import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorCombinations } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

function slugify(val: string) {
  return (
    val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") || randomUUID()
  );
}

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const rows = await db
      .select()
      .from(calculatorCombinations)
      .orderBy(asc(calculatorCombinations.category), asc(calculatorCombinations.sortOrder), asc(calculatorCombinations.name));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch combinations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const topcoatId = String(body.topcoatId || "").trim();
    const category = body.category === "exterior" ? "exterior" : "interior";
    const group = String(body.group || "Premium").trim();
    const id = body.id ? String(body.id).trim() : `${category === "exterior" ? "ext" : "int"}-${slugify(name)}`;
    const steps = Array.isArray(body.steps) ? body.steps : [];

    if (!name || !topcoatId) {
      return NextResponse.json(
        { error: "Combination name and topcoat material are required" },
        { status: 400 }
      );
    }

    if (steps.length === 0) {
      return NextResponse.json(
        { error: "At least one application step is required" },
        { status: 400 }
      );
    }

    const normalizedSteps = steps.map((s: any, idx: number) => ({
      stepNumber: idx + 1,
      type: s.type || "FINAL LAYER",
      productId: String(s.productId || topcoatId),
      coats: Math.max(1, Number(s.coats) || 2),
    }));

    await db.insert(calculatorCombinations).values({
      id,
      name,
      group,
      category,
      topcoatId,
      tagline: body.tagline ? String(body.tagline).trim() : null,
      description: body.description ? String(body.description).trim() : null,
      warranty: body.warranty ? String(body.warranty).trim() : null,
      finish: body.finish ? String(body.finish).trim() : null,
      steps: normalizedSteps,
      recommended: Boolean(body.recommended),
      sortOrder: Number(body.sortOrder ?? 0),
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create combination" },
      { status: 500 }
    );
  }
}
