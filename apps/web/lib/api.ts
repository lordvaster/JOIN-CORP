import { fallbackServices, fallbackTeam } from "@/lib/fallback-content";
import type {
  BlogPost,
  PortfolioItem,
  Service,
  Testimonial,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
// Dipakai hanya di kode server (Server Component): panggil FastAPI lewat
// jaringan internal Docker, tidak bergantung DNS publik/Cloudflare Tunnel.
const INTERNAL_API_URL = process.env.INTERNAL_API_URL ?? API_URL;

async function safeGet<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${INTERNAL_API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // Backend belum aktif/tidak terjangkau — tampilkan fallback agar halaman tetap utuh.
    return fallback;
  }
}

export const getServices = () => safeGet<Service[]>("/api/services", fallbackServices);

export const getService = (slug: string) =>
  safeGet<Service | null>(`/api/services/${slug}`, null);

export const getPortfolio = () => safeGet<PortfolioItem[]>("/api/portfolio", []);

export const getPortfolioItem = (slug: string) =>
  safeGet<PortfolioItem | null>(`/api/portfolio/${slug}`, null);

export const getBlogPosts = () => safeGet<BlogPost[]>("/api/blog", []);

export const getBlogPost = (slug: string) =>
  safeGet<BlogPost | null>(`/api/blog/${slug}`, null);

export const getTeam = () => safeGet("/api/team", fallbackTeam);

export const getTestimonials = () => safeGet<Testimonial[]>("/api/testimonials", []);

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest?: string;
  message: string;
};

export async function submitContact(payload: ContactPayload) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail ?? "Gagal mengirim pesan. Coba lagi nanti.");
  }

  return res.json();
}
