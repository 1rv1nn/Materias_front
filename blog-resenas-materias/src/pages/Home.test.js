import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

describe('Home Page', () => {
  test('displays button to add review', () => {
    render(<Home />)
    const buttonElement = screen.getByText(/Añadir Reseña/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('shows message when button is clicked', () => {
    render(<Home />)
    
    const addButton = screen.getByText(/Añadir Reseña/i)
    fireEvent.click(addButton)
    
    expect(screen.getByText(/Formulario aparecerá aquí próximamente/i)).toBeInTheDocument()
  })
})