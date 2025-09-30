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
  title: "🌍 دول ومدن العالم | Countries & Cities",
  description: "مكتبة شاملة تضم 250 دولة و 4,642 محافظة/مدينة بـ 3 لغات (عربي، إنجليزي، فرنسي). A comprehensive library with 250 countries and 4,642 states/cities in 3 languages.",
  keywords: ["countries", "cities", "states", "دول", "مدن", "محافظات", "arabic", "multilingual", "typescript", "library"],
  authors: [{ name: "Countries Cities AR" }],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "🌍 دول ومدن العالم | Countries & Cities",
    description: "مكتبة شاملة تضم 250 دولة و 4,642 محافظة/مدينة بـ 3 لغات",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🌍 دول ومدن العالم | Countries & Cities",
    description: "مكتبة شاملة تضم 250 دولة و 4,642 محافظة/مدينة بـ 3 لغات",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
