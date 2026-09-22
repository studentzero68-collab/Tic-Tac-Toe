import { useEffect, useReducer } from 'react'
import './App.css'
import { getCpuMove } from './ai/minimax'
import { Board } from './components/Board'
import { GameStatus } from './components/GameStatus'
import { MoveHistory } from './components/MoveHistory'
import { gameReducer, initialState } from './reducer/gameReducer'
import { getStatusMessage } from './utils/gameLogic'

const difficultyOptions = ['easy', 'medium', 'hard']

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.gameMode !== 'cpu' || state.currentPlayer !== 'O' || state.winner || state.draw) {
      return undefined
    }

    const timer = setTimeout(() => {
      const nextMove = getCpuMove(state.board, state.difficulty)
      if (nextMove !== null && nextMove !== undefined) {
        dispatch({ type: 'CPU_MOVE', index: nextMove })
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [state.board, state.currentPlayer, state.draw, state.gameMode, state.winner, state.difficulty])

  const statusMessage = state.isCpuThinking
    ? 'CPU is thinking...'
    : state.gameMode === 'cpu' && state.currentPlayer === 'O'
      ? "CPU's Turn"
      : state.gameMode === 'cpu' && state.currentPlayer === 'X'
        ? 'Your Turn'
        : getStatusMessage({
            winner: state.winner,
            draw: state.draw,
            currentPlayer: state.currentPlayer,
          })

  const handleSquareClick = (index) => {
    dispatch({ type: 'MAKE_MOVE', index })
  }

  const handleReset = () => {
    dispatch({ type: 'RESET_GAME' })
  }

  const handleJumpToMove = (moveNumber) => {
    dispatch({ type: 'JUMP_TO_MOVE', moveNumber })
  }

  const handleModeChange = (gameMode) => {
    dispatch({ type: 'SET_GAME_MODE', gameMode })
  }

  const handleDifficultyChange = (difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', difficulty })
  }

  return (
    <main className="app-shell">
      <section className="game-card" aria-label="Tic-Tac-Toe game">
        <h1>Tic-Tac-Toe</h1>

        <div className="mode-toggle" aria-label="Game mode selector">
          <button
            type="button"
            className={state.gameMode === 'pvp' ? 'mode-button active' : 'mode-button'}
            onClick={() => handleModeChange('pvp')}
          >
            Player vs Player
          </button>
          <button
            type="button"
            className={state.gameMode === 'cpu' ? 'mode-button active' : 'mode-button'}
            onClick={() => handleModeChange('cpu')}
          >
            Player vs CPU
          </button>
        </div>

        {state.gameMode === 'cpu' && (
          <div className="difficulty-panel" aria-label="Difficulty selector">
            <h2>Difficulty</h2>
            <div className="difficulty-list">
              {difficultyOptions.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={state.difficulty === level ? 'difficulty-button active' : 'difficulty-button'}
                  onClick={() => handleDifficultyChange(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <GameStatus message={statusMessage} />

        <button type="button" className="reset-button" onClick={handleReset}>
          Restart Game
        </button>

        <Board
          squares={state.board}
          onSquareClick={handleSquareClick}
          disabled={Boolean(state.winner) || state.draw || state.isCpuThinking || (state.gameMode === 'cpu' && state.currentPlayer === 'O')}
        />
      </section>

      <aside className="sidebar">
        <MoveHistory
          moves={state.moveHistory}
          currentStep={state.step}
          onJumpToMove={handleJumpToMove}
        />
      </aside>
    </main>
  )
}

export default App
