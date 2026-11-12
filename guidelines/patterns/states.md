# States

A state describes the condition of an element at a given moment. Metric uses a small, consistent set
of states so a person can understand what an element is doing and how it will respond.

## The states

- **Default** is the resting condition. It is calm and does not draw attention.
- **Hover** previews pointer interaction. It never implies a commitment.
- **Pressed** confirms that an input was received. It lasts only while the input is held.
- **Focus** shows where keyboard interaction is directed. See [Focus](../foundations/focus.md).
- **Selected** communicates a committed value and persists. See [Selection](./selection.md).
- **Disabled** communicates that an element is unavailable.
- **Loading** communicates that content or an action is in progress. See [Loading](./loading.md).
- **Error** communicates that a value or an action failed and needs a response.

## States combine

States can coexist. A selected item may also be hovered, focused, or loading. Each meaning remains
discernible when they combine; one state never hides another.

Focus always remains visible alongside hover and selection. Selection persists when the pointer
leaves. A pressed state ends when the input is released, even if the result is selected.

## Hover is optional

Touch produces no persistent hover. A design never depends on hover to reveal information, expose an
action, or explain a state. Hover is an enhancement for pointer users. See
[Accessibility](../foundations/accessibility.md).

## Disabled

A disabled element remains reachable by keyboard and explains why it is unavailable. It does not
look like an enabled element and does not accept an action it cannot perform. Its unavailability is
communicated with text and structure, not color alone.

## Loading

A loading element keeps its layout and its label. It does not disappear, shrink, or move. The
loading state is announced as status, not as an alert, unless the wait blocks the task.

## Error

An error state is attached to the element that failed. It includes a message that explains what
happened and what to do next. An error is not communicated by a red border alone; see
[Feedback](./feedback.md) and [Forms](./forms.md).

## Incomplete states

An element in an invalid, incomplete, or read-only condition uses the closest defined state and
documents the addition in its component. New states are not invented per component.

## Principle

Each state has one meaning. When states coexist, a person can still tell what is focused, what is
highlighted, what is selected, what is unavailable, and what is in progress.
