# Components

Components in these guidelines are interaction primitives. A primitive defines one reusable
behavior: what a person can do, what they see, and what they can rely on. Finished widgets are
compositions of primitives, patterns, and foundations.

A primitive is documented only when its contract is shared by more than one kind of widget. Its
document covers semantics, states, input behavior, keyboard expectations, focus, and composition.
The visual design of a finished widget belongs to the surface that composes it.

## Primitives in this category

- [Choice](./choice.md): selecting one value from a set.
- [Toggle](./toggle.md): setting an independent value on or off.
- [Field](./field.md): typing or editing a value.
- [Views](./views.md): moving between mutually exclusive areas.
- [Action](./action.md): triggering an operation.
- [Disclosure](./disclosure.md): showing or hiding content.
- [Slider](./slider.md): choosing a value in a range.
- [Menu](./menu.md): a list of actions or destinations.

## Composition

A widget is described by the primitives it combines. The composition is a guide, not an inventory.

- A select is a [choice](./choice.md) shown in a [popup](../patterns/popups.md), opened from an
  [action](./action.md).
- A combobox is a [field](./field.md) whose suggestions behave as a [choice](./choice.md).
- A radio group is a [choice](./choice.md) presented as native options.
- Tabs are [views](./views.md) arranged along an axis.
- A segmented control is a [choice](./choice.md) shown as adjacent options.
- A switch is a [toggle](./toggle.md) with a sliding track.
- A checkbox is a [toggle](./toggle.md) shown as a mark.
- An accordion is a group of [disclosures](./disclosure.md).
- A toolbar is a row of [actions](./action.md).

## Relationship to the other categories

Primitives apply [Patterns](../patterns/README.md), which describe shared behaviors, and
[Foundations](../foundations/README.md), which describe shared visual rules. Their purpose is
governed by the [Principles](../principles/README.md).

## Adding a primitive

Add a primitive only when a behavior is shared by more than one kind of widget and can be stated
without naming a finished widget. Otherwise, document the behavior in a pattern or describe it as a
composition.
