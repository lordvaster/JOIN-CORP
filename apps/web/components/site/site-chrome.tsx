"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { AuroraBackground } from "@/components/site/aurora-background";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AuroraBackground />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
