import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'

/** Available avatar sizes. */
export type TAvatarSize = 'small' | 'medium' | 'large' | 'extra-large'

/** Props for the {@link Avatar} root component. */
export type TAvatarProps = HTMLAttributes<HTMLSpanElement> & {
  /** Size inherited by the image and fallback content. */
  size?: TAvatarSize
  /** Compose `Avatar.Image`, `Avatar.Fallback`, or both as children. */
  children?: ReactNode
}

/** Native image attributes accepted by `Avatar.Image`. */
export type TAvatarImageProps = ImgHTMLAttributes<HTMLImageElement>

/** Props for `Avatar.Fallback`. */
export type TAvatarFallbackProps = HTMLAttributes<HTMLSpanElement> & {
  /** Text, an icon, or other fallback content. */
  children?: ReactNode
}
