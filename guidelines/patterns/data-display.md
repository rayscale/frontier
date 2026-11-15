# Data display

Data display presents structured content for comparison and action. Tables are the main surface.
Frontier keeps them flat, dense enough to scan, and free of decorative striping.

## Tables

A table has a header row and rows of data. The header names each column and does not scroll away
from the data it describes unless the table provides a sticky header with a surface of its own.

Rows use the shared row height and functional separators where the row boundary must be visible.
There is no zebra striping, no rounded container, and no shadow.

## Alignment

- Text aligns to the start of its column.
- Numbers align to the end and use tabular figures.
- Dates follow the locale format and align consistently within their column.
- Actions align consistently and do not shift with the width of a value.

Mixed alignment inside one column is a defect. See [Typography](../foundations/typography.md).

## Sorting

A sortable column shows its sort state in text or an icon, not by color alone. The sorted column
keeps its label and its alignment. Sorting changes the order of rows without changing the selection.

## Filtering

Filters narrow the data and remain visible while active. An empty result explains which filters are
active and how to clear them. A filter never hides data silently.

## Selection

Tables support single selection. A selected row uses the selected treatment and remains distinct
from the row under the pointer. Bulk record selection is an explicit exception documented in the
surface that needs it; see [Selection](./selection.md).

## Density

Tables use the comfortable density and a stable internal rhythm. The row height, cell padding, and
label size keep their proportions across tables; a data-heavy surface may tighten the rhythm within
the same scale, but there is no separate compact mode.

## Responsive behavior

A table that cannot fit keeps its most important column visible and provides a way to reach the
rest. It does not shrink text below the readable minimum or collapse columns into an unlabeled
stack.

## Empty and loading states

An empty table shows an empty state that explains what is missing and how to add it. A loading
table shows a skeleton with the final dimensions. See [Loading](./loading.md) and
[Feedback](./feedback.md).

## Principle

Data should be comparable at a glance: aligned, labeled, and free of decoration that competes with
the values.
