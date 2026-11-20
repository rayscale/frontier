import { Toast as BaseToast } from '@base-ui/react/toast'
import type { ReactElement } from 'react'

import { Bell, Check, CircleX, Info, TriangleAlert, X } from '../../../symbols/index.js'
import type { TToastData } from '../types.js'

function VariantSymbol(props: { variant: string }): ReactElement {
  switch (props.variant) {
    case 'success':
      return <Check aria-hidden="true" />
    case 'error':
      return <CircleX aria-hidden="true" />
    case 'warning':
      return <TriangleAlert aria-hidden="true" />
    case 'info':
      return <Info aria-hidden="true" />
    default:
      return <Bell aria-hidden="true" />
  }
}

export function ToastList(): ReactElement[] {
  const { toasts } = BaseToast.useToastManager<TToastData>()

  return toasts.map((notification) => {
    const data = notification.data
    const variant = data?.variant ?? 'default'
    const symbol =
      data?.symbol === null ? null : (data?.symbol ?? <VariantSymbol variant={variant} />)
    const className = ['frontier-toast', `frontier-toast--${variant}`, data?.className]
      .filter(Boolean)
      .join(' ')

    return (
      <BaseToast.Root key={notification.id} toast={notification} className={className}>
        <BaseToast.Content className="frontier-toast__content">
          {data?.render ? (
            <div className="frontier-toast__custom">
              {data.render(notification.id)}
              <BaseToast.Close className="frontier-toast__close" aria-label="Dismiss notification">
                <X aria-hidden="true" />
              </BaseToast.Close>
            </div>
          ) : (
            <>
              {symbol && (
                <span className="frontier-toast__symbol" aria-hidden="true">
                  {symbol}
                </span>
              )}
              <div className="frontier-toast__body">
                {notification.title && (
                  <BaseToast.Title className="frontier-toast__title">
                    {notification.title}
                  </BaseToast.Title>
                )}
                {notification.description && (
                  <BaseToast.Description className="frontier-toast__description">
                    {notification.description}
                  </BaseToast.Description>
                )}
                {data?.action && (
                  <BaseToast.Action className="frontier-toast__action">
                    {data.action.label}
                  </BaseToast.Action>
                )}
              </div>
              <BaseToast.Close className="frontier-toast__close" aria-label="Dismiss notification">
                <X aria-hidden="true" />
              </BaseToast.Close>
            </>
          )}
        </BaseToast.Content>
      </BaseToast.Root>
    )
  })
}
