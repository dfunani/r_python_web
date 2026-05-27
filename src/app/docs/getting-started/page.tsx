import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { installSnippets } from "@/lib/site";

export const metadata = { title: "Getting started" };

export default async function GettingStartedPage() {
  const site = getSiteConfig();
  const snippets = installSnippets(site);

  return (
    <DocPage
      title="Getting started"
      description="Install rpythonc and run your first .rpy program."
    >
      <p>
        <strong>rPython</strong> is a memory-safe, <strong>statically typed</strong>{" "}
        language with Python-shaped syntax, compiled via a Rust toolchain. Types are
        checked at compile time — it is <strong>not</strong> a dynamic language like
        CPython, and it is unrelated to PyPy&apos;s RPython subset.
      </p>

      <h2>1. Install</h2>
      <p>
        The fastest path is the install script (downloads a release binary into{" "}
        <code className="font-mono">~/.local/bin</code>):
      </p>
      <CodeBlock>{snippets.curlInstall}</CodeBlock>
      <p>
        Or pick a tarball on{" "}
        <Link href="/download">Download</Link> /{" "}
        <a href={site.releasesUrl} target="_blank" rel="noopener noreferrer">
          GitHub Releases
        </a>
        . You need a C compiler (<code className="font-mono">cc</code>) on PATH for{" "}
        <code className="font-mono">rpythonc build</code>.
      </p>

      <h2>2. Run (interpreter)</h2>
      <CodeBlock>{`rpythonc run examples/hello.rpy
# legacy flag:
rpythonc --run examples/hello.rpy`}</CodeBlock>
      <p>
        <code className="font-mono">run</code> uses the mid-level IR interpreter — no
        linker, fastest iteration while learning.
      </p>

      <h2>3. Build (native)</h2>
      <CodeBlock>{`rpythonc build -o ./hello examples/hello.rpy
./hello`}</CodeBlock>

      <h2>4. Explore</h2>
      <ul>
        <li>
          <Link href="/docs/tutorials">Tutorials</Link> — guided v2 lessons
        </li>
        <li>
          <Link href="/docs/examples">Examples</Link> — 15+ programs including HTTP sketches
        </li>
        <li>
          <Link href="/docs/language">Language</Link> — classes, interfaces, vs Python
        </li>
        <li>
          <Link href="/docs/compiler">Compiler</Link> — emit stages and CLI
        </li>
        <li>
          <Link href="/playground">Playground</Link> — paste code, copy run commands
        </li>
      </ul>

      <h2>From source</h2>
      <CodeBlock title="Requires Rust 1.78+">{snippets.fromSource}</CodeBlock>
    </DocPage>
  );
}
