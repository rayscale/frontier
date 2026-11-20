# @rayscale/frontier

**A design language for the web.**

The React implementation of the Frontier design language: components, icons, design tokens, and the Frontier Sans typeface, built to work together.

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

The default theme is light. Set `data-theme="dark"` on the root element to switch every color role to its dark value.

## What's included

- **Components** — React components built on native HTML semantics, with composable parts for compound components, available from the package entry.
- **Icons** — A set of icons that follow one grid and one stroke, available from the package entry.
- **Styles** — Design tokens and component styles through `@rayscale/frontier/styles.css`.
- **Typeface** — Frontier Sans, a variable typeface built from source in [source/typography](./source/typography/README.md) and exported as `@rayscale/frontier/fonts/*`. Outfit is the automatic fallback.

## Exports

| Path                            | Contents                                            |
| ------------------------------- | --------------------------------------------------- |
| `@rayscale/frontier`            | Components, icons, and their types.                 |
| `@rayscale/frontier/styles.css` | Design tokens, the font face, and component styles. |
| `@rayscale/frontier/fonts/*`    | The compiled Frontier Sans font files.              |

## Development

> [!WARNING]
> `@rayscale/frontier` is under active development. The package version is 0.0.0, and components, tokens, and APIs are evolving.
>
> Frontier Sans is built by a separate toolchain that needs uv and Python. Without a build, the package still works and text falls back to Outfit.
>
> More information will be added as the package progresses.

Run the scripts from the repository root, as described in the [workspace README](../../README.md). The package conventions are in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Frontier is licensed under the MIT License.
