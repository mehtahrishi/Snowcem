import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Certified Painters & Contractors Near You | Snowcem Paints",
  description:
    "Connect with verified, experienced painters and waterproofing contractors trained on Snowcem Paints products in your city or pincode.",
  alternates: {
    canonical: "/find-painters",
  },
  openGraph: {
    title: "Find Certified Painters & Contractors Near You | Snowcem Paints",
    description:
      "Connect with certified Snowcem Paints applicators, painters, and waterproofing specialists near you.",
    url: "/find-painters",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function FindPaintersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
