# Loading

Loading feedback communicates that work is in progress. Frontier uses skeletons for content, the
spinner for actions, and a progress bar when the amount of work is known.

## Choose by context

- **Skeleton** for content that is arriving. It mirrors the final layout so the page does not jump
  when the content appears.
- **Spinner** for an action whose duration is unknown. It communicates activity that no static state
  can express.
- **Progress** when the amount completed is known. The bar moves to the new value in a short
  transition, so the person can follow the rate of progress.

A skeleton is not used for an action, and a spinner is not used to stand in for a whole page that
could show its structure.

## No layout shift

Loading content keeps the final dimensions. A skeleton occupies the same space as the content it
replaces. When content arrives, nothing below it moves.

## The spinner

The spinner is an indeterminate indicator: it runs continuously, linearly, and without easing. It
is not decorative, and it is not used where a static state would communicate the same thing. It is
the only element that repeats a movement without a state to show. See
[Motion](../foundations/motion.md) and [Values](../foundations/values.md#motion).

## The loading placeholder

A skeleton shows that content is arriving with a slow, soft pulse of its surface. The pulse is
ambient: it is slower than any other movement in the system, it does not change the skeleton's size
or layout, and it never competes with arriving content. It is not a shimmer that sweeps across the
surface, because a sweep draws attention to the wait itself. It stops when the content arrives.

## Reduced motion

When a person prefers reduced motion, the spinner is replaced by a static status indicator with a
text label or by a determinate progress value, and the pulse stops. The information that content is
loading remains visible in every case.

## Labels and announcements

A loading region has a visible or accessible label. An action that triggers loading keeps its label
and shows that it is busy. Loading is announced as status; it does not interrupt the person unless
the wait blocks the task.

## Honest progress

A determinate bar never fakes progress. If the amount is unknown, the surface uses the spinner or a
skeleton instead. A bar that stalls without explanation is misleading.

## Errors during loading

When loading fails, the loading state is replaced by an error message that explains what happened
and what to do next. The page does not remain in a permanent loading state. See
[Feedback](./feedback.md).

## Principle

Loading feedback should preserve the layout, tell the truth about progress, and never become the
only thing a person can see.
