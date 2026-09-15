import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE } from "@/lib/admin-session";

const API_URL = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const form = new URLSearchParams();
  form.set("username", email ?? "");
  form.set("password", password ?? "");

  const res = await fetch(`${API_URL}/api/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    return NextResponse.json(
      { detail: data?.detail ?? "Login gagal" },
      { status: res.status },
    );
  }

  const { access_token } = await res.json();

  (await cookies()).set(ADMIN_COOKIE, access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
