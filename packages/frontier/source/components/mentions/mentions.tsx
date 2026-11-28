import { Popover as BasePopover } from '@base-ui/react/popover'
import {
  type FocusEvent,
  type KeyboardEvent,
  type ReactElement,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../internal/primitives/animated-highlight/animated-highlight.js'
import { FloatingPopup } from '../../internal/primitives/floating-popup/floating-popup.js'

import { getCaretRect } from './helpers/caret.js'
import {
  filterItems,
  findMention,
  getNextIndex,
  isSameMatch,
  type TMentionMatch,
} from './helpers/match.js'
import type { TMentionItem, TMentionsProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import '../../internal/styles/option-list.css'
import '../../internal/styles/visually-hidden.css'
import './mentions.css'

export type { TMentionItem, TMentionsProps, TMentionTrigger } from './types.js'

type TField = HTMLInputElement | HTMLTextAreaElement

interface TTracked {
  readonly field: TField
  readonly match: TMentionMatch
}

function isField(target: EventTarget): target is TField {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
}

/**
 * Opens a list of choices when people type a trigger such as `@` or `/` in a text field, and puts
 * the one they choose into the text. Wrap the field with it, whether it is a `Textarea`, an
 * `Input`, or the field of an `InputGroup`. The field keeps its own value, so it works controlled
 * or not. It renders no element of its own around the field.
 */
export function Mentions({
  children,
  onQueryChange,
  onSelect,
  triggers,
}: TMentionsProps): ReactElement {
  const listId = useId()
  const [tracked, setTracked] = useState<TTracked | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dismissedStart, setDismissedStart] = useState<number | null>(null)

  const match = tracked?.match
  const trigger = match ? triggers[match.triggerIndex] : undefined
  const items = useMemo(
    () => (trigger && match ? filterItems(trigger, match.query) : []),
    [trigger, match],
  )
  const open = match !== undefined && match.start !== dismissedStart && items.length > 0

  // The list keeps what it showed while the popup fades out, so it does not empty before it goes.
  const [shown, setShown] = useState({ items, label: trigger?.label })
  if (open && (shown.items !== items || shown.label !== trigger?.label)) {
    setShown({ items, label: trigger?.label })
  }

  const listItems = open ? items : shown.items
  const active = listItems[Math.min(activeIndex, listItems.length - 1)]
  const anchor = useMemo(
    () =>
      tracked
        ? {
            contextElement: tracked.field,
            getBoundingClientRect: () => getCaretRect(tracked.field, tracked.match.start),
          }
        : undefined,
    [tracked],
  )

  // The field is not ours, so the link between it and the list is set on it from here.
  const field = tracked?.field
  useEffect(() => {
    if (!field || !open) {
      return undefined
    }

    field.setAttribute('aria-autocomplete', 'list')
    field.setAttribute('aria-controls', listId)
    field.setAttribute('aria-activedescendant', `${listId}-${String(activeIndex)}`)

    return () => {
      field.removeAttribute('aria-autocomplete')
      field.removeAttribute('aria-controls')
      field.removeAttribute('aria-activedescendant')
    }
  }, [field, open, listId, activeIndex])

  function update(target: TField): void {
    const caret = target.selectionStart
    const next =
      caret !== null && caret === target.selectionEnd
        ? findMention(target.value, caret, triggers)
        : null

    if (!isSameMatch(match ?? null, next)) {
      setActiveIndex(0)

      const nextTrigger = next ? triggers[next.triggerIndex] : undefined
      if (next && nextTrigger) {
        onQueryChange?.(next.query, nextTrigger.char)
      }
    }

    setTracked(next ? { field: target, match: next } : null)

    if (!next) {
      setDismissedStart(null)
    }
  }

  function choose(item: TMentionItem): void {
    if (!tracked || !trigger || item.disabled === true) {
      return
    }

    const { field: target, match: current } = tracked
    const text = `${item.insert ?? `${trigger.char}${item.label}`}${
      trigger.insertSpace === false ? '' : ' '
    }`

    // A change to the value that React did not make still reaches `onChange` through an input event.
    target.setRangeText(text, current.start, target.selectionEnd ?? current.start, 'end')
    setDismissedStart(current.start)
    target.dispatchEvent(new Event('input', { bubbles: true }))
    onSelect?.(item, trigger.char)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>): void {
    if (!open || !isField(event.target) || event.nativeEvent.isComposing) {
      return
    }

    const stop = (): void => {
      event.preventDefault()
      event.stopPropagation()
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      stop()
      setActiveIndex(getNextIndex(items, activeIndex, event.key === 'ArrowDown' ? 1 : -1))
    } else if ((event.key === 'Enter' || event.key === 'Tab') && active) {
      stop()
      choose(active)
    } else if (event.key === 'Escape') {
      stop()
      setDismissedStart(match.start)
    }
  }

  function handleBlur(event: FocusEvent<HTMLElement>): void {
    if (isField(event.target)) {
      setTracked(null)
      setDismissedStart(null)
    }
  }

  return (
    <div
      className="frontier-mentions"
      onBlur={handleBlur}
      onInput={(event) => {
        if (isField(event.target)) {
          update(event.target)
        }
      }}
      onKeyDownCapture={handleKeyDown}
      onSelect={(event) => {
        if (isField(event.target)) {
          update(event.target)
        }
      }}
    >
      {children}
      <BasePopover.Root open={open} onOpenChange={() => undefined}>
        <FloatingPopup
          Portal={BasePopover.Portal}
          Positioner={BasePopover.Positioner}
          Popup={BasePopover.Popup}
          placement={{ side: 'bottom', align: 'start', sideOffset: 4 }}
          positionerProps={{ anchor: anchor ?? null }}
          popupProps={{
            className: classNames(
              'frontier-mentions__popup',
              'frontier-floating-surface',
              'frontier-option-popup',
            ),
            finalFocus: false,
            initialFocus: false,
            role: 'presentation',
            children: (
              <>
                <AnimatedHighlight />
                <ul
                  aria-label={shown.label ?? 'Suggestions'}
                  className="frontier-mentions__list frontier-option-list"
                  id={listId}
                  role="listbox"
                >
                  {listItems.map((item, index) => (
                    <li
                      key={item.id}
                      aria-disabled={item.disabled === true ? true : undefined}
                      aria-selected={item === active}
                      className="frontier-mentions__item frontier-option"
                      data-disabled={item.disabled === true ? '' : undefined}
                      data-highlighted={item === active && item.disabled !== true ? '' : undefined}
                      id={`${listId}-${String(index)}`}
                      role="option"
                      onMouseDown={(event) => {
                        // Keeps the focus in the field, so the cursor stays where it is.
                        event.preventDefault()
                      }}
                      onClick={() => {
                        choose(item)
                      }}
                      onMouseMove={() => {
                        if (item.disabled !== true && index !== activeIndex) {
                          setActiveIndex(index)
                        }
                      }}
                    >
                      {item.icon && (
                        <span aria-hidden="true" className="frontier-mentions__icon">
                          {item.icon}
                        </span>
                      )}
                      <span className="frontier-mentions__text">
                        {item.label}
                        {item.description && (
                          <span className="frontier-mentions__description">{item.description}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ),
          }}
        />
      </BasePopover.Root>
      <span aria-live="polite" className="frontier-visually-hidden" role="status">
        {open ? `${String(items.length)} suggestions` : ''}
      </span>
    </div>
  )
}
