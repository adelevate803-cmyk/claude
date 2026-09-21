import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/content";
import { localBusinessSchema } from "@/lib/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyBookButton from "@/components/layout/StickyBookButton";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const label = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-label",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Velvet Roll Co. | Halal Dessert Sushi Cart for Weddings & Events in Scotland",
    template: "%s | Velvet Roll Co.",
  },
  description: SITE.description,
  keywords: [
    "dessert sushi Scotland",
    "halal dessert cart wedding",
    "walima dessert Glasgow",
    "walima dessert Edinburgh",
    "dessert sushi cart hire",
  ],
  openGraph: {
    title: "Velvet Roll Co. | Halal Dessert Sushi Cart for Weddings & Events in Scotland",
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630 }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Roll Co. | Halal Dessert Sushi Cart for Weddings & Events",
    description: SITE.description,
  },
};

export const viewport = {
  themeColor: "#2B0A12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${label.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-champagne focus:px-6 focus:py-3 focus:text-velvet"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <StickyBookButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
