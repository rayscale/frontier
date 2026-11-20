# Colors

Color in Frontier identifies a role. It never decorates. The system is monochrome by default: surfaces,
text, borders, and state are built from pure neutrals, and only `danger` carries a hue.

See [Values](./values.md#colors) for the palette and the value of each role.

## Roles

Every color has a job. Designs use the role, never a raw value.

- **Page** is the base surface of the interface.
- **Surface** groups content inside the page.
- **Overlay** is a floating surface above the page.
- **Text** has primary, muted, subtle, disabled, and inverse strengths.
- **Border** is functional: it marks an edge that must be identified, such as a field or a floating
  surface. Strong borders separate regions that need a clearer limit.
- **Highlight** is the neutral surface shown under the pointer or keyboard focus where a control
  takes one. A filled control moves its fill to the hover value instead. See
  [Surface shift](#surface-shift).
- **Pressed** is the stronger neutral surface shown while an input is held.
- **Selected** uses an inverse fill, not a tinted surface.
- **Primary** is the strongest neutral fill, used for the main action. Its text uses the inverse
  role, and the fill moves to its hover and pressed values under input.
- **Danger** is the only hue in the system. It marks errors, destructive actions, and danger states.
- **Danger subtle** is the quiet danger surface shown under the pointer on a destructive action; its
  pressed value is stronger.
- **Scrim** covers the page behind a modal surface.

## One hue

Only `danger` has color. Success, warning, and information are communicated with neutral text,
icons, and structure, and never with a colored surface or border. This keeps urgency scarce and
preserves the calm of the interface. See [Feedback](../patterns/feedback.md).

A danger treatment always appears with a word or an icon. Color never carries a state alone. See
[Accessibility](./accessibility.md).

## Two themes, one meaning

Light and dark share the same roles. A role keeps its job in both themes; only its value changes. A
role that works in one theme and disappears in the other is failing as a role, not as a theme.

## Contrast

Text and meaningful graphics meet WCAG AA in both themes. When a pair fails, the role is corrected
rather than the requirement. Contrast is checked for text over every surface on which it can appear,
including highlight and selected states.

## Surfaces

Frontier has three surfaces: page, surface, and overlay. They must remain distinguishable in both
themes. Separation comes from value contrast and, where an edge must be identified, a functional
border. There are no shadows; see [Elevation](./elevation.md).

## Selected and highlighted

A highlighted item uses the neutral highlight surface. A selected item uses the inverse fill with
inverse text. The two states remain distinguishable when they coexist. See
[Selection](../patterns/selection.md).

## Inverse fill

Primary and selected share one treatment: the strongest neutral as a fill, with the inverse text
role on top. The same fill marks any small element that must stand out from every surface it can
float over, such as a tooltip. Contrast with the surface identifies its edge, so an inverse fill
carries no border. See [Popups](../patterns/popups.md).

## Surface shift

A control changes its surface when the pointer hovers it or an input is held. A filled control moves
to its hover and pressed values; an outlined or ghost control adds the highlight and pressed
surfaces. A destructive action adds its quiet danger surface instead.

A surface shift happens inside the control's box. The box keeps its layout size and position, and
neighbouring elements and the surrounding layout do not move. The text keeps contrast with the fill
in every state. See [Shape](./shape.md).

The condition that triggers a surface shift belongs to the interaction that uses it.

## Principle

Color should identify a role, never decorate. Only `danger` carries a hue, and no state depends on
color alone.
