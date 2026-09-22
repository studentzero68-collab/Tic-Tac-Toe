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
  gameMode: 'pvp',
  difficulty: 'medium',
  isCpuThinking: false,
}

function getBoardAfterMove(board, index, player) {
  const nextBoard = [...board]
  nextBoard[index] = player
  return nextBoard
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action

      if (state.winner || state.draw || state.board[index] || state.isCpuThinking) {
        return state
      }

      const isCpuTurn = state.gameMode === 'cpu' && state.currentPlayer === 'O'
      if (isCpuTurn) {
        return state
      }

      const nextBoard = getBoardAfterMove(state.board, index, state.currentPlayer)
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

      const nextState = {
        ...state,
        board: nextBoard,
        winner: nextWinner,
        draw: nextDraw,
        currentPlayer: nextWinner || nextDraw ? state.currentPlayer : getNextPlayer(state.currentPlayer),
        step: nextHistory.length - 1,
        history: nextHistory,
        moveHistory: nextMoveHistory,
      }

      if (nextWinner || nextDraw) {
        return nextState
      }

      if (state.gameMode === 'cpu' && nextState.currentPlayer === 'O') {
        return {
          ...nextState,
          isCpuThinking: true,
        }
      }

      return nextState
    }

    case 'SET_GAME_MODE': {
      const nextGameMode = action.gameMode
      return {
        ...initialState,
        gameMode: nextGameMode,
        difficulty: state.difficulty,
      }
    }

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.difficulty,
      }

    case 'CPU_MOVE': {
      if (state.winner || state.draw || state.gameMode !== 'cpu') {
        return state
      }

      const cpuIndex = action.index
      if (state.board[cpuIndex] || state.currentPlayer !== 'O') {
        return state
      }

      const nextBoard = getBoardAfterMove(state.board, cpuIndex, 'O')
      const nextWinner = checkWinner(nextBoard)
      const nextDraw = !nextWinner && checkDraw(nextBoard)

      const nextHistory = state.history.slice(0, state.step + 1)
      const nextMoveHistory = state.moveHistory.slice(0, state.step + 1)

      nextHistory.push(nextBoard)

      const moveNumber = nextMoveHistory.length
      nextMoveHistory.push({
        moveNumber,
        player: 'O',
        square: cpuIndex,
        description: `Move ${moveNumber}: O → Square ${cpuIndex + 1}`,
      })

      return {
        ...state,
        board: nextBoard,
        winner: nextWinner,
        draw: nextDraw,
        currentPlayer: nextWinner || nextDraw ? 'O' : 'X',
        step: nextHistory.length - 1,
        history: nextHistory,
        moveHistory: nextMoveHistory,
        isCpuThinking: false,
      }
    }

    case 'RESET_GAME':
      return {
        ...initialState,
        gameMode: state.gameMode,
        difficulty: state.difficulty,
      }

    case 'JUMP_TO_MOVE': {
      const targetStep = Math.max(0, Math.min(action.moveNumber, state.history.length - 1))
      const targetBoard = state.history[targetStep]
      const targetWinner = checkWinner(targetBoard)
      const targetDraw = !targetWinner && checkDraw(targetBoard)

      const nextPlayer =
        targetWinner || targetDraw
          ? targetWinner || 'X'
          : targetStep % 2 === 0
            ? 'X'
            : 'O'

      return {
        ...state,
        board: targetBoard,
        winner: targetWinner,
        draw: targetDraw,
        currentPlayer: nextPlayer,
        step: targetStep,
        history: state.history.slice(0, targetStep + 1),
        moveHistory: state.moveHistory.slice(0, targetStep + 1),
        isCpuThinking: false,
      }
    }

    default:
      return state
  }
}
