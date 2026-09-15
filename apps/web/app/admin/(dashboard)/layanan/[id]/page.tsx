import { notFound } from "next/navigation";

import { ServiceForm } from "@/components/admin/service-form";
import { adminFetch, type AdminService } from "@/lib/admin-api";

export default async function EditServicePage(props: PageProps<"/admin/layanan/[id]">) {
  const { id } = await props.params;
  const services = (await adminFetch<AdminService[]>("/services")) ?? [];
  const service = services.find((s) => s.id === Number(id));

  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Layanan</h1>
      <div className="mt-8">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
