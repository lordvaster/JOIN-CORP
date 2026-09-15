import { notFound } from "next/navigation";

import { TeamMemberForm } from "@/components/admin/team-member-form";
import { adminFetch, type AdminTeamMember } from "@/lib/admin-api";

export default async function EditTeamMemberPage(props: PageProps<"/admin/tentang/tim/[id]">) {
  const { id } = await props.params;
  const members = (await adminFetch<AdminTeamMember[]>("/team")) ?? [];
  const member = members.find((m) => m.id === Number(id));

  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Anggota Tim</h1>
      <div className="mt-8">
        <TeamMemberForm member={member} />
      </div>
    </div>
  );
}
