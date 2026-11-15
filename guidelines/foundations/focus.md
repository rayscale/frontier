# Focus

Focus shows where keyboard interaction is directed. In Frontier it is a visible, square outline that
never depends on color alone and never disappears.

See [Values](./values.md#focus) for the outline width and offset.

## The outline

Focus is drawn as an outline at the width and offset defined in [Values](./values.md#focus). The
outline is square and follows the element's rectangular boundary. It uses the strongest text role
of the theme, so it
remains visible on page, surface, highlight, and selected states.

A component does not replace the outline with a border, a background change, or a shadow.

## When it appears

The outline appears when the element receives keyboard focus. A pointer press does not draw the
outline; if the element already had keyboard focus, the outline remains until focus moves.

## Never hidden

The focus outline is never removed, clipped, or covered by an overlay. If an element sits at the
edge of a scrolling region, the region leaves enough room for the outline. If an element is inside
a floating surface, the outline is drawn inside the visible area or the surface leaves space for it.

## Focus is not selection

Focus, highlight, and selection are different facts and must remain distinguishable when they
coexist. The state model is defined in [States](../patterns/states.md), and selection in
[Selection](../patterns/selection.md).

## Disabled elements

A disabled element remains focusable and keeps a visible focus outline. Its unavailable state is
communicated by text and structure, so a keyboard user can reach it and understand why it cannot be
used. See [Accessibility](./accessibility.md).

## Principle

A person using a keyboard should always be able to see where focus is, without relying on color and
without losing the outline to another state.
