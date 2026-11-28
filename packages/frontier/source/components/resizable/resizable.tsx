import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import { ResizableHandle, ResizablePanel, ResizableRoot } from './parts/sections.js'
import type { TResizableRootProps } from './types.js'

import './resizable.css'

export type {
  TResizableHandleProps,
  TResizableLayout,
  TResizableOrientation,
  TResizablePanelProps,
  TResizableRootProps,
  TResizableSize,
} from './types.js'

export interface TResizableComponent extends ForwardRefExoticComponent<
  TResizableRootProps & RefAttributes<HTMLDivElement>
> {
  /** Lays out panels in a row or a column and keeps their sizes in step. */
  Root: typeof ResizableRoot
  /** A region whose size changes when a neighboring handle moves. */
  Panel: typeof ResizablePanel
  /** The separator between two panels that people drag or move with the keyboard. */
  Handle: typeof ResizableHandle
}

/**
 * Panels that people resize by dragging the handle between them or by using the arrow keys.
 * Compose it with `Resizable.Root`, `Resizable.Panel`, and `Resizable.Handle`.
 */
export const Resizable: TResizableComponent = Object.assign(ResizableRoot, {
  Root: ResizableRoot,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
})
