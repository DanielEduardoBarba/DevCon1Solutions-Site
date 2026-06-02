import { useEffect, useRef, useState, useCallback, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import FaceChatSVG from "./componentassets/FaceChatSVG"
import FredWarp from "./FredWarp"
import AppContext from "../AppContext"

// ── Fred's dialogue lines ──────────────────────────────────────
const LINES = {
  welcome: [
    "Hey! Welcome to DevCon1 👋 Need any help?",
    "Hi there! I'm Fred — your DevCon1 guide.",
    "Welcome! Looking for something specific?",
  ],
  salesPitch: [
    "We build custom software that actually works. Want to learn more?",
    "From web apps to IT solutions — we've got you covered.",
    "Got a project in mind? We'd love to hear about it!",
  ],
  competitorNotice: [
    "I see you've been browsing IT companies — here's how we stand out: we actually pick up the phone. 😄",
    "Shopping for tech solutions? Our clients stay because we treat their project like our own.",
    "Comparing IT services? We focus on quality over quantity — every single time.",
  ],
  services: [
    "We handle everything from custom web apps to cloud infrastructure.",
    "Mobile apps, APIs, dashboards — you name it, we build it.",
    "Need managed IT? We've got 24/7 support packages too.",
  ],
  about: [
    "We're a small team that punches way above our weight.",
    "DevCon1 was founded on one idea: tech should just work.",
    "Real people, real code, real results. That's us.",
  ],
  contact: [
    "Ready to start a project? Fill out the form — we respond fast!",
    "Drop us a message! We usually reply within a few hours.",
    "Let's make something great together. Reach out anytime!",
  ],
  apps: [
    "Try our mini apps! Play a game or generate a QR code.",
    "These demos show off what we can build. Try one!",
    "Challenge me to Tic Tac Toe — I dare you. 😏",
  ],
  nudge: [
    "Still exploring? Let me know if you have any questions!",
    "I'm here if you need anything 👋",
    "Don't be shy — tap me if you want to chat!",
  ],
  farewell: [
    "I'll be right here if you need me! →",
    "Going back to my corner. Tap me anytime!",
    "Catch you later! 👋",
  ],
  menuPrompt: [
    "What can I help you with?",
    "Pick a topic, or just say hi!",
    "Here's what I can tell you about:",
  ],
  travel: [
    "Let's go! 🚀",
    "Right this way!",
    "Let me show you!",
    "Follow me! ✨",
    "Okay, come on!",
    "Here we go! 🎯",
    "Off we go!",
  ],
}

const MENU_ITEMS = [
  { key: "services", label: "Our Services", icon: "⚡" },
  { key: "about", label: "About Us", icon: "👥" },
  { key: "apps", label: "Try Our Apps", icon: "🎮" },
  { key: "contact", label: "Contact Us", icon: "✉️" },
  { key: "salesPitch", label: "Why DevCon1?", icon: "🏆" },
]

function getCharDelay(char) {
  if (char === " ") return 22 + Math.random() * 18
  if (".,!?—:;".includes(char)) return 120 + Math.random() * 100
  return 28 + Math.random() * 25
}

function detectCompetitorBrowsing() {
  try {
    const ref = document.referrer.toLowerCase()
    const keywords = ["clutch.co", "upwork", "toptal", "fiverr", "accenture", "deloitte",
      "cognizant", "infosys", "capgemini", "wipro", "it-services", "software-company",
      "web-development", "managed-it", "itsolutions", "techsolutions"]
    if (ref && keywords.some(k => ref.includes(k))) return true
    if (ref.includes("google") || ref.includes("bing") || ref.includes("duckduckgo")) {
      const url = new URL(document.referrer)
      const q = (url.searchParams.get("q") || url.searchParams.get("query") || "").toLowerCase()
      const terms = ["it services", "software company", "web development", "app development",
        "managed it", "it consulting", "software development", "tech company"]
      if (terms.some(t => q.includes(t))) return true
    }
  } catch { /* */ }
  return false
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Page-specific context for Fred to comment on
function getPageContext(pathname) {
  if (pathname === "/services") return "services"
  if (pathname === "/about") return "about"
  if (pathname === "/contact") return "contact"
  if (pathname === "/apps") return "apps"
  return null
}

export default function Chat() {
  const { appFullscreen } = useContext(AppContext)
  const [expanded, setExpanded] = useState(false)   // panel open vs icon
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mood, setMood] = useState("happy")
  const [showMenu, setShowMenu] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [warpTarget, setWarpTarget] = useState(null) // path to warp to
  const [warpActive, setWarpActive] = useState(false)
  const timersRef = useRef([])
  const hasGreetedRef = useRef(false)
  const lastPageRef = useRef("")
  const dismissingRef = useRef(false)
  const panelRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Trigger the Fred warp transition, then navigate
  const warpTo = useCallback((path) => {
    setWarpTarget(path)
    setWarpActive(true)
  }, [])

  const handleWarpComplete = useCallback(() => {
    if (warpTarget) navigate(warpTarget)
    setWarpActive(false)
    setWarpTarget(null)
  }, [warpTarget, navigate])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
  }, [])

  const addTimer = useCallback((fn, ms) => {
    const t = setTimeout(fn, ms)
    timersRef.current.push(t)
    return t
  }, [])

  // Speak a short travel line instantly (no typewriter), then fire warp
  const travelAndWarp = useCallback((path) => {
    clearTimers()
    setShowMenu(false)
    setMood("excited")
    const line = pickRandom(LINES.travel)
    setDisplayText(line)
    setIsTyping(false)
    // Warp fires almost immediately — Fred's line is already on screen
    addTimer(() => warpTo(path), 350)
  }, [clearTimers, addTimer, warpTo])

  // Typewriter
  const speak = useCallback((line, onDone) => {
    clearTimers()
    setDisplayText("")
    setIsTyping(true)
    setShowMenu(false)
    let cum = 0
    for (let i = 0; i < line.length; i++) {
      cum += getCharDelay(line[i])
      addTimer(() => {
        setDisplayText(line.slice(0, i + 1))
        if (i === line.length - 1) {
          setIsTyping(false)
          if (onDone) {
            const readTime = Math.max(2500, line.length * 50 + 1000)
            addTimer(onDone, readTime)
          }
        }
      }, cum)
    }
  }, [addTimer, clearTimers])

  // Open panel + speak
  const openAndSpeak = useCallback((line, onDone) => {
    setExpanded(true)
    setMood("happy")
    // Small delay for panel animation
    addTimer(() => speak(line, onDone), 400)
  }, [speak, addTimer])

  // Show interactive menu after speaking
  const showMenuAfterSpeech = useCallback(() => {
    setShowMenu(true)
  }, [])

  // Handle menu selection
  function handleMenuSelect(key) {
    setShowMenu(false)
    setMood("happy")
    const lines = LINES[key]
    if (!lines) return

    // Navigable items — instant travel line then warp
    const NAV_MAP = { contact: "/contact", apps: "/apps", services: "/services", about: "/about" }
    if (NAV_MAP[key]) {
      travelAndWarp(NAV_MAP[key])
    } else {
      speak(pickRandom(lines), showMenuAfterSpeech)
    }
  }

  // Collapse to icon
  function collapse() {
    clearTimers()
    setShowMenu(false)
    setDisplayText("")
    setIsTyping(false)
    speak(pickRandom(LINES.farewell), () => {
      addTimer(() => {
        setExpanded(false)
        dismissingRef.current = false
      }, 800)
    })
  }

  // Re-open from icon
  function reopen() {
    dismissingRef.current = false
    setExpanded(true)
    setMood("happy")
    addTimer(() => {
      speak(pickRandom(LINES.menuPrompt), showMenuAfterSpeech)
    }, 400)
  }

  // ── Initial greeting ──
  useEffect(() => {
    if (hasGreetedRef.current) return
    const isHome = location.pathname === "/" || location.pathname === "/home"
    if (!isHome) return

    hasGreetedRef.current = true
    const isCompetitor = detectCompetitorBrowsing()

    addTimer(() => {
      const line = isCompetitor
        ? pickRandom(LINES.competitorNotice)
        : pickRandom(LINES.welcome)

      openAndSpeak(line, () => {
        addTimer(() => {
          speak(pickRandom(LINES.salesPitch), showMenuAfterSpeech)
        }, 600 + Math.random() * 500)
      })
    }, 3000 + Math.random() * 1500)
  }, [location.pathname])

  // ── Page-aware comments (arrival after warp or manual nav) ──
  useEffect(() => {
    if (!hasGreetedRef.current) return
    if (location.pathname === lastPageRef.current) return
    lastPageRef.current = location.pathname

    const ctx = getPageContext(location.pathname)
    if (!ctx) return
    if (!expanded) return // Don't auto-open on nav, just comment if open

    // After a warp, wait for overlay to clear before speaking
    addTimer(() => {
      const lines = LINES[ctx]
      if (lines) speak(pickRandom(lines), showMenuAfterSpeech)
    }, 1000)
  }, [location.pathname, expanded])

  // ── Click-outside to dismiss ──
  useEffect(() => {
    if (!expanded) return
    function handleMouseDown(e) {
      if (panelRef.current && panelRef.current.contains(e.target)) return
      if (dismissingRef.current) return
      dismissingRef.current = true
      collapse()
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [expanded])

  // ── Nudge after idle (only if expanded & no menu visible) ──
  useEffect(() => {
    if (!expanded || showMenu || isTyping) return
    if (!displayText) return

    const nudge = addTimer(() => {
      speak(pickRandom(LINES.nudge), showMenuAfterSpeech)
    }, 20000 + Math.random() * 10000)

    return () => clearTimeout(nudge)
  }, [expanded, showMenu, isTyping, displayText])

  if (appFullscreen) return null

  return (
    <>
      {/* ── Collapsed icon ── */}
      {!expanded && (
        <button
          onClick={reopen}
          className="fixed z-[10000] bottom-5 left-4 sm:bottom-6 sm:left-5 group cursor-pointer"
          title="Chat with Fred"
        >
          <div className="relative transition-transform duration-300 hover:scale-110 active:scale-95">
            <FaceChatSVG w={32} h={32} alive mood="happy" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-red-400/30 animate-ping" style={{ animationDuration: "2.5s" }} />
          </div>
        </button>
      )}

      {/* ── Expanded panel ── */}
      <div
        ref={panelRef}
        className="fixed z-[10000] bottom-6 left-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: expanded ? "translateX(0)" : "translateX(-120%)",
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? "auto" : "none",
        }}
      >
        <div className="glass-card !rounded-none !rounded-tr-2xl !rounded-br-2xl p-3 pr-4 !bg-red-950/40 !border-red-500/15 max-w-[300px]">
          {/* Header row */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 transition-transform duration-500 ease-out"
              style={{ transform: isTyping ? "scale(1.08)" : "scale(1)" }}
            >
              <FaceChatSVG w={40} h={40} alive mood={mood} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-red-400/60 font-bold">Fred</p>
              <p className="text-[9px] text-white/25">DevCon1 Assistant</p>
            </div>
            {/* Collapse button */}
            <button
              onClick={collapse}
              className="text-white/20 hover:text-white/60 transition-colors cursor-pointer p-1"
              title="Minimize Fred"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Speech bubble */}
          {(displayText || isTyping) && (
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl px-3 py-2 border border-white/[0.06] mb-2 transition-all duration-300">
              <p className="text-xs text-white/80 leading-relaxed whitespace-pre-wrap min-h-[1.2em]">
                {displayText}
                {isTyping && <span className="inline-block w-[2px] h-[10px] bg-white/50 ml-[1px] animate-pulse align-middle" />}
              </p>
            </div>
          )}

          {/* Interactive menu */}
          {showMenu && !isTyping && (
            <div className="flex flex-col gap-1 mt-1 animate-[fadeSlideUp_0.3s_ease-out]">
              {MENU_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => handleMenuSelect(item.key)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-left text-xs text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Resting state quick action */}
          {!displayText && !isTyping && !showMenu && (
            <button
              onClick={() => {
                speak(pickRandom(LINES.menuPrompt), showMenuAfterSpeech)
              }}
              className="text-xs text-red-400/60 hover:text-red-300 transition-colors cursor-pointer font-medium"
            >
              Tap to chat →
            </button>
          )}
        </div>
      </div>

      {/* Fred Warp transition overlay */}
      <FredWarp active={warpActive} destination={warpTarget} onComplete={handleWarpComplete} />

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
