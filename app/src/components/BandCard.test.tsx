import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import BandCard from './BandCard.tsx'
import { DEFAULT_COVER } from '../lib/images.ts'
import type { Band } from '../types.ts'

const band: Band = {
  id: '001',
  band_name: 'The Velvet Echo',
  album: 'Whispers in the Wind',
  genre: 'rock',
  cover: '/sources/im001.png',
  description: 'Haunting melodies.',
}

describe('BandCard', () => {
  it('fires onSelect when clicked', async () => {
    const onSelect = vi.fn()
    render(<BandCard band={band} selected={false} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: /the velvet echo/i }))
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('reflects the selected state via aria-pressed', () => {
    const { rerender } = render(<BandCard band={band} selected={false} onSelect={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    rerender(<BandCard band={band} selected onSelect={() => {}} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('falls back to default.png when the cover image fails to load', () => {
    render(<BandCard band={band} selected={false} onSelect={() => {}} />)
    const img = screen.getByRole('img') as HTMLImageElement
    fireEvent.error(img)
    expect(img.getAttribute('src')).toBe(DEFAULT_COVER)
  })
})
