import { notFound } from "next/navigation";

import { TestimonialForm } from "@/components/admin/testimonial-form";
import { adminFetch, type AdminTestimonial } from "@/lib/admin-api";

export default async function EditTestimonialPage(props: PageProps<"/admin/testimoni/[id]">) {
  const { id } = await props.params;
  const testimonials = (await adminFetch<AdminTestimonial[]>("/testimonials")) ?? [];
  const testimonial = testimonials.find((t) => t.id === Number(id));

  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Edit Testimoni</h1>
      <div className="mt-8">
        <TestimonialForm testimonial={testimonial} />
      </div>
    </div>
  );
}
