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
        description="Edit .rpy source and copy rpythonc commands to run on your machine."
      >
        <p>
          This page does not compile code in the browser — install{" "}
          <code className="font-mono">rpythonc</code> locally, save your snippet, and run
          the generated commands.
        </p>
        <PlaygroundClient />
      </DocPage>
    </div>
  );
}
