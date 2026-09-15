import { notFound } from "next/navigation";

import { PortfolioForm } from "@/components/admin/portfolio-form";
import { adminFetch, type AdminPortfolioItem } from "@/lib/admin-api";

export default async function EditPortfolioPage(props: PageProps<"/admin/portfolio/[id]">) {
  const { id } = await props.params;
  const items = (await adminFetch<AdminPortfolioItem[]>("/portfolio")) ?? [];
  const item = items.find((s) => s.id === Number(id));

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Portfolio</h1>
      <div className="mt-8">
        <PortfolioForm item={item} />
      </div>
    </div>
  );
}
