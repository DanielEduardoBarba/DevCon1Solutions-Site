import { useCallback, useEffect, useState } from "react"
import FredCompanion from "../components/FredCompanion"

const EMPTY = null
const X = "X"
const O = "O"

const WIN_COMBOS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
]

function checkWinner(board) {
  for (const [a,b,c] of WIN_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] }
    }
  }
  if (board.every(cell => cell !== EMPTY)) return { winner: "draw", line: [] }
  return null
}

function minimax(board, isMaximizing) {
  const result = checkWinner(board)
  if (result) {
    if (result.winner === O) return 10
    if (result.winner === X) return -10
    return 0
  }
  if (isMaximizing) {
    let best = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === EMPTY) {
        board[i] = O
        best = Math.max(best, minimax(board, false))
        board[i] = EMPTY
      }
    }
    return best
  } else {
    let best = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === EMPTY) {
        board[i] = X
        best = Math.min(best, minimax(board, true))
        board[i] = EMPTY
      }
    }
    return best
  }
}

function getBestMove(board) {
  let best = -Infinity
  let move = -1
  // Occasionally make a suboptimal move (20% chance) for fun
  if (Math.random() < 0.2) {
    const empties = board.map((c, i) => c === EMPTY ? i : -1).filter(i => i !== -1)
    return empties[Math.floor(Math.random() * empties.length)]
  }
  for (let i = 0; i < 9; i++) {
    if (board[i] === EMPTY) {
      board[i] = O
      const score = minimax(board, false)
      board[i] = EMPTY
      if (score > best) { best = score; move = i }
    }
  }
  return move
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(EMPTY))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameResult, setGameResult] = useState(null)
  const [winLine, setWinLine] = useState([])
  const [fredTrigger, setFredTrigger] = useState("greeting")
  const [fredMood, setFredMood] = useState("happy")
  const [score, setScore] = useState({ player: 0, fred: 0, draws: 0 })
  const [triggerKey, setTriggerKey] = useState(0)

  const fireFred = useCallback((trigger, mood) => {
    setFredTrigger(trigger)
    setFredMood(mood || "neutral")
    setTriggerKey(k => k + 1)
  }, [])

  useEffect(() => { fireFred("greeting", "happy") }, [])

  useEffect(() => {
    if (!isPlayerTurn && !gameResult) {
      // Fred "thinks" first, then makes his move
      fireFred("thinking", "thinking")
      const timer = setTimeout(() => {
        const move = getBestMove([...board])
        if (move === -1 || move === undefined) return
        const newBoard = [...board]
        newBoard[move] = O
        setBoard(newBoard)
        const result = checkWinner(newBoard)
        if (result) {
          handleGameEnd(result)
        } else {
          const reactions = ["taunt", "curious", "sassy", "idle"]
          fireFred(reactions[Math.floor(Math.random() * reactions.length)], "neutral")
          setIsPlayerTurn(true)
        }
      }, 2000 + Math.random() * 1000)
      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, board, gameResult])

  function handleGameEnd(result) {
    setWinLine(result.line)
    setGameResult(result.winner)
    if (result.winner === X) {
      setScore(s => ({ ...s, player: s.player + 1 }))
      fireFred("losing", "sad")
    } else if (result.winner === O) {
      setScore(s => ({ ...s, fred: s.fred + 1 }))
      fireFred("winning", "happy")
    } else {
      setScore(s => ({ ...s, draws: s.draws + 1 }))
      fireFred("draw", "neutral")
    }
  }

  function handleClick(i) {
    if (board[i] || !isPlayerTurn || gameResult) return
    const newBoard = [...board]
    newBoard[i] = X
    setBoard(newBoard)
    const result = checkWinner(newBoard)
    if (result) {
      handleGameEnd(result)
    } else {
      setIsPlayerTurn(false)
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(EMPTY))
    setIsPlayerTurn(true)
    setGameResult(null)
    setWinLine([])
    fireFred("greeting", "happy")
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6 px-4">
      {/* Score */}
      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <p className="text-white/40 text-xs">You</p>
          <p className="text-2xl font-bold text-cyan-400">{score.player}</p>
        </div>
        <div className="text-white/20 text-xs">—</div>
        <div className="text-center">
          <p className="text-white/40 text-xs">Draws</p>
          <p className="text-2xl font-bold text-white/30">{score.draws}</p>
        </div>
        <div className="text-white/20 text-xs">—</div>
        <div className="text-center">
          <p className="text-white/40 text-xs">Fred</p>
          <p className="text-2xl font-bold text-pink-400">{score.fred}</p>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-3 gap-2 w-[240px] h-[240px]">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!!cell || !!gameResult || !isPlayerTurn}
            className={`
              w-[76px] h-[76px] rounded-xl text-3xl font-bold
              flex items-center justify-center
              transition-all duration-200 cursor-pointer
              ${winLine.includes(i)
                ? 'bg-indigo-500/30 border-indigo-400/60 scale-105'
                : cell
                ? 'bg-white/5 border-white/10'
                : 'bg-white/[0.03] border-white/5 hover:bg-white/10 hover:border-white/20'}
              border
            `}
          >
            {cell === X && <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">✕</span>}
            {cell === O && <span className="text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]">○</span>}
          </button>
        ))}
      </div>

      {/* Fred */}
      <FredCompanion key={triggerKey} mood={fredMood} trigger={fredTrigger} size={45} />

      {/* Status / Reset */}
      {gameResult && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/70 text-sm font-medium">
            {gameResult === X ? "You win! 🎉" : gameResult === O ? "Fred wins!" : "It's a draw!"}
          </p>
          <button onClick={resetGame} className="cta-button text-sm !py-2 !px-5">
            Play Again
          </button>
        </div>
      )}
      {!gameResult && !isPlayerTurn && (
        <p className="text-white/30 text-xs animate-pulse">Fred is thinking...</p>
      )}
    </div>
  )
}
