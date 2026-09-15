import { notFound } from "next/navigation";

import { BlogForm } from "@/components/admin/blog-form";
import { adminFetch, type AdminBlogPost } from "@/lib/admin-api";

export default async function EditBlogPostPage(props: PageProps<"/admin/blog/[id]">) {
  const { id } = await props.params;
  const posts = (await adminFetch<AdminBlogPost[]>("/blog")) ?? [];
  const post = posts.find((p) => p.id === Number(id));

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Artikel</h1>
      <div className="mt-8">
        <BlogForm post={post} />
      </div>
    </div>
  );
}
