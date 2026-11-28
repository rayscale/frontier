import { forwardRef } from 'react'
import { Group, Panel, Separator } from 'react-resizable-panels'

import { classNames } from '../../../internal/helpers/class-names.js'
import { omitUndefined } from '../../../internal/helpers/omit-undefined.js'
import { toLayoutSize } from '../helpers/size.js'
import type { TResizableHandleProps, TResizablePanelProps, TResizableRootProps } from '../types.js'

export const ResizableRoot = forwardRef<HTMLDivElement, TResizableRootProps>(function ResizableRoot(
  { className, defaultLayout, onLayoutChange, orientation = 'horizontal', ...props },
  ref,
) {
  return (
    <Group
      {...omitUndefined(props)}
      {...omitUndefined({ defaultLayout })}
      elementRef={ref}
      orientation={orientation}
      className={classNames('frontier-resizable', className)}
      onLayoutChanged={(layout) => {
        onLayoutChange?.(layout)
      }}
    />
  )
})

export const ResizablePanel = forwardRef<HTMLDivElement, TResizablePanelProps>(
  function ResizablePanel(
    { className, collapsedSize, defaultSize, maxSize, minSize, onResize, ...props },
    ref,
  ) {
    return (
      <Panel
        {...omitUndefined(props)}
        {...omitUndefined({
          collapsedSize: collapsedSize === undefined ? undefined : toLayoutSize(collapsedSize),
          defaultSize: defaultSize === undefined ? undefined : toLayoutSize(defaultSize),
          maxSize: maxSize === undefined ? undefined : toLayoutSize(maxSize),
          minSize: minSize === undefined ? undefined : toLayoutSize(minSize),
        })}
        elementRef={ref}
        className={classNames('frontier-resizable__panel', className)}
        onResize={(size) => {
          onResize?.(size.asPercentage)
        }}
      />
    )
  },
)

export const ResizableHandle = forwardRef<HTMLDivElement, TResizableHandleProps>(
  function ResizableHandle({ className, grip = false, children, ...props }, ref) {
    return (
      <Separator
        {...omitUndefined(props)}
        elementRef={ref}
        className={classNames('frontier-resizable__handle', className)}
      >
        {grip && <span className="frontier-resizable__grip" aria-hidden="true" />}
        {children}
      </Separator>
    )
  },
)
