import { NextRequest, NextResponse } from "next/server";
import { getClosestColorName } from "@/lib/colors/namer";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const hex = searchParams.get("hex");

  if (!hex) {
    return NextResponse.json(
      { error: "Query parameter 'hex' is required (e.g. ?hex=1A365D)" },
      { status: 400 }
    );
  }

  const result = getClosestColorName(hex);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const hex = body.hex;
    if (!hex) {
      return NextResponse.json({ error: "Missing 'hex' field in JSON body" }, { status: 400 });
    }
    const result = getClosestColorName(hex);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
