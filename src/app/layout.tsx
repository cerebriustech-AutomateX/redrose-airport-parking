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
  title: "RedRose Airport Parking | Manchester Airport Park & Ride & Meet & Greet",
  description:
    "Book Park & Ride or Meet & Greet parking at Manchester Airport. Secure compounds, clear instructions, and operations support on 07707 787612.",
  keywords: [
    "Manchester Airport parking",
    "Red Rose Airport Parking",
    "Park and Ride Manchester",
    "Meet and Greet Manchester Airport",
    "SK9 4JL airport parking",
  ],
  openGraph: {
    title: "RedRose Airport Parking",
    description:
      "Park & Ride and Meet & Greet at Manchester Airport — secure parking with clear procedures and support.",
    type: "website",
    locale: "en_GB",
    url: "https://redroseparking.com",
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
