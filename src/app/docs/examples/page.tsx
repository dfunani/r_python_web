import Link from "next/link";
import { ExampleCard } from "@/components/example-card";
import { DocPage } from "@/components/doc-page";
import {
  CATEGORY_ORDER,
  EXAMPLE_CATEGORY_LABELS,
  examplesByCategory,
  RPY_EXAMPLES,
} from "@/lib/examples-catalog";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob } from "@/lib/site";

export const metadata = {
  title: "Examples",
  description:
    "Comprehensive rPython v2 examples — basics, OOP, control flow, HTTP sketches, and compiler introspection.",
};

export default async function ExamplesPage() {
  const site = getSiteConfig();
  const byCategory = examplesByCategory();

  return (
    <DocPage
      title="Examples"
      description={`${RPY_EXAMPLES.length} sample programs for rPython v2.0 — from hello world to HTTP API sketches.`}
    >
      <p>
        Clone{" "}
        <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
          {site.repoUrl}
        </a>
        , run with <code className="font-mono">rpythonc run examples/…</code>, or
        paste into the{" "}
        <Link href="/playground" className="text-[var(--rpy-accent)] hover:underline">
          playground
        </Link>
        . Walk through guided{" "}
        <Link href="/docs/tutorials" className="text-[var(--rpy-accent)] hover:underline">
          tutorials
        </Link>{" "}
        for step-by-step lessons.
      </p>

      <div className="not-prose my-6 flex flex-wrap gap-2">
        <span className="pill pill-ok">Runs on v2.0</span>
        <span className="pill pill-warn">Partial support</span>
        <span className="pill border border-[var(--rpy-line)] text-[var(--rpy-muted)]">
          Roadmap / sketch
        </span>
      </div>

      <nav className="card my-8">
        <h2 className="!mt-0 text-base font-semibold text-[var(--rpy-ink)]">
          On this page
        </h2>
        <ul className="mt-3 columns-2 gap-x-6 text-sm sm:columns-3">
          {CATEGORY_ORDER.map((cat) => {
            const items = byCategory.get(cat);
            if (!items?.length) return null;
            return (
              <li key={cat} className="mb-3 break-inside-avoid">
                <span className="font-medium text-[var(--rpy-accent-2)]">
                  {EXAMPLE_CATEGORY_LABELS[cat]}
                </span>
                <ul className="mt-1 space-y-0.5 pl-0">
                  {items.map((ex) => (
                    <li key={ex.id}>
                      <a href={`#${ex.id}`} className="text-[var(--rpy-muted)] hover:text-[var(--rpy-accent)]">
                        {ex.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>

      {CATEGORY_ORDER.map((cat) => {
        const items = byCategory.get(cat);
        if (!items?.length) return null;
        return (
          <div key={cat}>
            <h2>{EXAMPLE_CATEGORY_LABELS[cat]}</h2>
            <div className="space-y-8">
              {items.map((ex) => (
                <ExampleCard key={ex.id} example={ex} />
              ))}
            </div>
          </div>
        );
      })}

      <h2>Repository</h2>
      <p>
        All filenames match{" "}
        <a
          href={`${site.repoUrl}/tree/${site.defaultBranch}/examples`}
          target="_blank"
          rel="noopener noreferrer"
        >
          examples/
        </a>{" "}
        in the main repo (roadmap sketches may exist only on the website until merged).
        Implementation status:{" "}
        <a
          href={docBlob(site, "docs/IMPLEMENTATION_STATUS.md")}
          target="_blank"
          rel="noopener noreferrer"
        >
          IMPLEMENTATION_STATUS.md
        </a>
        .
      </p>
    </DocPage>
  );
}
