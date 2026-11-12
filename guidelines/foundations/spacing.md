# Spacing

Spacing creates grouping and rhythm. It tells a person what belongs together before they read a
word. Metric uses one base-4 scale, one comfortable density, and a clear minimum target size.

See [Values](./values.md#spacing) for the scale and [Controls](./values.md#controls) for heights.

## One scale

Every gap and inset comes from the shared scale. An unplanned value breaks the rhythm and makes
elements look slightly misaligned. A new value is justified only when no step can express the
relationship.

## Proximity groups

Space inside a group is smaller than space between groups. A label sits closer to its control than
to the next field. Items in a list sit closer to each other than to the list's heading. When two
elements look equally related, the spacing has failed.

## One comfortable density

The system uses a single comfortable density. It is designed for reading and for mixed content, not
for maximum data per screen.

Data-heavy surfaces may use a tighter internal rhythm, but they draw it from the same scale and keep
the same proportions between label, value, and padding. There is no separate compact mode. See
[Data display](../patterns/data-display.md).

## Stable insets

The space between a control's edge and its content stays consistent across sizes. A small control
should not look cramped next to a large one. Inset relationships are part of the control family, not
a per-instance choice.

## Target size

A control's visible height is at least 36. On touch platforms, the interactive area is expanded to
at least 44 without changing the visible height, and interactive areas never overlap.

A larger target is always acceptable. A smaller one is not.

## Density is not an excuse

Tightening space is never allowed to make labels unreadable, targets unreachable, or groups
ambiguous. When content does not fit, the answer is layout, disclosure, or scrolling, not smaller
spacing.

## Principle

Space should make the structure readable without a line or a color: related things sit together,
and unrelated things have room.
