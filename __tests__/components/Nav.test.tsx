import { render, screen } from '@testing-library/react'
import Nav from '@/components/Nav'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Nav', () => {
  it('renders all five nav links', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toBeInTheDocument()
  })

  it('renders the logo / brand name', () => {
    render(<Nav />)
    expect(screen.getByText(/cb test consultancy/i)).toBeInTheDocument()
  })
})
