import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('shows copyright and KvK number', () => {
    render(<Footer />)
    expect(screen.getByText(/cb test consultancy/i)).toBeInTheDocument()
    expect(screen.getByText(/09217715/)).toBeInTheDocument()
  })
})
