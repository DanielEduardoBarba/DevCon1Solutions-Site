import { useCallback, useEffect, useState } from "react"
import FredCompanion from "../components/FredCompanion"

const ROWS = 6
const COLS = 7
const EMPTY = 0
const PLAYER = 1
const FRED = 2

function createBoard() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY))
}

function dropPiece(board, col, piece) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === EMPTY) {
      const nb = board.map(row => [...row])
      nb[r][col] = piece
      return { board: nb, row: r }
    }
  }
  return null
}

function checkWin(board, piece) {
  // Horizontal
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if (board[r][c] === piece && board[r][c+1] === piece && board[r][c+2] === piece && board[r][c+3] === piece)
        return [[r,c],[r,c+1],[r,c+2],[r,c+3]]
  // Vertical
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c < COLS; c++)
      if (board[r][c] === piece && board[r+1][c] === piece && board[r+2][c] === piece && board[r+3][c] === piece)
        return [[r,c],[r+1,c],[r+2,c],[r+3,c]]
  // Diagonal down-right
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      if (board[r][c] === piece && board[r+1][c+1] === piece && board[r+2][c+2] === piece && board[r+3][c+3] === piece)
        return [[r,c],[r+1,c+1],[r+2,c+2],[r+3,c+3]]
  // Diagonal down-left
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      if (board[r][c] === piece && board[r+1][c-1] === piece && board[r+2][c-2] === piece && board[r+3][c-3] === piece)
        return [[r,c],[r+1,c-1],[r+2,c-2],[r+3,c-3]]
  return null
}

function isFull(board) {
  return board[0].every(c => c !== EMPTY)
}

function scoreWindow(window, piece) {
  const opp = piece === PLAYER ? FRED : PLAYER
  let score = 0
  const pCount = window.filter(c => c === piece).length
  const eCount = window.filter(c => c === EMPTY).length
  const oCount = window.filter(c => c === opp).length
  if (pCount === 4) score += 100
  else if (pCount === 3 && eCount === 1) score += 5
  else if (pCount === 2 && eCount === 2) score += 2
  if (oCount === 3 && eCount === 1) score -= 4
  return score
}

function scoreBoard(board, piece) {
  let score = 0
  // Center column preference
  const center = board.map(r => r[3])
  score += center.filter(c => c === piece).length * 3
  // Horizontal
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      score += scoreWindow([board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]], piece)
  // Vertical
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c < COLS; c++)
      score += scoreWindow([board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]], piece)
  // Diagonals
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      score += scoreWindow([board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]], piece)
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      score += scoreWindow([board[r][c], board[r+1][c-1], board[r+2][c-2], board[r+3][c-3]], piece)
  return score
}

function getValidCols(board) {
  return Array.from({ length: COLS }, (_, i) => i).filter(c => board[0][c] === EMPTY)
}

function minimaxC4(board, depth, alpha, beta, maximizing) {
  const validCols = getValidCols(board)
  if (checkWin(board, FRED)) return [null, 100000]
  if (checkWin(board, PLAYER)) return [null, -100000]
  if (validCols.length === 0) return [null, 0]
  if (depth === 0) return [null, scoreBoard(board, FRED)]

  if (maximizing) {
    let value = -Infinity
    let bestCol = validCols[Math.floor(Math.random() * validCols.length)]
    for (const col of validCols) {
      const result = dropPiece(board, col, FRED)
      if (!result) continue
      const [, score] = minimaxC4(result.board, depth - 1, alpha, beta, false)
      if (score > value) { value = score; bestCol = col }
      alpha = Math.max(alpha, value)
      if (alpha >= beta) break
    }
    return [bestCol, value]
  } else {
    let value = Infinity
    let bestCol = validCols[Math.floor(Math.random() * validCols.length)]
    for (const col of validCols) {
      const result = dropPiece(board, col, PLAYER)
      if (!result) continue
      const [, score] = minimaxC4(result.board, depth - 1, alpha, beta, true)
      if (score < value) { value = score; bestCol = col }
      beta = Math.min(beta, value)
      if (alpha >= beta) break
    }
    return [bestCol, value]
  }
}

function fredMove(board) {
  // 15% chance of random move for variety
  const valid = getValidCols(board)
  if (Math.random() < 0.15) return valid[Math.floor(Math.random() * valid.length)]
  const [col] = minimaxC4(board, 5, -Infinity, Infinity, true)
  return col
}

export default function Connect4() {
  const [board, setBoard] = useState(createBoard)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameResult, setGameResult] = useState(null)
  const [winCells, setWinCells] = useState([])
  const [hoverCol, setHoverCol] = useState(-1)
  const [lastDrop, setLastDrop] = useState(null)
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
        const col = fredMove(board)
        if (col === null || col === undefined) return
        const result = dropPiece(board, col, FRED)
        if (!result) return
        setBoard(result.board)
        setLastDrop({ row: result.row, col })
        const win = checkWin(result.board, FRED)
        if (win) {
          setWinCells(win)
          setGameResult("fred")
          setScore(s => ({ ...s, fred: s.fred + 1 }))
          fireFred("winning", "happy")
        } else if (isFull(result.board)) {
          setGameResult("draw")
          setScore(s => ({ ...s, draws: s.draws + 1 }))
          fireFred("draw", "neutral")
        } else {
          const r = ["taunt", "curious", "sassy", "idle"]
          fireFred(r[Math.floor(Math.random() * r.length)], "neutral")
          setIsPlayerTurn(true)
        }
      }, 2000 + Math.random() * 1000)
      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, board, gameResult])

  function handleDrop(col) {
    if (!isPlayerTurn || gameResult || board[0][col] !== EMPTY) return
    const result = dropPiece(board, col, PLAYER)
    if (!result) return
    setBoard(result.board)
    setLastDrop({ row: result.row, col })
    const win = checkWin(result.board, PLAYER)
    if (win) {
      setWinCells(win)
      setGameResult("player")
      setScore(s => ({ ...s, player: s.player + 1 }))
      fireFred("losing", "sad")
    } else if (isFull(result.board)) {
      setGameResult("draw")
      setScore(s => ({ ...s, draws: s.draws + 1 }))
      fireFred("draw", "neutral")
    } else {
      setIsPlayerTurn(false)
    }
  }

  function resetGame() {
    setBoard(createBoard())
    setIsPlayerTurn(true)
    setGameResult(null)
    setWinCells([])
    setLastDrop(null)
    fireFred("greeting", "happy")
  }

  const isWinCell = (r, c) => winCells.some(([wr, wc]) => wr === r && wc === c)
  const cellSize = "w-9 h-9 sm:w-11 sm:h-11"

  return (
    <div className="flex flex-col items-center gap-5 py-6 px-4">
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
      <div className="bg-indigo-950/60 rounded-2xl p-2 sm:p-3 border border-indigo-500/20">
        {/* Column hover indicators */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-1">
          {Array.from({ length: COLS }, (_, c) => (
            <div key={c} className={`${cellSize} flex items-center justify-center`}>
              {hoverCol === c && isPlayerTurn && !gameResult && board[0][c] === EMPTY && (
                <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-cyan-400/30 animate-bounce" />
              )}
            </div>
          ))}
        </div>
        {/* Grid */}
        {board.map((row, r) => (
          <div key={r} className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {row.map((cell, c) => (
              <button
                key={c}
                onClick={() => handleDrop(c)}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(-1)}
                className={`${cellSize} rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center
                  ${isWinCell(r, c)
                    ? 'scale-110 border-yellow-400/80 shadow-[0_0_12px_rgba(250,204,21,0.4)]'
                    : 'border-white/5'
                  }
                  ${cell === EMPTY
                    ? 'bg-black/30 hover:bg-black/50'
                    : ''
                  }
                `}
                style={
                  lastDrop?.row === r && lastDrop?.col === c
                    ? { animation: 'dropIn 0.3s ease-out' }
                    : {}
                }
              >
                {cell === PLAYER && (
                  <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
                )}
                {cell === FRED && (
                  <div className="w-[70%] h-[70%] rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-[0_0_8px_rgba(244,114,182,0.3)]" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Fred */}
      <FredCompanion key={triggerKey} mood={fredMood} trigger={fredTrigger} size={45} />

      {/* Status */}
      {gameResult && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/70 text-sm font-medium">
            {gameResult === "player" ? "You win! 🎉" : gameResult === "fred" ? "Fred wins!" : "It's a draw!"}
          </p>
          <button onClick={resetGame} className="cta-button text-sm !py-2 !px-5">
            Play Again
          </button>
        </div>
      )}
      {!gameResult && !isPlayerTurn && (
        <p className="text-white/30 text-xs animate-pulse">Fred is thinking...</p>
      )}

      <style>{`
        @keyframes dropIn {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
