import { forwardRef } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'
import { ChevronDown } from '../../symbols/index.js'
import { Collapsible } from '../collapsible/collapsible.js'

import type { TDisclosureProps } from './types.js'

import './disclosure.css'

export type { TDisclosureProps } from './types.js'

/**
 * Renders a labeled section that expands to reveal secondary content, such as
 * raw markup, advanced options, or metadata. The trigger is a button that owns
 * its expanded state, so the content stays reachable without a mouse.
 *
 * Reach for `Disclosure` for one independent section, `Accordion` for a set of
 * related sections, and `Collapsible` when the trigger needs a custom design.
 */
export const Disclosure = forwardRef<HTMLDivElement, TDisclosureProps>(function Disclosure(
  { children, className, title, ...props },
  ref,
) {
  return (
    <Collapsible {...props} ref={ref} className={classNames('frontier-disclosure', className)}>
      <Collapsible.Trigger className="frontier-disclosure__trigger">
        <span className="frontier-disclosure__title">{title}</span>
        <ChevronDown aria-hidden="true" className="frontier-disclosure__chevron" />
      </Collapsible.Trigger>
      <Collapsible.Content className="frontier-disclosure__content">{children}</Collapsible.Content>
    </Collapsible>
  )
})
