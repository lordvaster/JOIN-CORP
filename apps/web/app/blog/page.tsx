import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getBlogPosts } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";
import { CoverImage } from "@/components/site/cover-image";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artikel dan insight seputar pengembangan aplikasi, e-commerce, dan blockchain dari tim JOIN.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <FadeIn>
        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Blog
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Insight dari JOIN
          </h1>
        </div>
      </FadeIn>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Artikel pertama kami akan segera hadir.
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass group flex flex-col gap-4 overflow-hidden rounded-2xl p-6 hover:bg-foreground/5 sm:flex-row sm:items-center"
              >
                {post.cover_image_url && (
                  <CoverImage
                    src={post.cover_image_url}
                    alt={post.title}
                    className="sm:w-48 sm:shrink-0"
                  />
                )}
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg font-medium">{post.title}</h2>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm text-primary">
                    Baca selengkapnya
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
