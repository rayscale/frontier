# Colors

Color in Metric identifies a role. It never decorates. The system is monochrome by default: surfaces,
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
  takes one; a filled control may instead clear its fill and show its boundary. See
  [Emphasis exchange](#emphasis-exchange).
- **Pressed** is the stronger neutral surface shown while an input is held.
- **Selected** uses an inverse fill, not a tinted surface.
- **Primary** is the strongest neutral fill, used for the main action. Its text uses the inverse role.
- **Danger** is the only hue in the system. It marks errors, destructive actions, and danger states.
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

Metric has three surfaces: page, surface, and overlay. They must remain distinguishable in both
themes. Separation comes from value contrast and, where an edge must be identified, a functional
border. There are no shadows; see [Elevation](./elevation.md).

## Selected and highlighted

A highlighted item uses the neutral highlight surface. A selected item uses the inverse fill with
inverse text. The two states remain distinguishable when they coexist. See
[Selection](../patterns/selection.md).

## Emphasis exchange

A control may exchange its fill for its boundary when its emphasis changes. A fill and its text role
always change together, so a filled surface takes the text role that keeps contrast; one never moves
without the other.

An exchange changes only what sits inside the control's box. The box keeps its size and its position,
and neighbouring elements and the surrounding layout do not move. See [Shape](./shape.md).

The condition that triggers an exchange belongs to the interaction that uses it.

## Principle

Color should identify a role, never decorate. Only `danger` carries a hue, and no state depends on
color alone.
