import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { painters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import * as XLSX from "xlsx";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureTablesExist();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No XLSX file uploaded. Please upload a valid .xlsx or .xls file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Read the Excel workbook
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      return NextResponse.json(
        { error: "The uploaded Excel file has no worksheets." },
        { status: 400 }
      );
    }

    const worksheet = workbook.Sheets[firstSheetName];
    const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: "",
      raw: false,
    });

    if (rawRows.length === 0) {
      return NextResponse.json(
        { error: "The Excel worksheet is empty." },
        { status: 400 }
      );
    }

    let inserted = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Helper to extract a value from multiple possible header variations
    const getField = (row: Record<string, any>, possibleKeys: string[]) => {
      const normalizedKeys = Object.keys(row).map((k) => ({
        original: k,
        clean: k.trim().toLowerCase().replace(/[\s_-]+/g, ""),
      }));

      for (const target of possibleKeys) {
        const cleanTarget = target.trim().toLowerCase().replace(/[\s_-]+/g, "");
        const found = normalizedKeys.find((k) => k.clean === cleanTarget);
        if (found && row[found.original] !== undefined && row[found.original] !== "") {
          return String(row[found.original]).trim();
        }
      }
      return "";
    };

    for (let i = 0; i < rawRows.length; i++) {
      const row = rawRows[i];
      const rowIndex = i + 2; // accounting for 1-based index and header row

      const phone = getField(row, ["mobile_number", "mobilenumber", "mobile", "phone", "contact", "contact_number"]);
      const name = getField(row, ["first_name", "firstname", "name", "painter_name", "full_name"]);
      const city = getField(row, ["city_name", "cityname", "city", "district"]);
      const pincode = getField(row, ["pincode", "pin_code", "pin", "postal_code"]);
      const state = getField(row, ["state_name", "statename", "state"]);
      const specialization = getField(row, ["specialization", "skill", "category"]);
      const experienceRaw = getField(row, ["experience_years", "experience", "exp"]);
      const experienceYears = experienceRaw ? parseInt(experienceRaw, 10) : null;

      // Validate minimum required fields
      if (!phone && !name && !city && !state) {
        skipped++;
        continue;
      }

      const missing: string[] = [];
      if (!phone) missing.push("mobile number");
      if (!name) missing.push("name");
      if (!city) missing.push("city");
      if (!state) missing.push("state");

      if (missing.length > 0) {
        errors.push(`Row ${rowIndex} (${name || phone || "no name"}): missing ${missing.join(", ")}`);
        skipped++;
        continue;
      }

      // Format clean phone number
      const cleanPhone = phone.replace(/[^0-9+]/g, "");

      try {
        // Store exactly what the sheet contains; unknown fields stay empty.
        await db.insert(painters).values({
          id: crypto.randomUUID(),
          name,
          phone: cleanPhone,
          city,
          state,
          pincode: pincode || null,
          specialization: specialization || null,
          experienceYears: Number.isNaN(experienceYears) ? null : experienceYears,
          rating: null,
          status: "active",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        inserted++;
      } catch (err: any) {
        errors.push(`Row ${rowIndex} (${cleanPhone}): ${err?.message || "Failed to save"}`);
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Bulk import completed! Inserted: ${inserted}, Updated: ${updated}, Skipped: ${skipped}`,
      stats: {
        totalRows: rawRows.length,
        inserted,
        updated,
        skipped,
        errors: errors.slice(0, 10), // return top 10 errors if any
      },
    });
  } catch (error: any) {
    console.error("Painter XLSX bulk upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process XLSX upload" },
      { status: 500 }
    );
  }
}
