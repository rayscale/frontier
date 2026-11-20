import type { ReactElement, ReactNode } from 'react'

import { Ellipsis } from '../../../symbols/index.js'
import { DropdownMenu } from '../../dropdown-menu/dropdown-menu.js'
import { renderHiddenEntry } from '../helpers/slots.js'

export function BreadcrumbCollapsed({ entries }: { entries: ReactNode[] }): ReactElement {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button
          type="button"
          className="frontier-breadcrumb__trigger"
          aria-label="Show hidden breadcrumb items"
        >
          <Ellipsis size={16} aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start">{entries.map(renderHiddenEntry)}</DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
