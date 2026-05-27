import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob } from "@/lib/site";

export const metadata = { title: "Language" };

export default async function LanguagePage() {
  const site = getSiteConfig();

  return (
    <DocPage
      title="Language reference"
      description="How rPython differs from Python and Rust terminology."
    >
      <p className="pill pill-warn">
        Living document — see the main repo for the full implemented subset.
      </p>

      <h2>Compiled vs Python (CPython)</h2>
      <table>
        <thead>
          <tr>
            <th>CPython</th>
            <th>rPython</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interpreted at runtime</td>
            <td>Ahead-of-time compilation via <code className="font-mono">rpythonc</code></td>
          </tr>
          <tr>
            <td>Dynamic typing</td>
            <td>Static types with inference and annotations</td>
          </tr>
          <tr>
            <td>GC + reference semantics</td>
            <td>Memory-safe ownership model (v2 roadmap)</td>
          </tr>
          <tr>
            <td><code className="font-mono">.py</code> files</td>
            <td><code className="font-mono">.rpy</code> source files</td>
          </tr>
        </tbody>
      </table>
      <p>
        Syntax feels familiar — indentation blocks, <code className="font-mono">def</code>,{" "}
        <code className="font-mono">if</code>/<code className="font-mono">while</code>, calls
        — but you must compile or use <code className="font-mono">rpythonc run</code> to
        execute.
      </p>

      <h2>class vs struct</h2>
      <p>
        <strong>class</strong> is the default object-oriented type: methods, fields, and
        (planned) inheritance. Use classes for most user-defined types.
      </p>
      <p>
        <strong>struct</strong> is data-only — POD layout, no methods. Reach for structs when
        you need a plain aggregate (FFI, buffers, C-compatible layout).
      </p>
      <CodeBlock title="Conceptual">{`class Counter:
    value: int

    def bump(self) -> int:
        self.value = self.value + 1
        return self.value

struct Point2:
    x: int
    y: int`}</CodeBlock>

      <h2>interface (not trait)</h2>
      <p>
        v2 uses the keyword <strong>interface</strong> (like Java/C#), not Rust&apos;s{" "}
        <code className="font-mono">trait</code>. The legacy <code className="font-mono">trait</code>{" "}
        keyword may still parse with a deprecation warning.
      </p>
      <CodeBlock title="interfaces_demo.rpy">{`interface Show:
    def show(self) -> str:
        ...

class Point:
    x: int
    y: int

impl Show for Point:
    def show(self) -> str:
        return "Point"`}</CodeBlock>

      <h2>What works today</h2>
      <p>Single-file programs with:</p>
      <ul>
        <li>
          <code className="font-mono">def</code> functions, annotations,{" "}
          <code className="font-mono">return</code>
        </li>
        <li>
          <code className="font-mono">if</code> / <code className="font-mono">elif</code> /{" "}
          <code className="font-mono">else</code>, <code className="font-mono">while</code>
        </li>
        <li>
          Literals: <code className="font-mono">int</code>, <code className="font-mono">bool</code>,{" "}
          <code className="font-mono">str</code>
        </li>
        <li>
          Builtin <code className="font-mono">print</code>
        </li>
      </ul>
      <p>
        Classes, interfaces, <code className="font-mono">match</code>, modules, and full
        borrow checking are on the{" "}
        <Link href="/docs/roadmap">v2 roadmap</Link>.
      </p>

      <p>
        Full reference:{" "}
        <a
          href={docBlob(site, "docs/LANGUAGE.md")}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/LANGUAGE.md
        </a>{" "}
        · design spec:{" "}
        <a
          href={docBlob(site, "docs/DESIGN_SPEC.md")}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/DESIGN_SPEC.md
        </a>
        .
      </p>
    </DocPage>
  );
}
