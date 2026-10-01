import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { painters } from "@/lib/db/schema";
import { desc, like, or, eq } from "drizzle-orm";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const status = searchParams.get("status");

  try {
    let query = db.select().from(painters);
    let result;

    if (search) {
      const pattern = `%${search}%`;
      result = await db
        .select()
        .from(painters)
        .where(
          or(
            like(painters.name, pattern),
            like(painters.phone, pattern),
            like(painters.city, pattern),
            like(painters.state, pattern),
            like(painters.specialization, pattern)
          )
        )
        .orderBy(desc(painters.createdAt));
    } else if (status && status !== "all") {
      result = await db
        .select()
        .from(painters)
        .where(eq(painters.status, status))
        .orderBy(desc(painters.createdAt));
    } else {
      result = await db.select().from(painters).orderBy(desc(painters.createdAt));
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Fetch painters error:", error);
    console.error("Fetch painters error cause:", error?.cause);
    return NextResponse.json(
      {
        error: error?.cause?.message || error?.message || "Failed to fetch painters",
        sqlCode: error?.cause?.code || error?.code,
        sqlState: error?.cause?.sqlState,
      },
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
    const {
      name,
      phone,
      city,
      state,
      pincode,
      experienceYears,
      specialization,
      rating,
      status,
      verified,
    } = body;

    if (!name || !phone || !city || !state) {
      return NextResponse.json(
        { error: "Name, phone, city, and state are required" },
        { status: 400 }
      );
    }

    const cleanPhone = phone.trim().replace(/[^0-9+]/g, "");

    // Check if phone already exists
    const existing = await db
      .select({ id: painters.id, name: painters.name })
      .from(painters)
      .where(eq(painters.phone, cleanPhone))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        {
          error: `A painter with phone number ${cleanPhone} already exists (${existing[0].name}).`,
        },
        { status: 409 }
      );
    }

    const newId = crypto.randomUUID();
    const newPainter = {
      id: newId,
      name: name.trim(),
      phone: cleanPhone,
      city: city.trim(),
      state: state.trim(),
      pincode: pincode ? pincode.trim() : "",
      experienceYears: experienceYears ? parseInt(experienceYears, 10) : 3,
      specialization: specialization || "Exterior Textures & Emulsions",
      rating: rating ? String(rating) : "4.8",
      status: status || "active",
      verified: Boolean(verified),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(painters).values(newPainter);

    return NextResponse.json({
      success: true,
      message: "Painter added successfully",
      data: newPainter,
    });
  } catch (error: any) {
    console.error("Create painter error:", error);
    if (error?.code === "ER_DUP_ENTRY" || error?.cause?.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "A painter with this mobile number already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error?.message || "Failed to create painter" },
      { status: 500 }
    );
  }
}
