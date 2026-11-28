import type { HTMLAttributes, ReactElement, ReactNode } from 'react'

import type { TButtonProps } from '../button/button.js'

/** Props for the {@link ImageZoom} root component. */
export interface TImageZoomProps {
  /** Controlled open state. Omit to let the component manage its own state. */
  open?: boolean | undefined
  /** Initial open state when uncontrolled. Defaults to `false`. */
  defaultOpen?: boolean | undefined
  /** Called with the requested open state when the image opens or closes. */
  onOpenChange?: ((open: boolean) => void) | undefined
  /** Which image is shown, by the `value` of its trigger. Only needed with more than one trigger. */
  value?: string | undefined
  /** The image to show at the start, in uncontrolled mode. */
  defaultValue?: string | undefined
  /** Called with the `value` of the trigger whose image is shown, when it changes. */
  onValueChange?: ((value: string | undefined) => void) | undefined
  /** The highest zoom, as a multiple of the size the image has when it opens. Defaults to `4`. */
  maxZoom?: number | undefined
  /** Parts, such as `ImageZoom.Trigger` and `ImageZoom.Content`. */
  children?: ReactNode | undefined
}

/** Props for `ImageZoom.Trigger`. */
export interface TImageZoomTriggerProps {
  /** The image that people press, as one `img` element. */
  children: ReactElement
  /** Names this image when there are several triggers, so the right one is enlarged and the image flies back to it. */
  value?: string | undefined
  /** Class for the button that wraps the image. */
  className?: string | undefined
}

/** Props for `ImageZoom.Content`, which holds the enlarged image and its controls. */
export type TImageZoomContentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Source of the enlarged image. Defaults to the source of the image in the trigger. */
  src?: string | undefined
  /** Source set of the enlarged image, so a sharper file can load when it is enlarged. */
  srcSet?: string | undefined
  /** Text that describes the image. Defaults to the one of the image in the trigger. */
  alt?: string | undefined
  /** Name of the dialog. Defaults to the `alt` of the image. */
  label?: string | undefined
  /**
   * Which way people are going when another image replaces the one that is shown: the new one
   * comes from the end side when `forward`, and from the start side when `backward`. Defaults to
   * the order of the triggers in the page.
   */
  direction?: 'forward' | 'backward' | undefined
  /** Room kept under the image, in pixels, for controls that you put there. Defaults to `0`. */
  bottomSpace?: number | undefined
  /**
   * What goes over the image, such as `ImageZoom.Toolbar` and `ImageZoom.Caption`. Without it, the
   * image has a toolbar with the zoom buttons and a close button.
   */
  children?: ReactNode | undefined
}

/** Props for `ImageZoom.Toolbar`, the bar of actions. */
export type TImageZoomToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /** Where the bar sits over the image. Defaults to `top`. */
  placement?: 'top' | 'bottom' | undefined
}

/** Props for `ImageZoom.ZoomIn`, `ImageZoom.ZoomOut`, and `ImageZoom.Close`. They are buttons. */
export type TImageZoomButtonProps = TButtonProps

/** Props for `ImageZoom.Caption`, the text under the image. */
export type TImageZoomCaptionProps = HTMLAttributes<HTMLParagraphElement>
