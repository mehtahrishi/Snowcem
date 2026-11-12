import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db.select().from(products).orderBy(products.sortOrder, desc(products.createdAt));
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
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

    if (!categoryId || !name?.trim() || !description?.trim()) {
      return NextResponse.json(
        { error: "Category, product name, and description are required" },
        { status: 400 }
      );
    }

    const finalSlug = slugify(slug || name);
    const id = finalSlug.slice(0, 36);

    await db.insert(products).values({
      id,
      categoryId,
      subcategoryId: subcategoryId || null,
      name: name.trim(),
      slug: finalSlug,
      tagline: tagline || null,
      description: description.trim(),
      features: Array.isArray(features) ? features : [],
      highlightImages: Array.isArray(highlightImages) ? highlightImages : [],
      warranty: warranty || null,
      image: image || null,
      detailImages: Array.isArray(detailImages) ? detailImages : [],
      bgImage: bgImage || null,
      pdf: pdf || null,
      faqs: Array.isArray(faqs) ? faqs : [],
      sortOrder: Number(sortOrder) || 0,
      isActive: isActive !== false,
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("POST /api/admin/products error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

