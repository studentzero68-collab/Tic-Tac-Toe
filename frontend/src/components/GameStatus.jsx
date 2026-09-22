export function GameStatus({ message }) {
  return (
    <div className="status-panel" aria-live="polite">
      <p className="status-text">{message}</p>
    </div>
  )
}
