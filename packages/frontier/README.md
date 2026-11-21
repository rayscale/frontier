# @rayscale/frontier

**A design language for the web.**

The React implementation of the Frontier design language: components, symbols, and design tokens, built to work together.

The [design guidelines](../../guidelines/README.md) state intent and behavior. This package implements them and does not extend them.

## Usage

Import the stylesheet once, then use the components and symbols.

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

Frontier is the default theme. A theme is a named set of values, and it applies to the root element or to any region inside it. Import a theme's stylesheet after the main one, and set `data-theme` where it applies.

```tsx
import '@rayscale/frontier/styles.css'
import '@rayscale/frontier/themes/bisnes.css'
```

```html
<html data-theme="bisnes" data-mode="dark"></html>
```

Every theme defines both modes. The build checks the contrast of each theme in both modes and fails when a theme does not meet the guidelines. See [Themes](../../guidelines/foundations/themes.md).

## What's included

- **Components** — React components built on native HTML semantics, with composable parts for compound components, available from the package entry.
- **Symbols** — A set of symbols that follow one grid and one stroke, available from the package entry.
- **Styles** — Design tokens and component styles through `@rayscale/frontier/styles.css`.
- **Typeface** — Geist and Geist Mono, loaded by the stylesheet through `@fontsource-variable/geist` and `@fontsource-variable/geist-mono`. The system font is the fallback.

## Exports

| Path                                   | Contents                                                  |
| -------------------------------------- | --------------------------------------------------------- |
| `@rayscale/frontier`                   | Components, symbols, and their types.                     |
| `@rayscale/frontier/styles.css`        | Design tokens, the font face, and component styles.       |
| `@rayscale/frontier/themes/<name>.css` | The values of one theme, for use with `data-theme`.       |
| `@rayscale/frontier/symbol-metadata`   | Descriptive data of every symbol, without the components. |
| `@rayscale/frontier/theme-metadata`    | Kind, departures, colors, and contrast of every theme.    |

## Development

> [!WARNING]
> `@rayscale/frontier` is under active development. The package version is 0.0.0, and components, tokens, and APIs are evolving.
>
> More information will be added as the package progresses.

Run the scripts from the repository root, as described in the [workspace README](../../README.md). The package conventions are in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Frontier is licensed under the [MIT License](../../LICENSE).
