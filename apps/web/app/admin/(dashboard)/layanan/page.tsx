import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteServiceButton } from "@/components/admin/delete-service-button";
import { adminFetch, type AdminService } from "@/lib/admin-api";

export default async function AdminServicesPage() {
  const services = (await adminFetch<AdminService[]>("/services")) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Layanan</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Konten yang tampil di halaman /layanan.
          </p>
        </div>
        <Button render={<Link href="/admin/layanan/baru" />}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Layanan
        </Button>
      </div>

      <div className="mt-8 space-y-3">
        {services.map((service) => (
          <div key={service.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{service.title}</h3>
                <Badge variant={service.is_published ? "secondary" : "outline"} className="text-[10px]">
                  {service.is_published ? "Tayang" : "Draft"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{service.summary}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                render={<Link href={`/admin/layanan/${service.id}`} />}
                size="icon-sm"
                variant="ghost"
                aria-label="Edit layanan"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <DeleteServiceButton serviceId={service.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
