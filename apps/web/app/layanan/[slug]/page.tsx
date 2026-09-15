import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/site/fade-in";

export async function generateMetadata(props: PageProps<"/layanan/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = await getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServiceDetailPage(props: PageProps<"/layanan/[slug]">) {
  const { slug } = await props.params;
  const service = await getService(slug);

  if (!service) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <FadeIn>
        <Link
          href="/layanan"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Semua layanan
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {service.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{service.summary}</p>
        <div className="glass mt-8 rounded-2xl p-8 leading-relaxed whitespace-pre-line">
          {service.description}
        </div>
        <Button render={<Link href="/kontak" />} size="lg" className="mt-10 glow-primary">
          Diskusikan Kebutuhan Anda <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </FadeIn>
    </section>
  );
}
