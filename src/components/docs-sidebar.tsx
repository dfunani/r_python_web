"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/docs-nav";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <nav className="sticky top-20 space-y-8 text-sm">
        {DOCS_NAV.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--rpy-accent-2)]">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/docs" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2 transition ${
                        active
                          ? "bg-[var(--rpy-accent)]/20 font-medium text-[var(--rpy-ink)]"
                          : "text-[var(--rpy-muted)] hover:bg-[var(--rpy-panel)] hover:text-[var(--rpy-ink)]"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
