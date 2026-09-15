import "server-only";

import { getAdminToken } from "@/lib/admin-session";

const API_URL = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Fetch langsung dari Server Component ke FastAPI, memakai token admin dari
 * cookie httpOnly. Mengembalikan null jika belum login atau request gagal —
 * pemanggil (page) yang memutuskan mau redirect ke /admin/login atau tidak.
 */
export async function adminFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const token = await getAdminToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/admin${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  if (res.status === 204) return null;
  return (await res.json()) as T;
}

export type AdminLead = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  message: string;
  is_handled: boolean;
  created_at: string;
};

export type AdminService = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  order: number;
  is_published: boolean;
};
