# Frontier

**A design language for the web.**

Frontier is a design language and the React implementation that follows it. It brings together guidelines, design tokens, components, icons, and a typeface, so an interface can be built from one set of rules.

The guidelines state design intent. The packages implement it and do not extend it.

## Contents

- [Design language](#design-language)
- [Packages](#packages)
- [Getting started](#getting-started)
- [Workspace](#workspace)
- [Storybook](#storybook)
- [Scripts](#scripts)
- [Tooling](#tooling)
- [Development](#development)
- [Guidelines](#guidelines)
- [License](#license)

## Design language

The Frontier design language defines the visual foundations and principles behind everything in the workspace. It is built around five layers:

- **Principles** — The values behind every decision.
- **Foundations** — Color, typography, spacing, shape, elevation, focus, motion, and accessibility.
- **Patterns** — Shared approaches to interaction, selection, loading, and interface states.
- **Components** — Reusable interaction primitives that finished widgets are composed from.
- **Content** — The voice and writing rules for everything the interface says.

The layers are described in [guidelines/](./guidelines/README.md).

## Packages

Workspace projects live under `packages/`.

- **[@rayscale/frontier](./packages/frontier/README.md)** — The React implementation of the design language: components, icons, design tokens, and the Frontier Sans typeface.

## Getting started

Frontier requires Node.js 22 or newer and the pnpm version declared in [package.json](./package.json). See [Corepack](https://pnpm.io/installation#using-corepack) for managing pnpm.

```sh
pnpm install
pnpm build
pnpm test
```

## Workspace

Each project keeps its own dependencies, scripts, tests, and TypeScript configuration next to its `package.json`.

TypeScript sources live under `source/`, tests sit beside the source files they cover, and build output goes to `dist/`.

## Storybook

Storybook renders the styles and the components.

```sh
pnpm storybook
```

Use the theme control in the toolbar to preview both themes. `pnpm storybook:build` produces a static build under `packages/frontier/storybook-static/`.

## Scripts

| Script                 | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `pnpm build`           | Builds every workspace project.                      |
| `pnpm test`            | Runs every workspace project's tests.                |
| `pnpm typecheck`       | Type-checks every workspace project.                 |
| `pnpm storybook`       | Starts the Storybook development server.             |
| `pnpm storybook:build` | Builds the static Storybook site.                    |
| `pnpm lint`            | Builds the workspace, then lints every file.         |
| `pnpm lint:fix`        | Applies available ESLint fixes.                      |
| `pnpm lint:files`      | Lints specific files without building the workspace. |
| `pnpm format`          | Formats the workspace with Prettier.                 |
| `pnpm format:check`    | Verifies formatting without writing changes.         |
| `pnpm format:files`    | Formats specific files with Prettier.                |

## Tooling

- **pnpm** — Manages the workspace and its dependencies.
- **ESLint** — Enforces structure and code quality. Its configuration is the authoritative source of the rules.
- **Prettier** — Owns token-level formatting.
- **Storybook** — Documents the styles and components.
- **Vitest** — Runs the tests.
- **Commitlint, lint-staged, and Husky** — Check commit messages and staged files from the Git hooks.
- **GitHub Actions** — Runs formatting, lint, type-check, tests, and builds on every push and pull request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the workspace conventions.

## Development

> [!WARNING]
> Frontier is under active development. The package version is 0.0.0, and components, tokens, and APIs are evolving.
>
> Frontier Sans is at version 0.1. It has not been reviewed by a type designer.
>
> More information will be added as the project progresses.

## Guidelines

Explore the [design guidelines](./guidelines/README.md) for the principles, foundations, patterns, and conventions that define Frontier.

- [Principles](./guidelines/principles/README.md)
- [Foundations](./guidelines/foundations/README.md)
- [Patterns](./guidelines/patterns/README.md)
- [Components](./guidelines/components/README.md)
- [Content](./guidelines/content/README.md)

## License

Frontier is licensed under the [MIT License](./LICENSE).
