import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snowcem Paints | Jab Snowcem lagega, toh aur kuch nahi dikhega",
  description: "Snowcem Paints - High Performance Interior, Exterior Emulsions, Waterproofing Paints, Primers, and Wall Finishes.",
  keywords: "Snowcem, Paints, Emulsion, Interior Paint, Exterior Paint, Sentino, Zenita, Waterproofing, Wall Finish",
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
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white font-sans font-light">
        {children}
      </body>
    </html>
  );
}
