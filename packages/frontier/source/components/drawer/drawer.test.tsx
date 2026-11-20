import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type MouseEvent, type SyntheticEvent, useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { assertDefined } from '../../internal/helpers/assert-defined.js'
import { Button } from '../button/button.js'

import { Drawer, type TDrawerProps, type TDrawerSide } from './index.js'

afterEach(() => {
  cleanup()
})

function renderDrawer(props: Partial<TDrawerProps> = {}) {
  return render(
    <Drawer {...props}>
      <Drawer.Trigger>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Project settings</Drawer.Title>
          <Drawer.Description>Changes apply to this project.</Drawer.Description>
        </Drawer.Header>
        <p>Body text</p>
        <Drawer.Footer>
          <Drawer.Close>Cancel</Drawer.Close>
          <Button variant="primary">Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>,
  )
}

function ControlledDrawer({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <Drawer
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange?.(nextOpen)
        setOpen(nextOpen)
      }}
    >
      <Drawer.Trigger>
        <Button>Open drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Title>Controlled</Drawer.Title>
        <Drawer.Close>Close</Drawer.Close>
      </Drawer.Content>
    </Drawer>
  )
}

function getBackdrop(): HTMLElement {
  const backdrop = document.querySelector<HTMLElement>('.frontier-drawer__backdrop')

  if (!backdrop) {
    throw new Error('Expected the drawer backdrop to be rendered.')
  }

  return backdrop
}

describe('Drawer', () => {
  it('forwards its ref to the drawer surface element', async () => {
    const user = userEvent.setup()
    const contentRef = createRef<HTMLDivElement>()
    render(
      <Drawer>
        <Drawer.Trigger>
          <Button>Open drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content ref={contentRef}>
          <Drawer.Title>Ref check</Drawer.Title>
        </Drawer.Content>
      </Drawer>,
    )
    await user.click(screen.getByRole('button', { name: 'Open drawer' }))
    expect(await screen.findByRole('dialog')).toBe(contentRef.current)
  })

  describe('state', () => {
    it('is closed by default and opens from the trigger', async () => {
      const user = userEvent.setup()
      renderDrawer()
      await user.click(screen.getByRole('button', { name: 'Open drawer' }))
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
    })

    it('opens and closes in uncontrolled mode', async () => {
      const user = userEvent.setup()
      renderDrawer()
      await user.click(screen.getByRole('button', { name: 'Open drawer' }))
      await screen.findByRole('dialog')
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('renders open on mount when defaultOpen is set', () => {
      renderDrawer({ defaultOpen: true })
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls onOpenChange with the requested state in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      renderDrawer({ onOpenChange })
      await user.click(screen.getByRole('button', { name: 'Open drawer' }))
      await screen.findByRole('dialog')
      await user.click(screen.getByRole('button', { name: 'Cancel' }))
      await waitFor(() => {
        expect(onOpenChange).toHaveBeenLastCalledWith(false)
      })
      expect(onOpenChange).toHaveBeenNthCalledWith(1, true)
    })

    it('keeps the drawer closed when a controlled parent ignores onOpenChange', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(
        <Drawer open={false} onOpenChange={onOpenChange}>
          <Drawer.Trigger>
            <Button>Open drawer</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Ignored</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(screen.getByRole('button', { name: 'Open drawer' }))
      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('follows the open prop when a controlled parent updates it', () => {
      const { rerender } = render(
        <Drawer open={false}>
          <Drawer.Content>
            <Drawer.Title>Controlled</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      rerender(
        <Drawer open>
          <Drawer.Content>
            <Drawer.Title>Controlled</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('works with controlled state managed by a parent component', async () => {
      const user = userEvent.setup()
      const onOpenChange = vi.fn()
      render(<ControlledDrawer onOpenChange={onOpenChange} />)
      await user.click(screen.getByRole('button', { name: 'Open drawer' }))
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
      renderDrawer({ defaultOpen: true, onOpenChange })
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
      expect(onOpenChange).toHaveBeenCalledTimes(1)
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('keeps a controlled drawer open on Escape when the parent ignores the request', async () => {
      const user = userEvent.setup()
      render(
        <Drawer open onOpenChange={vi.fn()}>
          <Drawer.Content>
            <Drawer.Title>Locked</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      await user.keyboard('{Escape}')
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('moves focus into the drawer when it opens and restores it on close', async () => {
      const user = userEvent.setup()
      renderDrawer()
      const trigger = screen.getByRole('button', { name: 'Open drawer' })
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

    it('traps Tab focus inside the open drawer', async () => {
      const user = userEvent.setup()
      renderDrawer({ defaultOpen: true })
      const drawer = screen.getByRole('dialog')
      const cancelButton = screen.getByRole('button', { name: 'Cancel' })
      const saveButton = screen.getByRole('button', { name: 'Save' })
      const focusedElements: (Element | null)[] = []
      const isFocusInsideDrawerOrGuard = (element: Element | null) =>
        element instanceof HTMLElement &&
        (element.hasAttribute('data-base-ui-focus-guard') || drawer.contains(element))
      for (let index = 0; index < 6; index += 1) {
        await user.tab()
        await waitFor(() => {
          expect(isFocusInsideDrawerOrGuard(document.activeElement)).toBe(true)
        })
        focusedElements.push(document.activeElement)
      }

      expect(focusedElements).toContain(cancelButton)
      expect(focusedElements).toContain(saveButton)
      for (const focusedElement of focusedElements) {
        expect(isFocusInsideDrawerOrGuard(focusedElement)).toBe(true)
      }
    })
  })

  describe('Drawer.Trigger', () => {
    it('wraps non-element children in a Button and exposes dialog ARIA state', async () => {
      const user = userEvent.setup()
      render(
        <Drawer>
          <Drawer.Trigger>Open text</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Wrapped</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
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
        <Drawer>
          <Drawer.Trigger>
            <button type="button" className="custom-trigger" onClick={onClick}>
              Custom
            </button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Custom</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
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
        <Drawer>
          <Drawer.Trigger>
            <button
              type="button"
              onClick={(event: MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
              }}
            >
              Blocked
            </button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Blocked</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(screen.getByRole('button', { name: 'Blocked' }))
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('Drawer.Close', () => {
    it('renders as type="button" so it never submits a surrounding form', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn((event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
      })
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Form</Drawer.Title>
            <form onSubmit={onSubmit}>
              <Drawer.Close>Dismiss</Drawer.Close>
            </form>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(screen.getByRole('button', { name: 'Dismiss' }))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('renders custom children and uses the outline variant by default', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Variant</Drawer.Title>
            <Drawer.Close>Dismiss</Drawer.Close>
          </Drawer.Content>
        </Drawer>,
      )
      const closeButton = screen.getByRole('button', { name: 'Dismiss' })
      expect(closeButton).toHaveClass('frontier-button--outline')
    })

    it('does not close when its onClick calls preventDefault', async () => {
      const user = userEvent.setup()
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Guarded</Drawer.Title>
            <Drawer.Close
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.preventDefault()
              }}
            >
              Stay
            </Drawer.Close>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(screen.getByRole('button', { name: 'Stay' }))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('calls the consumer onClick and then closes', async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Clicks</Drawer.Title>
            <Drawer.Close onClick={onClick}>Done</Drawer.Close>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(screen.getByRole('button', { name: 'Done' }))
      expect(onClick).toHaveBeenCalledTimes(1)
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Drawer.Content close button', () => {
    it('renders an accessible close button by default that closes the drawer', async () => {
      const user = userEvent.setup()
      renderDrawer({ defaultOpen: true })
      await user.click(screen.getByRole('button', { name: 'Close drawer' }))
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('hides the close button when showCloseButton is false', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content showCloseButton={false}>
            <Drawer.Title>No close</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.queryByRole('button', { name: 'Close drawer' })).not.toBeInTheDocument()
    })
  })

  describe('backdrop dismissal', () => {
    it('closes when the backdrop is clicked', async () => {
      const user = userEvent.setup()
      renderDrawer({ defaultOpen: true })
      await user.click(getBackdrop())
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when clicking inside the drawer', async () => {
      const user = userEvent.setup()
      renderDrawer({ defaultOpen: true })
      await user.click(screen.getByText('Body text'))
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Drawer defaultOpen>
          <Drawer.Content closeOnBackdropClick={false}>
            <Drawer.Title>Notice</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      await user.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('still closes with Escape when closeOnBackdropClick is false', async () => {
      const user = userEvent.setup()
      render(
        <Drawer defaultOpen>
          <Drawer.Content closeOnBackdropClick={false}>
            <Drawer.Title>Notice</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })

    it('does not close when a pointer press starts inside the drawer and ends on the backdrop', () => {
      renderDrawer({ defaultOpen: true })
      const body = screen.getByText('Body text')
      fireEvent.pointerDown(body)
      fireEvent.pointerUp(getBackdrop())
      fireEvent.click(getBackdrop())
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('placement', () => {
    it.each<[TDrawerSide]>([['right'], ['left'], ['top'], ['bottom']])(
      'applies the %s placement class to the drawer surface',
      (side) => {
        render(
          <Drawer defaultOpen side={side}>
            <Drawer.Content>
              <Drawer.Title>Placed</Drawer.Title>
            </Drawer.Content>
          </Drawer>,
        )
        expect(screen.getByRole('dialog')).toHaveClass(
          'frontier-drawer',
          `frontier-drawer--${side}`,
        )
      },
    )

    it('defaults to the right placement', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Default</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByRole('dialog')).toHaveClass('frontier-drawer--right')
    })
  })

  describe('Drawer.Content props', () => {
    it('defaults to the medium size', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Size</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByRole('dialog')).toHaveClass('frontier-drawer--medium')
    })

    it.each(['small', 'medium', 'large'] as const)('applies the %s size class', (size) => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content size={size}>
            <Drawer.Title>Size</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByRole('dialog')).toHaveClass(`frontier-drawer--${size}`)
    })

    it('merges className and forwards style and HTML attributes to the surface', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content
            className="custom-drawer"
            style={{ zIndex: 7 }}
            data-testid="drawer-surface"
          >
            <Drawer.Title>Attributes</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      const surface = screen.getByRole('dialog')
      expect(surface).toHaveClass('frontier-drawer', 'custom-drawer')
      expect(surface).toHaveStyle({ zIndex: '7' })
      expect(surface).toHaveAttribute('data-testid', 'drawer-surface')
    })
  })

  describe('accessibility', () => {
    it('names the drawer from Drawer.Title and describes it from Drawer.Description', () => {
      renderDrawer({ defaultOpen: true })
      const drawer = screen.getByRole('dialog', { name: 'Project settings' })
      expect(drawer).toHaveAccessibleDescription('Changes apply to this project.')
    })

    it('omits the description reference when no Drawer.Description is rendered', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Title>Only title</Drawer.Title>
          </Drawer.Content>
        </Drawer>,
      )
      const drawer = screen.getByRole('dialog', { name: 'Only title' })
      expect(drawer).not.toHaveAttribute('aria-describedby')
    })

    it('labels the close button and leaves its symbol hidden from assistive technology', () => {
      renderDrawer({ defaultOpen: true })
      const closeButton = screen.getByRole('button', { name: 'Close drawer' })
      expect(closeButton.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('layout parts', () => {
    it('forwards className and HTML attributes from Header, Title, Description, and Footer', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Header className="custom-header" data-testid="header">
              <Drawer.Title className="custom-title">TLayout</Drawer.Title>
              <Drawer.Description className="custom-description">Details</Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer className="custom-footer" data-testid="footer">
              <Drawer.Close>Done</Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>,
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
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Header className="custom-header" data-testid="header">
              <Drawer.Title className="custom-title">TLayout</Drawer.Title>
              <Drawer.Description className="custom-description">Details</Drawer.Description>
            </Drawer.Header>
            <Drawer.Footer className="custom-footer" data-testid="footer">
              <Drawer.Close>Done</Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByTestId('header')).toHaveClass('custom-header')
      expect(screen.getByRole('heading', { name: 'TLayout' })).toHaveClass('custom-title')
      expect(screen.getByText('Details')).toHaveClass('custom-description')
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer')
    })

    it('keeps the header and footer outside the scrolling body', () => {
      renderDrawer({ defaultOpen: true })
      expect(screen.getByText('Body text').closest('.frontier-drawer__body')).not.toBeNull()
      expect(
        screen.getByRole('heading', { name: 'Project settings' }).closest('.frontier-drawer__body'),
      ).toBeNull()
      expect(screen.getByText('Save').closest('.frontier-drawer__body')).toBeNull()
    })

    it('keeps the header and footer pinned when they are placed among body content', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <Drawer.Footer>
              <Drawer.Close>Done</Drawer.Close>
            </Drawer.Footer>
            <p>Body text</p>
            <Drawer.Header>
              <Drawer.Title>Late header</Drawer.Title>
            </Drawer.Header>
          </Drawer.Content>
        </Drawer>,
      )
      expect(screen.getByText('Body text').closest('.frontier-drawer__body')).not.toBeNull()
      expect(screen.getByText('Done').closest('.frontier-drawer__body')).toBeNull()
      expect(
        screen.getByRole('heading', { name: 'Late header' }).closest('.frontier-drawer__body'),
      ).toBeNull()
    })

    it('places the close button on the header when a header is present', () => {
      renderDrawer({ defaultOpen: true })
      const closeButton = screen.getByRole('button', { name: 'Close drawer' })
      expect(closeButton.parentElement).toHaveClass('frontier-drawer')
      expect(closeButton.closest('.frontier-drawer__toolbar')).toBeNull()
    })

    it('places the close button in a toolbar outside the body when there is no header', () => {
      render(
        <Drawer defaultOpen>
          <Drawer.Content>
            <p>Body text</p>
          </Drawer.Content>
        </Drawer>,
      )
      const closeButton = screen.getByRole('button', { name: 'Close drawer' })
      expect(closeButton.closest('.frontier-drawer__toolbar')).not.toBeNull()
      expect(closeButton.closest('.frontier-drawer__body')).toBeNull()
    })
  })

  describe('nesting', () => {
    function renderNestedDrawers() {
      return render(
        <Drawer>
          <Drawer.Trigger>
            <Button>Open parent</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Parent</Drawer.Title>
            <Drawer>
              <Drawer.Trigger>
                <Button>Open child</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Title>Child</Drawer.Title>
                <Drawer.Close>Close child</Drawer.Close>
              </Drawer.Content>
            </Drawer>
          </Drawer.Content>
        </Drawer>,
      )
    }

    function renderThreeLevelDrawers() {
      return render(
        <Drawer>
          <Drawer.Trigger>
            <Button>Open parent</Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>Parent</Drawer.Title>
            <Drawer>
              <Drawer.Trigger>
                <Button>Open child</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Title>Child</Drawer.Title>
                <Drawer>
                  <Drawer.Trigger>
                    <Button>Open grandchild</Button>
                  </Drawer.Trigger>
                  <Drawer.Content>
                    <Drawer.Title>Grandchild</Drawer.Title>
                  </Drawer.Content>
                </Drawer>
              </Drawer.Content>
            </Drawer>
          </Drawer.Content>
        </Drawer>,
      )
    }

    function ControlledNestedDrawers({ parentOpen }: { parentOpen: boolean }) {
      return (
        <Drawer open={parentOpen} onOpenChange={() => undefined}>
          <Drawer.Content>
            <Drawer.Title>Parent</Drawer.Title>
            <Drawer>
              <Drawer.Trigger>
                <Button>Open child</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Title>Child</Drawer.Title>
              </Drawer.Content>
            </Drawer>
          </Drawer.Content>
        </Drawer>
      )
    }

    it('stacks a child drawer above its parent and moves focus into it', async () => {
      const user = userEvent.setup()
      renderNestedDrawers()
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
      renderNestedDrawers()
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
      renderNestedDrawers()
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
      renderNestedDrawers()
      await user.click(screen.getByRole('button', { name: 'Open parent' }))
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      const viewports = document.querySelectorAll<HTMLElement>('.frontier-drawer__viewport')
      await user.click(assertDefined(viewports[viewports.length - 1]))
      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: 'Child' })).not.toBeInTheDocument()
      })
      expect(screen.getByRole('dialog', { name: 'Parent' })).toBeInTheDocument()
    })

    it('dismisses three levels of nesting one at a time, topmost first', async () => {
      const user = userEvent.setup()
      renderThreeLevelDrawers()
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
      const { rerender } = render(<ControlledNestedDrawers parentOpen />)
      await user.click(screen.getByRole('button', { name: 'Open child' }))
      await screen.findByRole('dialog', { name: 'Child' })
      rerender(<ControlledNestedDrawers parentOpen={false} />)
      await waitFor(() => {
        expect(document.querySelector('.frontier-drawer')).toBeNull()
      })
      expect(document.querySelector('.frontier-drawer__backdrop')).toBeNull()
    })
  })

  describe('compound component context', () => {
    it.each([
      ['Drawer.Trigger', () => <Drawer.Trigger>Open</Drawer.Trigger>],
      [
        'Drawer.Content',
        () => (
          <Drawer.Content>
            <p>Body</p>
          </Drawer.Content>
        ),
      ],
      ['Drawer.Title', () => <Drawer.Title>Title</Drawer.Title>],
      ['Drawer.Description', () => <Drawer.Description>Description</Drawer.Description>],
      ['Drawer.Close', () => <Drawer.Close>Close</Drawer.Close>],
    ])('throws when %s is used outside Drawer', (name, renderPart) => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      expect(() => render(renderPart())).toThrow(`${name} must be used within Drawer.`)

      consoleError.mockRestore()
    })
  })
})
