import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { status } = await request.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    await db
      .update(contactInquiries)
      .set({ status })
      .where(eq(contactInquiries.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/inquiries/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await db.delete(contactInquiries).where(eq(contactInquiries.id, params.id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/inquiries/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
