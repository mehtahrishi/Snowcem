import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { colors } from "@/lib/db/schema";
import { asc, eq, like, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const family = searchParams.get("family");
    const search = searchParams.get("search");

    let rows;
    if (search) {
      const pattern = `%${search}%`;
      rows = await db
        .select()
        .from(colors)
        .where(
          or(
            like(colors.name, pattern),
            like(colors.code, pattern),
            like(colors.family, pattern),
            like(colors.hex, pattern)
          )
        )
        .orderBy(asc(colors.sortOrder), asc(colors.name));
    } else if (family && family !== "All") {
      rows = await db
        .select()
        .from(colors)
        .where(eq(colors.family, family))
        .orderBy(asc(colors.sortOrder), asc(colors.name));
    } else {
      rows = await db
        .select()
        .from(colors)
        .orderBy(asc(colors.sortOrder), asc(colors.name));
    }

    return NextResponse.json({ success: true, colors: rows });
  } catch (error: any) {
    console.error("GET /api/colors error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

