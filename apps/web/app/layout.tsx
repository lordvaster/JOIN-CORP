import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteChrome } from "@/components/site/site-chrome";
import { ThemeProvider } from "@/components/site/theme-provider";

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
    images: [{ url: "/brand/app-icon-512.png", width: 512, height: 512, alt: "JOIN" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PT Jofael Inovasi Nusantara",
  alternateName: "JOIN",
  url: siteUrl,
  logo: `${siteUrl}/brand/app-icon-512.png`,
  email: "corporate@join.co.id",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Kalibata VIII No. 18, RT 007, RW 013, Menteng, Jekan Raya",
    addressLocality: "Palangka Raya",
    addressRegion: "Kalimantan Tengah",
    postalCode: "73111",
    addressCountry: "ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
