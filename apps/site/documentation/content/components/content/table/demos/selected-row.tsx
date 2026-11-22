import { Table } from '@rayscale/frontier'

export default function SelectedRow() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Ana</Table.Cell>
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
        <Table.Row selected>
          <Table.Cell>Jorge</Table.Cell>
          <Table.Cell>Engineer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
