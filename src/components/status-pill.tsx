import type { ExampleStatus } from "@/lib/examples-catalog";
import { EXAMPLE_STATUS_LABELS } from "@/lib/examples-catalog";

const styles: Record<ExampleStatus, string> = {
  working: "pill pill-ok",
  partial: "pill pill-warn",
  roadmap: "pill border border-[var(--rpy-line)] text-[var(--rpy-muted)]",
};

export function StatusPill({ status }: { status: ExampleStatus }) {
  return <span className={styles[status]}>{EXAMPLE_STATUS_LABELS[status]}</span>;
}
