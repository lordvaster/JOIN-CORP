import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getPortfolio } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Studi kasus proyek e-commerce dan blockchain yang dikerjakan oleh JOIN.",
};

export default async function PortfolioPage() {
  const items = await getPortfolio();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Portfolio
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Studi kasus kami
          </h1>
        </div>
      </FadeIn>

      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Studi kasus pertama kami sedang dalam proses—nantikan kabar baiknya!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.08}>
              <Link
                href={`/portfolio/${item.slug}`}
                className="glass group flex h-full flex-col justify-between rounded-2xl p-6 hover:bg-white/[0.08]"
              >
                <div>
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
      )}
    </div>
  );
}
