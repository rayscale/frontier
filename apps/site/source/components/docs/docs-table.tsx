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
export const tableComponents = {
  table: (props: ComponentPropsWithoutRef<'table'>): ReactElement => <Table {...props} />,
  thead: (props: ComponentPropsWithoutRef<'thead'>): ReactElement => <Table.Header {...props} />,
  tbody: (props: ComponentPropsWithoutRef<'tbody'>): ReactElement => <Table.Body {...props} />,
  tr: (props: ComponentPropsWithoutRef<'tr'>): ReactElement => <Table.Row {...props} />,
  th: ({ align, ...props }: ComponentPropsWithoutRef<'th'>): ReactElement => (
    <Table.Head {...props} align={cellAlign(align)} />
  ),
  td: ({ align, ...props }: ComponentPropsWithoutRef<'td'>): ReactElement => (
    <Table.Cell {...props} align={cellAlign(align)} />
  ),
}
