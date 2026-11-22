# Frontier Site

**The home of the Frontier documentation.**

The site for the Frontier design language. It is a Next.js app that exports plain static files, and it uses the styles and components of [`@rayscale/frontier`](../../packages/frontier/README.md).

## Contents

- [What is in the site](#what-is-in-the-site)
- [Development](#development)
- [Structure](#structure)
- [Development status](#development-status)

## What is in the site

- **Landing** — A home page that introduces the system, with the Frontier header and footer.
- **Documentation** — A navigation tree, breadcrumbs, a table of contents, and page navigation around every page.
- **Component pages** — Live examples with their source, the API of each part, and accessibility notes. Button is the first.
- **Icons** — A searchable catalog of every icon with its usage.
- **Themes** — Light, dark, or the system setting, remembered between visits.

## Development

The site is a workspace project. Run these from the repository root.

| Command                                  | Description                            |
| ---------------------------------------- | -------------------------------------- |
| `pnpm site`                              | Starts the development server.         |
| `pnpm --filter @frontier/site build`     | Builds the site into `apps/site/out/`. |
| `pnpm --filter @frontier/site test`      | Runs the tests.                        |
| `pnpm --filter @frontier/site typecheck` | Type-checks the site.                  |

The site imports `@rayscale/frontier`, which is served from the built package. Run `pnpm build` once so that `packages/frontier/dist` exists before starting the development server.

Documentation lives in `documentation/content/`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to write a page, a demo, or an API reference.

## Structure

```text
apps/site/
├── documentation/
│   └── content/        # the pages: one folder per page
├── source/
│   ├── components/     # documentation shell, theme, header, footer
│   ├── documentation/  # the documentation engine
│   ├── layout/         # shared layouts
│   └── pages/          # the screens: home, covers, not found
├── app/                # the routes: layouts and pages
└── next.config.ts
```

## Development status

> [!WARNING]
> The site is under active development. It documents the components and the icons.
>
> More information will be added as the site progresses.
