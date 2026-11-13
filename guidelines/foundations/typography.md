# Typography

Typography carries most of Metric's content. It is neutral, technical, and quiet: one grotesque
family, one weight, and a small fixed scale. Hierarchy comes from size, space, and structure rather
than from weight or color.

See [Values](./values.md#typography) for the family criteria, sizes, line heights, and weights.

## One family

Metric uses Geist Sans, a neutral grotesque with open forms and high legibility. Geist Mono is the
matching family for code and technical content. A second display family is not part of the system.

## One weight

The system uses regular weight only. There is no bold, semibold, or medium.

This has consequences that every design must respect:

- Emphasis comes from size, space, rules, surfaces, and position, never from weight.
- A primary action is distinguished by an inverted fill or a functional border, not by heavier text.
- Headings are larger and better spaced, not bolder.
- Text that needs to stand out inside a paragraph uses a separate block, a rule, or a link, never a
  weight change.

Using a second weight is a change to the language, not a local decision.

## A fixed scale

Type sizes come from a fixed set of steps. A new size is justified only when no step can serve the
content. Adjacent steps must remain visibly different, and a design does not use more levels than
the content needs.

## Sentence case

Labels, headings, and body text use sentence case. Uppercase is reserved for short acronyms and
established abbreviations. All-caps text is not part of the system because it reduces legibility and
adds emphasis that weight cannot balance. See [Voice](../content/voice.md).

## Mono for technical content

A monospaced family is used for code, data, and technical metadata or labels. Mono is not used for
body text. Its smaller apparent size means it must never fall below the minimum readable size for
its context.

Code always reads left to right, even when the surrounding interface is right to left. See
[Code](../patterns/code.md).

## Numbers

Numbers are tabular by default, so digits align in tables, counters, and any stacked comparison.
Proportional figures are not part of the system.

## Readability

Line height increases with the reading role of the text: body copy is more open than a display
heading, and metadata is more compact but never cramped. Line length stays within a comfortable
measure; text is not compressed to fit a control. See [Layout](./layout.md).

## Labels in controls

A control's label matches the control's size. A label is never smaller than the minimum readable
size for its context, and it never relies on weight to be understood.

## Principle

Type should be the clearest route into the content, using size and space rather than weight or color
to establish hierarchy.
