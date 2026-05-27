import type { ReactNode } from "react";

type DocPageProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <article className="min-w-0 flex-1">
      <header className="mb-8 border-b border-[var(--rpy-line)] pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--rpy-ink)]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 text-lg text-[var(--rpy-muted)]">{description}</p>
        ) : null}
      </header>
      <div className="doc-content space-y-4 text-[var(--rpy-ink)]">{children}</div>
    </article>
  );
}
