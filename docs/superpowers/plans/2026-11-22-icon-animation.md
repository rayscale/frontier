# Icon animation

## Goal

Icons that move in small, meaningful ways, following the animation rules in
`guidelines/foundations/icons.md` and the values in `guidelines/foundations/values.md`. The
reference for polish is Animate UI's icons: short tweens, one movement per icon, and a
shared way to trigger them from the control around the icon.

## What the reference teaches

- Every movement is a short tween of 0.3 s for a state change and 0.6 s for a loop. Nothing
  springs hard, and nothing bounces.
- Each icon moves the part that carries its meaning: the arrow glides, the check draws, the bell
  swings from its top, the plus turns, the gear turns, the loader fades its segments in a ring.
- A parent control triggers the icons inside it. Hover, press, focus, and "in view" are all
  triggers, and the icon can also be driven directly.
- It has no reduced-motion handling. Ours must.

## Decisions

1. **CSS only.** The package already uses Motion for components, but icons do not need it. Every
   movement above is a transform, a stroke dash, or an opacity change, which CSS runs without
   a script, interrupts smoothly, and turns off with one media query.
2. **A vocabulary, not a movement per icon.** Icons name a kind of movement (`nudge-*`, `turn`,
   `draw`, `ring`, `sweep`), and one stylesheet defines each kind. The kinds match the meanings
   in the guideline: direction, opening and closing, completion, attention, progress.
3. **The control owns the trigger.** A control marks itself with `data-icon-trigger`. Its icons
   move when it is hovered, focused, or pressed, and not when it is disabled. An icon can also
   be driven directly with the `animate` prop, which is how an icon that appears with a state,
   such as the check of a copied value, plays once as it mounts.
4. **Rest is the static icon.** Movement starts from the drawn icon and returns to it. Hover
   uses transitions, so leaving in the middle of a movement redirects it.
5. **Values from the guideline.** Nudge moves 3 units in the Medium duration with the Spring
   curve. Turn and draw use the Enter duration. Ring uses Slow. Sweep is one turn per Slow
   cycle. Every movement returns in the Exit duration.

## Steps

1. Add `TIconMotion` and the `motion` and `animate` props to the icon types.
2. Render `data-motion` and `data-animate` on the icon. For `draw`, give each shape a
   normalized path length, so one rule draws any stroke.
3. Map the built-in icons to a kind: arrows and chevrons nudge, plus, x, and settings turn,
   check draws, bell rings, and the loader sweeps. Let `createIcon` take a `motion` option for
   custom icons.
4. Write the movements in `icon.css`, and turn them all off under reduced motion.
5. Mark `Button` as a trigger. `CopyButton` inherits it, and its check plays as it appears.
6. Test the attributes and the mapping, and document the behavior on the icons page.
7. Run lint, format, tests, and the build, then look at the movements in the browser.

## Out of scope

- Icons that animate in view. They need a script, and nothing in the system calls for them yet.
- A different movement for each of the 80 icons. A new movement needs a new meaning first.
