import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Layanan</h1>
      <div className="mt-8">
        <ServiceForm />
      </div>
    </div>
  );
}
