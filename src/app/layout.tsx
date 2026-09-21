import type { Metadata } from "next";
import "./globals.css";
import ChatbotWidget from "@/components/ChatbotWidget";
import WhoYouAreModal from "@/components/WhoYouAreModal";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Snowcem Paints | Jab Snowcem lagega, toh aur kuch nahi dikhega",
  description: "Snowcem Paints - High Performance Interior, Exterior Emulsions, Waterproofing Paints, Primers, and Wall Finishes.",
  keywords: "Snowcem, Paints, Emulsion, Interior Paint, Exterior Paint, Sentino, Zenita, Waterproofing, Wall Finish",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#DDC7BB] text-slate-800 font-sans">
        {children}
        <WhoYouAreModal />
        <ChatbotWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
