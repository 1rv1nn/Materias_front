import { useState, useEffect } from 'react'
import Button from '../components/Button/Button'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import './Home.css'
import { API_URL } from '../config'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/v0/subjects`)
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(() => setSubjects([]))

    fetch(`${API_URL}/v0/reviews`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.slice().sort((a, b) => b.id - a.id)
        setReviews(sorted)
      })
      .catch(() => setReviews([]))
  }, [])

  const handleAddReview = (reviewData) => {
    setReviews([reviewData, ...reviews])
    setShowForm(false)
    alert('¡Reseña publicada con éxito! 🎉')
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>Reseña tu materia</h1>
        <p>Comparte tu experiencia con los demás</p>
      </header>
      
      <main className="main-content">
        {!showForm ? (
          <div className="add-review-section">
            <button 
              className="add-review-button"
              onClick={() => setShowForm(true)}
            >
              + Añadir Reseña
            </button>
          </div>
        ) : (
          <div className="form-section">
            <ReviewForm 
              subjects={subjects.map(s => s.nombre)} 
              onSubmit={handleAddReview}
            />
            <Button 
              text="Cancelar" 
              onClick={handleCancel}
              className="cancel-button"
            />
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="no-reviews-section">
            <div className="no-reviews-content">
              <div className="no-reviews-icon">📝</div>
              <h2 className="no-reviews-title">No se encuentra ninguna reseña</h2>
              <p className="no-reviews-description">
                Sé el primero en compartir tu experiencia y ayudar a otros estudiantes
              </p>
            </div>
          </div>
        ) : (
          <div className="reviews-section">
            <div className="reviews-content">
              <div className="reviews-title">Reseñas recientes</div>
                <ul className="reviews-list">
                  {reviews.map((r, i) => (
                    <li key={i} className="review-item">
                      <div className="review-subject">{r.materia}</div>
                      <div className="review-text">{r.resena}</div>
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home