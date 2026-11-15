# Keyboard

Frontier is fully operable by keyboard. The keyboard model is conventional: it uses the keys people
already expect for each kind of control, and it never requires a pointer to discover an action.

## Order and focus

Tab moves through interactive elements in the reading order. Shift+Tab moves backward. The visual
order, the keyboard order, and the assistive reading order agree. See
[Accessibility](../foundations/accessibility.md).

Focus is always visible; see [Focus](../foundations/focus.md). Focus is not selection and does not
change a value by itself.

## Standard keys

- **Enter** activates the focused control or confirms a value.
- **Space** activates buttons and toggles.
- **Arrow keys** move within a group, such as options, tabs, or menu items.
- **Home** and **End** move to the first and last item of a group.
- **Escape** dismisses a transient surface without committing.
- **Tab** leaves a group; arrow keys move inside it.

A control uses the keys its role implies. It does not invent a new key for a common action.

## Groups

Within a choice group, a tab list, or a menu, one item has keyboard focus and the arrow keys move
the highlight. The highlight does not commit a value; confirmation follows the pattern of the
control. See [Highlight](./highlight.md) and [Selection](./selection.md).

## Modal surfaces

A modal dialog keeps focus inside it and returns focus to the element that opened it when it
closes. Escape dismisses a non-blocking popup; a modal dialog follows the dismissal rule of its
role. See [Popups](./popups.md).

## Shortcuts

A keyboard shortcut uses a modifier and never overrides a platform or assistive shortcut. Shortcuts
are documented in the interface where they apply. A single-key shortcut is not introduced for a
destructive or frequent action.

## No keyboard traps

Focus never becomes trapped in a region that is not a modal surface. A person can always move back
to the page with Tab or Shift+Tab.

## Principle

Every action should be reachable by keyboard, using the keys the control already implies, with
focus always visible.
