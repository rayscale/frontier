# Contributing to site

`@rayscale/site` is the documentation and marketing site of Frontier. It is a Vite and React
app routed with React Router, and it uses the components, symbols, styles, and typeface of
[`@rayscale/frontier`](../../packages/frontier/README.md).

Follow the workspace [CONTRIBUTING.md](../../CONTRIBUTING.md) and [AGENTS.md](../../AGENTS.md)
first. This file adds the rules that are specific to the site.

## Structure

```text
apps/site/
├── content/                 # the documentation: one folder per page
├── source/
│   ├── components/          # site UI: docs shell, theme, header, footer, logo
│   ├── docs/                # the docs engine: navigation, headings, demos, page registry
│   ├── layout/              # layouts shared by routes
│   ├── pages/               # one folder per screen: home, docs, not found
│   ├── main.tsx             # mounts the router
│   └── routes.tsx           # the route table; every screen loads on demand
├── index.html
└── vite.config.ts           # Vite, MDX, and the docs manifest plugin
```

Import across the source with the `#/` alias, for example `#/docs/navigation.js`.

## The docs engine

The engine in `source/docs/` has no React in it where it can avoid it, so it stays easy to test.

- `build/manifest.ts` and `build/plugin.ts` scan `content/` at build time and expose the pages as
  the `virtual:docs-manifest` module. Editing a page reloads the dev server.
- `navigation.ts` builds the sidebar tree, the reading order, and the breadcrumbs from the pages.
- `headings.ts` collects the headings that the table of contents links to.
- `demos.ts` resolves the examples in a page's `demos` folder and their source text.
- `pages.ts` joins the manifest with the lazily loaded content of each page.

Keep decisions in these pure modules and test them. Components only render what they return.

## Writing documentation

- A folder is a URL. Each page is `<folder>/index.mdx`, and `content/index.mdx` is `/docs`.
  `demos` and `assets` folders are not pages.
- Frontmatter drives the sidebar and the page header:

  | Field         | Purpose                                                              |
  | ------------- | -------------------------------------------------------------------- |
  | `title`       | Page title and sidebar label. Required.                              |
  | `description` | Summary shown under the title.                                       |
  | `order`       | Position among siblings. Without it, pages sort by title.            |
  | `symbol`      | Name of a symbol shown in the sidebar. Add it to `docs/symbols.tsx`. |
  | `status`      | `draft`, `beta`, or `stable`.                                        |
  | `sidebar`     | Set to `false` to keep the page out of the sidebar.                  |

- Do not add an H1. The page header renders the title.
- MDX files contain no imports. They can use `<Demo name="..." />`, `<PageList />`,
  `<Callout title="..." tone="...">`, `<PackageManagerTabs />`, and `<SymbolGallery />`.
- A section that has pages of its own gets an `Overview` row in the sidebar automatically, so a
  row never toggles and navigates at once.
- Write the text of a callout directly inside it. Do not nest block elements in it.
- Fenced code blocks render through the Frontier `CodeBlock` with client-side highlighting.

### Demos

- Put one demo per file in `<page>/demos/`, named in kebab-case, such as `with-symbol.tsx`, with
  a default export.
- Reference it by its camelCase name: `<Demo name="withSymbol" />`.
- Demos use the real Frontier components. They are checked like any other source.

### Component pages

Every component page follows the same order: `## Usage`, `## Examples`, `## API reference`, and
`## Accessibility`.

- Give the API reference one `###` subsection per exported symbol, written as a dotted path:
  `### Button`, `### Table.Row`.
- List the props a part declares in a `Prop | Type | Default | Description` table, in the order of
  its props type. Summarize inherited attributes in one sentence.
- Defaults come from the implementation, not from the prose of its comments.
- Write resolved types, not internal alias names such as `TButtonProps`.

## Styles

Use the Frontier tokens. Do not hardcode colors, spacing, typography, or radii. Keep site styles
in a stylesheet next to the component they style, scoped to site classes.

## Verification

From the repository root:

```sh
pnpm --filter @rayscale/site typecheck
pnpm --filter @rayscale/site test
pnpm --filter @rayscale/site build
pnpm lint
pnpm format:check
```

The site imports the built package, so run `pnpm build` once before the first test or dev run.
Open new pages in the browser and check that they appear in the sidebar in the intended order.
