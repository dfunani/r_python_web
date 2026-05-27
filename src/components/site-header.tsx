import Link from "next/link";
import type { SiteConfig } from "@/lib/site-config";
import { mainNav } from "@/lib/site";

export function SiteHeader({ site }: { site: SiteConfig }) {
  const nav = mainNav(site);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rpy-line)] bg-[var(--rpy-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="rounded-md bg-[var(--rpy-accent)]/15 px-2 py-0.5 text-sm text-[var(--rpy-accent-2)]">
            {site.name}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) =>
            "external" in item && item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2 text-[var(--rpy-muted)] transition hover:bg-[var(--rpy-panel)] hover:text-[var(--rpy-ink)]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[var(--rpy-muted)] transition hover:bg-[var(--rpy-panel)] hover:text-[var(--rpy-ink)]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="sr-only">{site.description}</div>
    </header>
  );
}
