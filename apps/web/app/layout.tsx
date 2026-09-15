import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/site/site-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://join.co.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JOIN — Jofael Inovasi Nusantara",
    template: "%s | JOIN",
  },
  description:
    "JOIN (PT Jofael Inovasi Nusantara) membangun aplikasi e-commerce dan solusi blockchain untuk bisnis modern di Indonesia.",
  openGraph: {
    title: "JOIN — Jofael Inovasi Nusantara",
    description:
      "Mitra pengembangan aplikasi e-commerce & blockchain yang cepat, aman, dan siap skala.",
    url: siteUrl,
    siteName: "JOIN",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
