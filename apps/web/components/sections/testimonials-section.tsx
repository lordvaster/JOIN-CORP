import { Quote } from "lucide-react";

import { getTestimonials } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 max-w-xl">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Testimoni
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Kata klien tentang JOIN
          </h2>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <FadeIn key={t.id} delay={i * 0.08}>
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <Quote className="h-6 w-6 text-primary/70" />
              <p className="mt-4 flex-1 text-sm text-foreground/90 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-sm font-medium">{t.author_name}</div>
                {t.author_role && (
                  <div className="text-xs text-muted-foreground">{t.author_role}</div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
