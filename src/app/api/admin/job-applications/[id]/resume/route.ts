import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const RESUME_MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".rtf": "application/rtf",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureTablesExist();
    const [app] = await db
      .select({
        resumePath: jobApplications.resumePath,
        resumeFileName: jobApplications.resumeFileName,
      })
      .from(jobApplications)
      .where(eq(jobApplications.id, params.id))
      .limit(1);

    if (!app?.resumePath) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    const resumesRoot = path.resolve(process.cwd(), "uploads", "resumes");
    const targetPath = path.resolve(resumesRoot, app.resumePath);

    if (!targetPath.startsWith(resumesRoot + path.sep) || !fs.existsSync(targetPath)) {
      return new NextResponse("Resume file missing on disk", { status: 404 });
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = RESUME_MIME_TYPES[ext] || "application/octet-stream";
    const safeDownloadName = (app.resumeFileName || `resume${ext}`).replace(/["\r\n]/g, "_");
    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${safeDownloadName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("GET /api/admin/job-applications/[id]/resume error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
