import { useState } from 'react'
import Button from '../Button/Button'

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

  const formStyle = {
    maxWidth: '500px',
    margin: '20px 0',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  }

  const formGroupStyle = {
    marginBottom: '15px'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333'
  }

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={formGroupStyle}>
        <label htmlFor="subject" style={labelStyle}>Materia:</label>
        <select 
          id="subject"
          style={inputStyle}
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
      
      <div style={formGroupStyle}>
        <label htmlFor="review" style={labelStyle}>Reseña:</label>
        <textarea 
          id="review"
          style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
          value={review} 
          onChange={(e) => setReview(e.target.value)}
          rows="4"
          placeholder="Comparte tu experiencia con esta materia..."
          required
        />
      </div>
      
      <Button 
        type="submit" 
        text="Publicar Reseña" 
      />
    </form>
  )
}

export default ReviewForm