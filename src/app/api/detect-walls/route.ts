import { NextRequest, NextResponse } from "next/server";

export interface WallTarget {
  id: string;
  name: string;
  xPct: number;
  yPct: number;
}

export const SAMPLE_ROOM_WALLS: Record<string, WallTarget[]> = {
  "sample-living": [
    { id: "main", name: "Main Wall", xPct: 50, yPct: 35 },
    { id: "left", name: "Left Wall", xPct: 18, yPct: 44 },
    { id: "right", name: "Right Wall", xPct: 82, yPct: 40 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-bed": [
    { id: "headboard", name: "Headboard Wall", xPct: 50, yPct: 36 },
    { id: "side", name: "Side Wall", xPct: 18, yPct: 42 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-dining": [
    { id: "feature", name: "Feature Wall", xPct: 50, yPct: 34 },
    { id: "alcove", name: "Dining Alcove", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-kitchen": [
    { id: "back", name: "Backsplash Wall", xPct: 50, yPct: 32 },
    { id: "side", name: "Side Wall", xPct: 18, yPct: 42 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 12 },
  ],
  "sample-study": [
    { id: "desk", name: "Desk Wall", xPct: 46, yPct: 36 },
    { id: "bookshelf", name: "Bookshelf Wall", xPct: 82, yPct: 40 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-pooja": [
    { id: "mandir", name: "Mandir Backdrop", xPct: 50, yPct: 34 },
    { id: "side", name: "Sanctum Wall", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-washroom": [
    { id: "vanity", name: "Vanity Wall", xPct: 50, yPct: 34 },
    { id: "shower", name: "Shower Wall", xPct: 20, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 14 },
  ],
  "sample-ext": [
    { id: "facade", name: "Main Facade", xPct: 46, yPct: 38 },
    { id: "upper", name: "Upper Story", xPct: 76, yPct: 30 },
  ],
  "upload": [
    { id: "left", name: "Left Wall", xPct: 22, yPct: 44 },
    { id: "main", name: "Center Wall", xPct: 50, yPct: 38 },
    { id: "right", name: "Right Wall", xPct: 78, yPct: 44 },
    { id: "ceiling", name: "Ceiling", xPct: 50, yPct: 15 },
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room_id } = body;
    const roomId = room_id || "sample-living";

    const walls = SAMPLE_ROOM_WALLS[roomId] || SAMPLE_ROOM_WALLS["upload"] || [];
    return NextResponse.json({
      success: true,
      walls,
      source: "preset",
    });
  } catch {
    return NextResponse.json({
      success: true,
      walls: SAMPLE_ROOM_WALLS["sample-living"] || [],
      source: "preset",
    });
  }
}
