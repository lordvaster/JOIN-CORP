"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AdminAboutContent } from "@/lib/admin-api";

const aboutSchema = z.object({
  heading: z.string().min(2, "Judul wajib diisi"),
  intro: z.string().min(10, "Teks minimal 10 karakter"),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export function AboutForm({ about }: { about: AdminAboutContent }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: about,
  });

  async function onSubmit(values: AboutFormValues) {
    setError(null);
    setSaved(false);
    const res = await fetch("/api/admin/proxy/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan");
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-2xl space-y-5 rounded-2xl p-8">
      <div className="space-y-2">
        <Label htmlFor="heading">Judul</Label>
        <Input id="heading" {...register("heading")} />
        {errors.heading && <p className="text-xs text-destructive">{errors.heading.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="intro">Teks pengantar</Label>
        <Textarea id="intro" rows={6} {...register("intro")} />
        {errors.intro && <p className="text-xs text-destructive">{errors.intro.message}</p>}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" className="glow-primary" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Simpan
        </Button>
        {saved && !isSubmitting && (
          <span className="inline-flex items-center gap-1 text-sm text-primary">
            <CheckCircle2 className="h-4 w-4" /> Tersimpan
          </span>
        )}
      </div>
    </form>
  );
}
