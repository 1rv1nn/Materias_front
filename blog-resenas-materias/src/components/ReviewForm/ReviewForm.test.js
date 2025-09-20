import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReviewForm from './ReviewForm'

jest.mock('../../config', () => ({
  API_URL: 'http://localhost:5000'
}))

beforeAll(() => {
  window.alert = jest.fn()
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        id: 1,
        materia: 'Algoritmos',
        resena: 'Excelente materia, muy retadora pero gratificante.'
      })
    })
  )
})

describe('ReviewForm Component', () => {
  const mockSubjects = ['Algoritmos', 'Estructuras de Datos', 'Base de Datos']
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  test('renders subject dropdown with predefined options', () => {
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    const subjectLabel = screen.getByLabelText(/materia/i)
    expect(subjectLabel).toBeInTheDocument()
    
    const subjectSelect = screen.getByRole('combobox')
    expect(subjectSelect).toBeInTheDocument()
  })

  test('renders review text area', () => {
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    const textArea = screen.getByLabelText(/reseña/i)
    expect(textArea).toBeInTheDocument()
    expect(textArea).toHaveAttribute('rows', '4')
  })

  test('renders submit button', () => {
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /publicar reseña/i })
    expect(submitButton).toBeInTheDocument()
  })

  test('shows all subject options in dropdown', () => {
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    const subjectSelect = screen.getByRole('combobox')
    fireEvent.click(subjectSelect)
    
    mockSubjects.forEach(subject => {
      expect(screen.getByText(subject)).toBeInTheDocument()
    })
  })

  test('submits form with correct data', async () => {
    const user = userEvent.setup()
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    // Seleccionar materia
    const subjectSelect = screen.getByRole('combobox')
    await user.selectOptions(subjectSelect, 'Algoritmos')
    
    // Escribir reseña
    const reviewText = 'Excelente materia, muy retadora pero gratificante.'
    const textArea = screen.getByLabelText(/reseña/i)
    await user.type(textArea, reviewText)
    
    // Enviar formulario
    const submitButton = screen.getByRole('button', { name: /publicar reseña/i })
    await user.click(submitButton)
    
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        materia: 'Algoritmos',
        resena: reviewText
      })
    )
  })

  test('does not submit form with empty fields', async () => {
    const user = userEvent.setup()
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /publicar reseña/i })
    await user.click(submitButton)
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ReviewForm subjects={mockSubjects} onSubmit={mockOnSubmit} />)
    
    // Llenar el formulario
    const subjectSelect = screen.getByRole('combobox')
    await user.selectOptions(subjectSelect, 'Algoritmos')
    
    const reviewText = 'Excelente materia'
    const textArea = screen.getByLabelText(/reseña/i)
    await user.type(textArea, reviewText)
    
    // Enviar formulario
    const submitButton = screen.getByRole('button', { name: /publicar reseña/i })
    await user.click(submitButton)
    
    // Verificar que los campos se limpiaron
    expect(subjectSelect.value).toBe('')
    expect(textArea.value).toBe('')
  })
})