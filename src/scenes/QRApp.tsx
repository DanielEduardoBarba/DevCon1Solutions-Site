'use client'

import { useEffect, useRef, useState } from "react"
import QRCode from "react-qr-code"
import html2canvas from "html2canvas"
import DownloadSVG from "../components/componentassets/DownloadSVG"
import SpinnerSVG from "../components/componentassets/SpinnerSVG"

const PLACEHOLDER_VALUE = "https://devcon1solutions.com"

// phase: "idle" | "loading" | "ready"
export default function QRApp({ embedded = false }) {
  const [text, setText] = useState("")
  const [displayedQr, setDisplayedQr] = useState("") // shown QR value
  const [phase, setPhase] = useState("idle")
  const timerRef = useRef(null)

  const handleGenerate = () => {
    const val = text.trim()
    if (!val) return
    if (val === displayedQr && phase === "ready") return
    clearTimeout(timerRef.current)
    setPhase("loading")
    timerRef.current = setTimeout(() => {
      setDisplayedQr(val)
      setPhase("ready")
    }, 800)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const snapShotQR = async () => {
    const div = document.getElementById("qrdiv")
    if (!div) return
    const canvas = await html2canvas(div)
    const imgData = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = imgData
    link.download = "myQRcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const inner = (
    <>
      {/* ── QR display area — fixed size, no layout shift ── */}
      <div className="w-full mb-6">
        <div className="relative mx-auto" style={{ width: "100%", maxWidth: 256 }}>
          {/* Placeholder QR — always rendered, fades out when ready */}
          <div
            className="rounded-xl overflow-hidden transition-opacity duration-500"
            style={{ opacity: phase === "ready" ? 0 : 0.18, pointerEvents: "none" }}
          >
            <div className="bg-white p-4 rounded-xl">
              <QRCode
                size={256}
                value={PLACEHOLDER_VALUE}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
              />
            </div>
          </div>

          {/* Idle label overlay */}
          {phase === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-white/50 text-sm font-medium text-center px-4 leading-relaxed">
                Type something below<br />to generate your QR
              </p>
            </div>
          )}

          {/* Spinner overlay — sits above placeholder during loading */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: phase === "loading" ? 1 : 0, pointerEvents: "none" }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-4">
              <SpinnerSVG w={36} h={36} color="white" />
            </div>
          </div>

          {/* Real QR — fades in after loading */}
          <div
            id="qrdiv"
            className="absolute inset-0 rounded-xl overflow-hidden transition-opacity duration-500"
            style={{ opacity: phase === "ready" ? 1 : 0, pointerEvents: phase === "ready" ? "auto" : "none" }}
          >
            {displayedQr && (
              <div className="bg-white p-4 rounded-xl h-full">
                <QRCode
                  size={256}
                  value={displayedQr}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox="0 0 256 256"
                />
              </div>
            )}
          </div>
        </div>

        {/* Download button — fades in when ready */}
        <div
          className="transition-all duration-500 overflow-hidden"
          style={{ maxHeight: phase === "ready" ? 80 : 0, opacity: phase === "ready" ? 1 : 0 }}
        >
          <button
            onClick={snapShotQR}
            className="cta-button w-full mt-4 flex items-center justify-center gap-2 !bg-green-600 hover:!shadow-green-600/40"
          >
            <DownloadSVG w={20} h={20} color="white" />
            Download QR
          </button>
        </div>
      </div>

      {/* ── Input + Generate ── */}
      <div className="space-y-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder="Enter URL, text, etc..."
          className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
        />
        <button
          onClick={handleGenerate}
          disabled={!text.trim() || phase === "loading"}
          className={`cta-button w-full transition-all ${
            !text.trim() || phase === "loading"
              ? "!bg-gray-700 opacity-50 cursor-not-allowed"
              : text.trim() === displayedQr && phase === "ready"
              ? "!bg-gray-500"
              : ""
          }`}
        >
          {phase === "loading" ? "Generating…" : text.trim() === displayedQr && phase === "ready" ? "Ready ✓" : "Generate"}
        </button>
      </div>
    </>
  )

  if (embedded) return <div className="w-full max-w-sm mx-auto">{inner}</div>

  return (
    <div className="min-h-screen w-full pt-[80px] pb-20 px-4 sm:px-6 flex justify-center items-start">
      <div className="w-full max-w-sm fade-in-up">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4 font-medium">Tool</p>
          <h1 className="text-3xl font-bold text-white mb-2 gradient-text">QR Code Generator</h1>
        </div>
        <div className="glass-card p-6 md:p-8">{inner}</div>
      </div>
    </div>
  )
}

