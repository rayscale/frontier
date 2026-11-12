# Metric

A design language for the web.

## Requirements

- Node.js 22 or newer
- The pnpm version declared in [package.json](./package.json) (see
  [Corepack](https://pnpm.io/installation#using-corepack))

## Getting started

```sh
pnpm install
pnpm build
pnpm test
```

## Workspace

Workspace projects live under `packages/`. Each project keeps its own dependencies, scripts,
tests, and TypeScript configuration next to its `package.json`.

TypeScript sources live under `source/`, tests mirror that structure under `tests/`, and build
output goes to `dist/`.

## Scripts

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `pnpm build`        | Builds every workspace project.                      |
| `pnpm test`         | Runs every workspace project's tests.                |
| `pnpm typecheck`    | Type-checks every workspace project.                 |
| `pnpm lint`         | Builds the workspace, then lints every file.         |
| `pnpm lint:fix`     | Applies available ESLint fixes.                      |
| `pnpm lint:files`   | Lints specific files without building the workspace. |
| `pnpm format`       | Formats the workspace with Prettier.                 |
| `pnpm format:check` | Verifies formatting without writing changes.         |
| `pnpm format:files` | Formats specific files with Prettier.                |

## Tooling

- **pnpm** manages the workspace and dependencies.
- **ESLint** enforces structure and code quality; the configuration is the authoritative source
  of the rules.
- **Prettier** owns token-level formatting.
- **Vitest** runs tests.
- **Commitlint** and **lint-staged** run from the Git hooks managed by **Husky**.
- **GitHub Actions** runs formatting, lint, type-check, tests, and builds on every push and pull
  request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the workspace conventions.
