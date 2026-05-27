import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <DocsSidebar />
        {children}
      </div>
    </div>
  );
}
