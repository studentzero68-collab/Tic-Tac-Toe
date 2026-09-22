export function Square({ value, onClick, disabled }) {
  const label = value ? `${value}` : 'Empty square'

  return (
    <button
      type="button"
      className={`square ${value ? `square--${value.toLowerCase()}` : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {value}
    </button>
  )
}
