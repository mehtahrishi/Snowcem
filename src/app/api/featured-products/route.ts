import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const featuredDir = path.join(process.cwd(), "public", "featured");
    let imageList: string[] = [];

    if (fs.existsSync(featuredDir)) {
      const files = fs
        .readdirSync(featuredDir)
        .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file));

      if (files.length > 0) {
        // Natural numerical sort: 1.png, 2.png, 3.png, 10.png, etc.
        files.sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        );

        imageList = files.map((file) => `/featured/${file}`);
      }
    }

    if (imageList.length === 0) {
      imageList = ["/featured/1.png", "/featured/2.png", "/featured/3.png"];
    }

    return NextResponse.json({ images: imageList });
  } catch (error) {
    console.error("Error fetching featured images:", error);
    return NextResponse.json(
      { images: ["/featured/1.png", "/featured/2.png", "/featured/3.png"] },
      { status: 200 }
    );
  }
}
