import { Table } from '@rayscale/frontier'
import type { ComponentProps } from 'react'
import { useState } from 'react'

type TSort = NonNullable<ComponentProps<typeof Table.Head>['sort']>

const rows = [
  { name: 'Jorge', age: 31 },
  { name: 'Ana', age: 28 },
  { name: 'Kim', age: 35 },
]

export default function Sortable() {
  const [sort, setSort] = useState<TSort>('ascending')
  const sorted = [...rows].sort((a, b) =>
    sort === 'ascending' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  )

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head sort={sort}>
            <button
              type="button"
              onClick={() => {
                setSort(sort === 'ascending' ? 'descending' : 'ascending')
              }}
            >
              Name
            </button>
          </Table.Head>
          <Table.Head align="end">Age</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sorted.map((row) => (
          <Table.Row key={row.name}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell align="end">{row.age}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
