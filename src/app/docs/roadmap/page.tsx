import Link from "next/link";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob } from "@/lib/site";

export const metadata = { title: "Roadmap" };

const phases = [
  { id: "P0", name: "Workspace, releases, website", status: "done" },
  { id: "P1", name: "Lexer + fixtures", status: "done" },
  { id: "P2", name: "Parser snapshots, recovery", status: "partial" },
  { id: "P3", name: "Multi-file crates, imports", status: "planned" },
  { id: "P4", name: "50+ typeck tests, full LANGUAGE.md", status: "partial" },
  { id: "P5", name: "MIR tests, verbose IR dumps, SSA", status: "partial" },
  { id: "P6", name: "LLVM feature flag + C backend", status: "partial" },
  { id: "P7", name: "Class + enum + interface codegen", status: "partial" },
  { id: "P8", name: "Interface dispatch + monomorphization", status: "partial" },
  { id: "P9", name: "Real borrowck + drops", status: "partial" },
  { id: "P10", name: "stdlib/, rpythonc test", status: "partial" },
  { id: "P11", name: "match, for, modules, UI tests", status: "planned" },
  { id: "P12", name: "DWARF, cache, benches, cargo install", status: "partial" },
];

export default async function RoadmapPage() {
  const site = getSiteConfig();

  return (
    <DocPage
      title="v2 roadmap"
      description="P0–P12 delivery map for rPython 2.0."
    >
      <p>
        <strong>v2.0</strong> completes the phased specification: full surface language,
        production backends, borrow checking, stdlib, modules, and this documentation site.
      </p>

      <h2>Language design (v2 locked)</h2>
      <table>
        <thead>
          <tr>
            <th>v1 / Rust term</th>
            <th>v2 term</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>trait</td>
            <td>
              <strong>interface</strong> (<code className="font-mono">trait</code> deprecated)
            </td>
          </tr>
          <tr>
            <td>struct</td>
            <td>data-only POD</td>
          </tr>
          <tr>
            <td>—</td>
            <td>
              <strong>class</strong> — default OOP type
            </td>
          </tr>
          <tr>
            <td>hir / mir (CLI)</td>
            <td>
              <code className="font-mono">high-level-ir</code> /{" "}
              <code className="font-mono">mid-level-ir</code>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Phase tracker</h2>
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Deliverable</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {phases.map((p) => (
            <tr key={p.id}>
              <td>
                <code className="font-mono">{p.id}</code>
              </td>
              <td>{p.name}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Release criteria (v2.0)</h2>
      <ol>
        <li>Website — install, tutorials, examples, playground</li>
        <li>
          Compiler — <code className="font-mono">run</code>,{" "}
          <code className="font-mono">build</code>, <code className="font-mono">test</code>, documented CLI
        </li>
        <li>Examples — 15+ programs (hello, gcd, OOP, HTTP sketches) on release binaries</li>
        <li>Tutorials — install, types, control flow, HTTP roadmap, compiler tour</li>
        <li>Docs — LANGUAGE.md matches compiler behavior</li>
        <li>CI — Linux + macOS release tarballs</li>
      </ol>

      <p>
        Full roadmap:{" "}
        <a
          href={docBlob(site, "docs/V2_ROADMAP.md")}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/V2_ROADMAP.md
        </a>{" "}
        · implementation map:{" "}
        <a
          href={docBlob(site, "docs/IMPLEMENTATION.md")}
          target="_blank"
          rel="noopener noreferrer"
        >
          docs/IMPLEMENTATION.md
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

      <p>
        <Link href="/docs/compiler">Compiler guide</Link> ·{" "}
        <Link href="/docs/contributing">Contributing</Link>
      </p>
    </DocPage>
  );
}
