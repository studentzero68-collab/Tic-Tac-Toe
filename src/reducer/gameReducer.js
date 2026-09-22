import {
  checkDraw,
  checkWinner,
  createEmptyBoard,
  getNextPlayer,
} from '../utils/gameLogic'

export const initialState = {
  board: createEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  draw: false,
  step: 0,
  history: [createEmptyBoard()],
  moveHistory: [
    {
      moveNumber: 0,
      player: null,
      square: null,
      description: 'Game Start',
    },
  ],
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action

      if (state.winner || state.draw || state.board[index]) {
        return state
      }

      const nextBoard = [...state.board]
      nextBoard[index] = state.currentPlayer

      const nextWinner = checkWinner(nextBoard)
      const nextDraw = !nextWinner && checkDraw(nextBoard)
      const nextHistory = state.history.slice(0, state.step + 1)
      const nextMoveHistory = state.moveHistory.slice(0, state.step + 1)

      nextHistory.push(nextBoard)

      const moveNumber = nextMoveHistory.length
      nextMoveHistory.push({
        moveNumber,
        player: state.currentPlayer,
        square: index,
        description: `Move ${moveNumber}: ${state.currentPlayer} → Square ${index + 1}`,
      })

      return {
        ...state,
        board: nextBoard,
        currentPlayer: nextWinner || nextDraw ? state.currentPlayer : getNextPlayer(state.currentPlayer),
        winner: nextWinner,
        draw: nextDraw,
        step: nextHistory.length - 1,
        history: nextHistory,
        moveHistory: nextMoveHistory,
      }
    }

    case 'RESET_GAME':
      return initialState

    case 'JUMP_TO_MOVE': {
      const moveNumber = action.moveNumber
      const targetStep = Math.max(0, Math.min(moveNumber, state.history.length - 1))
      const targetBoard = state.history[targetStep]
      const targetWinner = checkWinner(targetBoard)
      const targetDraw = !targetWinner && checkDraw(targetBoard)

      const nextPlayer = targetWinner
        ? targetWinner
        : targetDraw
          ? 'X'
          : targetStep % 2 === 0
            ? 'X'
            : 'O'

      return {
        ...state,
        board: targetBoard,
        currentPlayer: nextPlayer,
        winner: targetWinner,
        draw: targetDraw,
        step: targetStep,
        history: state.history.slice(0, targetStep + 1),
        moveHistory: state.moveHistory.slice(0, targetStep + 1),
      }
    }

    default:
      return state
  }
}
