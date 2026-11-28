import { Popover as BasePopover } from '@base-ui/react/popover'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  BLUR_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  KEY_TAB_COMMAND,
  type LexicalCommand,
} from 'lexical'
import {
  type ReactElement,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import { AnimatedHighlight } from '../../../internal/primitives/animated-highlight/animated-highlight.js'
import { FloatingPopup } from '../../../internal/primitives/floating-popup/floating-popup.js'
import { filterItems, findMention, getNextIndex, type TMentionMatch } from '../helpers/match.js'
import { createMentionNode, MentionNode } from '../helpers/mention-node.js'
import { getMentionText } from '../helpers/parse.js'
import type { TMentionItem, TMentionsProps, TMentionTrigger } from '../types.js'

/** The trigger that people are typing after, and where it is in the editor. */
interface TTracked {
  readonly end: number
  readonly match: TMentionMatch
  readonly nodeKey: string
  /** Where the trigger starts inside its text node. */
  readonly start: number
}

/** Finds the trigger before the cursor. Call it inside a read of the editor. */
function readTracked(triggers: readonly TMentionTrigger[]): TTracked | null {
  const selection = $getSelection()
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return null
  }

  const node = selection.anchor.getNode()
  if (!$isTextNode(node)) {
    return null
  }

  const previous = node.getPreviousSiblings()
  // A chip counts as a word that ends in a space: a trigger can follow it, but it is not empty.
  const before = previous
    .map((sibling) => {
      const text = sibling.getTextContent()

      return sibling instanceof MentionNode ? `${'x'.repeat(text.length - 1)} ` : text
    })
    .join('')
  const { offset } = selection.anchor
  const prefix = before + node.getTextContent().slice(0, offset)
  const match = findMention(prefix, prefix.length, triggers)
  if (!match || match.start < before.length) {
    return null
  }

  return { end: offset, match, nodeKey: node.getKey(), start: match.start - before.length }
}

function isSameTracked(first: TTracked | null, second: TTracked | null): boolean {
  return (
    first?.nodeKey === second?.nodeKey &&
    first?.start === second?.start &&
    first?.end === second?.end &&
    first?.match.query === second?.match.query &&
    first?.match.triggerIndex === second?.match.triggerIndex
  )
}

export function MentionTypeahead({
  onQueryChange,
  onSelect,
  triggers,
}: Pick<TMentionsProps, 'onQueryChange' | 'onSelect' | 'triggers'>): ReactElement {
  const [editor] = useLexicalComposerContext()
  const listId = useId()
  const [tracked, setTracked] = useState<TTracked | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dismissed, setDismissed] = useState<string | null>(null)
  const trackedRef = useRef<TTracked | null>(null)

  const trigger = tracked ? triggers[tracked.match.triggerIndex] : undefined
  const items = useMemo(
    () => (trigger && tracked ? filterItems(trigger, tracked.match.query) : []),
    [trigger, tracked],
  )
  const place = tracked ? `${tracked.nodeKey}:${String(tracked.start)}` : null
  const open = place !== null && place !== dismissed && items.length > 0

  // The list keeps what it showed while the popup fades out, so it does not empty before it goes.
  const [shown, setShown] = useState({ items, label: trigger?.label })
  if (open && (shown.items !== items || shown.label !== trigger?.label)) {
    setShown({ items, label: trigger?.label })
  }

  const listItems = open ? items : shown.items
  const active = listItems[Math.min(activeIndex, listItems.length - 1)]

  const latest = useRef({ onQueryChange, triggers })
  useLayoutEffect(() => {
    latest.current = { onQueryChange, triggers }
  })

  useEffect(() => {
    const unregisterUpdate = editor.registerUpdateListener(({ editorState }) => {
      const next = editorState.read(() => readTracked(latest.current.triggers))
      const previous = trackedRef.current
      if (isSameTracked(previous, next)) {
        return
      }

      trackedRef.current = next
      setTracked(next)
      setActiveIndex(0)

      if (!next) {
        setDismissed(null)

        return
      }

      const found = latest.current.triggers[next.match.triggerIndex]
      if (found) {
        latest.current.onQueryChange?.(next.match.query, found.char)
      }
    })
    const unregisterBlur = editor.registerCommand(
      BLUR_COMMAND,
      () => {
        trackedRef.current = null
        setTracked(null)
        setDismissed(null)

        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )

    return () => {
      unregisterUpdate()
      unregisterBlur()
    }
  }, [editor])

  const anchor = useMemo(() => {
    if (!tracked) {
      return null
    }

    return {
      getBoundingClientRect: (): DOMRect => {
        const element = editor.getElementByKey(tracked.nodeKey)
        const text = element?.firstChild
        if (text?.nodeType === Node.TEXT_NODE) {
          const range = document.createRange()
          range.setStart(text, Math.min(tracked.start, text.textContent?.length ?? 0))
          range.collapse(true)

          return range.getBoundingClientRect()
        }

        return element?.getBoundingClientRect() ?? new DOMRect()
      },
    }
  }, [editor, tracked])

  function choose(item: TMentionItem): void {
    if (!tracked || !trigger || item.disabled === true) {
      return
    }

    editor.update(() => {
      const node = $getNodeByKey(tracked.nodeKey)
      if (!$isTextNode(node)) {
        return
      }

      // Splitting at the start leaves the typed trigger first, otherwise it is the second part.
      const parts =
        tracked.start === 0
          ? node.splitText(tracked.end)
          : node.splitText(tracked.start, tracked.end)
      const typed = parts[tracked.start === 0 ? 0 : 1]
      if (!typed) {
        return
      }

      const chip = createMentionNode(getMentionText(trigger, item), item.id, trigger.char)
      typed.replace(chip)

      if (trigger.insertSpace === false) {
        chip.selectNext(0, 0)
      } else {
        const space = $createTextNode(' ')
        chip.insertAfter(space)
        space.select(1, 1)
      }
    })
    onSelect?.(item, trigger.char)
  }

  // The keys are registered once, and read the latest state from here.
  const keys = useRef({ activeIndex, active, choose, items, open, place })
  useLayoutEffect(() => {
    keys.current = { activeIndex, active, choose, items, open, place }
  })

  useEffect(() => {
    function register<TEvent extends KeyboardEvent | null>(
      command: LexicalCommand<TEvent>,
      run: () => boolean,
    ): () => void {
      return editor.registerCommand(
        command,
        (event) => {
          if (!keys.current.open || event?.isComposing === true || !run()) {
            return false
          }

          event?.preventDefault()
          event?.stopPropagation()

          return true
        },
        COMMAND_PRIORITY_CRITICAL,
      )
    }

    function move(direction: 1 | -1): boolean {
      setActiveIndex(getNextIndex(keys.current.items, keys.current.activeIndex, direction))

      return true
    }

    function take(): boolean {
      const item = keys.current.active
      if (!item) {
        return false
      }

      keys.current.choose(item)

      return true
    }

    const unregister = [
      register(KEY_ARROW_DOWN_COMMAND, () => move(1)),
      register(KEY_ARROW_UP_COMMAND, () => move(-1)),
      register(KEY_ENTER_COMMAND, take),
      register(KEY_TAB_COMMAND, take),
      register(KEY_ESCAPE_COMMAND, () => {
        setDismissed(keys.current.place)

        return true
      }),
    ]

    return () => {
      for (const remove of unregister) {
        remove()
      }
    }
  }, [editor])

  // The field points at the highlighted item, since the focus stays in it.
  useEffect(() => {
    const field = editor.getRootElement()
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
  }, [activeIndex, editor, listId, open])

  return (
    <>
      <BasePopover.Root open={open} onOpenChange={() => undefined}>
        <FloatingPopup
          Portal={BasePopover.Portal}
          Positioner={BasePopover.Positioner}
          Popup={BasePopover.Popup}
          placement={{ side: 'bottom', align: 'start', sideOffset: 4 }}
          positionerProps={{ anchor }}
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
    </>
  )
}
