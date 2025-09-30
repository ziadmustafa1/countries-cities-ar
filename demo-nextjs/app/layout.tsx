import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://countries-cities-ar.vercel.app'),
  title: {
    default: "Countries Cities AR | 250 دولة بـ 3 لغات - مكتبة JavaScript/TypeScript",
    template: "%s | Countries Cities AR"
  },
  description: "مكتبة JavaScript/TypeScript شاملة تحتوي على 250 دولة و 4,642 محافظة/ولاية مع دعم كامل للغة العربية. Complete library with accurate Arabic translations for all Arab countries. Perfect for React, Next.js, and Vue applications.",
  keywords: [
    // Arabic Keywords
    "دول العالم", "مدن العالم", "محافظات", "ولايات", "مكتبة دول",
    "دول عربية", "مدن عربية", "بيانات جغرافية", "قائمة الدول",
    "مصر محافظات", "السعودية مناطق", "الإمارات إمارات",
    // English Keywords
    "countries library", "cities library", "world countries", "countries data",
    "arabic countries", "states provinces", "geographic data",
    "country codes", "ISO countries", "world cities",
    // Technical Keywords
    "typescript countries", "react countries", "nextjs countries",
    "javascript library", "npm package", "countries api",
    "multilingual countries", "i18n countries", "localization",
    // Framework specific
    "countries-cities-ar", "react-select countries", "dropdown countries",
    "form countries", "autocomplete countries"
  ],
  authors: [{ name: "Ziad Mustafa", url: "https://github.com/ziadmustafa1" }],
  creator: "Ziad Mustafa",
  publisher: "Countries Cities AR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US", "fr_FR"],
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://countries-cities-ar.vercel.app",
    siteName: "Countries Cities AR",
    title: "Countries Cities AR - 250 Countries with Full Arabic Support",
    description: "مكتبة شاملة تضم 250 دولة و 4,642 محافظة بـ 3 لغات. TypeScript library with 100% accurate Arabic translations for all Arab countries.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Countries Cities AR - World Countries Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@countries_cities_ar",
    creator: "@ziadmustafa1",
    title: "Countries Cities AR - 250 دولة بدعم عربي كامل",
    description: "مكتبة JavaScript شاملة: 250 دولة، 4,642 محافظة، 3 لغات. Perfect for React & Next.js",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://countries-cities-ar.vercel.app",
    languages: {
      'ar': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://countries-cities-ar.vercel.app'}/ar`,
      'en': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://countries-cities-ar.vercel.app'}/en`,
      'fr': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://countries-cities-ar.vercel.app'}/fr`,
    },
  },
  category: "technology",
  classification: "Developer Tools, JavaScript Library, Geographic Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0d1117] text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
