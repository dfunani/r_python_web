type CodeBlockProps = {
  children: string;
  title?: string;
};

export function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="code-panel my-4 overflow-hidden rounded-xl border border-[var(--rpy-line)]">
      {title ? (
        <div className="border-b border-[var(--rpy-line)] bg-[var(--rpy-code)] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[var(--rpy-muted)]">
          {title}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[var(--rpy-code-text)]">
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}
