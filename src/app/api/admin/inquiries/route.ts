import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const query = db.select().from(contactInquiries);
  const rows = status
    ? await query.where(eq(contactInquiries.status, status)).orderBy(desc(contactInquiries.createdAt))
    : await query.orderBy(desc(contactInquiries.createdAt));

  return NextResponse.json({ success: true, data: rows });
}
