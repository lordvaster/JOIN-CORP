import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Tambah Testimoni</h1>
      <div className="mt-8">
        <TestimonialForm />
      </div>
    </div>
  );
}
