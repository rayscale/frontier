# Motion

Metric does not animate. State changes, popups, messages, and layout changes appear instantly. The
system is quiet and immediate, and the absence of motion is part of its character.

See [Values](./values.md#motion) for the spinner duration and easing.

## Instant changes

There are no transitions for hover, press, focus, selection, loading, or error states. There are no
entrance or exit animations, no sliding panels, and no animated disclosure. A change happens on the
frame in which the input is received.

## The spinner is the only animation

The indeterminate progress indicator is the only permitted animation. It communicates ongoing
activity that no static state can express. It runs continuously, linearly, and without easing, and
it is not used as decoration or as a loading style for content that can use a skeleton.

A determinate progress bar does not animate its value; it updates instantly when progress changes.

## Reduced motion

When a person prefers reduced motion, the spinner is replaced by a static status indicator with a
text label, or by a determinate progress value where one exists. The information that activity is
in progress must still be available.

## Direct manipulation

Dragging a slider or another direct-manipulation control follows the pointer or finger as the person
moves it. That movement is input, not animation: it is not eased, and it stops when the person
stops.

## No choreography

Elements do not enter in sequence, stagger, bounce, or overshoot. There is no motion vocabulary to
learn because there is no motion.

## Principle

Motion should be absent. The only movement is the indeterminate progress indicator, and it exists
because it carries information.
