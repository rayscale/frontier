# Elevation

Frontier is flat. There are no shadows, no glows, and no simulated depth. Layering is expressed
through surfaces and, only when necessary, a functional border.

See [Values](./values.md#surfaces) for surface roles and [Layering](./values.md#layering) for
stacking order.

## Three surfaces

The system has three surfaces:

- **Page** is the base.
- **Surface** groups content inside the page.
- **Overlay** floats above the page for popups, dialogs, and other temporary content.

A surface is separated from the surface below it by a change in value. The overlay is the most
distinct of the three and remains identifiable in both themes.

## No shadows

A shadow is never used to indicate elevation. It is also never used for decoration, focus, or
pressed states. If a floating element blends into the page, adjust the surface role; if an edge must
remain identifiable, add a functional border as defined in [Shape](./shape.md).

## Floating content

Floating content does not reflow the page. It sits above the layout, keeps its own alignment, and
returns to the page without leaving a gap or moving the content underneath.

## Modal surfaces

A modal surface uses a scrim to separate it from the page and follows the focus and dismissal rules
in [Popups](../patterns/popups.md). The scrim is a value change, not a blur or a shadow.

## Stacking order

Content that floats is ordered by role, never by arbitrary values. Sticky elements sit above the
page, overlays above sticky elements, popups above overlays, and tooltips and toasts above popups.
The concrete order is defined in [Values](./values.md#layering).

## Principle

Layering should be legible without depth effects: surfaces and, where necessary, edges carry the
hierarchy, and nothing casts a shadow.
