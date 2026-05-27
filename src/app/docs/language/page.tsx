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
      description="Statically typed, compiled rPython — not dynamic CPython."
    >
      <p className="pill pill-ok mb-4">
        Static types · compile-time checks · not a dynamic language
      </p>

      <h2>Static typing (not dynamic)</h2>
      <p>
        rPython is a <strong>statically typed</strong> language. Types are known and
        checked when you compile (or when you <code className="font-mono">rpythonc run</code>
        , which still runs the full type checker). This is fundamentally different from
        CPython, where types are attached to objects at runtime and can change freely.
      </p>
      <CodeBlock title="Valid — types match">{`def main() -> int:
    a: str = "hello"
    n: int = 42
    print(a)
    return 0`}</CodeBlock>
      <CodeBlock title="Compile error — annotation disagrees with value">{`def main() -> int:
    a: int = "hello"   # ERROR: expected \`int\`, found \`str\`
    return 0`}</CodeBlock>
      <p>
        The compiler rejects the second program before execution. There is no fallback to
        dynamic typing, no <code className="font-mono">Any</code> escape hatch in v2.0, and
        no implicit conversion from <code className="font-mono">str</code> to{" "}
        <code className="font-mono">int</code>.
      </p>

      <h3>How to write types</h3>
      <table>
        <thead>
          <tr>
            <th>Form</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annotated local</td>
            <td>
              <code className="font-mono">a: str = &quot;hello&quot;</code>
            </td>
          </tr>
          <tr>
            <td>Function params / return</td>
            <td>
              <code className="font-mono">def gcd(a: int, b: int) -&gt; int:</code>
            </td>
          </tr>
          <tr>
            <td>Struct fields</td>
            <td>
              <code className="font-mono">x: int</code> inside{" "}
              <code className="font-mono">struct Point:</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        See <Link href="/docs/examples#static-typing">static_typing.rpy</Link> and the{" "}
        <Link href="/docs/tutorials/static-typing">static typing tutorial</Link>.
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
            <td>
              <strong>Dynamic</strong> typing — types follow values at runtime
            </td>
            <td>
              <strong>Static</strong> typing — types fixed at compile time; mismatches are errors
            </td>
          </tr>
          <tr>
            <td>GC + reference semantics</td>
            <td>Memory-safe ownership model (v2 roadmap)</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">.py</code> files
            </td>
            <td>
              <code className="font-mono">.rpy</code> source files
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Syntax <em>looks</em> familiar — indentation blocks, <code className="font-mono">def</code>,{" "}
        <code className="font-mono">if</code>/<code className="font-mono">while</code> — but
        semantics are those of a compiled, typed language.
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
    def show(self) -> str

struct Point:
    x: int
    y: int

impl Show for Point:
    def show(self) -> str:
        return "Point"`}</CodeBlock>

      <h2>What works today</h2>
      <p>Single-file programs with:</p>
      <ul>
        <li>
          <code className="font-mono">def</code> functions with typed parameters and returns
        </li>
        <li>
          Annotated locals: <code className="font-mono">a: str = &quot;hello&quot;</code>
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
        <li>Structs, classes, interfaces — see examples</li>
      </ul>
      <p>
        Full <code className="font-mono">match</code>, modules, and complete borrow checking are on the{" "}
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
