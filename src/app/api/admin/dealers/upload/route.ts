import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db, ensureTablesExist } from "@/lib/db";
import { dealers } from "@/lib/db/schema";
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
      const rowIndex = i + 2;

      // Extract dealer fields as specified:
      // Customer Code, Customer Name, Mobile Number, Address Line 1-4, Postal Code, City, State
      const customerCode = getField(row, [
        "customercode",
        "customer_code",
        "code",
        "dealer_code",
        "dealercode",
        "custcode",
      ]);

      const name = getField(row, [
        "customername",
        "customer_name",
        "name",
        "dealer_name",
        "store_name",
        "firm_name",
        "account_name",
      ]);

      const phone = getField(row, [
        "mobilenumber",
        "mobile_number",
        "mobile",
        "phone",
        "contact_number",
        "contact",
        "telephone",
      ]);

      // Merge Address Lines 1, 2, 3, 4
      const addr1 = getField(row, ["addressline1", "address_line_1", "address1", "addr1"]);
      const addr2 = getField(row, ["addressline2", "address_line_2", "address2", "addr2"]);
      const addr3 = getField(row, ["addressline3", "address_line_3", "address3", "addr3"]);
      const addr4 = getField(row, ["addressline4", "address_line_4", "address4", "addr4"]);
      const generalAddr = getField(row, ["address", "street", "location"]);

      const mergedAddressParts = [addr1, addr2, addr3, addr4].filter(Boolean);
      let address = mergedAddressParts.join(", ");
      if (!address) {
        address = generalAddr || "";
      }

      const pincode = getField(row, [
        "postalcode",
        "postal_code",
        "pincode",
        "pin_code",
        "pin",
        "zip",
      ]);

      const city = getField(row, ["city", "city_name", "town", "district"]);
      const state = getField(row, ["state", "state_name", "region", "province"]);

      // Skip completely empty lines
      if (!name && !phone && !address) {
        skipped++;
        continue;
      }

      const dealerName = name || `Dealer ${customerCode || rowIndex}`;
      const dealerAddress = address || (city ? `${city}, ${state || "India"}` : "Address details on inquiry");
      const dealerCity = city || "Regional City";
      const dealerState = state || "India";
      const dealerPhone = phone || "1800-209-5656";

      try {
        // Direct insert as per user requirement: "just add everything as per file"
        await db.insert(dealers).values({
          id: crypto.randomUUID(),
          customerCode: customerCode || "",
          name: dealerName,
          address: dealerAddress,
          city: dealerCity,
          state: dealerState,
          phone: dealerPhone,
          pincode: pincode || "",
          landmark: "",
          rating: "4.8",
          featured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        inserted++;
      } catch (err: any) {
        errors.push(`Row ${rowIndex} (${dealerName}): ${err?.message || "Failed to insert"}`);
        skipped++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Bulk import completed! Inserted: ${inserted}, Skipped: ${skipped}`,
      stats: {
        totalRows: rawRows.length,
        inserted,
        skipped,
        errors: errors.slice(0, 10),
      },
    });
  } catch (error: any) {
    console.error("Dealer XLSX bulk upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process XLSX upload" },
      { status: 500 }
    );
  }
}
