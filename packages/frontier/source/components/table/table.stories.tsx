import type { Meta, StoryObj } from '@storybook/react-vite'

import { Table } from './table.js'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (TStory) => (
      <div style={{ width: 720 }}>
        <TStory />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>

export default meta

type TStory = StoryObj<typeof meta>

const payments = [
  { email: 'ken99@example.com', amount: '$316.00', status: 'Success' },
  { email: 'Abe45@example.com', amount: '$242.00', status: 'Success' },
  { email: 'Monserrat44@example.com', amount: '$837.00', status: 'Processing' },
  { email: 'Silas22@example.com', amount: '$874.00', status: 'Success' },
  { email: 'carmella@example.com', amount: '$721.00', status: 'Failed' },
]

export const Default: TStory = {
  render: () => (
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
      <Table.Footer>
        <Table.Row>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell align="end">$2,990.00</Table.Cell>
          <Table.Cell />
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
}

export const Sortable: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Pass the sort state to Table.Head so assistive technology receives aria-sort.',
      },
    },
  },
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head sort="ascending">Email</Table.Head>
          <Table.Head align="end">Amount</Table.Head>
          <Table.Head sort="descending">Status</Table.Head>
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
  ),
}

export const Selected: TStory = {
  render: () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Email</Table.Head>
          <Table.Head align="end">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payments.map((payment, index) => (
          <Table.Row key={payment.email} selected={index === 1}>
            <Table.Cell>{payment.email}</Table.Cell>
            <Table.Cell align="end">{payment.amount}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
}

export const Empty: TStory = {
  render: () => (
    <Table>
      <Table.Caption>Recent payments</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>Email</Table.Head>
          <Table.Head align="end">Amount</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={2} align="center">
            No payments yet.
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
}
