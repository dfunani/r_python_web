import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { StatusPill } from "@/components/status-pill";
import { RPY_EXAMPLES } from "@/lib/examples-catalog";
import { getSiteConfig } from "@/lib/site-config";
import { installSnippets } from "@/lib/site";

const audiences = [
  {
    title: "New to rPython",
    description:
      "Install rpythonc from GitHub Releases, run hello.rpy in the MIR interpreter, then compile a native binary when you are ready.",
    href: "/docs/getting-started",
    cta: "Get started",
  },
  {
    title: "Tutorials & examples",
    description:
      "Guided lessons plus 15+ programs — basics, GCD, interfaces, HTTP API sketches, and compiler introspection.",
    href: "/docs/tutorials",
    cta: "Start learning",
  },
  {
    title: "Compiler hackers",
    description:
      "Rust workspace: lexer → parser → typeck → HIR/MIR → C or LLVM. Inspect every stage with verbose emit names.",
    href: "/docs/compiler",
    cta: "Compiler guide",
  },
];

const features = [
  "Static typing — a: str = \"hello\" is checked at compile time; a: int = \"hello\" is an error",
  "Python-shaped syntax — indentation blocks, def, familiar surface (not dynamic semantics)",
  "Memory-safe — ownership model, borrowck scaffold, native codegen",
  "Classes, structs, and interface (trait) — static dispatch in v2",
  "rpythonc run for fast dev loops; rpythonc build for shipping binaries",
  "stdlib/core scaffold — Option, Vec, prelude (growing with each release)",
  "Unrelated to PyPy’s RPython — a new language and toolchain",
];

export default async function HomePage() {
  const site = getSiteConfig();
  const snippets = installSnippets(site);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="pill pill-ok mb-4">v2.0 · Compiled · Memory-safe · Not CPython</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-[var(--rpy-muted)]">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started"
            className="rounded-xl bg-[var(--rpy-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--rpy-accent-2)]"
          >
            Read the docs
          </Link>
          <Link
            href="/playground"
            className="rounded-xl border border-[var(--rpy-line)] bg-[var(--rpy-panel)] px-5 py-2.5 text-sm font-medium text-[var(--rpy-ink)] transition hover:border-[var(--rpy-accent)]"
          >
            Playground
          </Link>
          <Link
            href="/download"
            className="rounded-xl border border-[var(--rpy-line)] bg-[var(--rpy-panel)] px-5 py-2.5 text-sm font-medium text-[var(--rpy-ink)] transition hover:border-[var(--rpy-accent)]"
          >
            Download
          </Link>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-[var(--rpy-muted)] transition hover:text-[var(--rpy-ink)]"
          >
            View on GitHub →
          </a>
        </div>
        <div className="mt-12">
          <CodeBlock title="Quick install">{snippets.curlInstall}</CodeBlock>
        </div>
      </section>

      <section className="border-y border-[var(--rpy-line)] bg-[var(--rpy-panel)]/40 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold text-[var(--rpy-accent)]">
            Why rPython?
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex gap-2 text-[var(--rpy-muted)] before:text-[var(--rpy-accent-2)] before:content-['▸']"
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--rpy-line)] bg-[var(--rpy-panel)]/30 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[var(--rpy-ink)]">
                Example gallery
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--rpy-muted)]">
                Runnable v2 programs and roadmap sketches for HTTP, stdlib, and FFI.
              </p>
            </div>
            <Link
              href="/docs/examples"
              className="text-sm font-medium text-[var(--rpy-accent)] hover:underline"
            >
              View all examples →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RPY_EXAMPLES.filter((e) =>
              ["hello", "static-typing", "gcd", "interfaces-demo", "http-client", "classes-demo"].includes(e.id),
            ).map((ex) => (
              <Link
                key={ex.id}
                href={`/docs/examples#${ex.id}`}
                className="card block transition hover:border-[var(--rpy-accent)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-[var(--rpy-ink)]">{ex.title}</h3>
                  <StatusPill status={ex.status} />
                </div>
                <p className="mt-2 text-sm text-[var(--rpy-muted)]">{ex.summary}</p>
                <p className="mt-3 font-mono text-xs text-[var(--rpy-accent-2)]">
                  examples/{ex.filename}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-xl font-semibold text-[var(--rpy-ink)]">
          Start here
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--rpy-muted)]">
          Install <code className="font-mono">rpythonc</code>, try the{" "}
          <Link href="/playground" className="text-[var(--rpy-accent)] hover:underline">
            playground
          </Link>
          , or read the full docs.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.title} className="card flex flex-col">
              <h3 className="text-lg font-semibold text-[var(--rpy-accent-2)]">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-[var(--rpy-muted)]">
                {a.description}
              </p>
              <Link
                href={a.href}
                className="mt-4 text-sm font-medium text-[var(--rpy-accent)] hover:underline"
              >
                {a.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
