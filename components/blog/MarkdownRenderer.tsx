import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-[var(--blue-soft)] prose-a:no-underline hover:prose-a:underline prose-pre:overflow-x-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_pre]:rounded-lg">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 mt-8 text-2xl font-bold text-[var(--foreground)] first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 mt-8 text-xl font-semibold text-[var(--foreground)]">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 mt-6 text-lg font-semibold text-[var(--foreground)]">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 leading-relaxed text-[var(--muted-foreground)]">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6 text-[var(--muted-foreground)]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-2 pl-6 text-[var(--muted-foreground)]">
            {children}
          </ol>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="rounded bg-[var(--border)] px-1.5 py-0.5 font-mono text-sm">
                {children}
              </code>
            );
          }
          return (
            <code className="block overflow-x-auto rounded-lg bg-[var(--card)] p-4 font-mono text-sm">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mb-4 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-4 border-l-4 border-[var(--blue-soft)] pl-4 italic text-[var(--muted-foreground)]">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
}
