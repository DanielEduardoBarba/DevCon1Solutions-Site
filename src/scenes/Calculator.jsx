'use client'

import { useState } from "react"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [resetNext, setResetNext] = useState(false)

  function inputDigit(d) {
    if (resetNext) {
      setDisplay(String(d))
      setResetNext(false)
    } else {
      setDisplay(display === "0" ? String(d) : display + d)
    }
  }

  function inputDot() {
    if (resetNext) { setDisplay("0."); setResetNext(false); return }
    if (!display.includes(".")) setDisplay(display + ".")
  }

  function clear() {
    setDisplay("0"); setPrev(null); setOp(null); setResetNext(false)
  }

  function toggleSign() {
    setDisplay(String(parseFloat(display) * -1))
  }

  function percent() {
    setDisplay(String(parseFloat(display) / 100))
  }

  function handleOp(nextOp) {
    const current = parseFloat(display)
    if (prev !== null && op && !resetNext) {
      const result = calculate(prev, current, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(current)
    }
    setOp(nextOp)
    setResetNext(true)
  }

  function calculate(a, b, operator) {
    switch (operator) {
      case "+": return a + b
      case "-": return a - b
      case "×": return a * b
      case "÷": return b !== 0 ? a / b : "Error"
      default: return b
    }
  }

  function equals() {
    if (prev === null || !op) return
    const current = parseFloat(display)
    const result = calculate(prev, current, op)
    setDisplay(String(result))
    setPrev(null)
    setOp(null)
    setResetNext(true)
  }

  const btnBase = "flex items-center justify-center rounded-2xl text-xl font-medium transition-all duration-150 active:scale-95 cursor-pointer select-none"

  const buttons = [
    { label: "AC", action: clear, style: `${btnBase} bg-white/10 text-white/80 hover:bg-white/20` },
    { label: "±", action: toggleSign, style: `${btnBase} bg-white/10 text-white/80 hover:bg-white/20` },
    { label: "%", action: percent, style: `${btnBase} bg-white/10 text-white/80 hover:bg-white/20` },
    { label: "÷", action: () => handleOp("÷"), style: `${btnBase} ${op === "÷" ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}` },
    { label: "7", action: () => inputDigit("7"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "8", action: () => inputDigit("8"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "9", action: () => inputDigit("9"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "×", action: () => handleOp("×"), style: `${btnBase} ${op === "×" ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}` },
    { label: "4", action: () => inputDigit("4"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "5", action: () => inputDigit("5"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "6", action: () => inputDigit("6"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "-", action: () => handleOp("-"), style: `${btnBase} ${op === "-" ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}` },
    { label: "1", action: () => inputDigit("1"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "2", action: () => inputDigit("2"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "3", action: () => inputDigit("3"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "+", action: () => handleOp("+"), style: `${btnBase} ${op === "+" ? "bg-white text-orange-500" : "bg-orange-500 text-white hover:bg-orange-400"}` },
    { label: "0", action: () => inputDigit("0"), style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15 col-span-2 !rounded-2xl`, wide: true },
    { label: ".", action: inputDot, style: `${btnBase} bg-white/[0.06] text-white hover:bg-white/15` },
    { label: "=", action: equals, style: `${btnBase} bg-orange-500 text-white hover:bg-orange-400` },
  ]

  const fontSize = display.length > 10 ? "text-2xl" : display.length > 7 ? "text-3xl" : "text-5xl"

  return (
    <div className="flex flex-col items-center py-6 px-4">
      <div className="w-[280px]">
        {/* Display */}
        <div className="w-full text-right pr-4 pb-4 pt-2 min-h-[80px] flex items-end justify-end">
          <span className={`${fontSize} font-light text-white tracking-tight transition-all duration-200`}>
            {display}
          </span>
        </div>
        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`${btn.style} h-[60px] ${btn.wide ? 'col-span-2' : ''}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
