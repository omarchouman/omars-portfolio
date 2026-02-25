import { NextRequest, NextResponse } from "next/server";
import { createBlogAdminToken, getBlogAdminCookieAttributes } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const password = process.env.BLOG_ADMIN_PASSWORD;
    if (!password) {
      return NextResponse.json(
        { error: "Blog admin is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const submitted = body.password ?? "";

    if (submitted !== password) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = await createBlogAdminToken();
    const { name, options } = getBlogAdminCookieAttributes();
    const cookieStore = await cookies();
    cookieStore.set(name, token, options);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Authentication failed." },
      { status: 500 }
    );
  }
}
