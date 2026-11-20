import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { type KeyboardEvent, type ReactElement, useRef } from 'react'

import { toExpandedValues } from '../helpers/state.js'
import type { TAccordionProps } from '../types.js'

export function AccordionRoot(props: TAccordionProps): ReactElement {
  const { children, className, disabled = false } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const classes = ['frontier-accordion', className].filter(Boolean).join(' ')

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const root = rootRef.current

    if (!root) {
      return
    }

    const triggers = Array.from(
      root.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]:not(:disabled)'),
    ).filter((trigger) => trigger.closest('.frontier-accordion') === root)
    const currentIndex = triggers.findIndex((trigger) => trigger === event.target)

    if (currentIndex === -1) {
      return
    }

    let targetIndex: number

    switch (event.key) {
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % triggers.length
        break
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + triggers.length) % triggers.length
        break
      case 'Home':
        targetIndex = 0
        break
      case 'End':
        targetIndex = triggers.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    triggers[targetIndex]?.focus()
  }

  return (
    <BaseAccordion.Root
      ref={rootRef}
      className={classes}
      disabled={disabled}
      multiple={props.type === 'multiple'}
      value={props.value === undefined ? undefined : toExpandedValues(props.value)}
      defaultValue={toExpandedValues(props.defaultValue)}
      onKeyDown={handleKeyDown}
      onValueChange={(nextValues: string[]) => {
        if (props.type === 'single') {
          props.onValueChange?.(nextValues[0] ?? null)
        } else {
          props.onValueChange?.(nextValues)
        }
      }}
    >
      {children}
    </BaseAccordion.Root>
  )
}
