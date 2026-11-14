import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Nearest Paint Dealer & Store Locator | Snowcem Paints",
  description:
    "Locate authorized Snowcem Paints dealers, distributors, and colour tinting stores near you by city, state, or pincode across India.",
  alternates: {
    canonical: "/find-dealers",
  },
  openGraph: {
    title: "Find Nearest Paint Dealer & Store Locator | Snowcem Paints",
    description:
      "Locate authorized Snowcem Paints dealers and retail stores near your city or pincode.",
    url: "/find-dealers",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function FindDealersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
