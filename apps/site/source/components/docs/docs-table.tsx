'use client'

import { Table } from '@rayscale/frontier'
import type { ComponentPropsWithoutRef, ReactElement } from 'react'

type TCellAlign = 'start' | 'center' | 'end'

const cellAlignments: { [align: string]: TCellAlign | undefined } = {
  left: 'start',
  center: 'center',
  right: 'end',
}

function cellAlign(align: string | undefined): TCellAlign | undefined {
  return align === undefined ? undefined : cellAlignments[align]
}

/** The elements of a Markdown table, rendered with the Frontier table. */
export function DocsTable(props: ComponentPropsWithoutRef<'table'>): ReactElement {
  return <Table {...props} />
}

export function DocsTableHeader(props: ComponentPropsWithoutRef<'thead'>): ReactElement {
  return <Table.Header {...props} />
}

export function DocsTableBody(props: ComponentPropsWithoutRef<'tbody'>): ReactElement {
  return <Table.Body {...props} />
}

export function DocsTableRow(props: ComponentPropsWithoutRef<'tr'>): ReactElement {
  return <Table.Row {...props} />
}

export function DocsTableHead({ align, ...props }: ComponentPropsWithoutRef<'th'>): ReactElement {
  return <Table.Head {...props} align={cellAlign(align)} />
}

export function DocsTableCell({ align, ...props }: ComponentPropsWithoutRef<'td'>): ReactElement {
  return <Table.Cell {...props} align={cellAlign(align)} />
}
