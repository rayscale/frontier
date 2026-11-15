# Toggle

A toggle sets one independent value on or off. It is the contract behind checkboxes and switches.
A group of toggles expresses multiple independent choices, which is the only multiple-choice model in
Frontier.

## Independent state

Each toggle owns its value. Toggling one does not change another, even when they are shown in a
group. A group may have a collective label and shared help text, but it does not have a group
selection.

## Two states

A toggle is on or off. An indeterminate mark may appear when a group of toggles has mixed values,
but the mark describes the group, not an individual toggle. An individual toggle is never ambiguous.

## Keyboard

Space and Enter both toggle the focused value. A toggle has one result and nothing to confirm
separately, so it accepts the two activation keys a person already expects and needs no third
gesture. See [Keyboard](../patterns/keyboard.md).

## Labels

A toggle has a visible label that describes the value it controls. The label is part of the
accessible name. A switch may place its label next to the track; a checkbox places it next to the
mark. Icon-only toggles are not part of the system.

## State and feedback

The change is visible immediately: the mark or the track settles into its new state in a short
transition that starts on the press frame and never overshoots. The transition shows which value
became active; it does not delay the value. When the change must be saved, the surface shows the
pending or saved state; the toggle itself does not pretend that the change is already durable. See
[Motion](../foundations/motion.md).

## Disabled

A disabled toggle remains reachable and explains why it is unavailable. It does not look enabled and
does not accept a change. See [States](../patterns/states.md).

## Group semantics

A group of toggles has a name and, where useful, help text. The group does not use a selected state;
each toggle reports its own state. A "select all" control is a convenience that changes the group,
not a third state of an individual toggle.

## Principle

A toggle should describe exactly one independent value, and its state should be readable without
color.
