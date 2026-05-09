import { useEffect, useState } from "react"
import FaceChatSVG from "./componentassets/FaceChatSVG"

const FRED_LINES = {
  greeting: ["Hey there! I'm Fred 👋", "Ready to play? Let's go!", "Oh, a challenger! 😏"],
  thinking: ["Hmm, let me think...", "Interesting move...", "Give me a sec... 🤔", "Calculating..."],
  winning: ["Too easy! 😎", "Better luck next time!", "I saw that coming!", "GG! 🏆"],
  losing: ["No way! You got me!", "Well played! 👏", "Rematch? I want revenge!", "You're good at this! 😤"],
  draw: ["A draw? We're evenly matched!", "So close! Let's go again!", "Great minds think alike 🤝"],
  taunt: ["Is that your best move?", "Bold strategy... 🧐", "Okay okay, not bad!", "You sure about that? 😏"],
  impressed: ["Ooh, nice one!", "Didn't see that coming!", "Smart move! 💡", "You're making this hard!"],
  idle: ["Your turn!", "I'm waiting... ⏳", "Take your time, I guess 😴", "...still here!"],
}

export default function FredCompanion({ mood = "neutral", trigger = "", size = 50, className = "" }) {
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    if (!trigger) return
    const lines = FRED_LINES[trigger] || FRED_LINES.idle
    const line = lines[Math.floor(Math.random() * lines.length)]
    setMessage(line)
    setVisible(true)
    setDisplayText("")

    // Typewriter
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayText(line.slice(0, i))
      if (i >= line.length) clearInterval(interval)
    }, 30)

    const hideTimer = setTimeout(() => setVisible(false), 4000)
    return () => {
      clearInterval(interval)
      clearTimeout(hideTimer)
    }
  }, [trigger])

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <div className="flex-shrink-0 transition-transform duration-300" style={{
        transform: visible ? 'scale(1.1)' : 'scale(1)',
      }}>
        <FaceChatSVG w={size} h={size} alive mood={mood} />
      </div>
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(5px)',
          maxHeight: visible ? '80px' : '0px',
        }}
      >
        <div className="glass-card !rounded-xl !rounded-bl-none px-3 py-2 text-sm text-white/80 min-w-[120px] max-w-[220px]">
          <p className="text-[10px] text-indigo-400/70 font-bold mb-0.5">Fred</p>
          <p className="text-xs leading-relaxed">{displayText}</p>
        </div>
      </div>
    </div>
  )
}

export { FRED_LINES }
