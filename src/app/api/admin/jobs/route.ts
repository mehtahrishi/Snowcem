import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, slug, department, location, experience, ctc, summary, contentMd, isActive } = body;

    if (!title?.trim() || !contentMd?.trim()) {
      return NextResponse.json(
        { error: "Job title and Markdown content are required" },
        { status: 400 }
      );
    }

    const finalSlug = slugify(slug || title);
    const id = finalSlug.slice(0, 36);

    await db.insert(jobs).values({
      id,
      title: title.trim(),
      slug: finalSlug,
      department: department || null,
      location: location || null,
      experience: experience || null,
      ctc: ctc || null,
      summary: summary || null,
      contentMd,
      isActive: isActive !== false,
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("POST /api/admin/jobs error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, slug, department, location, experience, ctc, summary, contentMd, isActive } = body;
    if (!id) {
      return NextResponse.json({ error: "Job id is required" }, { status: 400 });
    }

    await db
      .update(jobs)
      .set({
        ...(title !== undefined ? { title } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(department !== undefined ? { department } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(experience !== undefined ? { experience } : {}),
        ...(ctc !== undefined ? { ctc } : {}),
        ...(summary !== undefined ? { summary } : {}),
        ...(contentMd !== undefined ? { contentMd } : {}),
        ...(isActive !== undefined ? { isActive: Boolean(isActive) } : {}),
      })
      .where(eq(jobs.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/admin/jobs error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db.delete(jobs).where(eq(jobs.id, id));
  return NextResponse.json({ success: true });
}

