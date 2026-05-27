# r_python_web

Official documentation and marketing site for **[rPython](https://github.com/dfunani/r_python)** — a memory-safe, compiled language with Python-shaped syntax (not CPython).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Tailwind CSS](https://tailwindcss.com/) 4
- TypeScript, `src/app` layout

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Configuration

Environment variables (optional overrides):

| Variable | Default |
|----------|---------|
| `SITE_NAME` | `rPython` |
| `GITHUB_REPO_URL` | `https://github.com/dfunani/r_python` |
| `GITHUB_RELEASES_URL` | `{repo}/releases` |
| `RELEASE_VERSION` | `2.0.0` |
| `SITE_URL` | `http://localhost:3000` |

Legacy `NEXT_PUBLIC_*` names are supported as fallbacks.

## Project layout

- `src/lib/site-config.ts` — site metadata and release version
- `src/lib/site.ts` — nav, install snippets, download URLs
- `src/lib/docs-nav.ts` — documentation sidebar sections
- `src/components/` — header, footer, code blocks, doc layout
- `src/app/` — pages (home, docs, playground, download)

## Related repos

- Compiler & language: [dfunani/r_python](https://github.com/dfunani/r_python)
- Releases: [github.com/dfunani/r_python/releases](https://github.com/dfunani/r_python/releases)

## License

Same as the main rPython project (MIT OR Apache-2.0) unless noted otherwise for site-only assets.
