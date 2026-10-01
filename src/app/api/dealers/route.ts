import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
import { SNOWCEM_DEALERS } from "@/data/dealerData";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureTablesExist();
    const rows = await db.select().from(dealers).orderBy(desc(dealers.createdAt));

    if (rows && rows.length > 0) {
      return NextResponse.json({ success: true, source: "database", data: rows });
    }

    // Fallback to initial catalogue if database table has not been populated yet
    return NextResponse.json({ success: true, source: "fallback", data: SNOWCEM_DEALERS });
  } catch (error: any) {
    console.warn("Public dealers fetch falling back to static data:", error?.message);
    return NextResponse.json({ success: true, source: "fallback", data: SNOWCEM_DEALERS });
  }
}
