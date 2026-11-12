import { describe, expect, it } from 'vitest'

import { cx } from '../source/cx.js'

describe('cx', () => {
  it('joins class names in order', () => {
    expect(cx('a', 'b')).toBe('a b')
  })

  it('skips empty and falsy values', () => {
    expect(cx('', false, null, undefined, 'a')).toBe('a')
  })

  it('returns an empty string without usable values', () => {
    expect(cx('', false, null, undefined)).toBe('')
  })
})
