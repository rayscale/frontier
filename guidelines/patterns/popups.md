# Popups

A popup is content that floats above the page in response to an action. Menus, option lists,
dialogs, and tooltips are popups. A popup is temporary and exists to help a person decide or to
explain something briefly.

## Roles decide modality

Menu, option lists, and tooltips are non-modal. The page remains available, and focus stays
predictable. Dialogs are modal: they block the page, contain focus, and require an explicit
dismissal.

A popup never changes its modality midway through its life.

## Anchoring

A popup belongs to the element that opened it. It appears next to that element, in the first frame,
in the position where it will stay. It never appears in the wrong place and then jumps into place.

When there is not enough room, the popup moves to the side with room while remaining attached to
its trigger.

## Appearance

A popup uses the overlay surface and a functional border where the edge must be identified. It has
no shadow. Its content uses the shared surface roles rather than a component-specific color. See
[Elevation](../foundations/elevation.md) and [Shape](../foundations/shape.md).

## No motion

A popup appears and disappears instantly. It does not scale, slide, or fade. See
[Motion](../foundations/motion.md).

## Contents

Popup content is short enough to scan. Long content scrolls inside the popup instead of extending
beyond it. A popup does not become a page in its own right; when content needs a page, it is a page.

## Dismissal

A menu or option list closes after a choice. Escape dismisses a transient popup. An outside
interaction may dismiss a non-modal popup; a modal dialog requires an explicit action.

When a popup moves focus away from its invoker, closing restores focus to the invoker. A tooltip
never takes focus. A suggestion list owned by a field keeps focus in the field. See
[Field](../components/field.md).

## Layering

Popups sit above the page and above sticky content. Their order relative to other floating content
is defined in [Values](../foundations/values.md#layering). A popup never covers the control that
opened it.

## Principle

A popup should appear where a person expects, stay readable while open, and leave without
disorienting them.
