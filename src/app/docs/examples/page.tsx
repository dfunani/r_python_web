import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob } from "@/lib/site";

export const metadata = { title: "Examples" };

const HELLO = `def main() -> int:
    print("hello, rPython")
    return 0`;

const GCD = `def gcd(a: int, b: int) -> int:
    while b != 0:
        t = a % b
        a = b
        b = t
    return a

def main() -> int:
    print(gcd(48, 18))
    return 0`;

const INTERFACES = `interface Show:
    def show(self) -> str:
        ...

class Point:
    x: int
    y: int

impl Show for Point:
    def show(self) -> str:
        return "Point"

def main() -> int:
    p = Point { x: 1, y: 2 }
    print(p.show())
    return 0`;

export default async function ExamplesPage() {
  const site = getSiteConfig();

  return (
    <DocPage
      title="Examples"
      description="Sample .rpy programs from the main repository."
    >
      <p>
        Clone{" "}
        <a href={site.repoUrl} target="_blank" rel="noopener noreferrer">
          {site.repoUrl}
        </a>{" "}
        or paste into the <Link href="/playground">playground</Link>.
      </p>

      <h2>hello.rpy</h2>
      <p>Minimal program — lexer, parser, and interpreter path.</p>
      <CodeBlock title="examples/hello.rpy">{HELLO}</CodeBlock>
      <CodeBlock title="Run">{`rpythonc run examples/hello.rpy
rpythonc build -o ./hello examples/hello.rpy && ./hello`}</CodeBlock>

      <h2>gcd.rpy</h2>
      <p>Euclid&apos;s algorithm — control flow, modulo, and calls.</p>
      <CodeBlock title="examples/gcd.rpy">{GCD}</CodeBlock>

      <h2>interfaces_demo.rpy</h2>
      <p>
        <code className="font-mono">interface</code> keyword and static dispatch (v2 target).
      </p>
      <CodeBlock title="examples/interfaces_demo.rpy">{INTERFACES}</CodeBlock>

      <p>
        More in the repo:{" "}
        <a
          href={`${site.repoUrl}/tree/${site.defaultBranch}/examples`}
          target="_blank"
          rel="noopener noreferrer"
        >
          examples/
        </a>{" "}
        · status:{" "}
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
