import { TeamMemberForm } from "@/components/admin/team-member-form";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Anggota Tim</h1>
      <div className="mt-8">
        <TeamMemberForm />
      </div>
    </div>
  );
}
