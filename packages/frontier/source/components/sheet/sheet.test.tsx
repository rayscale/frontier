import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type MouseEvent, type SyntheticEvent, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { assertDefined } from '../../internal/helpers/assert-defined.js'
import { Button } from '../button/button.js'

import { Sheet, type TSheetProps, type TSheetSide } from './index.js'

afterEach(() => {
  cleanup()
})

function renderSheet(props: Partial<TSheetProps> = {}) {
  return render(
    <Sheet {...props}>
      <Sheet.Trigger>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Project settings</Sheet.Title>
          <Sheet.Description>Changes apply to this project.</Sheet.Description>
        </Sheet.Header>
        <p>Body text</p>
        <Sheet.Footer>
          <Sheet.Close>Cancel</Sheet.Close>
          <Button variant="primary">Save</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet>,
  )
}

function ControlledSheet({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        setOpen(nextOpen)
      }}
    >
      <Sheet.Trigger>
        <Button>Open sheet</Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Title>Controlled</Sheet.Title>
        <Sheet.Close>Close</Sheet.Close>
      </Sheet.Content>
    </Sheet>
  )
}

function getBackdrop(): HTMLElement {
  const backdrop = document.querySelector<HTMLElement>('.frontier-sheet__backdrop')

  if (!backdrop) {
    throw new Error('Expected the sheet backdrop to be rendered.')
  }

  return backdrop
}

describe('Sheet', () => {
  it('forwards its ref to the sheet surface element', async () => {
    const user = userEvent.setup()
    const contentRef = createRef<HTMLDivElement>()
    render(
      <Sheet>
        <Sheet.Trigger>
          <Button>Open sheet</Button>
        </Sheet.Trigger>
        <Sheet.Content ref={contentRef}>
          <Sheet.Title>Ref check</Sheet.Title>
        </Sheet.Content>
      </Sheet>,
    )
    await user.click(screen.getByRole('button', { name: 'Open sheet' }))
    expect(await screen.findByRole('dialog')).toBe(contentRef.current)
  })

  describe('state', () => {
    it('is closed by default and opens from the trigger', async () => {
      const user = userEvent.setup()
      renderSheet()
      await user.click(screen.getByRole('button', { name: 'Open sheet' }))
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
    })

    it('opens and closes in uncontrolled mode', async () => {
      const user = userEvent.setup()
      renderSheet()
      await user.click(screen.getByRole('button', { name: 'Open sheet' }))
      await screen.findByRole('dialog')
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('renders open on mount when defaultOpen is set', () => {
      renderSheet({ defaultOpen: true })
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls onOpenChange with the requested state in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderSheet({ onOpenChange })
      await user.click(screen.getByRole('button', { name: 'Open sheet' }))
      await screen.findByRole('dialog')
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenLastCalledWith(false)
      })
      expect(onOpenChange).toHaveBeenNthCalledWith(1, true)
    })

    it('keeps the sheet closed when a controlled parent ignores onOpenChange', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(
        <Sheet open={false} onOpenChange={onOpenChange}>
          <Sheet.Trigger>
            <Button>Open sheet</Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Ignored</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(screen.getByRole('button', { name: 'Open sheet' }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('follows the open prop when a controlled parent updates it', () => {
      const { rerender } = render(
        <Sheet open={false}>
          <Sheet.Content>
            <Sheet.Title>Controlled</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      rerender(
        <Sheet open>
          <Sheet.Content>
            <Sheet.Title>Controlled</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('works with controlled state managed by a parent component', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<ControlledSheet onOpenChange={onOpenChange} />)
      await user.click(screen.getByRole('button', { name: 'Open sheet' }))
      await screen.findByRole('dialog')
      await user.click(screen.getByRole('button', { name: 'Close' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenNthCalledWith(1, true)
      expect(onOpenChange).toHaveBeenNthCalledWith(2, false)
    })
  })

  describe('keyboard', () => {
    it('closes on Escape and reports the close once', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderSheet({ defaultOpen: true, onOpenChange })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('keeps a controlled sheet open on Escape when the parent ignores the request', async () => {
      const user = userEvent.setup()
      render(
        <Sheet open onOpenChange={vi.fn()}>
          <Sheet.Content>
            <Sheet.Title>Locked</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      await user.keyboard('{Escape}')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('moves focus into the sheet when it opens and restores it on close', async () => {
      const user = userEvent.setup()
      renderSheet()
      const trigger = screen.getByRole('button', { name: 'Open sheet' })
      await user.click(trigger)
      await screen.findByRole('dialog')
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)
      })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(trigger).toHaveFocus()
      })
    })

    it('traps Tab focus inside the open sheet', async () => {
      const user = userEvent.setup()
      renderSheet({ defaultOpen: true })
      const sheet = screen.getByRole('dialog')
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const focusedElements: (Element | null)[] = []
      const isFocusInsideSheetOrGuard = (element: Element | null) =>
        element instanceof HTMLElement &&
        (element.hasAttribute('data-base-ui-focus-guard') || sheet.contains(element))
      for (let index = 0; index < 6; index += 1) {
        await user.tab()
        await waitFor(() => {
          expect(isFocusInsideSheetOrGuard(document.activeElement)).toBe(true)
        })
        focusedElements.push(document.activeElement)
      }

      expect(focusedElements).toContain(cancelButton)
      expect(focusedElements).toContain(saveButton)
      for (const focusedElement of focusedElements) {
        expect(isFocusInsideSheetOrGuard(focusedElement)).toBe(true)
      }
    })
  })

  describe('Sheet.Trigger', () => {
    it('wraps non-element children in a Button and exposes dialog ARIA state', async () => {
      const user = userEvent.setup()
      render(
        <Sheet>
          <Sheet.Trigger>Open text</Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Wrapped</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      const trigger = screen.getByRole('button', { name: 'Open text' })
      await user.click(trigger)
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
    })

    it('preserves the child element attributes and onClick handler', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Sheet>
          <Sheet.Trigger>
            <button type="button" className="custom-trigger" onClick={onClick}>
              Custom
            </button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Custom</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      const trigger = screen.getByRole('button', { name: 'Custom' })
      await user.click(trigger)
      expect(onClick).toHaveBeenCalledTimes(1)
      expect(trigger).toHaveClass('custom-trigger')
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
    })

    it('does not open when the child onClick calls preventDefault', async () => {
      const user = userEvent.setup()
      render(
        <Sheet>
          <Sheet.Trigger>
            <button
              type="button"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              }}
            >
              Blocked
            </button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Blocked</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(screen.getByRole('button', { name: 'Blocked' }))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Sheet.Close', () => {
    it('renders as type="button" so it never submits a surrounding form', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn((event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
      })
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Form</Sheet.Title>
            <form onSubmit={onSubmit}>
              <Sheet.Close>Dismiss</Sheet.Close>
            </form>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(screen.getByRole('button', { name: 'Dismiss' }))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('renders custom children and uses the outline variant by default', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Variant</Sheet.Title>
            <Sheet.Close>Dismiss</Sheet.Close>
          </Sheet.Content>
        </Sheet>,
      )
      const closeButton = screen.getByRole('button', { name: 'Dismiss' })
      expect(closeButton).toHaveClass('frontier-button--outline')
    })

    it('does not close when its onClick calls preventDefault', async () => {
      const user = userEvent.setup()
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Guarded</Sheet.Title>
            <Sheet.Close
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.preventDefault()
              }}
            >
              Stay
            </Sheet.Close>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(screen.getByRole('button', { name: 'Stay' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls the consumer onClick and then closes', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Clicks</Sheet.Title>
            <Sheet.Close onClick={onClick}>Done</Sheet.Close>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(screen.getByRole('button', { name: 'Done' }))
      expect(onClick).toHaveBeenCalledTimes(1)
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Sheet.Content close button', () => {
    it('renders an accessible close button by default that closes the sheet', async () => {
      const user = userEvent.setup()
      renderSheet({ defaultOpen: true })
      await user.click(screen.getByRole('button', { name: 'Close sheet' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('hides the close button when showCloseButton is false', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content showCloseButton={false}>
            <Sheet.Title>No close</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.queryByRole('button', { name: 'Close sheet' })).not.toBeInTheDocument()
    })
  })

  describe('backdrop dismissal', () => {
    it('closes when the backdrop is clicked', async () => {
      const user = userEvent.setup()
      renderSheet({ defaultOpen: true })
      await user.click(getBackdrop())
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when clicking inside the sheet', async () => {
      const user = userEvent.setup()
      renderSheet({ defaultOpen: true })
      await user.click(screen.getByText('Body text'))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Sheet defaultOpen>
          <Sheet.Content closeOnBackdropClick={false}>
            <Sheet.Title>Notice</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      await user.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('still closes with Escape when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Sheet defaultOpen>
          <Sheet.Content closeOnBackdropClick={false}>
            <Sheet.Title>Notice</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when a pointer press starts inside the sheet and ends on the backdrop', () => {
      renderSheet({ defaultOpen: true })
      const body = screen.getByText('Body text')
      fireEvent.pointerDown(body)
      fireEvent.pointerUp(getBackdrop())
      fireEvent.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('placement', () => {
    it.each<[TSheetSide]>([['right'], ['left'], ['top'], ['bottom']])(
      'applies the %s placement class to the sheet surface',
      (side) => {
        render(
          <Sheet defaultOpen side={side}>
            <Sheet.Content>
              <Sheet.Title>Placed</Sheet.Title>
            </Sheet.Content>
          </Sheet>,
        )
        expect(screen.getByRole('dialog')).toHaveClass('frontier-sheet', `frontier-sheet--${side}`)
      },
    )

    it('defaults to the right placement', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Default</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByRole('dialog')).toHaveClass('frontier-sheet--right')
    })
  })

  describe('Sheet.Content props', () => {
    it('defaults to the medium size', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Size</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByRole('dialog')).toHaveClass('frontier-sheet--medium')
    })

    it.each(['small', 'medium', 'large'] as const)('applies the %s size class', (size) => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content size={size}>
            <Sheet.Title>Size</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByRole('dialog')).toHaveClass(`frontier-sheet--${size}`)
    })

    it('merges className and forwards style and HTML attributes to the surface', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content className="custom-sheet" style={{ zIndex: 7 }} data-testid="sheet-surface">
            <Sheet.Title>Attributes</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      const surface = screen.getByRole('dialog')
      expect(surface).toHaveClass('frontier-sheet', 'custom-sheet')
      expect(surface).toHaveStyle({ zIndex: '7' })
      expect(surface).toHaveAttribute('data-testid', 'sheet-surface')
    })
  })

  describe('accessibility', () => {
    it('names the sheet from Sheet.Title and describes it from Sheet.Description', () => {
      renderSheet({ defaultOpen: true })
      const sheet = screen.getByRole('dialog', { name: 'Project settings' })
      expect(sheet).toHaveAccessibleDescription('Changes apply to this project.')
    })

    it('omits the description reference when no Sheet.Description is rendered', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Title>Only title</Sheet.Title>
          </Sheet.Content>
        </Sheet>,
      )
      const sheet = screen.getByRole('dialog', { name: 'Only title' })
      expect(sheet).not.toHaveAttribute('aria-describedby')
    })

    it('labels the close button and leaves its icon hidden from assistive technology', () => {
      renderSheet({ defaultOpen: true })
      const closeButton = screen.getByRole('button', { name: 'Close sheet' })
      expect(closeButton.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('layout parts', () => {
    it('forwards className and HTML attributes from Header, Title, Description, and Footer', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Header className="custom-header" data-testid="header">
              <Sheet.Title className="custom-title">TLayout</Sheet.Title>
              <Sheet.Description className="custom-description">Details</Sheet.Description>
            </Sheet.Header>
            <Sheet.Footer className="custom-footer" data-testid="footer">
              <Sheet.Close>Done</Sheet.Close>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByTestId('header')).toHaveClass('custom-header')
      expect(screen.getByRole('heading', { name: 'TLayout' })).toHaveClass('custom-title')
      expect(screen.getByText('Details')).toHaveClass('custom-description')
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer')
    })
  })

  describe('layout parts', () => {
    it('forwards className and HTML attributes from Header, Title, Description, and Footer', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Header className="custom-header" data-testid="header">
              <Sheet.Title className="custom-title">TLayout</Sheet.Title>
              <Sheet.Description className="custom-description">Details</Sheet.Description>
            </Sheet.Header>
            <Sheet.Footer className="custom-footer" data-testid="footer">
              <Sheet.Close>Done</Sheet.Close>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByTestId('header')).toHaveClass('custom-header')
      expect(screen.getByRole('heading', { name: 'TLayout' })).toHaveClass('custom-title')
      expect(screen.getByText('Details')).toHaveClass('custom-description')
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer')
    })

    it('keeps the header and footer outside the scrolling body', () => {
      renderSheet({ defaultOpen: true })
      expect(screen.getByText('Body text').closest('.frontier-sheet__body')).not.toBeNull()
      expect(
        screen.getByRole('heading', { name: 'Project settings' }).closest('.frontier-sheet__body'),
      ).toBeNull()
      expect(screen.getByText('Save').closest('.frontier-sheet__body')).toBeNull()
    })

    it('keeps the header and footer pinned when they are placed among body content', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <Sheet.Footer>
              <Sheet.Close>Done</Sheet.Close>
            </Sheet.Footer>
            <p>Body text</p>
            <Sheet.Header>
              <Sheet.Title>Late header</Sheet.Title>
            </Sheet.Header>
          </Sheet.Content>
        </Sheet>,
      )
      expect(screen.getByText('Body text').closest('.frontier-sheet__body')).not.toBeNull()
      expect(screen.getByText('Done').closest('.frontier-sheet__body')).toBeNull()
      expect(
        screen.getByRole('heading', { name: 'Late header' }).closest('.frontier-sheet__body'),
      ).toBeNull()
    })

    it('places the close button on the header when a header is present', () => {
      renderSheet({ defaultOpen: true })
      const closeButton = screen.getByRole('button', { name: 'Close sheet' })
      expect(closeButton.parentElement).toHaveClass('frontier-sheet')
      expect(closeButton.closest('.frontier-sheet__toolbar')).toBeNull()
    })

    it('places the close button in a toolbar outside the body when there is no header', () => {
      render(
        <Sheet defaultOpen>
          <Sheet.Content>
            <p>Body text</p>
          </Sheet.Content>
        </Sheet>,
      )
      const closeButton = screen.getByRole('button', { name: 'Close sheet' })
      expect(closeButton.closest('.frontier-sheet__toolbar')).not.toBeNull()
      expect(closeButton.closest('.frontier-sheet__body')).toBeNull()
    })
  })

  describe('nesting', () => {
    function renderNestedSheets() {
      return render(
        <Sheet>
          <Sheet.Trigger>
            <Button>Open parent</Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Parent</Sheet.Title>
            <Sheet>
              <Sheet.Trigger>
                <Button>Open child</Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Title>Child</Sheet.Title>
                <Sheet.Close>Close child</Sheet.Close>
              </Sheet.Content>
            </Sheet>
          </Sheet.Content>
        </Sheet>,
      )
    }

    function renderThreeLevelSheets() {
      return render(
        <Sheet>
          <Sheet.Trigger>
            <Button>Open parent</Button>
          </Sheet.Trigger>
          <Sheet.Content>
            <Sheet.Title>Parent</Sheet.Title>
            <Sheet>
              <Sheet.Trigger>
                <Button>Open child</Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Title>Child</Sheet.Title>
                <Sheet>
                  <Sheet.Trigger>
                    <Button>Open grandchild</Button>
                  </Sheet.Trigger>
                  <Sheet.Content>
                    <Sheet.Title>Grandchild</Sheet.Title>
                  </Sheet.Content>
                </Sheet>
              </Sheet.Content>
            </Sheet>
          </Sheet.Content>
        </Sheet>,
      )
    }

    function ControlledNestedSheets({ parentOpen }: { parentOpen: boolean }) {
      return (
        <Sheet open={parentOpen} onOpenChange={() => undefined}>
          <Sheet.Content>
            <Sheet.Title>Parent</Sheet.Title>
            <Sheet>
              <Sheet.Trigger>
                <Button>Open child</Button>
              </Sheet.Trigger>
              <Sheet.Content>
                <Sheet.Title>Child</Sheet.Title>
              </Sheet.Content>
            </Sheet>
          </Sheet.Content>
        </Sheet>
      )
    }

    it('stacks a child sheet above its parent and moves focus into it', async () => {
      const user = userEvent.setup()
      renderNestedSheets()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      const child = await screen.findByRole('dialog', { name: 'Child' })
      const parent = screen.getByRole('dialog', {
        name: 'Parent',
        hidden: true,
      })
      expect(parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
      await waitFor(() => {
        expect(child.contains(document.activeElement)).toBe(true)
      })
    })

    it('closes only the child on Escape and keeps the parent open', async () => {
      const user = userEvent.setup()
      renderNestedSheets()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Child' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Parent' })).toBeInTheDocument()
    })

    it('closes only the child from its close button and returns focus to its trigger', async () => {
      const user = userEvent.setup()
      renderNestedSheets()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      await user.click(screen.getByRole('button', { name: 'Close child' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Child' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Parent' })).toBeInTheDocument()
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Open child' })).toHaveFocus()
      })
    })

    it('closes only the child on an outside press', async () => {
      const user = userEvent.setup()
      renderNestedSheets()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      const viewports = document.querySelectorAll<HTMLElement>('.frontier-sheet__viewport')
      await user.click(assertDefined(viewports[viewports.length - 1]))
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Child' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Parent' })).toBeInTheDocument()
    })

    it('dismisses three levels of nesting one at a time, topmost first', async () => {
      const user = userEvent.setup()
      renderThreeLevelSheets()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await user.click(screen.getByRole('button', { name: 'Open grandchild' }))
      await screen.findByRole('dialog', { name: 'Grandchild' })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Grandchild' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Child' })).toBeInTheDocument()

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Child' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Parent' })).toBeInTheDocument()

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('removes the child overlay and backdrop when the parent closes', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<ControlledNestedSheets parentOpen />)
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      rerender(<ControlledNestedSheets parentOpen={false} />)
      await waitFor(() => {
        expect(document.querySelector('.frontier-sheet')).toBeNull()
      })
      expect(document.querySelector('.frontier-sheet__backdrop')).toBeNull()
    })
  })

  describe('compound component context', () => {
    it.each([
      ['Sheet.Trigger', () => <Sheet.Trigger>Open</Sheet.Trigger>],
      [
        'Sheet.Content',
        () => (
          <Sheet.Content>
            <p>Body</p>
          </Sheet.Content>
        ),
      ],
      ['Sheet.Title', () => <Sheet.Title>Title</Sheet.Title>],
      ['Sheet.Description', () => <Sheet.Description>Description</Sheet.Description>],
      ['Sheet.Close', () => <Sheet.Close>Close</Sheet.Close>],
    ])('throws when %s is used outside Sheet', (name, renderPart) => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      expect(() => render(renderPart())).toThrow(`${name} must be used within Sheet.`)

      consoleError.mockRestore()
    })
  })
})
