# Foundations

Foundations are the shared rules that every component and pattern builds on. They define how Frontier
looks and behaves before any specific interaction is involved: color, type, space, layout, shape,
elevation, motion, focus, icons, and accessibility.

## Foundations in this category

- [Colors](./colors.md): monochrome roles, `danger`, themes, and contrast.
- [Typography](./typography.md): the neutral grotesque, the fixed scale, one weight, and mono.
- [Spacing](./spacing.md): the base-4 scale, rhythm, density, and target size.
- [Layout](./layout.md): the adaptive grid, breakpoints, and reading width.
- [Shape](./shape.md): rounded corners and functional borders.
- [Elevation](./elevation.md): flat layering and the three surfaces.
- [Motion](./motion.md): movement with a job, from input feedback to progress.
- [Focus](./focus.md): the outline and `focus-visible`.
- [Icons](./icons.md): grid, geometry, sizes, color, and usage.
- [Accessibility](./accessibility.md): the baseline every design must meet.
- [Values](./values.md): the concrete values behind every foundation.

## Relationship to the other layers

Foundations express the [Principles](../principles/README.md). [Patterns](../patterns/README.md)
apply them to recurring interactions, [Components](../components/README.md) compose them into
primitives, and [Content](../content/README.md) applies the same discipline to language.

## Changing a foundation

A foundation changes only when the change affects the whole system. A component that needs a
different value first asks whether the foundation is wrong. Local exceptions belong in the component
that needs them and are recorded with a reason.

Every concrete value lives in [Values](./values.md). A foundation explains intent and links there
instead of repeating numbers.
