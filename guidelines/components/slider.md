# Slider

A slider chooses a value inside a range. It is a numeric control with a visible position and a
keyboard equivalent. The value is shown, not inferred.

## Range and steps

A slider has a defined minimum, maximum, and step. The selected value snaps to a step and is
displayed in text next to the slider. The person never has to estimate the value from the thumb
position alone.

## Drag

Dragging follows the pointer directly, without easing or inertia. Releasing commits the value.
Pressing Escape during a drag restores the previous value. See [Drag](../patterns/drag.md).

## Keyboard

Arrow keys change the value by one step. A modifier key changes it by a larger step. Home and End
jump to the minimum and maximum. The slider is reachable with Tab. See
[Keyboard](../patterns/keyboard.md).

## Focus and selection

The slider has one focusable thumb and one value. Focus is visible on the thumb. See
[Focus](../foundations/focus.md).

## No motion

The thumb moves with the person's input, not with an animation. Programmatic changes update
instantly.

## Disabled and read-only

A disabled slider does not accept changes and explains why. A read-only slider shows its value but
cannot be changed.

## Principle

A slider should make the chosen value explicit in text and reachable without the gesture.
