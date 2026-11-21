import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import "./mobile-motion.css";
import "./welcome.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: "Food Planks — Multi-cuisine restaurant in Yelahanka New Town, Bengaluru",
  description: "Wooden-themed, family-friendly multi-cuisine restaurant in Yelahanka New Town. North Indian, Continental, Chinese, seafood and more.",
  openGraph: {
    title: "Food Planks — Gather round. Stay a while.",
    description: "Wooden-themed, family-friendly multi-cuisine restaurant in Yelahanka New Town, Bengaluru.",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 1066, alt: "Food Planks — placeholder image pending restaurant photography" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#183d32", viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
