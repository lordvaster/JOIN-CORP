import { FadeIn } from "@/components/site/fade-in";

const STATS = [
  { value: "2026", label: "Tahun berdiri" },
  { value: "2", label: "Fokus keahlian: E-commerce & Blockchain" },
  { value: "100%", label: "Pengembangan custom, bukan template" },
  { value: "Kalteng", label: "Berbasis di Palangka Raya" },
];

export function StatsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="glass grid grid-cols-2 gap-8 rounded-2xl p-8 sm:grid-cols-4 sm:p-10">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08} className="text-center sm:text-left">
            <div className="text-2xl font-semibold text-gradient sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
