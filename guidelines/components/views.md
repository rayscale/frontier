# Views

Views move between mutually exclusive areas of content. Tabs and segmented regions are the common
presentations. A view is a location, not a selected value.

## One current view

Exactly one view is current in a region. The current view is visible and announced. The other views
are not rendered as if they were visible; they are reached by changing the view.

The current view is not the selected value of a control inside it. See
[Selection](../patterns/selection.md).

## Tabs

Tabs are arranged along an axis. Each tab has a label and, optionally, an icon. The current tab is
visually distinct without relying on color alone. Tabs keep their order between visits.

A tab that contains an error or a pending change may carry a marker, but the marker does not
replace the tab's label.

## Keyboard

Arrow keys move the highlight within the tab list. The current view changes on confirmation, not on
highlight alone. Home and End move to the first and last tab. Tab moves out of the list. See
[Keyboard](../patterns/keyboard.md).

## Transition

A view replaces another with a short fade: the outgoing view fades out and the incoming view fades
in, entering faster than the outgoing view leaves so the surface never looks empty. There is no
slide, no cross-fade of two fully visible views, and no change of layout.

Views occupy the same region and keep their positions, so a person who switches repeatedly never
hunts for the tab or the panel. The incoming view is readable from its first frame. See
[Motion](../foundations/motion.md).

When a person prefers reduced motion, the change is instant.

## State retention

A view keeps its content state while the person moves to another view and back, unless the content
is explicitly reloaded. The person does not lose typed input by switching tabs.

## Overflow

When tabs do not fit, the region provides a visible way to reach the remaining tabs. It does not
shrink labels below the readable minimum or hide tabs without a path.

## Principle

A person should always know which view is current and should not lose work by moving between views.
