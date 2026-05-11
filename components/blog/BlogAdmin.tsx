"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blog";

type Props = { initialPosts: BlogPostMeta[] };

export function BlogAdmin({ initialPosts }: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [formMode, setFormMode] = useState<"add" | "edit" | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const resetForm = () => {
    setForm({ slug: "", title: "", excerpt: "", content: "" });
    setFormMode(null);
    setEditingSlug(null);
    setError(null);
  };

  const openAdd = () => {
    resetForm();
    setFormMode("add");
  };

  const openEdit = (post: BlogPostMeta) => {
    fetch(`/api/blog/${encodeURIComponent(post.slug)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.content !== undefined) {
          setForm({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: data.content,
          });
          setEditingSlug(post.slug);
          setFormMode("edit");
        }
      })
      .catch(() => setError("Failed to load post"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (formMode === "add") {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to create");
        setPosts((prev) => [
          {
            slug: form.slug,
            title: form.title,
            date: new Date().toISOString().slice(0, 10),
            excerpt: form.excerpt,
          },
          ...prev,
        ]);
      } else {
        const res = await fetch(
          `/api/blog/${encodeURIComponent(editingSlug!)}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...form,
              newSlug: form.slug !== editingSlug ? form.slug : undefined,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to update");
        const updated = {
          slug: form.slug,
          title: form.title,
          date: posts.find((p) => p.slug === editingSlug)?.date ?? "",
          excerpt: form.excerpt,
        };
        setPosts((prev) => {
          const without = prev.filter((p) => p.slug !== editingSlug);
          return [updated, ...without].sort((a, b) =>
            b.date > a.date ? 1 : -1
          );
        });
      }
      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to delete");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
      setDeleteConfirm(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Need to fetch full post for editing - add a GET endpoint
  return (
    <div className="mt-12">
      <button
        type="button"
        onClick={openAdd}
        className="mb-8 rounded-xl bg-[var(--blue-royal)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--blue-soft)]"
      >
        Add new post
      </button>

      {formMode && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass-card mb-12 rounded-2xl p-6"
        >
          <h2 className="mb-6 text-lg font-semibold text-[var(--foreground)]">
            {formMode === "add" ? "New post" : "Edit post"}
          </h2>
          {error && (
            <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)]">
                Title
              </label>
              <input
                id="title"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[var(--foreground)] focus:border-[var(--blue-soft)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-[var(--foreground)]">
                Slug (URL)
              </label>
              <input
                id="slug"
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  }))
                }
                placeholder="my-post-title"
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[var(--foreground)] focus:border-[var(--blue-soft)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--foreground)]">
                Excerpt
              </label>
              <input
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-[var(--foreground)] focus:border-[var(--blue-soft)] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-[var(--foreground)]">
                Content (Markdown)
              </label>
              <textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={12}
                className="mt-1 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 font-mono text-sm text-[var(--foreground)] focus:border-[var(--blue-soft)] focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[var(--blue-royal)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--blue-soft)] disabled:opacity-50"
            >
              {loading ? "Saving…" : formMode === "add" ? "Create" : "Save"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--blue-soft)]"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <ul className="space-y-4">
        {posts.map((post) => (
          <motion.li
            key={post.slug}
            layout
            className="glass-card flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-[var(--foreground)]">{post.title}</h3>
              <p className="truncate text-sm text-[var(--muted-foreground)]">
                /blog/{post.slug}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:shrink-0">
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--blue-soft)]"
              >
                View
              </a>
              <button
                type="button"
                onClick={() => openEdit(post)}
                className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)] hover:border-[var(--blue-soft)]"
              >
                Edit
              </button>
              {deleteConfirm === post.slug ? (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    disabled={loading}
                    className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteConfirm(null)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(post.slug)}
                  className="rounded-lg border border-red-500/50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-500/10 dark:text-red-400"
                >
                  Delete
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      {error && !formMode && (
        <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
