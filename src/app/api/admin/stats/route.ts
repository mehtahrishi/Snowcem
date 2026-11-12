import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import {
  dealers,
  painters,
  colors,
  categories,
  products,
  featuredProducts,
  jobs,
} from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const [dealersCount] = await db.select({ count: sql<number>`count(*)` }).from(dealers);
    const [paintersCount] = await db.select({ count: sql<number>`count(*)` }).from(painters);
    const [colorsCount] = await db.select({ count: sql<number>`count(*)` }).from(colors);
    const [categoriesCount] = await db.select({ count: sql<number>`count(*)` }).from(categories);
    const [productsCount] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [featuredCount] = await db.select({ count: sql<number>`count(*)` }).from(featuredProducts);
    const [jobsCount] = await db.select({ count: sql<number>`count(*)` }).from(jobs);

    return NextResponse.json({
      success: true,
      stats: {
        dealers: Number(dealersCount?.count || 0),
        painters: Number(paintersCount?.count || 0),
        colors: Number(colorsCount?.count || 0),
        categories: Number(categoriesCount?.count || 0),
        products: Number(productsCount?.count || 0),
        featured: Number(featuredCount?.count || 0),
        jobs: Number(jobsCount?.count || 0),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
