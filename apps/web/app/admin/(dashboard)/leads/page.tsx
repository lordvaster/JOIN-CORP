import { Badge } from "@/components/ui/badge";
import { MarkHandledButton } from "@/components/admin/mark-handled-button";
import { adminFetch, type AdminLead } from "@/lib/admin-api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminLeadsPage() {
  const leads = (await adminFetch<AdminLead[]>("/leads")) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Pesan masuk dari form kontak di join.co.id.
      </p>

      {leads.length === 0 ? (
        <p className="glass mt-8 rounded-2xl p-8 text-center text-muted-foreground">
          Belum ada pesan masuk.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{lead.name}</h3>
                    {!lead.is_handled && (
                      <Badge variant="secondary" className="text-[10px]">Baru</Badge>
                    )}
                  </div>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {lead.email}
                  </a>
                  {lead.phone && (
                    <span className="ml-3 text-sm text-muted-foreground">{lead.phone}</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(lead.created_at)}
                </span>
              </div>

              {(lead.company || lead.service_interest) && (
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {lead.company && <span>Perusahaan: {lead.company}</span>}
                  {lead.service_interest && <span>· Minat: {lead.service_interest}</span>}
                </div>
              )}

              <p className="mt-4 text-sm text-foreground/90 whitespace-pre-line">
                {lead.message}
              </p>

              {!lead.is_handled && (
                <div className="mt-4">
                  <MarkHandledButton leadId={lead.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
