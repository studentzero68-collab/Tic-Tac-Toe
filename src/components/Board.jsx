import { Square } from './Square'

export function Board({ squares, onSquareClick, disabled }) {
  return (
    <div className="board" role="grid" aria-label="Tic-Tac-Toe board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          disabled={disabled || Boolean(value)}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  )
}
