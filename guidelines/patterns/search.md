# Search

Search finds content by a query. It combines a [field](../components/field.md) with a result list
that behaves as a [choice](../components/choice.md) when results are selectable.

## Query and results

Results update as the query changes. They narrow to matching content and keep a stable order where
possible. An item that remains in the results keeps its place, so the list does not jump while the
person types.

The selected value is separate from the query and from the result list. It remains known even when
it no longer matches the current query. See [Selection](./selection.md).

## Highlight

The highlight follows the pointer or keyboard through the results. It always rests on a valid,
enabled result. When a new query removes the highlighted result, the highlight clears or moves to a
relevant remaining result. See [Highlight](./highlight.md).

## Keyboard

Typing stays in the field. Navigation keys move the highlight through results without moving focus
out of the field. A confirming key selects the highlighted result and closes the results. Escape
dismisses the results without changing the value.

## Empty results

When nothing matches, the result surface says so clearly. An empty result is not a loading state and
does not show a highlight. It offers a way to clear the query or adjust the search when that helps.

## Filters

Filters narrow search in a visible way. Active filters remain visible, and clearing them is
explicit. A search does not silently apply a hidden filter.

## Search is not navigation

Search finds; navigation moves. A search result may lead to a destination, but the search surface
does not replace the navigation model. See [Navigation](./navigation.md).

## Principle

Search should follow the query without surprise: typing stays in the field, results stay stable,
and the highlight always rests on something the person can choose.
