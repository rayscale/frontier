# Precision

Precision means that Metric values, alignments, and states are exact. Quality is visible in the
details: a consistent inset, a correct optical alignment, a state that appears exactly where it
should.

## Values come from the system

Spacing, type sizes, icon sizes, control heights, and focus dimensions come from the scales in
[Values](../foundations/values.md). An unplanned value is a defect unless it is a documented optical
correction.

## Optical corrections are systematic

Some shapes need an optical adjustment to look aligned: icons align to the cap height of text rather
than to its bounding box, and circular or triangular forms may need a small offset. A correction is
allowed only when it is systematic, repeatable, and recorded with the rule it supports.

## States are exact

Pressed, focus, selected, disabled, loading, and error each have one appearance. A state is never
approximated with a similar treatment, because a similar treatment is a different message. See
[States](../patterns/states.md).

## Insets and relationships stay stable

The distance between a control's edge and its content, and between related elements, stays stable
across sizes. A small control should not look cramped next to a large one. Related values are
defined in [Spacing](../foundations/spacing.md) and [Shape](../foundations/shape.md).

## Detail is not decoration

Precision is not about adding flourish. It is the absence of accidental variation: no stray pixel,
no inconsistent gap, no state that was left behind when the system changed.

## Principle

Quality is the absence of accidental variation; every value and state should be where the system
says it is.
