import type { HTMLAttributes } from 'react'

/** Props for the {@link ColorSwatch} component. */
export type TColorSwatchProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  /** The color to show, as any CSS color. */
  color: string
  /** Name read out for the color. Defaults to the color itself. */
  label?: string | undefined
  /** Size of the swatch. Defaults to `md`. */
  size?: 'sm' | 'md' | 'lg' | undefined
}
