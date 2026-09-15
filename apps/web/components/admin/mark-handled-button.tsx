"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MarkHandledButton({ leadId }: { leadId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/proxy/leads/${leadId}/handled`, {
        method: "PATCH",
      });
      if (!res.ok) {
        setError("Gagal memperbarui");
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" variant="outline" onClick={handleClick} disabled={isPending}>
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        Tandai selesai
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}
