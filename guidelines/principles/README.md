# Principles

Principles are the values behind every Metric decision. They are short, stable, and independent of
platform, component, or technology. When a specific rule is missing or unclear, reason from the
principles.

## Principles in this category

- [Clarity](./clarity.md): every element states what it is and what state it is in.
- [Structure](./structure.md): layout and alignment make the interface legible before styling.
- [Consistency](./consistency.md): the same element and interaction behave the same way everywhere.
- [Restraint](./restraint.md): nothing is added without a job.
- [Precision](./precision.md): values, alignment, and states are exact.

## Precedence

When principles conflict, they apply in this order:

1. **Clarity** wins first. If a person cannot understand what an element is or what state it is in,
   no other consideration justifies the design.
2. **Structure** comes next. Hierarchy and alignment must remain readable before visual treatment.
3. **Consistency** keeps the system predictable. A local improvement does not justify a new
   vocabulary for the same thing.
4. **Restraint** decides how much visual means a moment can carry. It never removes information,
   but it removes decoration.
5. **Precision** governs execution. When an optical correction conflicts with system consistency,
   the system value wins unless the correction is documented and systematic.

## Trade-offs

Some trade-offs are unavoidable. The guidelines do not hide them.

- **Density versus air.** Metric favors comfortable density for reading, but data-heavy surfaces may
  use a tighter internal rhythm drawn from the same spacing scale. There is no separate compact
  mode.
- **Uniformity versus context.** The same element keeps its behavior everywhere. Its size and
  placement may respond to context, but its meaning does not change.
- **Minimalism versus affordance.** A control must still look actionable. When a surface alone is
  not enough, a functional border is allowed; decoration is not.
- **Monochrome versus semantic color.** Only `danger` carries a hue. Other statuses rely on text,
  icons, and structure, which costs some immediacy but preserves a calm, consistent surface.

## Relationship to the other layers

Principles set direction for [Foundations](../foundations/README.md), which turn intent into shared
rules. Foundations inform [Patterns](../patterns/README.md) and [Components](../components/README.md),
and [Content](../content/README.md) applies the same values to language.

When a resolution to a trade-off is made, record it in the document that owns the rule, with its
reason.
