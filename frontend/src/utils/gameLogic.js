export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function createEmptyBoard() {
  return Array(9).fill(null)
}

export function checkWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

export function checkDraw(board) {
  return board.every(Boolean) && !checkWinner(board)
}

export function getNextPlayer(currentPlayer) {
  return currentPlayer === 'X' ? 'O' : 'X'
}

export function getStatusMessage({ winner, draw, currentPlayer }) {
  if (winner) {
    return `Winner: ${winner}`
  }

  if (draw) {
    return 'Draw!'
  }

  return `Next Player: ${currentPlayer}`
}
