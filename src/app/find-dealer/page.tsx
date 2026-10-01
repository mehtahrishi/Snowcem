import { Metadata } from "next";
import FindDealersPage from "../find-dealers/page";

export const metadata: Metadata = {
  title: "Authorized Dealers Near You | Snowcem Paints",
  description:
    "Find authorized Snowcem Paints retail stockists, computerized tinting centers, and verified paint distributors across India.",
};

export default function FindDealerRoute() {
  return <FindDealersPage />;
}
