# Accessibility

Accessibility is the baseline for every Frontier design. A design is not finished until it works with
a keyboard, a pointer, touch, and assistive technology. Frontier does not treat accessibility as a
separate mode.

## Contrast

Text and meaningful graphics meet WCAG AA in both themes. A control's boundary meets the non-text
contrast requirement where the boundary is needed to identify it. Disabled text is exempt from the
contrast requirement but still remains readable.

## Keyboard

Every enabled interactive element is reachable and operable by keyboard. The keyboard order follows
the reading order. Focus is always visible and follows [Focus](./focus.md). A modal surface keeps
focus inside it and returns focus to its invoker when it closes.

## Names

Every interactive element has a name a person can understand. The visible label is part of that
name, so a spoken name matches what is on screen. An icon-only control has a name that describes its
action. Decorative icons are hidden from assistive technology. See [Icons](./icons.md).

## No hover dependency

Information and actions never depend on hover. Hover is an enhancement. Touch, keyboard, and
assistive input must reach the same result through a visible path.

## No color dependency

Color never carries a state alone. Selection, status, error, and disabled states include text, an
icon, a shape, or a structural change. `danger` is the only hue, and it always has a companion
signal. See [Colors](./colors.md).

## Touch

A control's visible height is at least 36. The interactive area is at least 44 on touch platforms
and never overlaps a neighboring target. See [Spacing](./spacing.md).

## Disabled elements

A disabled element remains reachable by keyboard and explains why it is unavailable. Its
unavailability is communicated with text and structure, not with a faint appearance alone. See
[States](../patterns/states.md).

## Motion

A person who prefers reduced motion keeps every outcome. Movement becomes an instant change or a
simple fade, looping motion stops, and the information the movement carried remains visible in the
final state. Motion is never the only signal of a state, and it never delays an action or a change
of focus. See [Motion](./motion.md).

## Forms

Every field has a visible label. Errors appear next to the field and in a summary at the start of
the form. The summary links to the fields it describes. An error explains what happened and how to
resolve it. See [Forms](../patterns/forms.md) and [Writing](../content/writing.md).

## Language and direction

The interface supports translation and right-to-left layouts. Text is not embedded in images. Space
allows for longer translations. Directional icons mirror; code remains left to right. See
[Writing](../content/writing.md).

## Automated checks

Automated checks catch a subset of problems. They do not confirm that an interface is
understandable. A design is also checked with a keyboard and, where possible, with a screen reader.

## Principle

Everything Frontier offers should be available to everyone, through every input, without a separate
mode.
