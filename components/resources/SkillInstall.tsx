type Props = { slug: string; files: string[] };

export function SkillInstall({ slug, files }: Props) {
  return (
    <div className="glass-card mt-8 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-[var(--foreground)]">Install it</h2>

      <div className="mt-5 space-y-5 text-sm text-[var(--muted-foreground)]">
        <div>
          <p className="font-medium text-[var(--foreground)]">Claude Code</p>
          <p className="mt-1">Unzip the download into your skills folder, then start a new session.</p>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 font-mono text-xs leading-relaxed">
{`unzip ${slug}.skill -d ~/.claude/skills/`}
          </pre>
          <p className="mt-2">
            Swap <code className="rounded bg-[var(--border)] px-1.5 py-0.5 font-mono text-xs">~/.claude/skills/</code> for{" "}
            <code className="rounded bg-[var(--border)] px-1.5 py-0.5 font-mono text-xs">.claude/skills/</code> inside a
            project to scope it to that repo instead.
          </p>
        </div>

        <div>
          <p className="font-medium text-[var(--foreground)]">Claude apps</p>
          <p className="mt-1">
            Open Settings, find Capabilities, and upload the <code className="rounded bg-[var(--border)] px-1.5 py-0.5 font-mono text-xs">.skill</code> file
            as it downloaded. No unzipping needed.
          </p>
        </div>

        <div>
          <p className="font-medium text-[var(--foreground)]">Anywhere else</p>
          <p className="mt-1">
            The skill is plain Markdown. Copy the contents below straight into a system prompt or custom instructions.
          </p>
        </div>

        <div>
          <p className="font-medium text-[var(--foreground)]">What is in the package</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 font-mono text-xs">
            {files.map((file) => (
              <li key={file}>{`${slug}/${file}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
