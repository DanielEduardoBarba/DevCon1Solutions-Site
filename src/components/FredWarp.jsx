'use client'

import { useEffect, useState } from "react"

/**
 * Smooth full-screen backdrop transition for Fred-driven navigation.
 * Fred's chat panel stays visible above this overlay — he's "driving" you.
 * Phases: 0=idle → 1=blur-in → 2=solid (navigate fires) → 3=reveal-out → 0
 * Total: ~900ms — fast and seamless.
 */
export default function FredWarp({ active, destination, onComplete }) {
  const [phase, setPhase] = useState(0) // 0=idle 1=blur-in 2=solid 3=reveal

  useEffect(() => {
    if (!active) { setPhase(0); return }

    // Phase 1 → blur in
    setPhase(1)

    // Phase 2 → solid (content hidden) — navigate fires here
    const t1 = setTimeout(() => {
      setPhase(2)
      // Fire navigation while overlay is opaque
      if (onComplete) onComplete()
    }, 350)

    // Phase 3 → reveal the new page
    const t2 = setTimeout(() => setPhase(3), 500)

    // Done — unmount
    const t3 = setTimeout(() => setPhase(0), 950)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [active, onComplete])

  if (phase === 0) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden="true">
      {/* Backdrop — blur & darken, then fade out to reveal */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: phase <= 2 ? "blur(20px) saturate(0.5)" : "blur(0px)",
          WebkitBackdropFilter: phase <= 2 ? "blur(20px) saturate(0.5)" : "blur(0px)",
          background: phase === 2
            ? "rgba(10,10,26,0.92)"
            : phase === 1
            ? "rgba(10,10,26,0.7)"
            : "rgba(10,10,26,0)",
          transition: phase === 3
            ? "all 450ms cubic-bezier(0.16,1,0.3,1)"
            : "all 300ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* Subtle radial glow accent during transition */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: phase === 1 || phase === 2 ? 0.4 : 0,
          transition: "opacity 400ms ease",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    </div>
  )
}
