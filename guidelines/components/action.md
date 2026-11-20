# Action

An action triggers an operation. Buttons, links, and icon buttons are the common presentations. An
action does one thing, and its result follows the press without delay.

## One action per control

A control that looks like an action performs one operation. A control that performs two operations is
two actions, not one ambiguous control. The label names the result. See
[Writing](../content/writing.md).

## Variants

An action has an emphasis that matches its role on the surface.

- A **primary** action is the main operation. It uses the strongest fill.
- A **secondary** action is a supporting operation with a quiet fill.
- An **outline** action keeps a boundary and no fill at rest.
- A **ghost** action has neither fill nor boundary at rest and suits dense or repeated actions.
- A **danger** action names a destructive operation. It keeps its hue in the label and the boundary
  and never fills with the hue; the quiet danger surface appears under the pointer.
- A **link** action reads as text and moves to a destination.

Hierarchy comes from the variant, placement, grouping, and the space around an action. A surface
usually has one primary action. See [Hierarchy](../patterns/hierarchy.md).

## Press and response

The press is acknowledged on the frame it happens. The action contracts slightly under the press, so
it reads as pressed rather than merely recolored. That contraction is small and confined to the
action: neighbouring elements and the surrounding layout do not move. The same press response applies
to every action. See [Motion](../foundations/motion.md) and [States](../patterns/states.md).

Hover shifts the surface of the action to its hover value and the press to its active value; the
action keeps its size and position, and the change is a short transition, never a jump. See
[Colors](../foundations/colors.md).

When the operation takes time, the control shows a busy state and keeps its label. See
[Loading](../patterns/loading.md).

## Button, link, and icon button

- A **button** triggers an operation.
- A **link** moves to a destination and follows the navigation model. See
  [Sequential navigation](../patterns/sequential-navigation.md).
- An **icon button** is a button whose visible content is an icon. It always has an accessible name.

A control does not change its role when it becomes disabled or busy.

## Sizes

An action comes in a small, a medium, and a large size, each meeting the target size in
[Spacing](../foundations/spacing.md). Icon-only actions share those heights.

## Disabled

A disabled action stays visible and does not look like an enabled one. It does not respond to presses
and is explained where the context requires it. See [States](../patterns/states.md).

## Icon-only

An icon-only action is used when the icon is universally understood. It has an accessible name and a
tooltip that shows the name on hover and focus. An icon-only action never introduces a new symbol
without a label nearby, and a destructive action keeps visible text. See [Icons](../foundations/icons.md).

## Focus

Focus is visible on every action and appears without delay, because the person needs to know where
input goes before anything else. See [Focus](../foundations/focus.md). The action does not change
position or size when it receives focus.

## Principle

An action should say what it does and do exactly that, with feedback that confirms the press and
nothing more.
