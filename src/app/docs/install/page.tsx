import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { DocPage } from "@/components/doc-page";
import { getSiteConfig } from "@/lib/site-config";
import { docBlob, installSnippets } from "@/lib/site";

export const metadata = { title: "Install" };

export default async function InstallPage() {
  const site = getSiteConfig();
  const snippets = installSnippets(site);

  return (
    <DocPage
      title="Install"
      description="install.sh, GitHub Releases, and building from source."
    >
      <h2>Recommended: install.sh</h2>
      <p>
        Downloads the latest <code className="font-mono">rpythonc</code> for your OS/arch
        from GitHub Releases into <code className="font-mono">~/.local/bin</code>.
      </p>
      <CodeBlock>{snippets.curlInstall}</CodeBlock>
      <p>
        Pin a version:{" "}
        <code className="font-mono">{snippets.curlInstallPinned}</code>
      </p>

      <h2>GitHub Releases</h2>
      <ol>
        <li>
          Open{" "}
          <a href={site.releasesUrl} target="_blank" rel="noopener noreferrer">
            GitHub Releases
          </a>{" "}
          (latest: <code className="font-mono">v{site.releaseVersion}</code>)
        </li>
        <li>
          Download <code className="font-mono">rpythonc-&lt;target&gt;.tar.gz</code> for
          your platform (see <Link href="/download">Download</Link>)
        </li>
        <li>
          Extract and move <code className="font-mono">rpythonc</code> onto your PATH
        </li>
      </ol>

      <h2>PATH</h2>
      <CodeBlock>{snippets.pathHint}</CodeBlock>

      <h2>Native builds need cc</h2>
      <CodeBlock>{snippets.ccHint}</CodeBlock>

      <h2>From source</h2>
      <CodeBlock title="Rust toolchain">{snippets.fromSource}</CodeBlock>
      <p>
        Full guide in the main repo:{" "}
        <a href={docBlob(site, "INSTALL.md")} target="_blank" rel="noopener noreferrer">
          INSTALL.md
        </a>
        .
      </p>

      <h2>Troubleshooting</h2>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>command not found: rpythonc</td>
            <td>Add ~/.local/bin to PATH</td>
          </tr>
          <tr>
            <td>No GitHub release found</td>
            <td>Set RPYTHON_VERSION or build from source</td>
          </tr>
          <tr>
            <td>linker / cc errors on build</td>
            <td>Install Xcode CLT (macOS) or build-essential (Linux)</td>
          </tr>
          <tr>
            <td>Confused with CPython</td>
            <td>rPython is a separate compiler — use rpythonc, not python3</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}
