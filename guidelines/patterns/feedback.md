# Feedback

Feedback tells a person what happened. Metric has four channels: inline messages, toasts, banners,
and empty states. Each channel has a distinct job, and a message uses the smallest channel that can
carry it.

## Channels

- **Inline** feedback belongs to the content it describes. It stays until the condition changes.
- **Toast** is a transient confirmation after an action. It disappears on its own or on dismissal.
- **Banner** is a persistent condition that affects the page or a whole region.
- **Empty state** explains that content is absent and what can be done next.

An inline message does not become a toast when it is important. A toast does not carry an error that
requires a decision. A banner does not repeat a message that already sits next to the affected
content.

## Tones

- **Neutral** adds context or confirms a change.
- **Danger** describes a failure, a loss, or a blocked path. It is the only toned channel that uses
  color.

Success, warning, and information are neutral. They use text, an icon, and structure. Tone is
semantic, not decorative: danger is never used for emphasis, and neutral is never used to soften a
failure. See [Colors](../foundations/colors.md).

## Message anatomy

A message has one purpose. A short title is optional. The body says what happened and what the
person can do next. An action sits with the message and follows the action hierarchy.

- An error says what happened and how to resolve it.
- A confirmation says what changed.
- A warning says what is at risk and how to avoid it.
- An empty state says what is missing and how to start.

The full writing rules live in [Writing](../content/writing.md).

## Urgency

A message that requires immediate attention is announced as an alert. A status that can wait is
announced as status. Urgency is chosen by what the message asks of the person, not by how strongly
the design wants to be noticed.

## Dismissal

A toast may be dismissed and disappears on its own. A banner stays until its condition is resolved
or it is explicitly dismissed. An inline message stays with the content. A message never reappears
after the person dismissed it unless the condition occurs again.

## Appearance and dismissal

A message enters with a short fade and a small movement away from the edge it belongs to, so it is
noticed without competing with the content. It leaves with a shorter fade, and a toast never slides
across the surface.

An inline message changes the layout only by the space it actually takes, and it does not make the
content it describes jump. A message that replaces another in the same place changes in place.

When a person prefers reduced motion, messages appear and disappear with an instant change or a
simple fade; a toast still dismisses on its own. See [Motion](../foundations/motion.md).

## Principle

A message should be noticed in proportion to what it asks the person to do, and it should say what
happened and what to do next.
