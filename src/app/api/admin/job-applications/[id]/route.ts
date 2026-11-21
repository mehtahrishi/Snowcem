import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

const VALID_STATUSES = new Set(["new", "reviewing", "shortlisted", "rejected", "hired"]);

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTablesExist();
    const body = await request.json();
    const updates: Partial<{ status: string; notes: string | null }> = {};

    if (body.status !== undefined) {
      if (!VALID_STATUSES.has(body.status)) {
        return NextResponse.json({ error: "Invalid application status" }, { status: 400 });
      }
      updates.status = body.status;
    }

    if (body.notes !== undefined) {
      updates.notes = body.notes ? String(body.notes).trim() : null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    await db
      .update(jobApplications)
      .set(updates)
      .where(eq(jobApplications.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/job-applications/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update job application" },
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
    await ensureTablesExist();
    const [existing] = await db
      .select({ resumePath: jobApplications.resumePath })
      .from(jobApplications)
      .where(eq(jobApplications.id, params.id))
      .limit(1);

    await db.delete(jobApplications).where(eq(jobApplications.id, params.id));

    if (existing?.resumePath) {
      const resumesRoot = path.resolve(process.cwd(), "uploads", "resumes");
      const targetPath = path.resolve(resumesRoot, existing.resumePath);
      if (targetPath.startsWith(resumesRoot + path.sep) && fs.existsSync(targetPath)) {
        try {
          fs.unlinkSync(targetPath);
        } catch (err) {
          console.error("Failed to remove resume file:", err);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/admin/job-applications/[id] error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete job application" },
      { status: 500 }
    );
  }
}
