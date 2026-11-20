# Frontier Site

**The home of the Frontier documentation.**

The site for the Frontier design language. It is a single-page app built with React, React Router, and Vite, and it uses the styles and components of [`@rayscale/frontier`](../../packages/frontier/README.md).

## Development

The site is a workspace project. Run these from the repository root.

| Command                                  | Description                             |
| ---------------------------------------- | --------------------------------------- |
| `pnpm site`                              | Starts the development server.          |
| `pnpm --filter @rayscale/site build`     | Builds the site into `apps/site/dist/`. |
| `pnpm --filter @rayscale/site preview`   | Serves the built site locally.          |
| `pnpm --filter @rayscale/site test`      | Runs the tests.                         |
| `pnpm --filter @rayscale/site typecheck` | Type-checks the site.                   |

The site imports `@rayscale/frontier/styles.css`, which is served from the built package. Run `pnpm build` once so that `packages/frontier/dist` exists before starting the development server.

## Structure

```text
apps/site/
├── index.html          # the document Vite serves
├── vite.config.ts      # Vite and Vitest configuration
└── source/
    ├── main.tsx        # mounts the router
    ├── routes.tsx      # the route table
    ├── layout/         # the shared header and page frame
    └── pages/          # one folder per route
```

Routes are plain objects in `source/routes.tsx`, and each page renders inside the shared layout. Tests sit beside the source they cover.

## Development status

> [!WARNING]
> The site is under active development. It has a home page and a not found page, and the documentation itself has not been written yet.
>
> More information will be added as the site progresses.
