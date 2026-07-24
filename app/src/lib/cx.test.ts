import { describe, it, expect } from 'vitest'
import { cx } from './cx.ts'

describe('cx', () => {
  it('joins truthy class names with a space', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c')
  })

  it('drops falsy values', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
  })

  it('supports the conditional pattern', () => {
    const active = true
    expect(cx('base', active && 'is-active')).toBe('base is-active')
    expect(cx('base', !active && 'is-active')).toBe('base')
  })

  it('returns an empty string when nothing is truthy', () => {
    expect(cx(false, null, undefined)).toBe('')
  })
})
