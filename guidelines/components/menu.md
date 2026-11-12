# Menu

A menu is a list of actions or destinations opened from a trigger. It is a temporary surface and
follows the popup behavior. A menu does not select a value; it invokes an operation or moves to a
destination.

## Actions, not values

A menu item performs an operation or navigates. A menu does not keep a selected value. When a person
must choose among values, use a choice. See [Choice](./choice.md).

Items that perform a destructive operation name what they destroy. They are not separated by color
alone and are not visually louder through shape.

## Opening and closing

The menu opens from an explicit action. It closes on selection, on Escape, or when the person
presses outside it. Focus returns to the trigger when the menu closes without a selection. See
[Popups](../patterns/popups.md).

## Keyboard

Arrow keys move the highlight through items. Enter or Space invokes the highlighted item. Home and
End move to the first and last item. Typeahead moves to the first item that matches the typed
characters. See [Keyboard](../patterns/keyboard.md).

Disabled items remain visible and reachable but cannot be invoked. They never receive the
highlight.

## Labels

Every menu item has a text label. Icons may support the label but never replace it. A menu with
icon-only items is not part of the system.

## Grouping

Related items may be grouped with space and, where a group needs a name, a group label. Groups do
not use dividers or containers. See [Structure](../principles/structure.md).

## No animation

Menus appear and disappear instantly. They do not fade, slide, or grow. See
[Motion](../foundations/motion.md).

## Principle

A menu should list clear actions in a predictable order, be operable by keyboard, and never
pretend to be a selection control.
