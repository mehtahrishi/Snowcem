import { NextResponse } from "next/server";
import { db, ensureTablesExist } from "@/lib/db";
import { calculatorLeads } from "@/lib/db/schema";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName || "").trim();
    const phone = String(body.phone || "").trim();
    const pincode = String(body.pincode || "").trim();
    const space = String(body.space || "Interior").trim();
    const need = String(body.need || "Fresh Painting").trim();
    const carpetArea = Number(body.carpetArea || 0);
    const startTimeline = body.startTimeline ? String(body.startTimeline).trim() : null;
    const localPainterHired = body.localPainterHired ? String(body.localPainterHired).trim() : null;
    const selectedTier = body.selectedTier ? String(body.selectedTier).trim() : null;
    const totalEstimatedCost = body.totalEstimatedCost ? String(body.totalEstimatedCost) : null;

    if (!fullName || !phone || !pincode) {
      return NextResponse.json(
        { error: "Full name, phone, and pincode are required" },
        { status: 400 }
      );
    }

    await ensureTablesExist();

    const leadId = randomUUID();

    await db.insert(calculatorLeads).values({
      id: leadId,
      fullName,
      phone,
      pincode,
      startTimeline,
      localPainterHired,
      space,
      need,
      carpetArea,
      selectedTier,
      totalEstimatedCost: totalEstimatedCost as any,
    });

    return NextResponse.json({ success: true, id: leadId });
  } catch (error: any) {
    console.error("Calculator lead creation failed:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to record estimate lead" },
      { status: 500 }
    );
  }
}
