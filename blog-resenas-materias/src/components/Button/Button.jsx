import './Button.css'

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`custom-button ${className}`}
    >
      {text}
    </button>
  )
}

export default Button