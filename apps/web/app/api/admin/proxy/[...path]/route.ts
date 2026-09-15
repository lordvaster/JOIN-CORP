import { NextResponse, type NextRequest } from "next/server";

import { getAdminToken } from "@/lib/admin-session";

const API_URL = process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Params = Promise<{ path: string[] }>;

/**
 * Proxy generik: client component memanggil /api/admin/proxy/<resource>,
 * handler ini menempelkan header Authorization dari cookie httpOnly
 * (tidak pernah diekspos ke JS browser) lalu meneruskan ke FastAPI.
 */
async function forward(req: NextRequest, params: Params) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const { path } = await params;
  const target = `${API_URL}/api/admin/${path.join("/")}${req.nextUrl.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.text();
  }

  const res = await fetch(target, init);
  const body = await res.text();

  return new NextResponse(body || null, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function GET(req: NextRequest, ctx: { params: Params }) {
  return forward(req, ctx.params);
}
export async function POST(req: NextRequest, ctx: { params: Params }) {
  return forward(req, ctx.params);
}
export async function PUT(req: NextRequest, ctx: { params: Params }) {
  return forward(req, ctx.params);
}
export async function PATCH(req: NextRequest, ctx: { params: Params }) {
  return forward(req, ctx.params);
}
export async function DELETE(req: NextRequest, ctx: { params: Params }) {
  return forward(req, ctx.params);
}
