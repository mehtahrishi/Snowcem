import type { Metadata } from "next";
import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function formatSlugTitle(slug: string): string {
  try {
    return decodeURIComponent(slug || "")
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { categorySlug: string };
}): Promise<Metadata> {
  const fallbackName = formatSlugTitle(params.categorySlug) || "Paint Collection";
  let category: { name: string; description: string | null } | undefined;

  try {
    const rows = await db
      .select({
        name: categories.name,
        description: categories.description,
      })
      .from(categories)
      .where(eq(categories.slug, params.categorySlug))
      .limit(1);
    category = rows[0];
  } catch {
    // Fallback cleanly if database is unavailable at metadata generation time
  }

  const name = category?.name || fallbackName;
  const description =
    category?.description ||
    `Explore Snowcem Paints' ${name} collection — high-performance interior and exterior paints, primers, putty, textures, and waterproofing solutions.`;
  const url = `/products/${params.categorySlug}`;
  const title = `${name} | Snowcem Paints`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Snowcem Paints",
      type: "website",
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
