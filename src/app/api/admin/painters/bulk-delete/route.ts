import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { painters } from "@/lib/db/schema";
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
      await db.delete(painters);
      return NextResponse.json({
        success: true,
        message: "All painters have been deleted successfully",
      });
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No painter IDs provided for deletion" },
        { status: 400 }
      );
    }

    await db.delete(painters).where(inArray(painters.id, ids));

    return NextResponse.json({
      success: true,
      count: ids.length,
      message: `Successfully deleted ${ids.length} painters`,
    });
  } catch (error: any) {
    console.error("Bulk delete painters error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to bulk delete painters" },
      { status: 500 }
    );
  }
}
