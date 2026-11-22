import { Table } from '@rayscale/frontier'

export default function Footer() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Item</Table.Head>
          <Table.Head align="end">Price</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Notebook</Table.Cell>
          <Table.Cell align="end">$12.00</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Pen</Table.Cell>
          <Table.Cell align="end">$3.00</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell align="end">$15.00</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}
