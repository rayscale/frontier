# Layout

Layout is the first layer of hierarchy. Metric uses an adaptive grid, a mobile-first strategy, and
a controlled reading width, so the same content reads well on every screen.

See [Values](./values.md#layout) for breakpoints, columns, margins, and gutters.

## Mobile first

Design starts at the narrowest supported width and adds columns and space as the viewport grows.
Desktop layouts are not compressed into small screens; the structure adapts.

## Adaptive grid

The grid uses four columns at compact widths, eight at medium widths, and twelve at expanded and
wide widths. Content spans whole columns. An element does not sit half a column away from the grid
without a documented optical reason.

## Breakpoints follow content

A breakpoint is introduced when the content stops reading well, not because a device category
exists. The named widths in [Values](./values.md#layout) are defaults; an implementation may move a
breakpoint only when the content requires it, and the change is recorded.

## Reading width

Long-form text is limited to a comfortable measure rather than stretching across the full viewport.
Data-dense surfaces may use the full content width, but text inside them keeps a readable measure.

## Page margins and gutters

Margins and gutters come from the spacing scale. They grow with the viewport but never become so
large that the content loses its relationship to the page. Nested regions align to the outer grid
where possible.

## Overlays do not reflow the page

A popup, dialog, tooltip, or toast floats above the layout. Opening one does not move the content
underneath it and does not introduce a second alignment system.

## One reading order

The visual order, the keyboard order, and the assistive reading order agree. A layout that requires
a different order for each is restructured rather than patched.

## Principle

The layout should remain understandable at every width, with the same reading order and the same
hierarchy.
