import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer className="mt-auto border-t border-[var(--rpy-line)] bg-[var(--rpy-bg-2)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-[var(--rpy-muted)]">
          {site.name} — MIT OR Apache-2.0 · Not CPython · Not PyPy RPython
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/docs" className="text-[var(--rpy-accent)] hover:underline">
            Docs
          </Link>
          <Link href="/playground" className="text-[var(--rpy-accent)] hover:underline">
            Playground
          </Link>
          <Link href="/download" className="text-[var(--rpy-accent)] hover:underline">
            Download
          </Link>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--rpy-accent)] hover:underline"
          >
            GitHub
          </a>
          <a
            href={site.releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--rpy-accent)] hover:underline"
          >
            Releases
          </a>
        </div>
      </div>
    </footer>
  );
}
