import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/site/fade-in";

export function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32">
      <FadeIn>
        <Badge variant="secondary" className="glass mb-6 px-4 py-1.5 text-xs font-medium tracking-wide uppercase">
          PT Jofael Inovasi Nusantara
        </Badge>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          Membangun{" "}
          <span className="text-gradient">Masa Depan Digital</span> untuk
          Bisnis Anda
        </h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          JOIN merancang dan membangun aplikasi e-commerce serta solusi
          berbasis blockchain—cepat, aman, dan siap untuk bertumbuh bersama
          bisnis Anda.
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            render={<Link href="/kontak" />}
            size="lg"
            className="glow-primary group"
          >
            Konsultasi Gratis
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            render={<Link href="/portfolio" />}
            size="lg"
            variant="outline"
            className="glass"
          >
            Lihat Portfolio
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
