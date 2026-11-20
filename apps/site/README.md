# Frontier Site

**The home of the Frontier documentation.**

The site for the Frontier design language. It is a single-page app built with React, React Router, and Vite, and it uses the styles and components of [`@rayscale/frontier`](../../packages/frontier/README.md).

## Contents

- [What is in the site](#what-is-in-the-site)
- [Development](#development)
- [Structure](#structure)
- [Development status](#development-status)

## What is in the site

- **Landing** — A home page that introduces the system, with the Frontier header and footer.
- **Documentation** — A navigation tree, breadcrumbs, a table of contents, and page navigation around every page.
- **Component pages** — Live examples with their source, the API of each part, and accessibility notes. Button is the first.
- **Symbols** — A searchable catalog of every symbol with its usage.
- **Typeface** — Frontier Sans: its weights, usage, characters, and features.
- **Themes** — Light, dark, or the system setting, remembered between visits.

## Development

The site is a workspace project. Run these from the repository root.

| Command                                  | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `pnpm site`                              | Starts the development server.          |
| `pnpm --filter @rayscale/site build`     | Builds the site into `apps/site/dist/`. |
| `pnpm --filter @rayscale/site preview`   | Serves the built site locally.          |
| `pnpm --filter @rayscale/site test`      | Runs the tests.                         |
| `pnpm --filter @rayscale/site typecheck` | Type-checks the site.                   |

The site imports `@rayscale/frontier`, which is served from the built package. Run `pnpm build` once so that `packages/frontier/dist` exists before starting the development server.

Documentation lives in `content/`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to write a page, a demo, or an API reference.

## Structure

```text
apps/site/
├── content/            # the documentation: one folder per page
├── source/
│   ├── components/     # docs shell, theme, header, footer
│   ├── docs/           # the docs engine
│   ├── layout/         # shared layouts
│   ├── pages/          # home, docs, not found
│   └── routes.tsx      # the route table
└── index.html
```

## Development status

> [!WARNING]
> The site is under active development. It documents Button, the symbols, and the typeface so far, and the other components do not have pages yet.
>
> More information will be added as the site progresses.
