# Choice

A choice selects one value from a set of mutually exclusive options. It is the contract behind
radio groups, selects, segmented controls, and option lists.

## One value

A choice group has at most one selected value. Selecting a new option replaces the previous one. The
group never holds two selections. Multiple independent values use toggles. See
[Selection](../patterns/selection.md).

## Options

Every option has a label, a value, and an enabled or disabled state. An option may carry a short
description when the choice is not self-evident. Options keep their order between openings unless
the content explicitly sorts them.

## Highlight and selection

The highlight follows the pointer or keyboard and is temporary. The selected option keeps its own
treatment. Both can be visible at once. See [Highlight](../patterns/highlight.md).

## Keyboard

Arrow keys move the highlight between options. The selected option does not change until the person
confirms. Enter or Space confirms the highlighted option. Home and End move to the first and last
option. See [Keyboard](../patterns/keyboard.md).

## Disabled options

A disabled option is visible and reachable but cannot be selected. It explains why when the context
requires it. A disabled option never receives the highlight. If all options are disabled, the group
itself explains why.

## Popup presentations

When the options appear in a popup, the popup follows [Popups](../patterns/popups.md). The selected
value remains visible in the trigger after the popup closes. The trigger keeps focus when the
options are dismissed.

## Inline presentations

When options are shown together, the selected one is visually distinct without relying on color
alone. A radio mark, a check, or an inverted surface is acceptable; a faint tint is not.

## Empty and loading

A choice with no available options shows an empty state with a reason and a next step. A choice that
is loading keeps its label and its dimensions. See [Loading](../patterns/loading.md).

## Principle

A choice should make the selected value clear, allow only one value, and never hide an option's
state.
