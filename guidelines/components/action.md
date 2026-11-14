# Action

An action triggers an operation. Buttons, links, and icon buttons are the common presentations. An
action does one thing, and its result follows the press without delay.

## One action per control

A control that looks like an action performs one operation. A control that performs two operations is
two actions, not one ambiguous control. The label names the result. See
[Writing](../content/writing.md).

## Press and response

The press is acknowledged on the frame it happens. The action moves by the press distance, so it
reads as pressed rather than merely recolored. That movement is small and immediate, and it is
confined to the action: the control keeps its size, and neighbouring elements and the surrounding
layout do not move.

How the press is expressed for each input source belongs to [States](../patterns/states.md).

When the operation takes time, the control shows a busy state and keeps its label. See
[Loading](../patterns/loading.md).

## Hover inverts emphasis

An action exchanges its fill for its boundary under the pointer: a filled action clears its fill and
shows the boundary it already had, and an outlined action takes the fill. The person sees the same
action from its opposite emphasis, so hover is unmistakable without adding a new treatment to the
system.

The exchange follows [Colors](../foundations/colors.md): the text role inverts with the fill, and
the action keeps its size and position. It is a short transition, never a jump. Press keeps the
hovered emphasis and adds the pressed surface; it does not revert to the resting emphasis while the
pointer is still there.

Two roles keep their own hover. A destructive action fills with its hue under the pointer and stays
filled while pressed: the label already names the result, and the hue appears only at the moment of
commitment, so a destructive action stays quiet at rest. A ghost action has no boundary to exchange
and adds the neutral highlight surface instead.

Hover previews the press without committing to it, and focus is separate from both. See
[States](../patterns/states.md) and [Motion](../foundations/motion.md).

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

A destructive action is never louder than a safe one at rest. Its label names what it destroys, and
its hue appears only under the pointer and while pressed. See [Colors](../foundations/colors.md).

## Disabled

A disabled action remains visible and reachable and explains why it is unavailable. It does not look
like an enabled action and does not respond to presses. See [States](../patterns/states.md).

## Icon-only

An icon-only action is used when the icon is universally understood or when the label is available
as an accessible name and tooltip. An icon-only action never introduces a new symbol without a
label nearby.

## Focus

Focus is visible on every action and appears without transition, because the person needs to know
where input goes before anything else. See [Focus](../foundations/focus.md). The action does not
change position or size when it receives focus.

## Principle

An action should say what it does and do exactly that, with feedback that confirms the press and
nothing more.
