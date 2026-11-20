import { Toast as BaseToast } from '@base-ui/react/toast'
import type { ToastManager } from '@base-ui/react/toast'
import type { ReactElement } from 'react'

import { makeToastApi } from './helpers/controller.js'
import { ToastList } from './parts/list.js'
import { toastControllerBrand } from './types.js'
import type { TToastController, TToastData, TToastProviderProps } from './types.js'

import './toast.css'

export type {
  TToastAction,
  TToastApi,
  TToastController,
  TToastInput,
  TToastOptions,
  TToastPosition,
  TToastPromiseMessage,
  TToastPromiseMessages,
  TToastProviderProps,
  TToastVariant,
} from './types.js'

const managers = new WeakMap<TToastController, ToastManager<TToastData>>()

export function createToastController(): TToastController {
  const manager = BaseToast.createToastManager<TToastData>()
  const controller = {
    toast: makeToastApi(manager),
    [toastControllerBrand]: true as const,
  }
  managers.set(controller, manager)
  return controller
}

const defaultController = createToastController()
export const toast = defaultController.toast

export function ToastProvider({
  children,
  position = 'bottom-right',
  defaultDuration = 5000,
  maxToasts = 5,
  controller = defaultController,
}: TToastProviderProps): ReactElement {
  const manager = managers.get(controller)
  if (!manager) {
    throw new Error('ToastProvider controller must be created with createToastController().')
  }

  return (
    <BaseToast.Provider toastManager={manager} timeout={defaultDuration} limit={maxToasts}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport
          className={`frontier-toast__viewport frontier-toast__viewport--${position}`}
          aria-label={`Notifications ${position.replace(/-/g, ' ')}`}
        >
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}
