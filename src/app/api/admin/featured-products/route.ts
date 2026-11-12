import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { featuredProducts } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(featuredProducts)
    .orderBy(asc(featuredProducts.sortOrder));
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId, image, alt, sortOrder } = body;
    if (!productId || !image) {
      return NextResponse.json(
        { error: "Product and banner image are required" },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();
    await db.insert(featuredProducts).values({
      id,
      productId,
      image,
      alt: alt || null,
      sortOrder: Number(sortOrder) || 0,
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("POST /api/admin/featured-products error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to add featured product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db.delete(featuredProducts).where(eq(featuredProducts.id, id));
  return NextResponse.json({ success: true });
}

