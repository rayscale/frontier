# Icons

Icons are part of the Frontier language. They are drawn on a shared grid, use one geometry, and carry
meaning rather than decoration. The set is owned by Frontier and follows the same restraint as the
rest of the system.

See [Values](./values.md#icons) for sizes, grid, and stroke.

## One geometry

Icons are drawn on a 24-unit grid with a 1.5-unit stroke, square caps, and square joins. The
outline is the default form. A selected or active icon may switch to a filled form, but the
silhouette does not change between the two.

## Three sizes

Only three sizes are used:

- **16** for an icon inline with text.
- **20** for an icon inside a control.
- **24** for navigation or a standalone action.

Smaller sizes are not part of the system. Larger renderings are illustrative and not interface
icons.

## Optical alignment

An icon aligns to the cap height of the text it accompanies, not to the geometric center of the
text box. Inside a control, it aligns to the center of the control. When an icon and a label sit
together, the gap comes from the spacing scale, and the pair is treated as one unit for alignment.

## Color

An icon inherits the color of the text it accompanies. It has no color of its own. `danger` is used
only for a destructive action or a danger state, and always together with a word or an accessible
name.

## Meaningful and decorative icons

An icon that carries meaning has an accessible name or is accompanied by visible text. An icon that
only decorates is hidden from assistive technology and never carries information on its own. An
icon is never the only signal of a state. See [Accessibility](./accessibility.md).

## Icon-only controls

A control may show only an icon when the action is familiar and the control has an accessible name
and a visible tooltip on hover or focus. Destructive actions keep visible text. A new or ambiguous
action is never icon-only.

## Direction

Directional icons mirror in right-to-left layouts: arrows, chevrons, back and forward, and any icon
whose meaning depends on reading direction. Icons that represent objects, brands, or media controls
do not mirror.

## Motion

An icon does not transform into another icon and does not move on its own. It may change form to
show its state, and it may accompany the transition of the surface it belongs to, since the surface
explains the change and the icon travels with it. The indeterminate spinner is an indicator, not an
icon in the set. See [Motion](./motion.md).

## Inventory

The set covers navigation, actions, status, objects, media, files, and communication. A new icon is
added only when no existing icon carries the meaning. Icons are not drawn per component.

## Principle

An icon should be recognizable, optically aligned, and subordinate to the meaning it supports.
