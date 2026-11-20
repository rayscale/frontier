import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Table as PublicTable, Table } from './index.js'

describe('Table', () => {
  it('renders a semantic table inside a scroll container', () => {
    const { container } = render(
      <Table>
        <Table.Caption>Payments</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Email</Table.Head>
            <Table.Head align="end">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>ken99@example.com</Table.Cell>
            <Table.Cell align="end">$316.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    )

    expect(screen.getByRole('table', { name: 'Payments' })).toHaveClass('frontier-table')
    expect(container.querySelector('.frontier-table__scroll')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Email' })).toHaveAttribute('scope', 'col')
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveClass(
      'frontier-table__head--end',
    )
    expect(screen.getByRole('cell', { name: '$316.00' })).toHaveClass('frontier-table__cell--end')
  })

  it('exposes the sort direction through aria-sort', () => {
    render(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head sort="ascending">Email</Table.Head>
            <Table.Head sort="descending">Amount</Table.Head>
            <Table.Head sort="none">Status</Table.Head>
          </Table.Row>
        </Table.Header>
      </Table>,
    )

    expect(screen.getByRole('columnheader', { name: 'Email' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    )
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute(
      'aria-sort',
      'descending',
    )
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveAttribute(
      'aria-sort',
      'none',
    )
  })

  it('marks selected rows', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row selected>
            <Table.Cell>Selected</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    )

    expect(screen.getByRole('row')).toHaveAttribute('data-state', 'selected')
  })

  it('renders a footer row group', () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Subtotal</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell>Total</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>,
    )

    expect(screen.getByText('Total').closest('tfoot')).toHaveClass('frontier-table__footer')
  })

  it('forwards refs and native attributes', () => {
    const ref = createRef<HTMLTableElement>()
    render(
      <Table
        aria-label="Custom table"
        className="custom"
        containerClassName="custom-scroll"
        ref={ref}
      >
        <Table.Body>
          <Table.Row>
            <Table.Cell>Body</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    )

    const table = screen.getByRole('table', { name: 'Custom table' })
    expect(table).toHaveClass('frontier-table', 'custom')
    expect(ref.current).toBe(table)
    expect(table.parentElement).toHaveClass('frontier-table__scroll', 'custom-scroll')
  })

  it('is exported from the package entry point', () => {
    expect(PublicTable).toBe(Table)
    expect(PublicTable.Header).toBe(Table.Header)
    expect(PublicTable.Body).toBe(Table.Body)
    expect(PublicTable.Row).toBe(Table.Row)
    expect(PublicTable.Head).toBe(Table.Head)
    expect(PublicTable.Cell).toBe(Table.Cell)
  })
})
