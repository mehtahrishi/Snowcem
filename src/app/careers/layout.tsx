import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Current Job Openings | Snowcem Paints",
  description:
    "Explore current job openings and career opportunities at Snowcem Paints across sales, marketing, R&D, manufacturing, and corporate functions.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Current Job Openings | Snowcem Paints",
    description:
      "Join Snowcem Paints — view open roles and apply online.",
    url: "/careers",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
