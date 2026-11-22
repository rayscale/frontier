'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'

import { Check, Copy } from '../../icons/index.js'
import { copyToClipboard } from '../../internal/helpers/clipboard.js'
import { Button } from '../button/button.js'

import type { TCopyButtonProps } from './types.js'

import './copy-button.css'
import '../../internal/styles/visually-hidden.css'

/** Copies text to the clipboard and confirms the action in place. */
export function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  timeout = 1600,
  showLabel = true,
  icon,
  copiedIcon,
  onCopy,
  onError,
  type = 'button',
  variant = 'ghost',
  size = 'small',
  ...props
}: TCopyButtonProps): ReactElement {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(
    () => () => {
      clearTimeout(timer.current)
    },
    [],
  )

  async function handleClick() {
    try {
      await copyToClipboard(value)
      setCopied(true)
      onCopy?.(value)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setCopied(false)
      }, timeout)
    } catch (error) {
      setCopied(false)
      onError?.(error)
    }
  }

  let accessibleLabel: string | undefined

  if (!showLabel) {
    accessibleLabel = copied ? copiedLabel : label
  }

  return (
    <>
      <Button
        {...props}
        aria-label={accessibleLabel}
        data-copied={copied ? '' : undefined}
        onClick={() => {
          handleClick().catch(() => undefined)
        }}
        size={size}
        type={type}
        variant={variant}
      >
        {copied
          ? (copiedIcon ?? <Check animate aria-hidden="true" size={16} />)
          : (icon ?? <Copy aria-hidden="true" size={16} />)}
        {showLabel ? <span>{copied ? copiedLabel : label}</span> : null}
      </Button>
      <span
        aria-atomic="true"
        aria-live="polite"
        className="frontier-copy-button__sr-only frontier-visually-hidden"
      >
        {copied ? copiedLabel : ''}
      </span>
    </>
  )
}

export type { TCopyButtonProps } from './types.js'
