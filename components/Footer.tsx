import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Reveal
          y={0}
          className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"
        >
          <p className="order-2 text-sm text-[var(--muted-foreground)] sm:order-1">
            © {new Date().getFullYear()} Omar Chouman. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--blue-soft)]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </footer>
  );
}
