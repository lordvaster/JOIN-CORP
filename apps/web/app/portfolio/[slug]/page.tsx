import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getPortfolioItem } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";

export default async function PortfolioDetailPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const item = await getPortfolioItem(slug);

  if (!item) notFound();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <FadeIn>
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Semua portfolio
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{item.title}</h1>
        {item.client_name && (
          <p className="mt-2 text-sm text-muted-foreground">Klien: {item.client_name}</p>
        )}
        <p className="mt-4 text-lg text-muted-foreground">{item.summary}</p>
        <div className="glass mt-8 rounded-2xl p-8 leading-relaxed whitespace-pre-line">
          {item.description}
        </div>
      </FadeIn>
    </section>
  );
}
