import { useState, useEffect, Suspense, lazy, useContext } from "react"
import QRApp from "./QRApp"
import TicTacToe from "./TicTacToe"
import Calculator from "./Calculator"
import Connect4 from "./Connect4"
import SpinnerSVG from "../components/componentassets/SpinnerSVG"
import AppContext from "../AppContext"

const EmulatedControls = lazy(() => import("./EmulatedControls"))

export default function Apps() {
  const { setAppFullscreen } = useContext(AppContext)
  const [activeApp, setActiveApp] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  // Delayed flag for CSS transition (mount → animate in)
  const [fsAnimated, setFsAnimated] = useState(false)

  // Sync fullscreen state up to context so Header can hide
  useEffect(() => {
    setAppFullscreen(isFullscreen)
    return () => setAppFullscreen(false)
  }, [isFullscreen])

  // CSS transition: mount at un-animated position, then animate in
  useEffect(() => {
    if (isFullscreen) {
      setFsAnimated(false)
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setFsAnimated(true))
      })
      return () => cancelAnimationFrame(raf)
    } else {
      setFsAnimated(false)
    }
  }, [isFullscreen])

  const apps = [
    {
      id: "tictactoe",
      title: "Tic Tac Toe",
      description: "Challenge Fred, our AI, in a classic game of Tic Tac Toe. Can you outsmart him?",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="2">
          <line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" />
          <line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" />
        </svg>
      ),
      gradient: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/20 hover:border-cyan-500/40",
      accentColor: "text-cyan-400",
      tag: "Game • vs Fred",
    },
    {
      id: "connect4",
      title: "Connect 4",
      description: "Drop discs and try to get four in a row before Fred does. He's trickier than you think!",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <circle cx="7" cy="9" r="2" /><circle cx="12" cy="9" r="2" /><circle cx="17" cy="9" r="2" />
          <circle cx="7" cy="15" r="2" /><circle cx="12" cy="15" r="2" /><circle cx="17" cy="15" r="2" />
        </svg>
      ),
      gradient: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/20 hover:border-pink-500/40",
      accentColor: "text-pink-400",
      tag: "Game • vs Fred",
    },
    {
      id: "calculator",
      title: "Calculator",
      description: "A sleek, Apple-inspired calculator with a beautiful dark UI. Crunch numbers in style.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="2" width="16" height="20" rx="3" />
          <rect x="7" y="5" width="10" height="4" rx="1" />
          <circle cx="8.5" cy="13" r="0.8" fill="currentColor" /><circle cx="12" cy="13" r="0.8" fill="currentColor" />
          <circle cx="15.5" cy="13" r="0.8" fill="currentColor" /><circle cx="8.5" cy="17" r="0.8" fill="currentColor" />
          <circle cx="12" cy="17" r="0.8" fill="currentColor" /><circle cx="15.5" cy="17" r="0.8" fill="currentColor" />
        </svg>
      ),
      gradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "border-orange-500/20 hover:border-orange-500/40",
      accentColor: "text-orange-400",
      tag: "Tool",
    },
    {
      id: "qr",
      title: "QR Code Generator",
      description: "Generate QR codes from any text, URL, or data. Download as PNG instantly.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="3" height="3" />
          <rect x="18" y="18" width="3" height="3" /><rect x="14" y="18" width="3" height="3" />
          <rect x="18" y="14" width="3" height="3" />
        </svg>
      ),
      gradient: "from-emerald-500/20 to-cyan-500/20",
      borderColor: "border-emerald-500/20 hover:border-emerald-500/40",
      accentColor: "text-emerald-400",
      tag: "Tool",
    },
    {
      id: "demo",
      title: "3D Car Demo",
      description: "Interactive 3D driving experience built with Spline. Use controls to drive around.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17l-1 2h2m12-2l1 2h-2" />
          <circle cx="8" cy="17" r="1" /><circle cx="16" cy="17" r="1" />
        </svg>
      ),
      gradient: "from-violet-500/20 to-fuchsia-500/20",
      borderColor: "border-violet-500/20 hover:border-violet-500/40",
      accentColor: "text-violet-400",
      tag: "3D Demo",
    },
  ]

  function renderAppContent() {
    switch (activeApp) {
      case "qr":
        return (
          <div className="py-8 px-4 flex justify-center">
            <div className="w-full max-w-sm"><QRApp embedded /></div>
          </div>
        )
      case "tictactoe":
        return <TicTacToe />
      case "calculator":
        return <Calculator />
      case "connect4":
        return <Connect4 />
      case "demo":
        return (
          <Suspense fallback={
            <div className="flex items-center justify-center py-32">
              <SpinnerSVG w={40} h={40} color="white" />
            </div>
          }>
            <EmulatedControls />
          </Suspense>
        )
      default:
        return null
    }
  }

  const activeTitle = apps.find(a => a.id === activeApp)?.title || ""

  return (
    <div className="w-full min-h-screen pt-[80px] pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {!activeApp && (
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 fade-in-up font-medium">Showcase</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 fade-in-up fade-in-up-delay-1 gradient-text">Our Apps</h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto fade-in-up fade-in-up-delay-2">
              Interactive tools, games, and demos — play right here.
            </p>
          </div>
        )}

        {/* App Grid */}
        {!activeApp && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto fade-in-up fade-in-up-delay-3">
            {apps.map((app) => (
              <button
                key={app.id}
                onClick={() => { setActiveApp(app.id); setIsFullscreen(false) }}
                className={`group glass-card !rounded-2xl p-6 text-left transition-all duration-500 border ${app.borderColor} hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <div className={app.accentColor}>{app.icon}</div>
                  </div>
                  {app.tag && (
                    <span className="text-[10px] uppercase tracking-wider text-white/25 font-semibold bg-white/5 px-2 py-1 rounded-full">
                      {app.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{app.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-3">{app.description}</p>
                <span className={`text-xs font-medium ${app.accentColor} flex items-center gap-1.5`}>
                  Launch
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Active App Window */}
        {activeApp && (
          <div className="fade-in-up">
            {/* Back */}
            {!isFullscreen && (
              <button
                onClick={() => setActiveApp(null)}
                className="mb-5 flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Apps
              </button>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen overlay backdrop — animated */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9998] transition-opacity duration-500 ease-out"
          style={{
            opacity: fsAnimated ? 1 : 0,
            background: "linear-gradient(135deg, rgba(10,10,26,0.97) 0%, rgba(13,13,31,0.98) 50%, rgba(10,15,26,0.97) 100%)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        />
      )}

      {/* App Window — always in flow when normal, fixed overlay when fullscreen */}
      {activeApp && (
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={isFullscreen ? {
            position: "fixed",
            top: fsAnimated ? 0 : 80,
            left: fsAnimated ? 0 : 24,
            right: fsAnimated ? 0 : 24,
            bottom: fsAnimated ? 0 : 24,
            zIndex: 9999,
            opacity: fsAnimated ? 1 : 0.9,
            transform: fsAnimated ? "scale(1)" : "scale(0.97)",
          } : {
            position: "relative",
            maxWidth: "72rem",
            margin: activeApp ? "-0.5rem auto 0" : "0 auto",
            padding: "0 1rem",
          }}
        >
          <div
            className="overflow-hidden border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col"
            style={{
              borderRadius: isFullscreen && fsAnimated ? 0 : 16,
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: isFullscreen
                ? "none"
                : "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
              height: isFullscreen ? "100dvh" : "calc(100dvh - 180px)",
              maxHeight: isFullscreen ? "100dvh" : "calc(100dvh - 180px)",
              overflowY: isFullscreen ? "hidden" : "auto",
            }}
          >
            {/* Title Bar — macOS style */}
            <div
              className="flex items-center gap-3 px-4 shrink-0 border-b transition-all duration-300"
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                borderColor: "rgba(255,255,255,0.06)",
                background: isFullscreen
                  ? "rgba(255,255,255,0.02)"
                  : "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <div className="flex gap-[7px] group/dots">
                {/* Close */}
                <button
                  onClick={() => { setActiveApp(null); setIsFullscreen(false) }}
                  className="w-[13px] h-[13px] rounded-full transition-all duration-200 cursor-pointer group-hover/dots:shadow-[0_0_8px_rgba(255,95,87,0.5)] active:scale-75"
                  style={{ background: "linear-gradient(135deg, #ff6058, #e0443e)" }}
                  title="Close"
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] font-bold text-black/60 flex items-center justify-center leading-none">✕</span>
                </button>
                {/* Minimize */}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="w-[13px] h-[13px] rounded-full transition-all duration-200 cursor-pointer group-hover/dots:shadow-[0_0_8px_rgba(254,188,46,0.5)] active:scale-75"
                  style={{ background: "linear-gradient(135deg, #ffc130, #e0a520)" }}
                  title="Minimize"
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] font-bold text-black/60 flex items-center justify-center leading-none">−</span>
                </button>
                {/* Fullscreen */}
                <button
                  onClick={() => setIsFullscreen(f => !f)}
                  className="w-[13px] h-[13px] rounded-full transition-all duration-200 cursor-pointer group-hover/dots:shadow-[0_0_8px_rgba(40,200,64,0.5)] active:scale-75"
                  style={{ background: "linear-gradient(135deg, #2dd840, #1aab29)" }}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  <span className="opacity-0 group-hover/dots:opacity-100 text-[8px] font-bold text-black/60 flex items-center justify-center leading-none">
                    {isFullscreen ? "↙" : "↗"}
                  </span>
                </button>
              </div>
              <p className="text-white/35 text-[11px] font-medium flex-1 text-center select-none tracking-wide">{activeTitle}</p>
              <div className="w-[55px]" />
            </div>

            {/* App Content */}
            <div className="relative flex-1 overflow-hidden">
              {renderAppContent()}
            </div>
          </div>

          {/* Fullscreen back button — hidden; use red dot to close */}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
