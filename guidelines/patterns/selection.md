# Selection

Selection is a committed choice that persists. Frontier supports single selection only. Multiple
independent choices are expressed with [toggles](../components/toggle.md), not with a multi-select
mode.

## Selected, current, and active

These are different facts and must not share one treatment:

- **Selected** is a value the person chose.
- **Current** is the location a person is viewing, such as the active page in a navigation bar.
- **Active** describes a control that is currently engaged by the interaction, such as a pressed
  button or a tab receiving input.

A selected row is not a current page. An active tab is current, not selected. Each context owns its
vocabulary and its treatment.

## Selection persists

A selected value stays selected until another value replaces it. It does not clear when the pointer
leaves, when focus moves, or when a popup closes.

When a control explicitly supports clearing a selection, the action is visible and reversible. A
second activation does not silently deselect a radio-like choice.

## One selected value per group

A choice group has at most one selected value. Selecting a new value replaces the previous one. The
group never holds two selections, and it never uses checkmarks to represent a single choice.

## Selection and highlight

The highlight follows the pointer or keyboard and is temporary. Selection is committed and
persistent. Both can be visible at once, and they remain distinguishable. See
[Highlight](./highlight.md) and [States](./states.md).

## Selection and focus

Focus is independent of selection. A person can move focus through options without changing the
selected value. Selection changes only on an explicit confirmation, never on focus alone.

## Multiple independent choices

A group of independent on/off values is a group of toggles. It is not a multi-select list. Each
toggle has its own label and its own state.

Bulk selection of records requires an explicit exception documented in the surface that needs it.
The exception states which selection model applies, how the selection is cleared, and how it is
announced.

## Announcing selection

The selected state is part of the control's accessible state, not only its appearance. A person
using assistive technology can determine which value in a group is selected.

## Principle

A selected value should be unambiguous, persistent, and distinct from where focus or the pointer
happens to be.
