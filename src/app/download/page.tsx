import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import {
  docBlob,
  installSnippets,
  releaseDownloadLatest,
  releaseDownloadVersioned,
  releaseTargets,
} from "@/lib/site";

export const metadata = {
  title: "Download",
};

export default async function DownloadPage() {
  const site = getSiteConfig();
  const snippets = installSnippets(site);
  const targets = releaseTargets(site);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <DocPage
        title="Download rpythonc"
        description="Prebuilt compiler binaries from GitHub Releases."
      >
        <p>
          Pick your platform below, or run the install script. Latest tag:{" "}
          <code className="font-mono">v{site.releaseVersion}</code> ·{" "}
          <a href={site.releasesUrl} target="_blank" rel="noopener noreferrer">
            all releases
          </a>
          .
        </p>

        <h2>One-liner install</h2>
        <CodeBlock>{snippets.curlInstall}</CodeBlock>

        <h2>Direct downloads</h2>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Archive</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {targets.map(({ label, target, hint }) => (
              <tr key={target}>
                <td>{label}</td>
                <td>
                  <code className="font-mono text-xs">{hint}</code>
                </td>
                <td>
                  <a
                    href={releaseDownloadLatest(site, target)}
                    className="font-medium text-[var(--rpy-accent)] hover:underline"
                  >
                    Latest
                  </a>
                  {" · "}
                  <a
                    href={releaseDownloadVersioned(site, target)}
                    className="text-sm text-[var(--rpy-muted)] hover:underline"
                  >
                    v{site.releaseVersion}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>macOS (Apple Silicon)</h2>
        <CodeBlock>{snippets.macosArm}</CodeBlock>
        <CodeBlock title="PATH">{snippets.pathHint}</CodeBlock>

        <h2>macOS (Intel)</h2>
        <CodeBlock>{snippets.macosIntel}</CodeBlock>

        <h2>Linux</h2>
        <CodeBlock title="Check architecture">{snippets.archHint}</CodeBlock>
        <h3>Linux (x86_64)</h3>
        <CodeBlock>{snippets.linuxX64}</CodeBlock>
        <h3>Linux (ARM64)</h3>
        <CodeBlock>{snippets.linuxArm}</CodeBlock>

        <h2>After install</h2>
        <CodeBlock>{`rpythonc --version
rpythonc run examples/hello.rpy
rpythonc build -o ./hello examples/hello.rpy`}</CodeBlock>

        <h2>From source</h2>
        <CodeBlock title="Requires Rust">{snippets.fromSource}</CodeBlock>

        <p>
          <Link href="/docs/install">Install guide</Link> ·{" "}
          <a
            href={docBlob(site, "INSTALL.md")}
            target="_blank"
            rel="noopener noreferrer"
          >
            INSTALL.md
          </a>
        </p>
      </DocPage>
    </div>
  );
}
