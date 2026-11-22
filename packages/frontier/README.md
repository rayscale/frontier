# @rayscale/frontier

**A design language for the web.**

The React implementation of the Frontier design language: components, icons, and design tokens, built to work together.

The [design guidelines](../../guidelines/README.md) state intent and behavior. This package implements them and does not extend them.

## Usage

Import the stylesheet once, then use the components and icons.

```tsx
import { Button, Check } from '@rayscale/frontier'
import '@rayscale/frontier/styles.css'

export function Example() {
  return (
    <Button>
      <Check /> Save
    </Button>
  )
}
```

React and React DOM 18 or 19 are required as peer dependencies.

The default mode is light. Set `data-mode="dark"` on the root element to switch every color role to its dark value.

## Themes

Frontier is the default theme. A theme is a stylesheet in your own project that sets the tokens of the system. Import it after the main stylesheet, and set `data-theme` and `data-mode` on the element where it applies, which can be the root element or any region.

```tsx
import '@rayscale/frontier/styles.css'
import './acme-theme.css'
```

```html
<html data-theme="acme" data-mode="dark"></html>
```

Set both attributes on the same element, so a region does not depend on the mode around it. `data-theme="frontier"` restores the default theme inside a region.

A theme sets every color role in both modes, under `[data-theme='<name>']` and `[data-theme='<name>'][data-mode='dark']`. Check a stylesheet against the guidelines with:

```sh
pnpm --filter @rayscale/frontier check:themes path/to/acme-theme.css
```

The theme is named after its file. The command reports the roles that are missing and every contrast requirement that is not met. If a `.json` manifest with the same name sits next to the stylesheet, it is checked too. See [Themes](../../guidelines/foundations/themes.md).

## What's included

- **Components** — React components built on native HTML semantics, with composable parts for compound components, available from the package entry.
- **Icons** — A set of icons that follow one grid and one stroke, available from the package entry.
- **Styles** — Design tokens and component styles through `@rayscale/frontier/styles.css`.
- **Typeface** — Outfit, with Geist Mono for code, loaded by the stylesheet through `@fontsource-variable/outfit` and `@fontsource-variable/geist-mono`. The system font is the fallback.

## Exports

| Path                                   | Contents                                                |
| -------------------------------------- | ------------------------------------------------------- |
| `@rayscale/frontier`                   | Components, icons, and their types.                     |
| `@rayscale/frontier/styles.css`        | Design tokens, the font face, and component styles.     |
| `@rayscale/frontier/themes/<name>.css` | The values of one theme, for use with `data-theme`.     |
| `@rayscale/frontier/icon-metadata`     | Descriptive data of every icon, without the components. |

## Development

> [!WARNING]
> `@rayscale/frontier` is under active development. The package version is 0.0.0, and components, tokens, and APIs are evolving.
>
> More information will be added as the package progresses.

Run the scripts from the repository root, as described in the [workspace README](../../README.md). The package conventions are in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Frontier is licensed under the [MIT License](../../LICENSE).
