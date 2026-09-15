import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AboutForm } from "@/components/admin/about-form";
import { DeleteResourceButton } from "@/components/admin/delete-resource-button";
import { adminFetch, type AdminAboutContent, type AdminTeamMember } from "@/lib/admin-api";

export default async function AdminAboutPage() {
  const [about, team] = await Promise.all([
    adminFetch<AdminAboutContent>("/about"),
    adminFetch<AdminTeamMember[]>("/team"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tentang Kami</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Teks dan tim yang tampil di halaman /tentang.
      </p>

      <div className="mt-8">
        <AboutForm about={about ?? { heading: "", intro: "" }} />
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Tim</h2>
        <Button render={<Link href="/admin/tentang/tim/baru" />}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {(team ?? []).map((member) => (
          <div key={member.id} className="glass flex items-center justify-between gap-4 rounded-2xl p-5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{member.name}</h3>
                <Badge variant={member.is_published ? "secondary" : "outline"} className="text-[10px]">
                  {member.is_published ? "Tayang" : "Draft"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                render={<Link href={`/admin/tentang/tim/${member.id}`} />}
                size="icon-sm"
                variant="ghost"
                aria-label="Edit anggota tim"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <DeleteResourceButton resourcePath={`team/${member.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
