# Code

Code is content that must remain exact. Metric presents it in a monospaced family, in monochrome,
and without decoration that competes with the characters.

## Monochrome

Code has no syntax color. Keywords, strings, comments, and punctuation share the text role. Meaning
comes from the code itself, not from a palette. See [Colors](../foundations/colors.md).

## Monospaced type

Code uses the monospaced family and the shared type scale. It is not smaller than the minimum
readable size for its context. Characters align between lines. See [Typography](../foundations/typography.md).

## Direction

Code always reads left to right, even when the surrounding interface is right to left. The code
block does not mirror, and its punctuation does not flip.

## Lines and numbers

Line numbers are optional. When present, they sit outside the selectable text and never appear in
the copied content. Long lines scroll horizontally rather than wrapping in the middle of a token,
unless the code is a short inline fragment.

## Copying

A code block provides a visible copy action with a clear label. Copying preserves the exact
characters, including indentation, and excludes line numbers and decorative chrome.

## Semantics

Code is marked as code for assistive technology. Inline code inside a sentence keeps the surrounding
reading flow; a block is a separate region with its own reading order.

## No decorative chrome

A code block uses the surface role and, where the edge must be identified, a functional border. It
has no window controls, traffic lights, gradients, or shadows. See [Shape](../foundations/shape.md)
and [Elevation](../foundations/elevation.md).

## Principle

Code should be exact, readable, and copyable, with no decoration between the reader and the
characters.
