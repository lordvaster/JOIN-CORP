import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Link as LinkIcon,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import { getServices } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";
import type { Service } from "@/lib/types";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "shopping-bag": ShoppingBag,
  link: LinkIcon,
  code: Code2,
  sparkles: Sparkles,
};

export async function ServicesBento() {
  const services = await getServices();

  if (services.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 max-w-xl">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Layanan
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Solusi digital end-to-end
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <FadeIn key={service.id} delay={i * 0.08}>
            <ServiceCard service={service} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Sparkles;

  return (
    <Link
      href={`/layanan/${service.slug}`}
      className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors hover:bg-foreground/5"
    >
      <div>
        <div className="glass-strong mb-5 flex h-11 w-11 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-medium">{service.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
      </div>
      <ArrowUpRight className="mt-6 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
    </Link>
  );
}
