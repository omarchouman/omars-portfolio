import { NextResponse } from "next/server";
import { getBlogAdminCookieAttributes, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    ...getBlogAdminCookieAttributes().options,
    maxAge: 0,
  });
  return NextResponse.json({ success: true });
}
