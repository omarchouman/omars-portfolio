"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BlogPostMeta } from "@/lib/blog";
import { projects } from "@/lib/projects";

const EMAIL = "omar.chouman0@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/omarchouman";

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

type CommandPaletteContextValue = {
  setOpen: (open: boolean) => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

export function CommandPaletteProvider({
  posts,
  children,
}: {
  posts: BlogPostMeta[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevOpen, setPrevOpen] = useState(open);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) setCopied(false);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const openExternal = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const copyEmail = useCallback(async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setOpen(false), 900);
  }, []);

  const contextValue = useMemo(() => ({ setOpen }), []);

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {children}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        shouldFilter
        overlayClassName="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-24 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 sm:top-32"
        className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)]"
      >
        <div className="border-b border-[var(--border)] px-4">
          <Command.Input
            placeholder="Search pages, posts, projects…"
            className="w-full bg-transparent py-4 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
          />
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-[var(--muted-foreground)]">
            No results found.
          </Command.Empty>

          <Command.Group
            heading="Pages"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-[var(--muted-foreground)]"
          >
            {pages.map((page) => (
              <Command.Item
                key={page.href}
                value={page.label}
                onSelect={() => navigate(page.href)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
              >
                {page.label}
              </Command.Item>
            ))}
          </Command.Group>

          {posts.length > 0 && (
            <Command.Group
              heading="Blog Posts"
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-[var(--muted-foreground)]"
            >
              {posts.map((post) => (
                <Command.Item
                  key={post.slug}
                  value={post.title}
                  onSelect={() => navigate(`/blog/${post.slug}`)}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
                >
                  {post.title}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group
            heading="Projects"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-[var(--muted-foreground)]"
          >
            {projects.map((project) => (
              <Command.Item
                key={project.id}
                value={project.title}
                onSelect={() => openExternal(project.href)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
              >
                {project.title}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-[var(--muted-foreground)]"
          >
            <Command.Item
              value="Toggle theme"
              onSelect={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
            >
              Toggle theme
            </Command.Item>
            <Command.Item
              value="Copy email address"
              onSelect={copyEmail}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
            >
              {copied ? "✓ Copied" : "Copy email address"}
            </Command.Item>
            <Command.Item
              value="Open LinkedIn profile"
              onSelect={() => openExternal(LINKEDIN_URL)}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[var(--foreground)] data-[selected=true]:bg-[var(--blue-soft)]/10 data-[selected=true]:text-[var(--blue-soft)]"
            >
              Open LinkedIn profile
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </CommandPaletteContext.Provider>
  );
}
