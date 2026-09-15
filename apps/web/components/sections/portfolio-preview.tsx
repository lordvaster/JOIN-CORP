import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getPortfolio } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";
import { CoverImage } from "@/components/site/cover-image";
import { Button } from "@/components/ui/button";

export async function PortfolioPreview() {
  const items = await getPortfolio();

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium tracking-wide text-primary uppercase">
              Portfolio
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Studi kasus terbaru
            </h2>
          </div>
          <Button render={<Link href="/portfolio" />} variant="ghost">
            Lihat semua <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 3).map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.08}>
            <Link
              href={`/portfolio/${item.slug}`}
              className="glass group flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 hover:bg-foreground/5"
            >
              <div>
                <CoverImage src={item.cover_image_url} alt={item.title} className="mb-4" />
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center text-sm text-primary">
                Lihat studi kasus
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
