# Disclosure

A disclosure shows or hides content. It is the contract behind accordions, expandable sections, and
disclosure buttons. A disclosure changes visibility; it does not change the selected value or the
current location.

## Expanded state

A disclosure is expanded or collapsed. The state is visible in the control and announced to
assistive technology. The control's label describes the content it reveals, not only the action of
expanding.

## Content

The content of a disclosure is either present or absent. A collapsed disclosure does not leave
ghost outlines, empty borders, or placeholder space. An expanded disclosure does not move unrelated
content more than necessary.

## Keyboard

Enter and Space toggle the focused disclosure. A disclosure does not trap focus. Its content is
reachable in reading order when expanded. See [Keyboard](../patterns/keyboard.md).

## Expansion

Expanding reveals the content by growing its height while the content fades in, so the person can
follow where the space came from. Collapsing is shorter, because the person has already decided.

The control's own position does not move, and unrelated content below is pushed only by the height
the disclosure actually takes. There is no slide, no overshoot, and no horizontal movement. A
collapsed disclosure leaves no trace. See [Motion](../foundations/motion.md).

When a person prefers reduced motion, both directions are instant.

## State retention

Content inside a disclosure keeps its state while the disclosure is collapsed and expanded, unless
the content is explicitly destroyed. A person does not lose typed input by collapsing a section.

## Nested content

A disclosure may contain other disclosures. The nested control keeps its own state, and closing an
outer disclosure does not change the nested state.

## Disabled

A disabled disclosure does not expand and explains why when the context requires it. It does not
appear collapsed and enabled at the same time.

## Principle

A disclosure should change visibility without changing meaning, and it should keep whatever the
person entered while it was open.
