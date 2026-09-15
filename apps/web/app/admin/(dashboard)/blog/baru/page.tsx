import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tulis Artikel</h1>
      <div className="mt-8">
        <BlogForm />
      </div>
    </div>
  );
}
