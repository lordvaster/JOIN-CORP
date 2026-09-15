import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/fade-in";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="glass-strong glow-primary relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Punya ide aplikasi? Mari wujudkan bersama JOIN.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Ceritakan kebutuhan bisnis Anda, tim kami akan membantu merancang
            solusi e-commerce atau blockchain yang tepat.
          </p>
          <Button render={<Link href="/kontak" />} size="lg" className="mt-8">
            Mulai Konsultasi <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
