import {
  checkDraw,
  checkWinner,
  createEmptyBoard,
  getNextPlayer,
} from '../utils/gameLogic'

function createStartingMoveHistory() {
  return [
    {
      moveNumber: 0,
      player: null,
      square: null,
      description: 'Game Start',
    },
  ]
}

function createEmptyScores() {
  return {
    pvp: {
      xWins: 0,
      oWins: 0,
      draws: 0,
    },
    cpu: {
      wins: 0,
      losses: 0,
      draws: 0,
    },
  }
}

function createRoundState() {
  const emptyBoard = createEmptyBoard()

  return {
    board: emptyBoard,
    currentPlayer: 'X',
    winner: null,
    draw: false,
    step: 0,
    history: [emptyBoard],
    moveHistory: createStartingMoveHistory(),
    isCpuThinking: false,
    roundOver: false,
    gameStatus: null,
  }
}

function getRoundStatus(gameMode, winner, draw) {
  if (draw) {
    return 'Draw!'
  }

  if (!winner) {
    return null
  }

  if (gameMode === 'cpu') {
    return winner === 'X' ? 'You Win!' : 'You Lose!'
  }

  return `Winner: ${winner}`
}

function applyRoundScore(scores, gameMode, winner, draw) {
  if (gameMode === 'cpu') {
    const nextCpuScores = { ...scores.cpu }

    if (draw) {
      nextCpuScores.draws += 1
    } else if (winner === 'X') {
      nextCpuScores.wins += 1
    } else {
      nextCpuScores.losses += 1
    }

    return {
      ...scores,
      cpu: nextCpuScores,
    }
  }

  const nextPvpScores = { ...scores.pvp }

  if (draw) {
    nextPvpScores.draws += 1
  } else if (winner === 'X') {
    nextPvpScores.xWins += 1
  } else {
    nextPvpScores.oWins += 1
  }

  return {
    ...scores,
    pvp: nextPvpScores,
  }
}

function getBoardAfterMove(board, index, player) {
  const nextBoard = [...board]
  nextBoard[index] = player
  return nextBoard
}

export const initialState = {
  ...createRoundState(),
  gameMode: 'pvp',
  difficulty: 'medium',
  scores: createEmptyScores(),
}

export function gameReducer(state, action) {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { index } = action

      if (state.winner || state.draw || state.board[index] || state.isCpuThinking || state.roundOver) {
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
        roundOver: Boolean(nextWinner || nextDraw),
      }

      if (nextWinner || nextDraw) {
        return {
          ...nextState,
          scores: applyRoundScore(state.scores, state.gameMode, nextWinner, nextDraw),
          gameStatus: getRoundStatus(state.gameMode, nextWinner, nextDraw),
          isCpuThinking: false,
        }
      }

      if (state.gameMode === 'cpu' && nextState.currentPlayer === 'O') {
        return {
          ...nextState,
          isCpuThinking: true,
          gameStatus: null,
        }
      }

      return {
        ...nextState,
        isCpuThinking: false,
        gameStatus: null,
      }
    }

    case 'SET_GAME_MODE': {
      const nextGameMode = action.gameMode

      return {
        ...createRoundState(),
        gameMode: nextGameMode,
        difficulty: state.difficulty,
        scores: state.scores,
      }
    }

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.difficulty,
      }

    case 'CPU_MOVE': {
      if (state.winner || state.draw || state.gameMode !== 'cpu' || state.roundOver) {
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

      const nextState = {
        ...state,
        board: nextBoard,
        winner: nextWinner,
        draw: nextDraw,
        currentPlayer: nextWinner || nextDraw ? 'O' : 'X',
        step: nextHistory.length - 1,
        history: nextHistory,
        moveHistory: nextMoveHistory,
        isCpuThinking: false,
        roundOver: Boolean(nextWinner || nextDraw),
      }

      if (nextWinner || nextDraw) {
        return {
          ...nextState,
          scores: applyRoundScore(state.scores, state.gameMode, nextWinner, nextDraw),
          gameStatus: getRoundStatus(state.gameMode, nextWinner, nextDraw),
        }
      }

      return {
        ...nextState,
        gameStatus: null,
      }
    }

    case 'NEXT_GAME':
      return {
        ...state,
        ...createRoundState(),
        gameMode: state.gameMode,
        difficulty: state.difficulty,
        scores: state.scores,
      }

    case 'RESET_SCORE':
      return {
        ...state,
        ...createRoundState(),
        gameMode: state.gameMode,
        difficulty: state.difficulty,
        scores: createEmptyScores(),
      }

    case 'RESET_GAME':
      return {
        ...createRoundState(),
        gameMode: state.gameMode,
        difficulty: state.difficulty,
        scores: state.scores,
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
        roundOver: Boolean(targetWinner || targetDraw),
        gameStatus: getRoundStatus(state.gameMode, targetWinner, targetDraw),
      }
    }

    default:
      return state
  }
}
