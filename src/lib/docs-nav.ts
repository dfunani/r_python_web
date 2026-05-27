export type DocLink = {
  title: string;
  href: string;
  description?: string;
};

export type DocSection = {
  title: string;
  items: DocLink[];
};

export const DOCS_NAV: DocSection[] = [
  {
    title: "Getting started",
    items: [
      {
        title: "Documentation home",
        href: "/docs",
        description: "Map of all guides",
      },
      {
        title: "Getting started",
        href: "/docs/getting-started",
        description: "What rPython is and first run",
      },
      {
        title: "Install",
        href: "/docs/install",
        description: "install.sh, releases, from source",
      },
      {
        title: "Examples",
        href: "/docs/examples",
        description: "15+ programs — basics, OOP, HTTP sketches",
      },
      {
        title: "Tutorials",
        href: "/docs/tutorials",
        description: "Static typing, OOP, HTTP roadmap, compiler tour",
      },
    ],
  },
  {
    title: "Language",
    items: [
      {
        title: "Language reference",
        href: "/docs/language",
        description: "Static types, classes, interfaces — not dynamic Python",
      },
    ],
  },
  {
    title: "Compiler",
    items: [
      {
        title: "Compiler & CLI",
        href: "/docs/compiler",
        description: "run vs build, emit stages, --help",
      },
      {
        title: "Roadmap",
        href: "/docs/roadmap",
        description: "v2 P0–P12 implementation plan",
      },
    ],
  },
  {
    title: "Contributing",
    items: [
      {
        title: "Contributing",
        href: "/docs/contributing",
        description: "How to help and conventions",
      },
    ],
  },
];

export function getDocSectionsFlat(): DocLink[] {
  return DOCS_NAV.flatMap((s) => s.items);
}
