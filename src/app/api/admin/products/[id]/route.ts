import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      categoryId,
      subcategoryId,
      name,
      slug,
      tagline,
      description,
      features,
      highlightImages,
      warranty,
      image,
      detailImages,
      bgImage,
      pdf,
      faqs,
      sortOrder,
      isActive,
    } = body;

    await db
      .update(products)
      .set({
        ...(categoryId !== undefined ? { categoryId } : {}),
        ...(subcategoryId !== undefined ? { subcategoryId: subcategoryId || null } : {}),
        ...(name !== undefined ? { name } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(tagline !== undefined ? { tagline } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(features !== undefined ? { features } : {}),
        ...(highlightImages !== undefined ? { highlightImages } : {}),
        ...(warranty !== undefined ? { warranty } : {}),
        ...(image !== undefined ? { image } : {}),
        ...(detailImages !== undefined ? { detailImages } : {}),
        ...(bgImage !== undefined ? { bgImage } : {}),
        ...(pdf !== undefined ? { pdf } : {}),
        ...(faqs !== undefined ? { faqs } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) || 0 } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      })
      .where(eq(products.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/products/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.delete(products).where(eq(products.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/products/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}

