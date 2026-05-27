import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";

export const metadata = { title: "Compiler" };

export default function CompilerPage() {
  return (
    <DocPage
      title="Compiler & CLI"
      description="rpythonc run vs build, --help, and emit stages."
    >
      <p>
        The <code className="font-mono">rpythonc</code> driver is a Rust binary that
        lexes, parses, type-checks, lowers to HIR/MIR, and either interprets or emits
        native code (C backend today; LLVM behind a feature flag on the roadmap).
      </p>

      <h2>run vs build</h2>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code className="font-mono">rpythonc run FILE.rpy</code>
            </td>
            <td>MIR interpreter — no linker, best for development</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">rpythonc build -o OUT FILE.rpy</code>
            </td>
            <td>Native executable (needs system C compiler)</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">rpythonc test FILE.rpy</code>
            </td>
            <td>Run <code className="font-mono">#[test]</code> functions in a file</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">rpythonc explain E0301</code>
            </td>
            <td>Print help for a diagnostic code</td>
          </tr>
        </tbody>
      </table>

      <h2>Legacy flags</h2>
      <p>Still supported for scripts and older docs:</p>
      <CodeBlock>{`rpythonc --run hello.rpy
rpythonc -o ./hello hello.rpy`}</CodeBlock>

      <h2>--help summary</h2>
      <CodeBlock title="rpythonc --help">{`rPython is a statically typed, compiled language (not interpreted like CPython).

Typical workflow:
  rpythonc run hello.rpy
  rpythonc build -o hello hello.rpy

Commands:
  run      MIR interpreter (no native codegen)
  build    Compile to native executable
  test     Run #[test] functions
  explain  Diagnostic error documentation
  tokens   Emit lexer tokens only

Options:
  --emit <STAGE>   Stop after a compiler stage
  -r, --run        Legacy interpreter flag
  -o, --output     Legacy output path
  -h, --help
  -V, --version`}</CodeBlock>

      <h2>Emit stages (verbose names)</h2>
      <p>
        Use <code className="font-mono">--emit</code> on <code className="font-mono">build</code>{" "}
        or as a top-level flag to stop after a pipeline stage. Prefer verbose CLI names;
        short aliases remain for compatibility.
      </p>
      <table>
        <thead>
          <tr>
            <th>--emit value</th>
            <th>Alias</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code className="font-mono">tokens</code>
            </td>
            <td>—</td>
            <td>Lexer token stream</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">ast</code>
            </td>
            <td>
              <code className="font-mono">abstract-syntax-tree</code>
            </td>
            <td>Parsed AST</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">high-level-ir</code>
            </td>
            <td>
              <code className="font-mono">hir</code>
            </td>
            <td>High-level IR</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">mid-level-ir</code>
            </td>
            <td>
              <code className="font-mono">mir</code>
            </td>
            <td>Mid-level IR (SSA)</td>
          </tr>
          <tr>
            <td>
              <code className="font-mono">llvm</code>
            </td>
            <td>
              <code className="font-mono">llvm-ir</code>
            </td>
            <td>LLVM IR (feature-gated)</td>
          </tr>
        </tbody>
      </table>

      <CodeBlock title="Inspect hello.rpy">{`rpythonc --emit tokens examples/hello.rpy
rpythonc --emit ast examples/hello.rpy
rpythonc --emit high-level-ir examples/hello.rpy
rpythonc --emit mid-level-ir examples/hello.rpy`}</CodeBlock>

      <p>
        Subcommand shortcut: <code className="font-mono">rpythonc tokens FILE.rpy</code>
      </p>

      <p>
        Pipeline naming in the Rust codebase follows{" "}
        <code className="font-mono">docs/NAMING.md</code> — no opaque abbreviations in
        public APIs. See also{" "}
        <Link href="/docs/roadmap">v2 roadmap</Link> for LLVM and borrowck milestones.
      </p>
    </DocPage>
  );
}
