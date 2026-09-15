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
import type { AdminBlogPost } from "@/lib/admin-api";

const blogSchema = z.object({
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda strip"),
  title: z.string().min(2, "Judul wajib diisi"),
  excerpt: z.string().min(5, "Ringkasan minimal 5 karakter").max(400),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  cover_image_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
  author_name: z.string().min(1, "Nama penulis wajib diisi"),
  is_published: z.boolean(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export function BlogForm({ post }: { post?: AdminBlogPost }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: post
      ? { ...post, cover_image_url: post.cover_image_url ?? "" }
      : {
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          cover_image_url: "",
          author_name: "Tim JOIN",
          is_published: false,
        },
  });

  async function onSubmit(values: BlogFormValues) {
    setError(null);
    const payload = { ...values, cover_image_url: values.cover_image_url || null };
    const url = post ? `/api/admin/proxy/blog/${post.id}` : "/api/admin/proxy/blog";

    const res = await fetch(url, {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan artikel");
      return;
    }

    router.push("/admin/blog");
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
          <Input id="slug" placeholder="judul-artikel" {...register("slug")} />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="author_name">Penulis</Label>
          <Input id="author_name" {...register("author_name")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover_image_url">URL Gambar Sampul (opsional)</Label>
          <Input id="cover_image_url" placeholder="https://..." {...register("cover_image_url")} />
          {errors.cover_image_url && (
            <p className="text-xs text-destructive">{errors.cover_image_url.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan (tampil di daftar blog)</Label>
        <Textarea id="excerpt" rows={2} {...register("excerpt")} />
        {errors.excerpt && <p className="text-xs text-destructive">{errors.excerpt.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Isi artikel</Label>
        <Textarea id="content" rows={10} {...register("content")} />
        {errors.content && <p className="text-xs text-destructive">{errors.content.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="is_published">Status</Label>
        <select
          id="is_published"
          {...register("is_published", { setValueAs: (v) => v === "true" || v === true })}
          className="border-input bg-background/50 h-9 w-full max-w-xs rounded-lg border px-3 text-sm"
        >
          <option value="false">Draft</option>
          <option value="true">Tayang</option>
        </select>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="glow-primary" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Simpan
      </Button>
    </form>
  );
}
