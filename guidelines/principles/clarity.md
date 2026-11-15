# Clarity

Clarity means that every element states what it is, what it does, and what state it is in. A person
should never have to infer meaning from decoration. In a monochrome, flat system, clarity is the
main source of richness.

## Every cue carries meaning

A surface marks a group. A border marks an edge that must be identified. An icon marks an action or
a status. A fill marks selection. When a visual cue does not communicate one of these things, it is
decoration, and it is removed under [Restraint](./restraint.md).

## States stay distinct

A person should be able to tell, at the same time, which option is selected, which one is under the
pointer, which one has keyboard focus, which one is unavailable, and which one is loading. These
are different facts. Frontier never merges them into one visual cue.

The full state model is defined in [States](../patterns/states.md).

## Words and visuals agree

A label, an icon, and a status describe the same thing. A visible label is part of the accessible
name of its control. An icon never replaces a word when the meaning is uncertain. A status color is
never the only signal of that status.

## Context changes meaning

The same treatment can mean different things in different places. A selected row is not a current
page, and an active tab is not a checked option. Components use the vocabulary of their context,
and their states reflect it. See [Selection](../patterns/selection.md).

## Silence is not clarity

When a control is unavailable, its state must be explained rather than implied by a faint
appearance. When a request fails, the message says what happened. When content is absent, the empty
state says what is missing and what can be done next.

## Principle

A person should understand what an element is and what state it is in at a glance, without
inference.
