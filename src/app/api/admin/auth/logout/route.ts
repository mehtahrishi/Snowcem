import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function POST() {
  try {
    const session = await getSession();
    session.destroy();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to logout" },
      { status: 500 }
    );
  }
}
