import { createContext, useContext } from 'react'

import type { TStepperOrientation, TStepperStatus } from './types.js'

export interface TStepperContextValue {
  readonly completedLabel: string
  readonly current: number
  readonly interactive: boolean
  readonly orientation: TStepperOrientation
  readonly select: (value: number) => void
}

export interface TStepperItemContextValue {
  readonly status: TStepperStatus
  readonly value: number
}

export const stepperContext = createContext<TStepperContextValue | null>(null)

export const stepperItemContext = createContext<TStepperItemContextValue | null>(null)

export function useStepperContext(): TStepperContextValue {
  const context = useContext(stepperContext)

  if (!context) {
    throw new Error('Stepper parts must be rendered inside Stepper.Root.')
  }

  return context
}

export function useStepperItem(): TStepperItemContextValue {
  const context = useContext(stepperItemContext)

  if (!context) {
    throw new Error(
      'Stepper.Indicator, Stepper.Title, and Stepper.Description must be rendered inside Stepper.Item.',
    )
  }

  return context
}
