# Icons

Icons are simple, single-color pictograms drawn on a shared grid. They communicate meaning quickly and must stay legible at small sizes.

## Grid and size

- Design on a **24 × 24 px** artboard.
- Keep the visible artwork inside a **20 × 20 px** safe area (2 px padding on every side).
- Use a consistent **2 px** stroke weight.
- Round line caps and joins (`round`).
- Align strokes to the pixel grid where possible to avoid blur.

## Color

- Icons use a **single color**: `currentColor` by default.
- Do not bake brand or semantic colors into the icon. Apply color through the consuming component or token.
- Icons should render correctly in both light and dark modes by inheriting text color.

## Style

- Prefer outlined icons. Filled icons are reserved for states such as "selected" or "active".
- Keep geometry simple: avoid fine detail, thin strokes, and complex gradients.
- Use consistent corner radius and terminal shapes across the set.
- Avoid text, logos, or overly specific illustrations.

## Animation

An icon moves only when the movement does a job. It confirms that an action happened, shows that a state changed, or shows that something is in progress. An icon that moves only to decorate is removed. See [Motion](./motion.md#purpose) and [Restraint](../principles/restraint.md).

- **Every icon has a movement.** Each icon in the set moves in the way that matches what it means, so no icon is left still next to one that moves.
- **The control owns the movement.** An icon moves when the control around it is hovered, focused, pressed, highlighted, or changes state, not when the pointer is over the icon alone. An icon is a small target, and the control is what the user is acting on.
- **Focus moves an icon the way hover does.** A keyboard user gets the same feedback as a pointer user. On a touch screen, the press stands in for hover.
- **One meaning, one movement.** Every icon that means the same thing moves the same way. Direction nudges the icon along its arrow. Opening, closing, and configuring turn it. Completion draws it. Attention rings it, and a warning shakes it. Progress sweeps it. Presence pops, containers and documents lift, and tools tilt. A new movement is added only for a new meaning.
- **The resting icon is the static icon.** Movement starts from the drawn icon and returns to it, so the icon is always correct when nothing is happening. Interrupting a movement redirects it to rest instead of restarting it.
- **Movement stays on the grid.** An icon keeps its stroke weight, its single color, and its place inside the safe area. It never grows beyond the artboard, so its neighbors are never pushed.
- **Looping is for progress only.** A looping icon stands for work in progress and stops when the work ends. An icon that finishes is not left repeating.
- **Repetition is quiet.** Rows of the same control, such as the items of a long list or a table, do not each animate. Only the one the user is acting on moves.
- **Reduced motion removes the movement, not the meaning.** The icon shows its final form at once. A completion icon appears complete, and a progress icon is replaced by a visible state that still says work is happening. See [Motion](./motion.md#reduced-motion).
- **Movement never carries a state alone.** Pair it with text or a change of shape, so the state is clear without seeing the motion.

See [Values](./values.md#icon-motion) for the distances, durations, and curves.

## Accessibility

- Decorative icons must be hidden from assistive technology (`aria-hidden`).
- Meaningful icons need an accessible label (`aria-label` or visible text).
- Never rely on color alone to convey state; pair icons with text or shape changes.

## Usage in code

- Icons are React components rendering an inline `<svg>`.
- Size, color, and stroke are controlled via props (`size`, `color`, `strokeWidth`).
- Prefer inheriting `currentColor` and the surrounding text size.
