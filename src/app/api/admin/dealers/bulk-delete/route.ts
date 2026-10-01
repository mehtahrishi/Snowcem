import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
import { inArray } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const body = await request.json();
    const { ids, all } = body;

    if (all === true) {
      await db.delete(dealers);
      return NextResponse.json({
        success: true,
        message: "All dealers have been deleted successfully",
      });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No dealer IDs provided for deletion" },
        { status: 400 }
      );
    }

    await db.delete(dealers).where(inArray(dealers.id, ids));

    return NextResponse.json({
      success: true,
      count: ids.length,
      message: `Successfully deleted ${ids.length} dealers`,
    });
  } catch (error: any) {
    console.error("Bulk delete dealers error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to bulk delete dealers" },
      { status: 500 }
    );
  }
}
