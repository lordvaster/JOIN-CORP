"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DeleteServiceButton({ serviceId }: { serviceId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await fetch(`/api/admin/proxy/services/${serviceId}`, { method: "DELETE" });
      router.refresh();
    });
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Yakin hapus?</span>
        <Button size="sm" variant="destructive" onClick={handleDelete} disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ya, hapus"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
          Batal
        </Button>
      </div>
    );
  }

  return (
    <Button size="icon-sm" variant="ghost" onClick={() => setConfirming(true)} aria-label="Hapus layanan">
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
  );
}
