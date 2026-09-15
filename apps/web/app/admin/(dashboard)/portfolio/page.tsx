import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteResourceButton } from "@/components/admin/delete-resource-button";
import { adminFetch, type AdminPortfolioItem } from "@/lib/admin-api";

export default async function AdminPortfolioPage() {
  const items = (await adminFetch<AdminPortfolioItem[]>("/portfolio")) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Studi kasus yang tampil di halaman /portfolio.
          </p>
        </div>
        <Button render={<Link href="/admin/portfolio/baru" />}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Portfolio
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="glass mt-8 rounded-2xl p-8 text-center text-muted-foreground">
          Belum ada portfolio.
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant={item.is_published ? "secondary" : "outline"} className="text-[10px]">
                    {item.is_published ? "Tayang" : "Draft"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  render={<Link href={`/admin/portfolio/${item.id}`} />}
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Edit portfolio"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteResourceButton resourcePath={`portfolio/${item.id}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
