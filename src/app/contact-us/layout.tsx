import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Customer Care & Corporate Office | Snowcem Paints",
  description:
    "Reach Snowcem Paints customer care at 1800-209-5656 or customercare@snowcempaints.com for product inquiries, painting services, dealership support, and technical help.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us — Customer Care & Corporate Office | Snowcem Paints",
    description:
      "Get in touch with Snowcem Paints for product support, dealer inquiries, and corporate communication.",
    url: "/contact-us",
    siteName: "Snowcem Paints",
    type: "website",
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
