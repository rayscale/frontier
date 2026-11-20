# Cover pages for components, symbols, and typeface

## Intent

The site has serious documentation under `/docs`. Visitors also need a front door for each part of
the system that shows what it is before they read how to use it. `/components`, `/symbols`, and
`/typeface` become cover pages, like the home page, and each one leads to its documentation.

## Goals

- Three routes, `/components`, `/symbols`, and `/typeface`, in the landing layout (shared header and
  footer).
- The header and the home page link to the cover pages. Each cover page links to its docs.
- Every cover page shows the real thing: live Frontier components, the real symbols, the real font.

## Non-goals

- Changing the documentation pages, their URLs, or their tree.
- Documenting more components. Only Button has a page today.
- A custom font. The typeface is Geist; the cover says so.

## Anti-goals

- Fake previews. Everything shown on a cover is rendered by the package.
- A component tile that links to a page that does not exist.

## Constraints

- Use Frontier components and tokens. No hardcoded design values.
- Modular: one folder per page under `source/pages`, shared pieces in `source/components`.
- Tests beside the source. Covers are routed lazily like every other screen.

## Approaches

1. **Curated showcase (chosen).** A hand-picked set of live components on `/components`, the full
   symbol catalog on `/symbols`, a type tester on `/typeface`. Trade-off: the component list is
   edited by hand.
2. **Generated gallery of every export.** Needs a demo per component and many pages that do not
   exist yet. Rejected for now.
3. **Reuse the docs pages as covers.** Cheapest, but it does not give a front door and mixes the
   serious docs with the marketing voice.

## Design

- `/components`: hero (title, one sentence, "Read the docs" and "Install"), then a grid of tiles.
  Each tile renders a real component and its name. A tile links to its docs page only when that page
  exists (today, Button).
- `/symbols`: hero, then the symbol search and grid already used in the docs, with a click that
  copies the import, and a link to the docs.
- `/typeface`: hero, then a type tester (editable text, weight and size controls) set in Geist and
  Geist Mono, a character sample, and a link to the docs.
- Header: Components, Symbols, and Typeface point to the cover pages; a Docs link stays.
- Home: the three feature cards point to the covers.

## Left to the builder

Tile list, copy, exact spacing, and the copy-to-clipboard feedback.
