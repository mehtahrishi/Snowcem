import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTablesExist();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const conditions = [];
    if (status && status !== "all") {
      conditions.push(eq(jobApplications.status, status));
    }
    if (type && type !== "all") {
      conditions.push(eq(jobApplications.applicationType, type));
    }

    const rows =
      conditions.length > 0
        ? await db
            .select()
            .from(jobApplications)
            .where(and(...conditions))
            .orderBy(desc(jobApplications.createdAt))
        : await db
            .select()
            .from(jobApplications)
            .orderBy(desc(jobApplications.createdAt));

    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("GET /api/admin/job-applications error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to load job applications" },
      { status: 500 }
    );
  }
}
