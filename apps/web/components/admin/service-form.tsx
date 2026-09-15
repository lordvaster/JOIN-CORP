"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AdminService } from "@/lib/admin-api";

const serviceSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda strip"),
  title: z.string().min(2, "Judul wajib diisi"),
  summary: z.string().min(5, "Ringkasan minimal 5 karakter").max(300),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  icon: z.string().min(1, "Pilih salah satu ikon"),
  order: z.number().int().min(0),
  is_published: z.boolean(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

const ICON_OPTIONS = ["shopping-bag", "link", "code", "sparkles"];

export function ServiceForm({ service }: { service?: AdminService }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service ?? {
      slug: "",
      title: "",
      summary: "",
      description: "",
      icon: "sparkles",
      order: 0,
      is_published: true,
    },
  });

  async function onSubmit(values: ServiceFormValues) {
    setError(null);
    const url = service
      ? `/api/admin/proxy/services/${service.id}`
      : "/api/admin/proxy/services";

    const res = await fetch(url, {
      method: service ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan layanan");
      return;
    }

    router.push("/admin/layanan");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-2xl space-y-5 rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Judul</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" placeholder="pengembangan-ecommerce" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Ringkasan (tampil di kartu)</Label>
        <Textarea id="summary" rows={2} {...register("summary")} />
        {errors.summary && <p className="text-xs text-destructive">{errors.summary.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi lengkap</Label>
        <Textarea id="description" rows={6} {...register("description")} />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="icon">Ikon</Label>
          <select
            id="icon"
            {...register("icon")}
            className="border-input bg-background/50 h-9 w-full rounded-lg border px-3 text-sm"
          >
            {ICON_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Urutan</Label>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="is_published">Status</Label>
          <select
            id="is_published"
            {...register("is_published", {
              setValueAs: (v) => v === "true" || v === true,
            })}
            className="border-input bg-background/50 h-9 w-full rounded-lg border px-3 text-sm"
          >
            <option value="true">Tayang</option>
            <option value="false">Draft</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="glow-primary" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Simpan
      </Button>
    </form>
  );
}
