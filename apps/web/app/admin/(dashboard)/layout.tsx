import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/site/aurora-background";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { LogoutButton } from "@/components/admin/logout-button";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl gap-8 px-6 py-8">
      <AuroraBackground />

      <aside className="glass sticky top-8 hidden h-fit w-56 shrink-0 flex-col gap-6 rounded-2xl p-5 sm:flex">
        <div className="flex items-center justify-between px-1">
          <Logo />
          <ThemeToggle />
        </div>
        <SidebarNav />
        <div className="mt-auto border-t border-border pt-4">
          <LogoutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
