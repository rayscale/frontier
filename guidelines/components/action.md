# Action

An action triggers an operation. Buttons, links, and icon buttons are the common presentations. An
action does one thing, and pressing it happens instantly.

## One action per control

A control that looks like an action performs one operation. A control that performs two operations is
two actions, not one ambiguous control. The label names the result. See
[Writing](../content/writing.md).

## Press and response

The press is acknowledged immediately. There is no press animation. When the operation takes time,
the control shows a busy state and keeps its label. See [Loading](../patterns/loading.md).

## Button, link, and icon button

- A **button** triggers an operation.
- A **link** moves to a destination and follows the navigation model. See
  [Navigation](../patterns/navigation.md).
- An **icon button** is a button whose visible content is an icon. It always has an accessible name.

A control does not change its role when it becomes disabled or busy.

## Hierarchy without weight

Metric has one text weight and one surface weight. Actions do not create hierarchy through border
width, shadow, or rounded containers. Hierarchy comes from placement, grouping, and the amount of
space around the action. See [Structure](../principles/structure.md) and
[Shape](../foundations/shape.md).

A destructive action is never visually louder through color or shape. Its label names what it
destroys. See [Colors](../foundations/colors.md).

## Disabled

A disabled action remains visible and reachable and explains why it is unavailable. It does not look
like an enabled action and does not respond to presses. See [States](../patterns/states.md).

## Icon-only

An icon-only action is used when the icon is universally understood or when the label is available
as an accessible name and tooltip. An icon-only action never introduces a new symbol without a
label nearby.

## Focus

Focus is visible on every action. See [Focus](../foundations/focus.md). The action does not move
when it receives focus.

## Principle

An action should say what it does and do exactly that, with no animation and no visual performance.
