"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommandPalette } from "@/components/CommandPaletteProvider";

const emptySubscribe = () => () => {};

/** Client-mount flag without setState-in-effect, so SSR/CSR theme markup can differ safely. */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function ThemeToggleButton({ theme, onToggle }: { theme: string | undefined; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={onToggle}
      className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--border)] hover:text-[var(--foreground)]"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { setOpen: setCommandPaletteOpen } = useCommandPalette();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-14 min-h-14 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-16">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--blue-soft)] sm:text-lg"
          onClick={closeMobile}
        >
          Omar Chouman
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors hover:text-[var(--blue-soft)] ${
                  pathname === href ? "text-[var(--blue-soft)]" : "text-[var(--muted-foreground)]"
                }`}
              >
                {label}
                {pathname === href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--blue-soft)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted-foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--foreground)]"
            >
              <SearchIcon />
              <span>Search</span>
              <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-sans text-xs text-[var(--muted-foreground)]">
                ⌘K
              </kbd>
            </button>
          </li>
          {mounted && (
            <li>
              <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            </li>
          )}
        </ul>

        {/* Mobile: search + theme + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setCommandPaletteOpen(true)}
            className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--border)] hover:text-[var(--foreground)]"
          >
            <SearchIcon />
          </button>
          {mounted && <ThemeToggleButton theme={theme} onToggle={toggleTheme} />}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--border)] hover:text-[var(--foreground)]"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-0 px-4 py-4">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMobile}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--border)] hover:text-[var(--blue-soft)] ${
                      pathname === href ? "text-[var(--blue-soft)]" : "text-[var(--muted-foreground)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
