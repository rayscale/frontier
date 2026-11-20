# Symbols

Symbols are simple, single-color pictograms drawn on a shared grid. They communicate meaning quickly and must stay legible at small sizes.

## Grid and size

- Design on a **24 × 24 px** artboard.
- Keep the visible artwork inside a **20 × 20 px** safe area (2 px padding on every side).
- Use a consistent **2 px** stroke weight.
- Round line caps and joins (`round`).
- Align strokes to the pixel grid where possible to avoid blur.

## Color

- Symbols use a **single color**: `currentColor` by default.
- Do not bake brand or semantic colors into the symbol. Apply color through the consuming component or token.
- Symbols should render correctly in both light and dark themes by inheriting text color.

## Style

- Prefer outlined symbols. Filled symbols are reserved for states such as "selected" or "active".
- Keep geometry simple: avoid fine detail, thin strokes, and complex gradients.
- Use consistent corner radius and terminal shapes across the set.
- Avoid text, logos, or overly specific illustrations.

## Accessibility

- Decorative symbols must be hidden from assistive technology (`aria-hidden`).
- Meaningful symbols need an accessible label (`aria-label` or visible text).
- Never rely on color alone to convey state; pair symbols with text or shape changes.

## Usage in code

- Symbols are React components rendering an inline `<svg>`.
- Size, color, and stroke are controlled via props (`size`, `color`, `strokeWidth`).
- Prefer inheriting `currentColor` and the surrounding text size.
