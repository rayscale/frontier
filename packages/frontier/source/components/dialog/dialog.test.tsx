import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type MouseEvent, type SyntheticEvent, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button.js'

import { Dialog, type TDialogProps } from './index.js'

afterEach(() => {
  cleanup()
})

function renderDialog(props: Partial<TDialogProps> = {}) {
  return render(
    <Dialog {...props}>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Delete project?</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <p>Body text</p>
        <Dialog.Footer>
          <Dialog.Close>Cancel</Dialog.Close>
          <Button variant="danger">Delete</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>,
  )
}

function ControlledDialog({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        setOpen(nextOpen)
      }}
    >
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Controlled</Dialog.Title>
        <Dialog.Close>Close</Dialog.Close>
      </Dialog.Content>
    </Dialog>
  )
}

function getBackdrop(): HTMLElement {
  const backdrop = document.querySelector<HTMLElement>('.frontier-dialog__backdrop')

  if (!backdrop) {
    throw new Error('Expected the dialog backdrop to be rendered.')
  }

  return backdrop
}

describe('Dialog', () => {
  it('forwards its ref to the dialog popup element', async () => {
    const user = userEvent.setup()
    const contentRef = createRef<HTMLDivElement>()

    render(
      <Dialog>
        <Dialog.Trigger>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content ref={contentRef}>
          <Dialog.Title>Ref check</Dialog.Title>
        </Dialog.Content>
      </Dialog>,
    )

    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    expect(await screen.findByRole('dialog')).toBe(contentRef.current)
  })

  describe('state', () => {
    it('opens from the trigger and closes from Close in uncontrolled mode', async () => {
      const user = userEvent.setup()
      renderDialog()
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('renders open on mount when defaultOpen is set', () => {
      renderDialog({ defaultOpen: true })
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls onOpenChange with the requested state in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderDialog({ onOpenChange })
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenLastCalledWith(true)
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(onOpenChange).toHaveBeenCalledTimes(2)
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
    })

    it('keeps the dialog closed when a controlled parent ignores onOpenChange', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(
        <Dialog open={false} onOpenChange={onOpenChange}>
          <Dialog.Trigger>
            <Button>Open dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Controlled</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('follows the open prop when a controlled parent updates it', async () => {
      const { rerender } = render(
        <Dialog open={false}>
          <Dialog.Content>
            <Dialog.Title>Controlled</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      rerender(
        <Dialog open>
          <Dialog.Content>
            <Dialog.Title>Controlled</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      rerender(
        <Dialog open={false}>
          <Dialog.Content>
            <Dialog.Title>Controlled</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('works with controlled state managed by a parent component', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<ControlledDialog onOpenChange={onOpenChange} />)
      await user.click(screen.getByRole('button', { name: 'Open dialog' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(onOpenChange).toHaveBeenLastCalledWith(true)
      await user.click(screen.getByRole('button', { name: 'Close' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenLastCalledWith(false)
    })
  })

  describe('keyboard', () => {
    it('closes on Escape and reports the close once', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderDialog({ defaultOpen: true, onOpenChange })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('keeps a controlled dialog open on Escape when the parent ignores the request', async () => {
      const user = userEvent.setup()
      render(
        <Dialog open onOpenChange={vi.fn()}>
          <Dialog.Content>
            <Dialog.Title>Controlled</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await user.keyboard('{Escape}')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('moves focus into the dialog when it opens and restores it on close', async () => {
      const user = userEvent.setup()
      renderDialog()
      const trigger = screen.getByRole('button', { name: 'Open dialog' })
      await user.click(trigger)
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)
      })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(trigger).toHaveFocus()
      })
    })
  })

  describe('Dialog.Trigger', () => {
    it('wraps non-element children in a Button and exposes dialog ARIA state', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <Dialog.Trigger>Open text</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      const trigger = screen.getByRole('button', { name: 'Open text' })
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
    })

    it('preserves the child element attributes and onClick handler', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Dialog>
          <Dialog.Trigger>
            <Button className="open-button" onClick={onClick}>
              Open
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      const trigger = screen.getByRole('button', { name: 'Open' })
      await user.click(trigger)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(trigger).toHaveClass('open-button')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not open when the child onClick calls preventDefault', async () => {
      const user = userEvent.setup()
      render(
        <Dialog>
          <Dialog.Trigger>
            <Button
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              }}
            >
              Blocked
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await user.click(screen.getByRole('button', { name: 'Blocked' }))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Dialog.Close', () => {
    it('renders as type="button" so it never submits a surrounding form', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn((event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
      })
      render(
        <form onSubmit={onSubmit}>
          <Dialog defaultOpen>
            <Dialog.Content>
              <Dialog.Title>Form</Dialog.Title>
              <Dialog.Close>Dismiss</Dialog.Close>
            </Dialog.Content>
          </Dialog>
        </form>,
      )
      const dismiss = screen.getByRole('button', { name: 'Dismiss' })
      expect(dismiss).toHaveAttribute('type', 'button')
      await user.click(dismiss)
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('renders custom children and uses the outline variant by default', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
            <Dialog.Close>Not now</Dialog.Close>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.getByRole('button', { name: 'Not now' })).toHaveClass(
        'frontier-button--outline',
      )
    })

    it('does not close when its onClick calls preventDefault', async () => {
      const user = userEvent.setup()
      render(
        <Dialog defaultOpen>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
            <Dialog.Close
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              }}
            >
              Stay
            </Dialog.Close>
          </Dialog.Content>
        </Dialog>,
      )
      await user.click(screen.getByRole('button', { name: 'Stay' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('Dialog.Content close button', () => {
    it('renders an accessible close button by default that closes the dialog', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      await user.click(screen.getByRole('button', { name: 'Close dialog' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('hides the close button when showCloseButton is false', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content showCloseButton={false}>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument()
    })
  })

  describe('backdrop dismissal', () => {
    it('closes when the backdrop is clicked', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      await user.click(getBackdrop())
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when clicking inside the content', async () => {
      const user = userEvent.setup()
      renderDialog({ defaultOpen: true })
      await user.click(screen.getByText('Body text'))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Dialog defaultOpen>
          <Dialog.Content closeOnBackdropClick={false}>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await user.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('still closes with Escape when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Dialog defaultOpen>
          <Dialog.Content closeOnBackdropClick={false}>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when a pointer press starts inside the content and ends on the backdrop', () => {
      renderDialog({ defaultOpen: true })
      const body = screen.getByText('Body text')
      fireEvent.pointerDown(body)
      fireEvent.pointerUp(getBackdrop())
      fireEvent.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('names the dialog from Dialog.Title and describes it from Dialog.Description', () => {
      renderDialog({ defaultOpen: true })
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAccessibleName('Delete project?')
      expect(dialog).toHaveAccessibleDescription('This action cannot be undone.')
    })

    it('omits the description reference when no Dialog.Description is rendered', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby')
    })

    it('labels the close button and leaves its symbol hidden from assistive technology', () => {
      renderDialog({ defaultOpen: true })
      const closeButton = screen.getByRole('button', { name: 'Close dialog' })
      expect(closeButton.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Dialog.Content props', () => {
    it.each([
      ['small', 'frontier-dialog--small'],
      ['medium', 'frontier-dialog--medium'],
      ['large', 'frontier-dialog--large'],
    ] as const)('applies the %s size class', (size, className) => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content size={size}>
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.getByRole('dialog')).toHaveClass('frontier-dialog', className)
    })

    it('defaults to the medium size', () => {
      renderDialog({ defaultOpen: true })
      expect(screen.getByRole('dialog')).toHaveClass('frontier-dialog--medium')
    })

    it('merges className and forwards HTML attributes to the popup element', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content
            className="custom-dialog"
            id="delete-dialog"
            data-testid="delete-dialog"
            aria-label="Delete confirmation"
          >
            <Dialog.Title>Notice</Dialog.Title>
          </Dialog.Content>
        </Dialog>,
      )
      const dialog = screen.getByTestId('delete-dialog')
      expect(dialog).toHaveClass('frontier-dialog', 'custom-dialog')
      expect(dialog).toHaveAttribute('id', 'delete-dialog')
      expect(dialog).toHaveAttribute('aria-label', 'Delete confirmation')
      expect(dialog).toHaveAccessibleName('Notice')
    })
  })

  describe('layout parts', () => {
    it('forwards className and HTML attributes from Header, Title, Description, and Footer', () => {
      render(
        <Dialog defaultOpen>
          <Dialog.Content>
            <Dialog.Header className="header" data-testid="header">
              <Dialog.Title className="title" data-testid="title">
                Notice
              </Dialog.Title>
              <Dialog.Description className="description" data-testid="description">
                Details
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer className="footer" data-testid="footer">
              <Dialog.Close>Done</Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>,
      )
      expect(screen.getByTestId('header')).toHaveClass('frontier-dialog__header', 'header')
      expect(screen.getByTestId('title').tagName).toBe('H2')
      expect(screen.getByTestId('title')).toHaveClass('frontier-dialog__title', 'title')
      expect(screen.getByTestId('description').tagName).toBe('P')
      expect(screen.getByTestId('description')).toHaveClass(
        'frontier-dialog__description',
        'description',
      )
      expect(screen.getByTestId('footer')).toHaveClass('frontier-dialog__footer', 'footer')
    })
  })

  describe('compound component context', () => {
    it.each([
      ['Dialog.Trigger', () => <Dialog.Trigger>Open</Dialog.Trigger>],
      [
        'Dialog.Content',
        () => (
          <Dialog.Content>
            <p>Body</p>
          </Dialog.Content>
        ),
      ],
      ['Dialog.Title', () => <Dialog.Title>Title</Dialog.Title>],
      ['Dialog.Description', () => <Dialog.Description>Description</Dialog.Description>],
      ['Dialog.Close', () => <Dialog.Close>Close</Dialog.Close>],
    ])('throws when %s is used outside Dialog', (name, renderPart) => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      expect(() => render(renderPart())).toThrow(`${name} must be used within Dialog.`)

      consoleError.mockRestore()
    })
  })
})
