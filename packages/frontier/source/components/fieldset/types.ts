import type { ComponentProps } from 'react'

export type TFieldsetRootProps = Omit<ComponentProps<'fieldset'>, 'className'> & {
  className?: string | undefined
}

export type TFieldsetLegendProps = ComponentProps<'legend'>
