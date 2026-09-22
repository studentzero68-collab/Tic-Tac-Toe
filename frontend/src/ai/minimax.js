import { checkDraw, checkWinner } from '../utils/gameLogic'

export function getAvailableMoves(board) {
  return board.reduce((moves, value, index) => {
    if (!value) {
      moves.push(index)
    }

    return moves
  }, [])
}

export function chooseRandomMove(board) {
  const availableMoves = getAvailableMoves(board)

  if (availableMoves.length === 0) {
    return null
  }

  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

export function findWinningMove(board, player) {
  for (const move of getAvailableMoves(board)) {
    const nextBoard = [...board]
    nextBoard[move] = player

    if (checkWinner(nextBoard) === player) {
      return move
    }
  }

  return null
}

function minimax(board, depth, isMaximizing) {
  const winner = checkWinner(board)

  if (winner === 'O') {
    return 10 - depth
  }

  if (winner === 'X') {
    return depth - 10
  }

  if (checkDraw(board)) {
    return 0
  }

  if (isMaximizing) {
    let bestScore = -Infinity

    for (const move of getAvailableMoves(board)) {
      const nextBoard = [...board]
      nextBoard[move] = 'O'
      const score = minimax(nextBoard, depth + 1, false)
      bestScore = Math.max(bestScore, score)
    }

    return bestScore
  }

  let bestScore = Infinity

  for (const move of getAvailableMoves(board)) {
    const nextBoard = [...board]
    nextBoard[move] = 'X'
    const score = minimax(nextBoard, depth + 1, true)
    bestScore = Math.min(bestScore, score)
  }

  return bestScore
}

export function getHardMove(board) {
  let bestScore = -Infinity
  let bestMove = null

  for (const move of getAvailableMoves(board)) {
    const nextBoard = [...board]
    nextBoard[move] = 'O'
    const score = minimax(nextBoard, 0, false)

    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

export function getCpuMove(board, difficulty = 'medium') {
  if (board.every((value) => value !== null)) {
    return null
  }

  if (difficulty === 'easy') {
    return chooseRandomMove(board)
  }

  const cpuWinningMove = findWinningMove(board, 'O')
  if (cpuWinningMove !== null) {
    return cpuWinningMove
  }

  const playerWinningMove = findWinningMove(board, 'X')
  if (playerWinningMove !== null) {
    return playerWinningMove
  }

  if (difficulty === 'hard') {
    return getHardMove(board)
  }

  const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  const availablePreferredMove = preferredMoves.find((move) => !board[move])

  return availablePreferredMove ?? chooseRandomMove(board)
}
