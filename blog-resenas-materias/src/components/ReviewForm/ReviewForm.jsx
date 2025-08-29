import { useState } from 'react'
import Button from '../Button/Button'
import './ReviewForm.css'
import { API_URL } from '../../config'

const ReviewForm = ({ subjects, onSubmit }) => {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [review, setReview] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedSubject && review.trim()) {
      try {
        const response = await fetch(`${API_URL}/v0/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            materia: selectedSubject,
            resena: review.trim()
          })
        })
        if (!response.ok) throw new Error('Error al enviar la reseña')
        const data = await response.json()
        onSubmit(data)
        setSelectedSubject('')
        setReview('')
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Materia:</label>
        <select 
          id="subject"
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
          required
        >
          <option value="">Selecciona una materia</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      
      <hr className="form-divider" />
      
      <div className="form-group">
        <label htmlFor="review">Reseña:</label>
        <textarea 
          id="review"
          value={review} 
          onChange={(e) => setReview(e.target.value)}
          placeholder="Comparte tu experiencia con esta materia..."
          required
          rows={4}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-button">
          Publicar Reseña
        </button>
      </div>
    </form>
  )
}

export default ReviewForm