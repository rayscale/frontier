# Colors

Color communicates roles. It tells the user what a surface is for, what a piece of text means, and what status something carries. Decoration is secondary. The palette is restrained: mostly neutral surfaces, with a small set of accents and status colors used sparingly.

See [Values](./values.md#colors) for the exact colors of each role.

## Roles

Each color has a job. Designs should use the role, not a specific color value.

- **Surface** holds the page, containers, popups, and emphasis areas.
- **Text** appears in a primary and a secondary strength. Secondary text supports, and never replaces, primary information.
- **Primary** marks the main action and the active indicator. It is the only accent in the system.
- **Status** colors (danger, success, warning, and information) signal the outcome of an action or the condition of an item. They always appear with text or an icon.
- **Highlight** is a neutral surface that marks the option under the pointer or keyboard.

| Do                                                                  | Don't                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| Use the primary color for the main action and the active indicator. | Use the primary color to decorate headings or illustrations. |

## Two modes, one meaning

Light and dark modes share the same roles. A role keeps the same job in both modes, even though its value changes. A designer should never choose a color for one mode that breaks the role in the other. If a role looks correct in light mode but disappears in dark mode, the role is failing, not the mode.

A theme may change the value of a role in both modes, but never its job. See [Themes](./themes.md).

## Contrast

Text and meaningful graphics meet WCAG AA contrast in both modes. Status colors must pass for the text they color. When a color fails, the fix is to adjust the role's color, not to weaken the requirement or to rely on color alone. Color may reinforce a state, but it never carries one alone. See [Selection](../patterns/selection.md) and [States](../patterns/states.md).

| Do                                                                     | Don't                                                                    |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Show a failed upload with a danger icon and the words "Upload failed". | Show a failed upload with red text alone.                                |
| Adjust the color of a status role until the text it colors passes.     | Keep a status color that fails and rely on the person to read it anyway. |

## Surfaces and depth

Surfaces at different levels must remain distinguishable in both modes. Color supports this distinction but does not replace the depth and layering rules in [Elevation](./elevation.md).

## Principle

Color should tell the user what something is for. Every role must remain legible, distinct, and correct in both modes.
