import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import type {
  TImageZoomButtonProps,
  TImageZoomContentProps,
  TImageZoomToolbarProps,
} from '../image-zoom/image-zoom.js'

/** One picture of the gallery. */
export interface TLightboxItem {
  /** Tells the picture apart from the others. It is the `value` of the trigger that opens it. */
  id: string
  /** Source of the picture when it is enlarged. */
  src: string
  /** Text that describes the picture. */
  alt: string
  /** Text shown with the picture when it is enlarged. */
  caption?: ReactNode | undefined
  /** Source of the small picture in the strip under the enlarged one. Defaults to `src`. */
  thumbnail?: string | undefined
}

/** Props for the {@link Lightbox} root component. */
export interface TLightboxProps {
  /** The pictures, in the order people go through them. */
  items: readonly TLightboxItem[]
  /** Controlled open state. Omit to let the lightbox manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the lightbox opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** The `id` of the picture that is shown, in controlled mode. */
  value?: string | undefined
  /** The `id` of the picture that is shown at the start. Defaults to the first one. */
  defaultValue?: string | undefined
  /** Called with the `id` of the picture that becomes the shown one. */
  onValueChange?: ((value: string) => void) | undefined
  /** Goes from the last picture to the first, and from the first to the last. Defaults to `false`. */
  loop?: boolean | undefined
  /** The highest zoom, as a multiple of the size a picture has when it opens. Defaults to `4`. */
  maxZoom?: number | undefined
  /** Parts, such as `Lightbox.Trigger` and `Lightbox.Content`. */
  children?: ReactNode | undefined
}

/** Props for `Lightbox.Trigger`. */
export interface TLightboxTriggerProps {
  /** The `id` of the picture that this image opens. */
  value: string
  /** The small image that people press, as one `img` element. */
  children: ReactElement
  /** Class for the button that wraps the image. */
  className?: string | undefined
}

/** Props for `Lightbox.Content`. */
export type TLightboxContentProps = Omit<
  TImageZoomContentProps,
  'alt' | 'bottomSpace' | 'direction' | 'src' | 'srcSet'
> & {
  /**
   * Shows the strip of small pictures under the enlarged one, when the default controls are used.
   * Defaults to `true`.
   */
  thumbnails?: boolean | undefined
}

/** Props for `Lightbox.Toolbar`, the bar of actions. */
export type TLightboxToolbarProps = TImageZoomToolbarProps

/** Props for `Lightbox.ZoomIn`, `Lightbox.ZoomOut`, `Lightbox.Close`, `Lightbox.Previous`, and `Lightbox.Next`. */
export type TLightboxButtonProps = TImageZoomButtonProps

/** Props for `Lightbox.Counter`, which says which picture is shown. */
export type TLightboxCounterProps = HTMLAttributes<HTMLSpanElement>

/** Props for `Lightbox.Footer`, the area under the picture that holds the caption and the strip. */
export type TLightboxFooterProps = HTMLAttributes<HTMLDivElement>

/** Props for `Lightbox.Caption`, which shows the caption of the picture. It shows nothing without one. */
export type TLightboxCaptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>

/** Props for `Lightbox.Thumbnails`, the strip of small pictures. */
export type TLightboxThumbnailsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>
