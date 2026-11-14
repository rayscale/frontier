# Motion

Motion is part of Metric, and it is always an explanation. It shows that an input was received, how
one state became another, or that work is in progress. When a change has nothing to explain, it
happens without motion.

See [Values](./values.md#motion) for the durations and curves.

## Purpose

Motion does one of four jobs:

- It confirms that an input was received, as in a press response.
- It shows the relationship between a before and an after, as in a highlight moving between options.
- It brings a temporary surface into view and removes it, as in a popup.
- It shows that work is in progress, as in a spinner or a loading placeholder.

A movement that does none of these is decoration and is removed. See
[Restraint](../principles/restraint.md).

## Character

Metric moves quickly and directly. Movement starts with the input, settles once, and stops. It never
overshoots, bounces, springs, or travels farther than its destination. A short fade, a small travel,
or a change of fill is enough; a larger movement is reserved for a change that spans a surface.

Motion is continuous under interruption. When new input arrives while a movement is in progress, the
movement continues toward the new target instead of restarting from the beginning or waiting for the
previous movement to finish. See [Continuity](../principles/continuity.md).

## Timing

Feedback that answers an input, such as hover, press, focus, or a state change, is quick enough to
feel immediate. Movement that crosses a surface may take longer, but never long enough that the
interface feels slow. Exits are shorter than entrances, because the person has already made their
decision.

A delay is never added to make a change noticeable. If a change needs a delay to be understood, its
presentation is wrong, not its timing.

## Initial placement

An element is in its final position from the first frame. A temporary surface may fade or grow into
view, but it never appears in the wrong place and then moves to the right one. See
[Popups](../patterns/popups.md).

## Direct manipulation

Dragging follows the pointer or finger while the person moves it. That movement is input, not
animation: it is not eased, it does not lag behind, and it stops when the person stops. On release,
the result settles into place. See [Drag](../patterns/drag.md).

## Feedback is not decoration

Motion never runs while nothing changes. There is no idle movement, no continuous glow, no entrance
sequence, and no animation that repeats to fill time. The only looping motion is the one that
communicates ongoing activity: the indeterminate spinner and the loading placeholder. See
[Loading](../patterns/loading.md).

## Reduced motion

When a person prefers reduced motion, movement is replaced by an instant change or a simple fade.
The information that the movement carried must remain available: a highlight that jumps still shows
where it is, and a value that updates still reaches its final state. Looping motion stops, and a
loading surface keeps a static indicator.

Direct manipulation may stay connected to the pointer under reduced motion, because the person is
moving the object. Easing and settling are removed.

## Press response

Every action uses the same press response, so a person learns one physical feedback. A value change
and a navigation differ in what follows the press, not in how the press feels. See
[Action](../components/action.md).

## Principle

Motion should explain change. It should feel alive without distracting, and the interface must
remain fully usable without it.
