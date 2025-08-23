import { useState } from 'react'
import Button from '../components/Button/Button'

const Home = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <h1>Reseñas de Materias - Ciencias de la Computación</h1>
      
      <Button 
        text="Añadir Reseña" 
        onClick={() => setShowForm(true)} 
      />
      
      {showForm && <p>Formulario aparecerá aquí próximamente...</p>}
    </div>
  )
}

export default Home