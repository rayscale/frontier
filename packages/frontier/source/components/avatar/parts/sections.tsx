import { Children, isValidElement, type ReactElement, type SyntheticEvent, useState } from 'react'

import { avatarContext, useAvatarContext } from '../context.js'
import type { TAvatarFallbackProps, TAvatarImageProps, TAvatarProps } from '../types.js'

export function AvatarRoot({
  children,
  className,
  size = 'medium',
  ...props
}: TAvatarProps): ReactElement {
  const [loadedSource, setLoadedSource] = useState<string | null>(null)
  const childItems = Children.toArray(children)
  const imageChild = childItems.find(
    (child): child is ReactElement<TAvatarImageProps> =>
      isValidElement<TAvatarImageProps>(child) && child.type === AvatarImage,
  )
  const activeSource =
    imageChild && (imageChild.props.src || imageChild.props.srcSet)
      ? JSON.stringify([
          imageChild.props.src ?? '',
          imageChild.props.srcSet ?? '',
          imageChild.props.sizes ?? '',
        ])
      : null
  const customFallback = childItems.some(
    (child) => isValidElement(child) && child.type === AvatarFallback,
  )
  const classes = ['frontier-avatar', `frontier-avatar--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <avatarContext.Provider value={{ activeSource, loadedSource, setLoadedSource }}>
      <span {...props} className={classes}>
        {!customFallback && (
          <span
            className="frontier-avatar__fallback frontier-avatar__fallback--default"
            aria-hidden="true"
            hidden={activeSource !== null && loadedSource === activeSource}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
          </span>
        )}
        {children}
      </span>
    </avatarContext.Provider>
  )
}

export function AvatarImage({
  alt,
  className,
  onError,
  onLoad,
  sizes,
  src,
  srcSet,
  ...props
}: TAvatarImageProps): ReactElement | null {
  const { loadedSource, setLoadedSource } = useAvatarContext()
  const sourceKey = JSON.stringify([src ?? '', srcSet ?? '', sizes ?? ''])
  const loaded = loadedSource === sourceKey

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSource(sourceKey)
    onLoad?.(event)
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSource(null)
    onError?.(event)
  }

  if (!src && !srcSet) {
    return null
  }

  return (
    <img
      {...props}
      alt={alt}
      className={['frontier-avatar__image', className].filter(Boolean).join(' ')}
      hidden={!loaded}
      onError={handleError}
      onLoad={handleLoad}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
    />
  )
}

export function AvatarFallback({
  children,
  className,
  ...props
}: TAvatarFallbackProps): ReactElement {
  const { activeSource, loadedSource } = useAvatarContext()

  return (
    <span
      {...props}
      className={['frontier-avatar__fallback', className].filter(Boolean).join(' ')}
      hidden={activeSource !== null && loadedSource === activeSource}
    >
      {children}
    </span>
  )
}
