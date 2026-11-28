import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Callout, Callout as PublicCallout } from './index.js'

describe('Callout', () => {
  it('renders a note with the info tone by default', () => {
    render(<Callout>Message</Callout>)

    const callout = screen.getByRole('note')
    expect(callout).toHaveClass('frontier-callout')
    expect(callout).toHaveAttribute('data-tone', 'info')
  })

  it.each(['info', 'success', 'warning', 'danger'] as const)('supports the %s tone', (tone) => {
    render(<Callout tone={tone}>Message</Callout>)

    expect(screen.getByRole('note')).toHaveAttribute('data-tone', tone)
  })

  it('lets consumers change the accessible role', () => {
    render(<Callout role="alert">Message</Callout>)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders compound parts with their classes and default elements', () => {
    render(
      <Callout>
        <Callout.Icon data-testid="icon">!</Callout.Icon>
        <Callout.Content>
          <Callout.Title>Heads up</Callout.Title>
          <p>Review the settings before continuing.</p>
        </Callout.Content>
        <Callout.Actions>
          <button type="button">Review</button>
        </Callout.Actions>
      </Callout>,
    )

    expect(screen.getByTestId('icon')).toHaveClass('frontier-callout__icon')
    expect(screen.getByTestId('icon')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Heads up').tagName).toBe('P')
    expect(screen.getByText('Heads up')).toHaveClass('frontier-callout__title')
    expect(screen.getByText('Review the settings before continuing.').parentElement).toHaveClass(
      'frontier-callout__content',
    )
    expect(screen.getByText('Review').parentElement).toHaveClass('frontier-callout__actions')
  })

  it('renders the title as a heading when requested', () => {
    render(<Callout.Title as="h3">Warning</Callout.Title>)

    expect(screen.getByRole('heading', { level: 3, name: 'Warning' })).toBeInTheDocument()
  })

  it('forwards refs and native attributes', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Callout className="custom" data-testid="callout" id="notice" ref={ref}>
        Message
      </Callout>,
    )

    const callout = screen.getByTestId('callout')
    expect(callout).toHaveClass('frontier-callout', 'custom')
    expect(callout).toHaveAttribute('id', 'notice')
    expect(ref.current).toBe(callout)
  })

  it('has no dismiss button unless onDismiss is given', () => {
    render(<Callout>Message</Callout>)

    expect(screen.queryByRole('button')).toBeNull()
  })

  it('shows a dismiss button that calls onDismiss', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<Callout onDismiss={onDismiss}>Message</Callout>)

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))

    expect(onDismiss).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('note')).toHaveAttribute('data-dismissible')
  })

  it('names the dismiss button with dismissLabel', () => {
    render(
      <Callout dismissLabel="Cerrar aviso" onDismiss={() => undefined}>
        Message
      </Callout>,
    )

    expect(screen.getByRole('button', { name: 'Cerrar aviso' })).toBeInTheDocument()
  })

  it('is exported from the package entry point', () => {
    expect(PublicCallout).toBe(Callout)
    expect(PublicCallout.Icon).toBe(Callout.Icon)
    expect(PublicCallout.Title).toBe(Callout.Title)
    expect(PublicCallout.Content).toBe(Callout.Content)
    expect(PublicCallout.Actions).toBe(Callout.Actions)
  })
})
