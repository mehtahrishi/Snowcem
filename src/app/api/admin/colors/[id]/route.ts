import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { colors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getClosestColorName, normalizeHex } from "@/lib/colors/namer";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const records = await db.select().from(colors).where(eq(colors.id, params.id));
    if (records.length === 0) {
      return NextResponse.json({ error: "Color shade not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: records[0] });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const body = await request.json();
    let { name, code, hex, category, finish, popular } = body;

    const updateData: Partial<typeof colors.$inferInsert> = {};
    if (hex !== undefined) {
      updateData.hex = normalizeHex(hex);
      if (!name || name.trim() === "") {
        updateData.name = getClosestColorName(updateData.hex).name;
      }
    }
    if (name !== undefined && name.trim() !== "") updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (category !== undefined) updateData.category = category;
    if (finish !== undefined) updateData.finish = finish;
    if (popular !== undefined) updateData.popular = Boolean(popular);

    await db.update(colors).set(updateData).where(eq(colors.id, params.id));

    return NextResponse.json({
      success: true,
      message: "Color shade updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    await db.delete(colors).where(eq(colors.id, params.id));
    return NextResponse.json({
      success: true,
      message: "Color shade deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
