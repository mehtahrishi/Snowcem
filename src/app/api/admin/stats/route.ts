import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers, painters, colors } from "@/lib/db/schema";
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

    return NextResponse.json({
      success: true,
      stats: {
        dealers: Number(dealersCount?.count || 0),
        painters: Number(paintersCount?.count || 0),
        colors: Number(colorsCount?.count || 0),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
