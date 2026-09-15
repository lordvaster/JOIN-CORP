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
import type { AdminTeamMember } from "@/lib/admin-api";

const teamMemberSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  role: z.string().min(1, "Jabatan wajib diisi"),
  photo_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
  bio: z.string(),
  order: z.number().int().min(0),
  is_published: z.boolean(),
});

type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

export function TeamMemberForm({ member }: { member?: AdminTeamMember }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member
      ? { ...member, photo_url: member.photo_url ?? "" }
      : { name: "", role: "", photo_url: "", bio: "", order: 0, is_published: true },
  });

  async function onSubmit(values: TeamMemberFormValues) {
    setError(null);
    const payload = { ...values, photo_url: values.photo_url || null };
    const url = member ? `/api/admin/proxy/team/${member.id}` : "/api/admin/proxy/team";

    const res = await fetch(url, {
      method: member ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.detail ?? "Gagal menyimpan anggota tim");
      return;
    }

    router.push("/admin/tentang");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass max-w-xl space-y-5 rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Jabatan</Label>
          <Input id="role" placeholder="Founder, CTO, dsb." {...register("role")} />
          {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="photo_url">URL Foto (opsional)</Label>
        <Input id="photo_url" placeholder="https://..." {...register("photo_url")} />
        {errors.photo_url && <p className="text-xs text-destructive">{errors.photo_url.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio singkat</Label>
        <Textarea id="bio" rows={3} {...register("bio")} />
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
