import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card'
import { type ReactElement, useContext } from 'react'

import { hoverCardContext } from '../context.js'
import type { THoverCardProps, THoverCardTriggerProps } from '../types.js'

export function HoverCardRoot({
  children,
  closeDelay = 200,
  defaultOpen = false,
  onOpenChange,
  open,
  openDelay = 400,
}: THoverCardProps): ReactElement {
  return (
    <hoverCardContext.Provider value={{ closeDelay, openDelay }}>
      <BasePreviewCard.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={(nextOpen) => {
          onOpenChange?.(nextOpen)
        }}
      >
        {children}
      </BasePreviewCard.Root>
    </hoverCardContext.Provider>
  )
}

export function HoverCardTrigger({ children }: THoverCardTriggerProps): ReactElement {
  const { closeDelay, openDelay } = useContext(hoverCardContext)

  return <BasePreviewCard.Trigger delay={openDelay} closeDelay={closeDelay} render={children} />
}
