import { useReducedMotion } from 'motion/react'
import {
  type ForwardedRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import {
  type TSelectorBounds,
  useSelectorDrag,
} from '../../../internal/helpers/use-selector-drag.js'
import type { TSegmentedControlOption } from '../types.js'

interface TUseSegmentedControlOptions<TValue extends string> {
  options: readonly TSegmentedControlOption<TValue>[]
  value: TValue | undefined
  defaultValue: TValue | undefined
  disabled: boolean
  id: string | undefined
  name: string | undefined
  onChange: ((value: TValue) => void) | undefined
  forwardedRef: ForwardedRef<HTMLDivElement>
}

export function useSegmentedControl<TValue extends string>({
  options,
  value,
  defaultValue,
  disabled,
  id,
  name,
  onChange,
  forwardedRef,
}: TUseSegmentedControlOptions<TValue>): {
  controlId: string
  groupName: string
  containerRef: React.RefObject<HTMLDivElement | null>
  setContainerRef: (element: HTMLDivElement | null) => void
  selectedValue: TValue | undefined
  selectedOption: TSegmentedControlOption<TValue> | undefined
  indicatorBounds: TSelectorBounds | null
  drag: {
    dragging: boolean
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void
    onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void
    onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void
    onClickCapture: (event: React.MouseEvent<HTMLDivElement>) => void
  }
  reduceMotion: boolean | null
  registerItem: (optionValue: TValue) => (element: HTMLLabelElement | null) => void
  handleSelect: (optionValue: TValue) => void
} {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const groupName = name ?? `frontier-segmented-control-${controlId}`
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef(new Map<TValue, HTMLLabelElement>())
  const reduceMotion = useReducedMotion()

  const [uncontrolledValue, setUncontrolledValue] = useState<TValue | undefined>(defaultValue)
  const [indicatorBounds, setIndicatorBounds] = useState<TSelectorBounds | null>(null)

  const controlled = value !== undefined
  const selectedValue = controlled ? value : uncontrolledValue
  const selectedOption = options.find((option) => option.value === selectedValue)

  const setContainerRef = (element: HTMLDivElement | null) => {
    containerRef.current = element

    if (typeof forwardedRef === 'function') {
      forwardedRef(element)
    } else if (forwardedRef) {
      forwardedRef.current = element
    }
  }

  const handleSelect = (optionValue: TValue) => {
    if (disabled) {
      return
    }

    const targetOption = options.find((option) => option.value === optionValue)

    if (targetOption?.disabled || optionValue === selectedValue) {
      return
    }

    if (!controlled) {
      setUncontrolledValue(optionValue)
    }

    onChange?.(optionValue)
  }

  const getItemBounds = useCallback(
    (optionValue: TValue) => {
      const container = containerRef.current
      const item = itemRefs.current.get(optionValue)

      if (!container || !item) {
        return null
      }

      const containerRect = container.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()
      const containerStyle = getComputedStyle(container)
      const paddingLeft = Number.parseFloat(containerStyle.paddingLeft) || 0
      const paddingRight = Number.parseFloat(containerStyle.paddingRight) || 0
      const first = options[0]?.value === optionValue
      const last = options[options.length - 1]?.value === optionValue

      const extendLeft = first ? paddingLeft : 0
      const extendRight = last ? paddingRight : 0

      return {
        left: itemRect.left - containerRect.left - container.clientLeft - extendLeft,
        width: itemRect.width + extendLeft + extendRight,
      }
    },
    [options],
  )

  const getItemElement = useCallback((optionValue: TValue) => itemRefs.current.get(optionValue), [])
  const getItems = useCallback(() => options, [options])

  const measureIndicator = useCallback(() => {
    if (!selectedOption) {
      setIndicatorBounds(null)
      return
    }

    const bounds = getItemBounds(selectedOption.value)

    if (bounds) {
      setIndicatorBounds(bounds)
    }
  }, [getItemBounds, selectedOption])

  useLayoutEffect(() => {
    measureIndicator()
  }, [measureIndicator])

  useEffect(() => {
    const container = containerRef.current

    if (!container || typeof ResizeObserver === 'undefined') {
      return undefined
    }

    const observer = new ResizeObserver(() => {
      measureIndicator()
    })

    observer.observe(container)

    for (const item of itemRefs.current.values()) {
      observer.observe(item)
    }

    return () => {
      observer.disconnect()
    }
  }, [measureIndicator])

  const drag = useSelectorDrag({
    containerRef,
    disabled,
    indicatorBounds,
    getItems,
    getItemElement,
    getItemBounds,
    onBoundsChange: setIndicatorBounds,
    onSelect: handleSelect,
    measureIndicator,
    selectedValue,
  })

  const registerItem = (optionValue: TValue) => {
    return (element: HTMLLabelElement | null) => {
      if (element) {
        itemRefs.current.set(optionValue, element)
      } else {
        itemRefs.current.delete(optionValue)
      }
    }
  }

  return {
    controlId,
    groupName,
    containerRef,
    setContainerRef,
    selectedValue,
    selectedOption,
    indicatorBounds,
    drag,
    reduceMotion,
    registerItem,
    handleSelect,
  }
}
