import { useEffect, useRef, useState, useCallback } from "react"
import FaceChatSVG from "./componentassets/FaceChatSVG"

const FRED_LINES = {
  greeting: [
    "Hey there! I'm Fred 👋",
    "Ready to play? Let's go!",
    "Oh, a challenger! 😏",
    "Welcome! Let's have some fun.",
    "Hey! Pick a game, any game!",
  ],
  thinking: [
    "Hmm, let me think...",
    "Interesting move...",
    "Give me a sec... 🤔",
    "Calculating...",
    "Ooh, that changes things...",
    "Hold on, processing...",
    "Let me consider my options...",
  ],
  winning: [
    "Too easy! 😎",
    "Better luck next time!",
    "I saw that coming!",
    "GG! 🏆",
    "What can I say? I'm built different.",
    "Thanks for the warm-up!",
    "You'll get me next time... maybe.",
  ],
  losing: [
    "No way! You got me!",
    "Well played! 👏",
    "Rematch? I want revenge!",
    "You're good at this! 😤",
    "Okay, I underestimated you.",
    "I let you win. Totally.",
    "Alright alright, you earned that one.",
  ],
  draw: [
    "A draw? We're evenly matched!",
    "So close! Let's go again!",
    "Great minds think alike 🤝",
    "Neither of us blinked. Respect.",
    "Stalemate! One more round?",
  ],
  taunt: [
    "Is that your best move?",
    "Bold strategy... 🧐",
    "Okay okay, not bad!",
    "You sure about that? 😏",
    "Hmm, interesting choice...",
    "I wouldn't have done that, but okay.",
    "That's one way to go, I guess 😬",
  ],
  impressed: [
    "Ooh, nice one!",
    "Didn't see that coming!",
    "Smart move! 💡",
    "You're making this hard!",
    "Okay, you've got skills.",
    "Wait— that was actually clever.",
  ],
  idle: [
    "Your turn!",
    "I'm waiting... ⏳",
    "Take your time, I guess 😴",
    "...still here!",
    "No rush. I've got all day.",
    "I'll just be over here, waiting.",
  ],
  curious: [
    "What are you going to do? 🤔",
    "I'm watching you...",
    "Go on, make your move.",
    "I'm curious to see where this goes.",
  ],
  excited: [
    "This is getting good! 🔥",
    "Now we're talking!",
    "Oh this is intense!",
    "I love a close game!",
  ],
  sassy: [
    "I could do this in my sleep 💅",
    "Is this your first time?",
    "Don't worry, you'll learn.",
    "I've seen better, honestly.",
  ],
  encouraging: [
    "You're getting better!",
    "Keep going, you've got this!",
    "Nice try! Keep at it.",
    "I see improvement! 📈",
  ],
  // Salesman lines for the main site Chat
  welcome: [
    "Hey! Welcome to DevCon1 👋 Need any help?",
    "Hi there! I'm Fred, your DevCon1 guide.",
    "Welcome! Looking for something specific?",
  ],
  salesPitch: [
    "We build custom software that actually works. Want to learn more?",
    "From web apps to IT solutions — we've got you covered.",
    "Got a project in mind? We'd love to hear about it!",
  ],
  competitorNotice: [
    "I noticed you've been browsing IT services. Here's what makes us different — we actually care about quality.",
    "Shopping for tech solutions? Let me tell you why our clients stick with us.",
    "Looking at other companies? We get it. But we're the ones who pick up the phone.",
  ],
  nudge: [
    "Still exploring? Let me know if you have any questions!",
    "I'm here if you need anything 👋",
    "Don't be shy — tap me if you want to chat!",
  ],
  farewell: [
    "Catch you later! 👋",
    "I'll be right here if you need me.",
    "Going back to my corner. Tap me anytime!",
  ],
}

// Realistic typing speed: varies per character
function getCharDelay(char) {
  if (char === " ") return 25 + Math.random() * 20
  if (".,!?—".includes(char)) return 120 + Math.random() * 100 // Pause at punctuation
  if (char === "\n") return 200
  return 30 + Math.random() * 30
}

export default function FredCompanion({ mood = "neutral", trigger = "", size = 50, className = "", fixed = false }) {
  const [visible, setVisible] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const timeoutsRef = useRef([])

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
  }, [])

  useEffect(() => {
    if (!trigger) return
    const lines = FRED_LINES[trigger] || FRED_LINES.idle
    const line = lines[Math.floor(Math.random() * lines.length)]

    clearTimers()

    // Small delay before Fred "starts typing" — feels like he's thinking
    const thinkDelay = 300 + Math.random() * 500
    const t0 = setTimeout(() => {
      setDisplayText("")
      setVisible(true)
      setIsTyping(true)

      // Typewriter with variable speed
      let cumulative = 0
      for (let i = 0; i < line.length; i++) {
        cumulative += getCharDelay(line[i])
        const t = setTimeout(() => {
          setDisplayText(line.slice(0, i + 1))
          if (i === line.length - 1) setIsTyping(false)
        }, cumulative)
        timeoutsRef.current.push(t)
      }

      // Hide after message + reading time (longer for longer messages)
      const readTime = Math.max(3500, line.length * 60 + 1500)
      const hideT = setTimeout(() => setVisible(false), cumulative + readTime)
      timeoutsRef.current.push(hideT)
    }, thinkDelay)
    timeoutsRef.current.push(t0)

    return clearTimers
  }, [trigger, clearTimers])

  // Fixed-height container prevents layout shift
  const bubbleHeight = 68

  return (
    <div className={`flex items-end gap-3 ${className}`} style={{ minHeight: size + 8 }}>
      <div
        className="flex-shrink-0 transition-transform duration-500 ease-out"
        style={{ transform: visible ? "scale(1.05)" : "scale(1)" }}
      >
        <FaceChatSVG w={size} h={size} alive mood={mood} />
      </div>
      <div style={{ width: 220, height: bubbleHeight, position: "relative" }}>
        <div
          className="absolute bottom-0 left-0 transition-all duration-500 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
            pointerEvents: visible ? "auto" : "none",
          }}
        >
          <div className="glass-card !rounded-xl !rounded-bl-none px-3 py-2 text-sm text-white/80 min-w-[120px] max-w-[220px]">
            <p className="text-[10px] text-red-400/70 font-bold mb-0.5">Fred</p>
            <p className="text-xs leading-relaxed min-h-[1.5em]">
              {displayText}
              {isTyping && <span className="inline-block w-[2px] h-[10px] bg-white/50 ml-[1px] animate-pulse align-middle" />}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { FRED_LINES }
