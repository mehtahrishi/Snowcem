import type { Metadata } from "next";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
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
  params: { categorySlug: string; productSlug: string };
}): Promise<Metadata> {
  let product:
    | {
        name: string;
        tagline: string | null;
        description: string;
      }
    | undefined;
  let categoryName = formatSlugTitle(params.categorySlug);

  try {
    const [prodRows, catRows] = await Promise.all([
      db
        .select({
          name: products.name,
          tagline: products.tagline,
          description: products.description,
        })
        .from(products)
        .where(eq(products.slug, params.productSlug))
        .limit(1),
      db
        .select({ name: categories.name })
        .from(categories)
        .where(eq(categories.slug, params.categorySlug))
        .limit(1),
    ]);
    product = prodRows[0];
    if (catRows[0]?.name) {
      categoryName = catRows[0].name;
    }
  } catch {
    // Fallback cleanly if database is unavailable at metadata generation time
  }

  const productName = product?.name || formatSlugTitle(params.productSlug);
  const description =
    product?.description ||
    product?.tagline ||
    `${productName} by Snowcem Paints — high-performance ${categoryName} engineered for superior coverage, durability, and wall protection.`;
  const url = `/products/${params.categorySlug}/${params.productSlug}`;
  const title = `${productName} — ${categoryName} | Snowcem Paints`;

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

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
