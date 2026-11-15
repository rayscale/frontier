# Navigation

Navigation tells a person where they are and how to move. Frontier distinguishes location from
selection and keeps the path visible without decoration.

## Current location

The current location is the destination being viewed. It uses the current treatment, not the
selected treatment. A current tab, a current page in a sidebar, and the last item in a breadcrumb
all describe location. See [Selection](./selection.md).

Only one location is current in a navigation region. A history stack may contain several visited
destinations, but only one is current.

## Views and tabs

Tabs and segmented views switch between mutually exclusive areas of content. The current view is
visible and announced. Changing views does not change the selected value of a control inside the
view unless the view itself owns that value.

Tabs keep their order between visits. A view does not reorder itself based on use.

## Breadcrumbs

A breadcrumb shows the path to the current location, from the root to the current item. The current
item is not a link. A breadcrumb does not replace the main navigation; it supplements it.

## Hierarchy and disclosure

Nested destinations expand and collapse without moving the person to a new page. A disclosure uses
the disclosure primitive and keeps its expanded state visible. The current path remains visible
while a branch is open.

## Keyboard and focus

Navigation regions are reachable by keyboard. Arrow keys move within a group where the pattern
defines a group, such as a tab list or a menu. Moving the highlight does not change the current
location until the person confirms.

## No hover-only navigation

A destination is never reachable only through hover. Menus and submenus open from an explicit
action and are dismissible by keyboard. See [Popups](./popups.md).

## Mobile behavior

When horizontal space is insufficient, navigation adapts without hiding the current location. A
collapsed navigation still names the current destination and provides a visible way to open it.

## Principle

A person should always know where they are, how they got there, and how to move, without relying on
hover or color.
