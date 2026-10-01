import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { painters } from "@/lib/db/schema";
import { desc, eq, or } from "drizzle-orm";

export async function GET() {
  try {
    await ensureTablesExist();
    const rows = await db
      .select()
      .from(painters)
      .where(or(eq(painters.status, "active"), eq(painters.status, "all")))
      .orderBy(desc(painters.createdAt));

    return NextResponse.json({ success: true, data: rows || [] });
  } catch (error: any) {
    console.error("Public painters fetch error:", error?.message);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch painters", data: [] },
      { status: 500 }
    );
  }
}
