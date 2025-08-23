import { useState } from 'react'
import Button from '../components/Button/Button'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import './Home.css'

const Home = () => {
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState([])
  
  const subjects = [
    'Algoritmos', 
    'Estructuras de Datos', 
    'Base de Datos', 
    'Programación Orientada a Objetos',
    'Redes de Computadoras',
    'Inteligencia Artificial',
    'Sistemas Operativos',
    'Ingeniería de Software'
  ]

  const handleAddReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      ...reviewData,
      date: new Date().toLocaleDateString()
    }
    setReviews([newReview, ...reviews])
    setShowForm(false)
    
    // Mostrar mensaje de éxito (opcional)
    alert('¡Reseña publicada con éxito!')
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>Reseñas de Materias - Ciencias de la Computación</h1>
        <p>Comparte tu experiencia con las materias de la carrera</p>
      </header>
      
      <main className="main-content">
        {!showForm ? (
          <div className="add-review-section">
            <Button 
              text="Añadir Reseña" 
              onClick={() => setShowForm(true)} 
            />
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
        
        {/* Se ha eliminado el ReviewList */}
      </main>
    </div>
  )
}

export default Home