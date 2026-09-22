import { useReducer } from 'react'
import './App.css'
import { Board } from './components/Board'
import { GameStatus } from './components/GameStatus'
import { MoveHistory } from './components/MoveHistory'
import { gameReducer, initialState } from './reducer/gameReducer'
import { getStatusMessage } from './utils/gameLogic'

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const statusMessage = getStatusMessage({
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

  return (
    <main className="app-shell">
      <section className="game-card" aria-label="Tic-Tac-Toe game">
        <h1>Tic-Tac-Toe</h1>

        <GameStatus message={statusMessage} />

        <button type="button" className="reset-button" onClick={handleReset}>
          Restart Game
        </button>

        <Board
          squares={state.board}
          onSquareClick={handleSquareClick}
          disabled={Boolean(state.winner) || state.draw}
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
