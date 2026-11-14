import type { Metadata } from "next";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import WhoYouAreModal from "@/components/WhoYouAreModal";
import CookieConsent from "@/components/CookieConsent";

const SITE_URL = "https://www.snowcempaints.com";
const DEFAULT_TITLE = "Snowcem Paints | High-Performance Exterior & Interior Paints";
const DEFAULT_DESCRIPTION =
  "Snowcem Paints - High Performance Interior & Exterior Emulsions, Waterproofing Paints, Cement Paints, Primers, Wall Putty, and Textures since 1959.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  applicationName: "Snowcem Paints",
  keywords: [
    "Snowcem Paints",
    "Exterior Emulsion Paint",
    "Interior Emulsion Paint",
    "Waterproofing Solutions",
    "Cement Paint",
    "Wall Putty",
    "Wall Primers",
    "Textures",
    "Snowcare Range",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico", type: "image/png" }],
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Snowcem Paints",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/image.png",
        alt: "Snowcem Paints",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Snowcem Paints",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/image.png`,
      },
      sameAs: [
        "https://www.youtube.com/@snowcempaintsofficial",
        "https://www.linkedin.com/company/snowcem-paints/",
        "https://www.instagram.com/snowcempaints_official",
        "https://www.facebook.com/SnowcemPaintsOfficial",
        "https://in.pinterest.com/SnowcemPaints/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Snowcem Paints",
      alternateName: ["Snowcem", "Snowcem Paints India"],
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#navigation`,
      name: "Main Navigation",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Exterior Emulsion Paints",
          url: `${SITE_URL}/products/exterior-emulsion-paints`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Interior Emulsion Paints",
          url: `${SITE_URL}/products/interior-emulsion-paints`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Waterproofing Solutions",
          url: `${SITE_URL}/products/waterproofing-solutions`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Cement Paints",
          url: `${SITE_URL}/products/cement-paints`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Primers",
          url: `${SITE_URL}/products/primers`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "Wall Putty",
          url: `${SITE_URL}/products/putty`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "Textures",
          url: `${SITE_URL}/products/textures`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 8,
          name: "Snowcare Range",
          url: `${SITE_URL}/products/snowcare-range`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 9,
          name: "Colour Catalogue",
          url: `${SITE_URL}/color-catalogue`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 10,
          name: "Paint Budget Calculator",
          url: `${SITE_URL}/paint-calculator`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 11,
          name: "Find a Dealer",
          url: `${SITE_URL}/find-dealers`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 12,
          name: "Contact Us",
          url: `${SITE_URL}/contact-us`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-canvas text-[#EDE4D8] font-sans">
        {children}
        <WhoYouAreModal />
        <ChatbotWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
