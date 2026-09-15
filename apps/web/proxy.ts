import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_COOKIE } from "@/lib/admin-session";

/**
 * Optimistic check saja (baca cookie, tanpa verifikasi JWT) sesuai anjuran
 * Next.js — validasi sesungguhnya tetap di FastAPI lewat setiap panggilan
 * adminFetch/proxy route. Ini hanya mencegah flash halaman dashboard
 * sebelum redirect ke /admin/login.
 */
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get(ADMIN_COOKIE)?.value);

  const isLoginPage = pathname === "/admin/login";
  const isAdminArea = pathname.startsWith("/admin") && !isLoginPage;

  if (isAdminArea && !hasSession) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && hasSession) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
