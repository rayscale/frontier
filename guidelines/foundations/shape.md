# Shape

Shape in Metric is rectangular. Corners are square, edges are straight, and borders exist only when
they do work. The visual character comes from exact alignment and from the contrast between
surfaces, not from rounding or decoration.

See [Values](./values.md#radius) for the radius and [Borders](./values.md#borders) for widths.

## Square corners

The radius is zero for every surface, control, icon, and overlay. There are no capsules, circles, or
softened corners. A status dot or an avatar may be the only exception, because its form carries
meaning rather than decoration.

## Borders are functional

Metric has no structural or decorative borders. Surfaces and spacing group content. A border is
allowed only when a person must identify an edge:

- a field or another control whose target would be ambiguous without one;
- a separator between regions that spacing alone cannot distinguish;
- the edge of a floating surface that would otherwise blend into the page;
- a focus indicator, governed by [Focus](./focus.md).

A card, a section, or a panel does not get a border to look finished. If a group needs a visible
limit, use a surface change or a separator in the right place.

## Two widths

A functional border is 1 unit wide. A boundary that must stay distinct over a surface of similar
value may use 2 units. Width is chosen by the role of the edge, not by the size of the element. The
focus outline has its own rule in [Focus](./focus.md).

## Straight edges

Borders and separators are straight and square. There are no inset shadows, glows, or bevels. The
edge of a surface is either its boundary or its border, never both with a decorative effect.

## Nested alignment

A nested region aligns to its container's edges or to the grid. Where a border is present, the
content aligns to the inner edge, not to the outer one. Inconsistent insets make a rectangle look
off even when every value is correct.

## Principle

Shape should be exact and quiet: square corners, straight edges, and a border only where an edge
must be identified.
