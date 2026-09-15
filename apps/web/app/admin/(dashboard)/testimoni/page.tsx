import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteResourceButton } from "@/components/admin/delete-resource-button";
import { adminFetch, type AdminTestimonial } from "@/lib/admin-api";

export default async function AdminTestimonialsPage() {
  const testimonials = (await adminFetch<AdminTestimonial[]>("/testimonials")) ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Testimoni</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kutipan klien untuk halaman publik.</p>
        </div>
        <Button render={<Link href="/admin/testimoni/baru" />}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Testimoni
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <p className="glass mt-8 rounded-2xl p-8 text-center text-muted-foreground">
          Belum ada testimoni.
        </p>
      ) : (
        <div className="mt-8 space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{t.author_name}</h3>
                  <Badge variant={t.is_published ? "secondary" : "outline"} className="text-[10px]">
                    {t.is_published ? "Tayang" : "Draft"}
                  </Badge>
                </div>
                {t.author_role && (
                  <p className="text-xs text-muted-foreground">{t.author_role}</p>
                )}
                <p className="mt-1 text-sm text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  render={<Link href={`/admin/testimoni/${t.id}`} />}
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Edit testimoni"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <DeleteResourceButton resourcePath={`testimonials/${t.id}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
