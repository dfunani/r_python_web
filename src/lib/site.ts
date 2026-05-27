import type { ReleaseTarget, SiteConfig } from "./site-config";

export type { ReleaseTarget, SiteConfig };

export function releaseAssetFilename(target: ReleaseTarget): string {
  return `rpythonc-${target}.tar.gz`;
}

export function releaseDownloadVersioned(
  site: SiteConfig,
  target: ReleaseTarget,
): string {
  return `${site.releasesUrl}/download/v${site.releaseVersion}/${releaseAssetFilename(target)}`;
}

export function releaseDownloadLatest(
  site: SiteConfig,
  target: ReleaseTarget,
): string {
  return `${site.releasesUrl}/latest/download/${releaseAssetFilename(target)}`;
}

export function docBlob(site: SiteConfig, filename: string): string {
  return `${site.repoUrl}/blob/${site.defaultBranch}/${filename}`;
}

export function mainNav(site: SiteConfig) {
  return [
    { label: "Documentation", href: "/docs" },
    { label: "Playground", href: "/playground" },
    { label: "Download", href: "/download" },
    { label: "GitHub", href: site.repoUrl, external: true as const },
  ];
}

function manualInstall(
  site: SiteConfig,
  target: ReleaseTarget,
  installLine: string,
): string {
  const archive = releaseAssetFilename(target);
  const url = releaseDownloadVersioned(site, target);
  return `curl -fL -O ${url}
tar xzf ${archive}
chmod +x rpythonc-${target}/rpythonc
${installLine}
rpythonc --version`;
}

export function installSnippets(site: SiteConfig) {
  const installScriptUrl = `${site.repoUrl}/raw/${site.defaultBranch}/scripts/install.sh`;

  return {
    curlInstall: `curl -fsSL ${installScriptUrl} | bash`,
    curlInstallPinned: `RPYTHON_VERSION=${site.releaseVersion} curl -fsSL ${installScriptUrl} | bash`,
    macosArm: manualInstall(
      site,
      "aarch64-apple-darwin",
      "mv rpythonc-aarch64-apple-darwin/rpythonc ~/.local/bin/",
    ),
    macosIntel: manualInstall(
      site,
      "x86_64-apple-darwin",
      "mv rpythonc-x86_64-apple-darwin/rpythonc ~/.local/bin/",
    ),
    linuxX64: manualInstall(
      site,
      "x86_64-unknown-linux-gnu",
      "mv rpythonc-x86_64-unknown-linux-gnu/rpythonc ~/.local/bin/",
    ),
    linuxArm: manualInstall(
      site,
      "aarch64-unknown-linux-gnu",
      "mv rpythonc-aarch64-unknown-linux-gnu/rpythonc ~/.local/bin/",
    ),
    pathHint: `export PATH="$HOME/.local/bin:$PATH"`,
    ccHint: `# Native builds need a C compiler on PATH (cc / clang)
# macOS: Xcode Command Line Tools
# Linux: build-essential`,
    fromSource: `git clone ${site.repoUrl}.git
cd r_python
cargo build -p rpython_cli --release
export PATH="$PWD/target/release:$PATH"
rpythonc --version`,
    archHint: `uname -m
# x86_64  → x86_64-unknown-linux-gnu
# aarch64 → aarch64-unknown-linux-gnu`,
  };
}

export function releaseTargets(site: SiteConfig) {
  const rows: { label: string; target: ReleaseTarget; hint: string }[] = [
    {
      label: "macOS (Apple Silicon)",
      target: "aarch64-apple-darwin",
      hint: releaseAssetFilename("aarch64-apple-darwin"),
    },
    {
      label: "macOS (Intel)",
      target: "x86_64-apple-darwin",
      hint: releaseAssetFilename("x86_64-apple-darwin"),
    },
    {
      label: "Linux (x86_64)",
      target: "x86_64-unknown-linux-gnu",
      hint: releaseAssetFilename("x86_64-unknown-linux-gnu"),
    },
    {
      label: "Linux (ARM64)",
      target: "aarch64-unknown-linux-gnu",
      hint: releaseAssetFilename("aarch64-unknown-linux-gnu"),
    },
  ];
  return rows;
}
