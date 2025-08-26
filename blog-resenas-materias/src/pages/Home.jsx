import { useState } from 'react'
import Button from '../components/Button/Button'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import './Home.css'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  
  const subjects = [
    'Algoritmos',
    'Redes de Computadoras',
    'Inteligencia Artificial',
    'Sistemas Operativos',
    'Ingeniería de Software',
    'Estructuras Discretas'
  ]

  const handleAddReview = (reviewData) => {
    console.log('Reseña agregada:', reviewData)
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
              subjects={subjects} 
              onSubmit={handleAddReview}
            />
            <Button 
              text="Cancelar" 
              onClick={handleCancel}
              className="cancel-button"
            />
          </div>
        )}
        
        <div className="no-reviews-section">
          <div className="no-reviews-content">
            <div className="no-reviews-icon">📝</div>
            <h2 className="no-reviews-title">No se encuentra ninguna reseña</h2>
            <p className="no-reviews-description">
              Sé el primero en compartir tu experiencia y ayudar a otros estudiantes
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home