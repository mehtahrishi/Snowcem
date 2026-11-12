import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, city, pincode, inquiryType, message, metadata } = body;

    if (!name?.trim() || !mobile?.trim()) {
      return NextResponse.json(
        { error: "Name and Mobile number are required." },
        { status: 400 }
      );
    }

    const id = crypto.randomUUID();

    await db.insert(contactInquiries).values({
      id,
      name: name.trim(),
      email: email?.trim() || null,
      city: city?.trim() || null,
      pincode: pincode?.trim() || null,
      mobile: mobile.trim(),
      inquiryType: inquiryType?.trim() || "Customer Support",
      message: message?.trim() || null,
      metadata: metadata && typeof metadata === "object" ? metadata : null,
      status: "unread",
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
