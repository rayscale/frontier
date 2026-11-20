# Typeface

The typeface carries most of Frontier's content. It should be clear, calm, and friendly, and it supports the warm tone of the interface without drawing attention to itself.

# Geist

**Frontier is set in Geist.** Use Geist for all interface text. Every weight from 300 to 700 comes from the same variable family, so no other typeface is part of the system.

The system font is the fallback while Geist loads or when it is unavailable. It is not a second typeface to choose; the interface falls back to it automatically.

See [Values](./values.md#typeface) for the sizes, weights, and line heights.

Code and other fixed-width text use Geist Mono, with the system monospace font as the fallback.

## Typeface rules

One typeface family is used across the interface. Using a single family keeps the voice consistent, and it lets weight and size do the work of hierarchy.

## Hierarchy

Use a small number of levels. Each level should be clearly different from the one above and below it. Hierarchy comes first from size and then from weight. Color should not carry hierarchy alone.

Emphasis within a line should use weight, not capital letters or decoration.

## Readability

Use sentence case for labels, headings, and body text. Avoid all-caps text except for short, deliberate labels, because it is harder to read and reads as shouting. Keep line lengths comfortable for reading, and do not compress text to fit a control.

## Labels in controls

A control's label should match the control's size. A small control uses a small label. A label should never be smaller than the minimum readable size for its context.

## Numbers

Numbers that are compared or stacked should align. Use the same width for digits where alignment matters, such as counters and tables.

## Code

Code uses a monospace family so characters align between lines. It always reads
left to right, even when the surrounding interface is right to left. Code type is
not smaller than the minimum readable size for its context, and its decoration
such as line numbers stays out of the copied text.

## Principle

Type should be the clearest route into the content. A reader should understand the structure of a page from its type before they read the words.
