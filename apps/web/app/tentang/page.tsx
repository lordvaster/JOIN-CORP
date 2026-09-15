import type { Metadata } from "next";

import { getAboutContent, getTeam } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "PT Jofael Inovasi Nusantara (JOIN) adalah perusahaan pengembangan aplikasi e-commerce dan blockchain yang berbasis di Palangka Raya, Kalimantan Tengah.",
};

export default async function AboutPage() {
  const [about, team] = await Promise.all([getAboutContent(), getTeam()]);

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <FadeIn>
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Tentang Kami
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {about.heading}
          </h1>
          <p className="mt-6 whitespace-pre-line text-muted-foreground">{about.intro}</p>
        </FadeIn>
      </section>

      {team.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <FadeIn>
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight">
              Tim Kami
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {team.map((member, i) => (
              <FadeIn key={member.id} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 text-center">
                  {member.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      loading="lazy"
                      className="mx-auto h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="glass-strong mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                  )}
                  <h3 className="mt-4 font-medium">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
