import type { Metadata } from "next";

import { getServices } from "@/lib/api";
import { ServicesBento } from "@/components/sections/services-bento";
import { FadeIn } from "@/components/site/fade-in";

export const metadata: Metadata = {
  title: "Layanan",
  description: "Layanan pengembangan aplikasi e-commerce, blockchain, dan custom software dari JOIN.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-4 text-center">
        <FadeIn>
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Layanan
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Solusi digital yang kami tawarkan
          </h1>
        </FadeIn>
      </section>

      {services.length > 0 ? <ServicesBento /> : (
        <p className="mx-auto max-w-xl px-6 py-20 text-center text-muted-foreground">
          Konten layanan sedang disiapkan.
        </p>
      )}
    </div>
  );
}
