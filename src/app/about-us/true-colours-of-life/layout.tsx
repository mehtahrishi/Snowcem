import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Colours of Life — Values & Partner Events | Snowcem Paints",
  description:
    "Explore Snowcem Paints' core pillars of innovation, quality, customer satisfaction, and global dealer partner events.",
  alternates: {
    canonical: "/about-us/true-colours-of-life",
  },
  openGraph: {
    title: "True Colours of Life — Values & Partner Events | Snowcem Paints",
    description:
      "Discover Snowcem Paints' philosophy, partner meets, and commitment to excellence.",
    url: "/about-us/true-colours-of-life",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function TrueColoursOfLifeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
