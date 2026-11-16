import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { and, desc, eq, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const [job] = await db
        .select()
        .from(jobs)
        .where(
          and(
            eq(jobs.isActive, true),
            or(eq(jobs.slug, slug), eq(jobs.id, slug))
          )
        )
        .limit(1);
      return NextResponse.json({ success: true, job: job || null });
    }

    const rows = await db
      .select()
      .from(jobs)
      .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt));

    return NextResponse.json({ success: true, jobs: rows });
  } catch (error: any) {
    console.error("GET /api/jobs error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

