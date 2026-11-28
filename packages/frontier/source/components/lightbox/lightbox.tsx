import type { FC } from 'react'

import { ImageZoom } from '../image-zoom/image-zoom.js'

import { LightboxContent } from './parts/content.js'
import { LightboxRoot, LightboxTrigger } from './parts/root.js'
import {
  LightboxCaption,
  LightboxCounter,
  LightboxFooter,
  LightboxNext,
  LightboxPrevious,
  LightboxThumbnails,
} from './parts/sections.js'
import type { TLightboxProps } from './types.js'

import '../../internal/styles/floating-surface.css'
import './lightbox.css'

export type {
  TLightboxButtonProps,
  TLightboxCaptionProps,
  TLightboxContentProps,
  TLightboxCounterProps,
  TLightboxFooterProps,
  TLightboxItem,
  TLightboxProps,
  TLightboxThumbnailsProps,
  TLightboxToolbarProps,
  TLightboxTriggerProps,
} from './types.js'

export interface TLightboxComponent extends FC<TLightboxProps> {
  /** Holds the pictures and which one is shown, and shares them with the parts. */
  Root: typeof LightboxRoot
  /** The small image that opens a picture. It takes an `img` and the `id` of the picture. */
  Trigger: typeof LightboxTrigger
  /** The enlarged picture over a blurred background, and what goes over it. */
  Content: typeof LightboxContent
  /** A bar over the picture that holds the actions. */
  Toolbar: typeof ImageZoom.Toolbar
  /** A button that zooms in. */
  ZoomIn: typeof ImageZoom.ZoomIn
  /** A button that zooms out. */
  ZoomOut: typeof ImageZoom.ZoomOut
  /** A button that closes the lightbox and sends the picture back to where it was. */
  Close: typeof ImageZoom.Close
  /** A button that goes to the picture before. */
  Previous: typeof LightboxPrevious
  /** A button that goes to the picture after. */
  Next: typeof LightboxNext
  /** Says which picture is shown, such as "3 of 12". */
  Counter: typeof LightboxCounter
  /** The area under the picture that holds the caption and the strip of small pictures. */
  Footer: typeof LightboxFooter
  /** The caption of the shown picture. */
  Caption: typeof LightboxCaption
  /** A strip of small pictures that jump to one. */
  Thumbnails: typeof LightboxThumbnails
}

/**
 * Shows a gallery of pictures one at a time over the page. Pressing a small image opens its
 * picture in the middle of the screen over a blurred background, where people zoom it, go to the
 * next and the previous one, and jump with a strip of small pictures. It is built on
 * `ImageZoom`, so a picture flies from the small image that was pressed, and back to the one that
 * is shown when it closes. Compose it with `Lightbox.Trigger` for each picture and one
 * `Lightbox.Content`, and choose the controls inside the content.
 */
export const Lightbox: TLightboxComponent = Object.assign(LightboxRoot, {
  Root: LightboxRoot,
  Trigger: LightboxTrigger,
  Content: LightboxContent,
  Toolbar: ImageZoom.Toolbar,
  ZoomIn: ImageZoom.ZoomIn,
  ZoomOut: ImageZoom.ZoomOut,
  Close: ImageZoom.Close,
  Previous: LightboxPrevious,
  Next: LightboxNext,
  Counter: LightboxCounter,
  Footer: LightboxFooter,
  Caption: LightboxCaption,
  Thumbnails: LightboxThumbnails,
})
