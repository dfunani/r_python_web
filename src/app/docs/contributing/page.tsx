import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob } from "@/lib/site";

export const metadata = { title: "Contributing" };

export default async function ContributingPage() {
  const site = getSiteConfig();

  return (
    <DocPage
      title="Contributing"
      description="How to report issues, propose changes, and update docs."
    >
      <h2>Welcome</h2>
      <p>
        Contributions to rPython are welcome — compiler fixes, language design, tests,
        examples, and documentation. Licensed MIT OR Apache-2.0.
      </p>

      <h2>Getting set up</h2>
      <ol>
        <li>
          Fork and clone{" "}
          <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
            {site.repoUrl}
          </a>
        </li>
        <li>
          <code className="font-mono">cargo build -p rpython_cli --release</code>
        </li>
        <li>
          <code className="font-mono">cargo test --workspace</code> before opening a PR
        </li>
        <li>
          Read{" "}
          <a
            href={docBlob(site, "docs/IMPLEMENTATION.md")}
            target="_blank"
            rel="noopener noreferrer"
          >
            docs/IMPLEMENTATION.md
          </a>{" "}
          and the <Link href="/docs/roadmap">roadmap</Link>
        </li>
      </ol>

      <h2>Code style</h2>
      <ul>
        <li>Rust workspace under <code className="font-mono">crates/</code></li>
        <li>Verbose public names per <code className="font-mono">docs/NAMING.md</code></li>
        <li>Prefer <code className="font-mono">interface</code> over <code className="font-mono">trait</code> in user-facing syntax</li>
        <li>Minimal scope per PR — one feature or fix</li>
        <li>Update this website when install steps or CLI behavior changes</li>
      </ul>

      <h2>Documentation</h2>
      <p>
        User-facing docs live in this <code className="font-mono">r_python_web</code> app.
        Deep specs remain in the main repo under <code className="font-mono">docs/</code>.
        Error codes: <code className="font-mono">docs/errors/</code>.
      </p>

      <h2>Reporting issues</h2>
      <p>
        Use{" "}
        <a href={site.issuesUrl} target="_blank" rel="noopener noreferrer">
          GitHub Issues
        </a>
        . Include OS, <code className="font-mono">rpythonc --version</code>, and a minimal{" "}
        <code className="font-mono">.rpy</code> reproducer.
      </p>

      <h2>Good first areas</h2>
      <ul>
        <li>Lexer/parser fixtures under <code className="font-mono">tests/</code></li>
        <li>Diagnostic messages and <code className="font-mono">rpythonc explain</code> text</li>
        <li>Examples and website copy</li>
        <li>Release CI and install.sh improvements</li>
      </ul>
    </DocPage>
  );
}
