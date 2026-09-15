import Link from "next/link";
import { Inbox, Briefcase, MailWarning } from "lucide-react";

import { adminFetch, type AdminLead, type AdminService } from "@/lib/admin-api";

export default async function AdminOverviewPage() {
  const [leads, services] = await Promise.all([
    adminFetch<AdminLead[]>("/leads"),
    adminFetch<AdminService[]>("/services"),
  ]);

  const totalLeads = leads?.length ?? 0;
  const unhandled = leads?.filter((l) => !l.is_handled).length ?? 0;
  const totalServices = services?.length ?? 0;

  const cards = [
    { label: "Total leads", value: totalLeads, icon: Inbox, href: "/admin/leads" },
    { label: "Belum ditindaklanjuti", value: unhandled, icon: MailWarning, href: "/admin/leads" },
    { label: "Layanan aktif", value: totalServices, icon: Briefcase, href: "/admin/layanan" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Ringkasan</h1>
      <p className="mt-1 text-sm text-muted-foreground">Selamat datang kembali di admin JOIN.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="glass rounded-2xl p-6 transition-colors hover:bg-foreground/5"
            >
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-4 text-2xl font-semibold">{card.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{card.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
