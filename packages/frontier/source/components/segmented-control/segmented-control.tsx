import { motion } from 'motion/react'
import { type ForwardedRef, forwardRef, type KeyboardEvent, type ReactNode, type Ref } from 'react'

import { selectEdgeRadioOnKeyDown } from '../../internal/helpers/radio-edge-keys.js'
import { springLayout } from '../../styles/motion.js'

function resolveIndicatorTransition(reduceMotion: boolean | null, dragging: boolean) {
  if (reduceMotion) {
    return { duration: 0 }
  }

  if (dragging) {
    return { left: { duration: 0 }, width: springLayout }
  }

  return springLayout
}

import { useSegmentedControl } from './hooks/use-segmented-control.js'
import { SegmentedControlOptionItem } from './parts/option.js'
import type { TSegmentedControlProps } from './types.js'

import './segmented-control.css'

export type {
  TSegmentedControlOption,
  TSegmentedControlProps,
  TSegmentedControlSize,
} from './types.js'

type TSegmentedControlComponent = <TValue extends string = string>(
  props: TSegmentedControlProps<TValue> & { ref?: Ref<HTMLDivElement> },
) => ReactNode

/**
 * Renders a single-selection radio group with controlled and uncontrolled modes.
 * Supports dragging the selection indicator with a mouse or touch input.
 */
export const SegmentedControl: TSegmentedControlComponent = forwardRef(function SegmentedControl<
  TValue extends string = string,
>(
  {
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    defaultValue,
    disabled = false,
    id,
    label,
    name,
    onChange,
    onKeyDown,
    options,
    size = 'medium',
    value,
    ...props
  }: TSegmentedControlProps<TValue>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    controlId,
    groupName,
    setContainerRef,
    selectedValue,
    selectedOption,
    indicatorBounds,
    drag,
    reduceMotion,
    registerItem,
    handleSelect,
  } = useSegmentedControl({
    options,
    value,
    defaultValue,
    disabled,
    id,
    name,
    onChange,
    forwardedRef: ref,
  })

  const labelId = label ? `${controlId}-label` : undefined
  const resolvedAriaLabelledBy = ariaLabelledBy ?? labelId
  const classes = ['frontier-segmented-control', `frontier-segmented-control--${size}`, className]
    .filter(Boolean)
    .join(' ')

  const controlContent = (
    <div
      {...props}
      ref={setContainerRef}
      id={controlId}
      role="radiogroup"
      className={classes}
      aria-label={ariaLabel}
      aria-labelledby={resolvedAriaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      data-dragging={drag.dragging || undefined}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
      onPointerCancel={drag.onPointerCancel}
      onClickCapture={drag.onClickCapture}
      onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event)
        if (!event.defaultPrevented) {
          selectEdgeRadioOnKeyDown(event)
        }
      }}
    >
      {selectedOption && indicatorBounds && (
        <motion.span
          className="frontier-segmented-control__indicator"
          data-disabled={disabled || (selectedOption.disabled ?? false) || undefined}
          aria-hidden="true"
          initial={false}
          animate={{
            left: indicatorBounds.left,
            width: indicatorBounds.width,
          }}
          transition={resolveIndicatorTransition(reduceMotion, drag.dragging)}
        />
      )}

      {options.map((option, index) => (
        <SegmentedControlOptionItem
          key={`${option.value}-${String(index)}`}
          option={option}
          index={index}
          controlId={controlId}
          groupName={groupName}
          selectedValue={selectedValue}
          disabled={disabled}
          onSelect={handleSelect}
          registerItem={registerItem}
        />
      ))}
    </div>
  )

  if (label) {
    return (
      <div className="frontier-segmented-control-field" data-disabled={disabled || undefined}>
        <span id={labelId} className="frontier-segmented-control__group-label">
          {label}
        </span>
        {controlContent}
      </div>
    )
  }

  return controlContent
}) as unknown as TSegmentedControlComponent
