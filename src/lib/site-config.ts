import { cache } from "react";
import "server-only";

const trim = (value: string | undefined, fallback: string) =>
  (value?.trim() || fallback).replace(/\/$/, "");

function readEnv(primary: string, legacy: string, fallback: string): string {
  return trim(process.env[primary] ?? process.env[legacy], fallback);
}

export type ReleaseTarget =
  | "aarch64-apple-darwin"
  | "x86_64-apple-darwin"
  | "x86_64-unknown-linux-gnu"
  | "aarch64-unknown-linux-gnu";

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  repoUrl: string;
  releasesUrl: string;
  issuesUrl: string;
  defaultBranch: string;
  siteUrl: string;
  releaseVersion: string;
};

export const getSiteConfig = cache((): SiteConfig => {
  const repoUrl = readEnv(
    "GITHUB_REPO_URL",
    "NEXT_PUBLIC_GITHUB_REPO_URL",
    "https://github.com/dfunani/r_python",
  );

  const defaultBranch = readEnv(
    "GITHUB_DEFAULT_BRANCH",
    "NEXT_PUBLIC_GITHUB_DEFAULT_BRANCH",
    "main",
  );

  const releasesUrl = readEnv(
    "GITHUB_RELEASES_URL",
    "NEXT_PUBLIC_GITHUB_RELEASES_URL",
    `${repoUrl}/releases`,
  );

  const releaseVersion = readEnv(
    "RELEASE_VERSION",
    "NEXT_PUBLIC_RELEASE_VERSION",
    "2.0.0",
  ).replace(/^v/, "");

  return {
    name: readEnv("SITE_NAME", "NEXT_PUBLIC_SITE_NAME", "rPython"),
    tagline: readEnv(
      "SITE_TAGLINE",
      "NEXT_PUBLIC_SITE_TAGLINE",
      "Memory-safe compiled language with Python-shaped syntax.",
    ),
    description: readEnv(
      "SITE_DESCRIPTION",
      "NEXT_PUBLIC_SITE_DESCRIPTION",
      "rPython is a statically typed (not dynamic), memory-safe language compiled to native code — not CPython. Python-shaped syntax; compile-time type checks; ship native binaries with rpythonc.",
    ),
    repoUrl,
    releasesUrl,
    issuesUrl: `${repoUrl}/issues`,
    defaultBranch,
    siteUrl: readEnv(
      "SITE_URL",
      "NEXT_PUBLIC_SITE_URL",
      "http://localhost:3000",
    ),
    releaseVersion,
  };
});
