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
  mediaVideos,
  curatedPalettes,
  contactInquiries,
  calculatorLeads,
  calculatorMaterials,
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
    const [mediaCount] = await db.select({ count: sql<number>`count(*)` }).from(mediaVideos);
    const [palettesCount] = await db.select({ count: sql<number>`count(*)` }).from(curatedPalettes);
    const [inquiriesCount] = await db.select({ count: sql<number>`count(*)` }).from(contactInquiries);
    const [calcLeadsCount] = await db.select({ count: sql<number>`count(*)` }).from(calculatorLeads);
    const [calcMaterialsCount] = await db.select({ count: sql<number>`count(*)` }).from(calculatorMaterials);

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
        media: Number(mediaCount?.count || 0),
        curatedPalettes: Number(palettesCount?.count || 0),
        inquiries: Number(inquiriesCount?.count || 0),
        calcLeads: Number(calcLeadsCount?.count || 0),
        calcMaterials: Number(calcMaterialsCount?.count || 0),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
