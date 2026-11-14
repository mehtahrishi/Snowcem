import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media, TVCs & Brand Videos | Snowcem Paints",
  description:
    "Watch Snowcem Paints' television commercials, regional campaigns, application guides, and brand films.",
  alternates: {
    canonical: "/media",
  },
  openGraph: {
    title: "Media, TVCs & Brand Videos | Snowcem Paints",
    description:
      "Watch Snowcem Paints campaigns, television commercials, and product films.",
    url: "/media",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
