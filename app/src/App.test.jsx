import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

// Smoke test — proves the Vitest + RTL toolchain is wired (ticket #9).
describe('App shell', () => {
  it('renders the scaffold marker', () => {
    render(<App />)
    expect(screen.getByText(/scaffold/i)).toBeInTheDocument()
  })
})
