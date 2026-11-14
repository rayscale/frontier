# Highlight

The highlight marks the option currently under the pointer or the keyboard inside a group. It is
temporary, follows the input, and never means that a value was chosen.

## One highlight

A group shows at most one highlight. When the pointer moves, the highlight moves with it. When the
keyboard navigates, the highlight follows the keyboard. The highlight never splits between two
options.

## Not selection

The highlight does not change the selected value. A person can move the highlight through a list
without committing anything. The selected value keeps its own treatment while the highlight moves.
See [Selection](./selection.md).

## Movement

The highlight travels to its new option in a short movement that settles without overshoot. The
travel is what tells the person the highlight followed their input instead of appearing there.

A new highlight that appears for the first time, or a group that first receives focus, shows the
highlight already in place on the first frame. It does not fly in from an earlier position.

When input changes while the highlight is still moving, it continues toward the newest option. It
does not finish the abandoned move first and then start again. There is no trail, no glow, and no
second indicator. When a person prefers reduced motion, the highlight jumps.

See [Motion](../foundations/motion.md) and [Continuity](../principles/continuity.md).

## Valid targets only

A disabled or unavailable option never receives the highlight. If the highlighted option disappears
because the content changed, the highlight clears or moves to the nearest valid option. It never
remains on an option that no longer exists.

## Visible without hover

The highlight is also the keyboard position inside a group. It must be visible when the group has
keyboard focus, and it must not depend on the pointer being present. See
[Keyboard](./keyboard.md).

## Highlight and focus

The highlight is not focus. Focus marks the control that receives input; the highlight marks the
option inside that control. When both exist, both remain visible. See
[Focus](../foundations/focus.md).

## Principle

The highlight should always rest on exactly one option a person can act on, and it should never be
confused with a committed choice.
