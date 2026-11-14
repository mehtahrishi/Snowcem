import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colour Catalogue — 1,800+ Wall Paint Shades | Snowcem Paints",
  description:
    "Browse Snowcem Paints' 1,800+ interior and exterior wall paint colour shades across Whites & Pastels, Yellows, Oranges, Reds, Purples, Blues, Greens, and Neutrals.",
  alternates: {
    canonical: "/color-catalogue",
  },
  openGraph: {
    title: "Colour Catalogue — 1,800+ Wall Paint Shades | Snowcem Paints",
    description:
      "Browse Snowcem Paints' 1,800+ curated wall paint shades for interiors and exteriors.",
    url: "/color-catalogue",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function ColorCatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
