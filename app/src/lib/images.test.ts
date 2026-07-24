import { describe, it, expect } from 'vitest'
import { coverImageUrl, DEFAULT_COVER } from './images.ts'

describe('coverImageUrl', () => {
  it('maps zero-padded single-digit ids', () => {
    expect(coverImageUrl('001')).toBe('/sources/im001.png')
    expect(coverImageUrl('008')).toBe('/sources/im008.png')
  })

  it('maps two-digit ids to the im00NN form (the assets gotcha)', () => {
    // Real files are im0010.png / im0012.png, not im010.png / im012.png
    expect(coverImageUrl('010')).toBe('/sources/im0010.png')
    expect(coverImageUrl('012')).toBe('/sources/im0012.png')
  })

  it('still resolves a path for ids whose file may not exist', () => {
    // 004 has no cover file; resolver returns the intended path and the UI
    // falls back to default.png via onError.
    expect(coverImageUrl('004')).toBe('/sources/im004.png')
  })

  it('falls back to default for a non-numeric id', () => {
    expect(coverImageUrl('nope')).toBe(DEFAULT_COVER)
  })
})
