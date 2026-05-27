import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { StatusPill } from "@/components/status-pill";
import {
  buildCommand,
  runCommand,
  type RpyExample,
} from "@/lib/examples-catalog";

type ExampleCardProps = {
  example: RpyExample;
  defaultExpanded?: boolean;
};

export function ExampleCard({ example, defaultExpanded = false }: ExampleCardProps) {
  const path = `examples/${example.filename}`;

  return (
    <section id={example.id} className="card scroll-mt-24 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--rpy-ink)]">
            {example.title}
          </h3>
          <p className="mt-1 text-sm text-[var(--rpy-muted)]">{example.summary}</p>
          {example.tags?.length ? (
            <p className="mt-2 flex flex-wrap gap-2">
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[var(--rpy-code)] px-2 py-0.5 font-mono text-xs text-[var(--rpy-muted)]"
                >
                  {tag}
                </span>
              ))}
            </p>
          ) : null}
        </div>
        <StatusPill status={example.status} />
      </div>

      <CodeBlock title={path}>{example.source}</CodeBlock>

      {example.expectedOutput ? (
        <p className="text-sm text-[var(--rpy-muted)]">
          Expected output:{" "}
          <code className="font-mono text-[var(--rpy-code-text)]">
            {example.expectedOutput}
          </code>
        </p>
      ) : null}

      {example.status !== "roadmap" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <CodeBlock title="Run">{runCommand(example.filename)}</CodeBlock>
          <CodeBlock title="Build">{buildCommand(example.filename)}</CodeBlock>
        </div>
      ) : null}

      <p className="text-sm">
        <Link
          href={`/playground?example=${example.id}`}
          className="font-medium text-[var(--rpy-accent)] hover:underline"
        >
          Open in playground →
        </Link>
      </p>

      {defaultExpanded ? null : null}
    </section>
  );
}
