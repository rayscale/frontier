# Contributing to site

`@frontier/site` is the documentation and marketing site of Frontier. It is a Next.js app
that exports plain static files, and it uses the components, icons, and styles of
[`@rayscale/frontier`](../../packages/frontier/README.md).

Follow the workspace [CONTRIBUTING.md](../../CONTRIBUTING.md) and [AGENTS.md](../../AGENTS.md)
first. This file adds the rules that are specific to the site.

## Structure

```text
apps/site/
├── documentation/
│   └── content/             # the pages: one folder per page
├── source/
│   ├── components/          # site UI: documentation shell, theme, header, footer, logo
│   ├── documentation/       # the documentation engine: navigation, headings, demos, page registry
│   ├── layout/              # layouts shared by routes
│   └── pages/               # one folder per screen: home, covers, not found
├── app/                     # the routes: layouts, pages, and metadata
└── next.config.ts           # static export and the `.js` extension alias
```

Import across the source with the `#/` alias, for example `#/documentation/navigation.js`.

## The documentation engine

The engine in `source/documentation/` has no React in it where it can avoid it, so it stays easy to test.

- `build/manifest.ts` scans `documentation/content/` and lists the pages. `pages.ts` runs it once on the server and
  derives the tree and the reading order; `compile.ts` turns the MDX of a page into a component.
  Editing a page shows up on the next request of the dev server.
- `navigation.ts` builds the sidebar tree, the reading order, and the breadcrumbs from the pages.
- `headings.ts` collects the headings that the table of contents links to.
- `demos.ts` locates the examples in a page's `demos` folder.

Keep decisions in these pure modules and test them. Components only render what they return.

## Server and client code

Next renders every page to HTML while the site is built. The pages in `app/` and the documentation engine run
on the server; the interactive parts run in the browser too.

- `@rayscale/frontier` is not marked for the server, so a file that imports a component or a hook
  from it starts with `'use client'`. Do the same for a file that uses hooks or browser APIs.
- The server reads `documentation/content/`, compiles the MDX, and hands the result to client components as
  children or serializable props. Keep functions and class instances out of those props.
- Set the title of a page with the `metadata` export of its route, not with an effect.

## Writing documentation

- A folder is a URL. Each page is `<folder>/index.mdx`, and `documentation/content/index.mdx` is `/documentation`.
  `demos` and `assets` folders are not pages.
- Frontmatter drives the sidebar and the page header:

  | Field         | Purpose                                                                    |
  | ------------- | -------------------------------------------------------------------------- |
  | `title`       | Page title and sidebar label. Required.                                    |
  | `description` | Summary shown under the title.                                             |
  | `order`       | Position among siblings. Without it, pages sort by title.                  |
  | `icon`        | Name of an icon shown in the sidebar. Add it to `documentation/icons.tsx`. |
  | `status`      | `draft`, `beta`, or `stable`.                                              |
  | `sidebar`     | Set to `false` to keep the page out of the sidebar.                        |

- Do not add an H1. The page header renders the title.
- MDX files contain no imports. They can use `<Demo name="..." />`, `<PageList />`,
  `<Callout title="..." tone="...">`, `<PackageManagerTabs />`, and `<IconGallery />`.
- A section that has pages of its own gets an `Overview` row in the sidebar automatically, so a
  row never toggles and navigates at once.
- Write the text of a callout directly inside it. Do not nest block elements in it.
- Fenced code blocks render through the Frontier `CodeBlock` with client-side highlighting.

### Demos

- Put one demo per file in `<page>/demos/`, named in kebab-case, such as `with-icon.tsx`, with
  a default export.
- Reference it by its camelCase name: `<Demo name="withIcon" />`.
- Demos use the real Frontier components. They are checked like any other source.
- A demo is a client component loaded in the browser, so it may use hooks. Do not add a
  `'use client'` line: the file is shown as written in the Code tab.

### Component pages

Every component page follows the same order: `## Usage`, `## Examples`, `## API reference`, and
`## Accessibility`.

- Give the API reference one `###` subsection per exported icon, written as a dotted path:
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
pnpm --filter @frontier/site typecheck
pnpm --filter @frontier/site test
pnpm --filter @frontier/site build
pnpm lint
pnpm format:check
```

The site imports the built package, so run `pnpm build` once before the first test or dev run.
Open new pages in the browser and check that they appear in the sidebar in the intended order.
