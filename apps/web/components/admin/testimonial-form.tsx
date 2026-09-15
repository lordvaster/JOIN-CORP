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
import type { AdminTestimonial } from "@/lib/admin-api";

const testimonialSchema = z.object({
  author_name: z.string().min(2, "Nama wajib diisi"),
  author_role: z.string(),
  quote: z.string().min(5, "Kutipan minimal 5 karakter"),
  order: z.number().int().min(0),
  is_published: z.boolean(),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

export function TestimonialForm({ testimonial }: { testimonial?: AdminTestimonial }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial ?? {
      author_name: "",
      author_role: "",
      quote: "",
      order: 0,
      is_published: true,
    },
  });

  async function onSubmit(values: TestimonialFormValues) {
    setError(null);
    const url = testimonial
      ? `/api/admin/proxy/testimonials/${testimonial.id}`
      : "/api/admin/proxy/testimonials";

    const res = await fetch(url, {
      method: testimonial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan testimoni");
      return;
    }

    router.push("/admin/testimoni");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-xl space-y-5 rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="author_name">Nama</Label>
          <Input id="author_name" {...register("author_name")} />
          {errors.author_name && (
            <p className="text-xs text-destructive">{errors.author_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="author_role">Jabatan / Perusahaan</Label>
          <Input id="author_role" placeholder="CEO, PT Contoh" {...register("author_role")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Kutipan testimoni</Label>
        <Textarea id="quote" rows={4} {...register("quote")} />
        {errors.quote && <p className="text-xs text-destructive">{errors.quote.message}</p>}
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
