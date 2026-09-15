import { PortfolioForm } from "@/components/admin/portfolio-form";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Portfolio</h1>
      <div className="mt-8">
        <PortfolioForm />
      </div>
    </div>
  );
}
