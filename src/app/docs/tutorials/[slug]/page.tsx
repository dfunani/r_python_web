import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getExampleById } from "@/lib/examples-catalog";
import { getTutorial, getTutorialSlugs, TUTORIALS } from "@/lib/tutorials";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getTutorialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) return { title: "Tutorial" };
  return {
    title: tutorial.title,
    description: tutorial.description,
  };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;
  const tutorial = getTutorial(slug);
  if (!tutorial) notFound();

  const idx = TUTORIALS.findIndex((t) => t.slug === slug);
  const prev = idx > 0 ? TUTORIALS[idx - 1] : null;
  const next = idx < TUTORIALS.length - 1 ? TUTORIALS[idx + 1] : null;

  return (
    <DocPage title={tutorial.title} description={tutorial.description}>
      <p className="text-sm text-[var(--rpy-muted)]">
        {tutorial.level} · {tutorial.duration}
      </p>

      {tutorial.sections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          {section.body.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
          {section.code ? (
            <CodeBlock title={section.code.title}>{section.code.source}</CodeBlock>
          ) : null}
          {section.tip ? (
            <p className="rounded-lg border border-[var(--rpy-line)] bg-[var(--rpy-panel)] px-4 py-3 text-sm text-[var(--rpy-muted)]">
              <strong className="text-[var(--rpy-accent-2)]">Tip: </strong>
              {section.tip}
            </p>
          ) : null}
        </div>
      ))}

      {tutorial.relatedExampleIds.length > 0 ? (
        <>
          <h2>Related examples</h2>
          <ul>
            {tutorial.relatedExampleIds.map((id) => {
              const ex = getExampleById(id);
              if (!ex) return null;
              return (
                <li key={id}>
                  <Link href={`/docs/examples#${id}`}>{ex.title}</Link>
                  {" — "}
                  <code className="font-mono text-sm">{ex.filename}</code>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      <nav className="mt-12 flex flex-wrap justify-between gap-4 border-t border-[var(--rpy-line)] pt-8 text-sm">
        {prev ? (
          <Link href={`/docs/tutorials/${prev.slug}`} className="text-[var(--rpy-accent)] hover:underline">
            ← {prev.title}
          </Link>
        ) : (
          <Link href="/docs/tutorials" className="text-[var(--rpy-muted)] hover:text-[var(--rpy-accent)]">
            ← All tutorials
          </Link>
        )}
        {next ? (
          <Link
            href={`/docs/tutorials/${next.slug}`}
            className="text-[var(--rpy-accent)] hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </DocPage>
  );
}
