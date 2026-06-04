/*
IMPORTANT:
All code in this project must follow /docs/CURSOR_RULES.md.
Prefer simple working code over complex architecture.
Do not overengineer.
*/

import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RedRose Airport Parking | Premium Secure Airport Parking",
  description:
    "Book reliable airport parking with clear communication, convenient access and a smoother start to your journey. Premium, secure and convenient.",
  keywords: [
    "airport parking",
    "RedRose Airport Parking",
    "secure parking",
    "book airport parking",
  ],
  openGraph: {
    title: "RedRose Airport Parking",
    description:
      "Airport parking that feels simple, secure and stress-free.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${raleway.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-redrose-charcoal text-redrose-off-white">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
