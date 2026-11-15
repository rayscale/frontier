import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../../index.js'

describe('Button', () => {
  it('renders its label and handles clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Save changes</Button>)

    await user.click(screen.getByRole('button', { name: 'Save changes' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('marks the action pressed while an activation key is held', async () => {
    const user = userEvent.setup()

    render(<Button>Save changes</Button>)

    const button = screen.getByRole('button', { name: 'Save changes' })

    await user.tab()
    await user.keyboard('{Enter>}')

    expect(button).toHaveAttribute('data-pressed', 'key')

    await user.keyboard('{/Enter}')

    expect(button).not.toHaveAttribute('data-pressed')
  })

  it('releases the pressed state when focus leaves the action', async () => {
    const user = userEvent.setup()

    render(
      <>
        <Button>Save changes</Button>
        <button type="button">Next</button>
      </>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })

    await user.tab()
    await user.keyboard('{Enter>}')
    expect(button).toHaveAttribute('data-pressed', 'key')

    await user.tab()

    expect(button).not.toHaveAttribute('data-pressed')
    await user.keyboard('{/Enter}')
  })

  it('does not acknowledge a press when disabled', async () => {
    const user = userEvent.setup()

    render(
      <Button disabled disabledReason="You need permission to save changes">
        Save changes
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })

    await user.tab()
    await user.keyboard('{Enter>}')

    expect(button).not.toHaveAttribute('data-pressed')

    await user.keyboard('{/Enter}')
  })

  it('defaults to type button and forwards native props', () => {
    render(
      <Button type="submit" className="custom-button">
        Save changes
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveClass('frontier-button', 'custom-button')
  })

  it('defaults to type button', () => {
    render(<Button>Save changes</Button>)

    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveAttribute('type', 'button')
  })

  it.each(['primary', 'secondary', 'ghost', 'danger'] as const)(
    'applies the %s variant',
    (variant) => {
      render(<Button variant={variant}>Save changes</Button>)

      expect(screen.getByRole('button', { name: 'Save changes' })).toHaveClass(
        `frontier-button--${variant}`,
      )
    },
  )

  it('renders an icon-only button with its accessible name as the title', () => {
    render(
      <Button iconOnly aria-label="Add item">
        <svg aria-hidden="true" />
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Add item' })

    expect(button).toHaveClass('frontier-button--icon')
    expect(button).toHaveAttribute('title', 'Add item')
  })

  it('keeps a disabled button focusable, explains why, and ignores activation', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button disabled disabledReason="You need permission to save changes" onClick={onClick}>
        Save changes
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Save changes' })

    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).not.toBeDisabled()
    expect(button).toHaveAccessibleDescription('You need permission to save changes')
    expect(button).toHaveAttribute('title', 'You need permission to save changes')

    await user.tab()
    expect(button).toHaveFocus()

    await user.keyboard('{Enter}')
    await user.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('merges the disabled reason with an existing description', () => {
    render(
      <>
        <span id="hint">Saving requires a file.</span>
        <Button disabled disabledReason="You need permission." aria-describedby="hint">
          Save changes
        </Button>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Save changes' })).toHaveAccessibleDescription(
      'Saving requires a file. You need permission.',
    )
  })

  it('forwards a ref to the native button', () => {
    const ref = createRef<HTMLElement>()

    render(<Button ref={ref}>Save changes</Button>)

    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('renders a child element as the action with asChild', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const childOnClick = vi.fn((event: { preventDefault: () => void }) => {
      event.preventDefault()
    })

    render(
      <Button asChild variant="secondary" className="button-class" onClick={onClick}>
        <a href="/documentation" className="custom-link" onClick={childOnClick}>
          Open documentation
        </a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Open documentation' })

    expect(link).toHaveClass(
      'frontier-button',
      'frontier-button--secondary',
      'button-class',
      'custom-link',
    )
    expect(link).toHaveAttribute('href', '/documentation')

    await user.click(link)

    expect(childOnClick).toHaveBeenCalledOnce()
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('keeps an asChild action focusable and inert when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button asChild disabled disabledReason="The document is unavailable" onClick={onClick}>
        <a href="/documentation">Open documentation</a>
      </Button>,
    )

    const link = screen.getByRole('link', { name: 'Open documentation' })

    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAccessibleDescription('The document is unavailable')

    await user.tab()
    expect(link).toHaveFocus()

    await user.keyboard('{Enter}')
    await user.click(link)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards a ref to the asChild element', () => {
    const ref = createRef<HTMLElement>()

    render(
      <Button asChild ref={ref}>
        <a href="/documentation">Open documentation</a>
      </Button>,
    )

    expect(ref.current?.tagName).toBe('A')
  })

  it('requires a single element when asChild is true', () => {
    expect(() => render(<Button asChild>Open documentation</Button>)).toThrow(
      'Button asChild requires a single React element as children.',
    )
  })

  it('rejects a fragment when asChild is true', () => {
    expect(() =>
      render(
        <Button asChild>
          <>
            <span>Open documentation</span>
          </>
        </Button>,
      ),
    ).toThrow('Button asChild requires a single React element as children.')
  })
})
