import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from './Home'

// Mock the config module
jest.mock('../config', () => ({
  API_URL: 'http://localhost:5000'
}))

// Mock fetch globally
global.fetch = jest.fn()

beforeEach(() => {
  fetch.mockClear()
  fetch.mockResolvedValue({
    ok: true,
    json: async () => []
  })
})

describe('Home Page', () => {
  test('displays button to add review', async () => {
    render(<Home />)
    await waitFor(() => {
      const buttonElement = screen.getByText(/Añadir Reseña/i)
      expect(buttonElement).toBeInTheDocument()
    })
  })

  test('shows review form when button is clicked', async () => {
    render(<Home />)
    
    await waitFor(() => {
      const addButton = screen.getByText(/Añadir Reseña/i)
      fireEvent.click(addButton)
    })
    
    expect(screen.getByLabelText(/materia/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/reseña/i)).toBeInTheDocument()
    expect(screen.getByText(/publicar reseña/i)).toBeInTheDocument()
  })

  test('hides form when cancel button is clicked', async () => {
    render(<Home />)
    
    // Wait for component to load and show form
    await waitFor(() => {
      const addButton = screen.getByText(/Añadir Reseña/i)
      fireEvent.click(addButton)
    })
    
    // Hide form
    const cancelButton = screen.getByText(/cancelar/i)
    fireEvent.click(cancelButton)
    
    // Verify button is visible again
    expect(screen.getByText(/Añadir Reseña/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/materia/i)).not.toBeInTheDocument()
  })
})