import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button text="Añadir Reseña" />)
    const buttonElement = screen.getByText(/Añadir Reseña/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button text="Click me" onClick={handleClick} />)
    
    const buttonElement = screen.getByText(/Click me/i)
    fireEvent.click(buttonElement)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})