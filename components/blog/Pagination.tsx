import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

/** Builds a compact page list with the current page centered, always including first/last, using "…" for gaps. */
function buildPageList(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }
  return result;
}

const arrowLinkClasses =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--blue-soft)] hover:text-[var(--blue-soft)]";
const arrowDisabledClasses =
  "inline-flex h-10 cursor-not-allowed items-center justify-center rounded-lg border border-[var(--border)] px-4 text-sm font-medium text-[var(--muted-foreground)] opacity-50";

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageList = buildPageList(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
      {hasPrev ? (
        <Link href={pageHref(currentPage - 1)} aria-label="Previous page" className={arrowLinkClasses}>
          ← Prev
        </Link>
      ) : (
        <span aria-hidden="true" className={arrowDisabledClasses}>
          ← Prev
        </span>
      )}

      {/* Desktop/tablet: numbered pages */}
      <ul className="hidden items-center gap-1 sm:flex">
        {pageList.map((page, i) =>
          page === "ellipsis" ? (
            <li key={`ellipsis-${i}`} className="px-2 text-sm text-[var(--muted-foreground)]">
              …
            </li>
          ) : (
            <li key={page}>
              <Link
                href={pageHref(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-[var(--blue-royal)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {page}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Mobile: page count text */}
      <span className="text-sm text-[var(--muted-foreground)] sm:hidden">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link href={pageHref(currentPage + 1)} aria-label="Next page" className={arrowLinkClasses}>
          Next →
        </Link>
      ) : (
        <span aria-hidden="true" className={arrowDisabledClasses}>
          Next →
        </span>
      )}
    </nav>
  );
}
