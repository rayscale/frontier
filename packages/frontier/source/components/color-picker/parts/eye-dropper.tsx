import { type ReactElement, useSyncExternalStore } from 'react'

import { Pipette } from '../../../icons/index.js'
import { classNames } from '../../../internal/helpers/class-names.js'
import { Button } from '../../button/button.js'
import { useColorControl } from '../context.js'
import { parseColor } from '../helpers/color.js'
import type { TColorEyeDropperProps } from '../types.js'

/** The browser's eyedropper, which TypeScript's DOM types do not describe yet. */
type TEyeDropperConstructor = new () => { open: () => Promise<{ sRGBHex: string }> }

function getEyeDropper(): TEyeDropperConstructor | undefined {
  if (typeof window === 'undefined') {
    return undefined
  }

  const candidate: unknown = Reflect.get(window, 'EyeDropper')

  return typeof candidate === 'function' ? (candidate as TEyeDropperConstructor) : undefined
}

function subscribe(): () => void {
  return () => undefined
}

export function ColorPickerEyeDropper({
  className,
  disabled = false,
  onClick,
  ...props
}: TColorEyeDropperProps): ReactElement | null {
  const supported = useSyncExternalStore(
    subscribe,
    () => getEyeDropper() !== undefined,
    () => false,
  )
  const control = useColorControl({ disabled })

  if (!supported) {
    return null
  }

  function pick(): void {
    const EyeDropper = getEyeDropper()
    if (!EyeDropper) {
      return
    }

    new EyeDropper().open().then(
      ({ sRGBHex }) => {
        const parsed = parseColor(sRGBHex)
        if (parsed) {
          control.setColor({ ...parsed, alpha: control.color.alpha })
        }
      },
      // People close the eyedropper with Escape, which rejects the promise. Nothing to do.
      () => undefined,
    )
  }

  return (
    <Button
      aria-label="Pick a color from the screen"
      {...props}
      className={classNames('frontier-color-eye-dropper', className)}
      disabled={control.disabled}
      size="icon"
      variant="outline"
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          pick()
        }
      }}
    >
      <Pipette aria-hidden="true" />
    </Button>
  )
}
