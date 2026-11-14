import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life at Snowcem — Culture, Values & People | Snowcem Paints",
  description:
    "Discover workplace culture, core values, leadership perspective, and team celebrations at Snowcem Paints.",
  alternates: {
    canonical: "/life-at-snowcem",
  },
  openGraph: {
    title: "Life at Snowcem — Culture, Values & People | Snowcem Paints",
    description:
      "Explore people, culture, and core values that drive Snowcem Paints.",
    url: "/life-at-snowcem",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function LifeAtSnowcemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
