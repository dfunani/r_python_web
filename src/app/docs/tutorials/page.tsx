import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { TUTORIALS } from "@/lib/tutorials";

export const metadata = {
  title: "Tutorials",
  description: "Step-by-step rPython v2 tutorials — install, types, OOP, HTTP roadmap, compiler tour.",
};

const levelStyle = {
  beginner: "pill pill-ok",
  intermediate: "pill pill-warn",
  advanced: "pill border border-[var(--rpy-line)] text-[var(--rpy-muted)]",
} as const;

export default function TutorialsPage() {
  return (
    <DocPage
      title="Tutorials"
      description="Guided lessons for rPython v2.0 — from your first binary to HTTP and stdlib previews."
    >
      <p>
        Each tutorial links to runnable examples. Programs marked{" "}
        <strong>roadmap</strong> describe target APIs coming in stdlib releases — they
        document direction, not necessarily today&apos;s compiler.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {TUTORIALS.map((t) => (
          <article key={t.slug} className="card flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className={levelStyle[t.level]}>{t.level}</span>
              <span className="text-xs text-[var(--rpy-muted)]">{t.duration}</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-[var(--rpy-ink)]">
              <Link
                href={`/docs/tutorials/${t.slug}`}
                className="hover:text-[var(--rpy-accent)]"
              >
                {t.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-[var(--rpy-muted)]">
              {t.description}
            </p>
            <Link
              href={`/docs/tutorials/${t.slug}`}
              className="mt-4 text-sm font-medium text-[var(--rpy-accent)] hover:underline"
            >
              Start tutorial →
            </Link>
          </article>
        ))}
      </div>

      <h2>See also</h2>
      <ul>
        <li>
          <Link href="/docs/examples">Examples gallery</Link> — all sample programs
        </li>
        <li>
          <Link href="/docs/getting-started">Getting started</Link> — install in 5 minutes
        </li>
        <li>
          <Link href="/playground">Playground</Link> — edit and copy CLI commands
        </li>
      </ul>
    </DocPage>
  );
}
