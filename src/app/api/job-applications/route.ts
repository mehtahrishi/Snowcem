import { NextRequest, NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { jobApplications, jobs } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "rtf", "txt"]);
const MAX_RESUME_BYTES = 2 * 1024 * 1024; // 2MB

function sanitizeBaseName(name: string): string {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "resume"
  );
}

export async function POST(request: NextRequest) {
  try {
    await ensureTablesExist();

    const formData = await request.formData();
    const rawType = String(formData.get("applicationType") || "job_specific").trim();
    const applicationType = rawType === "general" ? "general" : "job_specific";

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const location = String(formData.get("location") || "").trim() || null;
    const areaOfInterest = String(formData.get("areaOfInterest") || "").trim() || null;
    const rawJobId = String(formData.get("jobId") || "").trim() || null;
    let jobTitle = String(formData.get("jobTitle") || "").trim() || null;
    const resume = formData.get("resume");

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    if (!resume || !(resume instanceof File) || resume.size === 0) {
      return NextResponse.json(
        { error: "Resume upload is required." },
        { status: 400 }
      );
    }

    const ext = (resume.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed types are: pdf, doc, docx, rtf, txt" },
        { status: 400 }
      );
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "File size exceeds 2MB limit. Please upload a smaller file." },
        { status: 400 }
      );
    }

    // Resolve jobId (supports either job.id or job.slug from route params)
    let resolvedJobId: string | null = null;
    if (applicationType === "job_specific" && rawJobId) {
      const [matchedJob] = await db
        .select({ id: jobs.id, title: jobs.title })
        .from(jobs)
        .where(or(eq(jobs.id, rawJobId), eq(jobs.slug, rawJobId)))
        .limit(1);

      if (matchedJob) {
        resolvedJobId = matchedJob.id;
        if (!jobTitle) jobTitle = matchedJob.title;
      }
    }

    const id = crypto.randomUUID();
    const storedFileName = `${id}-${sanitizeBaseName(resume.name)}.${ext}`;
    const resumesDir = path.join(process.cwd(), "uploads", "resumes");
    fs.mkdirSync(resumesDir, { recursive: true, mode: 0o755 });

    const buffer = Buffer.from(await resume.arrayBuffer());
    const destPath = path.join(resumesDir, storedFileName);
    fs.writeFileSync(destPath, buffer);
    try {
      fs.chmodSync(destPath, 0o640);
    } catch {
      // chmod may be a no-op on Windows
    }

    await db.insert(jobApplications).values({
      id,
      applicationType,
      jobId: resolvedJobId,
      jobTitle,
      areaOfInterest,
      fullName,
      email,
      phone,
      location,
      resumeFileName: resume.name.slice(0, 255),
      resumePath: storedFileName,
      resumeSize: resume.size,
      status: "new",
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/job-applications error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to submit job application" },
      { status: 500 }
    );
  }
}
