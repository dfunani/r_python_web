"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { getExampleById, RPY_EXAMPLES } from "@/lib/examples-catalog";

const DEFAULT_SOURCE = `def main() -> int:
    print("hello, rPython")
    return 0`;

export function PlaygroundClient() {
  const searchParams = useSearchParams();
  const exampleParam = searchParams.get("example");

  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [filename, setFilename] = useState("playground.rpy");
  const [selectedId, setSelectedId] = useState("hello");

  useEffect(() => {
    if (!exampleParam) return;
    const ex = getExampleById(exampleParam);
    if (ex) {
      setSelectedId(ex.id);
      setSource(ex.source);
      setFilename(ex.filename);
    }
  }, [exampleParam]);

  const commands = useMemo(() => {
    const file = filename.trim() || "playground.rpy";
    return {
      save: `# Save your editor buffer to a file first:
cat > ${file} <<'RPY'
${source.trim()}
RPY`,
      run: `rpythonc run ${file}`,
      runLegacy: `rpythonc --run ${file}`,
      build: `rpythonc build -o ./${file.replace(/\.rpy$/, "") || "out"} ${file}`,
      buildLegacy: `rpythonc -o ./${file.replace(/\.rpy$/, "") || "out"} ${file}`,
      tokens: `rpythonc --emit tokens ${file}`,
      mir: `rpythonc --emit mid-level-ir ${file}`,
    };
  }, [source, filename]);

  function loadExample(id: string) {
    const ex = getExampleById(id);
    if (!ex) return;
    setSelectedId(id);
    setSource(ex.source);
    setFilename(ex.filename);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm text-[var(--rpy-muted)]">
          Load example{" "}
          <select
            value={selectedId}
            onChange={(e) => loadExample(e.target.value)}
            className="ml-2 max-w-xs rounded-lg border border-[var(--rpy-line)] bg-[var(--rpy-code)] px-3 py-1.5 font-mono text-sm text-[var(--rpy-ink)]"
          >
            {RPY_EXAMPLES.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title} ({ex.status})
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm text-[var(--rpy-muted)]">
          Filename{" "}
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="ml-2 rounded-lg border border-[var(--rpy-line)] bg-[var(--rpy-code)] px-3 py-1.5 font-mono text-sm text-[var(--rpy-ink)]"
          />
        </label>
        <span className="pill pill-warn">
          Runs locally — paste commands into your terminal
        </span>
      </div>

      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        spellCheck={false}
        className="h-72 w-full resize-y rounded-xl border border-[var(--rpy-line)] bg-[var(--rpy-code)] p-4 font-mono text-sm leading-relaxed text-[var(--rpy-code-text)] outline-none focus:border-[var(--rpy-accent)]"
        aria-label="rPython source"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-[var(--rpy-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--rpy-accent-2)]"
          onClick={() => navigator.clipboard.writeText(commands.run)}
        >
          Copy run command
        </button>
        <button
          type="button"
          className="rounded-lg border border-[var(--rpy-line)] bg-[var(--rpy-panel)] px-4 py-2 text-sm font-medium text-[var(--rpy-ink)] hover:border-[var(--rpy-accent)]"
          onClick={() => navigator.clipboard.writeText(commands.build)}
        >
          Copy build command
        </button>
        <button
          type="button"
          className="rounded-lg border border-[var(--rpy-line)] px-4 py-2 text-sm text-[var(--rpy-muted)] hover:text-[var(--rpy-ink)]"
          onClick={() => loadExample("hello")}
        >
          Reset to hello
        </button>
      </div>

      <CodeBlock title="1. Save to disk">{commands.save}</CodeBlock>
      <CodeBlock title="2. Run (interpreter)">{commands.run}</CodeBlock>
      <CodeBlock title="3. Build (native)">{commands.build}</CodeBlock>
      <CodeBlock title="Optional: inspect MIR">{commands.mir}</CodeBlock>
    </div>
  );
}
