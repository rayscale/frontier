# Themes

A theme is a named set of values that restyles the whole interface. It changes how Frontier looks without changing how it works. Frontier is the default theme, and [Values](./values.md) states its values. Light and dark are [modes](./colors.md#two-modes-one-meaning) of a theme, not themes of their own, so every theme defines both.

## What a theme changes

A theme changes values and leaves the rules alone. These values are open to it:

- The color of every role, in both modes.
- The steps of the radius scale and the border widths.
- The color and the offset of focus.
- The shadows.

## What a theme keeps

A theme never changes what the guidelines require of every interface.

- **Roles.** A role keeps its job. A theme does not add, remove, or reassign a role.
- **Contrast.** Text and meaningful graphics meet WCAG AA in both modes, and focus stays visible against the surfaces it appears on. See [Colors](./colors.md#contrast) and [Accessibility](./accessibility.md).
- **Structure.** Radius steps keep their order, so a larger container still has a larger curve than the control inside it. See [Shape](./shape.md).
- **Behavior.** States, motion, and interaction follow the patterns and components. A theme does not change how anything responds.
- **Precedence.** The principles keep their order, and clarity comes first. See [Principles](../principles/README.md).

## Conformant and extended

A theme is one of two kinds, and it says which.

- **A conformant theme** changes only the values above and meets every requirement of [what a theme keeps](#what-a-theme-keeps). It is Frontier in another voice.
- **An extended theme** departs from a guideline on purpose. A theme set in another typeface departs from [Typeface](./typeface.md), and a theme with sharp corners departs from [Shape](./shape.md). It names each departure, with the guideline and the reason, so the departure is a decision and not an accident.

An extended theme can depart from how Frontier looks, never from whether people can use it. Contrast and focus always apply, so a departure never includes [Accessibility](./accessibility.md).

When many extended themes depart from the same guideline, the guideline is the thing to question. A foundation changes only when the change affects the whole system, and a theme that needs a different value should first ask whether the foundation is wrong.

## Declaring a theme

A theme declares its name, its kind, and its departures. The declaration is part of the theme, and it is published with the theme so people can see what the theme keeps and what it changes.

The requirements that a measurement can check are checked automatically in both modes. A conformant theme that fails a check is not conformant, and an extended theme that fails one is not finished.

## Applying a theme

A theme applies to the root of a page or to any region inside it. A region uses its own theme, and a region without one uses the theme around it. People or the product choose a theme, and a component never chooses its own.

Changing the theme or the mode changes values only. Content, layout, and behavior stay where they are, so the change is easy to follow. See [Continuity](../principles/continuity.md).

## Principle

A theme should change how Frontier feels, never whether it can be understood.
