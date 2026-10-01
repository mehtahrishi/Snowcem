import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
import { desc, like, or } from "drizzle-orm";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  try {
    let result;
    if (search) {
      const pattern = `%${search}%`;
      result = await db
        .select()
        .from(dealers)
        .where(
          or(
            like(dealers.name, pattern),
            like(dealers.city, pattern),
            like(dealers.state, pattern),
            like(dealers.phone, pattern)
          )
        )
        .orderBy(desc(dealers.createdAt));
    } else {
      result = await db.select().from(dealers).orderBy(desc(dealers.createdAt));
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Fetch dealers error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch dealers" },
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
    const { name, address, city, state, phone, pincode, landmark, rating, featured } = body;

    if (!name || !address || !city || !state || !phone) {
      return NextResponse.json(
        { error: "Name, address, city, state, and phone are required" },
        { status: 400 }
      );
    }

    const newId = crypto.randomUUID();
    const newDealer = {
      id: newId,
      name,
      address,
      city,
      state,
      phone,
      pincode: pincode || "",
      landmark: landmark || "",
      rating: rating ? String(rating) : "4.8",
      featured: Boolean(featured),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(dealers).values(newDealer);

    return NextResponse.json({
      success: true,
      message: "Dealer added successfully",
      data: newDealer,
    });
  } catch (error: any) {
    console.error("Create dealer error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create dealer" },
      { status: 500 }
    );
  }
}
