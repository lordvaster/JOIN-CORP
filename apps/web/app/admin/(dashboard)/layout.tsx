import type { ReactNode } from "react";

import { AuroraBackground } from "@/components/site/aurora-background";
import { SidebarNav } from "@/components/admin/sidebar-nav";
import { LogoutButton } from "@/components/admin/logout-button";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl gap-8 px-6 py-8">
      <AuroraBackground />

      <aside className="glass sticky top-8 hidden h-fit w-56 shrink-0 flex-col gap-6 rounded-2xl p-5 sm:flex">
        <span className="px-1 text-lg font-semibold text-gradient">JOIN Admin</span>
        <SidebarNav />
        <div className="mt-auto border-t border-white/10 pt-4">
          <LogoutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
