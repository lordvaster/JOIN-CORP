import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getBlogPost } from "@/lib/api";
import { FadeIn } from "@/components/site/fade-in";

export default async function BlogDetailPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Semua artikel
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Oleh {post.author_name}</p>
        <div className="mt-8 leading-relaxed whitespace-pre-line text-foreground/90">
          {post.content}
        </div>
      </FadeIn>
    </article>
  );
}
