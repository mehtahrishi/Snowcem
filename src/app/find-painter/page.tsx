import { Metadata } from "next";
import FindPaintersPage from "../find-painters/page";

export const metadata: Metadata = {
  title: "Certified Painters Near You | Snowcem Paints",
  description:
    "Discover certified Snowcem painting contractors and specialists across India for high performance exterior finishes and textures.",
};

export default function FindPainterRoute() {
  return <FindPaintersPage />;
}
