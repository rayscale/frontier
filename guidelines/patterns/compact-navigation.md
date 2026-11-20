# Compact navigation

Navigation that fits in a row on a wide screen does not fit on a narrow one. Compact navigation keeps the same destinations and presents them in a vertical panel that unfolds from the header.

## One set of destinations

The destinations, their order, and their grouping do not change with the width. Only the presentation changes: a row with dropdowns becomes a column with disclosure rows. A destination that exists on a wide screen exists on a narrow one.

## The panel belongs to the header

The panel unfolds from the header and extends it as one surface. It uses the same fill, its corners continue the header's, and no seam separates the two. When the header floats, the floating header grows downward instead of a second surface appearing beneath it.

The panel floats above the page. Opening it does not move the content underneath, in line with [Layout](../foundations/layout.md).

## Disclosure rows

A group of destinations opens in place as a disclosure, following [Hierarchy](./hierarchy.md). One group is open at a time. A group that also has its own page needs a separate destination for that page, so a row never toggles and navigates at once.

## Opening and closing

A single button opens the panel. It has an accessible name and announces whether the panel is open. The panel closes when:

- the user presses Escape, and focus returns to the button;
- the user presses outside the header;
- the user activates a destination.

A header that hides while scrolling stays visible while its panel is open. The panel scrolls inside itself when its content is taller than the screen.

## The breakpoint

The navigation becomes compact at 48 rem, where a typical set of destinations stops fitting in a row. This moves the compact breakpoint in [Values](../foundations/values.md#layout), as [Layout](../foundations/layout.md) allows, and the change is recorded there.

## Motion

The panel unfolds with the enter motion and leaves with the shorter exit motion. Its destinations enter in a short sequence that never delays access to them. The button's bars turn into a close mark. Under reduced motion, the panel changes state without movement, sequence, or animated size. See [Motion](../foundations/motion.md).

## Principle

The same destinations should be one press away at every width, without moving the page.
