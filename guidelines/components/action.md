# Action

An action triggers an operation. Buttons, links, and icon buttons are the common presentations. An
action does one thing, and its result follows the press without delay.

## One action per control

A control that looks like an action performs one operation. A control that performs two operations is
two actions, not one ambiguous control. The label names the result. See
[Writing](../content/writing.md).

## Press and response

The press is acknowledged on the frame it happens. The action contracts slightly under the press, so
it reads as pressed rather than merely recolored. That contraction is small and immediate, and it is
confined to the action: the control keeps its layout size, and neighbouring elements and the
surrounding layout do not move.

How the press is expressed for each input source belongs to [States](../patterns/states.md).

When the operation takes time, the control shows a busy state and keeps its label. See
[Loading](../patterns/loading.md).

## Hover shifts the surface

An action keeps its emphasis under the pointer. A filled action moves its fill to the hover value
and keeps the text role that contrasts with it; an outlined action keeps its boundary and adds the
neutral highlight surface; a ghost action adds the same highlight surface. The action keeps its size
and position, and the change is a short transition, never a jump.

Press builds on the hover state. A filled action moves to its pressed value, and an outlined or ghost
action replaces the highlight with the pressed surface; neither reverts to the resting emphasis
while the pointer is still there. See [Colors](../foundations/colors.md) and
[States](../patterns/states.md).

A destructive action keeps its hue in its label and boundary and adds the quiet danger surface under
the pointer; it never fills with the hue. The label already names the result, so the action stays
quiet at rest and the hue remains a warning rather than a fill.

Hover previews the press without committing to it, and focus is separate from both. See
[Motion](../foundations/motion.md).

## Button, link, and icon button

- A **button** triggers an operation.
- A **link** moves to a destination and follows the navigation model. See
  [Navigation](../patterns/navigation.md).
- An **icon button** is a button whose visible content is an icon. It always has an accessible name.

A control does not change its role when it becomes disabled or busy.

## Hierarchy without weight

Frontier has one text weight and one surface weight. Actions do not create hierarchy through border
width, shadow, or decorative framing. Hierarchy comes from placement, grouping, and the amount of
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
