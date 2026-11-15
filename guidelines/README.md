# Frontier Design Guidelines

Frontier is a brutalist-minimalist design language for any interface. It is monochrome by default,
flat, square, and calm: structure carries the layout, content carries the meaning, and nothing is
added without a job.

These guidelines define design intent. They do not define code, styling, tokens, or framework APIs,
and they stay valid when an implementation changes.

## The layers

The guidelines form five layers, each resting on the one above.

- [Principles](./principles/README.md) explain why a rule exists and how to resolve conflicts.
- [Foundations](./foundations/README.md) define the shared visual and spatial rules: color, type,
  space, layout, shape, elevation, motion, focus, icons, and accessibility.
- [Patterns](./patterns/README.md) describe recurring interaction behavior.
- [Components](./components/README.md) define the behavioral contracts of interaction primitives.
- [Content](./content/README.md) defines voice and writing rules.

[Values](./foundations/values.md) holds the concrete numbers behind the foundations. It is the only
place where values are stated.

## How the layers relate

A principle decides what a rule is for. A foundation states a shared rule. A pattern applies rules
to a recurring interaction. A primitive component composes patterns and foundations and adds only
what is specific to its behavior. Content decides what the interface says.

A rule lives in exactly one document. Other documents link to the owner instead of repeating it.
When a decision conflicts with a principle, the principle wins: revise the decision or record the
exception and its reason.

## What Frontier is

- **Precise.** Values, alignment, and states are exact. Nothing is approximate by accident.
- **Structured.** Grid, alignment, and boundaries make hierarchy legible before any styling.
- **Restrained.** Color is functional; only `danger` carries a hue. There is one type weight, no
  shadows, and no decoration.
- **Consistent.** The same element and interaction behave the same way everywhere.
- **Composed.** Nothing moves while nothing changes. When something does change, it moves briefly
  and directly.

## What Frontier is not

- It is not colorful. Success, warning, and information are communicated with neutral text, icons,
  and structure.
- It is not expressive through weight. There is one weight; hierarchy comes from size and space.
- It is not soft or layered. Corners are square, surfaces are flat, and borders exist only where
  they are functional.
- It is not playful in motion. Movement is quick, direct, and never bounces or overshoots.
- It is not a multi-selection language. Selection is single; independent multiple choices are
  toggles.

## Using the guidelines

Start with the [principles](./principles/README.md). Then read the foundations that apply. Describe
an interaction as a pattern where one exists, and describe a component as a composition of
primitives where possible. If a new behavior fits neither an existing pattern nor a primitive,
document the reason before adding it.

## Maintaining the guidelines

[AGENTS.md](./AGENTS.md) defines how to write, change, and review these documents. The short
version: one rule per owner, no implementation details, verified links, and a documented reason for
every change.
