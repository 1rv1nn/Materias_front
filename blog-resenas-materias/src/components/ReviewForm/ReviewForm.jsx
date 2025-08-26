import { useState } from 'react'
import Button from '../Button/Button'
import './ReviewForm.css'

const ReviewForm = ({ subjects, onSubmit }) => {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [review, setReview] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedSubject && review.trim()) {
      onSubmit({
        subject: selectedSubject,
        review: review.trim()
      })
      setSelectedSubject('')
      setReview('')
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