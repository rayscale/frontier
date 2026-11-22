import { Table } from '@rayscale/frontier'

const payments = [
  { email: 'ana@example.com', amount: '$120.00', status: 'Paid' },
  { email: 'jorge@example.com', amount: '$75.50', status: 'Pending' },
  { email: 'kim@example.com', amount: '$240.00', status: 'Paid' },
]

export default function Default() {
  return (
    <Table>
      <Table.Caption>Recent payments</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Email</Table.Head>
          <Table.Head align="end">Amount</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payments.map((payment) => (
          <Table.Row key={payment.email}>
            <Table.Cell>{payment.email}</Table.Cell>
            <Table.Cell align="end">{payment.amount}</Table.Cell>
            <Table.Cell>{payment.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
