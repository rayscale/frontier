# Field

A field is where a person types or edits a value. Typing is the primary action, so the field keeps
focus while the person types. A field may stand alone or host suggestions.

## Typing keeps focus

When a field offers suggestions, navigation keys move through them while focus stays in the field.
A person should always know whether they are typing or navigating. See [Search](../patterns/search.md).

## Label and name

Every field has a visible label that describes the value. The label is part of the field's
accessible name. Help text explains a constraint before the person encounters it. See
[Forms](../patterns/forms.md).

## Editing state

Focus is a meaningful state for a field, not an incidental one. The focus treatment follows
[Focus](../foundations/focus.md). A field with a value and no focus remains visually calm.

When a field takes focus, its boundary takes the focus color and the focus outline grows outward
from the boundary in a short transition, so the person sees which field is being edited. The
transition is direct, because it answers an input, and it runs the same way when focus moves on. An invalid field
keeps its danger boundary. The field keeps its layout size and its content does not move. When a
person prefers reduced motion, the change is instant. See [Focus](../foundations/focus.md) and
[Motion](../foundations/motion.md).

## Suggestions

Suggestions narrow as the person types and keep a stable order where possible. An option that
remains in the results keeps its place. The selected value is separate from the query and from the
suggestions.

When a suggestion is highlighted, it must be a valid, enabled option. If a new query removes it,
the highlight clears or moves to a relevant remaining option. Disabled options never receive the
highlight.

## Empty results

When nothing matches, the suggestions say so clearly. An empty result is not a loading state and
does not show a highlight. It offers a way to clear the query when that helps.

## Keyboard

Navigation keys move the highlight through suggestions without leaving the field. A confirming key
commits the highlighted option and closes the suggestions. Escape dismisses the suggestions without
changing the value. See [Keyboard](../patterns/keyboard.md).

## Error and read-only

An invalid value shows a message next to the field. The message explains what is wrong and how to
fix it. A read-only field remains focusable and selectable but cannot be edited. See
[Forms](../patterns/forms.md).

## Principle

Typing should feel immediate, and results should follow without surprise. The field keeps focus and
the person keeps control.
