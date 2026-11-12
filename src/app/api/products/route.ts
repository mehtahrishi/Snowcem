import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { and, asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("categorySlug");
    const slug = searchParams.get("slug");

    const allCats = await db.select().from(categories);
    const catById = new Map(allCats.map((c) => [c.id, c]));

    const conditions = [eq(products.isActive, true)];
    if (slug) {
      conditions.push(eq(products.slug, slug));
    }

    const rows = await db
      .select()
      .from(products)
      .where(and(...conditions))
      .orderBy(asc(products.sortOrder), asc(products.name));

    const mapped = rows
      .map((p) => {
        const cat = catById.get(p.categoryId);
        const sub = p.subcategoryId ? catById.get(p.subcategoryId) : null;
        return {
          ...p,
          categorySlug: cat?.slug || p.categoryId,
          categoryName: cat?.name || "",
          range: sub?.name || "",
        };
      })
      .filter((p) => (!categorySlug ? true : p.categorySlug === categorySlug));

    if (slug) {
      return NextResponse.json({
        success: true,
        product: mapped[0] || null,
      });
    }

    return NextResponse.json({
      success: true,
      products: mapped,
    });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

