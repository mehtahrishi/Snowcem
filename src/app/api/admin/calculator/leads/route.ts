import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorLeads } from "@/lib/db/schema";
import { desc, eq, like, or } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let query = db.select().from(calculatorLeads);

    if (search) {
      const term = `%${search}%`;
      // @ts-ignore
      query = query.where(
        or(
          like(calculatorLeads.fullName, term),
          like(calculatorLeads.phone, term),
          like(calculatorLeads.pincode, term),
          like(calculatorLeads.space, term),
          like(calculatorLeads.need, term)
        )
      );
    }

    const rows = await query.orderBy(desc(calculatorLeads.createdAt));
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch calculator leads" },
      { status: 500 }
    );
  }
}
