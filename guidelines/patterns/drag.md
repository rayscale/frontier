# Drag

Drag is direct manipulation: a person presses a control, moves it, and either commits or cancels the
result. In Metric, drag is used by sliders and by a small number of surfaces that cannot offer the
same result another way. Every drag has a keyboard equivalent.

## Commitment

A drag has three phases: start, move, and commit or cancel. The value does not change permanently
until the person commits. During the gesture, the surface shows the tentative result and the source
it came from.

Releasing commits. Moving out of the valid area or pressing Escape cancels and restores the previous
value. The previous value remains unchanged until the gesture is complete.

## Direct following

The dragged element follows the pointer or finger directly while the person moves it. This movement
is input, not animation; it is not eased and it stops when the person stops. See
[Motion](../foundations/motion.md).

## Keyboard equivalent

Every drag has a keyboard path that reaches the same result. A slider accepts arrow keys for small
steps and a modifier for larger steps, plus Home and End for the range limits. A reorderable surface
provides move commands or a keyboard mode that does not require holding a key while navigating.

A gesture is never the only way to complete a task. See
[Accessibility](../foundations/accessibility.md).

## Feedback

During a drag, the surface communicates the source, the current position or target, and whether the
result will commit. Feedback updates instantly and does not use a trail or easing.

## Touch and pointer

A drag works with a pointer, a finger, and assistive input. The interactive area meets the touch
target rule, and a drag does not begin accidentally when the person intended to scroll. See
[Spacing](../foundations/spacing.md).

## Disabled and read-only

A disabled control does not start a drag and explains why. A read-only control may allow selection
and copying but not modification.

## When not to drag

A drag is not added when a simpler control can express the same value. If a person only needs to
choose one of a few options, use [Choice](../components/choice.md). If the value is numeric and
bounded, a [Slider](../components/slider.md) is appropriate only when direct manipulation genuinely
helps.

## Principle

A drag should be predictable, reversible, and optional: the same result must be reachable without
the gesture.
