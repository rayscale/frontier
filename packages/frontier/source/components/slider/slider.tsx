import { Slider as BaseSlider } from '@base-ui/react/slider'
import { type CSSProperties, forwardRef, useCallback, useId, useState } from 'react'

import { classNames } from '../../internal/helpers/class-names.js'

import { getMarkPercentage, getSliderMarks, hasMarkLabel, isMarkActive } from './helpers/marks.js'
import type { TSliderProps, TSliderValue } from './types.js'

import './slider.css'

export type { TSliderMark, TSliderProps, TSliderValue } from './types.js'

/**
 * Renders an accessible, single-value or range slider. Base UI manages value
 * state, thumb interaction, collision handling, keyboard behavior, and forms.
 */
export const Slider = forwardRef<HTMLDivElement, TSliderProps>(function Slider(
  {
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
    className,
    defaultValue,
    description,
    disabled = false,
    error,
    format,
    formatValue,
    form,
    id,
    invalid = false,
    label,
    largeStep,
    locale,
    max = 100,
    min = 0,
    minStepsBetweenValues,
    marks = [],
    markInterval,
    name,
    onValueChange,
    onValueCommitted,
    orientation = 'horizontal',
    readOnly = false,
    required = false,
    showValue = false,
    step = 1,
    thumbAlignment = 'center',
    thumbCollisionBehavior = 'push',
    thumbLabels,
    value,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const sliderId = id ?? generatedId
  const descriptionPresent =
    description !== undefined && description !== null && description !== false
  const descriptionId = descriptionPresent ? `${sliderId}-description` : undefined
  const errorPresent = error !== undefined && error !== null && error !== false
  const errorId = errorPresent ? `${sliderId}-error` : undefined
  const describedBy =
    [ariaDescribedBy, descriptionId, errorId].filter(Boolean).join(' ') || undefined
  const invalidState = invalid || errorPresent
  const fixedState = min === max
  const labelPresent = label !== undefined && label !== null && label !== false
  const rangeState = Array.isArray(value) || Array.isArray(defaultValue)

  if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
    throw new RangeError('Slider min and max must be finite, with max >= min.')
  }

  if (!Number.isFinite(step) || step <= 0) {
    throw new RangeError('Slider step must be a finite positive number.')
  }

  const resolvedMarks = getSliderMarks(marks, markInterval, min, max)
  const [uncontrolledValue, setUncontrolledValue] = useState<TSliderValue>(
    () => defaultValue ?? (rangeState ? [min, max] : min),
  )
  const currentValue = value ?? uncontrolledValue
  const currentValues = Array.isArray(currentValue) ? currentValue : [currentValue]
  const numberFormat = new Intl.NumberFormat(locale, format)
  const labelId = labelPresent ? `${sliderId}-label` : undefined

  if (Array.isArray(currentValue) && currentValue.length < 2) {
    throw new RangeError('Slider range values must contain at least two values.')
  }

  const setInputAccessibility = useCallback(
    (input: HTMLInputElement | null) => {
      if (!input) {
        return
      }

      const attributes: [string, boolean][] = [
        ['aria-readonly', readOnly],
        ['aria-invalid', invalidState],
        ['aria-required', required],
      ]

      attributes.forEach(([attribute, enabled]) => {
        if (enabled) {
          input.setAttribute(attribute, 'true')
        } else {
          input.removeAttribute(attribute)
        }
      })
    },
    [invalidState, readOnly, required],
  )

  if (fixedState) {
    const fixedValues = (rangeState ? currentValues : [currentValues[0] ?? min]).map(
      (currentValue: number) => Math.min(Math.max(currentValue, min), max),
    )

    return (
      <div
        {...props}
        ref={ref}
        id={sliderId}
        className={classNames(
          'frontier-slider',
          'frontier-slider--fixed',
          `frontier-slider--${orientation}`,
          className,
        )}
        data-disabled
        data-orientation={orientation}
        data-invalid={invalidState || undefined}
        data-readonly={readOnly || undefined}
      >
        {(labelPresent || showValue) && (
          <div className="frontier-slider__header">
            {labelPresent && (
              <span className="frontier-slider__label" id={labelId}>
                {label}
              </span>
            )}
            {showValue && (
              <output className="frontier-slider__value">
                {fixedValues
                  .map((fixedValue) => formatValue?.(fixedValue) ?? numberFormat.format(fixedValue))
                  .join(' – ')}
              </output>
            )}
          </div>
        )}
        {descriptionPresent && (
          <span className="frontier-slider__description" id={descriptionId}>
            {description}
          </span>
        )}
        {errorPresent && (
          <span className="frontier-slider__error" id={errorId}>
            {error}
          </span>
        )}
        {name &&
          fixedValues.map((fixedValue, index) => (
            <input
              key={index}
              type="hidden"
              name={name}
              value={fixedValue}
              form={form}
              disabled={disabled}
            />
          ))}
        <div className="frontier-slider__control" data-orientation={orientation}>
          <div className="frontier-slider__track">
            {resolvedMarks.map((mark) => (
              <span
                key={mark.value}
                className="frontier-slider__mark"
                data-active={mark.value === min || undefined}
                aria-hidden={hasMarkLabel(mark.label) ? undefined : true}
                style={
                  {
                    '--_slider-mark-position': `${String(getMarkPercentage(mark.value, min, max))}%`,
                  } as CSSProperties
                }
              >
                {hasMarkLabel(mark.label) && (
                  <span className="frontier-slider__mark-label">{mark.label}</span>
                )}
              </span>
            ))}
            {fixedValues.map((fixedValue, index) => (
              <span
                key={index}
                role="slider"
                aria-label={thumbLabels?.[index] ?? ariaLabel}
                aria-labelledby={ariaLabelledBy ?? labelId}
                aria-describedby={describedBy}
                aria-invalid={invalidState || undefined}
                aria-readonly={readOnly || undefined}
                aria-valuetext={
                  ariaValueText ?? formatValue?.(fixedValue) ?? numberFormat.format(fixedValue)
                }
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={fixedValue}
                aria-disabled="true"
                aria-orientation={orientation}
                aria-required={required || undefined}
                tabIndex={-1}
                className="frontier-slider__thumb"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <BaseSlider.Root<TSliderValue>
      {...props}
      ref={ref}
      id={sliderId}
      className={classNames('frontier-slider', `frontier-slider--${orientation}`, className)}
      data-invalid={invalidState || undefined}
      data-readonly={readOnly || undefined}
      aria-invalid={invalidState || undefined}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      largeStep={largeStep}
      minStepsBetweenValues={minStepsBetweenValues}
      thumbAlignment={thumbAlignment}
      thumbCollisionBehavior={thumbCollisionBehavior}
      orientation={orientation}
      format={format}
      locale={locale}
      disabled={disabled}
      form={form}
      name={name}
      onValueChange={(nextValue, eventDetails) => {
        if (readOnly) {
          eventDetails.cancel()
          return
        }

        if (value === undefined) {
          setUncontrolledValue(nextValue)
        }

        onValueChange?.(nextValue)
      }}
      onValueCommitted={(nextValue) => {
        onValueCommitted?.(nextValue)
      }}
    >
      {(labelPresent || showValue) && (
        <div className="frontier-slider__header">
          {labelPresent && (
            <BaseSlider.Label className="frontier-slider__label">{label}</BaseSlider.Label>
          )}
          {showValue && (
            <BaseSlider.Value className="frontier-slider__value">
              {formatValue
                ? (_formattedValues, values) => values.map(formatValue).join(' – ')
                : undefined}
            </BaseSlider.Value>
          )}
        </div>
      )}
      {descriptionPresent && (
        <span className="frontier-slider__description" id={descriptionId}>
          {description}
        </span>
      )}
      {errorPresent && (
        <span className="frontier-slider__error" id={errorId}>
          {error}
        </span>
      )}
      <BaseSlider.Control className="frontier-slider__control">
        <BaseSlider.Track className="frontier-slider__track">
          <BaseSlider.Indicator className="frontier-slider__indicator" />
          {resolvedMarks.map((mark) => (
            <span
              key={mark.value}
              className="frontier-slider__mark"
              data-active={isMarkActive(mark.value, currentValues, rangeState, min) || undefined}
              aria-hidden={hasMarkLabel(mark.label) ? undefined : true}
              style={
                {
                  '--_slider-mark-position': `${String(getMarkPercentage(mark.value, min, max))}%`,
                } as CSSProperties
              }
            >
              {hasMarkLabel(mark.label) && (
                <span className="frontier-slider__mark-label">{mark.label}</span>
              )}
            </span>
          ))}
          {currentValues.map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={rangeState ? index : undefined}
              className="frontier-slider__thumb"
              aria-label={thumbLabels?.[index] ?? ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={describedBy}
              aria-invalid={invalidState || undefined}
              aria-required={required || undefined}
              aria-valuetext={ariaValueText}
              inputRef={setInputAccessibility}
              getAriaValueText={
                formatValue ? (_formattedValue, thumbValue) => formatValue(thumbValue) : undefined
              }
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
})
