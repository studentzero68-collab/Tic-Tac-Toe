export function MoveHistory({ moves, currentStep, onJumpToMove }) {
  return (
    <div className="history-panel">
      <h2>Move History</h2>
      <ol className="history-list">
        {moves.map((move) => {
          const isSelected = move.moveNumber === currentStep
          const label =
            move.moveNumber === 0 ? 'Game Start' : `Go to Move ${move.moveNumber}: ${move.description}`

          return (
            <li key={move.moveNumber} className={isSelected ? 'history-item active' : 'history-item'}>
              <button
                type="button"
                className="history-button"
                onClick={() => onJumpToMove(move.moveNumber)}
                aria-current={isSelected ? 'true' : undefined}
                aria-label={label}
              >
                <span>{label}</span>
                {isSelected && <span className="history-current">Current</span>}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
