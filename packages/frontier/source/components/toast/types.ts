import type { ReactNode } from 'react'

export type TToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
export type TToastPosition =
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface TToastAction {
  label: string
  onClick: () => void
}

export interface TToastOptions {
  title?: ReactNode | undefined
  description?: ReactNode | undefined
  variant?: TToastVariant | undefined
  duration?: number | undefined
  icon?: ReactNode | null | undefined
  action?: TToastAction | undefined
  id?: string | undefined
  className?: string | undefined
}

export type TToastInput = string | TToastOptions

export type TToastPromiseMessage<TValue> =
  string | TToastOptions | ((value: TValue) => string | TToastOptions)

export interface TToastPromiseMessages<TValue> {
  loading: string | TToastOptions
  success: TToastPromiseMessage<TValue>
  error: string | TToastOptions | ((error: unknown) => string | TToastOptions)
}

export interface TToastApi {
  (message: TToastInput): string
  success(message: TToastInput): string
  error(message: TToastInput): string
  warning(message: TToastInput): string
  info(message: TToastInput): string
  loading(message: TToastInput): string
  custom(
    render: (id: string) => ReactNode,
    options?: Omit<TToastOptions, 'title' | 'description'>,
  ): string
  promise<TValue>(
    promise: Promise<TValue>,
    messages: TToastPromiseMessages<TValue>,
  ): Promise<TValue>
  update(id: string, options: Partial<TToastOptions>): void
  dismiss(id?: string): void
}

export const toastControllerBrand: unique symbol = Symbol('toastControllerBrand')

export interface TToastController {
  readonly toast: TToastApi
  readonly [toastControllerBrand]: true
}

export interface TToastProviderProps {
  children?: ReactNode | undefined
  position?: TToastPosition | undefined
  defaultDuration?: number | undefined
  maxToasts?: number | undefined
  controller?: TToastController | undefined
}

export interface TToastData {
  variant: TToastVariant
  icon?: ReactNode | null | undefined
  action?: TToastAction | undefined
  className?: string | undefined
  render?: ((id: string) => ReactNode) | undefined
}
