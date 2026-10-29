import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureTablesExist();
    const rows = await db.select().from(dealers).orderBy(desc(dealers.createdAt));
    return NextResponse.json({ success: true, data: rows || [] });
  } catch (error: any) {
    console.error("Public dealers fetch error:", error?.message);
    return NextResponse.json({ success: true, data: [] });
  }
}
