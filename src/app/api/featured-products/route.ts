import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { categories, featuredProducts, products } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db
      .select({
        id: featuredProducts.id,
        productId: featuredProducts.productId,
        image: featuredProducts.image,
        alt: featuredProducts.alt,
        sortOrder: featuredProducts.sortOrder,
        productSlug: products.slug,
        productName: products.name,
        categoryId: products.categoryId,
      })
      .from(featuredProducts)
      .innerJoin(products, eq(featuredProducts.productId, products.id))
      .orderBy(asc(featuredProducts.sortOrder));

    const allCats = await db.select().from(categories);
    const catById = new Map(allCats.map((c) => [c.id, c]));

    const items = rows.map((r) => {
      const catSlug = catById.get(r.categoryId)?.slug || r.categoryId;
      return {
        id: r.id,
        productId: r.productId,
        src: r.image,
        alt: r.alt || r.productName,
        href: `/products/${catSlug}/${r.productSlug}`,
      };
    });

    return NextResponse.json({ success: true, items });
  } catch (error: any) {
    console.error("GET /api/featured-products error:", error);
    return NextResponse.json({ success: true, items: [] });
  }
}
