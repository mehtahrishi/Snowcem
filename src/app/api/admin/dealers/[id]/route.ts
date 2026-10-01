import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
    const records = await db.select().from(dealers).where(eq(dealers.id, params.id));
    if (records.length === 0) {
      return NextResponse.json({ error: "Dealer not found" }, { status: 404 });
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
    const { name, address, city, state, phone, pincode, landmark, rating, featured } = body;

    const updateData: Partial<typeof dealers.$inferInsert> = {};
    if (name !== undefined) updateData.name = name;
    if (address !== undefined) updateData.address = address;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (phone !== undefined) updateData.phone = phone;
    if (pincode !== undefined) updateData.pincode = pincode;
    if (landmark !== undefined) updateData.landmark = landmark;
    if (rating !== undefined) updateData.rating = String(rating);
    if (featured !== undefined) updateData.featured = Boolean(featured);

    await db.update(dealers).set(updateData).where(eq(dealers.id, params.id));

    return NextResponse.json({
      success: true,
      message: "Dealer updated successfully",
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
    await db.delete(dealers).where(eq(dealers.id, params.id));
    return NextResponse.json({
      success: true,
      message: "Dealer deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
