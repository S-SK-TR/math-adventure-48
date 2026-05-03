import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from '../src/components/AppShell'

describe('App Layout (AppShell)', () => {
  it('renders without crashing and displays the brand name', () => {
    render(
      <MemoryRouter>
        <AppShell>
          <div>Test Content</div>
        </AppShell>
      </MemoryRouter>
    )
    
    // Check if brand name exists
    const brandElements = screen.getAllByText(/Math\s*Adventure/i)
    expect(brandElements.length).toBeGreaterThan(0)
    
    // Check if children are rendered
    expect(screen.getByText('Test Content')).toBeDefined()
  })
})
