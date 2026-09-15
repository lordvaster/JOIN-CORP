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
import type { AdminPortfolioItem } from "@/lib/admin-api";

const portfolioSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda strip"),
  title: z.string().min(2, "Judul wajib diisi"),
  client_name: z.string().optional(),
  summary: z.string().min(5, "Ringkasan minimal 5 karakter").max(300),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  cover_image_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
  tags: z.string(),
  order: z.number().int().min(0),
  is_published: z.boolean(),
});

type PortfolioFormValues = z.infer<typeof portfolioSchema>;

export function PortfolioForm({ item }: { item?: AdminPortfolioItem }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: item
      ? { ...item, client_name: item.client_name ?? "", cover_image_url: item.cover_image_url ?? "" }
      : {
          slug: "",
          title: "",
          client_name: "",
          summary: "",
          description: "",
          cover_image_url: "",
          tags: "",
          order: 0,
          is_published: true,
        },
  });

  async function onSubmit(values: PortfolioFormValues) {
    setError(null);
    const payload = {
      ...values,
      client_name: values.client_name || null,
      cover_image_url: values.cover_image_url || null,
    };
    const url = item ? `/api/admin/proxy/portfolio/${item.id}` : "/api/admin/proxy/portfolio";

    const res = await fetch(url, {
      method: item ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan portfolio");
      return;
    }

    router.push("/admin/portfolio");
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
          <Input id="slug" placeholder="nama-proyek" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="client_name">Nama Klien (opsional)</Label>
          <Input id="client_name" {...register("client_name")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (pisahkan koma)</Label>
          <Input id="tags" placeholder="e-commerce, blockchain" {...register("tags")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cover_image_url">URL Gambar Sampul (opsional)</Label>
        <Input id="cover_image_url" placeholder="https://..." {...register("cover_image_url")} />
        {errors.cover_image_url && (
          <p className="text-xs text-destructive">{errors.cover_image_url.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Ringkasan (tampil di kartu)</Label>
        <Textarea id="summary" rows={2} {...register("summary")} />
        {errors.summary && <p className="text-xs text-destructive">{errors.summary.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi lengkap studi kasus</Label>
        <Textarea id="description" rows={6} {...register("description")} />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="order">Urutan</Label>
          <Input id="order" type="number" {...register("order", { valueAsNumber: true })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="is_published">Status</Label>
          <select
            id="is_published"
            {...register("is_published", { setValueAs: (v) => v === "true" || v === true })}
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
