import type { FC } from 'react'

import { ImageZoomContent } from './parts/content.js'
import { ImageZoomRoot } from './parts/root.js'
import {
  ImageZoomCaption,
  ImageZoomClose,
  ImageZoomToolbar,
  ImageZoomZoomIn,
  ImageZoomZoomOut,
} from './parts/toolbar.js'
import { ImageZoomTrigger } from './parts/trigger.js'
import type { TImageZoomProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import './image-zoom.css'

export type {
  TImageZoomButtonProps,
  TImageZoomCaptionProps,
  TImageZoomContentProps,
  TImageZoomProps,
  TImageZoomToolbarProps,
  TImageZoomTriggerProps,
} from './types.js'

export interface TImageZoomComponent extends FC<TImageZoomProps> {
  /** Holds the open state and the zoom, and shares them with the parts. It renders no element. */
  Root: typeof ImageZoomRoot
  /** The image that people press to see it larger. It takes one `img` as its child. */
  Trigger: typeof ImageZoomTrigger
  /** The enlarged image over a blurred background, and what goes over it. */
  Content: typeof ImageZoomContent
  /** A bar over the image that holds the actions. */
  Toolbar: typeof ImageZoomToolbar
  /** A button that zooms in. */
  ZoomIn: typeof ImageZoomZoomIn
  /** A button that zooms out. */
  ZoomOut: typeof ImageZoomZoomOut
  /** A button that closes the image and sends it back to where it was. */
  Close: typeof ImageZoomClose
  /** Text over the image, under it. */
  Caption: typeof ImageZoomCaption
}

/**
 * Shows an image larger over the page. Pressing the image takes it out of its place and into the
 * middle of the screen, over a blurred background, where one more press zooms in, dragging moves
 * it, and the keyboard and the wheel zoom too. Compose it with `ImageZoom.Trigger` and
 * `ImageZoom.Content`, and add `ImageZoom.Toolbar` with your own actions, or `ImageZoom.Caption`.
 * It is built on a modal dialog.
 */
export const ImageZoom: TImageZoomComponent = Object.assign(ImageZoomRoot, {
  Root: ImageZoomRoot,
  Trigger: ImageZoomTrigger,
  Content: ImageZoomContent,
  Toolbar: ImageZoomToolbar,
  ZoomIn: ImageZoomZoomIn,
  ZoomOut: ImageZoomZoomOut,
  Close: ImageZoomClose,
  Caption: ImageZoomCaption,
})
