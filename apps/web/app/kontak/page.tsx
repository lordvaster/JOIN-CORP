import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { FadeIn } from "@/components/site/fade-in";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Hubungi JOIN untuk konsultasi gratis kebutuhan aplikasi e-commerce atau blockchain Anda.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Kontak
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Mari mulai percakapan
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Isi form di bawah dan tim kami akan menghubungi Anda dalam 1x24 jam.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr]">
        <FadeIn delay={0.1} className="space-y-6">
          <div className="glass flex items-start gap-4 rounded-2xl p-5">
            <Mail className="mt-1 h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Email</div>
              <a
                href="mailto:jofaelinovasinusantara@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                jofaelinovasinusantara@gmail.com
              </a>
            </div>
          </div>
          <div className="glass flex items-start gap-4 rounded-2xl p-5">
            <MapPin className="mt-1 h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Alamat</div>
              <p className="text-sm text-muted-foreground">
                Jl. Kalibata VIII No. 18, RT 007, RW 013, Menteng, Jekan Raya,
                Kota Palangka Raya, Kalimantan Tengah 73111
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
