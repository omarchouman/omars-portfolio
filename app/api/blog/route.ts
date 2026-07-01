import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/blog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, excerpt, content } = body;
    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required." },
        { status: 400 }
      );
    }
    const result = createPost(
      String(slug).trim().toLowerCase().replace(/\s+/g, "-"),
      String(title),
      String(excerpt ?? ""),
      String(content ?? "")
    );
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
