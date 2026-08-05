import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paint Budget Calculator — Estimate Paint Quantity & Cost | Snowcem Paints",
  description:
    "Free online paint calculator. Estimate how much paint you need and the total cost for any room or project. Supports interior, exterior, primer, cement paint and more.",
  keywords: [
    "paint calculator",
    "paint cost estimator",
    "wall paint calculator",
    "room paint calculator",
    "paint quantity calculator",
    "how much paint do I need",
    "paint budget India",
    "Snowcem paint calculator",
  ],
  openGraph: {
    title: "Paint Budget Calculator | Snowcem Paints",
    description:
      "Calculate paint quantity and cost for your walls in seconds. Quick and Advanced room calculators with multi-room support.",
    type: "website",
  },
};

export default function PaintCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
