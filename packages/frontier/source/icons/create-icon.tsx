import { forwardRef } from 'react'

import { Icon } from './icon.js'
import type { TCreateIconOptions, TIconComponent, TIconProps } from './types.js'

/** Creates an icon component from a named set of shapes on the 24-unit grid. */
export function createIcon({ name, iconNode }: TCreateIconOptions): TIconComponent {
  const Component = Object.assign(
    forwardRef<SVGSVGElement, Omit<TIconProps, 'iconNode'>>(function IconComponent(props, ref) {
      return <Icon {...props} ref={ref} iconNode={iconNode} />
    }),
    { iconNode },
  )

  Component.displayName = name

  return Component
}
