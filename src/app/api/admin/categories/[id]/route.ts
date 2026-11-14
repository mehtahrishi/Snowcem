import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { categories, featuredProducts, products } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

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
    const { name, slug, parentId, description, badge, banner, sortOrder, isActive } = body;

    await db
      .update(categories)
      .set({
        ...(name !== undefined ? { name } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(parentId !== undefined ? { parentId: parentId || null } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(badge !== undefined ? { badge } : {}),
        ...(banner !== undefined ? { banner } : {}),
        ...(sortOrder !== undefined ? { sortOrder: Number(sortOrder) || 0 } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      })
      .where(eq(categories.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update category" },
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
    // Unlink products that reference this category as a subcategory
    await db
      .update(products)
      .set({ subcategoryId: null })
      .where(eq(products.subcategoryId, params.id));

    // Promote any child subcategories to top-level categories
    await db
      .update(categories)
      .set({ parentId: null })
      .where(eq(categories.parentId, params.id));

    // Delete products directly under this category (and their featured slides)
    const catProducts = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.categoryId, params.id));

    if (catProducts.length > 0) {
      const productIds = catProducts.map((p) => p.id);
      await db
        .delete(featuredProducts)
        .where(inArray(featuredProducts.productId, productIds));
      await db.delete(products).where(inArray(products.id, productIds));
    }

    await db.delete(categories).where(eq(categories.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/categories/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}

