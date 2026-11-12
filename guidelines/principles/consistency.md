# Consistency

Consistency means that the same element and the same interaction behave the same way wherever they
appear. A person learns a control once and can rely on that knowledge across the whole product.

## One behavior per element

A control keeps its behavior when it changes size, density, or context. A toggle toggles, a choice
chooses, a field accepts input. A new behavior needs a new primitive or pattern, not a variation of
an existing one. See [Components](../components/README.md).

## One vocabulary

The same concept uses the same word everywhere. Labels, menu items, messages, and documentation
share terminology. A synonym is not variety; it is a second thing for the reader to learn. See
[Voice](../content/voice.md).

## Variation has a reason

A different treatment is justified only when an existing one genuinely cannot serve the context.
The reason is recorded where the rule lives, not inferred by the next person. Novelty alone is not a
reason.

## Same meaning across platforms

Pointer, touch, keyboard, and assistive input may use different physical gestures, but they produce
the same result. A touch interface does not get a different state model or a different vocabulary.
See [Accessibility](../foundations/accessibility.md).

## Repetition is the default

A repeated interaction should look and behave identically every time it appears. If two instances
differ, either one is wrong or the system is missing an intentional variant. In the second case,
document the variant instead of allowing quiet divergence.

## Principle

The same thing should behave the same way everywhere, and a difference should always have a stated
reason.
