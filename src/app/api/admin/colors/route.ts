import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { colors } from "@/lib/db/schema";
import { desc, like, or, eq } from "drizzle-orm";
import { getClosestColorName, normalizeHex } from "@/lib/colors/namer";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  try {
    let result;
    if (search) {
      const pattern = `%${search}%`;
      result = await db
        .select()
        .from(colors)
        .where(
          or(
            like(colors.name, pattern),
            like(colors.code, pattern),
            like(colors.hex, pattern),
            like(colors.category, pattern)
          )
        )
        .orderBy(desc(colors.createdAt));
    } else if (category && category !== "all") {
      result = await db
        .select()
        .from(colors)
        .where(eq(colors.category, category))
        .orderBy(desc(colors.createdAt));
    } else {
      result = await db.select().from(colors).orderBy(desc(colors.createdAt));
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Fetch colors error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch color catalogue" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const body = await request.json();
    let { name, code, hex, category, finish, popular } = body;

    if (!hex) {
      return NextResponse.json({ error: "Hex code is required" }, { status: 400 });
    }

    const normalizedHex = normalizeHex(hex);

    // If name is omitted, auto-generate using color-namer!
    if (!name || name.trim() === "") {
      const lookup = getClosestColorName(normalizedHex);
      name = lookup.name;
    }

    // If code is omitted, generate a Snowcem shade code (e.g., S + last 4 of hex)
    if (!code || code.trim() === "") {
      code = `S${normalizedHex.replace("#", "").slice(0, 4).toUpperCase()}`;
    }

    const newId = crypto.randomUUID();
    const newColor = {
      id: newId,
      name,
      code,
      hex: normalizedHex,
      category: category || "Uni-glosss",
      finish: finish || "Gloss",
      popular: Boolean(popular),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(colors).values(newColor);

    return NextResponse.json({
      success: true,
      message: "Color shade added to catalogue",
      data: newColor,
    });
  } catch (error: any) {
    console.error("Create color error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create color" },
      { status: 500 }
    );
  }
}
