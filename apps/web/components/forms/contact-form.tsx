"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContact } from "@/lib/api";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, "Ceritakan sedikit lebih detail (minimal 10 karakter)"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SERVICE_OPTIONS = [
  { value: "pengembangan-ecommerce", label: "Pengembangan E-Commerce" },
  { value: "solusi-blockchain", label: "Solusi Blockchain" },
  { value: "pengembangan-aplikasi-custom", label: "Aplikasi Custom" },
  { value: "lainnya", label: "Lainnya" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serviceInterest, setServiceInterest] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setErrorMessage(null);
    try {
      await submitContact({ ...values, service_interest: serviceInterest });
      setStatus("success");
      reset();
      setServiceInterest(undefined);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan");
    }
  }

  if (status === "success") {
    return (
      <div className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h3 className="text-lg font-medium">Pesan terkirim</h3>
        <p className="text-sm text-muted-foreground">
          Terima kasih! Tim JOIN akan menghubungi Anda secepatnya.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setStatus("idle")}>
          Kirim pesan lain
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass space-y-5 rounded-2xl p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" placeholder="Nama lengkap" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nama@perusahaan.com" {...register("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">No. WhatsApp (opsional)</Label>
          <Input id="phone" placeholder="08xx-xxxx-xxxx" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Perusahaan (opsional)</Label>
          <Input id="company" placeholder="Nama perusahaan" {...register("company")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service_interest">Layanan yang diminati</Label>
        <Select
          value={serviceInterest}
          onValueChange={(value) => setServiceInterest(value ?? undefined)}
        >
          <SelectTrigger id="service_interest" className="w-full">
            <SelectValue placeholder="Pilih layanan" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Pesan</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Ceritakan kebutuhan aplikasi Anda..."
          {...register("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" className="w-full glow-primary" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Kirim Pesan
      </Button>
    </form>
  );
}
