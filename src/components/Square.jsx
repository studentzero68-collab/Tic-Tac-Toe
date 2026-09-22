export function Square({ value, onClick, disabled, ariaLabel }) {
  const label = ariaLabel || (value ? `${value}` : 'Empty square')

  return (
    <button
      type="button"
      className={`square ${value ? `square--${value.toLowerCase()}` : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled}
    >
      {value}
    </button>
  )
}
