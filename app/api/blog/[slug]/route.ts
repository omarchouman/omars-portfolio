import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, updatePost, deletePost } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const post = getPostBySlug(decodeURIComponent(slug));
    if (!post) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load post." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { title, excerpt, content, newSlug } = body;
    if (!title) {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }
    const result = updatePost(
      decodeURIComponent(slug),
      String(title),
      String(excerpt ?? ""),
      String(content ?? ""),
      newSlug ? String(newSlug).trim().toLowerCase().replace(/\s+/g, "-") : undefined
    );
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { slug } = await params;
    const result = deletePost(decodeURIComponent(slug));
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
