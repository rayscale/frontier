import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import type { ReactElement } from 'react'

import { ChevronDown } from '../../../symbols/index.js'
import type { TAccordionItemProps } from '../types.js'

export function AccordionItem({
  children,
  className,
  disabled = false,
  title,
  value,
}: TAccordionItemProps): ReactElement {
  const classes = ['frontier-accordion__item', className].filter(Boolean).join(' ')

  return (
    <BaseAccordion.Item className={classes} disabled={disabled} value={value}>
      <BaseAccordion.Header className="frontier-accordion__heading">
        <BaseAccordion.Trigger className="frontier-accordion__trigger" data-accordion-trigger>
          <span className="frontier-accordion__title">{title}</span>
          <ChevronDown className="frontier-accordion__chevron" aria-hidden="true" />
        </BaseAccordion.Trigger>
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="frontier-accordion__panel" role="group" keepMounted>
        <div className="frontier-accordion__content">
          <div className="frontier-accordion__content-inner">{children}</div>
        </div>
      </BaseAccordion.Panel>
    </BaseAccordion.Item>
  )
}
