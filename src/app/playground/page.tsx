import { Suspense } from "react";
import { DocPage } from "@/components/doc-page";
import { PlaygroundClient } from "./playground-client";

export const metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <DocPage
        title="Playground"
        description="Edit .rpy source, load v2 examples, and copy rpythonc commands to run on your machine."
      >
        <p>
          This page does not compile code in the browser — install{" "}
          <code className="font-mono">rpythonc</code> v2 locally, save your snippet,
          and run the generated commands. Pick an example from the dropdown (hello,
          GCD, interfaces, HTTP sketches, and more).
        </p>
        <Suspense fallback={<p className="text-[var(--rpy-muted)]">Loading editor…</p>}>
          <PlaygroundClient />
        </Suspense>
      </DocPage>
    </div>
  );
}
