# Shape

Shape in Frontier is rectangular with rounded corners. Edges are straight, corners are soft, and
borders exist only when they do work. The visual character comes from exact alignment and from the
contrast between surfaces, not from decoration.

See [Values](./values.md#radius) for the radius scale and [Borders](./values.md#borders) for widths.

## Rounded corners

Every surface and control uses a radius from the shared scale. The radius follows the role of the
element: a small mark uses the small radius, a large surface the large radius, and a control uses
the medium or large radius, or the full radius when it should read as a pill. A circle is reserved
for a form that carries meaning, such as a switch or an avatar. Icons use round caps and joins; see
[Icons](./icons.md).

## Borders are functional

Frontier has no structural or decorative borders. Surfaces and spacing group content. A border is
allowed only when a person must identify an edge:

- a field or another control whose target would be ambiguous without one;
- a separator between regions that spacing alone cannot distinguish;
- the edge of a floating surface that would otherwise blend into the page;
- a focus indicator, governed by [Focus](./focus.md).

A card, a section, or a panel does not get a border to look finished. If a group needs a visible
limit, use a surface change or a separator in the right place.

## Two widths

A functional border uses the functional width. A boundary that must stay distinct over a surface of
similar value may use the strong width. Width is chosen by the role of the edge, not by the size of
the element. The focus outline has its own rule in [Focus](./focus.md).

## Straight edges

Borders and separators are straight. There are no inset shadows, glows, or bevels. The edge of a
surface is either its boundary or its border, never both with a decorative effect.

## Nested alignment

A nested region aligns to its container's edges or to the grid. Where a border is present, the
content aligns to the inner edge, not to the outer one. Inconsistent insets make a surface look off
even when every value is correct.

## Principle

Shape should be exact and quiet: rounded corners, straight edges, and a border only where an edge
must be identified.
