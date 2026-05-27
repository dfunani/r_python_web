import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { DOCS_NAV } from "@/lib/docs-nav";

export const metadata = {
  title: "Documentation",
};

export default function DocsIndexPage() {
  return (
    <DocPage
      title="Documentation"
      description="Guides for installing rpythonc, learning the language, and hacking on the compiler."
    >
      <p>
        rPython <strong>v2.0</strong> is a compiled, <strong>statically typed</strong>{" "}
        language — not dynamic CPython. Annotated locals like{" "}
        <code className="font-mono">a: str = &quot;hello&quot;</code> are checked at compile
        time; <code className="font-mono">a: int = &quot;hello&quot;</code> is an error.
      </p>

      <div className="mt-8 space-y-10">
        {DOCS_NAV.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <ul className="mt-3 space-y-3">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-medium text-[var(--rpy-accent)] hover:underline"
                  >
                    {item.title}
                  </Link>
                  {item.description ? (
                    <span className="block text-sm text-[var(--rpy-muted)]">
                      {item.description}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DocPage>
  );
}
