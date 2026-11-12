import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorMaterials } from "@/lib/db/schema";
import { asc, desc, eq, like, or } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const group = searchParams.get("group");
    const search = searchParams.get("search");

    let query = db.select().from(calculatorMaterials);

    const conditions = [];
    if (category) conditions.push(eq(calculatorMaterials.category, category));
    if (group) conditions.push(eq(calculatorMaterials.group, group));
    if (search) {
      conditions.push(like(calculatorMaterials.name, `%${search}%`));
    }

    if (conditions.length > 0) {
      // @ts-ignore
      query = query.where(eq(calculatorMaterials.isActive, true));
    }

    const rows = await db
      .select()
      .from(calculatorMaterials)
      .orderBy(asc(calculatorMaterials.sortOrder), asc(calculatorMaterials.name));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch materials" },
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

    const id = body.id ? String(body.id).trim() : randomUUID();
    const name = String(body.name || "").trim();
    const group = String(body.group || "Premium").trim();
    const category = String(body.category || "Int").trim();
    const unit = String(body.unit || "Ltr").trim();
    const mrp = String(body.mrp ?? "0.00");
    const dpl = String(body.dpl ?? "0.00");
    const pack = String(body.pack ?? "1.00");
    const costPerUnit = String(body.costPerUnit ?? "0.00");
    const coverage = String(body.coverage ?? "0.00");
    const defaultCoats = Number(body.defaultCoats ?? 2);
    const labourRate = String(body.labourRate ?? "0.00");
    const image = body.image ? String(body.image).trim() : null;
    const tagline = body.tagline ? String(body.tagline).trim() : null;
    const warranty = body.warranty ? String(body.warranty).trim() : null;
    const finish = body.finish ? String(body.finish).trim() : null;
    const sortOrder = Number(body.sortOrder ?? 0);
    const isActive = body.isActive !== false;

    if (!name) {
      return NextResponse.json({ error: "Product name is required" }, { status: 400 });
    }

    await db.insert(calculatorMaterials).values({
      id,
      name,
      group,
      category,
      unit,
      mrp: mrp as any,
      dpl: dpl as any,
      pack: pack as any,
      costPerUnit: costPerUnit as any,
      coverage: coverage as any,
      defaultCoats,
      labourRate: labourRate as any,
      image,
      tagline,
      warranty,
      finish,
      sortOrder,
      isActive,
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create material" },
      { status: 500 }
    );
  }
}
