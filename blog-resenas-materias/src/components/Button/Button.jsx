const Button = ({ text, onClick, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} data-testid="custom-button">
      {text}
    </button>
  )
}

export default Button