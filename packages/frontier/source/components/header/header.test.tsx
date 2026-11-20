import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, type ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { NavigationMenu } from '../navigation-menu/index.js'

import { Header, Header as PublicHeader } from './index.js'

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y
    fireEvent.scroll(window)
  })
}

function renderDynamic(children: ReactNode = <button>Action</button>) {
  return render(
    <Header mode="dynamic" data-testid="header">
      {children}
    </Header>,
  )
}

describe('Header', () => {
  afterEach(() => {
    window.scrollY = 0
  })

  it('renders a header element in normal mode by default', () => {
    render(<Header data-testid="header">Content</Header>)

    const header = screen.getByTestId('header')
    expect(header.tagName).toBe('HEADER')
    expect(header).toHaveClass('frontier-header', 'frontier-header--normal')
    expect(header).toHaveAttribute('data-mode', 'normal')
    expect(header).not.toHaveAttribute('data-state')
  })

  it('renders the fixed mode class without a dynamic state', () => {
    render(
      <Header mode="fixed" data-testid="header">
        Content
      </Header>,
    )

    const header = screen.getByTestId('header')
    expect(header).toHaveClass('frontier-header--fixed')
    expect(header).toHaveAttribute('data-mode', 'fixed')
    expect(header).not.toHaveAttribute('data-state')
  })

  it('exposes a banner landmark when used at the page level', () => {
    render(<Header>Site navigation</Header>)

    expect(screen.getByRole('banner')).toHaveTextContent('Site navigation')
  })

  it('does not listen to scroll in normal or fixed mode', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')

    const { unmount } = render(<Header>Normal</Header>)
    unmount()
    render(<Header mode="fixed">Fixed</Header>)

    const scrollCalls = addSpy.mock.calls.filter(([type]) => type === 'scroll')
    expect(scrollCalls).toHaveLength(0)
    addSpy.mockRestore()
  })

  it('starts attached and moves to floating after scrolling past the threshold', () => {
    renderDynamic()
    const header = screen.getByTestId('header')
    expect(header).toHaveAttribute('data-state', 'attached')

    scrollTo(120)
    expect(header).toHaveAttribute('data-state', 'floating')
    expect(header).toHaveClass('frontier-header--floating')
  })

  it('hides after a sufficient downward scroll and reveals on upward scroll', () => {
    renderDynamic()
    const header = screen.getByTestId('header')

    scrollTo(120)
    scrollTo(200)
    expect(header).toHaveAttribute('data-state', 'hidden')
    expect(header).toHaveAttribute('inert')

    scrollTo(180)
    expect(header).toHaveAttribute('data-state', 'floating')
    expect(header).not.toHaveAttribute('inert')
  })

  it('stays floating until the downward scroll exceeds the hide distance', () => {
    renderDynamic()
    const header = screen.getByTestId('header')

    scrollTo(120)
    scrollTo(180)
    expect(header).toHaveAttribute('data-state', 'floating')

    scrollTo(200)
    expect(header).toHaveAttribute('data-state', 'hidden')
  })

  it('returns to attached at the top of the page', () => {
    renderDynamic()
    const header = screen.getByTestId('header')

    scrollTo(300)
    scrollTo(0)
    expect(header).toHaveAttribute('data-state', 'attached')
  })

  it('ignores small jitter below the hide distance', () => {
    renderDynamic()
    const header = screen.getByTestId('header')

    scrollTo(120)
    scrollTo(130)
    scrollTo(122)
    scrollTo(131)
    expect(header).toHaveAttribute('data-state', 'floating')
  })

  it('resets accumulated distance when the direction reverses', () => {
    renderDynamic()
    const header = screen.getByTestId('header')

    scrollTo(120)
    scrollTo(140)
    scrollTo(110)
    scrollTo(130)
    scrollTo(150)
    expect(header).toHaveAttribute('data-state', 'floating')
  })

  it('keeps children mounted across state changes', () => {
    renderDynamic(<button type="button">Action</button>)
    const before = screen.getByRole('button', { name: 'Action' })

    scrollTo(120)
    scrollTo(240)
    scrollTo(160)

    expect(screen.getByRole('button', { name: 'Action' })).toBe(before)
  })

  it('does not hide while focus is inside the header', () => {
    renderDynamic(<button type="button">Action</button>)
    const header = screen.getByTestId('header')
    const button = screen.getByRole('button', { name: 'Action' })

    scrollTo(120)
    act(() => {
      button.focus()
    })
    scrollTo(240)

    expect(header).toHaveAttribute('data-state', 'floating')
  })

  it('removes the scroll listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderDynamic()

    unmount()

    expect(removeSpy.mock.calls.some(([type]) => type === 'scroll')).toBe(true)
    removeSpy.mockRestore()
  })

  it('resets to attached and stops tracking when leaving dynamic mode', () => {
    const { rerender } = renderDynamic()
    scrollTo(120)
    scrollTo(240)

    rerender(
      <Header mode="normal" data-testid="header">
        <button type="button">Action</button>
      </Header>,
    )

    const header = screen.getByTestId('header')
    expect(header).not.toHaveAttribute('data-state')
    expect(header).not.toHaveAttribute('inert')

    scrollTo(400)
    expect(header).not.toHaveAttribute('data-state')
  })

  it('forwards refs and native attributes to the root element', () => {
    const ref = createRef<HTMLElement>()
    render(
      <Header ref={ref} mode="dynamic" id="site-header" aria-label="Site" className="custom">
        Content
      </Header>,
    )

    expect(ref.current).toBe(screen.getByRole('banner'))
    expect(ref.current).toHaveAttribute('id', 'site-header')
    expect(ref.current).toHaveAttribute('aria-label', 'Site')
    expect(ref.current).toHaveClass('custom', 'frontier-header')
  })

  it('is exported from the package entry point', () => {
    expect(PublicHeader).toBe(Header)
  })
})

describe('Header.NavigationMenu', () => {
  function Links({ onNavigate }: { onNavigate?: () => void }) {
    return (
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="#docs"
            onClick={(event) => {
              event.preventDefault()
              onNavigate?.()
            }}
          >
            Docs
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="components">
          <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link href="#button">Button</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    )
  }

  function renderHeader(
    props: { compact?: boolean; mode?: 'normal' | 'fixed' | 'dynamic'; toggleLabel?: string } = {},
  ) {
    const { mode = 'normal', ...menuProps } = props

    return render(
      <Header mode={mode} data-testid="header">
        <strong>Acme</strong>
        <Header.NavigationMenu label="Main" {...menuProps}>
          <Links />
        </Header.NavigationMenu>
      </Header>,
    )
  }

  afterEach(() => {
    window.scrollY = 0
    vi.unstubAllGlobals()
  })

  it('exposes the navigation menu part on the public entry point', () => {
    expect(PublicHeader.NavigationMenu).toBe(Header.NavigationMenu)
  })

  it('renders the inline navigation without a toggle when it is not compact', () => {
    renderHeader({ compact: false })

    expect(screen.getByRole('navigation', { name: 'Main' })).not.toHaveClass(
      'frontier-navigation-menu--stacked',
    )
    expect(screen.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Docs' })).toBeInTheDocument()
  })

  it('renders a collapsed toggle that controls an inert panel when it is compact', () => {
    renderHeader({ compact: true })

    const toggle = screen.getByRole('button', { name: 'Menu' })
    const panel = document.getElementById(toggle.getAttribute('aria-controls') ?? '')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(panel).toHaveAttribute('inert')
    expect(screen.getByTestId('header')).not.toHaveAttribute('data-expanded')
  })

  it('keeps the toggle inside the labelled navigation landmark', () => {
    renderHeader({ compact: true })

    const navigation = screen.getByRole('navigation', { name: 'Main' })

    expect(navigation).toContainElement(screen.getByRole('button', { name: 'Menu' }))
  })

  it('opens the panel and marks the header as expanded', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true })

    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)

    const panel = document.getElementById(toggle.getAttribute('aria-controls') ?? '')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(panel).not.toHaveAttribute('inert')
    expect(screen.getByTestId('header')).toHaveAttribute('data-expanded')
    expect(screen.getByTestId('header')).toHaveClass('frontier-header--expanded')
  })

  it('uses a custom toggle label', () => {
    renderHeader({ compact: true, toggleLabel: 'Navigation' })

    expect(screen.getByRole('button', { name: 'Navigation' })).toBeInTheDocument()
  })

  it('closes on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true })

    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    screen.getByRole('link', { name: 'Docs' }).focus()
    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes when the page outside the header is pressed', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true })

    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    await user.click(document.body)

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('stays open when something inside the header is pressed', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true })

    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    await user.click(screen.getByText('Acme'))

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes after a link is activated', async () => {
    const user = userEvent.setup()
    const onNavigate = vi.fn()
    render(
      <Header>
        <Header.NavigationMenu label="Main" compact>
          <Links onNavigate={onNavigate} />
        </Header.NavigationMenu>
      </Header>,
    )

    const toggle = screen.getByRole('button', { name: 'Menu' })
    await user.click(toggle)
    await user.click(screen.getByRole('link', { name: 'Docs' }))

    expect(onNavigate).toHaveBeenCalledTimes(1)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens a disclosure row inside the panel', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true })

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const row = screen.getByRole('button', { name: 'Components' })
    await user.click(row)

    expect(row).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses and clears the expanded state when it stops being compact', async () => {
    const user = userEvent.setup()
    const { rerender } = renderHeader({ compact: true })

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByTestId('header')).toHaveAttribute('data-expanded')

    rerender(
      <Header data-testid="header">
        <Header.NavigationMenu label="Main" compact={false}>
          <Links />
        </Header.NavigationMenu>
      </Header>,
    )

    expect(screen.getByTestId('header')).not.toHaveAttribute('data-expanded')
  })

  it('follows the viewport when compact is omitted', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    renderHeader()

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
  })

  it('keeps a dynamic header visible while the panel is open', async () => {
    const user = userEvent.setup()
    renderHeader({ compact: true, mode: 'dynamic' })

    scrollTo(200)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    ;(document.activeElement as HTMLElement | null)?.blur()
    scrollTo(500)

    expect(screen.getByTestId('header')).toHaveAttribute('data-state', 'floating')

    await user.click(screen.getByRole('button', { name: 'Menu' }))
    ;(document.activeElement as HTMLElement | null)?.blur()
    scrollTo(800)

    expect(screen.getByTestId('header')).toHaveAttribute('data-state', 'hidden')
  })
})
