import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { categories, products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const SITE_URL = "https://www.snowcempaints.com";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/color-catalogue", changeFrequency: "weekly", priority: 0.9 },
  { path: "/color-visualizer", changeFrequency: "monthly", priority: 0.9 },
  { path: "/paint-calculator", changeFrequency: "monthly", priority: 0.9 },
  { path: "/find-dealers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/find-painters", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about-us/the-snowcem-story", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-us/about-mehta-group", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about-us/true-colours-of-life", changeFrequency: "monthly", priority: 0.7 },
  { path: "/media", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/life-at-snowcem", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.8 },
];

const FALLBACK_CATEGORY_SLUGS = [
  "exterior-emulsion-paints",
  "interior-emulsion-paints",
  "waterproofing-solutions",
  "cement-paints",
  "primers",
  "putty",
  "textures",
  "snowcare-range",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const [allCategories, activeProducts] = await Promise.all([
      db.select().from(categories),
      db.select().from(products).where(eq(products.isActive, true)),
    ]);

    const catById = new Map(allCategories.map((c) => [c.id, c]));

    const mainCategories = allCategories.filter((c) => c.isActive && !c.parentId);
    for (const cat of mainCategories) {
      entries.push({
        url: `${SITE_URL}/products/${cat.slug}`,
        lastModified: cat.updatedAt || now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }

    for (const prod of activeProducts) {
      const cat = catById.get(prod.categoryId);
      if (!cat || !cat.isActive) continue;
      entries.push({
        url: `${SITE_URL}/products/${cat.slug}/${prod.slug}`,
        lastModified: prod.updatedAt || now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    for (const slug of FALLBACK_CATEGORY_SLUGS) {
      entries.push({
        url: `${SITE_URL}/products/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
