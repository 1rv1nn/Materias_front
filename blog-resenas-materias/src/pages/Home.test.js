beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
      ok: true
    })
  )
})

jest.mock('../config', () => ({
  API_URL: 'http://localhost:5000'
}))

import { render, screen, fireEvent } from '@testing-library/react'
import Home from './Home'

describe('Home Page', () => {
  test('displays button to add review', () => {
    render(<Home />)
    const buttonElement = screen.getByText(/Añadir Reseña/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('shows review form when button is clicked', () => {
    render(<Home />)
    
    const addButton = screen.getByText(/Añadir Reseña/i)
    fireEvent.click(addButton)
    
    expect(screen.getByLabelText(/materia/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/reseña/i)).toBeInTheDocument()
    expect(screen.getByText(/publicar reseña/i)).toBeInTheDocument()
  })

  test('hides form when cancel button is clicked', () => {
    render(<Home />)
    
    // Mostrar formulario
    const addButton = screen.getByText(/Añadir Reseña/i)
    fireEvent.click(addButton)
    
    // Ocultar formulario
    const cancelButton = screen.getByText(/cancelar/i)
    fireEvent.click(cancelButton)
    
    // Verificar que el botón "Añadir Reseña" está visible nuevamente
    expect(screen.getByText(/Añadir Reseña/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/materia/i)).not.toBeInTheDocument()
  })
})