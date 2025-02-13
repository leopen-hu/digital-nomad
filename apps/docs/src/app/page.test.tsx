import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page Component', () => {
  it('renders heading with text "Web"', () => {
    render(<Page />)
    expect(screen.getByText('Web')).toHaveRole('heading')
  })

  it('renders button with text "Boop"', () => {
    render(<Page />)
    expect(screen.getByText('Boop')).toHaveRole('button')
  })
})
