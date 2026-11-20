import { forwardRef } from 'react'

import { classNames } from '../../../internal/helpers/class-names.js'
import type { TButtonHTMLProps } from '../types.js'

export const HeaderMenuButton = forwardRef<HTMLButtonElement, TButtonHTMLProps>(
  function HeaderMenuButton({ className, ...props }, ref) {
    return (
      <button
        type="button"
        {...props}
        ref={ref}
        className={classNames('frontier-header__menu-button', className)}
      >
        <span className="frontier-header__menu-symbol" aria-hidden="true" />
      </button>
    )
  },
)
