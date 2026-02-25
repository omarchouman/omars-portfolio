import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_NAME } from "@/lib/auth";

async function verifyToken(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const secret = process.env.BLOG_ADMIN_SECRET;
  if (!secret || secret.length < 32) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /blog/admin (but not /blog/admin/login)
  if (pathname === "/blog/admin" || pathname.startsWith("/blog/admin/")) {
    if (pathname === "/blog/admin/login") {
      return NextResponse.next();
    }
    const authed = await verifyToken(request);
    if (!authed) {
      return NextResponse.redirect(new URL("/blog/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // Protect API write routes
  if (pathname === "/api/blog" && request.method === "POST") {
    const authed = await verifyToken(request);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  if (pathname.startsWith("/api/blog/") && (request.method === "PUT" || request.method === "DELETE")) {
    const authed = await verifyToken(request);
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/admin", "/blog/admin/", "/blog/admin/:path*", "/api/blog", "/api/blog/:path*"],
};
